import { useReveal } from '../useReveal'
import './about.css'

const FACTS = [
  { value: '5', label: 'Public projects on GitHub' },
  { value: '4', label: 'Roles across industry and research' },
  { value: 'May 2027', label: 'CS degree, NC State' },
]

export default function About() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <p className="mono-label reveal">01 &middot; About</p>
        <h2 className="about__heading reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
          Substance over <span className="grad-text">hype.</span>
        </h2>

        <div className="about__grid">
          <div className="about__text reveal reveal--left" style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}>
            <p>
              I write software where performance is part of the spec. My interests sit close
              to the machine: systems infrastructure, low-latency software, embedded and
              edge computing, and computational geometry.
            </p>
            <p>
              This summer I am a software engineering intern in R&amp;D at Align Technology,
              working on 3D computational geometry and mesh processing and shipping
              production R&amp;D software. Before that I did research at NC State: full-stack
              work on a production RAG system in the Game2Learn Lab, and interval-analysis
              algorithms for detecting unreliable crowd labels at scale.
            </p>
            <p>
              The common thread is real C++ and low-level code, measured performance, and
              software that ships.
            </p>
          </div>

          <ul className="about__facts">
            {FACTS.map((f, i) => (
              <li
                key={f.label}
                className="about__fact spot reveal reveal--right"
                style={{ '--reveal-delay': `${0.2 + i * 0.1}s` } as React.CSSProperties}
              >
                <span className="about__fact-value grad-text">{f.value}</span>
                <span className="about__fact-label">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
