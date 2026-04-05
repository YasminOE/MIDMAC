// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { en } from '@payloadcms/translations/languages/en'
import { ar } from '@payloadcms/translations/languages/ar'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import Header from './collections/general/Header'
import Footer from './collections/general/Footer'

import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** https://payloadcms.com/docs/configuration/overview — absolute app URL (links, cookies, CSRF). */
function serverURLFromEnv(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    return `https://${vercel.replace(/\/$/, '')}`
  }
  return undefined
}

/** Deployment docs use DATABASE_URL; this project historically used DATABASE_URI. */
const databaseURL =
  (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()

const requiredEnv = [
  ['S3_BUCKET', process.env.S3_BUCKET],
  ['S3_ACCESS_KEY_ID', process.env.S3_ACCESS_KEY_ID],
  ['S3_SECRET_ACCESS_KEY', process.env.S3_SECRET_ACCESS_KEY],
  ['S3_REGION', process.env.S3_REGION],
] as const

const missingEnv = requiredEnv.filter(([, v]) => !v?.trim()).map(([k]) => k)
if (missingEnv.length > 0) {
  throw new Error(
    `Missing required env: ${missingEnv.join(', ')}. ` +
      'Set them in Vercel (Production + Preview). Supabase Storage S3 needs S3_ENDPOINT too.',
  )
}

const s3Bucket = process.env.S3_BUCKET!.trim()
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID!.trim()
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY!.trim()
const s3Region = process.env.S3_REGION!.trim()

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET?.trim()) {
  throw new Error('PAYLOAD_SECRET is required in production (Payload config overview).')
}

export default buildConfig({
  serverURL: serverURLFromEnv(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- MIDMAC',
      // favicon: './favicon.ico',
      // ogImage: './favicon.ico',
      // icons: [
      //   {
      //     url: './favicon-16x16.png',
      //     fetchPriority: 'high',
      //     sizes: '16x16',
      //   },
      // ],
      description: 'This is a custom meta description',
      icons: [
        {
          url: '/favicon.png',
          fetchPriority: 'high',
          sizes: '16x16',
        },
      ],
      openGraph: {
        description: 'This is a custom OG description',
        title: 'MIDMAC',
      },
    },
    theme: 'dark',
  },
  collections: [
    Pages,
    Projects,
    Media,
    Users,
  ],
  globals: [Header, Footer],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
    ],
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  i18n: {
    supportedLanguages: { en, ar },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: databaseURL,
    connectOptions: {
      // Default 30s holds serverless invocations open; fail faster so catch blocks run
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    },
  }),
  sharp,
  plugins: [
      s3Storage({
        collections: {
          'media': {
            prefix: 'media',
          },
        },
        bucket: s3Bucket,
        config: {
          credentials: {
            accessKeyId: s3AccessKeyId,
            secretAccessKey: s3SecretAccessKey,
          },
          region: s3Region,
          endpoint: process.env.S3_ENDPOINT,
          forcePathStyle: true,
          // ... Other S3 configuration
        },
      }),
    payloadCloudPlugin(),
    formBuilderPlugin({
      // defaultToEmail: 'elmahdijasmin@gmail.com',
      formOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
        ],
        admin: {
         group: 'General',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'General',
        },
      },
    }),
    // storage-adapter-placeholder
  ],
  email: resendAdapter({
    defaultFromAddress: 'info@midmac.design',
    defaultFromName: 'MIDMAC',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})