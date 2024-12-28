import { Block } from 'payload'

export const TeamMembers: Block = {
  slug: 'teamMembers',
  imageAltText: 'Team Members block',
  interfaceName: 'TeamMembersBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'members',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          required: true,
          localized: true,
        }
      ]
    }
  ]
} 