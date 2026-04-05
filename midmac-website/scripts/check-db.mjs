#!/usr/bin/env node
/**
 * Local Mongo sanity check (same timeouts as payload.config).
 * Run from midmac-website:  pnpm run check:db
 *
 * Uses DATABASE_URI from .env via Node --env-file (Node 20+).
 */
import dns from 'node:dns/promises'
import mongoose from 'mongoose'

const uri = process.env.DATABASE_URI?.trim()
if (!uri) {
  console.error('❌ DATABASE_URI is missing or empty in .env')
  process.exit(1)
}

/** Host after @ for mongodb+srv://… (no path/query). */
function srvHostnameFromUri(u) {
  const m = u.match(/^mongodb\+srv:\/\/[^@]+@([^/?#]+)/i)
  return m ? m[1] : null
}

async function preflightSrv(hostname) {
  const name = `_mongodb._tcp.${hostname}`
  console.log('SRV lookup:', name)
  try {
    const records = await dns.resolveSrv(name)
    if (!records?.length) {
      console.error('❌ SRV returned no targets — DNS or cluster hostname typo')
      return false
    }
    console.log(
      '   targets:',
      records.map((r) => `${r.name}:${r.port}`).join(', '),
    )
    return true
  } catch (e) {
    console.error('❌ SRV lookup failed:', e?.message || e)
    console.error('   Fix DNS/VPN or confirm Atlas “Connect” string matches this project.')
    return false
  }
}

console.log('Connecting with serverSelectionTimeoutMS=10s …')
console.log('Host (redacted):', uri.replace(/:[^:@/]+@/, ':****@'))

const srvHost = srvHostnameFromUri(uri)
if (srvHost) {
  const ok = await preflightSrv(srvHost)
  if (!ok) process.exit(1)
  console.log('')
}

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

  if (err?.reason?.type === 'ReplicaSetNoPrimary') {
    console.error('\nReplicaSetNoPrimary = no node answered as primary in time. Common causes:')
    console.error('  • Cluster paused or still provisioning (Atlas → resume / wait)')
    console.error('  • Laptop VPN / corporate firewall blocking outbound to MongoDB (try hotspot, disable VPN)')
    console.error('  • Wrong cluster host in URI (old project / typo vs Atlas Connect string)')
    console.error('  • Auth/user issues sometimes surface here — reset DB user password, re-copy URI')
  }

  console.error('\nAlso verify:')
  console.error('  • Password URL-encoded in URI (@ # : / ? &)')
  console.error('  • Network Access: 0.0.0.0/0 active (not “pending”)')
  console.error('  • Same URI works in: mongosh "<paste DATABASE_URI>"')
  console.error('\nMatch Vercel:  cd midmac-website && vercel env pull .env.vercel.local')
  process.exit(1)
}
