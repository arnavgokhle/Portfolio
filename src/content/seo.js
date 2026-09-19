// Single source of truth for per-route SEO. Used at runtime by <Seo /> and at
// build time by the static-head plugin in vite.config.js, so keep this file
// free of browser-only or React imports.
import { site } from './site.js'
import { projects } from './projects.js'

// Canonical origin. The apex domain 308-redirects to www, so www is canonical.
export const SITE_URL = 'https://www.arnavgokhle.com'
export const PERSON_ID = `${SITE_URL}/#person`

// Share card shown in link previews. Source: scripts/og-card.html.
export const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: 'Arnav Gokhle. Business Analytics & AI at UT Dallas. I build software people use.',
}

// Meta descriptions, 150-160 characters each. A project without an entry here
// falls back to its tagline, so adding a project still means adding one object.
const projectDescriptions = {
  tailtech:
    'How Arnav Gokhle built TailTech, a white-label SaaS for pet care businesses in India, from a self-serve onboarding wizard to one runtime-branded Flutter app.',
  'data-quality-agent':
    'Arnav Gokhle on building an AI data-quality agent for enterprise master data, and the schema design that lets it adapt to a new client with no code change.',
  setpiece:
    'Setpiece is an AI player-prop picks platform Arnav Gokhle founded. Its engine shows the reasoning behind every pick and stays quiet when the data is thin.',
  'orders-system':
    'Arnav Gokhle replaced a cafe’s Instagram DM orders with an automated chain: order in, confirmation out, tracking sheet updated, and no dashboard to learn.',
  'freelance-web':
    'Arnav Gokhle designed and shipped config-driven websites for two Bangalore cafes, handling everything from cold outreach and pricing to QA before launch.',
}

const pages = {
  '/': {
    title: site.name,
    description:
      'Arnav Gokhle studies Business Analytics & AI at UT Dallas and builds software people actually use, from AI agents to a SaaS platform. See the work here.',
  },
  '/work': {
    title: `Work — ${site.name}`,
    description:
      'Projects by Arnav Gokhle: a white-label SaaS platform, an enterprise AI data-quality agent, an AI picks product, and ordering systems for small businesses.',
  },
  '/about': {
    title: `About — ${site.name}`,
    description:
      'About Arnav Gokhle: Business Analytics & AI and Supply Chain Analytics student at UT Dallas, KPMG analyst, and technical co-founder. Open for summer 2027.',
  },
}

function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    url: SITE_URL,
    sameAs: [site.linkedin, site.github],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'The University of Texas at Dallas',
    },
    jobTitle: 'Student and software builder',
  }
}

function projectJsonLd(project, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url,
    author: { '@type': 'Person', '@id': PERSON_ID, name: site.name, url: SITE_URL },
  }
}

function normalize(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

export function canonicalFor(pathname) {
  const p = normalize(pathname)
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`
}

// Returns { title, description, canonical, jsonLd, noindex } for a pathname.
export function getSeo(pathname) {
  const path = normalize(pathname)
  const canonical = canonicalFor(path)

  if (pages[path]) {
    return {
      ...pages[path],
      canonical,
      jsonLd: path === '/' ? personJsonLd() : null,
      noindex: false,
    }
  }

  const match = path.match(/^\/work\/([^/]+)$/)
  const project = match && projects.find((p) => p.slug === match[1])
  if (project) {
    const description = projectDescriptions[project.slug] || project.tagline
    return {
      title: `${project.title} — ${site.name}`,
      description,
      canonical,
      jsonLd: projectJsonLd(project, description, canonical),
      noindex: false,
    }
  }

  return {
    title: `Not found — ${site.name}`,
    description: 'This page does not exist.',
    canonical: null,
    jsonLd: null,
    noindex: true,
  }
}

// Every indexable route, in sitemap order.
export function allRoutes() {
  return ['/', '/work', '/about', ...projects.map((p) => `/work/${p.slug}`)]
}

// The full list of managed <head> tags for a route, as plain data. The build
// serialises this into static HTML; <Seo /> applies the same list in the browser
// on client-side navigation. Every managed tag carries a data-seo attribute.
export function headTags(seo) {
  const tags = [
    { tag: 'title', attrs: {}, text: seo.title },
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
  ]
  if (seo.noindex) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
  if (seo.canonical) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } })
  }
  tags.push(
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE.url } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: String(OG_IMAGE.width) } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: String(OG_IMAGE.height) } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: OG_IMAGE.alt } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE.url } },
    { tag: 'meta', attrs: { name: 'twitter:image:alt', content: OG_IMAGE.alt } },
  )
  if (seo.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // "<" is escaped so the JSON can never close the script element early.
      text: JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c'),
    })
  }
  return tags
}
