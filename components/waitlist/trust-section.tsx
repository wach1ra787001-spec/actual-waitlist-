'use client'

import { motion } from 'framer-motion'

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export function TrustSection() {
  return (
    <section className="relative z-10 w-full py-16 md:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative group"
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Card */}
          <div className="relative rounded-3xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 transition-all duration-300 group-hover:border-indigo-500/30">

            {/* Label */}
            <motion.p
              {...FADE_UP}
              className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-5"
            >
              Why Trust Us
            </motion.p>

            {/* Headline */}
            <motion.h2
              {...FADE_UP}
              className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight text-balance mb-6"
            >
              Built by a Trader.{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}
              >
                Designed for Traders.
              </span>
            </motion.h2>

            {/* Divider */}
            <div className="w-12 h-px bg-indigo-500/40 mb-6" />

            {/* Body paragraphs */}
            <div className="space-y-4">
              <motion.p
                {...FADE_UP}
                className="text-slate-400 text-base leading-relaxed"
              >
                JNV wasn&apos;t created to become another trading journal filled with charts and statistics. It was built around a simple belief: the biggest obstacle to consistent profitability isn&apos;t a lack of data — it&apos;s repeatedly making the same mistakes without recognizing them.
              </motion.p>
              <motion.p
                {...FADE_UP}
                className="text-slate-400 text-base leading-relaxed"
              >
                Every feature is designed to help traders reflect, stay accountable, and continuously improve through deliberate review.
              </motion.p>
            </div>


          </div>
        </motion.div>
      </div>
    </section>
  )
}
