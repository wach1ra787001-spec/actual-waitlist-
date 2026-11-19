'use client'

import { useReducedMotion } from 'framer-motion'

export const MOTION = {
  FAST: 0.15,
  STANDARD: 0.25,
  SLOW: 0.5,
  SPRING: { type: 'spring', stiffness: 300, damping: 30 },
  SPRING_GENTLE: { type: 'spring', stiffness: 200, damping: 25 },
} as const

export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion()

  return {
    prefersReducedMotion: !!prefersReducedMotion,
    duration: (base: number) => (prefersReducedMotion ? 0 : base),
    fadeUp: {
      initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24, filter: 'blur(8px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: prefersReducedMotion ? 0 : -12, filter: 'blur(4px)' },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: prefersReducedMotion ? 0 : 32 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: prefersReducedMotion ? 0 : -32 },
    },
    slideLeft: {
      initial: { opacity: 0, x: prefersReducedMotion ? 0 : -32 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: prefersReducedMotion ? 0 : 32 },
    },
  }
}
