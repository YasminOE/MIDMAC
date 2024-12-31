// import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
// import React from 'react'
// import Image from 'next/image'

// type ServiceItem = {
//   children: Array<{ text: string }>;
//   type?: string;
// }

// type Props = {
//   className?: string
// } & ServicesBlockProps 

// export const ServicesComponent: React.FC<Props> = ({ 
//   className,
//   blockId,
//   servicesImage,
//   ServiceTypes,
// }) => {
//   if (!servicesImage || !ServiceTypes?.services?.root?.children?.[0]?.children) return null

//   const serviceItems = ServiceTypes.services.root.children[0].children as ServiceItem[]

//   return (
//     <section className={`section ${className || ''}`} id={blockId || 'services'}>
//       <div className="grid grid-cols-2 h-full">
//         {/* Image Section */}
//         <div className="relative h-full overflow-hidden">
//           <div className="relative h-full">
//             <div className="relative h-full aspect-[16/9]">
//               <Image
//                 src={typeof servicesImage === 'string' ? servicesImage : servicesImage?.url || ''}
//                 alt={typeof servicesImage === 'string' ? '' : servicesImage?.alt || ''}
//                 fill
//                 className="object-contain"
//                 priority
//                 quality={100}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="h-full flex items-end pb-12 md:pb-24 px-4 md:px-20">
//           <div className="w-full">
//             {ServiceTypes?.title && (
//              <h2 className="text-xl 3xl:text-3xl uppercase mb-6 md:mb-9">
//                 {ServiceTypes.title}
//               </h2>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
//               {/* Left column - first two items */}
//               <ul className="space-y-2 md:space-y-6">
//                 {serviceItems.slice(0, 2).map((item, index) => (
//                   <li 
//                     key={index}
//                     className="flex items-center gap-2 md:gap-4"
//                   >
//                     <p className="text-base 3xl:text-xl">•</p>
//                     <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
//                       {item.children[0].text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Right column - third item */}
//               <ul>
//                 {serviceItems.slice(2, 3).map((item, index) => (
//                   <li key={index} className="flex items-center gap-2 md:gap-4">
//                     <p className="text-base 3xl:text-xl">•</p>
//                     <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
//                       {item.children[0].text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




'use client'

import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

type ServiceItem = {
  children: Array<{ text: string }>;
  type?: string;
}

type Props = {
  className?: string
} & ServicesBlockProps 

export const ServicesComponent: React.FC<Props> = ({ 
  className,
  blockId,
  servicesImage,
  ServiceTypes,
}) => {
  if (!servicesImage || !ServiceTypes?.services?.root?.children?.[0]?.children) return null

  const serviceItems = ServiceTypes.services.root.children[0].children as ServiceItem[]

  return (
    <section className={`section ${className || ''}`} id={blockId || 'services'}>
      <div className="grid grid-cols-2 h-full">
        {/* Image Section */}
        <div className="relative h-full overflow-hidden">
          <motion.div
            className="relative h-full"
            initial={{ x: '0%' }}
            whileInView={{
              x: ['0%', "-30%", "-78%", '0%'],
              transition: {
                duration: 7.5,
                easeIn: [0.61, 0.01, 0.39, 0.96],
                times: [2.5, 2.5, 2.5],
                repeat: Infinity,
                repeatType: 'loop',
              }
            }}
            viewport={{ once: true }}
          >
            <div className="relative h-full aspect-[16/9]">
              <Image
                src={typeof servicesImage === 'string' ? servicesImage : servicesImage?.url || ''}
                alt={typeof servicesImage === 'string' ? '' : servicesImage?.alt || ''}
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          className="h-full flex items-end pb-12 md:pb-24 px-4 md:px-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
        >
          <div className="w-full">
            {ServiceTypes?.title && (
             <h2 className="text-xl 3xl:text-3xl uppercase mb-6 md:mb-9">
                {ServiceTypes.title}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
              {/* Left column - first two items */}
              <ul className="space-y-2 md:space-y-6">
                {serviceItems.slice(0, 2).map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.3 + (index * 0.1)
                    }}
                  >
                  <p className="text-base 3xl:text-xl">•</p>
                   <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
                      {item.children[0].text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Right column - third item */}
              <ul>
                {serviceItems.slice(2, 3).map((item, index) => (
                  <motion.li
                    key={index}
                  className="flex items-center gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: [0.7, 0, 0.3, 1],
                      delay: 0.5
                    }}
                  >
                    <p className="text-base 3xl:text-xl">•</p>
                    <span className="text-sm 3xl:text-lg uppercase font-light md:normal-case md:font-normal">
                      {item.children[0].text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
