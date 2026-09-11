import { motion, useReducedMotion } from 'motion/react'
import Seo from '../components/Seo.jsx'
import { site, externalLinks } from '../content/site.js'
import { EASE } from '../hooks/useEntrance.js'
import './About.css'

// TODO: replace placeholder details (degree, dates, skills) before going live.
const facts = [
  {
    group: 'Education',
    rows: [
      { label: 'Degree', value: 'M.S. Business Analytics & AI, UT Dallas' },
      { label: 'Concentration', value: 'Supply Chain' },
      { label: 'Expected', value: '2027' },
    ],
  },
  {
    group: 'Current roles',
    rows: [
      { label: 'Founder', value: 'Setpiece — AI player-prop picks for the 2026 World Cup' },
      { label: 'Contributor', value: 'TailTech — white-label SaaS for pet care businesses' },
      { label: 'Freelance', value: 'Web development for F&B businesses' },
    ],
  },
  {
    group: 'Skills',
    rows: [
      { label: 'AI & agents', value: 'LLM tooling, multi-agent pipelines, evaluation' },
      { label: 'Data', value: 'Python, SQL, analytics, forecasting' },
      { label: 'Web', value: 'React, Next.js, TypeScript, Laravel, Livewire' },
    ],
  },
]

export default function About() {
  const reduced = useReducedMotion()
  const fade = (i) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE },
        }

  return (
    <>
      <Seo title="About" description="About Arnav Gokhle — Business Analytics & AI graduate student at UT Dallas building AI agents, data products, and full-stack software." />
      <section className="about page">
        <motion.h1 className="page-title" {...fade(0)}>
          About
        </motion.h1>

        <motion.div className="about__bio" {...fade(1)}>
          <p>
            I'm Arnav, a graduate student in Business Analytics & AI at UT Dallas
            with a focus on supply chain. I like problems that sit between data and
            product: figuring out what a model should say, then building the thing
            that says it.
          </p>
          <p>
            Outside coursework I run Setpiece, contribute to TailTech, and take on
            freelance web work. I'm looking for an internship for summer 2027.
          </p>
        </motion.div>

        {facts.map((f, i) => (
          <motion.section key={f.group} className="about__group" {...fade(2 + i)}>
            <h2 className="about__group-title">{f.group}</h2>
            <dl className="about__list">
              {f.rows.map((r) => (
                <div key={r.label} className="about__row">
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </motion.section>
        ))}

        <motion.section className="about__contact" {...fade(2 + facts.length)}>
          <h2 className="about__group-title">Contact</h2>
          <ul className="about__links">
            {externalLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="btn btn--ghost"
                  target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={l.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  {l.label === 'Email' ? site.email : l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.section>
      </section>
    </>
  )
}
