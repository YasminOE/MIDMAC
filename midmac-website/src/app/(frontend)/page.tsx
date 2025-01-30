import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Page } from '@/payload-types'
import { Metadata } from 'next'

// Enable ISR
export const revalidate = 3600 // Revalidate every hour

type HomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

// Generate metadata
export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const locale = typeof searchParams?.locale === 'string' &&
    (searchParams.locale === 'ar' || searchParams.locale === 'en')
    ? searchParams.locale
    : 'en'

  return {
    title: 'MIDMAC',
    description: 'MIDMAC Design',
  }
}

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const locale = typeof searchParams?.locale === 'string' &&
    (searchParams.locale === 'ar' || searchParams.locale === 'en')
    ? searchParams.locale 
    : 'en'

  try {
    const payload = await getPayload({ config: configPromise })

    // First, get all projects to ensure they're properly populated
    const { docs: projects } = await payload.find({
      collection: 'projects',
      locale,
      depth: 1,
    })

    // Create a map of project IDs to full project objects
    const projectMap = projects.reduce((acc, project) => {
      acc[project.id] = project
      return acc
    }, {} as Record<string, any>)

    // Fetch the home page
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        and: [
          {
            slug: {
              equals: 'index',
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      depth: 2,
      locale,
    })

    if (!pages?.[0]) {
      notFound()
    }

    const page = pages[0] as Page

    // Populate projects in the layout blocks
    if (page.layout) {
      page.layout = page.layout.map(block => {
        if (block.blockType === 'projects' && block.projects) {
          return {
            ...block,
            projects: block.projects.map(projectRef => ({
              ...projectRef,
              project: projectMap[projectRef.project as string] || projectRef.project
            }))
          }
        }
        return block
      })
    }

    return (
      <div className="container-wrapper">
        {page.layout && <RenderBlocks blocks={page.layout} />}
      </div>
    )
  } catch (error) {
    console.error('Error fetching home page:', error)
    notFound()
  }
}