import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../content/projects.js'
import { EASE } from '../hooks/useEntrance.js'
import './Project.css'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  const reduced = useReducedMotion()

  if (!project) return <NotFound />

  const fade = (i) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE },
        }

  const links = Object.entries(project.links || {}).filter(([, href]) => href)
  const linkLabel = { live: 'Live site', repo: 'Repository' }

  return (
    <>
      <Seo title={project.title} description={project.tagline} />
      <article className="project page">
        <motion.div {...fade(0)}>
          <Link to="/work" className="project__back">
            <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
            Back to work
          </Link>
        </motion.div>

        <motion.header className="project__head" {...fade(1)}>
          <h1 className="project__title">{project.title}</h1>
          <p className="project__tagline">{project.tagline}</p>
        </motion.header>

        <motion.dl className="project__meta" {...fade(2)}>
          <div className="project__meta-item">
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="project__meta-item">
            <dt>Timeframe</dt>
            <dd>{project.timeframe}</dd>
          </div>
          <div className="project__meta-item project__meta-item--stack">
            <dt>Stack</dt>
            <dd>
              <ul className="project__stack">
                {project.stack.map((s) => (
                  <li key={s} className="pill">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </motion.dl>

        <div className="project__body">
          {project.sections.map((s, i) => (
            <motion.section key={s.heading} className="project__section" {...fade(3 + i)}>
              <h2 className="project__section-title">{s.heading}</h2>
              {(Array.isArray(s.body) ? s.body : [s.body]).map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </motion.section>
          ))}
        </div>

        {links.length > 0 && (
          <motion.ul className="project__links" aria-label="Project links" {...fade(3 + project.sections.length)}>
            {links.map(([key, href]) => (
              <li key={key}>
                <a href={href} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  {linkLabel[key] || key}
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </article>
    </>
  )
}
