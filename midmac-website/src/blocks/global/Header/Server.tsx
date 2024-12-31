import React from 'react'

import { getPayload } from 'payload'
import config from '@payload-config'
import HeaderNav from '@/components/ui/header'

export default async function HeaderServer() {
    
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({
    slug: 'header',
  })
  
  return <HeaderNav HeaderLinks={header.links} />
  
}

