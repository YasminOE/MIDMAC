import { Hero } from '@/blocks/Hero'
import { Services } from '@/blocks/Services'
import { ProgressImages } from '@/blocks/ProgressImages'
import { authenticated } from '@/hooks/authenticated'
import type { CollectionConfig } from 'payload'
import { Projects } from '@/blocks/Projects'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    access: {
        read: () => true,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
      },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true,
        },
        {
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            minRows: 1,
            blocks: [
                Hero,
                Services,
                ProgressImages,
                Projects,
            ],
        },
    ],
    versions: {
        drafts: {
          autosave: {
            interval: 100, // We set this interval for optimal live preview
        },
    },
    maxPerDoc: 50,
  },
}