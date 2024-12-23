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
    upload: true,
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
    ],
}
