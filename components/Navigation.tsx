'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { navSlide, spring } from '@/lib/motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="text-2xl lg:text-3xl tracking-wide uppercase font-bold text-white"
              whileHover={{ scale: 1.02 }}
              transition={spring}
            >
              THE KINSHIP
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {['Work', 'Services', 'About'].map((item) => (
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
        </div>
      </div>
    </motion.nav>
  )
}
