import PageTemplate from '../[slug]/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Order',
  description: 'MIDMAC Design Order Form',
}

export default async function DesignOrderPage(props: any) {
  return PageTemplate({
    ...props,
    params: Promise.resolve({ slug: 'design-order' }),
  })
} 