import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Footer from '@/components/ui/footer'

export default async function FooterServer() {
  const payload = await getPayload({ config: configPromise })
  const footer = await payload.findGlobal({
    slug: 'footer',
  })
  
  return <Footer Footer={footer} />
}