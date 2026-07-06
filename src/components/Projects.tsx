import ProjectCard, { type Project } from './ProjectCard'
import { useReveal } from '../useReveal'
import './projects.css'

const PROJECTS: Project[] = [
  {
    title: 'Mesh Alignment Engine',
    blurb:
      'ICP-based 3D surface registration with sub-millimeter RMSE. Coarse-to-fine multi-resolution convergence, with per-point deviation heatmaps for inspecting alignment quality across the surface.',
    tech: ['Python', 'Open3D', 'NumPy', 'trimesh'],
    repos: [{ label: 'mesh-alignment-engine', url: 'https://github.com/mpraneel/mesh-alignment-engine' }],
    featured: true,
    media: 'heatmap',
    span: 'wide',
    revealVariant: 'reveal--zoom',
  },
  {
    title: 'Mendacia',
    blurb:
      'Full-stack multimodal media forensics platform. Takes raw video and produces a structured report flagging propaganda techniques and narrative distortion. Cross-modal consistency checks compare narrative claims against TwelveLabs scene data using rule-based keyword and scene matching, behind a defensive adapter layer that isolates the frontend from an unstable backend contract.',
    tech: ['React', 'TypeScript', 'Python', 'Flask', 'TwelveLabs'],
    repos: [{ label: 'mendacia', url: 'https://github.com/mpraneel/mendacia' }],
    media: 'forensics',
    note: 'HackNCState 2026',
    span: 'narrow',
    revealVariant: 'reveal--right',
  },
  {
    title: 'Hiring Agent',
    blurb:
      'Resume-to-job-description matching with ontology-based skill normalization and hybrid keyword plus LLM scoring with generated rationales. Typed response contracts with Pydantic, Dockerized, tested with pytest, and shipped through a GitHub Actions CI pipeline.',
    tech: ['FastAPI', 'Pydantic', 'React', 'Docker', 'GitHub Actions'],
    repos: [{ label: 'hiring-agent', url: 'https://github.com/mpraneel/hiring-agent' }],
    media: 'pipeline',
    span: 'wide',
    revealVariant: 'reveal--left',
  },
  {
    title: 'C++ Geometry and Planning',
    blurb:
      'Algorithm implementations in C++17 with interactive SFML visualizers: convex hull construction and rapidly-exploring random tree motion planning.',
    tech: ['C++17', 'SFML'],
    repos: [
      { label: 'cpp-convex-hull', url: 'https://github.com/mpraneel/cpp-convex-hull' },
      { label: 'rrt-motion-planner', url: 'https://github.com/mpraneel/rrt-motion-planner' },
    ],
    media: 'geometry',
    span: 'narrow',
    revealVariant: 'reveal--right',
  },
]

export default function Projects() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <p className="mono-label reveal">02 &middot; Selected work</p>
        <h2 className="projects__heading reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
          Projects
        </h2>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={0.12 + (i % 2) * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
