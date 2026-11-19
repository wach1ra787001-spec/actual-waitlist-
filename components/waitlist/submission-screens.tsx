'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { TYPEWRITER_MESSAGES } from '@/lib/types'

// Loading screen with typewriter
export function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const msg = TYPEWRITER_MESSAGES[msgIndex]
    if (charIndex < msg.length) {
      const t = setTimeout(() => {
        setDisplayed(msg.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      if (msgIndex < TYPEWRITER_MESSAGES.length - 1) {
        const t = setTimeout(() => {
          setMsgIndex((i) => i + 1)
          setCharIndex(0)
          setDisplayed('')
        }, 700)
        return () => clearTimeout(t)
      }
    }
  }, [charIndex, msgIndex])

  const progress = ((msgIndex) / (TYPEWRITER_MESSAGES.length - 1)) * 100

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-indigo-400/50 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* Typewriter */}
      <div className="h-8 flex items-center justify-center mb-6">
        <p className="text-indigo-300 text-lg font-medium font-mono text-center">
          {displayed}
          <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 animate-pulse" />
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-indigo-500/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

// Success screen
export function SuccessScreen({ position, name }: { position: number; name: string }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }

    setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#6366f1', '#818cf8', '#ffffff'] })
      fire(0.2, { spread: 60, colors: ['#6366f1', '#a5b4fc', '#4f46e5'] })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#818cf8', '#6366f1', '#ffffff'] })
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#6366f1'] })
      fire(0.1, { spread: 120, startVelocity: 45, colors: ['#a5b4fc', '#6366f1'] })
    }, 200)
  }, [])

  const firstName = name.split(' ')[0]

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center py-10 px-4"
    >
      {/* Animated checkmark */}
      <div className="relative w-20 h-20 mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M6 16L13 23L26 9"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full opacity-40 animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)', filter: 'blur(12px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Welcome aboard, {firstName}!
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          You&apos;re officially on the JNV Pro waitlist. We&apos;ll be in touch soon.
        </p>
      </motion.div>

      {/* Position badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 mb-8"
      >
        <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Your Position</span>
        <span
          className="text-5xl font-bold text-white font-mono"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          #{position}
        </span>
        <span className="text-indigo-300 text-xs">Founding Member</span>
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-xs space-y-3 text-left"
      >
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider text-center mb-4">What happens next</p>
        {[
          { step: '01', text: 'Check your inbox for a confirmation email' },
          { step: '02', text: 'Early access invites go out to founding members first' },
          { step: '03', text: 'You get lifetime founding member pricing' },
        ].map(({ step, text }) => (
          <div key={step} className="flex items-start gap-3">
            <span
              className="text-xs font-bold text-indigo-400 font-mono mt-0.5 flex-shrink-0"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {step}
            </span>
            <span className="text-slate-400 text-sm">{text}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
