'use client'

import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
  if (!servicesImage || !ServiceTypes?.services?.root?.children?.[0]?.children) return null

  const serviceItems = ServiceTypes.services.root.children[0].children as ServiceItem[]

  return (
    <section className={`section ${className || ''}`} id={blockId || 'services'}>
      <div className="grid grid-cols-2 min-h-screen">
        {/* Image Section */}
        <motion.div
          className="relative h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <Image
            src={typeof servicesImage === 'string' ? servicesImage : servicesImage?.url || ''}
            alt={typeof servicesImage === 'string' ? '' : servicesImage?.alt || ''}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="h-full flex items-end pb-24 px-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
        >
          <div className="w-full">
            {ServiceTypes?.title && (
              <h2 className="text-2xl font-light uppercase mb-16">
                {ServiceTypes.title}
              </h2>
            )}

            <div className="grid grid-cols-2 gap-x-6">
              {/* Left column - first two items */}
              <ul className="space-y-12">
                {serviceItems.slice(0, 2).map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.3 + (index * 0.1)
                    }}
                  >
                    <p className="text-base">•</p>
                    <span className="text-xl font-light">
                      {item.children[0].text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Right column - third item */}
              <ul>
                {serviceItems.slice(2, 3).map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.5
                    }}
                  >
                    <span className="text-base">•</span>
                    <span className="text-xl font-light">
                      {item.children[0].text}
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
