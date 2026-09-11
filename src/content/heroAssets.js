// Build-time flags from vite.config.js. If public/hero.mp4 is absent the hero
// renders as plain white and nothing requests the file.
export const HAS_VIDEO = typeof __HAS_HERO_VIDEO__ !== 'undefined' && __HAS_HERO_VIDEO__
export const HAS_POSTER = typeof __HAS_HERO_POSTER__ !== 'undefined' && __HAS_HERO_POSTER__
