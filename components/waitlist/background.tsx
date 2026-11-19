'use client'

import { useRef, useEffect } from 'react'

export function WaitlistBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string
    }> = []

    const colors = ['#6366f1', '#818cf8', '#4f46e5', '#7c3aed']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#040816]" />

      {/* Aurora layer 1 */}
      <div
        className="aurora-1 absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-20"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #6366f1 0%, #4f46e5 30%, #7c3aed 60%, #6366f1 100%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Aurora layer 2 */}
      <div
        className="aurora-2 absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-15"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #818cf8 0%, #6366f1 40%, #4338ca 70%, #818cf8 100%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Aurora layer 3 — center glow */}
      <div
        className="aurora-3 absolute top-1/3 left-1/3 w-1/2 h-1/2 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Grid overlay */}
      <div className="grid-overlay absolute inset-0 opacity-100" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #040816 100%)',
        }}
      />
    </div>
  )
}
