'use client'

import React from 'react'
import Image from 'next/image'
import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'
import { motion } from 'motion/react'

type Props = {
  className?: string
} & HeroBlockProps

const isMediaObject = (image: string | Media): image is Media => {
  return typeof image !== 'string' && 'url' in image;
};

export const HeroComponent: React.FC<Props> = ({ images }) => {
  if (!images?.backgroundImage || !images?.foregroundImage || !images?.foregroundImageMobile) {
    return null
  }

  // Type guard checks
  if (!isMediaObject(images.backgroundImage) ||
      !isMediaObject(images.foregroundImage) ||
      !isMediaObject(images.foregroundImageMobile) ||
      !images.backgroundImage.url ||
      !images.foregroundImage.url ||
      !images.foregroundImageMobile.url) {
    return null
  }

  return (
    <section id="hero" className="section w-full">
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
            alt={images.backgroundImage.alt || ''}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="row no-wrap relative top-[-165px] z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.55,
            easeIn: [0.61, 0.01, 0.39, 0.96],
            delay: 4.3
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
            alt={images.foregroundImage.alt || ''}
            width={(images.foregroundImage.width || 0) * 100}
            height={(images.foregroundImage.height || 0) * 100}
            priority
            quality={100}
            className="w-auto hidden md:block"
          />
          
          {/* Mobile Image */}
          <Image 
            src={images.foregroundImageMobile.url}
            alt={images.foregroundImageMobile.alt || ''}
            width={(images.foregroundImage.width || 0) * 100}
            height={(images.foregroundImage.height || 0) * 100}
            priority
            quality={100}
            className="w-auto block md:hidden"
          />
        </motion.div>
      </div>
    </section>
  )
}

