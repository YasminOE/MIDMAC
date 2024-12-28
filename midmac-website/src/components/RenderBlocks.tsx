
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { HeroComponent } from '@/components/ui/home/HeroComponent'
import { ServicesComponent } from '@/components/ui/home/ServicesComponent'
import { ProgressImagesComponent } from '@/components/ui/home/ProgressImagesComponent'
import { ProjectsComponent } from './ui/home/ProjectsComponent'
import { AboutHeroComponent } from './ui/about-us/AboutHeroComponent'
import { TeamMembersComponent } from './ui/about-us/TeamMembersComponent'


const blockComponents = {
    hero: HeroComponent,
    services: ServicesComponent,
    progressImages: ProgressImagesComponent,
    projects: ProjectsComponent,
    aboutHero: AboutHeroComponent,
    teamMembers: TeamMembersComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

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

// import {blocks} from "@/blocks/blockList";
// import { Page } from '@/payload-types'

// const RenderBlocks = ({layout , className, globalData}) => {
//     <div className={[className].filter(Boolean).join(' ')}>
//         {layout.map((block, index) => {
//             if(block.blockType === 'preset'){
//                 return block.preset.map((preset, index) => {
//                     const Block = blocks[preset.blockType];
//                     if(Block){
//                         return <Block {...block} key={index} globalData={globalData}/>
//                     }
//                 })
//             }else{
//                 const Block = blocks[block.blockType];
//                 if(Block){
//                     return <Block {...block} key={index} globalData={globalData}/>
//                 }
//             }
//             return null;
//         })}
//     </div>
// }

export default RenderBlocks;