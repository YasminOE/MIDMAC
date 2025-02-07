import { withPayload } from '@payloadcms/next/withPayload'
import DependencyCheckWebpackPlugin from 'dependency-check-webpack-plugin'
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n:{
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
      {
        domain: 'midmac.design',
        defaultLocale: 'en',
      },
      {
        domain: 'ar.midmac.design',
        defaultLocale: 'ar',
      }
    ]
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    domains: ['midmac.design', 'www.midmac.design'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.midmac.design',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'midmac.design', 'www.midmac.design']
    },
    optimizePackageImports: ['@payloadcms/richtext-lexical', 'lucide-react'],
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    new DependencyCheckWebpackPlugin({})

    const configCopy = { ...config }
    
    // Add module resolution
    configCopy.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensionAlias: {
        '.js': ['.ts', '.js', '.tsx', '.jsx'],
        '.mjs': ['.mts', '.mjs'],
      },
    }
    
    // Enhanced optimization settings
    configCopy.optimization = {
      ...configCopy.optimization,
      moduleIds: 'deterministic',
      concatenateModules: true,
      minimize: !dev,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    }

    return configCopy
  },
  // Enable HTTP/2 Server Push
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|css|js|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
