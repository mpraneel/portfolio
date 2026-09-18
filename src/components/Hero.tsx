import { useEffect, useRef } from 'react'
import { startHero } from '../hero/render'
import { ResumeIcon } from './Icons'
import './hero.css'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    return startHero(canvas)
  }, [])

  return (
    <section className="hero" id="top" data-hero-tilt>
      <canvas ref={canvasRef} className="hero__bg" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="mono-label">Software Engineer</p>
          <h1 className="hero__headline accent-text">
            Praneel
            <br />
            Magapu
          </h1>
          <p className="hero__tagline">Building software across systems and intelligence.</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              View projects
            </a>
            <a className="btn btn--ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
              <ResumeIcon size={16} />
              Resume
            </a>
          </div>
          <p className="hero__stack mono-label">C++ / Python / Java / AI &amp; ML</p>
        </div>
      </div>

      <p className="hero__caption mono-label">ICP point cloud registration</p>
    </section>
  )
}
