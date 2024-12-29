'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { ProjectsBlock as ProjectsBlockProps, Project, Media } from '@/payload-types'

// TODO: change the projects block on mobile screen

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

export const ProjectsComponent: React.FC<Props> = ({ 
  className,
  title,
  projects,
}) => {
  if (!projects?.length) return null

  // Function to chunk projects into groups of 7 (3-2-2 pattern)
  const chunkProjects = (projects: NonNullable<ProjectsBlockProps['projects']>) => {
    const result: NonNullable<ProjectsBlockProps['projects']>[] = []
    let currentIndex = 0

    while (currentIndex < projects.length) {
      const patternIndex = Math.floor(result.length % 3)
      
      if (patternIndex === 0) {
        // First row of each pattern: 3 projects
        result.push(projects.slice(currentIndex, currentIndex + 3))
        currentIndex += 3
      } else {
        // Second and third rows of pattern: 2 projects each
        result.push(projects.slice(currentIndex, currentIndex + 2))
        currentIndex += 2
      }
    }
    return result
  }

  const projectChunks = chunkProjects(projects)
    
  return (
    <section 
      id='projects'
      className={`relative w-full py-20 max-w-[1400px] mx-auto ${className || ''}`}
    >
      <div className="container large mx-auto px-6">
        {title && (
          <motion.h2 
            className="text-5xl  m-8 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
        )}
        
        <div className="space-y-8 container large">
          {projectChunks.map((chunk, chunkIndex) => {
            const patternIndex = chunkIndex % 3 // 0 for first row, 1 for second, 2 for third

            return (
              <div 
                key={chunkIndex}
                className={`
                  relative grid gap-4 mx-auto max-w-[1400px]
                  ${patternIndex === 0 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 md:w-[66%]'}
                  ${patternIndex !== 0 ? 'md:mx-auto' : ''} 
                `}
              >
                {chunk.map((projectItem, index) => {
                  const project = projectItem.project
                  if (!project || !isProject(project) || !project.media?.[0]?.image) return null

                  const firstImage = project.media[0].image
                  if (!isMediaObject(firstImage) || !firstImage.url) return null

                  return (
                    <motion.div 
                      key={project.id}
                      className="group relative w-full aspect-[16/9]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8,
                        delay: index * 0.1
                      }}
                    >
                      <Link href={`/projects/${project.title}`} className="block w-full h-full">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={firstImage.url}
                            alt={firstImage.alt || project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Project details overlay */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="px-2">
                              <h3 className="text-xl uppercase tracking-wider">
                                {project.title}
                              </h3>
                              {project.projectDetails?.year && (
                                <p className="text-sm">
                                  {project.projectDetails.year}
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
