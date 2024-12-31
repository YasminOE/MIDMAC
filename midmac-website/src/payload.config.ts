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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.S3_BUCKET) {
  throw new Error('S3_BUCKET environment variable is required');
}

if (!process.env.S3_ACCESS_KEY_ID) {
  throw new Error('S3_ACCESS_KEY_ID environment variable is required');
}

if (!process.env.S3_SECRET_ACCESS_KEY) {
  throw new Error('S3_SECRET_ACCESS_KEY environment variable is required');
}

if (!process.env.S3_REGION) {
  throw new Error('S3_REGION environment variable is required');
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- MIDMAC',
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Pages,
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
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
      s3Storage({
        collections: {
          'media': {
            prefix: 'media',
          },
        },
        bucket: process.env.S3_BUCKET,
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          },
          region: process.env.S3_REGION,
          endpoint: process.env.S3_ENDPOINT,
          forcePathStyle: true,
          // ... Other S3 configuration
        },
      }),
    payloadCloudPlugin(),
    formBuilderPlugin({
      defaultToEmail: 'elmahdijasmin@gmail.com',
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
})
