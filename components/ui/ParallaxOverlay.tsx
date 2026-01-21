'use client'

import { useEffect, useRef, useState } from 'react'

const SEED = 42

function seededRandom(s: number) {
  const x = Math.sin(s * 9999) * 10000
  return x - Math.floor(x)
}

// Generate stars on sphere using fibonacci spiral
function generateStars(count: number) {
  const stars: { x: number; y: number; z: number; size: number }[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    stars.push({
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
      size: 1 + seededRandom(SEED + i) * 2,
    })
  }
  return stars
}

// Generate connections between nearby stars
function generateConnections(stars: { x: number; y: number; z: number; size: number }[]) {
  const connections: { from: number; to: number }[] = []
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x
      const dy = stars[i].y - stars[j].y
      const dz = stars[i].z - stars[j].z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < 0.35 && seededRandom(SEED + i * 1000 + j) > 0.6) {
        connections.push({ from: i, to: j })
      }
    }
  }
  return connections
}

export default function ParallaxOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const starsRef = useRef<{ x: number; y: number; z: number; size: number }[]>([])
  const connectionsRef = useRef<{ from: number; to: number }[]>([])
  const stateRef = useRef({
    targetX: 0.5,
    targetY: 0.5,
    smoothX: 0.5,
    smoothY: 0.5,
    velocityX: 0,
    velocityY: 0,
    autoRot: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Detect mobile and set star count accordingly
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    const starCount = isMobile ? 150 : 300
    starsRef.current = generateStars(starCount)
    connectionsRef.current = generateConnections(starsRef.current)

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let lastTime = performance.now()
    const state = stateRef.current

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      // Smooth interpolation
      state.smoothX += (state.targetX - state.smoothX) * 0.015
      state.smoothY += (state.targetY - state.smoothY) * 0.015

      // Auto rotation with velocity
      state.autoRot += delta * 0.03 + state.velocityX * delta * 0.3

      // Decay velocity
      state.velocityX *= 0.995
      state.velocityY *= 0.995

      // Calculate rotation
      const rotX = (state.smoothY - 0.5) * Math.PI * 0.25
      const rotY = (state.smoothX - 0.5) * Math.PI * 0.3 + state.autoRot

      // Pre-calculate trig
      const cosRotX = Math.cos(rotX)
      const sinRotX = Math.sin(rotX)
      const cosRotY = Math.cos(rotY)
      const sinRotY = Math.sin(rotY)

      const width = window.innerWidth
      const height = window.innerHeight
      const centerX = width / 2
      const centerY = height / 2
      const scale = Math.min(width, height) * 0.78

      // Clear
      ctx.clearRect(0, 0, width, height)

      const stars = starsRef.current
      const connections = connectionsRef.current

      // Project all stars once
      const projected = stars.map(star => {
        let x = star.x * cosRotY - star.z * sinRotY
        let z = star.x * sinRotY + star.z * cosRotY
        const y = star.y * cosRotX - z * sinRotX
        z = star.y * sinRotX + z * cosRotX
        const depth = (z + 1) / 2
        return {
          x: centerX + x * scale,
          y: centerY + y * scale,
          depth,
          size: star.size * (0.5 + depth * 0.8),
        }
      })

      // Calculate vignette - stronger at edges
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
      const getEdgeBoost = (px: number, py: number) => {
        const dx = px - centerX
        const dy = py - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const normalizedDist = dist / maxDist
        // Opacity boost from 0.4 at center to 1.0 at edges
        // Size boost from 1.0 at center to 1.3 at edges (30% larger)
        return {
          opacity: 0.4 + normalizedDist * 0.6,
          size: 1.0 + normalizedDist * 0.3
        }
      }

      // Draw connections
      ctx.strokeStyle = '#D4AF37'
      for (const conn of connections) {
        const from = projected[conn.from]
        const to = projected[conn.to]
        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2
        const edgeBoost = getEdgeBoost(midX, midY)
        const opacity = Math.min(from.depth, to.depth) * 0.5 * edgeBoost.opacity
        if (opacity > 0.05) {
          ctx.globalAlpha = opacity
          ctx.lineWidth = 0.5 * edgeBoost.size
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.stroke()
        }
      }

      // Draw stars
      ctx.fillStyle = '#D4AF37'
      for (const p of projected) {
        const edgeBoost = getEdgeBoost(p.x, p.y)
        ctx.globalAlpha = (0.3 + p.depth * 0.7) * edgeBoost.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * edgeBoost.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      state.velocityX = (x - state.targetX) * 3
      state.velocityY = (y - state.targetY) * 3
      state.targetX = x
      state.targetY = y
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Touch event handlers for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const x = touch.clientX / window.innerWidth
        const y = touch.clientY / window.innerHeight
        state.velocityX = (x - state.targetX) * 3
        state.velocityY = (y - state.targetY) * 3
        state.targetX = x
        state.targetY = y
      }
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        state.targetX = touch.clientX / window.innerWidth
        state.targetY = touch.clientY / window.innerHeight
      }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  )
}
