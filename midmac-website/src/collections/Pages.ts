import { Hero } from '@/blocks/Hero'
import { ProgressImages } from '@/blocks/ProgressImages'
import { Services } from '@/blocks/Services'
import { Access, CollectionConfig } from 'payload'
import { Projects } from '@/blocks/Projects'
import { Contacts } from '@/blocks/Contacts'
import { AboutHero } from '@/blocks/AboutHero'
import { TeamMembers } from '@/blocks/TeamMembers'
import { DesignOrderForm } from '@/blocks/DesginOrderForm'
import { DesignOrderTitle } from '@/blocks/DesginOrderTitle'

const isAdmin: Access = ({ req }) => {
    const user = req.user
    return Boolean(user?.roles?.includes('admin'))
}

const isAdminOrUser: Access = ({ req }) => {
    const user = req.user
    return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('user'))
}

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
        create: isAdmin,
        update: isAdminOrUser,
        delete: isAdmin,
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
                Contacts,
                AboutHero,
                TeamMembers,
                DesignOrderTitle,
                DesignOrderForm,
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