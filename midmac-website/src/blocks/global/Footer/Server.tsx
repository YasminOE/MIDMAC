import React from 'react'
import { unstable_rethrow } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Footer from '@/components/ui/footer'
import { shouldSkipBuildTimeDb } from '@/utilities/skipBuildTimeDb'

export default async function FooterServer() {
  if (shouldSkipBuildTimeDb()) {
    return <Footer Footer={{}} />
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const footer = await payload.findGlobal({
      slug: 'footer',
    })

    return <Footer Footer={footer} />
  } catch (error) {
    unstable_rethrow(error)
    console.error('Error fetching footer:', error)
    return <Footer Footer={{}} />
  }
}