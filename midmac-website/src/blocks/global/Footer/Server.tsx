import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Footer from '@/components/ui/footer'
import { shouldSkipBuildTimeDb } from '@/utilities/skipBuildTimeDb'

export default async function FooterServer() {
  if (shouldSkipBuildTimeDb()) {
    return <Footer Footer={{}} />
  }

  const payload = await getPayload({ config: configPromise })
  const footer = await payload.findGlobal({
    slug: 'footer',
  })
  
  return <Footer Footer={footer} />
}