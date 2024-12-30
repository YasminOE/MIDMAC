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
 const pagesFetched = JSON.parse(JSON.stringify(pages)) as PageType
 console.log("generateStaticParams",pagesFetched)

  const locales = ['en', 'ar']

  return pagesFetched.docs.flatMap(({ slug }) => {
    console.log("slug",slug)
    return locales.map((locale) => ({
      slug: slug,
      locale: locale,
    }))
  })
}

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ locale?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug = 'index' } = await params
  const { locale = 'en' } = await searchParams

  const page = await queryPageBySlug({
    slug,
    locale: locale as 'ar' | 'en' | 'all',
  })

  const pageFetched = JSON.parse(JSON.stringify(page)) as PageType
  console.log("Page",pageFetched)
  if (!pageFetched) {
    notFound()
  }

  return (
    <div className="container-wrapper">
      {pageFetched.layout && <RenderBlocks blocks={pageFetched.layout} />}
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

    const page = JSON.parse(JSON.stringify(result.docs?.[0])) as PageType
    console.log("queryPageBySlug",page)
    return page || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
})