import { site, externalLinks } from '../content/site.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__contact">
          <p className="footer__label">Contact</p>
          <a className="footer__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <ul className="footer__links" aria-label="Elsewhere">
          {externalLinks
            .filter((l) => !l.href.startsWith('mailto:'))
            .map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
        </ul>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
