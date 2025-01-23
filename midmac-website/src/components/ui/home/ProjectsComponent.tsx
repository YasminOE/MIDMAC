'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { ProjectsBlock as ProjectsBlockProps, Project, Media } from '@/payload-types'
import { RtlText } from '../RtlText'
import { useSearchParams } from 'next/navigation'

type Props = {
  className?: string
} & ProjectsBlockProps 

// Add type guard
const isProject = (project: string | Project): project is Project => {
  return typeof project !== 'string' && 'media' in project;
};

const isMediaObject = (image: string | Media): image is Media => {
  return typeof image !== 'string' && 'url' in image;
};

interface LocalizedField {
  en: string;
  ar: string;
}

interface ProjectDetails {
  year: LocalizedField | string;
}

export const ProjectsComponent: React.FC<Props> = ({ 
  className,
  title,
  projects,
}) => {
  const searchParams = useSearchParams()
  const currentLocale = searchParams.get('locale') || 'en'
  const isArabic = currentLocale === 'ar'

  if (!projects?.length) return null

  // Function to chunk projects differently for mobile
  const chunkProjects = (projects: NonNullable<ProjectsBlockProps['projects']>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // For mobile: alternate between 1 and 2 projects per row
      const result: NonNullable<ProjectsBlockProps['projects']>[] = []
      let currentIndex = 0

      while (currentIndex < projects.length) {
        // Check if this is an even or odd row (0-based index)
        const isEvenRow = result.length % 2 === 0
        // Even rows get 1 project, odd rows get 2
        const projectsInRow = isEvenRow ? 1 : 2
        result.push(projects.slice(currentIndex, currentIndex + projectsInRow))
        currentIndex += projectsInRow
      }
      return result
    }

    // For desktop: alternate between 3 and 2 projects per row
    const result: NonNullable<ProjectsBlockProps['projects']>[] = []
    let currentIndex = 0

    while (currentIndex < projects.length) {
      // Check if this is an even or odd row (0-based index)
      const isEvenRow = result.length % 2 === 0
      
      // Even rows get 3 projects, odd rows get 2
      const projectsInRow = isEvenRow ? 3 : 2
      result.push(projects.slice(currentIndex, currentIndex + projectsInRow))
      currentIndex += projectsInRow
    }
    return result
  }

  const projectChunks = chunkProjects(projects)
    
  return (
    <section 
      id='projects'
      className={`relative w-full py-20 mx-auto ${className || ''}`}
    >
      <div className="container max-w-[2560px] mx-auto px-6 md:px-20">
        {title && (
          <motion.h2 
            className="text-3xl md:text-5xl 3xl:text-7xl m-8 ml-0 3xl:ml-0 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <RtlText>{title}</RtlText>
          </motion.h2>
        )}
        
        <div className="space-y-4 md:space-y-8 container">
          {projectChunks.map((chunk, chunkIndex) => {
            const isEvenRow = chunkIndex % 2 === 0
            const isThreeCol = isEvenRow

            return (
              <div 
                key={chunkIndex}
                className={`
                  relative grid gap-4 mx-auto
                  ${chunk.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}
                  ${isThreeCol
                    ? 'md:grid-cols-3 max-w-[2560px]'
                    : 'md:grid-cols-2 md:w-[66%] 2xl:w-[50%] md:mx-auto'}
                `}
              >
                {chunk.map((projectItem, index) => {
                  const project = projectItem.project
                  if (!project || !isProject(project) || !project.media?.[0]?.image) return null

                  const firstImage = project.media[0].image
                  if (!isMediaObject(firstImage) || !firstImage.url) return null

                  // Get localized title and details
                  const projectTitle = isArabic ? project.titleAr || project.title : project.title
                  const details = project.projectDetails as ProjectDetails
                  const projectYear = typeof details?.year === 'object'
                    ? details.year[currentLocale as keyof LocalizedField]
                    : details?.year

                  return (
                    <motion.div 
                      key={project.id}
                      className="group relative w-full aspect-[16/9]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Link href={`/projects/${project.title}?locale=${currentLocale}`} className="block w-full h-full">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={firstImage.url}
                            alt={firstImage.alt || projectTitle}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Project details overlay */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="px-2">
                              <h3 className="text-xl uppercase">
                                {projectTitle}
                              </h3>
                              {projectYear && (
                                <p className="text-sm">
                                  {projectYear}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
