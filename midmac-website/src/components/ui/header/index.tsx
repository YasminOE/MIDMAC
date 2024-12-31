'use client'


import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion } from "motion/react"
import Image from 'next/image'
import Link from 'next/link'
import ImageLogo from '@/assets/images/header-logo.svg'
import ImageMenu from '@/assets/images/header-nav-icon.svg'

interface HeaderLink {
  label: string;
  link?: string;
}

type Props = {
  HeaderLinks: HeaderLink[]
}

export function LanguageSwitch() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = searchParams.get('locale') || 'en'

  const createLocaleUrl = (locale: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('locale', locale)
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="lang-switches">
      <Link
        href={createLocaleUrl('ar')}
        className={`lang-switch ${currentLocale === "ar" ? "active" : ""}`}
      >
        A
      </Link>
      <Link
        href={createLocaleUrl('en')}
        className={`lang-switch ${currentLocale === "en" ? "active" : ""}`}
      >
        E
      </Link>
    </div>
  )
}

const HeaderNav: React.FC<Props> = ({ HeaderLinks }) => {
  const headerLinksFetched = JSON.parse(JSON.stringify(HeaderLinks))

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const _pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        menuRef.current && 
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuVars = {
    initial: {
      opacity: 0,
      x: '100%',
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
  }

  const handleNavClick = (link: string) => {
    setIsOpen(false)
    if (link.startsWith('#')) {
      // If it's a hash link, redirect to index page with hash
      window.location.href = `/index${link}`
    }
  }

  const headerVariants = {
    initial: {
      y: -100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        easeIn: [0.61, 0.01, 0.39, 0.96],
        delay: 4.3
      }
    }
  }

  return (
    <>
      <motion.header
        className="header"
        initial="initial"
        animate="animate"
        variants={headerVariants}
      >
        <div className="container large">
          <div className="header-left">
            <Link href="/index" className="logo">
              <Image 
                src={ImageLogo} 
                alt="Midmac Logo" 
                width={100} 
                height={37}
                priority
              />
            </Link>
          </div>

          <div className="header-right">
            <LanguageSwitch />
            <button 
              ref={buttonRef}
              className="menu-toggle" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image 
                src={ImageMenu} 
                alt="Menu Icon" 
                width={20} 
                height={20}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            ref={menuRef}
            className="menu"
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <nav className="nav">
              <div className="nav-links">
              {headerLinksFetched.links?.map((link: HeaderLink, index: number) => (
                  <Link
                    key={index}
                    href={link.link?.startsWith('#') ? `/index${link.link}` : link.link || '/'}
                    className="nav-link"
                    onClick={() => handleNavClick(link.link || '/')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </motion.header>
    </>
  )
}

export default HeaderNav


