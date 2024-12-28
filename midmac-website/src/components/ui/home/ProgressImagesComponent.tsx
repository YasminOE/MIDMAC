'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, useAnimationControls } from 'framer-motion'
import type { ProgressImagesBlock as ProgressImagesBlockProps } from '@/payload-types'

type Props = {
  className?: string
} & ProgressImagesBlockProps 

export const ProgressImagesComponent: React.FC<Props> = ({ 
  className,
  images,
}) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  const imageArray = useMemo(() => {
    if (!images) return []
    return [
      images.image1,
      images.image2,
      images.image3,
      images.image4,
      images.image5
    ]
  }, [images])

  useEffect(() => {
    if (!images) return

    const animate = async () => {
      await new Promise(resolve => requestAnimationFrame(resolve))
      
      while (true) {
        try {
          await controls.start({
            x: [0, -100 * (imageArray.filter(Boolean).length - 1) + '%'],
            transition: {
              duration: 50,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          })
        } catch (error) {
          console.error('Animation error:', error)
          break
        }
      }
    }
    
    animate()
    
    return () => {
      controls.stop()
    }
  }, [controls, imageArray, images])

  if (!images) return null

  return (
    <section 
      ref={containerRef}
      className={`
        relative 
        w-full 
        h-screen 
        overflow-hidden
        ${className || ''}
      `} 
      id='progress-images'
    >
      <div className="absolute inset-0">
        <motion.div 
          className="flex h-full items-center"
          animate={controls}
        >
          {imageArray.filter(Boolean).map((image, index) => {
            if (!image) return null

            return (
              <motion.div 
                key={index}
                className="relative flex-shrink-0 w-screen h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.7, 0, 0.3, 1],
                //   delay: index * 0.2
                }}
              >
                <Image
                  src={typeof image === 'string' ? image : image?.url || ''}
                  alt={typeof image === 'string' ? '' : image?.alt || ''}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 90vw, 80vw"
                  priority={index === 0}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}