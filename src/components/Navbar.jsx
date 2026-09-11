import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import Logo from './Logo.jsx'
import MenuOverlay from './MenuOverlay.jsx'
import { site } from '../content/site.js'
import { useEntrance } from '../hooks/useEntrance.js'
import './Navbar.css'

function GridIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <circle cx="2.5" cy="2.5" r="1.5" fill="#fff" />
      <circle cx="7.5" cy="2.5" r="1.5" fill="#fff" />
      <circle cx="2.5" cy="7.5" r="1.5" fill="#fff" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="#fff" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const entrance = useEntrance()

  return (
    <>
      <motion.nav className="nav" aria-label="Primary" {...entrance({ y: -16, duration: 0.8 })}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label={`${site.name} — home`}>
            <Logo />
            <span className="nav__brand-text">{site.name}</span>
          </Link>

          <div className="nav__center">
            <button
              type="button"
              className="nav__menu"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span className="nav__menu-dot">
                <Plus size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="nav__menu-label">Menu</span>
            </button>

            <div className="nav__tags" aria-label="Focus areas">
              {site.focus.map((t) => (
                <span key={t} className="nav__tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="nav__avail"
            onClick={() => navigate('/about')}
            aria-label={`${site.availability}. Go to about page.`}
          >
            <span className="nav__avail-dot">
              <GridIcon />
            </span>
            <span className="nav__avail-label">{site.availability}</span>
          </button>
        </div>
      </motion.nav>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
