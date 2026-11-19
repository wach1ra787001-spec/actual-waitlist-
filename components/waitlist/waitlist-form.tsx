'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { INITIAL_FORM_DATA, type WaitlistFormData } from '@/lib/types'
import { StepIndicator } from './step-indicator'
import { Step1, Step2, Step3, Step4, Step5, StepNavigation } from './form-steps'
import { LoadingScreen, SuccessScreen } from './submission-screens'

const TOTAL_STEPS = 5

type FormState = 'form' | 'loading' | 'success' | 'error'

function canProceedStep(step: number, data: WaitlistFormData): boolean {
  switch (step) {
    case 1: return data.full_name.trim().length >= 2
    case 2: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    case 3: return true
    case 4: return true
    case 5: return true
    default: return false
  }
}

const STEP_TITLES = [
  { title: "Let's get to know you", sub: 'Tell us a bit about yourself' },
  { title: 'How can we reach you?', sub: "We'll send updates to your inbox" },
  { title: 'Tell us about your trading', sub: 'Help us personalize your experience' },
  { title: 'Your journaling habits', sub: "We'll tailor the app to your needs" },
  { title: 'One last thing', sub: "You're almost in!" },
]

export function WaitlistForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<WaitlistFormData>(INITIAL_FORM_DATA)
  const [formState, setFormState] = useState<FormState>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [position, setPosition] = useState(1)

  const updateData = (updates: Partial<WaitlistFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const goNext = async () => {
    if (!canProceedStep(step, formData)) return

    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep((s) => s + 1)
      return
    }

    // Submit
    setFormState('loading')
    setIsSubmitting(true)
    setError(null)

    // Minimum loading duration for UX
    const [res] = await Promise.all([
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }),
      new Promise((r) => setTimeout(r, 3000)),
    ])

    const json = await res.json()

    if (!res.ok) {
      setIsSubmitting(false)
      setFormState('error')
      setError(json.error ?? 'Something went wrong. Please try again.')
      return
    }

    setIsSubmitting(false)
    setPosition(json.position ?? 1)
    setFormState('success')
  }

  const goBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const stepProps = { data: formData, onChange: updateData, direction }
  const currentStepInfo = STEP_TITLES[step - 1]

  return (
    <div className="relative z-10 w-full max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl border border-indigo-500/20 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-indigo-500/10"
        style={{ backgroundColor: 'rgba(7, 13, 36, 0.85)' }}
      >
        <AnimatePresence mode="wait">
          {formState === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingScreen />
            </motion.div>
          )}

          {formState === 'success' && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SuccessScreen position={position} name={formData.preferred_name || formData.full_name} />
            </motion.div>
          )}

          {(formState === 'form' || formState === 'error') && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-[59px] pr-[50px] py-6 md:py-8">
              <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{currentStepInfo.title}</h2>
                <p className="text-slate-400 text-sm">{currentStepInfo.sub}</p>
              </div>

              {step === 1 && <Step1 {...stepProps} />}
              {step === 2 && <Step2 {...stepProps} />}
              {step === 3 && <Step3 {...stepProps} />}
              {step === 4 && <Step4 {...stepProps} />}
              {step === 5 && <Step5 {...stepProps} />}

              {formState === 'error' && error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <StepNavigation
                step={step}
                totalSteps={TOTAL_STEPS}
                onBack={goBack}
                onNext={goNext}
                isSubmitting={isSubmitting}
                canProceed={canProceedStep(step, formData)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
