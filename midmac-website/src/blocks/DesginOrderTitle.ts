import { Block } from 'payload'

export const DesignOrderTitle: Block = {
  slug: 'designOrderTitle',
  imageAltText: 'Design Order Title block',
  interfaceName: 'DesignOrderTitleBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      required: true,
      label: 'Main Title',
      localized: true,
    },
    {
      name: 'subTitle',
      type: 'richText',
      required: true,
      label: 'Sub Title',
      localized: true,
    },
  ]
}