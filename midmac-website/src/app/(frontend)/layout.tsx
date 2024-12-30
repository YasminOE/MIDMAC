import configPromise from '@payload-config'
import { getPayload } from 'payload'
import '../styles/globals.css'
import Header from '@/components/ui/header'
import { AnimatePresence } from "motion/react"
import Footer from '@/components/ui/footer'
import PreLoader from './preloader/Preloader'


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
              <AnimatePresence mode="sync">
                <PreLoader/>
          <main>
            <div className="container no-padding">
                <div className="fixed-lines"></div>
                <Header HeaderLinks={header} />
                {children}
              <Footer Footer={footer} />
            </div>
          </main>
              </AnimatePresence>
        </body>
      </html>
    )
  }