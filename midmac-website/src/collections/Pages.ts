import { Hero } from '@/blocks/Hero'
import { Services } from '@/blocks/Services'
import { ProgressImages } from '@/blocks/ProgressImages'
import { authenticated, isAdminAuthenticated } from '../hooks/authenticated'
import type { CollectionConfig } from 'payload'
import { Projects } from '@/blocks/Projects'
import { AboutHero } from '@/blocks/AboutHero'
import { TeamMembers } from '@/blocks/TeamMembers'
import { Contacts } from '@/blocks/Contacts'


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
        delete: isAdminAuthenticated,
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
                AboutHero,
                TeamMembers,
                Contacts,
            ],
        },
    ],
    versions: {
        drafts: {
          autosave: true
        },
        maxPerDoc: 50,
    },
}