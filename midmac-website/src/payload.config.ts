// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { en } from '@payloadcms/translations/languages/en'
import { ar } from '@payloadcms/translations/languages/ar'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import Header from './collections/general/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, '../src/app/(payload)/custom.scss'),
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Pages,
  ],
  globals: [Header],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Arabic',
        code: 'ar',
        // opt-in to setting default text-alignment on Input fields to rtl (right-to-left)
        // when current locale is rtl
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
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
