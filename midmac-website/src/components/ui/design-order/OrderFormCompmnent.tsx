// 'use client'
// import { DesignOrderForm } from '@/blocks/DesginOrderForm'

import { FormBlock } from '@/blocks/Forms/Component'
import type { Form } from '@payloadcms/plugin-form-builder/types'
import type { DesignOrderFormBlock as DesignOrderFormBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function OrderFormServer() {
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: 'Design Order Form',
        },
      },
      depth: 1,
    })
  } catch (error) {
    console.error('Design order form: failed to load from Payload', error)
    return { docs: [] as never[] }
  }
}

type Props = {
  className?: string
  form: DesignOrderFormBlockProps
} 

export const DesignOrderFormComponent = async ({ className }: Props) => {
    const formData = await OrderFormServer();

    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {/* <div className="max-w-4xl mx-auto"> */}
          <div className='max-w-4xl mx-auto'>
            {formData?.docs?.[0] && (
              <FormBlock 
                form={formData.docs[0] as unknown as Form} 
                enableIntro={false} 
              />
            )}
          </div>
      </div>
    )
}