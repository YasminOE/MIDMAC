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
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Navigation Buttons - Moved inside the container */}
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
        </div>
      </div>
    </div>
  )
}