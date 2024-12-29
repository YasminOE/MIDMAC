
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import '../styles/globals.css'
import Header from '@/components/ui/header'
import { AnimatePresence } from "motion/react"
import Footer from '@/components/ui/footer'


export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const payload = await getPayload({
      config: configPromise,
    })

    const header = await payload.findGlobal({
      slug: 'header',
    })

    const footer = await payload.findGlobal({
      slug: 'footer',
    })

    return (
      <html lang="en">
        <body>
          <main>
            <div className="container no-padding">
              <AnimatePresence>
               <div className="fixed-lines"></div>
              <Header HeaderLinks={header} />
              {children}
              {/* <p>footer</p> */}
            </AnimatePresence>
            <Footer Footer={footer} />
            </div>
          </main>
        </body>
      </html>
    )
  }