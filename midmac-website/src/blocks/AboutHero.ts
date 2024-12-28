import { Block } from 'payload'

export const AboutHero: Block = {
  slug: 'aboutHero',
  imageAltText: 'About Hero block',
  interfaceName: 'AboutHeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    }
  ]
} 