import { motion, useReducedMotion } from 'motion/react'
import Seo from '../components/Seo.jsx'
import { site, externalLinks } from '../content/site.js'
import { EASE } from '../hooks/useEntrance.js'
import './About.css'

const facts = [
  {
    group: 'Education',
    rows: [
      { label: 'Degree', value: "Bachelor's, double major in Business Analytics & AI and Supply Chain Analytics" },
      { label: 'School', value: 'UT Dallas, accelerated program' },
      { label: 'GPA', value: '3.8' },
      { label: 'Graduating', value: 'December 2027' },
    ],
  },
  {
    group: 'Current roles',
    rows: [
      { label: 'Analyst', value: 'KPMG Digital Lighthouse' },
      { label: 'Founder', value: 'Setpiece (Summer 2026)' },
      { label: 'Technical co-founder', value: 'TailTech' },
    ],
  },
  {
    group: 'Skills',
    rows: [
      { label: 'AI & agents', value: 'Claude API, multi-agent pipelines, prompt engineering across models, RAG, structured output enforcement' },
      { label: 'Data', value: 'Python (Pandas, NumPy), SQL, Tableau, SAP S/4HANA, Monte Carlo simulation' },
      { label: 'Web', value: 'Next.js, TypeScript, React, Tailwind, Supabase, Laravel, Flutter, Git, Vercel' },
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
      <Seo title="About" description="About Arnav Gokhle — Business Analytics & AI and Supply Chain Analytics at UT Dallas. Analyst at KPMG Digital Lighthouse, founder of Setpiece, technical co-founder at TailTech." />
      <section className="about page">
        <motion.h1 className="page-title" {...fade(0)}>
          About
        </motion.h1>

        <motion.div className="about__bio" {...fade(1)}>
          <p>
            I study Business Analytics & AI and Supply Chain Analytics at UT Dallas,
            graduating December 2027. Most of what I know about building software I
            learned outside of class, because every project on this site started as
            a problem someone actually had.
          </p>
          <p>
            Setpiece exists because DFS picks are sold with confidence nobody has
            earned, so I built an engine that shows its reasoning and stays quiet
            when the data is thin. TailTech exists because small pet care businesses
            in India were being asked to choose between a spreadsheet and enterprise
            pricing. The KPMG work is the same
            instinct applied to enterprise data: the interesting part wasn't
            generating rules, it was making the system adapt to a new client without
            a code change.
          </p>
          <p>
            Before this I captained a Division 1 cricket side for four years and ran
            a kitchen as head chef, which is where I learned that shipping on time is
            a skill separate from being right.
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
