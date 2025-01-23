import PageTemplate from '../[slug]/page'

export default async function DesignOrderPage(props: any) {
  return PageTemplate({
    ...props,
    params: Promise.resolve({ slug: 'design-order' }),
  })
} 