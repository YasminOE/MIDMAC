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
    const ContactInfo = JSON.parse(JSON.stringify(contactInfo))
    const RightContent = JSON.parse(JSON.stringify(rightContent))
  return (
    <section 
      id="contact" 
      className="h-[50vh] container large"
    >
      <div className="w-full h-full max-w-[2690px] mx-auto px-[--container-padding] flex flex-col-reverse md:flex-row justify-start md:justify-between items-center gap-6 md:gap-12">

        {/* Left side - Contact Information */}
        <div className="w-full md:w-1/2 3xl:max-w-[800px]">
          <div className="flex justify-between items-start md:items-center border-[#DAD2C2] border-b border-t pb-2 md:pb-1 pt-2 md:pt-1 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {ContactInfo.emailLabel}
            </span>
            <a 
              href={`mailto:${ContactInfo.email}`}
              className="text-[#DAD2C2] text-sm 3xl:text-xl  transition-colors"
            >
              {ContactInfo.email}
            </a>
          </div>
          
          <div className="flex justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {ContactInfo.instagramLabel}
            </span>
            <a 
              href="https://www.instagram.com/midmac.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DAD2C2] text-sm 3xl:text-xl transition-colors"
            >
              {ContactInfo.instagram}
            </a>
          </div>
          
          <div className="flex justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row">
            <span className="text-sm 3xl:text-2xl uppercase">
              {ContactInfo.phoneLabel}
            </span>
            <a 
              href={`https://wa.me/${ContactInfo.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DAD2C2] text-sm 3xl:text-xl transition-colors"
            >
              {ContactInfo.phone}
            </a>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
          {RightContent.type === 'button' ? (
            <a 
              href={RightContent.buttonLink || '/'}
              className="bg-[#E5E0D9] text-[#1E1E1E] px-12 md:px-24 py-4 md:py-8 rounded-lg text-xl md:text-2xl 3xl:text-3xl uppercase inline-block hovered-btn w-full md:w-auto text-center"
            >
              {RightContent.content}
            </a>
          ) : (
            <h2 className="text-[#E5E0D9] text-2xl 3xl:text-3xl">
              {RightContent.content}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
