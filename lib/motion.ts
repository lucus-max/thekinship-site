// Motion variants following the VFX Manual
// Spring physics with weight: stiffness: 100, damping: 20, mass: 1

export const spring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
}

export const springFast = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  mass: 0.8,
}

export const springSlower = {
  type: 'spring' as const,
  stiffness: 80,
  damping: 25,
  mass: 1.2,
}

// Letter stagger for headlines - serif thin strokes with y-offset blur
export const letterStagger = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)'
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.03,
      ...spring,
    },
  }),
}

// Clip-path reveal - sliding up from hidden container
export const clipReveal = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: spring,
  },
}

// Fade up with blur
export const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: spring,
  },
}

// Fade in with scale (for page transitions)
export const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3 },
  },
}

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger item
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: spring,
  },
}

// Nav slide down
export const navSlide = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...spring,
      delay: 0.2,
    },
  },
}

// Scroll-triggered reveal
export const scrollReveal = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSlower,
  },
}
