import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    labels: {
        singular: 'Project',
        plural: 'Projects',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'titleAr',
                    label: 'Arabic Title',
                    type: 'text',
                },
            ],
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
            localized: true,
        },
        {
            name: 'projectDetails',
            type: 'group',
            label: 'Project Details',
            fields: [
                {
                    name: 'city',
                    type: 'text',
                    label: 'City',
                    localized: true,
                },
                {
                    name: 'size',
                    type: 'text',
                    label: 'Size',
                    localized: true,
                },
                {
                    name: 'year',
                    type: 'text',
                    label: 'Year',
                    localized: true
                },
            ],
        },
        {
            name: 'media',
            type: 'array',
            label: 'Media',
            maxRows: 5,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'plans',
            type: 'array',
            label: 'Plans',
            fields: [
                {
                    name: 'plan',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}
