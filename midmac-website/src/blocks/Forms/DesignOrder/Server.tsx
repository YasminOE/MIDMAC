import { DesignOrderFormComponent } from "@/components/ui/design-order/OrderFormCompmnent";
import { unstable_rethrow } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

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
    unstable_rethrow(error)
    console.error('DesignOrderPage: Payload failed', error)
    return { docs: [] as never[] }
  }
}

export default async function DesignOrderPage() {
  const formData = await OrderFormServer()
  const first = formData.docs?.[0]
  if (!first) {
    return null
  }
  return (
    <DesignOrderFormComponent
      form={
        typeof first.fields !== 'string'
          ? first.fields
          : JSON.parse(first.fields as string)
      }
    />
  )
}