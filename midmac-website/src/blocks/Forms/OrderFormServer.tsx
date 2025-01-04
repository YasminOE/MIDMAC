// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { DesignOrderFormComponent } from '@/components/ui/design-order/OrderFormCompmnent'

// export default async function OrderFormServer() {
//   const payload = await getPayload({ config })
//   const form = await payload.find({
//     collection: 'forms',
//     depth: 1,
//   })
  
//   return (
//     <div>
//       <DesignOrderFormComponent 
//         formData={form?.docs[0]}
//         className=""
//       />
//     </div>
//   )
// }