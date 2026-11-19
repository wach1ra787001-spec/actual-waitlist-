'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import type { WaitlistFormData } from '@/lib/types'
import {
  TRADING_EXPERIENCE_OPTIONS,
  TRADING_PLATFORMS,
  MARKETS,
  JOURNALING_GOALS,
  HEARD_ABOUT_OPTIONS,
} from '@/lib/types'

interface StepProps {
  data: WaitlistFormData
  onChange: (updates: Partial<WaitlistFormData>) => void
  direction: number
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const SLIDE = {
  initial: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40, filter: 'blur(6px)' }),
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.3, ease: EASE } },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, filter: 'blur(6px)', transition: { duration: 0.2 } }),
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {children}
      {required && <span className="text-indigo-400 ml-1">*</span>}
    </label>
  )
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border border-indigo-500/20 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 text-sm ${className}`}
    />
  )
}

function SelectChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
        selected
          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
          : 'border-indigo-500/20 bg-white/5 text-slate-400 hover:border-indigo-500/40 hover:text-slate-300'
      }`}
    >
      {selected && <Check className="inline w-3 h-3 mr-1.5 -mt-0.5" />}
      {label}
    </button>
  )
}

// Step 1 — Personal Info
export function Step1({ data, onChange, direction }: StepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key="step1" custom={direction} variants={SLIDE} initial="initial" animate="animate" exit="exit" className="space-y-5">
        <div>
          <Label required>Full Name</Label>
          <Input
            type="text"
            placeholder="John Doe"
            value={data.full_name}
            onChange={(e) => onChange({ full_name: e.target.value })}
            autoFocus
          />
        </div>
        <div>
          <Label>Preferred Name <span className="text-slate-500 text-xs font-normal">(optional)</span></Label>
          <Input
            type="text"
            placeholder="What should we call you?"
            value={data.preferred_name}
            onChange={(e) => onChange({ preferred_name: e.target.value })}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Step 2 — Contact
export function Step2({ data, onChange, direction }: StepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key="step2" custom={direction} variants={SLIDE} initial="initial" animate="animate" exit="exit" className="space-y-5">
        <div>
          <Label required>Email Address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            autoFocus
          />
        </div>
        <div>
          <Label>Phone Number <span className="text-slate-500 text-xs font-normal">(optional)</span></Label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone_number}
            onChange={(e) => onChange({ phone_number: e.target.value })}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Step 3 — Trading Info
export function Step3({ data, onChange, direction }: StepProps) {
  const toggleMarket = (market: string) => {
    const current = data.markets
    onChange({
      markets: current.includes(market)
        ? current.filter((m) => m !== market)
        : [...current, market],
    })
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key="step3" custom={direction} variants={SLIDE} initial="initial" animate="animate" exit="exit" className="space-y-5">
        <div>
          <Label>Trading Experience</Label>
          <div className="flex flex-wrap gap-2">
            {TRADING_EXPERIENCE_OPTIONS.map((opt) => (
              <SelectChip
                key={opt.value}
                label={opt.label}
                selected={data.trading_experience === opt.value}
                onClick={() => onChange({ trading_experience: opt.value })}
              />
            ))}
          </div>
        </div>
        <div>
          <Label>Primary Platform</Label>
          <div className="flex flex-wrap gap-2">
            {TRADING_PLATFORMS.map((p) => (
              <SelectChip
                key={p}
                label={p}
                selected={data.trading_platform === p}
                onClick={() => onChange({ trading_platform: p, custom_platform: '' })}
              />
            ))}
          </div>
          {data.trading_platform === 'Other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <Input
                type="text"
                placeholder="Enter your trading platform..."
                value={data.custom_platform}
                onChange={(e) => onChange({ custom_platform: e.target.value })}
                autoFocus
              />
            </motion.div>
          )}
        </div>
        <div>
          <Label>Markets You Trade <span className="text-slate-500 text-xs font-normal">(select all that apply)</span></Label>
          <div className="flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <SelectChip
                key={m}
                label={m}
                selected={data.markets.includes(m)}
                onClick={() => toggleMarket(m)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Step 4 — Journaling Habits
export function Step4({ data, onChange, direction }: StepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key="step4" custom={direction} variants={SLIDE} initial="initial" animate="animate" exit="exit" className="space-y-5">
        <div>
          <Label>Do you currently journal your trades?</Label>
          <div className="flex gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onChange({ does_journal: opt.value })}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  data.does_journal === opt.value
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                    : 'border-indigo-500/20 bg-white/5 text-slate-400 hover:border-indigo-500/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {data.does_journal === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <Label>How long have you been journaling?</Label>
              <div className="flex flex-wrap gap-2">
                {['Less than a month', '1–6 months', '6–12 months', '1–2 years', '2+ years'].map((d) => (
                  <SelectChip
                    key={d}
                    label={d}
                    selected={data.journal_duration === d}
                    onClick={() => onChange({ journal_duration: d })}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <Label>What is your biggest journaling goal?</Label>
          <div className="space-y-2">
            {JOURNALING_GOALS.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => onChange({ journaling_goal: goal })}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                  data.journaling_goal === goal
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200'
                    : 'border-indigo-500/20 bg-white/5 text-slate-400 hover:border-indigo-500/40 hover:text-slate-300'
                }`}
              >
                {data.journaling_goal === goal && <Check className="inline w-3.5 h-3.5 mr-2 -mt-0.5 text-indigo-400" />}
                {goal}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Step 5 — Discovery
export function Step5({ data, onChange, direction }: StepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div key="step5" custom={direction} variants={SLIDE} initial="initial" animate="animate" exit="exit" className="space-y-5">
        <div>
          <Label>How did you hear about JNV Pro?</Label>
          <div className="flex flex-wrap gap-2">
            {HEARD_ABOUT_OPTIONS.map((opt) => (
              <SelectChip
                key={opt}
                label={opt}
                selected={data.heard_about_us === opt}
                onClick={() => onChange({ heard_about_us: opt })}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
          <p className="text-slate-400 text-sm leading-relaxed">
            By joining the waitlist you agree to receive updates about JNV Pro.
            We respect your privacy and will never share your information.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Navigation buttons
export function StepNavigation({
  step,
  totalSteps,
  onBack,
  onNext,
  isSubmitting,
  canProceed,
}: {
  step: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  isSubmitting: boolean
  canProceed: boolean
}) {
  const isLast = step === totalSteps

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-indigo-500/10">
      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-500/20 text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </>
        ) : isLast ? (
          <>
            <Check className="w-4 h-4" />
            Join the Waitlist
          </>
        ) : (
          <>
            Continue
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  )
}
