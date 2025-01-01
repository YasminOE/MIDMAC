// import Image from 'next/image'
// import { Project } from '@/payload-types'
// import GoForward from '@/assets/images/go-forward.svg'
// import GoBackward from '@/assets/images/go-backward.svg'

// type ProjectPlansProps = {
//   plans: Project['plans']
// }

// export const ProjectPlans = ({ plans }: ProjectPlansProps) => {
//   const plansFetched = JSON.parse(JSON.stringify(plans))

//   if (!plansFetched?.length) return null

//   return (
//     <div className="mb-2">
//       <div className="relative px-14">
//         <div className="overflow-hidden">
//           <div className="relative aspect-[2/1] w-full">

//               {typeof plansFetched[0]?.plan !== 'string' && plansFetched[0]?.plan?.url && (
//                 <div
//                   key={0}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={plansFetched[0].plan.url}
//                     alt={plansFetched[0].plan.alt || `Project plan ${0 + 1}`}
//                     fill
//                     className="object-contain p-4"
//                     quality={100}
//                     sizes="100%"
//                   />
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Navigation Buttons */}
//         <div className="flex justify-center gap-2 mt-2">
//           <button 
//             className="p-2 pr-0 hover:opacity-75 transition-opacity"
//           >
//             <Image
//               src={GoBackward}
//               alt="Previous"
//               width={24}
//               height={24}
//             />
//           </button>
//           <button 
//             className="p-2 pl-0 hover:opacity-75 transition-opacity"
//           >
//             <Image
//               src={GoForward}
//               alt="Next"
//               width={24}
//               height={24}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }







'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Project } from '@/payload-types'
import GoForward from '@/assets/images/go-forward.svg'
import GoBackward from '@/assets/images/go-backward.svg'

type ProjectPlansProps = {
  plans: Project['plans']
}

export const ProjectPlans = ({ plans }: ProjectPlansProps) => {
  const plansFetched = JSON.parse(JSON.stringify(plans))
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!plansFetched?.length) return null

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % plansFetched.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + plansFetched.length) % plansFetched.length)
  }

  return (
    <div className="mb-2">
      <div className="relative px-14">
        <div className="overflow-hidden">
          <div className="relative aspect-[2/1] w-full">
            <AnimatePresence initial={false}>
              {typeof plansFetched[currentIndex]?.plan !== 'string' && plansFetched[currentIndex]?.plan?.url && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={plansFetched[currentIndex].plan.url}
                    alt={plansFetched[currentIndex].plan.alt || `Project plan ${currentIndex + 1}`}
                    fill
                    className="object-contain p-4"
                    quality={100}
                    sizes="100%"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-2 mt-2">
          <button 
            onClick={handlePrevious}
            className="p-2 pr-0 hover:opacity-75 transition-opacity"
          >
            <Image
              src={GoBackward}
              alt="Previous"
              width={24}
              height={24}
            />
          </button>
          <button 
            onClick={handleNext}
            className="p-2 pl-0 hover:opacity-75 transition-opacity"
          >
            <Image
              src={GoForward}
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  )
}