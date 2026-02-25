'use client'

import React from 'react'
import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'
import { motion } from 'motion/react'
import { ImageWithLoader } from '@/components/ui/ImageWithLoader'
import { IMAGE_PLACEHOLDER_BLUR } from '@/constants/imagePlaceholders'

type Props = {
  className?: string
} & HeroBlockProps

const isMediaObject = (image: string | Media): image is Media => {
  return typeof image !== 'string' && 'url' in image;
};

export const HeroComponent: React.FC<Props> = ({ images, settings: _settings }) => {
  if (!images?.backgroundImage || !images?.backgroundImageMobile || !images?.foregroundImage || !images?.foregroundImageMobile) {
    return null
  }

  const BackgroundImage = JSON.parse(JSON.stringify(images.backgroundImage))
  const BackgroundImageMobile = JSON.parse(JSON.stringify(images.backgroundImageMobile))
  const ForegroundImage = JSON.parse(JSON.stringify(images.foregroundImage))
  const ForegroundImageMobile = JSON.parse(JSON.stringify(images.foregroundImageMobile))

  // Type guard checks
  if (!isMediaObject(BackgroundImage) ||
      !isMediaObject(BackgroundImageMobile) ||
      !isMediaObject(ForegroundImage) ||
      !isMediaObject(ForegroundImageMobile) ||
      !BackgroundImage.url ||
      !BackgroundImageMobile.url ||
      !ForegroundImage.url ||
      !ForegroundImageMobile.url) {
    return null
  }

  return (
    <section id="hero" className="section w-full h-screen relative">
      <div className="absolute inset-0 w-full h-full">
        {/* Background Images Container */}
        <motion.div 
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Desktop Background */}
          <div className="relative w-full h-full hidden md:block">
            <ImageWithLoader
              src={BackgroundImage.url}
              alt={BackgroundImage.alt || ''}
              fill
              priority
              wrapperClassName="w-full h-full"
              className="object-cover"
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER_BLUR}
            />
          </div>

          {/* Mobile Background */}
          <div className="relative w-full h-full block md:hidden">
            <ImageWithLoader
              src={BackgroundImageMobile.url}
              alt={BackgroundImageMobile.alt || ''}
              fill
              priority
              wrapperClassName="w-full h-full"
              className="object-cover"
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER_BLUR}
            />
          </div>
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="absolute inset-0 flex items-start justify-center z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.55,
            easeIn: [0.61, 0.01, 0.39, 0.96],
            delay: 4.3
          }}
        >
          {/* Desktop Foreground */}
          <div className="relative w-[90%] h-[60vh] mt-52 hidden md:block">
            <ImageWithLoader
              src={ForegroundImage.url}
              alt={ForegroundImage.alt || ''}
              fill
              priority
              wrapperClassName="w-full h-full"
              className="object-contain object-top"
              quality={90}
              loading="eager"
              sizes="80vw"
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER_BLUR}
            />
          </div>
          
          {/* Mobile Foreground */}
          <div className="mt-40 relative w-full h-[80vh] block md:hidden px-4">
            <div className="relative w-full h-[30%] flex items-center justify-center">
              <ImageWithLoader
                src={ForegroundImageMobile.url}
                alt={ForegroundImageMobile.alt || ''}
                fill
                priority
                wrapperClassName="w-full h-full"
                className="object-contain object-center"
                quality={90}
                loading="eager"
                sizes="80vw"
                placeholder="blur"
                blurDataURL={IMAGE_PLACEHOLDER_BLUR}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

