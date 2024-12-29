import React from 'react'
import { ContactsBlock as ContactsBlockProps } from '@/payload-types'

// TODO: fix on small screen 

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
      <div className="w-full h-full max-w-[1440px] mx-auto px-[--container-padding] flex flex-col-reverse md:flex-row justify-between items-center gap-12 md:gap-0">

       {/* Left side - Contact Information */}
       <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center border-b border-[#DAD2C2] border-t border-[#DAD2C2] pb-1 pt-1">
            <span className=" text-sm uppercase">
              {contactInfo.emailLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm">
              {contactInfo.email}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b border-[#DAD2C2] pb-1 mt-2">
            <span className=" text-sm uppercase">
              {contactInfo.instagramLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm">
              {contactInfo.instagram}
            </span>
          </div>
          
          <div className="flex justify-between border-b border-[#DAD2C2] pb-1 mt-2">
            <span className=" text-sm uppercase">
              {contactInfo.phoneLabel}
            </span>
            <span className="text-[#DAD2C2] text-sm">
              {contactInfo.phone}
            </span>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {rightContent.type === 'button' ? (
            <a 
              href={rightContent.buttonLink || '/'}
              className="bg-[#E5E0D9] text-[#1E1E1E] px-24 py-8 rounded-lg text-2xl uppercase inline-block hovered-btn "
            >
              {rightContent.content}
            </a>
          ) : (
            <h2 className="text-[#E5E0D9] text-2xl">
              {rightContent.content}
            </h2>
          )}
        </div>

 
      </div>
    </section>
  )
}
