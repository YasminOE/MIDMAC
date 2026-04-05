/**
 * Skip Payload/Mongo during `next build` when the DB is not reachable from
 * that environment (local without Atlas, CI, or Vercel build workers vs Atlas IP allowlist).
 *
 * - SKIP_BUILD_STATIC_GENERATION=1 — opt-in (e.g. pnpm run build:local)
 * - Missing DATABASE_URI
 * - Vercel **build only**: NEXT_PHASE=phase-production-build is set by Next during
 *   `next build`. It is **not** set on serverless requests, so production traffic still uses Mongo.
 */
export function shouldSkipBuildTimeDb(): boolean {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === '1') {
    return true
  }
  if (!process.env.DATABASE_URI?.trim()) {
    return true
  }
  if (
    process.env.VERCEL === '1' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return true
  }
  return false
}
