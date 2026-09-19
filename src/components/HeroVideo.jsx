import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { entranceProps } from '../hooks/useEntrance.js'
import { HAS_VIDEO, HAS_POSTER } from '../content/heroAssets.js'
import './HeroVideo.css'

const PLAYBACK_RATE = 0.4

export default function HeroVideo() {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  // Playback starts from code rather than the autoplay attribute so the
  // prerendered markup is the same for everyone and reduced motion never plays.
  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.playbackRate = PLAYBACK_RATE
    if (reduced) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [reduced])

  if (!HAS_VIDEO || failed) return null

  const anim = entranceProps(reduced, { scale: 1.05, duration: 1.8 })

  return (
    <motion.div className="hero-video" aria-hidden="true" {...anim}>
      <video
        ref={ref}
        className="hero-video__el"
        src="/hero.mp4"
        poster={HAS_POSTER ? '/hero-poster.jpg' : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        onError={() => setFailed(true)}
      />
    </motion.div>
  )
}
