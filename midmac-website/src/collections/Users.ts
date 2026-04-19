import type { Access, CollectionConfig, FieldAccess, Payload } from 'payload'
import { User } from '@/payload-types'

type PayloadReq = { user?: User | null; payload: Payload }

/** Session/JWT often omits `roles`; load from DB so admin checks work in the admin UI. */
async function getUserFromDb(req: PayloadReq): Promise<User | null> {
  const u = req.user as User | null
  if (!u?.id) return null
  try {
    const doc = await req.payload.findByID({
      collection: 'users',
      id: u.id,
      depth: 0,
      overrideAccess: true,
    })
    return doc as User
  } catch {
    return null
  }
}

const isAdmin: Access = async ({ req }) => {
  const full = await getUserFromDb(req as PayloadReq)
  return Boolean(full?.roles?.includes('admin'))
}

const isAdminOrSelf: Access = async ({ req, id }) => {
  const full = await getUserFromDb(req as PayloadReq)
  if (!full) return false
  if (full.roles?.includes('admin')) return true
  return Boolean(full.id === id)
}

const isAdminFieldLevel: FieldAccess = async ({ req }) => {
  const full = await getUserFromDb(req as PayloadReq)
  return Boolean(full?.roles?.includes('admin'))
}

/** Bootstrap when DB is empty, or any logged-in admin (resolved from DB). */
const allowFirstUserOrAdminCreate: Access = async ({ req }) => {
  const full = await getUserFromDb(req as PayloadReq)
  if (full?.roles?.includes('admin')) return true
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
