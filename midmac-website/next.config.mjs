import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n:{
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },
}
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default withPayload(nextConfig)
