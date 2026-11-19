'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, CircleCheck, ArrowRight, RotateCcw } from 'lucide-react'

const NOTES = 'Waited for the retest of the 5m OB before entering. Sized down after two red days — felt disciplined, not rushed.'

export function JournalDemo() {
  const [strategy, setStrategy] = useState('Select a strategy or playbook')
  const [emotion, setEmotion] = useState('Select emotion')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const play = useCallback(() => {
    clearTimers()
    setStrategy('Select a strategy or playbook')
    setEmotion('Select emotion')
    setNotes('')
    setSaved(false)
    setToast(false)
    const later = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms))
    }
    later(500, () => setStrategy('Order Block Reversal'))
    later(1200, () => setEmotion('Calm / Confident'))
    later(1900, () => {
      NOTES.split('').forEach((_, i) => later(i * 26, () => setNotes(NOTES.slice(0, i + 1))))
    })
    const readyAt = 1900 + NOTES.length * 26 + 300
    later(readyAt + 900, () => setSaved(true))
    later(readyAt + 1300, () => setToast(true))
    later(readyAt + 5200, () => setToast(false))
    later(readyAt + 6400, play)
  }, [clearTimers])

  useEffect(() => {
    play()
    return clearTimers
  }, [play, clearTimers])

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Live product moment</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">You journal it. JNV remembers it.</h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-slate-400">Log the trade behind the trade — then get the receipt the moment it&apos;s saved.</p>
        </div>

        <div className={`relative rounded-3xl border p-5 shadow-2xl transition-all sm:p-7 ${saved ? 'border-emerald-400/40 shadow-emerald-950/30' : 'border-slate-700/70 shadow-slate-950/30'}`}>
          <div className="mb-5 text-sm font-bold text-white">Strategy &amp; Notes</div>
          <Field label="Strategy" value={strategy} filled={strategy !== 'Select a strategy or playbook'} />
          <Field label="Emotion Before Trade" value={emotion} filled={emotion !== 'Select emotion'} />
          <div className="mb-4">
            <label className="mb-2 block text-xs font-medium text-slate-400">Notes</label>
            <div className="min-h-24 rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm leading-6 text-slate-200">
              {notes}<span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-indigo-400 align-middle" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition ${notes ? 'opacity-100 shadow-lg shadow-indigo-500/25' : 'scale-95 opacity-40'}`}>
              {saved ? <Check className="size-4" /> : <ArrowRight className="size-4" />}{saved ? 'Saved' : 'Save Trade'}
            </button>
          </div>
          <div className={`pointer-events-none absolute -right-2 top-0 w-[min(290px,calc(100%-2rem))] translate-y-[-2.4rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl transition-all ${toast ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="flex gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50"><CircleCheck className="size-4 text-emerald-500" /></div><div><p className="text-sm font-bold text-slate-900">Trade Journaled</p><p className="mt-1 text-xs leading-5 text-slate-500">AAPL · Long · Closed +2.3R. Notes and emotion tag saved.</p><p className="mt-1 text-[11px] text-slate-400">Just now</p></div></div>
          </div>
        </div>
        <button type="button" onClick={play} className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-400 transition hover:border-indigo-400 hover:text-indigo-300"><RotateCcw className="size-3" /> Replay animation</button>
      </div>
    </section>
  )
}

function Field({ label, value, filled }: { label: string; value: string; filled: boolean }) {
  return <div className="mb-4"><label className="mb-2 block text-xs font-medium text-slate-400">{label}</label><div className={`flex items-center justify-between rounded-xl border px-3 py-3 text-sm transition ${filled ? 'border-blue-400/50 bg-blue-400/10 text-slate-100' : 'border-slate-700 bg-slate-950/30 text-slate-500'}`}><span>{value}</span><ChevronDown className="size-4 opacity-50" /></div></div>
}
