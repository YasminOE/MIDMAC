import { withPayload } from '@payloadcms/next/withPayload'
import DependencyCheckWebpackPlugin from 'dependency-check-webpack-plugin'
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n:{
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  experimental: {
    reactCompiler: false,
    scrollRestoration: true,
    optimizeCss: true
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
    return configCopy
  },
}

export default withPayload(nextConfig)
