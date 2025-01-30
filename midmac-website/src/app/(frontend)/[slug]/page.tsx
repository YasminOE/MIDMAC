import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'
import { Metadata } from 'next'

// Define type for Payload response
type PayloadPagesResponse = {
  docs: Array<{ slug: string }>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

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
  const pagesFetched = JSON.parse(JSON.stringify(pages)) as PayloadPagesResponse
  // console.log("generateStaticParams", pagesFetched)

  const locales = ['en', 'ar']

  return pagesFetched.docs.flatMap(({ slug }) => {
    // console.log("slug", slug)
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
      depth: 2,
    })

    if (!result.docs?.[0]) {
      return null
    }

    const page = JSON.parse(JSON.stringify(result.docs[0])) as PageType
    return page || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
})

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug = 'index' } = await params
  const { locale = 'en' } = await searchParams

  const page = await queryPageBySlug({
    slug,
    locale: locale as 'ar' | 'en' | 'all',
  })

  return {
    title: page?.name || 'MIDMAC',
    description: 'MIDMAC - Modern Interior Design & Manufacturing Architectural Company',
  }
}