import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { externalLinks } from '../content/site.js'
import { EASE } from '../hooks/useEntrance.js'
import './MenuOverlay.css'

const internalLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
]

export default function MenuOverlay({ open, onClose }) {
  const reduced = useReducedMotion()
  const firstLink = useRef(null)
  const returnTo = useRef(null)

  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // Let the panel mount before moving focus into it.
    const id = requestAnimationFrame(() => firstLink.current?.focus())

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(id)
      document.body.style.overflow = prevOverflow
      returnTo.current?.focus?.()
    }
  }, [open, onClose])

  const anim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 12 },
        transition: { duration: 0.5, ease: EASE },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={(e) => {
            // Any click on empty overlay space closes the menu; links and
            // buttons handle themselves.
            if (!e.target.closest('a, button')) onClose()
          }}
          {...anim}
        >
          <div className="menu__panel">
            <div className="menu__top">
              <span className="menu__eyebrow">Menu</span>
              <button
                type="button"
                className="menu__close"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            <ul className="menu__primary">
              {internalLinks.map((l, i) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    ref={i === 0 ? firstLink : undefined}
                    className="menu__link"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="menu__secondary">
              {externalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="menu__ext"
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={l.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
