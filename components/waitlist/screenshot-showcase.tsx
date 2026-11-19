'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    id: 'ai-coach',
    title: 'AI Coach',
    tagline: 'Review every trade with personalized AI feedback.',
    description:
      'Your personal trading mentor that reviews your trades, identifies recurring psychological patterns, and gives actionable feedback to help you grow.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4tZECemVeEg9cp99dXPmYRG5Qh8iBR.png',
    imageAlt: 'JNV AI Coach — personal trading coach chat interface',
  },
  {
    id: 'broker-import',
    title: 'Broker & Import',
    tagline: 'Import trades automatically from your broker in seconds.',
    description:
      'Connect MT4, MT5, cTrader, TradingView, and more. Your trades sync automatically so you spend less time on data entry and more time improving.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MwF7m6Wk44Siyi21oSV6QCpw7ZkGMF.png',
    imageAlt: 'JNV Broker & Import — connect MetaTrader, cTrader and more',
  },
  {
    id: 'notes',
    title: 'Notes',
    tagline: 'Capture the reasoning behind every decision before it\'s forgotten.',
    description:
      'The best note-taking experience in the industry. Journal your thoughts, emotions, and reasoning on every trade to build self-awareness over time.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OqmNjkJzFp2HqmLrJbfxbG188uncsV.png',
    imageAlt: 'JNV Notes — trade journaling and note-taking interface',
  },
]

export function ScreenshotShowcase() {
  const [activeId, setActiveId] = useState<string>('ai-coach')

  return (
    <section className="relative z-10 w-full py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            See JNV in Action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Designed to help you improve,{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}
            >
              not just record.
            </span>
          </h2>
        </motion.div>

        {/* Desktop: Expanding panels */}
        <div className="hidden md:flex gap-3 h-[480px]">
          {FEATURES.map((feature) => {
            const isActive = activeId === feature.id
            return (
              <motion.div
                key={feature.id}
                layout
                animate={{ flex: isActive ? 3 : 0.6 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onMouseEnter={() => setActiveId(feature.id)}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-indigo-500/20 group"
                style={{ minWidth: 0 }}
              >
                {/* Screenshot */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.img
                    src={feature.image}
                    alt={feature.imageAlt}
                    animate={{ scale: isActive ? 1.03 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-400"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(7,8,20,0.97) 0%, rgba(7,8,20,0.5) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(7,8,20,0.98) 0%, rgba(7,8,20,0.75) 60%, rgba(7,8,20,0.3) 100%)',
                    }}
                  />
                  {/* Active glow border */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl border border-indigo-500/50 pointer-events-none" />
                  )}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                  {/* Title — always visible */}
                  <motion.h3
                    animate={{ fontSize: isActive ? '1.25rem' : '0.95rem' }}
                    transition={{ duration: 0.3 }}
                    className="font-bold text-white whitespace-nowrap overflow-hidden"
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Tagline + description — only when active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex flex-col gap-1.5"
                    >
                      <p className="text-indigo-300 text-sm font-medium leading-snug">
                        {feature.tagline}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-1 text-indigo-400 text-xs font-semibold mt-1">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Collapsed: vertical title */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-slate-500 text-xs font-semibold tracking-widest uppercase select-none"
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                    >
                      {feature.title}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: Stacked cards */}
        <div className="flex md:hidden flex-col gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-indigo-500/20 h-64"
            >
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(7,8,20,0.97) 0%, rgba(7,8,20,0.5) 55%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                <p className="text-indigo-300 text-sm font-medium">{feature.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
