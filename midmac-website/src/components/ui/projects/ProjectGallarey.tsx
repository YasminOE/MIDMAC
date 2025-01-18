'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

interface MediaItem {
    image: {
      url: string;
      alt?: string;
    }
}

type ProjectGalleryProps = {
  media: MediaItem[]
}

export const ProjectGallery = ({ media }: ProjectGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Memoize the parsed media to prevent unnecessary re-parsing
  const mediaFetched = useMemo(() => JSON.parse(JSON.stringify(media)), [media])
  
  if (!mediaFetched?.length) return null

  const currentImage = mediaFetched[selectedIndex]?.image
  if (typeof currentImage === 'string' || !currentImage?.url) return null

  return (
    <div className="grid grid-cols-[1fr,60px] md:grid-cols-[1fr,80px] gap-4 h-auto md:h-full px-4">
      {/* Main Preview Image */}
      <div className="relative h-[400px] md:aspect-auto md:h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt || 'Project image'}
              fill
              className="object-cover"
              priority={selectedIndex === 0}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Column */}
      <div className="flex flex-col h-[400px] md:h-full">
        <div className="grid grid-cols-1 gap-4 md:gap-6 h-full">
          {mediaFetched.map((mediaItem: MediaItem, index: number) => {
            if (typeof mediaItem.image === 'string' || !mediaItem.image?.url) return null
            
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className="relative w-full aspect-square group"
              >
                <Image
                  src={mediaItem.image.url}
                  alt={mediaItem.image.alt || `Project thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={60}
                  loading="eager"
                />
                <div 
                  className={`absolute inset-0 transition-opacity ${
                    selectedIndex === index
                      ? 'bg-[rgba(30,30,30,0.7)]'
                      : 'bg-transparent group-hover:bg-[rgba(30,30,30,0.7)]'
                  }`} 
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

