import './experience.css'

interface Role {
  org: string
  title: string
  dates: string
  points: string[]
}

const ROLES: Role[] = [
  {
    org: 'GAEC Lab, NC State Center for Geospatial Analytics',
    title: 'Undergraduate Research Assistant',
    dates: 'Aug 2026 to May 2027',
    points: [
      'Selected for I-GROUP, a competitive, funded, year-long undergraduate research appointment (about 120 applicants), advised by Dr. Mirela Tulbure.',
      'Integrating five published flood benchmarks (KuroSiwo, ETCI2021, SEN12-FLOOD, MMFlood, S1S2-Water) into a harmonized multi-sensor training pipeline for FloodAtlas, reconciling conflicting projections, resolutions, SAR polarizations, and label taxonomies.',
      "Process hundreds of gigabytes of Sentinel-1 SAR and Sentinel-2 imagery on NC State's HPC cluster.",
    ],
  },
  {
    org: 'Align Technology (Invisalign)',
    title: 'Software Engineering Intern, R&D',
    dates: 'May 2026 to Aug 2026',
    points: [
      'Redesigned support-structure generation in a large production C++ pipeline for 3D-printed medical devices, improving surface quality and reducing manual finishing.',
      'Implemented mesh-processing algorithms that derive support placement from part geometry, generalizing across device shapes without per-case tuning.',
      'Applied OpenCV processing to rasterized geometry to tune how supports detach from the finished part.',
    ],
  },
  {
    org: 'Game2Learn Lab, NC State',
    title: 'Research Assistant',
    dates: 'Summer 2024',
    points: [
      "Built the retrieval pipeline for MerryQuery, an AI teaching assistant that answers student questions from a course's actual materials rather than a model's general knowledge.",
      'Drove full-stack integration across retrieval, model interface, and student-facing app, taking it from prototype to a live classroom pilot.',
      'Iterated the design against feedback from real students in the pilot. Completed as an independent study under Dr. Tiffany Barnes.',
    ],
  },
  {
    org: 'Crowd Label Quality Control, NC State',
    title: 'Research Assistant',
    dates: 'Fall 2025',
    points: [
      'Designed a modular quality-control framework for crowdsourced ML training labels, modeling taggers, prompts, and tag assignments as distinct domain objects.',
      "Implemented reliability metrics including tagging-speed analysis, Krippendorff's alpha for inter-rater agreement, and repeated-pattern detection.",
      'Flagged low-quality annotators from behavioral and agreement signals, filtering unreliable data before it reaches a training set. Advised by Dr. Edward Gehringer.',
    ],
  },
  {
    org: 'DevDynamics.ai',
    title: 'Software Engineering Intern',
    dates: 'May 2025 to Aug 2025',
    points: [
      'Built a two-stage email classifier for InboxFlow: regex on the fast path, with only low-confidence messages escalated to a Gemini LLM to hold down cost and latency.',
      'Mapped structured LLM output into the existing label schema, and tracked order, return, and refund state across email threads arriving days apart.',
      'Migrated persistence from memory to Supabase (PostgreSQL) and deployed the Flask service to AWS Elastic Beanstalk as a stable endpoint for a Gmail Add-on.',
    ],
  },
  {
    org: 'Liquid Rocketry Lab, NC State',
    title: 'Data Engineer',
    dates: 'Sep 2024 to May 2025',
    points: [
      'Built the real-time telemetry pipeline for live rocket engine hot fire tests, using Python for processing and MongoDB for storage across containerized microservices.',
      'Captured abort and breach events at sub-second latency in a safety-critical environment where a missed abort has physical consequences.',
      'Decoupled fault detection from ingestion, so new abort conditions ship by subscribing a detector rather than editing the pipeline.',
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
