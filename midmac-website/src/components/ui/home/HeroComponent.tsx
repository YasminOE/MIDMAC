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

  const BackgroundImage = JSON.parse(JSON.stringify(images.backgroundImage))
  const ForegroundImage = JSON.parse(JSON.stringify(images.foregroundImage))
  const ForegroundImageMobile = JSON.parse(JSON.stringify(images.foregroundImageMobile))

  // Type guard checks
  if (!isMediaObject(BackgroundImage) ||
      !isMediaObject(ForegroundImage) ||
      !isMediaObject(ForegroundImageMobile) ||
      !BackgroundImage.url ||
      !ForegroundImage.url ||
      !ForegroundImageMobile.url) {
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
            src={BackgroundImage.url}
            alt={BackgroundImage.alt || ''}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q=="
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="row no-wrap relative top-[-200px] z-10"
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
            src={ForegroundImage.url}
            alt={ForegroundImage.alt || ''}
            // width={1550}
            // height={37}
            width={(ForegroundImageMobile.width || 0) * 100}
            height={(ForegroundImageMobile.height || 0) * 100}
            priority
            quality={100}
            className="w-auto hidden md:block"
            loading="eager"
            // sizes="(min-width: 768px) 90vw, 0vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#888888"/></svg>'
            ).toString('base64')}`}
          />
          
          {/* Mobile Image */}
          <Image 
            src={ForegroundImageMobile.url}
            alt={ForegroundImageMobile.alt || ''}
            // width={55}
            // height={178}
            width={(ForegroundImageMobile.width || 0) * 100}
            height={(ForegroundImageMobile.height || 0) * 100}
            priority
            quality={100}
            className="w-full h-auto block md:hidden"
            loading="eager"
            // sizes="(max-width: 768px) 100vw"
            placeholder="blur"
            style={{
              maxWidth: '100vw',
              height: 'auto',
              objectFit: 'contain',
            }}
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#888888"/></svg>'
            ).toString('base64')}`}
          />
        </motion.div>
      </div>
    </section>
  )
}

