'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
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
            </div>

            {/* Header: tracking-wide, uppercase, bold - 30% larger */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase font-bold text-white leading-tight mb-8">
              Human-led, <span className="text-cinema-gold">high-end content.</span>
            </h2>

            {/* Body: generous leading */}
            <div className="space-y-6 text-cinema-silver/80">
              <p className="text-lg leading-relaxed">
                I've spent two decades directing and supervising for major brands. Now, I'm using generative tools to take it further. 25 years of knowledge. Now powered by AI.
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
                title: 'TEAM, NOT TRANSACTIONS',
                description: 'More partner, less vendor. I work best when we\'re dreaming up ideas together. I\'m here to be a seamless extension of your creative flow.',
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

        {/* Tech stack logos */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <p className="text-sm tracking-widest uppercase text-white/40 text-center mb-12">
            Powered By
          </p>
          <div className="flex justify-center items-center gap-12 md:gap-20 py-8 px-6">
            <Image src="/logos/comfyui.webp" alt="Comfy UI" width={120} height={120} className="w-20 h-20 object-contain" />
            <Image src="/logos/weavy.jpg" alt="Weavy" width={120} height={120} className="w-20 h-20 object-contain" />
            <Image src="/logos/nuke.jpg" alt="Nuke" width={120} height={120} className="w-20 h-20 object-contain" />
            <Image src="/logos/davinci.jpg" alt="DaVinci Resolve" width={120} height={120} className="w-20 h-20 object-contain" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
