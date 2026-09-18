import './experience.css'

interface Role {
  org: string
  title: string
  dates: string
  points: string[]
}

const ROLES: Role[] = [
  {
    org: 'GAEC Lab at NC State',
    title: 'Undergraduate Research Assistant',
    dates: 'Aug 2026 to May 2027',
    points: [
      'Selected for I-GROUP, a competitive, funded, year-long undergraduate research appointment (about 120 applicants), advised by Dr. Mirela Tulbure at the Center for Geospatial Analytics.',
      'Integrating five published benchmark datasets (KuroSiwo, ETCI2021, SEN12-FLOOD, MMFlood, S1S2-Water) into a harmonized multi-sensor training pipeline for FloodAtlas, the lab’s global ML flood segmentation model, reconciling conflicting coordinate reference systems, resolutions, tiling schemes, SAR polarizations, and label taxonomies across datasets built by different research groups.',
      'Running large-scale processing of hundreds of gigabytes of Sentinel-1 SAR and Sentinel-2 imagery on NC State’s HPC cluster and research storage.',
    ],
  },
  {
    org: 'Align Technology',
    title: 'Software Engineering Intern, R&D',
    dates: 'May 2026 to Aug 2026',
    points: [
      'Redesigned support-structure generation in a large C++ 3D-printing pipeline, replacing a manual finishing step and improving part quality.',
      'Engineered support geometry and implemented pixel-level processing to optimize how supports separate from the final part.',
    ],
  },
  {
    org: 'NC State',
    title: 'Research Assistant',
    dates: 'May 2024 to Dec 2025',
    points: [
      'Game2Learn Lab: full-stack work on a production RAG system for an educational assistant.',
      'Crowd Label Quality Control: interval-analysis algorithms for detecting unreliable crowd labels at scale.',
    ],
  },
  {
    org: 'DevDynamics.ai',
    title: 'Software Engineering Intern',
    dates: 'May 2025 to Aug 2025',
    points: [
      'Hybrid regex plus LLM email-classification backend behind a Flask API: regex-first classification with LLM fallback and thread-level timeline tracking.',
      'Migrated storage from in-memory to Supabase and deployed on AWS Elastic Beanstalk.',
    ],
  },
  {
    org: 'Liquid Rocketry Lab at NC State',
    title: 'Data Engineer',
    dates: 'Sep 2024 to May 2025',
    points: [
      'Real-time telemetry pipeline for live rocket engine tests using Python, MongoDB, and containerized microservices.',
      'Sub-second abort and breach event capture with an observable fault-detection pattern.',
    ],
  },
]

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <p className="mono-label">03 &middot; Where I have worked</p>
        <h2 className="experience__heading">Experience</h2>

        <ol className="timeline">
          {ROLES.map((r) => (
            <li key={r.org} className="timeline__item">
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__card">
                <div className="timeline__head">
                  <h3 className="timeline__org">{r.org}</h3>
                  {r.dates && <span className="timeline__dates mono-label">{r.dates}</span>}
                </div>
                <p className="timeline__title">{r.title}</p>
                <ul className="timeline__points">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
