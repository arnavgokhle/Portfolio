import { useReducedMotion } from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1]

// Builds motion props for an entrance animation.
//
// Pages are prerendered, so the HTML already carries the animation's start state
// (opacity 0). Reduced motion therefore cannot simply skip the animation, or the
// content would stay invisible. Instead it runs the same animation with zero
// duration: identical markup on server and client, and the content appears at once.
export function entranceProps(reduced, { y = 0, scale, delay = 0, duration = 0.8 } = {}) {
  const from = { opacity: 0, y }
  const to = { opacity: 1, y: 0 }
  if (scale !== undefined) {
    from.scale = scale
    to.scale = 1
  }
  return {
    initial: from,
    animate: to,
    transition: reduced ? { duration: 0 } : { duration, delay, ease: EASE },
  }
}

export function useEntrance() {
  const reduced = useReducedMotion()
  return (options) => entranceProps(reduced, options)
}
