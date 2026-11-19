'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEP_LABELS = ['You', 'Contact', 'Trading', 'Journal', 'Almost Done']

export function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center gap-0">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1
          const isDone = stepNum < currentStep
          const isActive = stepNum === currentStep

          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor: isDone ? '#6366f1' : isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                    borderColor: isDone ? '#6366f1' : isActive ? '#6366f1' : 'rgba(99,102,241,0.2)',
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <span
                      className={`text-xs font-bold ${
                        isActive ? 'text-indigo-300' : 'text-slate-500'
                      }`}
                    >
                      {stepNum}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isActive ? 'text-indigo-300' : isDone ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {STEP_LABELS[i]}
                </span>
              </div>

              {i < totalSteps - 1 && (
                <div className="w-8 md:w-12 h-px mx-2 mb-5 relative overflow-hidden bg-indigo-500/15 rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
