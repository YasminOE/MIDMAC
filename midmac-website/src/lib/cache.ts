import { getCache, setCache } from './redis'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function withCache(
  request: NextRequest,
  handler: () => Promise<Response>,
  options: {
    duration?: number
    tags?: string[]
    revalidate?: boolean
  } = {}
) {
  const cacheKey = request.url
  
  // Skip cache for non-GET requests
  if (request.method !== 'GET') {
    return handler()
  }

  // Try to get from cache first
  const cached = await getCache<Response>(cacheKey)
  if (cached && !options.revalidate) {
    return NextResponse.json(cached)
  }

  // Get fresh data
  const response = await handler()
  const data = await response.json()

  // Cache the fresh data
  await setCache(cacheKey, data, options.duration)

  return NextResponse.json(data)
}

// Helper to generate cache keys
export function createCacheKey(...parts: (string | number)[]): string {
  return parts.join(':')
}

// Helper to create tag-based cache keys
export function createTaggedCacheKey(baseKey: string, tags: string[]): string {
  return `${baseKey}:${tags.sort().join('.')}`
} 