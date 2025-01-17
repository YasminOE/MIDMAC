import '../styles/globals.css'
// import Header from '@/components/ui/header'
import { AnimatePresence } from "motion/react"
// import Footer from '@/components/ui/footer'
// import PreLoader from './preloader/Preloader'
import HeaderServer from '@/blocks/global/Header/Server'
import FooterServer from '@/blocks/global/Footer/Server'


export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {


    return (
        <AnimatePresence mode="sync">
            {/* <PreLoader/> */}
            <div className="container no-padding">
              <div className="fixed-lines"></div>
              <HeaderServer />
              {children}
              <FooterServer />
            </div>
        </AnimatePresence>
    )
  }