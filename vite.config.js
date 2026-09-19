import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { getSeo, allRoutes, canonicalFor } from './src/content/seo.js'

// The hero video and poster are optional. Their presence is resolved at build
// time so the page never requests a missing file (no 404s, no console noise).
const hasHeroVideo = existsSync(resolve(import.meta.dirname, 'public/hero.mp4'))
const hasHeroPoster = existsSync(resolve(import.meta.dirname, 'public/hero-poster.jpg'))

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headFor(route) {
  const seo = getSeo(route)
  const a = 'data-seo-static'
  const tags = [
    `<title ${a}>${esc(seo.title)}</title>`,
    `<meta ${a} name="description" content="${esc(seo.description)}" />`,
    `<link ${a} rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta ${a} property="og:url" content="${esc(seo.canonical)}" />`,
    `<meta ${a} property="og:title" content="${esc(seo.title)}" />`,
    `<meta ${a} property="og:description" content="${esc(seo.description)}" />`,
    `<meta ${a} property="og:type" content="website" />`,
    `<meta ${a} property="og:site_name" content="Arnav Gokhle" />`,
    `<meta ${a} property="og:image" content="${esc(canonicalFor('/hero-poster.jpg'))}" />`,
  ]
  if (seo.jsonLd) {
    // "<" is escaped so the JSON can never close the script element early.
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')
    tags.push(`<script ${a} type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

// After the bundle is written, emit one HTML file per route with that route's
// title, description, canonical and JSON-LD in the static <head>, plus a
// sitemap. The <body> is still client-rendered; this only covers the head.
function staticSeo() {
  let outDir = 'dist'
  return {
    name: 'static-seo',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const marker = /<!--seo-static-->[\s\S]*?<!--\/seo-static-->/
      if (!marker.test(template)) throw new Error('static-seo: marker missing from index.html')

      for (const route of allRoutes()) {
        const file = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
        const target = resolve(outDir, file)
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, template.replace(marker, headFor(route)))
      }

      // Unknown paths get a real HTTP 404 from the host, which serves this file.
      // The app still boots in it and renders the NotFound page.
      const nf = getSeo('/__not-found__')
      const nfHead = [
        `<title data-seo-static>${esc(nf.title)}</title>`,
        `<meta data-seo-static name="robots" content="noindex" />`,
      ].join('\n    ')
      writeFileSync(resolve(outDir, '404.html'), template.replace(marker, nfHead))

      const urls = allRoutes()
        .map((r) => `  <url><loc>${esc(canonicalFor(r))}</loc></url>`)
        .join('\n')
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), staticSeo()],
  define: {
    __HAS_HERO_VIDEO__: JSON.stringify(hasHeroVideo),
    __HAS_HERO_POSTER__: JSON.stringify(hasHeroPoster),
  },
})
