#!/usr/bin/env node
/**
 * Look up a Payload user by email and print roles (uses DATABASE_URI / DATABASE_URL).
 * Usage: pnpm run check:user -- you@example.com
 * (pnpm forwards "--"; we strip it from argv.)
 */
import mongoose from 'mongoose'

const argvArgs = process.argv.slice(2).filter((a) => a !== '--')
const email = (argvArgs[0] || '').trim().toLowerCase()
if (!email) {
  console.error('Usage: pnpm run check:user -- <email>')
  process.exit(1)
}

const uri = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()
if (!uri) {
  console.error('Set DATABASE_URI or DATABASE_URL in .env')
  process.exit(1)
}

const rest = uri.replace(/^mongodb(\+srv)?:\/\//i, '')
const host = (rest.includes('@') ? rest.split('@').slice(1).join('@') : rest).split(/[/:?#]/)[0]?.toLowerCase() ?? ''
if (host === 'localhost' || host === '127.0.0.1') {
  console.error('DATABASE_URI points at localhost. Use your Atlas URI in .env to inspect production users.')
  process.exit(1)
}

await mongoose.connect(uri, { serverSelectionTimeoutMS: 15_000 })
try {
  const col = mongoose.connection.db.collection('users')
  const doc = await col.findOne({ email: { $regex: new RegExp(`^${escapeRegex(email)}$`, 'i') } })
  if (!doc) {
    console.log(`No user found with email matching: ${email}`)
    process.exit(0)
  }
  const roles = doc.roles
  const isAdmin = Array.isArray(roles) && roles.includes('admin')
  console.log(JSON.stringify({ id: String(doc._id), email: doc.email, roles: roles ?? null, isAdmin }, null, 2))
} finally {
  await mongoose.disconnect().catch(() => {})
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
