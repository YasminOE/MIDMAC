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
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  experimental: {
    reactCompiler: false,
    scrollRestoration: true,
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'midmac.design', 'www.midmac.design']
    },
    optimizePackageImports: ['@payloadcms/richtext-lexical', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config) => {
    new DependencyCheckWebpackPlugin({})

    const configCopy = { ...config }
    configCopy.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensionAlias: {
        '.js': ['.ts', '.js', '.tsx', '.jsx'],
        '.mjs': ['.mts', '.mjs'],
      },
    }
    
    // Add module concatenation optimization
    configCopy.optimization = {
      ...configCopy.optimization,
      moduleIds: 'deterministic',
      concatenateModules: true,
    }
    
    return configCopy
  },
}

export default withPayload(nextConfig)
