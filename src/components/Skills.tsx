import { useReveal } from '../useReveal'
import './skills.css'

const GROUPS = [
  {
    name: 'Languages',
    primary: true,
    items: ['C++', 'Python', 'Java', 'C', 'Bash'],
  },
  {
    name: 'Systems',
    primary: true,
    items: [
      'Systems programming',
      'Performance and memory reasoning',
      'Concurrent and distributed systems',
      'Real-time pipelines',
      'Algorithms and data structures',
    ],
  },
  {
    name: 'Backend and infrastructure',
    primary: false,
    items: ['Flask', 'FastAPI', 'Docker', 'AWS', 'SQL', 'Supabase', 'CI/CD with GitHub Actions'],
  },
]

export default function Skills() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <p className="mono-label reveal">04 &middot; What I work with</p>
        <h2 className="skills__heading reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
          Skills
        </h2>

        <div className="skills__groups">
          {GROUPS.map((g, i) => (
            <div
              key={g.name}
              className={`skills__group spot ${g.primary ? 'skills__group--primary' : ''} reveal`}
              style={{ '--reveal-delay': `${0.12 + i * 0.1}s` } as React.CSSProperties}
            >
              <h3 className="skills__group-name mono-label">{g.name}</h3>
              <ul className="skills__list">
                {g.items.map((s) => (
                  <li key={s} className={`skills__chip ${g.primary ? 'skills__chip--primary' : ''}`}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
