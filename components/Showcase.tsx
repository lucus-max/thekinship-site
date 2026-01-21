'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { scrollReveal, spring, staggerContainer, staggerItem } from '@/lib/motion'

const projects = [
  {
    title: 'VFX SHOWREEL',
    subtitle: '25 Years of Craft',
    description: 'A foundation of creative direction, VFX supervision, compositing and design across commercials and branded content.',
    category: 'Legacy Work',
    image: '/media/vfx-showreel.png',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/Showreel_2025_Exported.mp4',
  },
  {
    title: 'AI LAUNCH FILM',
    subtitle: 'The Future, Rendered Locally',
    description: 'We are still cavemen in this new age. A short piece generated locally at 2K resolution using ethical, open-source AI models.',
    category: 'Generative AI',
    image: '/media/ai-film.png',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/ai-film.mp4',
  },
  {
    title: 'NISSAN CAMPAIGN',
    subtitle: 'From Still to Motion',
    description: 'A complete workflow demonstration: starting from a single product image, employing the latest AI and ML tools to deliver full video content.',
    category: 'Brand Work',
    image: '/media/nissan-bg.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/nissan.mp4',
  },
  {
    title: 'VOLVO ES90',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/volvo-es90.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/volvo-es90.mp4',
  },
  {
    title: 'NISSAN THE DROP',
    subtitle: 'Shoot Director, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/nissan-the-drop.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/nissan-the-drop.mp4',
  },
  {
    title: 'DELIVEROO THE ULTIMATE GIFT',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/deliveroo-ultimate-gift.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/deliveroo-ultimate-gift.mp4',
  },
  {
    title: 'LEGOLAND MYTHICA',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/legoland-mythica.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/legoland-mythica.mp4',
  },
  {
    title: 'EE GAMER',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/ee-gamer.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/ee-gamer.mp4',
  },
  {
    title: 'STORMZY TOXIC TRAIT',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/stormzy-toxic-trait.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/stormzy-toxic-trait.mp4',
  },
  {
    title: 'LEGO TITAN',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/lego-titan.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/lego-titan.mp4',
  },
  {
    title: 'SKY F1 TITLES',
    subtitle: 'VFX Supervision, co-Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/sky-f1-2023.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/sky-f1-2023.mp4',
  },
  {
    title: 'GOOGLE PIXEL',
    subtitle: 'VFX Supervision, Creative Direction',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/google-pixel.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/google-pixel.mp4',
  },
  {
    title: 'LIONS SERIES TITLES',
    subtitle: 'Lead Comp',
    description: 'Coffee & TV',
    category: 'Brand Work',
    image: '/media/lions-series-2021.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/lions-series-2021.mp4',
  },
  {
    title: 'SEAT IDENTS',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/seat-idents.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/seat-idents.mp4',
  },
  {
    title: 'THREE PHONES ARE GOOD',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/three-phones-are-good.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/three-phones-are-good.mp4',
  },
  {
    title: 'CADBURYS FINGERS',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/cadburys-fingers.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/cadburys-fingers.mp4',
  },
  {
    title: 'NIKE KDI',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time based Arts',
    category: 'Brand Work',
    image: '/media/nike-kdi.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/nike-kdi.mp4',
  },
  {
    title: 'VW GTE',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time based Arts',
    category: 'Brand Work',
    image: '/media/vw-gte.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/vw-gte.mp4',
  },
  {
    title: 'THREE MAKE IT RIGHT',
    subtitle: 'VFX Supervision, Lead Comp',
    description: 'Time Based Arts',
    category: 'Brand Work',
    image: '/media/three-make-it-right.jpg',
    video: 'https://pub-5b43fd3787f84e3da4a241819cb889ab.r2.dev/video/three-make-it-right.mp4',
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

      // Try to play unmuted, fallback to muted if browser blocks
      vid.play().then(() => {
        setIsMuted(false)
      }).catch(() => {
        // Autoplay with sound was blocked, try muted
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
          {/* Close button */}
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

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={spring}
            className="relative w-full max-w-[95vw] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading spinner */}
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

            {/* Click to unmute overlay */}
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

            {/* Custom minimal controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cinema-black/80 to-transparent"
            >
              <div className="flex items-center gap-4">
                {/* Mute/Unmute */}
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

                {/* Progress bar */}
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

                {/* Fullscreen */}
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

function ProjectCard({ project, index, onPlayVideo }: { project: typeof projects[0], index: number, onPlayVideo: (video: string) => void }) {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group relative"
    >
      {/* Thumbnail container */}
      <div
        ref={containerRef}
        className="relative z-20 aspect-[16/9] overflow-hidden border border-white/10 bg-cinema-card cursor-none"
        onClick={() => onPlayVideo(project.video)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovering(true)
          // Preload video on hover
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'video'
          link.href = project.video
          document.head.appendChild(link)
        }}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Shimmer placeholder effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-card via-cinema-charcoal to-cinema-card animate-pulse" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Grain overlay for media */}
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Cursor-following View label - outside overflow container */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none z-30"
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
          x: mousePos.x - 24,
          y: mousePos.y - 12,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.15 },
          x: { type: "spring", stiffness: 500, damping: 30 },
          y: { type: "spring", stiffness: 500, damping: 30 }
        }}
      >
        <span className="px-3 py-1.5 bg-cinema-gold text-cinema-black text-xs tracking-widest uppercase font-bold whitespace-nowrap">
          View
        </span>
      </motion.div>

      <div className="mt-6 space-y-3">
        {/* Title: tracking-wide, uppercase, bold */}
        <h3 className="text-2xl lg:text-3xl tracking-wide uppercase font-bold text-white group-hover:text-cinema-gold transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm tracking-wide uppercase text-white/60">
          {project.subtitle}
        </p>

        {/* Body: generous leading */}
        <p className="text-base text-cinema-silver/80 leading-relaxed pt-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <>
      <section id="work" className="relative z-10 py-32 lg:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            ref={ref}
            variants={scrollReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-20"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-12 h-px bg-cinema-gold" />
              <span className="text-xs tracking-widest uppercase text-cinema-gold">Featured Work</span>
            </div>
            {/* Header: tracking-wide, uppercase, bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase font-bold text-white max-w-4xl leading-tight whitespace-nowrap">
              <span className="text-cinema-gold">CRAFTING</span> VISUAL STORIES
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onPlayVideo={setActiveVideo}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <VideoModal
        video={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  )
}
