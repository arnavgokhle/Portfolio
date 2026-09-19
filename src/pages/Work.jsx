import { useReducedMotion } from 'motion/react'
import Seo from '../components/Seo.jsx'
import ProjectRow from '../components/ProjectRow.jsx'
import { projects } from '../content/projects.js'
import './Work.css'

export default function Work() {
  const reduced = useReducedMotion()
  return (
    <>
      <Seo />
      <section className="container page work">
        <h1 className="page-title">Work</h1>
        <ul className="work__list">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} reduced={reduced} />
          ))}
        </ul>
      </section>
    </>
  )
}
