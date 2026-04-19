/**
 * Seeds default Pages (layout blocks + placeholder media/project) so you can
 * replace images, copy, and relationships in the Payload admin.
 *
 * Usage (from midmac-website):
 *   pnpm run seed:pages
 *   pnpm run seed:pages -- --force   # delete existing seed slugs first, then recreate
 *
 * Requires DATABASE_URI or DATABASE_URL in .env (Atlas or local Mongo).
 */
import mongoose from 'mongoose'

import { getPayload } from 'payload'
import config from '@payload-config'

/** 1×1 transparent PNG */
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const SEED_MEDIA_ALT = '__SEED_PLACEHOLDER__'
const SEED_PROJECT_TITLE = '__SEED_PLACEHOLDER_PROJECT__'

const SEED_SLUGS = ['index', 'who-we-are', 'design-order'] as const

function databaseUrlLooksLocal(u: string): boolean {
  const rest = u.replace(/^mongodb(\+srv)?:\/\//i, '')
  const afterAt = rest.includes('@') ? rest.split('@').slice(1).join('@') : rest
  const host = afterAt.split(/[/:?#]/)[0]?.toLowerCase() ?? ''
  return host === 'localhost' || host === '127.0.0.1'
}

const dbUrl = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()
if (!dbUrl) {
  console.error('❌ DATABASE_URI / DATABASE_URL is missing in .env')
  console.error('   Add your Atlas string (mongodb+srv://…) to midmac-website/.env, then run again.')
  process.exit(1)
}
if (databaseUrlLooksLocal(dbUrl)) {
  console.error('❌ DATABASE_URI still points at localhost — nothing is listening on port 27017.')
  console.error('   Replace it with the full Atlas URI from MongoDB Atlas → Connect → Drivers.')
  console.error('   Verify: pnpm run check:db')
  process.exit(1)
}

function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
    },
  }
}

function localized<T>(en: T, ar: T): { en: T; ar: T } {
  return { en, ar }
}

async function ensurePlaceholderMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: SEED_MEDIA_ALT } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs[0]?.id) {
    return String(existing.docs[0].id)
  }

  const created = await payload.create({
    collection: 'media',
    data: { alt: SEED_MEDIA_ALT },
    file: {
      data: PLACEHOLDER_PNG,
      name: 'seed-placeholder.png',
      mimetype: 'image/png',
      size: PLACEHOLDER_PNG.length,
    },
    overrideAccess: true,
  })
  return String(created.id)
}

async function ensurePlaceholderProject(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'projects',
    where: { title: { equals: SEED_PROJECT_TITLE } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs[0]?.id) {
    return String(existing.docs[0].id)
  }

  const created = await payload.create({
    collection: 'projects',
    data: {
      title: SEED_PROJECT_TITLE,
      titleAr: SEED_PROJECT_TITLE,
    },
    overrideAccess: true,
  })
  return String(created.id)
}

function buildHomeLayout(mediaId: string, projectId: string) {
  return [
    {
      blockType: 'hero' as const,
      images: {
        backgroundImage: mediaId,
        backgroundImageMobile: mediaId,
        foregroundImage: localized(mediaId, mediaId),
        foregroundImageMobile: localized(mediaId, mediaId),
      },
      settings: {
        fullHeight: true,
        imageRatio: 'equal' as const,
      },
    },
    {
      blockType: 'services' as const,
      blockId: 'services',
      servicesImage: mediaId,
      ServiceTypes: {
        title: localized('Our services', 'خدماتنا'),
        settings: { layout: 'half' as const },
        services: localized(
          lexicalParagraph('Add service list in admin (rich text).'),
          lexicalParagraph('أضف قائمة الخدمات من اللوحة.'),
        ),
      },
    },
    {
      blockType: 'progressImages' as const,
      images: {},
    },
    {
      blockType: 'projects' as const,
      blockId: 'projects',
      title: localized('Selected work', 'أعمال مختارة'),
      projects: [{ project: projectId }],
    },
    {
      blockType: 'contacts' as const,
      blockId: 'contacts',
      contactInfo: {
        emailLabel: localized('EMAIL', 'البريد'),
        email: 'info@midmac.design',
        instagramLabel: localized('INSTAGRAM', 'إنستغرام'),
        instagram: 'midmac.design',
        phoneLabel: localized('PHONE', 'الهاتف'),
        phone: '+966 56 322 2396',
      },
      rightContent: {
        type: 'text' as const,
        content: localized('Get in touch', 'تواصل معنا'),
      },
    },
  ]
}

function buildAboutLayout(mediaId: string) {
  return [
    {
      blockType: 'aboutHero' as const,
      title: localized('Who we are', 'من نحن'),
      description: localized(
        lexicalParagraph('Replace this intro in admin with your real story (rich text).'),
        lexicalParagraph('استبدل هذا المقدمة من اللوحة.'),
      ),
    },
    {
      blockType: 'teamMembers' as const,
      title: localized('Team', 'الفريق'),
      members: [
        {
          image: mediaId,
          name: localized('Team member', 'عضو الفريق'),
          position: localized('Role', 'المنصب'),
          bio: localized('Short bio — edit in admin.', 'نبذة قصيرة — عرّف من اللوحة.'),
        },
      ],
    },
  ]
}

function buildDesignOrderLayout() {
  return [
    {
      blockType: 'designOrderTitle' as const,
      title: localized(lexicalParagraph('Design order'), lexicalParagraph('طلب تصميم')),
      subTitle: localized(
        lexicalParagraph('Tell us about your project — details go in admin.'),
        lexicalParagraph('صف مشروعك — التفاصيل من اللوحة.'),
      ),
    },
    {
      blockType: 'designOrderForm' as const,
    },
  ]
}

async function deleteSeedPages(payload: Awaited<ReturnType<typeof getPayload>>) {
  for (const slug of SEED_SLUGS) {
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 100,
      depth: 0,
      overrideAccess: true,
    })
    for (const doc of res.docs) {
      await payload.delete({
        collection: 'pages',
        id: doc.id,
        overrideAccess: true,
      })
      console.log(`Removed page slug=${slug} id=${doc.id}`)
    }
  }
}

async function main() {
  const force = process.argv.includes('--force')

  const payload = await getPayload({ config })

  try {
    if (force) {
      await deleteSeedPages(payload)
    }

    const mediaId = await ensurePlaceholderMedia(payload)
    const projectId = await ensurePlaceholderProject(payload)

    const specs: {
      slug: (typeof SEED_SLUGS)[number]
      name: { en: string; ar: string }
      layout:
        | ReturnType<typeof buildHomeLayout>
        | ReturnType<typeof buildAboutLayout>
        | ReturnType<typeof buildDesignOrderLayout>
    }[] = [
      {
        slug: 'index',
        name: localized('Home', 'الرئيسية'),
        layout: buildHomeLayout(mediaId, projectId),
      },
      {
        slug: 'who-we-are',
        name: localized('Who we are', 'من نحن'),
        layout: buildAboutLayout(mediaId),
      },
      {
        slug: 'design-order',
        name: localized('Design order', 'طلب تصميم'),
        layout: buildDesignOrderLayout(),
      },
    ]

    for (const spec of specs) {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: spec.slug } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (existing.docs.length && !force) {
        console.log(`Skip "${spec.slug}" — page already exists (use --force to replace).`)
        continue
      }

      await payload.create({
        collection: 'pages',
        data: {
          name: spec.name,
          slug: spec.slug,
          layout: spec.layout,
          _status: 'published',
        },
        overrideAccess: true,
      })
      console.log(`Created page "${spec.slug}" (published).`)
    }

    console.log('\nDone. In admin: replace __SEED_PLACEHOLDER__ media, update copy, and swap the placeholder project in the home "Projects" block.')
  } finally {
    await mongoose.disconnect().catch(() => undefined)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
