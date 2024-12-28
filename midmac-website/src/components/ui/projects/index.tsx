// // import { Project } from '@/payload-types'
// import Image from 'next/image'
// import { notFound } from 'next/navigation'
// import type { Project as ProjectProps } from '@/payload-types'

// export default async function ProjectPage({
//   params,
// }: {
//   params: { project: ProjectProps }
// }) {

//   console.log(params)
//   const project = await getProjectBySlug(params.project.title)
  
//   if (!project) {
//     notFound()
//   }

//   return (
//     <main className="min-h-screen">
//       {/* Hero Section */}
//       <section className="h-screen relative">
//         {project.media?.[0]?.image && (
//           <Image
//             src={project.media[0].image.url}
//             alt={project.media[0].image.alt || project.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         )}
//         <div className="absolute inset-0 bg-black/30" />
//         <div className="absolute inset-0 flex flex-col justify-end p-20">
//           <h1 className="text-7xl font-extralight tracking-wider uppercase mb-6">
//             {project.title}
//           </h1>
//           {project.projectDetails?.year && (
//             <p className="text-2xl font-light tracking-wide">
//               {project.projectDetails.year}
//             </p>
//           )}
//         </div>
//       </section>

//       {/* Project Details */}
//       <section className="py-20 px-20">
//         <div className="max-w-4xl">
//           {project.projectDetails?.description && (
//             <div className="mb-16 text-xl font-light leading-relaxed">
//               {project.projectDetails.description}
//             </div>
//           )}

//           {project.projectDetails?.services && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-light uppercase tracking-wider mb-8">
//                 Services
//               </h2>
//               <ul className="space-y-4">
//                 {project.projectDetails.services.split(',').map((service, index) => (
//                   <li 
//                     key={index}
//                     className="flex items-center gap-16"
//                   >
//                     <span className="text-base">·</span>
//                     <span className="text-xl font-extralight tracking-wider">
//                       {service.trim()}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Project Gallery */}
//       {project.media && project.media.length > 1 && (
//         <section className="py-20 px-20">
//           <div className="grid grid-cols-2 gap-8">
//             {project.media.slice(1).map((mediaItem, index) => (
//               <div 
//                 key={index}
//                 className="relative aspect-[16/9]"
//               >
//                 <Image
//                   src={mediaItem.image.url}
//                   alt={mediaItem.image.alt || `${project.title} image ${index + 2}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </main>
//   )
// }

// async function getProjectBySlug(slug: string) {
//   try {
//     const encodedSlug = encodeURIComponent(slug)
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?where[title][equals]=${encodedSlug}`,
//       {
//         next: { revalidate: 30 },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (!res.ok) {
//       throw new Error('Failed to fetch project')
//     }

//     const data = await res.json()
//     return data.docs[0]
//   } catch (error) {
//     console.error('Error fetching project:', error)
//     return null
//   }
// } 