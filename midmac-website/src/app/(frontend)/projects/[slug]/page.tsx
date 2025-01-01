import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import { ProjectGallery } from '@/components/ui/projects/ProjectGallarey'
import { ProjectPlans } from '@/components/ui/projects/ProjectPlans'
import { Contact } from '@/components/ui/projects/Contacts'

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
    <main className="min-h-full pt-24 mx-auto ">
      <div className="px-16 h-full">
        <div className="grid grid-cols-12 gap-16">
          {/* Left Column - Content and Details */}
          <div className="col-span-4 flex justify-between flex-col h-full order-1">
            {/* Project Header */}
            <h1 className="text-[4rem] font-light uppercase mb-12">{project.title}</h1>
            {project.content && (
              <div className="prose prose-invert max-w-none mb-20">
                <p className="text-[0.8rem] mb-4">
                  {project.content && getFirstParagraphText(project.content)}
                </p>
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
          <div className="col-span-8 h-full order-2">
            {project.media && <ProjectGallery media={JSON.parse(JSON.stringify(project.media))} />}
          </div>
        </div>

        {/* Project Plans */}
        {project.plans && project.plans.length > 0 && (
          <ProjectPlans plans={JSON.parse(JSON.stringify(project.plans))} />
        )}

        {/* Contact Section */}
        <Contact />
      </div>
    </main>
  )
}

export default ProjectPage
