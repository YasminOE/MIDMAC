/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { HeroComponent } from '@/components/ui/home/HeroComponent'
import { ServicesComponent } from '@/components/ui/home/ServicesComponent'
import { ProgressImagesComponent } from '@/components/ui/home/ProgressImagesComponent'
import { ProjectsComponent } from './ui/home/ProjectsComponent'
import { AboutHeroComponent } from './ui/about-us/AboutHeroComponent'
import { TeamMembersComponent } from './ui/about-us/TeamMembersComponent'
import { Contacts } from './ui/home/ContactsComponent'
import { toKebabCase } from '@/utilities/to-kebab-case'


const blockComponents = {
    hero: HeroComponent,
    services: ServicesComponent,
    progressImages: ProgressImagesComponent,
    projects: ProjectsComponent,
    aboutHero: AboutHeroComponent,
    teamMembers: TeamMembersComponent,
    contacts: Contacts,
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          const uniqueKey = `${blockType}-${index}`

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]
            if (Block) {
              return (
                <div key={uniqueKey}  id={toKebabCase(blockType)}>
                  <Block {...(block as any)} />
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

export default RenderBlocks;