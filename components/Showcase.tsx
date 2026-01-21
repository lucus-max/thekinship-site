'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { scrollReveal, spring, staggerContainer, staggerItem } from '@/lib/motion'

// Seeded random for consistent tile rotations
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Generate random rotation between 0 and 3 degrees (positive or negative)
function generateTileRotations(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    rotateX: (seededRandom(i * 7 + 1) * 3) * (seededRandom(i * 13) > 0.5 ? 1 : -1),
    rotateY: (seededRandom(i * 11 + 2) * 3) * (seededRandom(i * 17) > 0.5 ? 1 : -1),
  }))
}

const projects = [
  {
    title: 'VFX SHOWREEL',
    subtitle: '25 Years of Craft',
    description: 'A foundation of creative direction, VFX supervision, compositing and design across commercials and branded content.',
    category: 'Legacy Work',
    image: '/media/vfx-showreel.png',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/Showreel_2025_Exported.mp4',
  },
  {
    title: 'AI LAUNCH FILM',
    subtitle: 'The Future, Rendered Locally',
    description: 'We are still cavemen in this new age. A short piece generated locally at 2K resolution using ethical, open-source AI models.',
    category: 'Generative AI',
    image: '/media/ai-film.png',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/ai-film.mp4',
  },
  {
    title: 'NISSAN CAMPAIGN',
    subtitle: 'From Still to Motion',
    description: 'A complete workflow demonstration: starting from a single product image, employing the latest AI and ML tools to deliver full video content.',
    category: 'Brand Work',
    image: '/media/nissan-bg.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/nissan.mp4',
  },
  {
    title: 'VOLVO ES90',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/volvo-es90.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/volvo-es90.mp4',
  },
  {
    title: 'NISSAN THE DROP',
    subtitle: 'Shoot Director, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/nissan-the-drop.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/nissan-the-drop.mp4',
  },
  {
    title: 'DELIVEROO THE ULTIMATE GIFT',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/deliveroo-ultimate-gift.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/deliveroo-ultimate-gift.mp4',
  },
  {
    title: 'LEGOLAND MYTHICA',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/legoland-mythica.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/legoland-mythica.mp4',
  },
  {
    title: 'EE GAMER',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/ee-gamer.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/ee-gamer.mp4',
  },
  {
    title: 'STORMZY TOXIC TRAIT',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/stormzy-toxic-trait.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/stormzy-toxic-trait.mp4',
  },
  {
    title: 'LEGO TITAN',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/lego-titan.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/lego-titan.mp4',
  },
  {
    title: 'SKY F1 TITLES',
    subtitle: 'VFX Supervision, co-Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/sky-f1-2023.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/sky-f1-2023.mp4',
  },
  {
    title: 'GOOGLE PIXEL',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/google-pixel.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/google-pixel.mp4',
  },
  {
    title: 'LIONS SERIES TITLES',
    subtitle: 'Lead Comp',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/lions-series-2021.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/lions-series-2021.mp4',
  },
  {
    title: 'SEAT IDENTS',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/seat-idents.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/seat-idents.mp4',
  },
  {
    title: 'THREE PHONES ARE GOOD',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/three-phones-are-good.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/three-phones-are-good.mp4',
  },
  {
    title: 'CADBURYS FINGERS',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/cadburys-fingers.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/cadburys-fingers.mp4',
  },
  {
    title: 'NIKE KDI',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time based Arts',
    category: 'Brand Work',
    image: '/media/nike-kdi.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/nike-kdi.mp4',
  },
  {
    title: 'VW GTE',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time based Arts',
    category: 'Brand Work',
    image: '/media/vw-gte.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/vw-gte.mp4',
  },
  {
    title: 'THREE MAKE IT RIGHT',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/three-make-it-right.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/three-make-it-right.mp4',
  },
]

// Video Modal Component
function VideoModal({ video, isOpen, onClose }: { video: string; isOpen: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hideControlsTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isOpen && videoRef.current) {
      const vid = videoRef.current
      setIsLoading(true)
      vid.volume = 1
      vid.muted = false

      vid.play().then(() => {
        setIsMuted(false)
      }).catch(() => {
        vid.muted = true
        setIsMuted(true)
        vid.play()
      })
    }
  }, [isOpen, video])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleMouseMove = () => {
    setShowControls(true)
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current)
    }
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false)
    }, 2500)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(currentProgress)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      videoRef.current.currentTime = percentage * videoRef.current.duration
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-black/95 cursor-pointer"
          onClick={onClose}
          onMouseMove={handleMouseMove}
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={spring}
            className="relative w-full max-w-[95vw] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cinema-gold/30 border-t-cinema-gold rounded-full animate-spin" />
              </div>
            )}

            <video
              ref={videoRef}
              src={video}
              className="w-full h-full object-contain"
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onCanPlay={() => setIsLoading(false)}
              onEnded={onClose}
              onTimeUpdate={handleTimeUpdate}
              onClick={(e) => {
                e.stopPropagation()
                if (videoRef.current?.paused) {
                  videoRef.current.play()
                } else {
                  videoRef.current?.pause()
                }
              }}
            />

            {isMuted && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-6 left-6 px-4 py-2 bg-cinema-black/80 border border-cinema-gold/50 text-cinema-gold text-sm tracking-wide cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  if (videoRef.current) {
                    videoRef.current.muted = false
                    setIsMuted(false)
                  }
                }}
              >
                Click to unmute
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cinema-black/80 to-transparent"
            >
              <div className="flex items-center gap-4">
                <button
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted
                      setIsMuted(videoRef.current.muted)
                    }
                  }}
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                <div
                  ref={progressRef}
                  className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSeek(e)
                  }}
                >
                  <div
                    className="h-full bg-cinema-gold transition-[width] duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    videoRef.current?.requestFullscreen()
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<typeof projects[0] | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Generate random rotations for each tile (consistent across renders)
  const tileRotations = useMemo(() => generateTileRotations(projects.length + 1), []) // +1 for "more to come"

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Transform mouse position to rotation (subtle tilt) - rotates TOWARD mouse
  const rotateY = useTransform(smoothMouseX, [-1, 1], [2.75, -2.75])
  const rotateX = useTransform(smoothMouseY, [-1, 1], [-1.75, 1.75])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleGlobalMouseMove)
      return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [isMobile, mouseX, mouseY])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <section id="work" className="relative z-10 py-32 lg:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            ref={ref}
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-12"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-px bg-cinema-gold mb-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase font-bold text-white leading-tight text-center">
              FEATURED WORK
            </h2>
          </motion.div>
        </div>

        {/* 3D Tilt Container - desktop only */}
        <div style={{ perspective: isMobile ? 'none' : '1500px' }}>
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              scale: isMobile ? 1 : 0.95,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {/* First 3 featured videos - 3 per row */}
            <motion.div
              ref={gridRef}
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {projects.slice(0, 3).map((project, index) => {
                const isHovered = hoveredIndex === index
                const anotherIsHovered = hoveredIndex !== null && hoveredIndex !== index
                const rotation = tileRotations[index]

                return (
                  <motion.div
                    key={project.title}
                    variants={staggerItem}
                    className="relative aspect-video cursor-pointer overflow-hidden group"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateX: isMobile ? 0 : (isHovered ? 0 : rotation.rotateX),
                      rotateY: isMobile ? 0 : (isHovered ? 0 : rotation.rotateY),
                      z: anotherIsHovered ? -60 : 0,
                      zIndex: isHovered ? 10 : 1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    onClick={() => setActiveVideo(project.video)}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setHoveredIndex(index)
                        setHoveredProject(project)
                        const link = document.createElement('link')
                        link.rel = 'preload'
                        link.as = 'video'
                        link.href = project.video
                        document.head.appendChild(link)
                      }
                    }}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cinema-card via-cinema-charcoal to-cinema-card animate-pulse" />
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="relative w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isMobile && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-cinema-black/95 via-cinema-black/70 to-transparent">
                        <h3 className="text-xs sm:text-sm font-bold text-cinema-gold uppercase tracking-wide">
                          {project.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">
                          {project.subtitle}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Remaining videos - tight grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {projects.slice(3).map((project, index) => {
                const globalIndex = index + 3 // Offset by first 3
                const isHovered = hoveredIndex === globalIndex
                const anotherIsHovered = hoveredIndex !== null && hoveredIndex !== globalIndex
                const rotation = tileRotations[globalIndex]

                return (
                  <motion.div
                    key={project.title}
                    variants={staggerItem}
                    className="relative aspect-video cursor-pointer overflow-hidden group"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateX: isMobile ? 0 : (isHovered ? 0 : rotation.rotateX),
                      rotateY: isMobile ? 0 : (isHovered ? 0 : rotation.rotateY),
                      z: anotherIsHovered ? -60 : 0,
                      zIndex: isHovered ? 10 : 1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    onClick={() => setActiveVideo(project.video)}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setHoveredIndex(globalIndex)
                        setHoveredProject(project)
                        const link = document.createElement('link')
                        link.rel = 'preload'
                        link.as = 'video'
                        link.href = project.video
                        document.head.appendChild(link)
                      }
                    }}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cinema-card via-cinema-charcoal to-cinema-card animate-pulse" />
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="relative w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isMobile && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-cinema-black/95 via-cinema-black/70 to-transparent">
                        <h3 className="text-[10px] sm:text-xs font-bold text-cinema-gold uppercase tracking-wide truncate">
                          {project.title}
                        </h3>
                        <p className="text-[8px] sm:text-[10px] text-white/70 truncate">
                          {project.subtitle}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )
              })}

              {/* More to come placeholder */}
              <motion.div
                variants={staggerItem}
                className="relative aspect-video overflow-hidden bg-cinema-card flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateX: isMobile ? 0 : tileRotations[projects.length].rotateX,
                  rotateY: isMobile ? 0 : tileRotations[projects.length].rotateY,
                  z: hoveredIndex !== null ? -60 : 0,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <span className="text-lg md:text-xl lg:text-2xl tracking-widest uppercase font-bold text-cinema-gold">
                  MORE TO COME
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Cursor-following info box (desktop only) */}
        <AnimatePresence>
          {hoveredProject && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y + 20,
              }}
            >
              <div className="bg-cinema-black/90 backdrop-blur-md border border-cinema-gold/30 p-5 max-w-xs">
                <h3 className="text-lg font-bold text-cinema-gold uppercase tracking-wide mb-2">
                  {hoveredProject.title}
                </h3>
                <p className="text-sm text-white/80 tracking-wide mb-2">
                  {hoveredProject.subtitle}
                </p>
                <p className="text-xs text-white/50">
                  {hoveredProject.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <VideoModal
        video={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  )
}
