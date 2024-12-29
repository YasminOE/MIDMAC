import { GlobalConfig  } from 'payload'

const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'General',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
}

export default Footer
