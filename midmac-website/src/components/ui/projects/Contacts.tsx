'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import RtlText from '../RtlText'

export const Contact = () => {
  const searchParams = useSearchParams()
  const isArabic = searchParams?.get('locale') === 'ar'

  const labels = {
    email: {
      en: 'Email',
      ar: 'الايميل'
    },
    instagram: {
      en: 'Instagram',
      ar: 'انستغرام'
    },
    phone: {
      en: 'Phone',
      ar: 'الجوال'
    }
  }

  return (
    <section className="h-[50vh] container large">
      <div className="w-full h-full max-w-[2690px] mx-auto px-[--container-padding] flex flex-col-reverse md:flex-row justify-start md:justify-between items-center gap-6 md:gap-12">
        {/* Left side - Contact Information */}
        <div className="w-full md:w-1/2 3xl:max-w-[800px]" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className={`flex justify-between items-start md:items-center border-[#DAD2C2] border-b border-t pb-2 md:pb-1 pt-2 md:pt-1 gap-2 md:flex-row ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm 3xl:text-2xl uppercase">
              <RtlText>{labels.email[isArabic ? 'ar' : 'en']}</RtlText>
            </span>
            <a 
              href="mailto:info@midmac.com"
              className="text-[#DAD2C2] text-sm 3xl:text-xl transition-colors montserrat"
            >
              info@midmac.com
            </a>
          </div>

          <div className={`flex justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm 3xl:text-2xl uppercase">
              <RtlText>{labels.instagram[isArabic ? 'ar' : 'en']}</RtlText>
            </span>
            <a 
              href="https://www.instagram.com/midmac.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DAD2C2] text-sm 3xl:text-xl transition-colors montserrat"
            >
              @midmac.design
            </a>
          </div>

          <div className={`flex justify-between items-start md:items-center border-b border-[#DAD2C2] pb-2 md:pb-1 mt-4 md:mt-2 gap-2 md:flex-row ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm 3xl:text-2xl uppercase">
              <RtlText>{labels.phone[isArabic ? 'ar' : 'en']}</RtlText>
            </span>
            <a 
              href="tel:+966 55 222 2223"
              className="text-[#DAD2C2] text-sm 3xl:text-xl transition-colors montserrat"
              dir="ltr"
            >
              +966 55 222 2223
            </a>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
          <h2 className={`text-[#E5E0D9] ${isArabic ? 'text-2xl md:text-[4rem] 3xl:text-[6rem]' : 'text-2xl md:text-[4rem] 3xl:text-[6rem]'}`}>
            <RtlText>{isArabic ? 'تواصل معنا' : 'Contact Us'}</RtlText>
          </h2>
        </div>
      </div>
    </section>
  )
}