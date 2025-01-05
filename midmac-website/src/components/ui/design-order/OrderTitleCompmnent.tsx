'use client'

import React from 'react'
import type { DesignOrderTitleBlock as DesignOrderTitleBlockProps } from '@/payload-types'
import { motion } from 'motion/react'
import RtlText from '../RtlText'
import { useSearchParams } from 'next/navigation'

type Props = {
  className?: string
} & DesignOrderTitleBlockProps

export const DesignOrderTitleComponent: React.FC<Props> = ({ className, title, subTitle }) => {
  const searchParams = useSearchParams();
  const isArabic = searchParams?.get('locale') === 'ar';

  const getTextContent = (content: NonNullable<DesignOrderTitleBlockProps['title']>): string => {
    try {
      const children = content.root?.children
      if (!children || !Array.isArray(children) || children.length === 0) return ''
      
      const firstChild = children[0]
      if (!firstChild?.children || !Array.isArray(firstChild.children)) return ''
      
      const firstGrandChild = firstChild.children[0]
      return firstGrandChild?.text ?? ''
    } catch {
      return ''
    }
  }

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-24 ${className}`}>
      <motion.div 
        className="max-w-4xl mx-auto px-8 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={isArabic ? "text-[1.2rem] md:text-[1.8rem] uppercase mb-0" : "text-[2.5rem] md:text-[4rem] font-light uppercase mb-2"}>
          <RtlText>{title && getTextContent(title)}</RtlText>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={isArabic ? "-mt-2" : ""}
        >
          <p className={isArabic ? "text-[1.5rem] md:text-[3rem] font-light uppercase" : "text-[1.2rem] md:text-[1.5rem] uppercase"}>
            <RtlText>{subTitle && getTextContent(subTitle)}</RtlText>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}