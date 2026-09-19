import { defineConfig, build } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { getSeo, headTags, allRoutes, canonicalFor } from './src/content/seo.js'

const root = import.meta.dirname

// The hero video and poster are optional. Their presence is resolved at build
// time so the page never requests a missing file (no 404s, no console noise).
const define = {
  __HAS_HERO_VIDEO__: JSON.stringify(existsSync(resolve(root, 'public/hero.mp4'))),
  __HAS_HERO_POSTER__: JSON.stringify(existsSync(resolve(root, 'public/hero-poster.jpg'))),
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headHtml(route) {
  return headTags(getSeo(route))
    .map(({ tag, attrs, text }) => {
      const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
      if (tag === 'script') return `<script data-seo${a}>${text}</script>`
      if (tag === 'title') return `<title data-seo>${esc(text)}</title>`
      return `<${tag} data-seo${a} />`
    })
    .join('\n    ')
}

// Static prerender. After the client bundle is written this:
//   1. bundles src/entry-server.jsx for Node,
//   2. renders every route from allRoutes() to an HTML string with React,
//   3. writes one HTML file per route with that route's <head> and full <body>,
//   4. writes 404.html and sitemap.xml.
// The browser then hydrates the markup. There is no server at runtime.
function prerender() {
  let outDir = resolve(root, 'dist')
  let isSsrBuild = false
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      isSsrBuild = Boolean(config.build.ssr)
    },
    async closeBundle() {
      if (isSsrBuild) return

      const tmp = resolve(root, '.prerender')
      await build({
        configFile: false,
        root,
        logLevel: 'warn',
        plugins: [react()],
        define,
        build: { ssr: 'src/entry-server.jsx', outDir: tmp, emptyOutDir: true, copyPublicDir: false },
      })
      const { render } = await import(pathToFileURL(resolve(tmp, 'entry-server.js')).href)

      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const marker = /<!--seo-static-->[\s\S]*?<!--\/seo-static-->/
      const mount = '<div id="root"></div>'
      if (!marker.test(template) || !template.includes(mount)) {
        throw new Error('prerender: index.html is missing the head marker or the #root mount')
      }
      const page = (route) =>
        template.replace(marker, headHtml(route)).replace(mount, `<div id="root">${render(route)}</div>`)

      for (const route of allRoutes()) {
        const target = resolve(outDir, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`)
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, page(route))
      }

      // Unknown paths get a real HTTP 404 from the host, which serves this file.
      writeFileSync(resolve(outDir, '404.html'), page('/__not-found__'))

      const urls = allRoutes().map((r) => `  <url><loc>${esc(canonicalFor(r))}</loc></url>`).join('\n')
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )

      rmSync(tmp, { recursive: true, force: true })
      console.log(`prerendered ${allRoutes().length} routes + 404.html`)
    },
  }
}

export default defineConfig({
  plugins: [react(), prerender()],
  define,
})
