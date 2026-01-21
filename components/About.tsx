'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { scrollReveal, spring, staggerItem } from '@/lib/motion'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 lg:py-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left column - Headline */}
          <motion.div
            ref={ref}
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-12 h-px bg-cinema-gold" />
              <span className="text-xs tracking-widest uppercase text-cinema-gold">Creativity, Amplified.</span>
            </div>

            {/* Header: tracking-wide, uppercase, bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase font-bold text-white leading-tight mb-8">
              HUMAN CREATIVITY, <span className="text-cinema-gold">AMPLIFIED</span>
            </h2>

            {/* Body: generous leading */}
            <div className="space-y-6 text-cinema-silver/80">
              <p className="text-lg leading-relaxed">
                At the intersection of artistry and innovation, I believe the most powerful creative work emerges when human vision guides intelligent tools.
              </p>
              <p className="text-lg leading-relaxed">
                With 25 years in VFX, compositing, and creative direction across commercials and branded content, I'm now pioneering the integration of generative AI into creative workflows.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-4xl tracking-wide font-bold text-cinema-gold mb-2">25+</div>
                <div className="text-sm text-white/60 tracking-wide">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl tracking-wide font-bold text-cinema-gold mb-2">100%</div>
                <div className="text-sm text-white/60 tracking-wide">Ethical AI</div>
              </div>
              <div>
                <div className="text-4xl tracking-wide font-bold text-cinema-gold mb-2">∞</div>
                <div className="text-sm text-white/60 tracking-wide">Possibilities</div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Values */}
          <div className="lg:col-span-7 space-y-8">
            {[
              {
                title: 'IDEAS FIRST',
                description: 'Technology serves vision, always. Never has the idea been more important.',
              },
              {
                title: 'ETHICAL AI',
                description: 'I can work locally and securely with open-source, ethically-trained models, or adapt to your individual AI tools and workflows. Your data stays secure.',
              },
              {
                title: 'PARTNERSHIP, NOT TRANSACTIONS',
                description: 'I embed myself in your creative process, becoming an extension of your team.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{ x: 8 }}
                transition={{ ...spring, delay: 0.2 + index * 0.1 }}
                className="border border-white/10 bg-cinema-card/50 p-8 hover:bg-cinema-card transition-colors duration-300"
              >
                {/* Title: tracking-wide, uppercase, bold */}
                <h3 className="text-xl lg:text-2xl tracking-wide uppercase font-bold text-cinema-gold mb-4">
                  {value.title}
                </h3>
                {/* Body: generous leading */}
                <p className="text-base text-cinema-silver/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
