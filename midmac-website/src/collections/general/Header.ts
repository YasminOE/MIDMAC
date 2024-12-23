import { GlobalConfig  } from 'payload'

const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'General',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'linkType',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Page Link',
              value: 'page',
              relationTo: 'pages', 
            },
            {
              label: 'Section Link',
              value: 'section',
              relationTo: 'sections',
            }
          ],
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'For pages: use the page slug. For sections: use the section ID (e.g., #about-us)',
          },
        },
      ]
    },
  ],
}

export default Header
