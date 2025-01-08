import { Access, CollectionConfig, FieldAccess } from 'payload'
import { User } from '@/payload-types'

const isAdmin: Access = ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin'))
}

const isAdminOrSelf: Access = ({ req, id }) => {
  const user = req.user as User | null
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return Boolean(user.id === id)
}

const isAdminFieldLevel: FieldAccess = ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin'))
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: ['user'],
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'canEditProjects',
      type: 'checkbox',
      defaultValue: false,
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
      },
    },
  ],
}
