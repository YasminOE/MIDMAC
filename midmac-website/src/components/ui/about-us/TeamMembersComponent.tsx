// import React from 'react'
// import Image from 'next/image'
// import type { TeamMembersBlock as TeamMembersBlockProps, Media } from '@/payload-types'

// // TODO: Fix on small screens
// type Props = {
//   className?: string
// } & TeamMembersBlockProps

// // Add type guard at the top
// const isMediaObject = (image: string | Media): image is Media => {
//   return typeof image !== 'string' && 'url' in image;
// };

// export const TeamMembersComponent: React.FC<Props> = ({ 
//   title,
//   members,
//   className 
// }) => {
//   // Ensure members is an array
//   const teamMembers = Array.isArray(members) ? members : []
//   const founders = teamMembers.slice(0, 2)
//   const otherMembers = teamMembers.slice(2)

//   return (
//     <section className={` ${className || ''}`}>
//       <div className="container large mx-auto px-20">
//         <h2 className="text-[4rem] font-light mb-24 uppercase text-to-right">
//           {title}
//         </h2>
        
//         {/* Founders Row - Centered */}
//         <div className="flex justify-center gap-8 mb-16 text-to-right">
//           {founders.map((member) => (
//             <div key={member.id} className="w-[calc(33.333%-1rem)]">
//               <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
//                 {member.image && isMediaObject(member.image) && member.image.url && (
//                   <Image
//                     src={member.image.url}
//                     alt={member.name || ''}
//                     fill
//                     className="object-cover"
//                   />
//                 )}
//               </div>
//               <h3 className="text-xl mb-1">{member.name}</h3>
//               <p className="text-sm mb-4">{member.position}</p>
//               <p className="text-sm leading-relaxed">{member.bio}</p>
//             </div>
//           ))}
//         </div>

//         {/* Other Team Members */}
//         <div className="grid grid-cols-3 gap-8 px-20">
//           {otherMembers.map((member) => (
//             <div key={member.id}>
//               <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
//                 {member.image && isMediaObject(member.image) && member.image.url && (
//                   <Image
//                     src={member.image.url}
//                     alt={member.name || ''}
//                     fill
//                     className="object-cover"
//                   />
//                 )}
//               </div>
//               <h3 className="text-xl mb-1">{member.name}</h3>
//               <p className=" text-sm mb-4">{member.position}</p>
//               <p className="text-sm leading-relaxed">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { TeamMembersBlock as TeamMembersBlockProps, Media } from '@/payload-types'
import RtlText from '../RtlText'

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
  // Ensure members is an array
  const teamMembers = Array.isArray(members) ? members : []
  const founders = teamMembers.slice(0, 2)
  const otherMembers = teamMembers.slice(2)

  return (
    <section className={` ${className || ''}`}>
      <div className="container large mx-auto px-20">
        <motion.h2 
          className="text-[4rem] font-light mb-24 uppercase text-to-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RtlText>{title}</RtlText>
        </motion.h2>
        
        {/* Founders Row - Centered */}
        <div className="flex justify-center gap-8 mb-16 text-to-right">
          {founders.map((member) => (
            <motion.div 
              key={member.id}
              className="w-[calc(33.333%-1rem)]" // Same width as 3-column grid items
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                {member.image && isMediaObject(member.image) && member.image.url && (
                  <Image
                    src={member.image.url}
                    alt={member.name || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl mb-1">
                <RtlText>{member.name}</RtlText>
              </h3>
              <p className="text-sm mb-4">
                <RtlText>{member.position}</RtlText>
              </p>
              <p className="text-sm leading-relaxed">
                <RtlText>{member.bio}</RtlText>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-3 gap-8 px-20">
          {otherMembers.map((member) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                {member.image && isMediaObject(member.image) && member.image.url && (
                  <Image
                    src={member.image.url}
                    alt={member.name || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl mb-1">
                <RtlText>{member.name}</RtlText>
              </h3>
              <p className=" text-sm mb-4">
                <RtlText>{member.position}</RtlText>
              </p>
              <p className="text-sm leading-relaxed">
                <RtlText>{member.bio}</RtlText>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
