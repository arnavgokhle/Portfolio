import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { EASE } from '../hooks/useEntrance.js'
import './ProjectRow.css'

export default function ProjectRow({ project, index, reduced }) {
  const anim = reduced
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: index * 0.06, ease: EASE },
      }

  return (
    <motion.li className="row-wrap" {...anim}>
      <Link to={`/work/${project.slug}`} className="row">
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
