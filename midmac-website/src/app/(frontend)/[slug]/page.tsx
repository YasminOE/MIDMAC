import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    locale: 'en',
    draft: false,
    limit: 1000,
    where: {
      slug: {
        not_equals: 'index',
      },
    },
  })

  const locales = ['en', 'ar']

  return pages.docs.flatMap(({ slug }) => {
    return locales.map((locale) => ({
      slug: slug,
      locale: locale,
    }))
  })
}

type Props = {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const slug = params.slug || 'index'
  const locale = (searchParams?.locale as string) || 'en'

  const page = await queryPageBySlug({
    slug,
    locale: locale as 'ar' | 'en' | 'all',
  })

  if (!page) {
    notFound()
  }

  return (
    <div className="container-wrapper">
      {page.layout && <RenderBlocks blocks={page.layout} />}
    </div>
  )
}

const queryPageBySlug = cache(async ({
  slug,
  locale
}: {
  slug: string
  locale: 'ar' | 'en' | 'all'
}): Promise<PageType | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'pages',
      draft,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      locale: locale as 'ar' | 'en' | 'all',
    })

    return result.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
})