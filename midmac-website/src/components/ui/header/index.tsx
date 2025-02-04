'use client'

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from "motion/react"
import Image from 'next/image'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import ImageLogo from '@/assets/images/header-logo.svg'
import ImageMenu from '@/assets/images/header-nav-icon.svg'
import { Page } from '@/payload-types'
import RtlText from '../RtlText'

interface HeaderLink {
  label: {
    en: string;
    ar: string;
  };
  linkType: 'section' | 'page';
  link?: string | null;
  pageLink?: string | Page | null;
  id?: string | null;
}

type Props = {
  HeaderLinks: HeaderLink[]
}

function LanguageSwitchContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = searchParams.get('locale') || 'en'
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const createLocaleUrl = (locale: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', locale)
    if (pathname === '/' || pathname === '/index') {
      return `/?${params.toString()}`
    }
    return `${pathname}?${params.toString()}`
  }

  const handleLocaleChange = (locale: string) => {
    const url = new URL(window.location.origin + pathname)
    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', locale)
    url.search = params.toString()
    window.location.replace(url.toString())
  }

  return (
    <div
      className="lang-switches-container"
      ref={switcherRef}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            className="lang-toggle mt-2"
            onClick={() => setIsOpen(true)}
            aria-label="Toggle language menu"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Globe className="size-5" />
          </motion.button>
        ) : (
          <motion.div
            className="lang-switches"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Link
              href={createLocaleUrl('ar')}
              className={`lang-switch montserrat ${currentLocale === "ar" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleLocaleChange('ar')
              }}
            >
              A
            </Link>
            <Link
              href={createLocaleUrl('en')}
              className={`lang-switch montserrat ${currentLocale === "en" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleLocaleChange('en')
              }}
            >
              E
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function LanguageSwitch() {
  return (
    <Suspense fallback={<div className="lang-switches">Loading...</div>}>
      <LanguageSwitchContent />
    </Suspense>
  )
}

const HeaderNav: React.FC<Props> = ({ HeaderLinks }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const _pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = (searchParams.get('locale') || 'en') as 'en' | 'ar'

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

  // Handle scroll to section after page load
  useEffect(() => {
    if (_pathname === '/' || _pathname === '/index') {
      const sectionId = searchParams.get('section')
      if (sectionId) {
        const element = document.querySelector(`#${sectionId}`)
        if (element) {
          // Clean up the URL by removing the section parameter
          const url = new URL(window.location.href)
          url.searchParams.delete('section')
          window.history.replaceState({}, '', url.toString())
          // Scroll after a small delay to ensure page is ready
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      }
    }
  }, [_pathname, searchParams])

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

  const handleNavClick = async (link: string, linkType: 'section' | 'page') => {
    if (linkType === 'section') {
      const sectionId = link.replace('#', '')

      // Close menu and wait for animation
      setIsOpen(false)
      setIsAnimating(true)
      await new Promise(resolve => setTimeout(resolve, 500))

      if (_pathname !== '/' && _pathname !== '/index') {
        // Navigate to home with section parameter
        window.location.href = `/?locale=${currentLocale}&section=${sectionId}`
        return
      }

      // If already on home page, just scroll
      const element = document.querySelector(`#${sectionId}`)
      if (element) {
        // Clean up the URL
        const url = new URL(window.location.href)
        url.searchParams.delete('section')
        window.history.replaceState({}, '', url.toString())
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setIsOpen(false)
      // For page navigation, don't include section parameter
      const url = new URL(window.location.origin + (link || '/'))
      url.searchParams.set('locale', currentLocale)
      window.location.href = url.toString()
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (_pathname !== '/' && _pathname !== '/index') {
      window.location.href = `/?locale=${currentLocale}`
    } else {
      // If already on home, just scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <Link href={`/?locale=${currentLocale}`} className="logo" onClick={handleLogoClick}>
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
              className="menu-toggle montserrat" 
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

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              ref={menuRef}
              className="menu"
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <nav className="nav">
                <div className="nav-links">
                  {HeaderLinks?.map((link: HeaderLink, index: number) => {
                    const sectionId = link.link?.replace('#', '')
                    const href = link.linkType === 'section'
                      ? (_pathname === '/' || _pathname === '/index')
                        ? `#${sectionId}`
                        : `/?locale=${currentLocale}&section=${sectionId}`
                      : `${link.link || '/'}?locale=${currentLocale}`

                    return (
                      <RtlText key={index}>
                        <Link
                          href={href}
                          className="nav-link"
                          onClick={(e) => {
                            if (link.linkType === 'section' && (_pathname === '/' || _pathname === '/index')) {
                              e.preventDefault()
                            }
                            handleNavClick(link.link || '/', link.linkType)
                          }}
                        >
                          {link.label[currentLocale]}
                        </Link>
                      </RtlText>
                    )
                  })}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default HeaderNav


