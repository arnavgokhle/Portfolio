import { site } from '../content/site.js'

// React 19 hoists <title> and <meta> rendered anywhere into <head>.
export default function Seo({ title, description }) {
  const full = title ? `${title} — ${site.name}` : site.name
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
    </>
  )
}
