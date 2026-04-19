import type { Access, CollectionConfig, FieldAccess } from 'payload'
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

/** Admins invite users; when the database is empty, allow the bootstrap signup (no session yet). */
const allowFirstUserOrAdminCreate: Access = async ({ req }) => {
  const user = req.user as User | null
  if (user?.roles?.includes('admin')) return true
  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
    where: {},
  })
  return totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: allowFirstUserOrAdminCreate,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data
        const { totalDocs } = await req.payload.count({
          collection: 'users',
          overrideAccess: true,
          where: {},
        })
        if (totalDocs === 0) {
          return { ...data, roles: ['admin'] }
        }
        return data
      },
    ],
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
      admin: {
        description:
          'First account is always Admin. For additional users, only an Admin can set roles.',
      },
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
