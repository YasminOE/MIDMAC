/**
 * Skip Payload/Mongo during `next build` so builds succeed without Atlas (local, CI, Vercel).
 *
 * Next sets NEXT_PHASE=phase-production-build only while `next build` runs — never on
 * normal serverless requests — so production traffic still uses Mongo.
 *
 * Also: SKIP_BUILD_STATIC_GENERATION=1 (e.g. pnpm run build:local), or missing DB URL.
 */
export function shouldSkipBuildTimeDb(): boolean {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === '1') {
    return true
  }
  const dbUrl = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()
  if (!dbUrl) {
    return true
  }
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return true
  }
  return false
}
