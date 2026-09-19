import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

// Static per-route head tags exist for crawlers that do not run JS. Once the
// app boots, <Seo /> owns the head, so remove them to avoid duplicates.
document.head.querySelectorAll('[data-seo-static]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
