import { Block } from 'payload'
import { User } from '@/payload-types'

type AccessArgs = {
  req: {
    user: User | null;
  };
};

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
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      admin: {
        initCollapsed: false,
      },
      access: {
        create: ({ req }: AccessArgs) => {
          const user = req.user as User | null
          return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('user'))
        },
        update: ({ req }: AccessArgs) => {
          const user = req.user as User | null
          return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('user'))
        },
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          hasMany: false,
          admin: {
            allowCreate: true,
            description: 'Select or create a project to add to this section',
          },
        }
      ]
    }
  ]
}
