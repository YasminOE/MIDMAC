'use client'

import { useState } from 'react'
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

  const mediaFetched = JSON.parse(JSON.stringify(media))
  if (!mediaFetched?.length) return null

  const currentImage = mediaFetched[selectedIndex]?.image
  if (typeof currentImage === 'string' || !currentImage?.url) return null

  return (
    <div className="grid grid-cols-[1fr,80px] gap-6 h-full">
      {/* Main Preview Image */}
      <div className="relative aspect-[4/3] h-full max-h-full w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{
              duration: 1.2,
              easeIn: [0.56, 0, 0.17, 0.1],
              type: "tween"
            }}
            style={{ position: 'absolute', inset: 0 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt || 'Project image'}
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Column */}
      <div className="flex justify-between flex-col h-full gap-6 relative">
        {mediaFetched.map((mediaItem: MediaItem, index: number) => {
          if (typeof mediaItem.image === 'string' || !mediaItem.image?.url) return null
          
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-[3/4] mb-8 w-full group"
            >
              <Image
                src={mediaItem.image.url}
                alt={mediaItem.image.alt || `Project thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={100}
              />
              <div className={`absolute inset-0 transition-opacity ${
                selectedIndex === index
                  ? 'bg-[rgba(30,30,30,0.7)]'
                  : 'bg-transparent group-hover:bg-[rgba(30,30,30,0.7)]'
              }`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}