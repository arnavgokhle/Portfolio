import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, SITE_URL } from '../content/seo.js'
import { site } from '../content/site.js'

const LD_ID = 'seo-jsonld'

// React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>.
// JSON-LD is a <script>, which React does not hoist, so it is managed by hand.
// The same data is also written into static HTML at build time (vite.config.js).
export default function Seo({ notFound = false }) {
  const { pathname } = useLocation()
  const seo = getSeo(notFound ? '/__not-found__' : pathname)
  const json = seo.jsonLd ? JSON.stringify(seo.jsonLd) : null

  useEffect(() => {
    document.getElementById(LD_ID)?.remove()
    if (!json) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = LD_ID
    el.textContent = json
    document.head.appendChild(el)
    return () => el.remove()
  }, [json])

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.noindex && <meta name="robots" content="noindex" />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      {seo.canonical && <meta property="og:url" content={seo.canonical} />}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:image" content={`${SITE_URL}/hero-poster.jpg`} />
    </>
  )
}
