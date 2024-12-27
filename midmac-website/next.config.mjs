import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n:{
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  }
}

export default withPayload(nextConfig)
