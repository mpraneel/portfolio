import { useReveal } from '../useReveal'
import './about.css'

const FACTS = [
  { value: '12', label: 'Public projects on GitHub' },
  { value: '5', label: 'Roles across industry and research' },
  { value: 'May 2027', label: 'Bachelors degree in Computer Science, NC State' },
]

export default function About() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <p className="mono-label reveal">01 &middot; About</p>
        <h2 className="about__heading reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
          Built for <span className="grad-text"> complexity.</span>
        </h2>

        <div className="about__grid">
          <div className="about__text reveal reveal--left" style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}>
            <p>
              I'm Praneel, a computer science student at North Carolina State University graduating in May 2027. 
              I work mostly in C++, Python, and Java, and I'm drawn to the parts of a problem where 
              the math and the systems design actually matter.
            </p>
            <p>
              Right now I'm on the Product R&amp;D team at Align Technology, 
              working on 3D geometry and mesh processing for their clear aligners. 
              I've also built real-time telemetry pipelines, cloud-deployed backends, 
              AI systems using RAG and LLM classification, 
              and algorithms for spatial alignment and data quality.
            </p>
            <p>
              What matters most to me stays constant: understanding the problem, 
              then getting the fundamentals right, the data model, the algorithm, the performance. 
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
