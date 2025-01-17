import '../styles/globals.css'
import { AnimatePresence } from "motion/react"
import PreLoader from './preloader/Preloader'
import HeaderServer from '@/blocks/global/Header/Server'
import FooterServer from '@/blocks/global/Footer/Server'

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