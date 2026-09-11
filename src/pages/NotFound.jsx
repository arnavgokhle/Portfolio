import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Not found" description="This page does not exist." />
      <section className="container page">
        <h1 className="page-title">Not found</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          There's nothing at this address.
        </p>
        <Link to="/" className="btn btn--primary">
          Go home
        </Link>
      </section>
    </>
  )
}
