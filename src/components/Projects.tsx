import ProjectCard, { type Project } from './ProjectCard'
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
  },
  {
    title: 'arm-kinematics',
    blurb:
      'Designed and built a planar robot arm simulator with a runtime safety supervisor that validates every command from a deliberately faulty controller before the arm acts on it, checking reachability, joint limits, velocity, singularities, and swept-path collision, then falling back to hold, clamp, or an RRT detour. Benchmarked on 2,000 seeded commands at a 50 Hz loop: joint limit, velocity, and collision violations drop from 176, 423, and 418 to zero, at a median supervisor latency of 4.6 microseconds and a 41.5% intervention rate. The benchmark also reports the costs, including blocked commands, reduced target reach, and tail latency, from a scene redesigned so a fault-free run produces zero violations.',
    tech: ['C++17', 'CMake', 'Eigen', 'SFML', 'Catch2'],
    repos: [{ label: 'arm-kinematics', url: 'https://github.com/mpraneel/arm-kinematics' }],
    media: 'arm',
    span: 'narrow',
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
  },
  {
    title: 'Hiring Agent',
    blurb:
      'Resume-to-job-description matching with ontology-based skill normalization and hybrid keyword plus LLM scoring with generated rationales. Typed response contracts with Pydantic, Dockerized, tested with pytest, and shipped through a GitHub Actions CI pipeline.',
    tech: ['FastAPI', 'Pydantic', 'React', 'Docker', 'GitHub Actions'],
    repos: [{ label: 'hiring-agent', url: 'https://github.com/mpraneel/hiring-agent' }],
    media: 'pipeline',
    span: 'wide',
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
  },
]

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <p className="mono-label">02 &middot; Selected work</p>
        <h2 className="projects__heading">Projects</h2>
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
