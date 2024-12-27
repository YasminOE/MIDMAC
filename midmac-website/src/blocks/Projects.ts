import { Block } from 'payload'

export const Projects: Block = {
  slug: 'projects',
  imageAltText: 'Projects block',
  interfaceName: 'ProjectsBlock',
  fields: [
    {
      name: 'blockId',
      type: 'text',
      required: true,
      label: 'Section ID',
      admin: {
        description: 'Unique identifier for this section',
        placeholder: 'projects'
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      localized: true,
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          hasMany: false,
        }
      ]
    }
  ]
}
