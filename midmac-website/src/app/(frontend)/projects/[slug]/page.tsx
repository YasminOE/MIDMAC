import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import { ProjectGallery } from '@/components/ui/projects/ProjectGallarey'
import { ProjectPlans } from '@/components/ui/projects/ProjectPlans'
import { Contact } from '@/components/ui/projects/Contacts'
import RtlText from '@/components/ui/RtlText'
import { Suspense } from 'react'

// Generate static params for all projects
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: projects } = await payload.find({
    collection: 'projects',
  })

  return projects.map((project) => ({
    slug: project.title,
  }))
}


interface Props {
  params: Promise<{ slug: string }>
}

// Update the function signature to use Next.js types
const ProjectPage = async ({ params }: Props) => {
  const { slug = 'index' } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      title: {
        equals: decodeURIComponent(String(slug)),
      },
    },
  })

  const project = JSON.parse(JSON.stringify(projects[0])) as Project

  if (!project) {
    notFound()
  }

  const getFirstParagraphText = (content: NonNullable<Project['content']>): string => {
    try {
      const children = content.root?.children
      if (!children || !Array.isArray(children) || children.length === 0) return ''
      
      const firstChild = children[0]
      if (!firstChild?.children || !Array.isArray(firstChild.children)) return ''
      
      const firstGrandChild = firstChild.children[0]
      return firstGrandChild?.text ?? ''
    } catch {
      return ''
    }
  }

  return (
    <main className="min-h-full pt-24 mx-auto">
      <div className="px-4 md:px-10 h-full">
        {/* Project Header for Mobile */}
        <h1 className="text-[2rem] md:text-[4rem] font-light uppercase mb-4 md:mb-12 md:hidden px-4">
          <Suspense fallback={project.title}>
            <RtlText>{project.title}</RtlText>
          </Suspense>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column - Content and Details */}
          <div className="md:col-span-4 flex justify-between flex-col h-full order-2 md:order-1 px-4">
            {/* Project Header for Desktop */}
            <h1 className="hidden md:block text-[4rem] font-light uppercase mb-12">
              <Suspense fallback={project.title}>
                <RtlText>{project.title}</RtlText>
              </Suspense>
            </h1>
            
            {project.content && (
              <div className="prose prose-invert max-w-none mb-8 md:mb-20">
                <p className="text-[0.7rem] md:text-[0.8rem] mb-4">
                  <Suspense fallback={project.content && getFirstParagraphText(project.content)}>
                    <RtlText>{project.content && getFirstParagraphText(project.content)}</RtlText>
                  </Suspense>
                </p>
              </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 gap-1">
              {project.projectDetails?.city && (
                <div className="flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">City</h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={project.projectDetails.city}>
                      <RtlText>{project.projectDetails.city}</RtlText>
                    </Suspense>
                  </p>
                </div>
              )}
              {project.projectDetails?.size && (
                <div className="flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">Size</h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={project.projectDetails.size}>
                      <RtlText>{project.projectDetails.size}</RtlText>
                    </Suspense>
                  </p>
                </div>
              )}
              {project.projectDetails?.year && (
                <div className="flex justify-between border-t-[0.5px] border-b-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">Year</h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={project.projectDetails.year}>
                      <RtlText>{project.projectDetails.year}</RtlText>
                    </Suspense>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="md:col-span-8 h-full order-1 md:order-2">
            {project.media && <ProjectGallery media={JSON.parse(JSON.stringify(project.media))} />}
          </div>
        </div>

        {/* Project Plans */}
        {project.plans && project.plans.length > 0 && (
          <div className="px-4">
            <ProjectPlans plans={JSON.parse(JSON.stringify(project.plans))} />
          </div>
        )}

        {/* Contact Section */}
        <div className="px-4">
          <Contact />
        </div>
      </div>
    </main>
  )
}

export default ProjectPage
