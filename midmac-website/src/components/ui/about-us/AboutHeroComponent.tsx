'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { AboutHeroBlock as AboutHeroBlockProps } from '@/payload-types'


// TODO: Fix on small screens and roation on rlt

type Props = {
  _className?: string
} & AboutHeroBlockProps

export const AboutHeroComponent: React.FC<Props> = ({ 
  title,
  description,
  _className
}) => {
  // Extract text from the rich text description
  const descriptionText = description?.root?.children?.[0]?.children?.[0]?.text || ''

  return (
    <section className="relative mx-auto h-full py-32 container large px-20">
      <div className="grid grid-rows-2 h-[75vh]">
        {/* Title Row - Top 50% */}
        <div className="w-full flex items-start justify-end">
          <motion.h1 
              className="text-[2rem] md:text-[1.5rem] font-light  uppercase leading-none overflow-hidden"
              initial={{ 
              opacity: 0,
               y: 20,
               rotate: 5
              }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              ease: [0.63, 0, 0.17, 1]
            }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Description Row - Bottom 50% */}
        <div className="w-full flex items-end">
          <motion.div 
            className="text-md leading-relaxed  max-w-[60%]"
            initial={{ 
              opacity: 0,
               y: 20,
               rotate: 2
              }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              ease: [0.63, 0, 0.17, 1]
            }}
          >
            <p className="overflow-hidden">{descriptionText}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}