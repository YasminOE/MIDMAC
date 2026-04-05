import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const maxDuration = 30

/**
 * Temporary debugging: set DEBUG_DB_HEALTH=1 in Vercel (then remove).
 * GET /api/health → { ok } or { ok: false, error } to see why Mongo/Payload fails.
 */
export async function GET() {
  const showDetail =
    process.env.DEBUG_DB_HEALTH === '1' || process.env.NODE_ENV === 'development'

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.find({ collection: 'pages', limit: 1, depth: 0, locale: 'en' })
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      showDetail
        ? { ok: false, error: message }
        : {
            ok: false,
            error: 'unavailable',
            hint: 'Set DEBUG_DB_HEALTH=1 on Vercel, redeploy, call again, then unset.',
          },
      { status: 503 },
    )
  }
}
