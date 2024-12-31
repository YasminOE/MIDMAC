// import React from 'react'
// import Image from 'next/image'
// import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'

// type Props = {
//   className?: string
// } & HeroBlockProps

// const isMediaObject = (image: string | Media): image is Media => {
//   return typeof image !== 'string' && 'url' in image;
// };

// export const HeroComponent: React.FC<Props> = ({ images }) => {
//   if (!images?.backgroundImage || !images?.foregroundImage || !images?.foregroundImageMobile) {
//     return null
//   }

//   const BackgroundImage = JSON.parse(JSON.stringify(images.backgroundImage))
//   const ForegroundImage = JSON.parse(JSON.stringify(images.foregroundImage))
//   const ForegroundImageMobile = JSON.parse(JSON.stringify(images.foregroundImageMobile))

//   // Type guard checks
//   if (!isMediaObject(BackgroundImage) ||
//       !isMediaObject(ForegroundImage) ||
//       !isMediaObject(ForegroundImageMobile) ||
//       !BackgroundImage.url ||
//       !ForegroundImage.url ||
//       !ForegroundImageMobile.url) {
//     return null
//   }

//   return (
//     <section id="hero" className="section w-full">
//       <div className="row no-wrap justify-center items-center w-full h-full">
//         {/* Background Image */}
//         <div className="inset-0">
//           <Image 
//             src={BackgroundImage.url}
//             alt={BackgroundImage.alt || ''}
//             fill
//             priority
//             className="object-cover object-center"
//             sizes="100vw"
//             quality={100}
//           />
//         </div>

//         {/* Foreground Content */}
//         <div className="row no-wrap relative top-[-165px] z-10">
//           {/* Desktop Image */}
//           <Image 
//             src={ForegroundImage.url}
//             alt={ForegroundImage.alt || ''}
//             width={(ForegroundImage.width || 0) * 100}
//             height={(ForegroundImage.height || 0) * 100}
//             priority
//             quality={100}
//             className="w-auto hidden md:block"
//           />
          
//           {/* Mobile Image */}
//           <Image 
//             src={ForegroundImageMobile.url}
//             alt={ForegroundImageMobile.alt || ''}
//             width={(ForegroundImageMobile.width || 0) * 100}
//             height={(ForegroundImageMobile.height || 0) * 100}
//             priority
//             quality={100}
//             className="w-auto block md:hidden"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }



'use client'

import React from 'react'
import Image from 'next/image'
import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'
import { motion } from 'motion/react'

type Props = {
  className?: string
} & HeroBlockProps

const isMediaObject = (image: string | Media): image is Media => {
  return typeof image !== 'string' && 'url' in image;
};

export const HeroComponent: React.FC<Props> = ({ images }) => {
  if (!images?.backgroundImage || !images?.foregroundImage || !images?.foregroundImageMobile) {
    return null
  }

  const BackgroundImage = JSON.parse(JSON.stringify(images.backgroundImage))
  const ForegroundImage = JSON.parse(JSON.stringify(images.foregroundImage))
  const ForegroundImageMobile = JSON.parse(JSON.stringify(images.foregroundImageMobile))

  // Type guard checks
  if (!isMediaObject(BackgroundImage) ||
      !isMediaObject(ForegroundImage) ||
      !isMediaObject(ForegroundImageMobile) ||
      !BackgroundImage.url ||
      !ForegroundImage.url ||
      !ForegroundImageMobile.url) {
    return null
  }

  return (
    <section id="hero" className="section w-full">
      <div className="row no-wrap justify-center items-center w-full h-full">
        {/* Background Image */}
        <motion.div 
          className="inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <Image 
            src={BackgroundImage.url}
            alt={BackgroundImage.alt || ''}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="row no-wrap relative top-[-165px] z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.55,
            easeIn: [0.61, 0.01, 0.39, 0.96],
            delay: 4.3
          }}
          style={{
            maxWidth: '90vw',
            width: 'auto',
            height: 'auto',
          }}
        >
          {/* Desktop Image */}
          <Image 
            src={ForegroundImage.url}
            alt={ForegroundImage.alt || ''}
            width={(ForegroundImage.width || 0) * 100}
            height={(ForegroundImage.height || 0) * 100}
            priority
            quality={100}
            className="w-auto hidden md:block"
          />
          
          {/* Mobile Image */}
          <Image 
            src={ForegroundImageMobile.url}
            alt={ForegroundImageMobile.alt || ''}
            width={(ForegroundImageMobile.width || 0) * 100}
            height={(ForegroundImageMobile.height || 0) * 100}
            priority
            quality={100}
            className="w-auto block md:hidden"
          />
        </motion.div>
      </div>
    </section>
  )
}

