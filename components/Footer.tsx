'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { spring } from '@/lib/motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={spring}
              className="text-2xl tracking-wide uppercase font-bold text-white"
            >
              THE KINSHIP
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-widest uppercase text-cinema-gold">Navigate</h4>
            <nav className="flex flex-col space-y-2">
              {['Work', 'Services', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/60 hover:text-cinema-gold transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-widest uppercase text-cinema-gold">Get In Touch</h4>
            <div className="space-y-2">
              <a
                href="mailto:info@thekinship.ai"
                className="block text-sm text-white/60 hover:text-cinema-gold transition-colors"
              >
                info@thekinship.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} The Kinship. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with Next.js • Hosted on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
