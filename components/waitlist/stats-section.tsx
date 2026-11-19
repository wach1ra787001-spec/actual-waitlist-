'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/hooks/use-motion-config'

const STAGGER_CONTAINER = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const FADE_UP = {
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: MOTION.SLOW, ease: EASE } },
}

const STATS = [
  { value: '5,000+', label: 'Trades Tracked' },
  { value: '500+', label: 'Members already inside' },
]

export function StatsSection() {
  return (
    <div className="relative z-10 w-full py-16 md:py-24 px-4">
      <motion.div variants={STAGGER_CONTAINER} initial="initial" animate="animate" className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={FADE_UP} className="text-center">
            <div
              className="text-3xl md:text-4xl font-bold text-white font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
