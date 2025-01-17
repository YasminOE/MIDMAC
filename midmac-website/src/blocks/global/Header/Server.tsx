import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeaderNav from '@/components/ui/header'
import { headers } from 'next/headers'

export default async function HeaderServer() {
  const headersList = await headers()
  const nextUrl = headersList.get('x-next-url')
  let locale: 'en' | 'ar' = 'en'

  if (nextUrl) {
    const searchParams = nextUrl.split('?')[1]
    const urlParams = new URLSearchParams(searchParams || '')
    const urlLocale = urlParams.get('locale')
    if (urlLocale === 'ar') {
      locale = 'ar'
    }
  }

  const payload = await getPayload({ config })

  try {
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 2,
      locale,
    })

    if (!header?.links) {
      console.error('No header links found')
      return null
    }

    return <HeaderNav HeaderLinks={header.links} />
  } catch (error) {
    console.error('Error fetching header:', error)
    return null
  }
}

