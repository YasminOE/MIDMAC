'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { TeamMembersBlock as TeamMembersBlockProps, Media } from '@/payload-types'
import RtlText from '../RtlText'
import { useSearchParams } from 'next/navigation'

// TODO: Fix on small screens
type Props = {
  className?: string
} & TeamMembersBlockProps

// Add type guard at the top
const isMediaObject = (image: string | Media): image is Media => {
  return typeof image !== 'string' && 'url' in image;
};

export const TeamMembersComponent: React.FC<Props> = ({ 
  title,
  members,
  className 
}) => {
    const searchParams = useSearchParams();
    const isArabic = searchParams?.get('locale') === 'ar';

  
  const teamMembers = Array.isArray(members) ? members : []
  const founders = teamMembers.slice(0, 2)
  const otherMembers = teamMembers.slice(2)

  return (
    <section className={` ${className || ''}`}>
      <div className="container large mx-auto md:px-0 px-2">
        <motion.h2 
          className="text-[4rem] font-light mb-24 uppercase text-to-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RtlText>{title}</RtlText>
        </motion.h2>
        
        {/* Founders Row */}
        <div 
          className="grid grid-cols-2 gap-x-2 md:gap-x-8 max-w-6xl mx-auto mb-12 md:mb-24 px-2 md:px-0" 
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          {founders.map((member) => (
            <motion.div 
              key={member.id}
              className={`flex items-start gap-2 md:gap-8`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-20 h-20 md:w-40 md:h-40 rounded-lg overflow-hidden flex-shrink-0">
                {member.image && isMediaObject(member.image) && member.image.url && (
                  <Image
                    src={member.image.url}
                    alt={member.name || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="text-to-right">
                <h3 className="text-sm md:text-xl mb-1">{member.name}</h3>
                <p className="text-xs md:text-sm mb-2 md:mb-4">{member.position}</p>
                <p className="text-[0.5rem] md:text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-3 gap-x-2 md:gap-x-8 gap-y-6 md:gap-y-12 max-w-6xl mx-auto px-2 md:px-0" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {otherMembers.map((member) => (
            <motion.div 
              key={member.id}
              className="text-to-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4 rounded-lg overflow-hidden">
                {member.image && isMediaObject(member.image) && member.image.url && (
                  <Image
                    src={member.image.url}
                    alt={member.name || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-sm md:text-xl mb-1">{member.name}</h3>
                <p className="text-xs md:text-sm mb-2 md:mb-4">{member.position}</p>
                <p className="text-[0.5rem] md:text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
