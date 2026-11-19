'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

const userMessage = 'Highlight my trading mistakes this month'
const aiIntro = "Here's what stood out in August:"
const aiPoints = [
  'Stop-loss moved on 4 trades after entry — mostly on NAS100.',
  'Oversized risk on Tuesdays — averaging 2.3x your normal size.',
  'Revenge entries within 10 min of a loss, 6 times this month.',
]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function AICoachDemo() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; points?: string[] }[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let cancelled = false
    const runLoop = async () => {
      while (!cancelled) {
        setMessages([])
        setInput('')
        await sleep(900)
        for (const character of userMessage) {
          if (cancelled) return
          setInput((value) => value + character)
          await sleep(28)
        }
        await sleep(400)
        setSending(true)
        await sleep(160)
        setSending(false)
        setInput('')
        setMessages([{ role: 'user', text: userMessage }])
        await sleep(500)
        setTyping(true)
        await sleep(1400)
        setTyping(false)
        setMessages((current) => [...current, { role: 'ai', text: aiIntro }])
        await sleep(650)
        setMessages((current) => [...current, { role: 'ai', text: 'Three patterns are costing you the most:', points: aiPoints }])
        await sleep(4400)
      }
    }
    runLoop()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="relative z-10 w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">JnV AI in action</p>
          <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">Your trading data, turned into <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}>better decisions.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-slate-400">Ask JnV AI what your journal is trying to tell you. It finds patterns you may miss and turns them into a clear next step.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto max-w-2xl rounded-3xl border border-indigo-500/20 bg-[#fbfff1] p-4 shadow-2xl shadow-indigo-950/20 md:p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-13 w-13 items-center justify-center rounded-2xl border border-[#d2dcef] bg-[#e7eded] p-3"><Sparkles className="h-6 w-6 text-[#3d52d5] animate-pulse" /></div>
            <h3 className="text-lg font-bold text-[#1f2430]">JnV AI Coach</h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-[#6b7280]">Your personal trading coach. Ask anything about psychology, risk, consistency, or journal review.</p>
          </div>

          <div className="flex min-h-[280px] flex-col gap-3 px-1 py-5">
            {messages.map((message, index) => (
              <motion.div key={`${message.role}-${index}-${message.text}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }} className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'user' ? 'self-end rounded-br-sm bg-gradient-to-br from-[#3d52d5] to-[#9ea8ea] text-white' : 'self-start rounded-bl-sm border border-[#d2dcef] bg-white text-[#1f2430]'}`}>
                <span>{message.text}</span>
                {message.points && <ul className="mt-2 list-disc space-y-1 pl-5">{message.points.map((point) => <li key={point}><span>{point}</span></li>)}</ul>}
              </motion.div>
            ))}
            {typing && <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm border border-[#d2dcef] bg-white px-4 py-3"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9ea8ea]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9ea8ea] [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9ea8ea] [animation-delay:300ms]" /></div>}
          </div>

          <div className="flex items-center gap-3 border-t border-[#d2dcef] pt-4">
            <div className="flex min-h-11 flex-1 items-center rounded-full border border-[#b4c5e4] bg-white px-4 text-sm text-[#1f2430]"><span className={input ? '' : 'text-[#9aa3b2]'}>{input || 'Ask JnV AI anything about your trading...'}</span>{input && <span className="ml-0.5 h-4 w-px animate-pulse bg-[#3d52d5]" />}</div>
            <motion.div animate={{ scale: sending ? 1.15 : 1 }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3d52d5] to-[#9ea8ea]"><Send className="h-4 w-4 text-white" /></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
