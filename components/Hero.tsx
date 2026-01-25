'use client'

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useRef, useCallback } from 'react'
import { spring, fadeUpBlur, clipReveal } from '@/lib/motion'
import { constellationStars } from './ui/ParallaxOverlay'

// Wireframe points for "THE KINSHIP" - coordinates as percentages of container
const wireframeData = {
  points: [
    // T: 0-3
    { x: 0, y: 5 }, { x: 7, y: 5 }, { x: 3.5, y: 5 }, { x: 3.5, y: 95 },
    // H: 4-9
    { x: 10, y: 5 }, { x: 10, y: 95 }, { x: 10, y: 50 }, { x: 16, y: 50 }, { x: 16, y: 5 }, { x: 16, y: 95 },
    // E: 10-16
    { x: 19, y: 5 }, { x: 25, y: 5 }, { x: 19, y: 5 }, { x: 19, y: 95 }, { x: 19, y: 50 }, { x: 23, y: 50 }, { x: 25, y: 95 },
    // space then K: 17-22
    { x: 33, y: 5 }, { x: 33, y: 95 }, { x: 33, y: 50 }, { x: 40, y: 5 }, { x: 33, y: 50 }, { x: 40, y: 95 },
    // I: 23-24
    { x: 43, y: 5 }, { x: 43, y: 95 },
    // N: 25-28
    { x: 47, y: 95 }, { x: 47, y: 5 }, { x: 54, y: 95 }, { x: 54, y: 5 },
    // S: 29-35
    { x: 62, y: 10 }, { x: 57, y: 5 }, { x: 57, y: 25 }, { x: 62, y: 50 }, { x: 57, y: 75 }, { x: 57, y: 95 }, { x: 62, y: 90 },
    // H2: 36-41
    { x: 66, y: 5 }, { x: 66, y: 95 }, { x: 66, y: 50 }, { x: 72, y: 50 }, { x: 72, y: 5 }, { x: 72, y: 95 },
    // I2: 42-43
    { x: 76, y: 5 }, { x: 76, y: 95 },
    // P: 44-49
    { x: 80, y: 5 }, { x: 80, y: 95 }, { x: 80, y: 5 }, { x: 87, y: 5 }, { x: 87, y: 45 }, { x: 80, y: 45 },
    // Far outer points - extending toward constellation: 50-60
    { x: -35, y: -60 }, { x: 10, y: -80 }, { x: 50, y: -70 }, { x: 90, y: -75 }, { x: 135, y: -55 },
    { x: -40, y: 50 }, { x: 140, y: 50 },
    { x: -30, y: 160 }, { x: 25, y: 180 }, { x: 75, y: 175 }, { x: 120, y: 165 },
    // Mid-distance anchor points: 61-68
    { x: -12, y: -25 }, { x: 30, y: -30 }, { x: 70, y: -28 }, { x: 110, y: -22 },
    { x: -15, y: 125 }, { x: 35, y: 130 }, { x: 65, y: 128 }, { x: 115, y: 120 },
  ],
  lines: [
    // Letter outlines only (reduced internal)
    // T
    [0, 1], [2, 3],
    // H
    [4, 5], [6, 7], [8, 9],
    // E
    [10, 11], [12, 13], [14, 15], [13, 16],
    // K
    [17, 18], [19, 20], [21, 22],
    // I
    [23, 24],
    // N
    [25, 26], [26, 27], [27, 28],
    // S
    [29, 30], [30, 31], [31, 32], [32, 33], [33, 34], [34, 35],
    // H2
    [36, 37], [38, 39], [40, 41],
    // I2
    [42, 43],
    // P
    [44, 45], [46, 47], [47, 48], [48, 49],
    // Sparse cross-connections (reduced)
    [1, 4], [8, 10], [20, 23], [28, 30], [35, 36], [41, 42], [43, 44],
    // Far outer emanating lines - top
    [2, 61], [61, 50], [61, 51],
    [17, 62], [62, 51], [62, 52],
    [36, 63], [63, 52], [63, 53],
    [47, 64], [64, 53], [64, 54],
    // Far outer emanating lines - sides
    [0, 55], [3, 55],
    [49, 56], [45, 56],
    // Far outer emanating lines - bottom
    [3, 65], [65, 57], [65, 58],
    [18, 66], [66, 58], [66, 59],
    [37, 67], [67, 59], [67, 60],
    [45, 68], [68, 60],
    // Connect mid-points to far points
    [50, 51], [52, 53], [53, 54],
    [57, 58], [59, 60],
    // Diagonal rays outward
    [4, 61], [26, 62], [40, 63], [44, 64],
    [5, 65], [25, 66], [41, 67], [48, 68],
  ]
}

// Logo ref stored at module level for wireframe access
const logoRefGlobal = { current: null as HTMLHeadingElement | null }

function LogoTitle() {
  const localRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    logoRefGlobal.current = localRef.current
  }, [])

  return (
    <motion.h1
      ref={localRef}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ...spring, delay: 0.6 }}
      className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[10rem] font-serif text-white uppercase whitespace-nowrap text-center"
      style={{ letterSpacing: '0.10em' }}
    >
      THE KI<span style={{ letterSpacing: '0.06em' }}>N</span><span style={{ letterSpacing: '0.07em' }}>S</span>HIP
    </motion.h1>
  )
}

// Outer point indices that should connect to constellation (far outer points: 50-60)
const OUTER_POINT_INDICES = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]

function LogoWireframe({ heroRef }: {
  heroRef: React.RefObject<HTMLElement | null>
}) {
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 })
  const [logoRect, setLogoRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isActive, setIsActive] = useState(false)
  const [starConnections, setStarConnections] = useState<{ from: { x: number, y: number }, to: { x: number, y: number } }[]>([])
  const [, forceUpdate] = useState(0)
  const revealRadius = 350 // pixels
  const animFrameRef = useRef<number>()

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const updateLogoRect = () => {
      const logo = logoRefGlobal.current
      if (!logo) return
      const heroRect = hero.getBoundingClientRect()
      const rect = logo.getBoundingClientRect()
      setLogoRect({
        x: rect.left - heroRect.left,
        y: rect.top - heroRect.top,
        width: rect.width,
        height: rect.height
      })
    }

    // Initial calculation with delays for animation
    updateLogoRect()
    const timer1 = setTimeout(updateLogoRect, 500)
    const timer2 = setTimeout(updateLogoRect, 1000)
    const timer3 = setTimeout(updateLogoRect, 1500)

    window.addEventListener('resize', updateLogoRect)
    window.addEventListener('scroll', updateLogoRect)

    const handleMouseMove = (e: MouseEvent) => {
      const heroRect = hero.getBoundingClientRect()
      setCursorPos({
        x: e.clientX - heroRect.left,
        y: e.clientY - heroRect.top
      })
      updateLogoRect()
    }

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => {
      setIsActive(false)
      setCursorPos({ x: -1000, y: -1000 })
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseenter', handleMouseEnter)
    hero.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop to sync with constellation
    const animate = () => {
      forceUpdate(n => n + 1) // Trigger re-render to get latest star positions
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener('resize', updateLogoRect)
      window.removeEventListener('scroll', updateLogoRect)
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseenter', handleMouseEnter)
      hero.removeEventListener('mouseleave', handleMouseLeave)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [heroRef])

  // Find nearest constellation star to a point
  const findNearestStar = useCallback((x: number, y: number) => {
    if (constellationStars.length === 0) return null
    let nearest = constellationStars[0]
    let minDist = Infinity
    for (const star of constellationStars) {
      const dx = star.x - x
      const dy = star.y - y
      const dist = dx * dx + dy * dy
      if (dist < minDist && star.depth > 0.3) { // Only connect to visible stars
        minDist = dist
        nearest = star
      }
    }
    return nearest
  }, [])

  const getOpacity = useCallback((px: number, py: number) => {
    if (!isActive) return 0
    const dx = cursorPos.x - px
    const dy = cursorPos.y - py
    const dist = Math.sqrt(dx * dx + dy * dy)
    const normalized = Math.min(dist / revealRadius, 1)
    return Math.max(0, Math.pow(1 - normalized, 1.5))
  }, [cursorPos, isActive, revealRadius])

  // Convert wireframe percentage to actual hero coordinates
  // Scale x by 1.2 around center (50%), offset 75px right
  const toHeroCoords = useCallback((xPct: number, yPct: number) => {
    const scaledX = 50 + (xPct - 50) * 1.2 // Scale around center
    return {
      x: logoRect.x + (scaledX / 100) * logoRect.width + 75,
      y: logoRect.y + (yPct / 100) * logoRect.height
    }
  }, [logoRect])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ overflow: 'visible' }}
    >
      {/* Draw lines */}
      {wireframeData.lines.map(([from, to], i) => {
        const p1 = wireframeData.points[from]
        const p2 = wireframeData.points[to]
        const coords1 = toHeroCoords(p1.x, p1.y)
        const coords2 = toHeroCoords(p2.x, p2.y)
        const midX = (coords1.x + coords2.x) / 2
        const midY = (coords1.y + coords2.y) / 2
        const opacity = getOpacity(midX, midY)

        return (
          <line
            key={`line-${i}`}
            x1={coords1.x}
            y1={coords1.y}
            x2={coords2.x}
            y2={coords2.y}
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity={opacity * 0.7}
          />
        )
      })}

      {/* Draw points */}
      {wireframeData.points.map((point, i) => {
        const coords = toHeroCoords(point.x, point.y)
        const opacity = getOpacity(coords.x, coords.y)

        return (
          <circle
            key={`point-${i}`}
            cx={coords.x}
            cy={coords.y}
            r="2"
            fill="#D4AF37"
            fillOpacity={opacity * 0.9}
          />
        )
      })}

      {/* Draw connections to constellation stars */}
      {OUTER_POINT_INDICES.map((pointIdx) => {
        const point = wireframeData.points[pointIdx]
        if (!point) return null
        const coords = toHeroCoords(point.x, point.y)
        const nearestStar = findNearestStar(coords.x, coords.y)
        if (!nearestStar) return null

        const midX = (coords.x + nearestStar.x) / 2
        const midY = (coords.y + nearestStar.y) / 2
        const opacity = getOpacity(midX, midY) * nearestStar.depth

        return (
          <g key={`constellation-${pointIdx}`}>
            <line
              x1={coords.x}
              y1={coords.y}
              x2={nearestStar.x}
              y2={nearestStar.y}
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeOpacity={opacity * 0.5}
            />
            <circle
              cx={nearestStar.x}
              cy={nearestStar.y}
              r="2"
              fill="#D4AF37"
              fillOpacity={opacity * 0.7}
            />
          </g>
        )
      })}
    </svg>
  )
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)
  const [fgLoaded, setFgLoaded] = useState(false)
  const imagesReady = bgLoaded && fgLoaded
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll tracking for parallax
  const { scrollY } = useScroll()

  // Scroll-based parallax - inverted (scroll down = move up) for depth effect
  const scrollBgY = useTransform(scrollY, [0, 1000], [0, -150])
  const scrollFgY = useTransform(scrollY, [0, 1000], [0, -300])

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  // Background layer - inverted movement (moves opposite to mouse)
  const bgX = useTransform(smoothMouseX, [-1, 1], [-15, 15])
  const bgMouseY = useTransform(smoothMouseY, [-1, 1], [-10, 10])
  // Combined bg Y: mouse + scroll
  const bgY = useTransform([bgMouseY, scrollBgY], ([mouse, scroll]) => (mouse as number) + (scroll as number))

  // Foreground (man) layer - more movement (30% increased from base 30/20)
  const fgX = useTransform(smoothMouseX, [-1, 1], [39, -39])
  const fgMouseY = useTransform(smoothMouseY, [-1, 1], [26, -26])
  // Combined fg Y: mouse + scroll
  const fgY = useTransform([fgMouseY, scrollFgY], ([mouse, scroll]) => (mouse as number) + (scroll as number))

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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* Parallax layers container - fades in when both images loaded */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: imagesReady ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background layer - parallax, inverted direction, fills frame */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: isMobile ? 0 : bgX,
            y: isMobile ? scrollBgY : bgY,
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/media/floatingman_bg.png"
            alt=""
            fill
            priority
            className="object-cover opacity-70"
            onLoad={() => setBgLoaded(true)}
          />
        </motion.div>

        {/* Foreground (man) layer - parallax with mouse + scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            x: isMobile ? 0 : fgX,
            y: isMobile ? scrollFgY : fgY,
            transformOrigin: 'center center',
          }}
        >
          <div className="relative w-[157%] h-[157%] md:w-[105%] md:h-[105%]">
            <Image
              src="/media/floatingman_fg_v2.png"
              alt=""
              fill
              priority
              className="object-contain opacity-70"
              style={{ objectPosition: 'center center' }}
              onLoad={() => setFgLoaded(true)}
            />
          </div>
        </motion.div>
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

      {/* Logo Wireframe - positioned at section level */}
      <LogoWireframe heroRef={sectionRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="flex flex-col items-center space-y-12">
          {/* Hero Logo */}
          <LogoTitle />

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

      {/* Scroll indicator - always centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 3.6 }}
        className="absolute bottom-4 left-0 right-0 z-20 flex justify-center"
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
