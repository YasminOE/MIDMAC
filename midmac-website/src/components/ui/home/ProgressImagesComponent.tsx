// import Image from 'next/image'
// import type { ProgressImagesBlock as ProgressImagesBlockProps } from '@/payload-types'
// import { useMemo } from 'react'

// type Props = {
//   className?: string
// } & ProgressImagesBlockProps 

// export const ProgressImagesComponent: React.FC<Props> = ({ 
//   className,
//   images,
// }) => {

//   const Images = JSON.parse(JSON.stringify(images))

//   const imageArray = useMemo(() => {
//     if (!Images) return []
//     return [
//       Images.image1,
//       Images.image2,
//       Images.image3,
//       Images.image4,
//       Images.image5
//     ]
//   }, [Images])




//   if (!Images) return null

//   return (
//     <section 
//       className={`
//         relative 
//         w-full 
//         h-screen 
//         overflow-hidden
//         ${className || ''}
//       `} 
//       id='progress-images'
//     >
//       <div className="absolute inset-0">
//         <div className="flex h-full items-center">
//           {imageArray.filter(Boolean).map((image, index) => {
//             if (!image) return null

//             return (
//               <div key={index} className="relative flex-shrink-0 w-screen h-full">
//                 <Image
//                   src={typeof image === 'string' ? image : image?.url || ''}
//                   alt={typeof image === 'string' ? '' : image?.alt || ''}
//                   fill
//                   className="object-cover object-center"
//                   sizes="(max-width: 768px) 90vw, 80vw"
//                   quality={100}
//                   priority={index === 0}
//                 />
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }



'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, useAnimationControls } from 'motion/react'
import type { ProgressImagesBlock as ProgressImagesBlockProps } from '@/payload-types'

type Props = {
  className?: string
} & ProgressImagesBlockProps 

export const ProgressImagesComponent: React.FC<Props> = ({ 
  className,
  images,
}) => {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  const Images = JSON.parse(JSON.stringify(images))

  const imageArray = useMemo(() => {
    if (!Images) return []
    return [
      Images.image1,
      Images.image2,
      Images.image3,
      Images.image4,
      Images.image5
    ]
  }, [Images])

  useEffect(() => {
    if (!Images) return

    let isComponentMounted = true

    const animate = async () => {
      await new Promise(resolve => requestAnimationFrame(resolve))
      
      while (isComponentMounted) {
        try {
          await controls.start({
            x: [0, -100 * (imageArray.filter(Boolean).length - 1) + '%'],
            transition: {
              duration: 50,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          })
        } catch (error) {
          console.error('Animation error:', error)
          break
        }
      }
    }
    
    const timeoutId = setTimeout(() => {
      animate()
    }, 0)
    
    return () => {
      isComponentMounted = false
      clearTimeout(timeoutId)
      controls.stop()
    }
  }, [controls, imageArray, Images])

  if (!Images) return null

  return (
    <section 
      ref={containerRef}
      className={`
        relative 
        w-full 
        h-screen 
        overflow-hidden
        ${className || ''}
      `} 
      id='progress-images'
    >
      <div className="absolute inset-0">
        <motion.div 
          className="flex h-full items-center"
          animate={controls}
        >
          {imageArray.filter(Boolean).map((image, index) => {
            if (!image) return null

            return (
              <motion.div 
                key={index}
                className="relative flex-shrink-0 w-screen h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.7, 0, 0.3, 1],
                //   delay: index * 0.2
                }}
              >
                <Image
                  src={typeof image === 'string' ? image : image?.url || ''}
                  alt={typeof image === 'string' ? '' : image?.alt || ''}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 90vw, 80vw"
                  quality={100}
                  priority={index === 0}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}