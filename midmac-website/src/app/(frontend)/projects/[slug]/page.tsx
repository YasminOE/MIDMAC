import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import { ProjectGallery } from '@/components/ui/projects/ProjectGallarey'
import { ProjectPlans } from '@/components/ui/projects/ProjectPlans'
import { Contact } from '@/components/ui/projects/Contacts'
import RtlText from '@/components/ui/RtlText'
import { Suspense } from 'react'
import { headers } from 'next/headers'

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

interface ContentParagraph {
  text: string;
  direction: string;
}

interface ContentChild {
  children?: Array<{ text?: string }>;
  direction?: string;
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Update the function signature to use Next.js types
const ProjectPage = async ({ params, searchParams }: PageProps) => {
  const { slug = 'index' } = params
  const locale = searchParams?.locale?.toString() || 'en'
  const isArabic = locale === 'ar'
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      title: {
        equals: decodeURIComponent(String(slug)),
      },
    },
    locale: isArabic ? 'ar' : 'en',
  })

  const project = JSON.parse(JSON.stringify(projects[0])) as Project

  if (!project) {
    notFound()
  }

  const getContentText = (content: NonNullable<Project['content']>): ContentParagraph[] => {
    try {
      const children = content.root?.children as ContentChild[] | undefined
      if (!children || !Array.isArray(children)) return []
      
      return children.map(child => {
        // Get all text nodes from the paragraph's children
        const paragraphText = child?.children?.map(textNode => textNode.text || '').join(' ') || ''
        // Use the paragraph's direction, defaulting to the current locale's direction
        const direction = child?.direction || (isArabic ? 'rtl' : 'ltr')
        return { text: paragraphText, direction }
      }).filter(item => item.text !== '')
    } catch {
      return []
    }
  }

  // Get localized content
  const projectTitle = isArabic ? project.titleAr || project.title : project.title
  const projectContent = project.content

  // Get localized project details
  const projectDetails = project.projectDetails
  const cityLabel = isArabic ? 'المدينة' : 'City'
  const sizeLabel = isArabic ? 'المساحة' : 'Size'
  const yearLabel = isArabic ? 'السنة' : 'Year'

  // Get all paragraphs with their directions
  const contentParagraphs = projectContent ? getContentText(projectContent) : []

  return (
    <main className="min-h-full pt-24 mx-auto">
      <div className="px-4 md:px-10 h-full">
        {/* Project Header for Mobile */}
        <h1 className="text-[2rem] md:text-[4rem] font-light uppercase mb-4 md:mb-12 md:hidden px-4">
          <Suspense fallback={projectTitle}>
            <RtlText>{projectTitle}</RtlText>
          </Suspense>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20">
          {/* Left Column - Content and Details */}
          <div className="md:col-span-4 flex flex-col justify-between h-full order-2 md:order-1 px-4">
            <div className="flex flex-col flex-grow">
              {/* Project Header for Desktop */}
              <h1 className="hidden md:block text-[4rem] font-light uppercase mb-12">
                <Suspense fallback={projectTitle}>
                  <RtlText>{projectTitle}</RtlText>
                </Suspense>
              </h1>
              {contentParagraphs.length > 0 && (
                <div className="prose prose-invert max-w-none mb-8 md:mb-auto">
                  {contentParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`mb-4 ${paragraph.direction === 'rtl' ? 'text-[0.85rem] md:text-[0.95rem]' : 'text-[0.7rem] md:text-[0.8rem]'}`}
                      dir={paragraph.direction}
                    >
                      <RtlText>{paragraph.text}</RtlText>
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details - Now in its own flex container */}
            <div className="grid grid-cols-1 gap-1 mt-auto">
              {projectDetails?.city && (
                <div className={`flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">
                    <RtlText>{cityLabel}</RtlText>
                  </h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={projectDetails.city}>
                      <RtlText>{projectDetails.city}</RtlText>
                    </Suspense>
                  </p>
                </div>
              )}
              {projectDetails?.size && (
                <div className={`flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">
                    <RtlText>{sizeLabel}</RtlText>
                  </h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={projectDetails.size}>
                      <RtlText>{projectDetails.size}</RtlText>
                    </Suspense>
                  </p>
                </div>
              )}
              {projectDetails?.year && (
                <div className={`flex justify-between border-t-[0.5px] border-b-[0.5px] border-[#DAD2C2] py-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h3 className="uppercase text-[0.8rem] md:text-[1.1rem] tracking-wider">
                    <RtlText>{yearLabel}</RtlText>
                  </h3>
                  <p className="text-[0.8rem] md:text-[1.1rem]">
                    <Suspense fallback={projectDetails.year}>
                      <RtlText>{projectDetails.year}</RtlText>
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
          <div className="mt-6">
            <ProjectPlans plans={JSON.parse(JSON.stringify(project.plans))} />
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-20">
          <Contact />
        </div>
      </div>
    </main>
  )
}

export default ProjectPage
