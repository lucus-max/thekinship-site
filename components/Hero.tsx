'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { spring, fadeUpBlur, clipReveal } from '@/lib/motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with bottom gradient blend - below constellation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/floatingman.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        {/* Deep gradient blend at bottom - 75% height */}
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
            transition={{ ...spring, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-serif text-white uppercase"
            style={{ letterSpacing: '0.12em' }}
          >
            THE KINSHIP
          </motion.h1>

          {/* Body: high readability, generous leading */}
          <motion.div
            variants={clipReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="overflow-hidden text-center"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
              25 years of Generation.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="group px-10 py-4 border border-white/10 bg-cinema-gold text-cinema-black text-sm tracking-widest uppercase font-bold hover:bg-transparent hover:text-cinema-gold transition-colors duration-300"
            >
              View Work
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="px-10 py-4 border border-white/10 bg-transparent text-white text-sm tracking-widest uppercase font-bold hover:bg-cinema-card transition-colors duration-300"
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
        transition={{ ...spring, delay: 1.2 }}
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
