// 'use client'
// import { DesignOrderForm } from '@/blocks/DesginOrderForm'

import { FormBlock } from '@/blocks/Forms/Component'
import type { Form } from '@payloadcms/plugin-form-builder/types'
import type { DesignOrderFormBlock as DesignOrderFormBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

async function OrderFormServer() {
    const payload = await getPayload({ config })
    const form = await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: 'Design Order Form'
        }
      },
      depth: 1,
    })
    return form;
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