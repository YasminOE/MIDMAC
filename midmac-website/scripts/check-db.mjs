#!/usr/bin/env node
/**
 * Local Mongo sanity check (same timeouts as payload.config).
 * Run from midmac-website:  pnpm run check:db
 *
 * Uses DATABASE_URI from .env via Node --env-file (Node 20+).
 */
import dns from 'node:dns/promises'
import net from 'node:net'
import mongoose from 'mongoose'

const uri = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()
if (!uri) {
  console.error('❌ Set DATABASE_URI or DATABASE_URL in .env')
  process.exit(1)
}

/** Host after @ for mongodb+srv://… (no path/query). */
function srvHostnameFromUri(u) {
  const m = u.match(/^mongodb\+srv:\/\/[^@]+@([^/?#]+)/i)
  return m ? m[1] : null
}

/** @returns {Promise<import('node:dns').SrvRecord[] | null>} */
async function preflightSrv(hostname) {
  const name = `_mongodb._tcp.${hostname}`
  console.log('SRV lookup:', name)
  try {
    const records = await dns.resolveSrv(name)
    if (!records?.length) {
      console.error('❌ SRV returned no targets — DNS or cluster hostname typo')
      return null
    }
    console.log(
      '   targets:',
      records.map((r) => `${r.name}:${r.port}`).join(', '),
    )
    return records
  } catch (e) {
    console.error('❌ SRV lookup failed:', e?.message || e)
    console.error('   Fix DNS/VPN or confirm Atlas “Connect” string matches this project.')
    return null
  }
}

/** Raw TCP to shard: if this fails, Mongo TLS never starts (firewall/VPN/ISP). */
function probeTcp(host, port, ms = 5000) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, family: 0 })
    const finish = (result) => {
      socket.removeAllListeners()
      try {
        socket.destroy()
      } catch {
        /* ignore */
      }
      resolve(result)
    }
    socket.setTimeout(ms)
    socket.on('connect', () => finish({ ok: true }))
    socket.on('timeout', () => finish({ ok: false, reason: `timeout after ${ms}ms` }))
    socket.on('error', (e) => finish({ ok: false, reason: e.code || e.message }))
  })
}

async function preflightTcp(records) {
  console.log('TCP probe (5s each, first reachable wins) …')
  const results = await Promise.all(
    records.map(async (r) => {
      const res = await probeTcp(r.name, r.port, 5000)
      return { host: r.name, port: r.port, ...res }
    }),
  )
  for (const row of results) {
    const label = `${row.host}:${row.port}`
    if (row.ok) console.log('   ✅', label, 'TCP reachable')
    else console.log('   ❌', label, '→', row.reason)
  }
  const any = results.some((r) => r.ok)
  if (!any) {
    console.error(
      '\nNone of the Atlas shard hosts accepted TCP. That is almost always:',
    )
    console.error('  • VPN or corporate firewall blocking outbound 27017')
    console.error('  • Hotel/campus/guest Wi‑Fi blocking non‑HTTP ports')
    console.error('Try: disable VPN, different network (phone hotspot), or allow MongoDB in firewall.')
    return false
  }
  console.log(
    '\nTCP is fine → problem is likely TLS, auth (user/password), or cluster state (paused).',
  )
  console.log('Next: mongosh with same URI, or reset DB user password in Atlas and re-copy string.\n')
  return true
}

console.log('Connecting with serverSelectionTimeoutMS=10s …')
console.log('Host (redacted):', uri.replace(/:[^:@/]+@/, ':****@'))

const srvHost = srvHostnameFromUri(uri)
if (srvHost) {
  const records = await preflightSrv(srvHost)
  if (!records) process.exit(1)
  const tcpOk = await preflightTcp(records)
  if (!tcpOk) process.exit(1)
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
