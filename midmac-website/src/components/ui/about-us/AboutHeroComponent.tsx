'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { AboutHeroBlock as AboutHeroBlockProps } from '@/payload-types'
import RtlText from '../RtlText'
import RichTextRtl from '../RichTextRtl'

type Props = {
  _className?: string
} & AboutHeroBlockProps

export const AboutHeroComponent: React.FC<Props> = ({ 
  title,
  description,
  _className
}) => {
  return (
    <section className="relative mx-auto h-full py-32 container large px-20 md:px-32">
      <div className="grid grid-rows-2 h-[75vh]">
        {/* Title Row - Top 50% */}
        <div className="w-full flex items-start justify-end">
          <motion.h1 
              className="text-[1.5rem] md:text-[1.1rem] font-light uppercase leading-none overflow-hidden h-[200px]"
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
            <RtlText>{title}</RtlText>
          </motion.h1>
        </div>

        {/* Description Row - Bottom 50% */}
        <div className="w-full flex items-end">
          <motion.div 
            className="text-[0.9rem] leading-relaxed max-w-[50%]"
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
            <RichTextRtl content={description} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}