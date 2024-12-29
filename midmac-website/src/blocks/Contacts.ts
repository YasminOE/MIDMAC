import { Block } from 'payload'

export const Contacts: Block = {
  slug: 'contacts',
  imageAltText: 'Contacts block with information and action',
  interfaceName: 'ContactsBlock',
  fields: [
    {
      name: 'blockId',
      type: 'text',
      required: true,
      label: 'Section ID',
      admin: {
        description: 'Unique identifier for this section (e.g., "contacts", "contact-us")',
        placeholder: 'contacts'
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'emailLabel',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'EMAIL',
        },
        {
          name: 'email',
          type: 'text',
          required: true,
          defaultValue: 'info@midmac.design',
        },
        {
          name: 'instagramLabel',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'INSTAGRAM',
        },
        {
          name: 'instagram',
          type: 'text',
          required: true,
          defaultValue: 'midmac.design',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'PHONE',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+966 56 322 2396',
        },
      ]
    },
    {
      name: 'rightContent',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Button',
              value: 'button',
            },
            {
              label: 'Text',
              value: 'text',
            }
          ],
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Text to display in button or as heading'
          }
        },
        {
          name: 'buttonLink',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'button',
            description: 'URL for the button (only if type is button)'
          }
        }
      ]
    }
  ]
}
