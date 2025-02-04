'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Project } from '@/payload-types'
import GoForward from '@/assets/images/go-forward.svg'
import GoBackward from '@/assets/images/go-backward.svg'

type ProjectPlansProps = {
  plans: Project['plans']
}

export const ProjectPlans = ({ plans }: ProjectPlansProps) => {
  // Memoize the parsed plans to prevent unnecessary re-parsing
  const plansFetched = useMemo(() => JSON.parse(JSON.stringify(plans)), [plans])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  if (!plansFetched?.length) return null

  const handleNext = () => {
    if (currentIndex < plansFetched.length - 1) {
      setDirection('forward')
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('backward')
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === plansFetched.length - 1
  const hasNextImage = currentIndex < plansFetched.length - 1

  return (
    <div className="container large mx-auto px-4">
      <div className="relative max-w-[1600px] 3xl:max-w-[2000px] mx-auto">
        <div className="overflow-hidden bg-[#1E1E1E]">
          {/* Fixed aspect ratio container */}
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <AnimatePresence initial={false}>
              {typeof plansFetched[currentIndex]?.plan !== 'string' && plansFetched[currentIndex]?.plan?.url && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.2 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                  <div className="relative w-full h-full max-w-[1400px] 3xl:max-w-[2800px] max-h-[787px] 3xl:max-h-[1012px] mx-auto">
                    <Image
                      src={plansFetched[currentIndex].plan.url}
                      alt={plansFetched[currentIndex].plan.alt || `Project plan ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1920px) 1800px, (max-width: 1200px) 90vw, 1400px"
                      priority={currentIndex === 0}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q=="
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Navigation Buttons - Only show if there's more than one plan */}
          {plansFetched.length > 1 && (
            <div className="flex justify-center py-2 bg-[#1E1E1E]">
              <button
                onClick={handlePrevious}
                disabled={isFirstImage}
                className={`p-1 transition-opacity ${
                  isFirstImage ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'
                }`}
                aria-label="Previous plan"
              >
                <Image
                  src={GoForward}
                  alt="Previous"
                  width={32}
                  height={32}
                  className="rotate-180"
                  loading="eager"
                />
              </button>
              <button
                onClick={handleNext}
                disabled={isLastImage}
                className={`p-1 transition-opacity ${
                  !hasNextImage ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'
                }`}
                aria-label="Next plan"
              >
                <Image
                  src={GoForward}
                  alt="Next"
                  width={32}
                  height={32}
                  loading="eager"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}