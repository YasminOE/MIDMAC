import { Access, GlobalConfig } from 'payload'

const isAdmin: Access = ({ req }) => {
  const user = req.user
  return Boolean(user?.roles?.includes('admin'))
}

const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'General',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'group',
          admin: {
            description: 'Enter the label text for each language',
          },
          fields: [
            {
              name: 'en',
              type: 'text',
              required: true,
              label: 'English Label',
            },
            {
              name: 'ar',
              type: 'text',
              required: true,
              label: 'Arabic Label',
            },
          ],
        },
        {
          name: 'linkType',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Page Link',
              value: 'page',
            },
            {
              label: 'Section Link',
              value: 'section',
            }
          ],
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => {
              return siblingData.linkType === 'section'
            },
            description: 'Enter the section ID (e.g., #services, #about-us)',
          },
        },
        {
          name: 'pageLink',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (data, siblingData) => {
              return siblingData.linkType === 'page'
            },
          },
        }
      ]
    },
  ],
}

export default Header
