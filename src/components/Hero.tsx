import { useEffect, useRef } from 'react'
import { startHero } from '../hero/render'
import { useReveal } from '../useReveal'
import { ResumeIcon } from './Icons'
import './hero.css'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useReveal<HTMLElement>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    return startHero(canvas)
  }, [])

  return (
    <section className="hero" id="top" ref={sectionRef} data-hero-tilt>
      <canvas ref={canvasRef} className="hero__bg" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="mono-label reveal" style={{ '--reveal-delay': '0.05s' } as React.CSSProperties}>
            Software Engineer
          </p>
          <h1 className="hero__headline grad-text reveal" style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}>
            Praneel
            <br />
            Magapu
          </h1>
          <p className="hero__tagline reveal" style={{ '--reveal-delay': '0.24s' } as React.CSSProperties}>
            Aspiring software engineer focused on solving real-world problems
            and continuous learning.
          </p>
          <p className="hero__sub reveal" style={{ '--reveal-delay': '0.32s' } as React.CSSProperties}>
            Currently doing mesh processing R&amp;D at Align Technology.
            CS at NC State, graduating May 2027.
          </p>
          <div className="hero__cta reveal" style={{ '--reveal-delay': '0.4s' } as React.CSSProperties}>
            <a className="btn btn--primary" href="#projects">
              View projects
            </a>
            <a className="btn btn--ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
              <ResumeIcon size={16} />
              Resume
            </a>
          </div>
          <p className="hero__stack mono-label reveal" style={{ '--reveal-delay': '0.5s' } as React.CSSProperties}>
            C++ / Python / Java / AI &amp; ML
          </p>
        </div>
      </div>

      <p className="hero__caption mono-label">ICP point cloud registration</p>
    </section>
  )
}
