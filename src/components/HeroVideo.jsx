import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../hooks/useEntrance.js'
import { HAS_VIDEO, HAS_POSTER } from '../content/heroAssets.js'

const PLAYBACK_RATE = 0.25
import './HeroVideo.css'

export default function HeroVideo() {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = PLAYBACK_RATE
  }, [])

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
        ref={ref}
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
