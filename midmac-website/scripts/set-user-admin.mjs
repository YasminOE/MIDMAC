#!/usr/bin/env node
/**
 * Set Payload user roles to admin by email (DATABASE_URI / DATABASE_URL).
 * Usage: pnpm run set:admin -- you@example.com
 */
import mongoose from 'mongoose'

const argvArgs = process.argv.slice(2).filter((a) => a !== '--')
const email = (argvArgs[0] || '').trim().toLowerCase()
if (!email) {
  console.error('Usage: pnpm run set:admin -- <email>')
  process.exit(1)
}

const uri = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()
if (!uri) {
  console.error('Set DATABASE_URI or DATABASE_URL in .env')
  process.exit(1)
}

await mongoose.connect(uri, { serverSelectionTimeoutMS: 15_000 })
try {
  const col = mongoose.connection.db.collection('users')
  const filter = { email: { $regex: new RegExp(`^${escapeRegex(email)}$`, 'i') } }
  const doc = await col.findOne(filter)
  if (!doc) {
    console.error(`No user found with email matching: ${email}`)
    process.exit(1)
  }
  const res = await col.updateOne(filter, { $set: { roles: ['admin'] } })
  if (res.modifiedCount === 0 && res.matchedCount > 0) {
    console.log(JSON.stringify({ id: String(doc._id), email: doc.email, roles: doc.roles, note: 'already admin' }, null, 2))
  } else {
    console.log(JSON.stringify({ id: String(doc._id), email: doc.email, roles: ['admin'], updated: true }, null, 2))
  }
} finally {
  await mongoose.disconnect().catch(() => {})
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
