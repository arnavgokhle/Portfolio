import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { entranceProps } from '../hooks/useEntrance.js'
import './ProjectRow.css'

export default function ProjectRow({ project, index, reduced }) {
  const anim = entranceProps(reduced, { y: 16, duration: 0.6, delay: index * 0.06 })

  const thumb = project.images?.[0]

  return (
    <motion.li className="row-wrap" {...anim}>
      <Link to={`/work/${project.slug}`} className="row">
        {/* Decorative: the link already carries the title, so alt is empty. The
            empty variant keeps titles aligned on rows without an image. */}
        {thumb ? (
          <img
            className="row__thumb"
            src={thumb.src}
            alt=""
            width={thumb.width}
            height={thumb.height}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="row__thumb row__thumb--empty" aria-hidden="true" />
        )}
        <h2 className="row__title">{project.title}</h2>
        <div className="row__meta">
          <p className="row__tagline">{project.tagline}</p>
          <ul className="row__stack" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="pill">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.li>
  )
}
