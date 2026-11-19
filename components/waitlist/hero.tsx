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

export function WaitlistHero() {
  return (
    <div className="relative z-10 text-center px-4 pt-2 pb-0 md:pt-2 md:pb-0">
      <motion.div variants={STAGGER_CONTAINER} initial="initial" animate="animate">
        {/* Headline */}
        <motion.h1
          variants={FADE_UP}
          className="text-4xl md:text-6xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your broker tracks your trades.
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}
          >
            jnv tracks the trader behind them
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={FADE_UP}
          className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty mb-10"
        >
          Create an accountability loop
        </motion.p>


      </motion.div>
    </div>
  )
}
