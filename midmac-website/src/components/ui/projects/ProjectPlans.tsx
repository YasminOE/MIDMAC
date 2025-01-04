'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Project } from '@/payload-types'
import GoForward from '@/assets/images/go-forward.svg'
import GoBackward from '@/assets/images/go-backward.svg'

type ProjectPlansProps = {
  plans: Project['plans']
}

export const ProjectPlans = ({ plans }: ProjectPlansProps) => {
  const plansFetched = JSON.parse(JSON.stringify(plans))
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
    <div className="mb-2">
      <div className="relative px-4">
        <div className="overflow-hidden">
          <div className="relative aspect-[3/2] md:aspect-[2/1] w-full">
            <AnimatePresence initial={false}>
              {typeof plansFetched[currentIndex]?.plan !== 'string' && plansFetched[currentIndex]?.plan?.url && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={plansFetched[currentIndex].plan.url}
                    alt={plansFetched[currentIndex].plan.alt || `Project plan ${currentIndex + 1}`}
                    fill
                    className="object-contain p-2 md:p-4"
                    quality={100}
                    sizes="100%"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-2 mt-2">
          <button 
            onClick={handlePrevious}
            disabled={isFirstImage}
            className={`p-2 pr-0 transition-opacity ${
              isFirstImage ? 'opacity-30' : 'hover:opacity-75'
            }`}
          >
            <Image
              src={GoForward}
              alt="Previous"
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
          <button 
            onClick={handleNext}
            disabled={isLastImage}
            className={`p-2 pl-0 transition-opacity ${
              !hasNextImage ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <Image
              src={GoForward}
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  )
}