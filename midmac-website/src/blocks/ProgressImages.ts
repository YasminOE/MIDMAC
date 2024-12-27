import { Block } from 'payload'

export const ProgressImages: Block = {
  slug: 'progressImages',
  imageAltText: 'Progress Images block',
  interfaceName: 'ProgressImagesBlock',
  fields: [
    {
      name: 'images',
      type: 'group',
      fields: [
        {
          name: 'image1',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Block 1',
        },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Block 2',
        },
        {
          name: 'image3',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Block 3',
        },
        {
          name: 'image4',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Block 4',
        },
        {
          name: 'image5',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Block 5',
        },
      ]
    }
  ]
}
