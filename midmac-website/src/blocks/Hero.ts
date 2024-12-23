import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  imageAltText: 'Hero block with two images',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'images',
      type: 'group',
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
        {
          name: 'foregroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Foreground Image',
        }
      ]
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'fullHeight',
          type: 'checkbox',
          label: 'Full Height',
          defaultValue: true,
        },
        {
          name: 'imageRatio',
          type: 'select',
          label: 'Image Split Ratio',
          options: [
            {
              label: '50/50',
              value: 'equal',
            },
            {
              label: '60/40',
              value: 'primary-larger',
            },
            {
              label: '40/60',
              value: 'secondary-larger',
            }
          ],
          defaultValue: 'equal',
        }
      ]
    }
  ]
}

// {
//     slug: 'hero',
//     imageAltText: 'Hero',
//     interfaceName: 'HeroBlock',
//     fields: [
//         {
//             name: 'image',
//             type: 'upload',
//             relationTo: 'media',
//             required: true,
//         },
//         {
//             name: 'title',
//             label: 'Title',
//             type: 'text',
//         }
//     ]
// },