import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import { ProjectGallery } from '@/components/ui/projects/ProjectGallarey'
import { ProjectPlans } from '@/components/ui/projects/ProjectPlans'
import { Contact } from '@/components/ui/projects/Contacts'
import RtlText from '@/components/ui/RtlText'
import { Suspense } from 'react'
import type { Metadata } from 'next'

// Remove force-dynamic and use ISR instead
export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  return {
    title: params.slug,
  }
}

// Optimize static params generation with proper caching
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: projects } = await payload.find({
      collection: 'projects',
      limit: 100, // Limit to reasonable number
      sort: '-updatedAt', // Sort by most recently updated
      depth: 0, // Minimize data fetched
      locale: 'en', // Default locale
    })

    return projects.map((project) => ({
      slug: project.title,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

interface ContentParagraph {
  text: string;
  direction: string;
}

interface ContentChild {
  children?: Array<{ text?: string }>;
  direction?: string;
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { slug = 'index' } = params
  const searchParamsLocale = typeof searchParams?.locale === 'string' ? searchParams.locale : 'en'
  const isArabic = searchParamsLocale === 'ar'

  try {
    const payload = await getPayload({ config: configPromise })

    // Optimize query with proper field selection and indexing
    const { docs: projects } = await payload.find({
      collection: 'projects',
      where: {
        title: {
          equals: decodeURIComponent(String(slug)),
        },
      },
      locale: isArabic ? 'ar' : 'en',
      depth: 2, // Control the depth of populated relations
    })

    // If no project is found, trigger 404
    if (!projects.length) {
      notFound()
    }

    const project = JSON.parse(JSON.stringify(projects[0])) as Project
    const projectTitle = isArabic ? project.titleAr || project.title : project.title

    // Add metadata
    const metadata = {
      title: projectTitle,
      description: `MIDMAC - ${projectTitle}`,
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
    const projectContent = project.content

    // Get localized project details
    const projectDetails = project.projectDetails
    const cityLabel = isArabic ? 'المدينة' : 'City'
    const sizeLabel = isArabic ? 'المساحة' : 'Size'
    const yearLabel = isArabic ? 'السنة' : 'Year'

    // Get all paragraphs with their directions
    const contentParagraphs = projectContent ? getContentText(projectContent) : []

    return (
      <>
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <main className="min-h-full pt-24 mx-auto">
          <div className="px-4 md:px-10 h-full">
            {/* Project Header for Mobile */}
            <h1 className="text-[2rem] md:text-[4rem] font-light uppercase mb-4 md:mb-12 md:hidden px-4">
              <Suspense fallback={projectTitle}>
                <RtlText>{projectTitle}</RtlText>
              </Suspense>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              {/* Left Column - Content and Details */}
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="flex flex-col md:grid h-auto md:h-[calc(100vh-400px)] min-h-[400px] px-4">
                  {/* Project Header for Desktop */}
                  <h1 className="hidden md:block text-[4rem] font-light uppercase mb-8">
                    <Suspense fallback={projectTitle}>
                      <RtlText>{projectTitle}</RtlText>
                    </Suspense>
                  </h1>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto scrollbar-none">
                    {contentParagraphs.length > 0 && (
                      <div className="mb-8">
                        {contentParagraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            className={`mb-4 ${
                              paragraph.direction === 'rtl'
                                ? 'text-[0.85rem] md:text-[0.95rem]'
                                : 'text-[0.7rem] md:text-[0.8rem]'
                            }`}
                            dir={paragraph.direction}
                          >
                            <RtlText>{paragraph.text}</RtlText>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="mt-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {projectDetails?.city && (
                        <div className={`flex justify-between border-t-[0.5px] border-[#DAD2C2] py-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <h3 className="uppercase text-[0.8rem] md:text-[0.9rem]">
                            <RtlText>{cityLabel}</RtlText>
                          </h3>
                          <p className="text-[0.8rem] md:text-[0.9rem]">
                            <Suspense fallback={projectDetails.city}>
                              <RtlText>{projectDetails.city}</RtlText>
                            </Suspense>
                          </p>
                        </div>
                      )}
                      {projectDetails?.size && (
                        <div className={`flex justify-between border-t-[0.5px] border-[#DAD2C2] py-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <h3 className="uppercase text-[0.8rem] md:text-[0.9rem]">
                            <RtlText>{sizeLabel}</RtlText>
                          </h3>
                          <p className="text-[0.8rem] md:text-[0.9rem]">
                            <Suspense fallback={projectDetails.size}>
                              <RtlText>{projectDetails.size}</RtlText>
                            </Suspense>
                          </p>
                        </div>
                      )}
                      {projectDetails?.year && (
                        <div className={`flex justify-between border-t-[0.5px] border-b-[0.5px] border-[#DAD2C2] py-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <h3 className="uppercase text-[0.8rem] md:text-[0.9rem]">
                            <RtlText>{yearLabel}</RtlText>
                          </h3>
                          <p className="text-[0.8rem] md:text-[0.9rem]">
                            <Suspense fallback={projectDetails.year}>
                              <RtlText>{projectDetails.year}</RtlText>
                            </Suspense>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
      </>
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
}
