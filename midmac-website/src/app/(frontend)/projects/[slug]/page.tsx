import { notFound } from 'next/navigation'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import { ProjectGallery } from '@/components/ui/projects/ProjectGallarey'

// TODO: fix on small and big screens, add the animation, change the slug to be kebab case

// Define props type for the page parameters
type Props = {
  params: {
    slug: string
  }
}

// Server component to fetch and display project data
export default async function ProjectPage({ params: { slug } }: Props) {
  const payload = await getPayload({ config: configPromise })

  // Fetch project by title (since we're using title as the slug in the URL)
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      title: {
        equals: decodeURIComponent(slug),
      },
    },
  })

  const project = projects[0] as Project

  if (!project) {
    notFound()
  }

  // Helper function to extract text from content
  const extractText = (content: any) => {
    if (!content?.root?.children) return ''
    
    return content.root.children.map((paragraph: any) => {
      if (!paragraph.children) return ''
      
      return paragraph.children.map((child: any) => {
        if (child.type === 'text') {
          return child.text
        }
        if (child.type === 'linebreak') {
          return '\n'
        }
        return ''
      }).join('')
    }).join('\n\n')
  }

  return (
    <main className="min-h-screen pt-24 max-w-[1400px] mx-auto">
    {/* <main className="min-h-screen relative pt-24 max-w-[1400px] mx-auto"> */}
      <div className="">

        <div className="grid grid-cols-12 gap-16">
          
          {/* Left Column - Content and Details */}
          <div className="col-span-4 flex justify-between flex-col h-full">
              {/* Project Header */}
        <h1 className="text-[4rem] font-light uppercase mb-12">{project.title}</h1>
            {project.content && (
              <div className="prose prose-invert max-w-none mb-20">
                {extractText(project.content).split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-[0.8rem] mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 gap-1 px-2">
              {project.projectDetails?.city && (
                <div className="flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[1.1rem] tracking-wider">City</h3>
                  <p className="text-[1.1rem]">{project.projectDetails.city}</p>
                </div>
              )}
              {project.projectDetails?.size && (
                <div className="flex justify-between border-t-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[1.1rem] tracking-wider">Size</h3>
                  <p className="text-[1.1rem]">{project.projectDetails.size}</p>
                </div>
              )}
              {project.projectDetails?.year && (
                <div className="flex justify-between border-t-[0.5px] border-b-[0.5px] border-[#DAD2C2] py-2">
                  <h3 className="uppercase text-[1.1rem] tracking-wider">Year</h3>
                  <p className="text-[1.1rem]">{project.projectDetails.year}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="col-span-8 h-full bg-red-500">
            {project.media && <ProjectGallery media={project.media} />}
          </div>
        </div>

        {/* Project Plans */}
        {project.plans && project.plans.length > 0 && (
          <div className="mt-32 mb-16">
            <div className="grid grid-cols-1 gap-8">
              {project.plans.map((planItem, index) => {
                if (typeof planItem.plan === 'string' || !planItem.plan?.url) return null
                
                return (
                  <div key={index} className="relative aspect-[2/3]">
                    <Image
                      src={planItem.plan.url}
                      alt={planItem.plan.alt || `Project plan ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="100%"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
