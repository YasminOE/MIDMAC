'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type ProjectGalleryProps = {
  media: {
    image: string | Media
  }[]
}

export const ProjectGallery = ({ media }: ProjectGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!media?.length) return null

  const currentImage = media[selectedIndex]?.image
  if (typeof currentImage === 'string' || !currentImage?.url) return null

  return (
    <div className="grid grid-cols-[1fr,80px] gap-8 h-full">
      {/* Main Preview Image */}
      <div className="relative h-full">
        <Image
          src={currentImage.url}
          alt={currentImage.alt || 'Project image'}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        //   className="aspect-[4/6]"
        />
      </div>

      {/* Thumbnails Column */}
      <div className="flex flex-col justify-between h-full">
        {media.map((mediaItem, index) => {
          if (typeof mediaItem.image === 'string' || !mediaItem.image?.url) return null
          
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-[20/16] mb-4 w-full transition-opacity ${
                selectedIndex === index ? 'opacity-75' : 'opacity-100 hover:opacity-75'
              }`}
            >
              <Image
                src={mediaItem.image.url}
                alt={mediaItem.image.alt || `Project thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="180px"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}