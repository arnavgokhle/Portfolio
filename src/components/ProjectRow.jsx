import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { entranceProps } from '../hooks/useEntrance.js'
import './ProjectRow.css'

export default function ProjectRow({ project, index, reduced }) {
  const anim = entranceProps(reduced, { y: 16, duration: 0.6, delay: index * 0.06 })

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
