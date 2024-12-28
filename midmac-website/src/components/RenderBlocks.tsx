import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

// Import your components
import { HeroComponent } from '@/components/ui/home/HeroComponent'
import { ServicesComponent } from '@/components/ui/home/ServicesComponent'
import { ProgressImagesComponent } from '@/components/ui/home/ProgressImagesComponent'
import { ProjectsComponent } from './ui/home/ProjectsComponent'
import { AboutHeroComponent } from './ui/about-us/AboutHeroComponent'
import { TeamMembersComponent } from './ui/about-us/TeamMembersComponent'

// Define the block components mapping with proper typing
const blockComponents = {
  hero: HeroComponent,
  services: ServicesComponent,
  progressImages: ProgressImagesComponent,
  projects: ProjectsComponent,
  aboutHero: AboutHeroComponent,
  teamMembers: TeamMembersComponent,
} as const

// Create a type for valid block types
type BlockType = keyof typeof blockComponents

// Fix the typing of the RenderBlocks component
export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: BlockType }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <div className="" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

export default RenderBlocks