'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { scrollReveal, spring, staggerContainer, staggerItem } from '@/lib/motion'

const services = [
  {
    title: 'CREATIVE DIRECTION',
    description: 'Strategic creative direction for brands and agencies. Bridging the gap between human artistry and technological innovation.',
    highlights: ['Concept', 'Story', 'Brand', 'Execution'],
  },
  {
    title: 'GENERATIVE AI',
    description: 'Cutting-edge AI content creation. I can work locally and securely with open-source models, or adapt to your individual AI tools and workflows.',
    highlights: ['Image Generation', 'Image to Video', 'Reference to Video', 'Upscaling'],
  },
  {
    title: 'FINISHING',
    description: 'An end to end wheelhouse, with compositing at its heart.',
    highlights: ['Edit', 'VFX', 'Grading', 'Finishing'],
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ y: -8 }}
      transition={spring}
      className="group relative border border-white/10 bg-cinema-card/50 p-8 lg:p-10 hover:bg-cinema-card transition-colors duration-500"
    >
      <div className="relative h-full flex flex-col">
        <div className="space-y-4 text-center md:text-left">
          {/* Title: tracking-wide, uppercase, bold */}
          <h3 className="text-2xl lg:text-3xl tracking-wide uppercase font-bold text-white group-hover:text-cinema-gold transition-colors duration-300">
            {service.title}
          </h3>

          {/* Body: generous leading */}
          <p className="text-base lg:text-lg text-cinema-silver/80 leading-relaxed min-h-[4.5rem]">
            {service.description}
          </p>
        </div>

        <div className="pt-4 space-y-3 mt-auto flex flex-col items-center md:items-start">
          {service.highlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-cinema-gold" />
              <span className="text-sm text-white/60 tracking-wide">{highlight}</span>
              <div className="w-1.5 h-1.5 bg-cinema-gold md:hidden" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative pt-16 lg:pt-20 pb-12 md:pb-32 lg:pb-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          variants={scrollReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
