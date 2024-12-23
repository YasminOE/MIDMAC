import { Hero } from '@/blocks/Hero'
import { authenticated } from '@/hooks/authenticated'
import type { CollectionConfig } from 'payload'

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
                {
                    slug: 'services',
                    interfaceName: 'ServicesBlock',
                    fields: [
                        {
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'services',
                            type: 'array',
                            fields: [
                                {
                                    name: 'name',
                                    label: 'Name',
                                    type: 'text',
                                    required: true,
                                }
                            ]
                        }
                    ]
                },
                {
                    slug: 'showcase',
                    interfaceName: 'ShowcaseBlock',
                    fields: [
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                        }
                    ]
                },
                {
                    slug: 'projects',
                    interfaceName: 'ProjectsBlock',
                    fields: [
                        {
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'projects',
                            type: 'relationship',
                            relationTo: 'projects',
                            hasMany: true,
                        }
                    ]
                }
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