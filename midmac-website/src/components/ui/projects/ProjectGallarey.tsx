'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

interface MediaItem {
    image: {
      url: string;
      alt?: string;
      blurDataURL?: string;
    }
}

type ProjectGalleryProps = {
  media: MediaItem[]
}

export const ProjectGallery = ({ media }: ProjectGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  // Memoize the parsed media to prevent unnecessary re-parsing
  const mediaFetched = useMemo(() => {
    try {
      return media.map(item => ({
        ...item,
        image: {
          ...item.image,
          // Add blur hash or low-quality placeholder
          blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q==',
        }
      }))
    } catch (error) {
      console.error('Error parsing media:', error)
      return []
    }
  }, [media])
  
  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (!mediaFetched?.length) return null

  const currentImage = mediaFetched[selectedIndex]?.image
  if (typeof currentImage === 'string' || !currentImage?.url) return null

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr,100px] lg:grid-cols-[1fr,120px] xl:grid-cols-[1fr,140px] gap-4 px-4 h-auto md:h-[calc(100vh-400px)] min-h-[400px]">
      {/* Main Preview Image */}
      <div className="relative w-full aspect-[4/3] md:h-full overflow-hidden bg-[#1E1E1E]">
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
            className="relative w-full h-full flex items-center justify-center bg-[#1E1E1E]"
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt || 'Project image'}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority={selectedIndex === 0}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) calc(100vw - 120px), (max-width: 1280px) calc(100vw - 140px), calc(100vw - 160px)"
              onLoad={handleImageLoad}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Row/Column - Scrollable */}
      <div className="relative w-full md:h-full">
        <div className="md:absolute inset-0 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
          <div className="grid grid-flow-col md:grid-flow-row auto-cols-[80px] md:auto-cols-auto md:grid-cols-1 gap-4 pb-4">
            {mediaFetched.map((mediaItem: MediaItem, index: number) => {
              if (typeof mediaItem.image === 'string' || !mediaItem.image?.url) return null
              
              // Determine if this thumbnail should load eagerly
              const shouldLoadEager = index < 4 // Load first 4 thumbnails eagerly
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="relative w-[80px] md:w-full aspect-square group overflow-hidden bg-[#1E1E1E]"
                >
                  <Image
                    src={mediaItem.image.url}
                    alt={mediaItem.image.alt || `Project thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, (max-width: 1280px) 120px, 140px"
                    loading={shouldLoadEager ? "eager" : "lazy"}
                    quality={60} // Lower quality for thumbnails
                    placeholder="blur"
                    blurDataURL={mediaItem.image.blurDataURL}
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
      <style jsx global>{`
        .rtl {
          direction: rtl;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

