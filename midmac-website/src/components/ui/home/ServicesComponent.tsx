'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import RtlText from '../RtlText'
import { useSearchParams } from 'next/navigation'

type ServiceItem = {
  children: Array<{ text: string }>;
  type?: string;
}

type Props = {
  className?: string
} & ServicesBlockProps

export const ServicesComponent: React.FC<Props> = ({ 
  className,
  blockId,
  servicesImage,
  ServiceTypes,
}) => {
  const searchParams = useSearchParams();
  const isArabic = searchParams?.get('locale') === 'ar';

  if (!servicesImage || !ServiceTypes?.services?.root?.children?.[0]?.children) return null

  const serviceItems = ServiceTypes.services.root.children[0].children as ServiceItem[]

  return (
    <section className={`section ${className || ''}`} id={blockId || 'services'}>
      <div className="grid grid-cols-2 h-full">
        {/* Image Section */}
        <div className="relative h-full overflow-hidden">
          <motion.div
            className="relative h-full"
            initial={{ x: '0%' }}
            whileInView={{
              x: ['0%', "-30%", "-78%", '0%'],
              transition: {
                duration: 7.5,
                easeIn: [0.61, 0.01, 0.39, 0.96],
                times: [2.5, 2.5, 2.5],
                repeat: Infinity,
                repeatType: 'loop',
              }
            }}
            viewport={{ once: true }}
          >
            <div className="relative h-full aspect-[16/9]">
              <Image
                src={typeof servicesImage === 'string' ? servicesImage : servicesImage?.url || ''}
                alt={typeof servicesImage === 'string' ? '' : servicesImage?.alt || ''}
                fill
                className="object-contain"
                priority
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKSM4Mjc1NjM4PTEwO0BCNUFBNTY6UFxbYWFkZ2RnPT1zdXFk/8IACwgAIAAgAQERAP/EABgAAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAfQZrm7lLUs6Ek4h0c+8fRjSCgDTz74GbWYqgAH/xAAcEAACAgIDAAAAAAAAAAAAAAABEQACAyASITH/2gAIAQEAAQUCxcvai52yfH1nTE7Wm3q5nxH0Zn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAbEAACAgMBAAAAAAAAAAAAAAAAAREQEiExUf/aAAgBAQAGPwLhJeR7FLPA5Hs//8QAHRAAAwACAgMAAAAAAAAAAAABESEAMUFRYXGBkaH/2gAIAQEAAT8QFW0aZ8YKA7kEsv8AeAUgdvX3jyXoXoe8VYmhpHzgrQBQB4wqNhf3hO7QePlwQCSh0M//2Q=="
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          className="h-full flex items-end pb-12 md:pb-24 px-4 md:px-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
        >
          <div className="w-full">
            {ServiceTypes?.title && (
              <h2 className={`text-xl 3xl:text-3xl uppercase mb-6 md:mb-9 ${isArabic ? 'pr-4 md:pr-0' : ''}`}>
                <RtlText>{ServiceTypes.title}</RtlText>
              </h2>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4 ${isArabic ? 'md:[&>*:first-child]:order-last md:[&>*:last-child]:order-first' : ''}`}>
              {/* Left column - first two items */}
              <ul className={`space-y-2 md:space-y-6 ${isArabic ? 'pr-4 md:pr-0' : ''}`}>
                {serviceItems.slice(0, 2).map((item, index) => (
                  <motion.li 
                    key={index}
                    className={`flex items-center gap-2 md:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.3 + (index * 0.1)
                    }}
                  >
                    <p className="text-base 3xl:text-xl">•</p>
                    <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
                      <RtlText>{item.children[0].text}</RtlText>
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Right column - third item */}
              <ul className={`${isArabic ? 'pr-4 md:pr-0' : ''}`}>
                {serviceItems.slice(2, 3).map((item, index) => (
                  <motion.li
                    key={index}
                    className={`flex items-center gap-2 md:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.5
                    }}
                  >
                    <p className="text-base 3xl:text-xl">•</p>
                    <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
                      <RtlText>{item.children[0].text}</RtlText>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
