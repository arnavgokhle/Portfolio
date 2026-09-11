import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../hooks/useEntrance.js'
import './HeroVideo.css'

// Build-time flags from vite.config.js. If public/hero.mp4 is absent the
// component renders nothing, so the hero falls back to a plain white page.
const HAS_VIDEO = typeof __HAS_HERO_VIDEO__ !== 'undefined' && __HAS_HERO_VIDEO__
const HAS_POSTER = typeof __HAS_HERO_POSTER__ !== 'undefined' && __HAS_HERO_POSTER__

export default function HeroVideo() {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)

  if (!HAS_VIDEO || failed) return null

  const anim = reduced
    ? { initial: false }
    : {
        initial: { opacity: 0, scale: 1.05 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.8, ease: EASE },
      }

  return (
    <motion.div className="hero-video" aria-hidden="true" {...anim}>
      <video
        className="hero-video__el"
        src="/hero.mp4"
        poster={HAS_POSTER ? '/hero-poster.jpg' : undefined}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload={reduced ? 'metadata' : 'auto'}
        tabIndex={-1}
        onError={() => setFailed(true)}
      />
    </motion.div>
  )
}
