import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of known page routes that should not be under /projects/
const PAGE_ROUTES = ['about-us', 'design-order', 'contact-us', 'contact', 'services']

// Static asset patterns
const STATIC_ASSET_REGEX = /\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone()
    const pathname = url.pathname
    const host = request.headers.get('host') ?? ''

    // Arabic subdomain: default Payload locale to ar (same as old i18n.domains behavior).
    if (
      (host === 'ar.midmac.design' || host.startsWith('ar.midmac.design:')) &&
      !url.searchParams.has('locale')
    ) {
      const withLocale = url.clone()
      withLocale.searchParams.set('locale', 'ar')
      return NextResponse.rewrite(withLocale)
    }

    // Legacy URLs from old Pages Router i18n: /en/... and /ar/... → /...?locale=
    const legacy = pathname.match(/^\/(en|ar)(\/.*)?$/)
    if (legacy) {
      const localeCode = legacy[1] as 'en' | 'ar'
      const rest = legacy[2] && legacy[2].length > 0 ? legacy[2] : '/'
      const target = new URL(rest, request.url)
      if (!target.searchParams.has('locale')) {
        target.searchParams.set('locale', localeCode)
      }
      return NextResponse.redirect(target)
    }

    // Avoid SSR + Payload for crawlers (Next i18n can expose e.g. /en/robots.txt)
    if (pathname === '/robots.txt' || pathname.endsWith('/robots.txt')) {
      const origin = request.nextUrl.origin
      const body = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      })
    }

    if (pathname === '/sitemap.xml' || pathname.endsWith('/sitemap.xml')) {
      const origin = request.nextUrl.origin
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc></url>
</urlset>`
      return new NextResponse(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      })
    }

    const isStaticAsset = STATIC_ASSET_REGEX.test(pathname)

    // Skip middleware for static assets
    if (isStaticAsset) {
      return NextResponse.next()
    }

    // Handle domain redirects
    if (host && (host.includes('about-us') || host.includes('design-order'))) {
      const newUrl = new URL(url.pathname, 'https://midmac.design')
      return NextResponse.redirect(newUrl)
    }

    // Check if this is a projects route
    if (request.nextUrl.pathname.startsWith('/projects/')) {
      const slug = request.nextUrl.pathname.split('/projects/')[1]
      const locale = request.nextUrl.searchParams.get('locale') || 'en'

      // If the slug matches a known page route, redirect
      if (PAGE_ROUTES.includes(slug)) {
        return NextResponse.redirect(new URL(`/${slug}?locale=${locale}`, request.url))
      }
    }

    const response = NextResponse.next()

    // Add security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    // Add caching headers for static assets
    if (
      request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/static/') ||
      request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|svg|ico)$/)
    ) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }

    // Add caching for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next/|api/|static/|favicon.ico).*)',
    // Optional: Include your API routes
    '/api/:path*',
    '/projects/:path*',
  ],
} 