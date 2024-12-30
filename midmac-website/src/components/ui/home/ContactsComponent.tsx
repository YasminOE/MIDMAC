'use client'

import React from 'react'
import { ContactsBlock as ContactsBlockProps } from '@/payload-types'

// TODO: Fix the contact info section on both mobile and desktop

type Props = {
  className?: string
} & ContactsBlockProps 

export const Contacts: React.FC<Props> = ({ 
  contactInfo, 
  rightContent 
}) => {
  return (
    <section 
      id="contact" 
      className="h-[50vh] container large"
    >
      <div className="w-full h-full max-w-[2690px] mx-auto px-[--container-padding] flex flex-col-reverse md:flex-row justify-start md:justify-between items-center gap-6 md:gap-12">

        {/* Left side - Contact Information */}
        <div className="w-full md:w-1/2 3xl:max-w-[800px]">
          <div className="flex flex-col justify-between items-start md:items-center border-b border-[#DAD2C2] border-t border-[#DAD2C2] pb-2 md:pb-1 pt-2 md:pt-1 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {contactInfo.emailLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm 3xl:text-xl">
              {contactInfo.email}
            </span>
          </div>
          
          <div className="flex flex-col justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {contactInfo.instagramLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm 3xl:text-xl">
              {contactInfo.instagram}
            </span>
          </div>
          
          <div className="flex flex-col justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {contactInfo.phoneLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm 3xl:text-2xl">
              {contactInfo.phone}
            </span>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
          {rightContent.type === 'button' ? (
            <a 
              href={rightContent.buttonLink || '/'}
              className="bg-[#E5E0D9] text-[#1E1E1E] px-12 md:px-24 py-4 md:py-8 rounded-lg text-xl md:text-2xl 3xl:text-3xl uppercase inline-block hovered-btn w-full md:w-auto text-center"
            >
              {rightContent.content}
            </a>
          ) : (
            <h2 className="text-[#E5E0D9] text-2xl 3xl:text-3xl">
              {rightContent.content}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
