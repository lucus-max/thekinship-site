'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { spring, fadeUpBlur, clipReveal } from '@/lib/motion'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  // Background layer - inverted movement (moves opposite to mouse)
  const bgX = useTransform(smoothMouseX, [-1, 1], [-15, 15])
  const bgY = useTransform(smoothMouseY, [-1, 1], [-10, 10])

  // Foreground (man) layer - more movement
  const fgX = useTransform(smoothMouseX, [-1, 1], [30, -30])
  const fgY = useTransform(smoothMouseY, [-1, 1], [20, -20])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1, centered on screen center
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile, mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layer - parallax, inverted direction, fills frame */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          x: isMobile ? 0 : bgX,
          y: isMobile ? 0 : bgY,
          transformOrigin: 'center center',
        }}
      >
        <Image
          src="/media/floatingman_bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
      </motion.div>

      {/* Foreground (man) layer - parallax, 85% scale */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          x: isMobile ? 0 : fgX,
          y: isMobile ? 0 : fgY,
          transformOrigin: 'center center',
        }}
      >
        <div className="relative w-[105%] h-[105%]">
          <Image
            src="/media/floatingman_fg_v2.png"
            alt=""
            fill
            priority
            className="object-contain opacity-70"
            style={{ objectPosition: 'center center' }}
          />
        </div>
      </motion.div>

      {/* Gradient overlays - static, above parallax layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top gradient - fades from black at top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.3) 20%, transparent 35%)'
          }}
        />
        {/* Bottom gradient - fades to black at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 70%, #000000 100%)'
          }}
        />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      {/* Cinematic frame borders */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="flex flex-col items-center space-y-12">
          {/* Hero Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...spring, delay: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[10rem] font-serif text-white uppercase whitespace-nowrap text-center"
            style={{ letterSpacing: '0.10em' }}
          >
            THE KI<span style={{ letterSpacing: '0.06em' }}>N</span><span style={{ letterSpacing: '0.07em' }}>S</span>HIP
          </motion.h1>

          {/* Body: high readability, generous leading */}
          <motion.div
            variants={clipReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
            className="overflow-hidden text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-white max-w-3xl mx-auto leading-relaxed">
              25 years of Generation.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="group px-6 py-2.5 border border-white/10 bg-cinema-gold text-cinema-black text-sm tracking-widest uppercase font-bold hover:bg-transparent hover:text-cinema-gold transition-colors duration-300"
            >
              View Work
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="px-6 py-2.5 border border-white/10 bg-transparent text-white text-sm tracking-widest uppercase font-bold hover:bg-cinema-card transition-colors duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 3.6 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-cinema-gold/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
