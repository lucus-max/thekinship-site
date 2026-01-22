'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navSlide, spring } from '@/lib/motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <motion.nav
      variants={navSlide}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cinema-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href="/" className="flex items-center h-full">
            <motion.div
              className="text-lg lg:text-xl tracking-wide uppercase font-bold text-white"
              whileHover={{ scale: 1.02 }}
              transition={spring}
            >
              THE KINSHIP
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full space-x-8 lg:space-x-12">
            {['Services', 'Work', 'About'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm lg:text-base tracking-widest uppercase text-white/70 hover:text-cinema-gold transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
            >
              <Link
                href="#contact"
                className="px-6 py-2.5 border border-white/10 bg-cinema-card/50 backdrop-blur-sm text-cinema-gold text-sm tracking-widest uppercase hover:bg-cinema-gold hover:text-cinema-black transition-all duration-300"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top right' }}
            className="absolute top-20 right-6 bg-cinema-black/70 backdrop-blur-lg border border-white/10 z-40 md:hidden"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-cinema-gold transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-cinema-gold transition-colors duration-300"
              >
                Work
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-cinema-gold transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-6 py-2.5 border border-white/10 bg-cinema-card/50 backdrop-blur-sm text-cinema-gold text-sm tracking-widest uppercase hover:bg-cinema-gold hover:text-cinema-black transition-all duration-300 text-center"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
