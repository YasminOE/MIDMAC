import '../styles/globals.css'
import { AnimatePresence } from "motion/react"
import PreLoader from './preloader/Preloader'
import HeaderServer from '@/blocks/global/Header/Server'
import FooterServer from '@/blocks/global/Footer/Server'

export const metadata = {
  title: {
    template: '%s - MIDMAC',
    default: 'MIDMAC',
  },
  description: 'MIDMAC - Modern Interior Design & Manufacturing Architectural Company',
  openGraph: {
    title: {
      template: '%s - MIDMAC',
      default: 'MIDMAC',
    },
    description: 'MIDMAC - Modern Interior Design & Manufacturing Architectural Company',
    siteName: 'MIDMAC',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' }
    ]
  },
  manifest: '/site.webmanifest',
  other: {
    google: 'notranslate',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence mode="sync">
       <PreLoader />
      <div className="container no-padding">
        <div className="fixed-lines"></div>
        <HeaderServer />
        {children}
        <FooterServer />
      </div>
    </AnimatePresence>
  )
}

