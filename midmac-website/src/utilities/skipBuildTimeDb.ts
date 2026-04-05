/**
 * Use in generateStaticParams when MongoDB may be unreachable (local build,
 * CI without secrets, or IP not allowlisted on Atlas).
 *
 * Set SKIP_BUILD_STATIC_GENERATION=1 in .env.local to skip DB calls during
 * `next build` without removing DATABASE_URI.
 */
export function shouldSkipBuildTimeDb(): boolean {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === '1') {
    return true
  }
  if (!process.env.DATABASE_URI?.trim()) {
    return true
  }
  return false
}
