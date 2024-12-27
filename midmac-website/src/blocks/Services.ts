import { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  imageAltText: 'Services block with an image and list',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'blockId',
      type: 'text',
      required: true,
      label: 'Section ID',
      admin: {
        description: 'Unique identifier for this section (e.g., "services", "our-services")',
        placeholder: 'services'
      },
    },
    {
      name: 'servicesImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Services Image',
    },
    {
        name: 'ServiceTypes',
        type: 'group',
        label: 'Service Types',
        fields: [
            {
                name: 'title',
                type: 'text',
                required: true,
                label: 'Section Title',
                localized: true,
              },
              {
                name: 'settings',
                type: 'group',
                fields: [
                  {
                    name: 'layout',
                    type: 'select',
                    label: 'Size',
                    options: [
                      {
                        label: 'Half',
                        value: 'half',
                      },
                      {
                        label: 'Full',
                        value: 'full',
                      }
                    ],
                    defaultValue: 'half',
                  }
                ]
            },
            {
              name: 'services',
              type: 'textarea',
              label: 'Services',
              required: true,
              localized: true,
            }
        ]
    },
  ]
}
