import { Access, AccessArgs } from 'payload'
import { User } from '../payload-types'

export const authenticated: Access = async ({ req }) => {
  // Check if user exists and is authenticated
  const user = req.user as User | null
  return Boolean(user)
}

// If you need a more specific type
export const isAuthenticated = async ({ req }: AccessArgs<User>): Promise<boolean> => {
  return Boolean(req.user)
}

// For admin-only access
export const isAdminAuthenticated: Access = async ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin'))
} 