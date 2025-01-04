import { DesignOrderFormComponent } from "@/components/ui/design-order/OrderFormCompmnent";
import { getPayload } from "payload";
// import configPromise from "@payload-config";
import config from "@payload-config";

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
  
export default async function DesignOrderPage() {
    const formData = await OrderFormServer();
    return (
        formData &&
      <DesignOrderFormComponent 
        form={ typeof formData.docs[0].fields !== 'string' ? formData.docs[0].fields : JSON.parse(formData.docs[0].fields)}
      />
    );
  }