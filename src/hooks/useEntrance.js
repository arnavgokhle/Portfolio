import { useReducedMotion } from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1]

// Returns a helper that builds motion props for an entrance animation.
// When the user prefers reduced motion, entrances are skipped entirely.
export function useEntrance() {
  const reduced = useReducedMotion()
  return function entrance({ y = 0, scale, delay = 0, duration = 0.8 } = {}) {
    if (reduced) return { initial: false }
    const from = { opacity: 0, y }
    const to = { opacity: 1, y: 0 }
    if (scale !== undefined) {
      from.scale = scale
      to.scale = 1
    }
    return {
      initial: from,
      animate: to,
      transition: { duration, delay, ease: EASE },
    }
  }
}
