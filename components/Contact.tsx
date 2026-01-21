'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { scrollReveal, spring, fadeUpBlur } from '@/lib/motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Cinematic borders */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cinema-gold/40" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cinema-gold/40" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cinema-gold/40" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cinema-gold/40" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          ref={ref}
          variants={scrollReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <div className="space-y-8">
            {/* Header: tracking-wide, uppercase, bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide uppercase font-bold text-white leading-tight">
              LET'S <span className="text-cinema-gold">CREATE</span>
            </h2>

            {/* Body: generous leading */}
            <p className="text-lg lg:text-xl text-cinema-silver/80 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to push the boundaries of what's possible with AI,
              need professional VFX, or want to explore the intersection of both—I'm ready to collaborate.
            </p>
          </div>

          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="mailto:info@thekinship.ai"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="inline-flex items-center gap-4 px-12 py-5 border border-white/10 bg-cinema-gold text-cinema-black text-base tracking-widest uppercase font-bold hover:bg-transparent hover:text-cinema-gold transition-colors duration-300 group"
            >
              info@thekinship.ai
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
