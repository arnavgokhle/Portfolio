import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// The hero video and poster are optional. Their presence is resolved at build
// time so the page never requests a missing file (no 404s, no console noise).
const hasHeroVideo = existsSync(resolve(import.meta.dirname, 'public/hero.mp4'))
const hasHeroPoster = existsSync(resolve(import.meta.dirname, 'public/hero-poster.jpg'))

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_HERO_VIDEO__: JSON.stringify(hasHeroVideo),
    __HAS_HERO_POSTER__: JSON.stringify(hasHeroPoster),
  },
})
