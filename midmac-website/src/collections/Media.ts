import type { Access, CollectionConfig } from 'payload'
import { User } from '@/payload-types'

const isAdminOrUser: Access = ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('user'))
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminOrUser,
    update: isAdminOrUser,
    delete: ({ req }) => {
      const user = req.user as User | null
      return Boolean(user?.roles?.includes('admin'))
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
