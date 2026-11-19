'use client'

import { motion } from 'framer-motion'

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
}

const PILLARS = [
  {
    title: 'Understand Your Decisions',
    body: 'Every trade begins before you enter the market. Capture your reasoning, confidence, emotions, and execution to understand what separates your best trades from your worst.',
  },
  {
    title: 'Eliminate Costly Habits',
    body: 'Whether it\'s revenge trading, FOMO, overtrading, or breaking your own rules, recurring mistakes quietly destroy performance. You will recognize those patterns before they become expensive.',
  },
  {
    title: 'Build Lasting Discipline',
    body: 'Consistency isn\'t created by motivation—it\'s created through honest review, accountability, and deliberate practice. JNV helps you turn every trade into an opportunity to become a better trader.',
  },
]

export function WhyJNV() {
  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16">
      {/* Label */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={FADE_UP}
        className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4 text-center"
      >
        Why JNV Journal Exists
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={1}
        variants={FADE_UP}
        className="text-white text-2xl md:text-3xl font-bold text-center text-balance mb-6 leading-snug"
      >
        More Than a Trading Journal.{' '}
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}
        >
          A Better Way to Improve.
        </span>
      </motion.h2>

      {/* Intro paragraph */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={2}
        variants={FADE_UP}
        className="text-slate-400 text-base md:text-lg leading-relaxed text-center text-pretty mb-12"
      >
        Most trading journals tell you what happened. They show your win rate, PnL, and statistics—but they rarely explain why you keep repeating the same mistakes.
        {' '}JNV was built on a different belief: great traders aren&apos;t defined by the trades they take, but by the decisions they make. Every feature is designed to help you reflect on your thinking, identify costly habits, strengthen your discipline, and continuously improve with every trading session. Because long-term consistency isn&apos;t built from numbers alone—it&apos;s built from better decisions.
      </motion.p>

      {/* Three pillars */}
      <div className="flex flex-col gap-6 mb-12">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={i + 3}
            variants={FADE_UP}
            className="border border-indigo-500/15 rounded-2xl px-6 py-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-colors duration-300"
          >
            <h3 className="text-white font-semibold text-base mb-2">{pillar.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{pillar.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Closing statement */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={6}
        variants={FADE_UP}
        className="text-center text-slate-300 text-base md:text-lg italic font-medium leading-relaxed"
      >
        Because the goal isn&apos;t to build a better trading journal.{' '}
        <span className="text-white not-italic font-semibold">It&apos;s to build a better trader.</span>
      </motion.p>
    </section>
  )
}
