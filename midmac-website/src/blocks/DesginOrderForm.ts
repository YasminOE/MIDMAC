import { Block } from 'payload'

export const DesignOrderForm: Block = {
  slug: 'designOrderForm',
  imageAltText: 'Design Order Form block',
  interfaceName: 'DesignOrderFormBlock',
  fields: [
    {
      name: 'Design Order Form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Design Order Form',
    }
  ]
}
