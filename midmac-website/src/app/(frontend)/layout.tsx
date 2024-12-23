import configPromise from '@payload-config'
import { getPayload } from 'payload'
import '../styles/globals.css'
import Header from '@/components/ui/header'
import { AnimatePresence } from "motion/react"
// import localFont from 'next/font/local'
// import '../fonts/stylesheet.css'

// const arabicFont = localFont({
//   src: '../fonts/Manchette-Black.woff2',
//   variable: '--font-arabic'
// })

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

    return (
      <html lang="en">
        <body>
            <AnimatePresence mode="wait">
         <div className="fixed-lines"></div>
    
        <Header HeaderLinks={header} />
        {children}
        <pre>{JSON.stringify(header, null, 2)}</pre>
            </AnimatePresence>
        </body>
      </html>
    )
  }