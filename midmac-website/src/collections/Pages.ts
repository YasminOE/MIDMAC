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

const isAdminOrUserForProjectsBlock: Access = ({ req, data }) => {
    const user = req.user
    if (user?.roles?.includes('admin')) return true
    
    // Allow users to update only if they're modifying the Projects block
    if (user?.roles?.includes('user') && data?.layout) {
        // Check if all changes are related to the Projects block
        const hasOnlyProjectsChanges = data.layout.every(block => {
            // Allow both existing Projects blocks and new ones
            return block.blockType === 'Projects'
        })
        return hasOnlyProjectsChanges
    }
    
    return false
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
        update: isAdminOrUserForProjectsBlock,
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
            access: {
                create: ({ req }) => {
                    const user = req.user
                    // Allow both admins and users to create Projects blocks
                    return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('user'))
                },
                update: ({ req, data }) => {
                    const user = req.user
                    if (user?.roles?.includes('admin')) return true
                    if (user?.roles?.includes('user')) {
                        // Allow users to update and create Projects blocks
                        return data?.blockType === 'Projects'
                    }
                    return false
                }
            }
        },
    ],
    versions: {
        drafts: {
          autosave: true
        },
        maxPerDoc: 50,
    },
}