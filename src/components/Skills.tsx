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
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="mono-label">04 &middot; What I work with</p>
        <h2 className="skills__heading">Skills</h2>

        <div className="skills__groups">
          {GROUPS.map((g) => (
            <div key={g.name} className={`skills__group ${g.primary ? 'skills__group--primary' : ''}`}>
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
