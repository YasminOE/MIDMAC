'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/utilities/cn'
import { IMAGE_PLACEHOLDER_BLUR } from '@/constants/imagePlaceholders'

type ImageWithLoaderProps = ImageProps & {
  /** Optional class for the wrapper (e.g. for aspect ratio / layout) */
  wrapperClassName?: string
}

/**
 * Wraps next/image with a gradient loading state. Shows a subtle shimmer until the image loads,
 * then fades in the image. Use blurDataURL so the placeholder is never the browser’s “?” icon.
 */
export function ImageWithLoader({
  className,
  wrapperClassName,
  onLoad,
  placeholder = 'blur',
  blurDataURL = IMAGE_PLACEHOLDER_BLUR,
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true)
    onLoad?.(e)
  }

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {/* Gradient shimmer – visible until image loads */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#3d3d3d] to-[#1a1a1a] transition-opacity duration-500',
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        <div
          className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"
          aria-hidden
        />
      </div>
      <Image
        {...props}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-500',
          !loaded && 'opacity-0',
          loaded && 'opacity-100',
          className
        )}
      />
    </div>
  )
}
