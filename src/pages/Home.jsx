import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Seo from '../components/Seo.jsx'
import HeroVideo from '../components/HeroVideo.jsx'
import { site } from '../content/site.js'
import { useEntrance } from '../hooks/useEntrance.js'
import './Home.css'

export default function Home() {
  const entrance = useEntrance()

  return (
    <>
      <Seo description="Arnav Gokhle — Business Analytics & AI at UT Dallas. I build AI agents, data products, and full-stack software, and ship them." />
      <section className="hero">
        <HeroVideo />

        {/* Spacer keeps the bottom block pinned with space-between. */}
        <div className="hero__top" aria-hidden="true" />

        <motion.div className="hero__bottom" {...entrance({ y: 20, delay: 0.5, duration: 1.0 })}>
          <div className="hero__left">
            <motion.p className="hero__subtitle" {...entrance({ y: 16, delay: 0.6 })}>
              <span className="hero__dot" aria-hidden="true" />
              {site.tagline}
            </motion.p>

            <motion.h1 className="hero__heading" {...entrance({ y: 20, delay: 0.8 })}>
              I build things
              <br />
              and ship them.
            </motion.h1>

            <motion.div className="hero__actions" {...entrance({ y: 16, delay: 1.0 })}>
              <Link to="/work" className="btn btn--primary">
                See Work
              </Link>
              <Link to="/about" className="btn btn--ghost">
                About Me
              </Link>
            </motion.div>
          </div>

          <ul className="hero__tags" aria-label="Areas of work">
            {site.tags.map((t) => (
              <li key={t} className="pill">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  )
}
