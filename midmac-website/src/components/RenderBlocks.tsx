import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { HeroComponent } from '@/components/ui/home/HeroComponent'
import { ServicesComponent } from '@/components/ui/home/ServicesComponent'
import { ProgressImagesComponent } from '@/components/ui/home/ProgressImagesComponent'
import { ProjectsComponent } from './ui/home/ProjectsComponent'
import { AboutHeroComponent } from './ui/about-us/AboutHeroComponent'
import { TeamMembersComponent } from './ui/about-us/TeamMembersComponent'
import { Contacts } from './ui/home/ContactsComponent'
import { DesignOrderTitleComponent } from './ui/design-order/OrderTitleCompmnent'
import { DesignOrderFormComponent } from './ui/design-order/OrderFormCompmnent'

// Define a type for the block components mapping
const blockComponents = {
  hero: HeroComponent,
  services: ServicesComponent,
  progressImages: ProgressImagesComponent,
  projects: ProjectsComponent,
  contacts: Contacts,
  aboutHero: AboutHeroComponent,
  teamMembers: TeamMembersComponent,
  designOrderTitle: DesignOrderTitleComponent,
  designOrderForm: DesignOrderFormComponent,
} as const

// Create a type for valid block types
type BlockType = keyof typeof blockComponents

// Update the component props type
export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: BlockType }
          const uniqueKey = `${blockType}-${index}`

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (blockType === 'projects') {
              console.log('Rendering projects block:', block) // Debug log
            }
            return (
              <div key={uniqueKey}>
                <Block {...(block as any)} />
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

export default RenderBlocks