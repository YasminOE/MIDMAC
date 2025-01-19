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
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-icon-36x36', url: '/android-icon-36x36.png' },
      { rel: 'android-icon-48x48', url: '/android-icon-48x48.png' },
      { rel: 'android-icon-72x72', url: '/android-icon-72x72.png' },
      { rel: 'android-icon-96x96', url: '/android-icon-96x96.png' },
      { rel: 'android-icon-144x144', url: '/android-icon-144x144.png' },
      { rel: 'android-icon-192x192', url: '/android-icon-192x192.png' },
      { rel: 'ms-icon-70x70', url: '/ms-icon-70x70.png' },
      { rel: 'ms-icon-144x144', url: '/ms-icon-144x144.png' },
      { rel: 'ms-icon-150x150', url: '/ms-icon-150x150.png' },
      { rel: 'ms-icon-310x310', url: '/ms-icon-310x310.png' }
    ]
  },
  manifest: '/manifest.json',
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

