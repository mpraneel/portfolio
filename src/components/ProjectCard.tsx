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
  media: 'heatmap' | 'forensics' | 'pipeline' | 'geometry' | 'arm'
  note?: string
  span: 'wide' | 'narrow'
}

function Media({ project }: { project: Project }) {
  return (
    <div className={`card__media card__media--${project.media}`} aria-hidden="true">
      {project.media === 'heatmap' && (
        <div className="card__heatmap">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
            <g className="card__heatmap-edges">
              <line x1="90" y1="55" x2="134" y2="52.1" />
              <line x1="134" y1="52.1" x2="178" y2="50.2" />
              <line x1="178" y1="50.2" x2="222" y2="50.2" />
              <line x1="222" y1="50.2" x2="266" y2="52.1" />
              <line x1="266" y1="52.1" x2="310" y2="55" />
              <line x1="102.1" y1="91.7" x2="146.1" y2="90.7" />
              <line x1="146.1" y1="90.7" x2="190.1" y2="90.1" />
              <line x1="190.1" y1="90.1" x2="234.1" y2="90.1" />
              <line x1="234.1" y1="90.1" x2="278.1" y2="90.7" />
              <line x1="278.1" y1="90.7" x2="322.1" y2="91.7" />
              <line x1="102.1" y1="128.3" x2="146.1" y2="129.3" />
              <line x1="146.1" y1="129.3" x2="190.1" y2="129.9" />
              <line x1="190.1" y1="129.9" x2="234.1" y2="129.9" />
              <line x1="234.1" y1="129.9" x2="278.1" y2="129.3" />
              <line x1="278.1" y1="129.3" x2="322.1" y2="128.3" />
              <line x1="90" y1="165" x2="134" y2="167.9" />
              <line x1="134" y1="167.9" x2="178" y2="169.8" />
              <line x1="178" y1="169.8" x2="222" y2="169.8" />
              <line x1="222" y1="169.8" x2="266" y2="167.9" />
              <line x1="266" y1="167.9" x2="310" y2="165" />
              <line x1="90" y1="55" x2="102.1" y2="91.7" />
              <line x1="134" y1="52.1" x2="146.1" y2="90.7" />
              <line x1="178" y1="50.2" x2="190.1" y2="90.1" />
              <line x1="222" y1="50.2" x2="234.1" y2="90.1" />
              <line x1="266" y1="52.1" x2="278.1" y2="90.7" />
              <line x1="310" y1="55" x2="322.1" y2="91.7" />
              <line x1="102.1" y1="91.7" x2="102.1" y2="128.3" />
              <line x1="146.1" y1="90.7" x2="146.1" y2="129.3" />
              <line x1="190.1" y1="90.1" x2="190.1" y2="129.9" />
              <line x1="234.1" y1="90.1" x2="234.1" y2="129.9" />
              <line x1="278.1" y1="90.7" x2="278.1" y2="129.3" />
              <line x1="322.1" y1="91.7" x2="322.1" y2="128.3" />
              <line x1="102.1" y1="128.3" x2="90" y2="165" />
              <line x1="146.1" y1="129.3" x2="134" y2="167.9" />
              <line x1="190.1" y1="129.9" x2="178" y2="169.8" />
              <line x1="234.1" y1="129.9" x2="222" y2="169.8" />
              <line x1="278.1" y1="129.3" x2="266" y2="167.9" />
              <line x1="322.1" y1="128.3" x2="310" y2="165" />
              <line x1="90" y1="55" x2="146.1" y2="90.7" />
              <line x1="134" y1="52.1" x2="190.1" y2="90.1" />
              <line x1="178" y1="50.2" x2="234.1" y2="90.1" />
              <line x1="222" y1="50.2" x2="278.1" y2="90.7" />
              <line x1="266" y1="52.1" x2="322.1" y2="91.7" />
              <line x1="102.1" y1="91.7" x2="146.1" y2="129.3" />
              <line x1="146.1" y1="90.7" x2="190.1" y2="129.9" />
              <line x1="190.1" y1="90.1" x2="234.1" y2="129.9" />
              <line x1="234.1" y1="90.1" x2="278.1" y2="129.3" />
              <line x1="278.1" y1="90.7" x2="322.1" y2="128.3" />
              <line x1="102.1" y1="128.3" x2="134" y2="167.9" />
              <line x1="146.1" y1="129.3" x2="178" y2="169.8" />
              <line x1="190.1" y1="129.9" x2="222" y2="169.8" />
              <line x1="234.1" y1="129.9" x2="266" y2="167.9" />
              <line x1="278.1" y1="129.3" x2="310" y2="165" />
            </g>
            <g className="card__heatmap-lo">
              <circle cx="90" cy="55" r="3" />
              <circle cx="134" cy="52.1" r="3" />
              <circle cx="266" cy="52.1" r="3" />
              <circle cx="310" cy="55" r="3" />
              <circle cx="102.1" cy="91.7" r="3" />
              <circle cx="322.1" cy="91.7" r="3" />
              <circle cx="102.1" cy="128.3" r="3" />
              <circle cx="322.1" cy="128.3" r="3" />
              <circle cx="90" cy="165" r="3" />
              <circle cx="134" cy="167.9" r="3" />
              <circle cx="266" cy="167.9" r="3" />
              <circle cx="310" cy="165" r="3" />
            </g>
            <g className="card__heatmap-mid">
              <circle cx="178" cy="50.2" r="3.2" />
              <circle cx="222" cy="50.2" r="3.2" />
              <circle cx="146.1" cy="90.7" r="3.2" />
              <circle cx="278.1" cy="90.7" r="3.2" />
              <circle cx="146.1" cy="129.3" r="3.2" />
              <circle cx="278.1" cy="129.3" r="3.2" />
              <circle cx="178" cy="169.8" r="3.2" />
              <circle cx="222" cy="169.8" r="3.2" />
            </g>
            <g className="card__heatmap-hi">
              <circle cx="190.1" cy="90.1" r="3.6" />
              <circle cx="234.1" cy="90.1" r="3.6" />
              <circle cx="190.1" cy="129.9" r="3.6" />
              <circle cx="234.1" cy="129.9" r="3.6" />
            </g>
          </svg>
        </div>
      )}
      {project.media === 'forensics' && (
        <div className="card__forensics">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
            <g className="card__forensics-video">
              <rect x="42" y="48" width="78" height="58" rx="6" />
              <path d="M72 62 L72 92 L96 77 Z" />
            </g>
            <g className="card__forensics-claim">
              <rect x="42" y="124" width="78" height="46" rx="6" />
              <line x1="54" y1="138" x2="104" y2="138" />
              <line x1="54" y1="150" x2="104" y2="150" />
              <line className="card__forensics-claim-flag" x1="54" y1="162" x2="88" y2="162" />
            </g>
            <path className="card__forensics-link" d="M120 77 Q165 77 197 100" />
            <path className="card__forensics-link" d="M120 147 Q165 147 197 120" />
            <g className="card__forensics-compare">
              <circle className="card__forensics-compare-ring" cx="225" cy="110" r="28" />
              <circle cx="215" cy="104" r="10" />
              <circle cx="235" cy="116" r="10" />
            </g>
            <path className="card__forensics-link" d="M253 110 L293 110 M285 102 L293 110 L285 118" />
            <g className="card__forensics-report">
              <path d="M298 45 L348 45 L368 65 L368 175 L298 175 Z" />
              <path d="M348 45 L348 65 L368 65 Z" />
              <line x1="310" y1="80" x2="355" y2="80" />
              <line x1="310" y1="93" x2="350" y2="93" />
              <line className="card__forensics-report-flag" x1="310" y1="106" x2="345" y2="106" />
              <line x1="310" y1="119" x2="355" y2="119" />
              <line x1="310" y1="132" x2="340" y2="132" />
              <line x1="310" y1="145" x2="350" y2="145" />
            </g>
            <path className="card__forensics-flag-mark" d="M356 100 L356 108 M356 112 L356.2 112" />
          </svg>
        </div>
      )}
      {project.media === 'pipeline' && (
        <div className="card__pipeline">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
            <g className="card__pipeline-doc">
              <rect x="31" y="65" width="70" height="90" rx="8" />
              <line x1="43" y1="90" x2="88" y2="90" />
              <line x1="43" y1="105" x2="88" y2="105" />
              <line x1="43" y1="120" x2="78" y2="120" />
            </g>
            <path className="card__pipeline-arrow" d="M101 110 L153 110 M145 100 L153 110 L145 120" />
            <circle className="card__pipeline-node" cx="191" cy="110" r="42" />
            <circle className="card__pipeline-node-inner" cx="191" cy="110" r="20" />
            <path className="card__pipeline-arrow" d="M233 110 L289 110 M281 100 L289 110 L281 120" />
            <g className="card__pipeline-badge">
              <rect x="293" y="78" width="76" height="64" rx="32" />
              <path d="M311 110 L325 124 L349 92" />
            </g>
          </svg>
        </div>
      )}
      {project.media === 'geometry' && (
        <div className="card__geometry">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
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
      {project.media === 'arm' && (
        <div className="card__arm">
          <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
            <path className="card__arm-reach" d="M12 168 Q200 -15 388 95" />
            <g className="card__arm-ghost">
              <line x1="95" y1="178" x2="215" y2="60" />
              <line x1="215" y1="60" x2="330" y2="48" />
            </g>
            <circle className="card__arm-ghost-joint" cx="215" cy="60" r="4" />
            <path className="card__arm-detour" d="M215 60 Q230 82 180 92" />
            <g className="card__arm-link">
              <line x1="95" y1="178" x2="180" y2="92" />
              <line x1="180" y1="92" x2="262" y2="120" />
            </g>
            <g className="card__arm-joints">
              <circle cx="95" cy="178" r="6" />
              <circle cx="180" cy="92" r="5" />
            </g>
            <circle className="card__arm-safe-joint" cx="262" cy="120" r="5.5" />
            <g className="card__arm-blocked-mark">
              <line x1="323" y1="41" x2="337" y2="55" />
              <line x1="337" y1="41" x2="323" y2="55" />
            </g>
          </svg>
        </div>
      )}
      {project.featured && <span className="card__flag mono-label">Featured</span>}
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const primary = project.repos[0]
  const classes = [
    'card',
    project.featured ? 'card--featured' : '',
    project.span === 'wide' ? 'card--wide' : 'card--narrow',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={classes}>
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
