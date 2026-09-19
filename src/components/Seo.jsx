import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, headTags } from '../content/seo.js'

// Each route's <head> is written into static HTML at build time (see
// vite.config.js), so the first load is already correct. This component keeps
// the head in sync on client-side navigation by replacing the managed tags.
// It renders nothing, which keeps server and client markup identical.
export default function Seo({ notFound = false }) {
  const { pathname } = useLocation()
  const path = notFound ? '/__not-found__' : pathname

  useEffect(() => {
    const head = document.head
    head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    for (const { tag, attrs, text } of headTags(getSeo(path))) {
      const el = document.createElement(tag)
      el.setAttribute('data-seo', '')
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
      if (text) el.textContent = tag === 'script' ? text.replace(/\\u003c/g, '<') : text
      head.appendChild(el)
    }
  }, [path])

  return null
}
