import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../content/projects.js'
import { entranceProps } from '../hooks/useEntrance.js'
import './Project.css'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  const reduced = useReducedMotion()

  if (!project) return <NotFound />

  const fade = (i) => entranceProps(reduced, { y: 14, duration: 0.6, delay: 0.1 + i * 0.08 })

  const links = Object.entries(project.links || {}).filter(([, href]) => href)
  const images = project.images || []
  const stats = project.stats || []
  const linkLabel = { live: 'Live site', repo: 'Repository' }

  return (
    <>
      <Seo />
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
          {stats.length > 0 && (
            <dl className="project__stats">
              {stats.map((s) => (
                <div key={s.label} className="project__stat">
                  <dd>{s.value}</dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
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

        {images.length > 0 && (
          <motion.div className="project__images" {...fade(3 + project.sections.length)}>
            {images.map((img) => (
              <figure key={img.src} className="project__figure">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </motion.div>
        )}

        {links.length > 0 && (
          <motion.ul className="project__links" aria-label="Project links" {...fade(4 + project.sections.length)}>
            {links.map(([key, href]) => (
              <li key={key}>
                <a href={href} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  {linkLabel[key] || key}
                  <span className="visually-hidden"> for {project.title}</span>
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
