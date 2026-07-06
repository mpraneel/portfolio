import { useEffect, useRef, useState } from 'react'
import { GitHubIcon, LinkedInIcon, MoonIcon, ResumeIcon, SunIcon } from './Icons'
import './nav.css'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export default function Nav() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  // Thin gradient bar under the nav tracks scroll progress
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        const p = max > 0 ? doc.scrollTop / max : 0
        progressRef.current?.style.setProperty('transform', `scaleX(${p})`)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode, fine to skip persistence */
    }
  }, [theme])

  // Close the mobile menu when a link is chosen or on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label="Praneel Magapu, back to top">
          <span className="nav__brand-mark" aria-hidden="true" />
          pm
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Site sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="nav__icon"
            href="https://github.com/mpraneel"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            className="nav__icon"
            href="https://linkedin.com/in/praneel-magapu"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            className="nav__icon"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume PDF"
            title="Resume"
          >
            <ResumeIcon />
          </a>
          <button
            className="nav__icon nav__theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="nav__burger"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`nav__burger-bar ${open ? 'is-x1' : ''}`} />
            <span className={`nav__burger-bar ${open ? 'is-x2' : ''}`} />
          </button>
        </div>
      </div>
      <div className="nav__progress" ref={progressRef} aria-hidden="true" />
    </header>
  )
}
