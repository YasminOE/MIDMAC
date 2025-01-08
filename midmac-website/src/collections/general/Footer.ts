import { Access, GlobalConfig  } from 'payload'


const isAdmin: Access = ({ req }) => {
  const user = req.user
  return Boolean(user?.roles?.includes('admin'))
}

const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'General',
  },
  access: {
    read: () => true,
    update: isAdmin,
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
