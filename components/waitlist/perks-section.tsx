'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const MENU_SECTIONS = [
  {
    title: 'Improve Your Trading',
    items: ['AI Coach', 'Trade Reviews', 'Mistake Detection'],
  },
  {
    title: 'Accountability',
    items: ['Save Time', 'MT5 Import', 'cTrader Import', 'CSV Import', 'Automatic Sync'],
  },
  {
    title: 'Build Consistency',
    items: ['Psychology Journal', 'Performance Reviews', 'Follow-up Emails', 'Habit Tracking'],
  },
]

const STAGGER_CONTAINER = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const FADE_UP = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } },
}

export function PerksSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <div className="relative z-10 w-full py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Card with glow on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative group"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Card */}
          <div className="relative rounded-3xl border border-indigo-500/20 bg-navy-800/40 backdrop-blur-xl p-8 md:p-12 shadow-xl transition-all duration-300 group-hover:border-indigo-500/40 group-hover:bg-navy-800/60">
            {/* Header */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
            >
              What You Get
            </motion.h2>

            {/* Menu Sections */}
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {MENU_SECTIONS.map((section, index) => (
                <motion.div key={index} variants={FADE_UP}>
                  {/* Section Header - Expandable */}
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all duration-300 group/header"
                  >
                    <h3 className="text-lg font-semibold text-white text-left">{section.title}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-indigo-400 transition-transform duration-300 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Section Items */}
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-2 space-y-2 pl-4 border-l-2 border-indigo-500/30"
                    >
                      {section.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex items-start gap-3 py-2"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="flex items-center justify-center h-4 w-4 rounded-full bg-indigo-600/40 border border-indigo-500/60">
                              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            </div>
                          </div>
                          <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
