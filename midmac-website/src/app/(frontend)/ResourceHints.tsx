'use client'

import { useEffect } from 'react'

/**
 * Injects preconnect/dns-prefetch for image and API origins so the browser
 * can open connections earlier and speed up first load.
 */
export function ResourceHints() {
  useEffect(() => {
    const origins = ['https://midmac.design', 'https://www.midmac.design']
    origins.forEach((href) => {
      if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }, [])
  return null
}
