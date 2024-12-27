'use client'

import React from 'react'
import Image from 'next/image'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { motion } from 'motion/react'


type Props = {
  className?: string
} & HeroBlockProps

export const HeroComponent: React.FC<Props> = ({ 
  // className, 
  images
}) => {
  if (!images?.backgroundImage || !images?.foregroundImage || !images?.foregroundImageMobile) {
    return null
  }

  return (
    <section    
      id="hero" 
      className="section w-full"
    >
      <div className="row no-wrap justify-center items-center w-full h-full">
        {/* Background Image */}
        <motion.div 
          className="inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <Image 
            src={images.backgroundImage.url}
            alt={images.backgroundImage.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="row no-wrap relative top-[-165px] z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.7, 0, 0.3, 1],
            delay: 0.3 
          }}
          style={{
            maxWidth: '90vw',
            width: 'auto',
            height: 'auto',
          }}
        >
          {/* Desktop Image */}
          <Image 
            src={images.foregroundImage.url}
            alt={images.foregroundImage.alt}
            width={images.foregroundImage.width * 100}
            height={images.foregroundImage.height * 100}
            priority
            className="w-auto hidden md:block"
          />
          
          {/* Mobile Image */}
          <Image 
            src={images.foregroundImageMobile.url}
            alt={images.foregroundImageMobile.alt}
            width={images.foregroundImage.width * 100}
            height={images.foregroundImage.height * 100}
            priority
            className="w-auto block md:hidden"
          />

          
        </motion.div>
      </div>
    </section>
  )
}

