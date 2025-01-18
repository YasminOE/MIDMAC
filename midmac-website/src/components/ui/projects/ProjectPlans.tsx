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
    <div className="mb-2 max-w-[1200px] mx-auto">
      <div className="relative px-4">
        <div className="overflow-hidden rounded-lg">
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
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
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="relative w-full h-full" style={{ maxWidth: '900px' }}>
                    <Image
                      src={plansFetched[currentIndex].plan.url}
                      alt={plansFetched[currentIndex].plan.alt || `Project plan ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
                      priority={currentIndex === 0}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-2 mt-4">
          <button 
            onClick={handlePrevious}
            disabled={isFirstImage}
            className={`p-2 pr-0 transition-opacity ${
              isFirstImage ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'
            }`}
            aria-label="Previous plan"
          >
            <Image
              src={GoForward}
              alt="Previous"
              width={24}
              height={24}
              className="rotate-180"
              loading="eager"
            />
          </button>
          <button 
            onClick={handleNext}
            disabled={isLastImage}
            className={`p-2 pl-0 transition-opacity ${
              !hasNextImage ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'
            }`}
            aria-label="Next plan"
          >
            <Image
              src={GoForward}
              alt="Next"
              width={24}
              height={24}
              loading="eager"
            />
          </button>
        </div>
      </div>
    </div>
  )
}