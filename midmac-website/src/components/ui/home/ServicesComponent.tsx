'use client'

import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

type Props = {
  className?: string
} & ServicesBlockProps 


export const ServicesComponent: React.FC<Props> = ({ 
    className,
    blockId,
    servicesImage,
    ServiceTypes,
}) => {
    if (!servicesImage || !ServiceTypes?.services) return null
    
    const isHalfLayout = ServiceTypes?.settings?.layout === 'half'
    
    return (
      <section className={`section bg-red-300 ${className || ''}`} id={blockId || 'services'}>
        <div className={`grid ${isHalfLayout ? 'grid-cols-2' : 'grid-cols-1'} bg-dark text-white`}>
          {/* Image Section */}
          <motion.div 
            className="container large"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="flex-col">
                <div className="single-image">

              
            <Image 
              src={typeof servicesImage === 'string' ? servicesImage : servicesImage?.url || ''}
              alt={typeof servicesImage === 'string' ? '' : servicesImage?.alt || ''}
              fill
            //   className="overlay overlay-image"
              priority
            />
            </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="flex flex-col justify-center items-end p-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
          >
            <div className="row no-wrap">
            
            {ServiceTypes?.title && (
                
              <h2 className="text-[1.5rem] tracking-wider uppercase">
                {ServiceTypes?.title}
              </h2>
              
            )}
            </div>
            {ServiceTypes?.services?.length > 0 && (
              <ul className="space-y-4">
                {ServiceTypes?.services.split(',').map((service: string, index: number) => (
                  <motion.li 
                    key={index}
                    className="text-[1rem] tracking-wider flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.3 + (index * 0.1)
                    }}
                  >
                    <span className="text-sm">•</span> {service.trim()}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </section>
    )
}
