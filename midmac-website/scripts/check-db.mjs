#!/usr/bin/env node
/**
 * Local Mongo sanity check (same timeouts as payload.config).
 * Run from midmac-website:  pnpm run check:db
 *
 * Uses DATABASE_URI from .env via Node --env-file (Node 20+).
 */
import mongoose from 'mongoose'

const uri = process.env.DATABASE_URI?.trim()
if (!uri) {
  console.error('❌ DATABASE_URI is missing or empty in .env')
  process.exit(1)
}

console.log('Connecting with serverSelectionTimeoutMS=10s …')
console.log('Host (redacted):', uri.replace(/:[^:@/]+@/, ':****@'))

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
    connectTimeoutMS: 10_000,
  })
  console.log('✅ MongoDB connected. readyState=', mongoose.connection.readyState)
  await mongoose.connection.db.admin().command({ ping: 1 })
  console.log('✅ ping ok')
  await mongoose.disconnect()
  process.exit(0)
} catch (err) {
  console.error('❌ MongoDB failed:', err?.message || err)
  if (err?.name) console.error('   name:', err.name)
  if (err?.code) console.error('   code:', err.code)
  if (err?.reason?.type) console.error('   topology:', err.reason.type)
  console.error('\nAtlas often blames "IP whitelist" for auth/DNS issues too. Check:')
  console.error('  • Password URL-encoded in URI (@ # : / ? &)')
  console.error('  • Database user + password reset in Atlas if unsure')
  console.error('  • Network Access has 0.0.0.0/0 enabled (not only "pending")')
  console.error('  • Cluster green / not paused')
  console.error('\nMatch Vercel:  cd midmac-website && vercel env pull .env.vercel.local')
  process.exit(1)
}
