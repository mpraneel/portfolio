import { ArrowIcon } from './Icons'
import './projects.css'

export interface RepoLink {
  label: string
  url: string
}

export interface Project {
  title: string
  blurb: string
  tech: string[]
  repos: RepoLink[]
  featured?: boolean
  media: 'heatmap' | 'forensics' | 'pipeline' | 'geometry'
  note?: string
  span: 'wide' | 'narrow'
  revealVariant?: string
}

function Media({ project }: { project: Project }) {
  return (
    <div className={`card__media card__media--${project.media}`} aria-hidden="true">
      {project.media === 'heatmap' && (
        <div className="card__heatmap">
          <span className="card__heatmap-layer" />
          <span className="card__heatmap-grid" />
        </div>
      )}
      {project.media === 'forensics' && (
        <div className="card__forensics">
          <span className="card__scanline" />
        </div>
      )}
      {project.media === 'pipeline' && (
        <div className="card__pipeline">
          <span className="card__pipeline-flow" />
          <span className="card__pipeline-nodes" />
        </div>
      )}
      {project.media === 'geometry' && (
        <div className="card__geometry">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
            <g className="card__geometry-hull">
              <polygon points="70,160 110,70 210,42 320,90 330,150 240,185 120,182" />
            </g>
            <g className="card__geometry-tree">
              <path d="M90 190 L130 150 L160 160 M130 150 L150 110 L190 100 M150 110 L140 70" />
              <path d="M190 100 L240 120 L290 105 M240 120 L260 160" />
            </g>
            <g className="card__geometry-points">
              <circle cx="70" cy="160" r="3.5" />
              <circle cx="110" cy="70" r="3.5" />
              <circle cx="210" cy="42" r="3.5" />
              <circle cx="320" cy="90" r="3.5" />
              <circle cx="330" cy="150" r="3.5" />
              <circle cx="240" cy="185" r="3.5" />
              <circle cx="120" cy="182" r="3.5" />
              <circle cx="160" cy="120" r="2.2" />
              <circle cx="200" cy="150" r="2.2" />
              <circle cx="250" cy="90" r="2.2" />
              <circle cx="180" cy="80" r="2.2" />
              <circle cx="280" cy="140" r="2.2" />
            </g>
          </svg>
        </div>
      )}
      {project.featured && <span className="card__flag mono-label">Featured</span>}
    </div>
  )
}

export default function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const primary = project.repos[0]
  const classes = [
    'card',
    'spot',
    project.featured ? 'card--featured' : '',
    project.span === 'wide' ? 'card--wide' : 'card--narrow',
    'reveal',
    project.revealVariant ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={classes} style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}>
      <a
        className="card__media-link"
        href={primary.url}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Media project={project} />
      </a>

      <div className="card__body">
        <h3 className="card__title">
          <a
            className="card__title-link"
            href={primary.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            {project.title}
            <span className="card__arrow">
              <ArrowIcon />
            </span>
          </a>
        </h3>
        {project.note && <p className="card__note mono-label">{project.note}</p>}
        <p className="card__blurb">{project.blurb}</p>
        {project.repos.length > 1 && (
          <ul className="card__repos" aria-label="Repositories">
            {project.repos.map((r) => (
              <li key={r.url}>
                <a className="card__repo-link" href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                  <ArrowIcon size={13} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <ul className="card__tech" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="card__chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
