import { useState } from 'react'
import { ChevronIcon } from './Icons'
import './skills.css'

const GROUPS = [
  {
    name: 'Languages',
    defaultOpen: true,
    items: ['C++', 'Python', 'Java', 'C', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    name: 'Systems',
    defaultOpen: true,
    items: [
      'Multithreading and synchronization (pthreads)',
      'Real-time data pipelines',
      'Linux',
      'Make',
      'CMake',
      'gdb',
      'Valgrind',
      'Git',
      'HPC cluster computing',
    ],
  },
  {
    name: 'Geometry and scientific computing',
    defaultOpen: false,
    items: ['Eigen', 'Open3D', 'OpenCV', 'NumPy', 'trimesh'],
  },
  {
    name: 'Geospatial and remote sensing',
    defaultOpen: false,
    items: ['rasterio', 'geopandas', 'xarray', 'Google Earth Engine', 'Sentinel-1 SAR', 'Sentinel-2'],
  },
  {
    name: 'AI and ML',
    defaultOpen: false,
    items: ['RAG systems', 'LLM integration and structured output', 'Pydantic', 'semantic segmentation'],
  },
  {
    name: 'Backend and infrastructure',
    defaultOpen: false,
    items: [
      'Spring Boot',
      'Flask',
      'FastAPI',
      'React',
      'Docker',
      'AWS',
      'GitHub Actions',
      'PostgreSQL',
      'Supabase',
      'MongoDB',
    ],
  },
  {
    name: 'Testing and process',
    defaultOpen: false,
    items: ['JUnit', 'pytest', 'Agile team development'],
  },
]

export default function Skills() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(GROUPS.filter((g) => g.defaultOpen).map((g) => g.name)),
  )

  function toggle(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="mono-label">04 &middot; What I work with</p>
        <h2 className="skills__heading">Skills</h2>

        <div className="skills__groups">
          {GROUPS.map((g) => {
            const isOpen = openGroups.has(g.name)
            return (
              <div key={g.name} className="skills__group">
                <button
                  type="button"
                  className="skills__group-toggle"
                  aria-expanded={isOpen}
                  onClick={() => toggle(g.name)}
                >
                  <h3 className="skills__group-name mono-label">{g.name}</h3>
                  <span className={`skills__chevron ${isOpen ? 'skills__chevron--open' : ''}`}>
                    <ChevronIcon size={16} />
                  </span>
                </button>
                <div className={`skills__panel ${isOpen ? 'skills__panel--open' : ''}`}>
                  <div className="skills__panel-inner">
                    <ul className="skills__list">
                      {g.items.map((s) => (
                        <li key={s} className="skills__chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
