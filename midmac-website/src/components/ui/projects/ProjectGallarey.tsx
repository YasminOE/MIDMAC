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
    <div className="flex flex-col md:grid md:grid-cols-[1fr,100px] lg:grid-cols-[1fr,120px] xl:grid-cols-[1fr,140px] gap-4 px-4 h-auto md:h-[calc(100vh-400px)] min-h-[400px]">
      {/* Main Preview Image */}
      <div className="relative w-full aspect-[4/3] md:h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
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
              className="object-contain"
              priority={selectedIndex === 0}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) calc(100vw - 120px), (max-width: 1280px) calc(100vw - 140px), calc(100vw - 160px)"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Row/Column - Scrollable */}
      <div className="relative w-full md:h-full">
        <div className="md:absolute inset-0 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto scrollbar-thin">
          <div className="grid grid-flow-col md:grid-flow-row auto-cols-[80px] md:auto-cols-auto md:grid-cols-1 gap-4 pb-4">
            {mediaFetched.map((mediaItem: MediaItem, index: number) => {
              if (typeof mediaItem.image === 'string' || !mediaItem.image?.url) return null
              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="relative w-[80px] md:w-full aspect-square group overflow-hidden"
                >
                  <Image
                    src={mediaItem.image.url}
                    alt={mediaItem.image.alt || `Project thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, (max-width: 1280px) 120px, 140px"
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
    </div>
  )
}

