import { withPayload } from '@payloadcms/next/withPayload'

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
  }
}

export default withPayload(nextConfig)
