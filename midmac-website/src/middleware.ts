import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of known page routes that should not be under /projects/
const PAGE_ROUTES = ['about-us', 'design-order', 'contact-us', 'contact', 'services']

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Handle domain redirects
  const host = request.headers.get('host')
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
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/:path*',
    '/projects/:path*',
  ],
} 