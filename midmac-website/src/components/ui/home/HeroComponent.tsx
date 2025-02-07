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

export const HeroComponent: React.FC<Props> = ({ images, settings }) => {
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
            <Image 
              src={BackgroundImage.url}
              alt={BackgroundImage.alt || ''}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q=="
            />
          </div>

          {/* Mobile Background */}
          <div className="relative w-full h-full block md:hidden">
            <Image 
              src={BackgroundImageMobile.url}
              alt={BackgroundImageMobile.alt || ''}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q=="
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
            <Image 
              src={ForegroundImage.url}
              alt={ForegroundImage.alt || ''}
              fill
              priority
              className="object-contain object-top"
              quality={100}
              loading="eager"
              sizes="80vw"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#888888"/></svg>'
              ).toString('base64')}`}
            />
          </div>
          
          {/* Mobile Foreground */}
          <div className="mt-40 relative w-full h-[80vh] block md:hidden px-4">
            <div className="relative w-full h-[30%] flex items-center justify-center">
              <Image 
                src={ForegroundImageMobile.url}
                alt={ForegroundImageMobile.alt || ''}
                fill
                priority
                className="object-contain object-center"
                quality={100}
                loading="eager"
                sizes="80vw"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                  '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="#888888"/></svg>'
                ).toString('base64')}`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

