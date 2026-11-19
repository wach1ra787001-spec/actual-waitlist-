'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const CARDS = []

function FloatingCard({
  card,
}: {
  card: (typeof CARDS)[0]
}) {
  const Icon = card.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: card.delay + 0.6, duration: 0.5, ease: 'easeOut' }}
      className={`${card.className} absolute z-20`}
    >
      <div className="flex items-center gap-3 px-4 py-3 border border-indigo-500/20 bg-navy-800/80 backdrop-blur-xl shadow-2xl whitespace-nowrap"
        style={{ backgroundColor: 'rgba(7, 13, 36, 0.85)' }}
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">{card.label}</div>
          <div className="text-white font-bold text-sm font-mono">{card.value}</div>
          <div className="text-xs text-emerald-400">{card.sub}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative z-10 w-full max-w-sm mx-auto h-48 mb-8"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      {/* JOIN NOW Button */}
      <Link href="/waitlist/form" className="absolute inset-x-8 inset-y-0 flex items-center justify-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/60 transition-shadow duration-300 border border-indigo-400/30"
        >
          Reserve Your Spot
        </motion.button>
      </Link>

      {CARDS.map((card) => (
        <FloatingCard key={card.label} card={card} />
      ))}
    </motion.div>
  )
}
