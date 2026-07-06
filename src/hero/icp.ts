/*
  ICP registration simulation for the hero animation.

  Two copies of an icosahedron point cloud. The reference stays put.
  The source spawns with a random rigid offset and converges in
  discrete settling steps, each cutting the residual roughly in half,
  which matches the shape of a real ICP error curve. Points lock once
  they come within tolerance of their counterpart and stay lit, and
  per-point residuals drive a live deviation heatmap in the renderer.
*/

export interface Vec3 {
  x: number
  y: number
  z: number
}

/* Rigid offset as Euler angles plus translation. Adequate for a
   visualization where each step shrinks the same offset toward zero. */
export type Offset = [number, number, number, number, number, number]

const POINT_COUNT = 800
const LINE_COUNT = 34
export const LOCK_TOL = 0.06

const STEP_MS = 460
const GAP_MS = 240
const HOLD_MS = 1600
const MAX_STEPS = 9

export type Phase = 'settling' | 'gap' | 'hold'

function rand(lo: number, hi: number): number {
  return lo + Math.random() * (hi - lo)
}

function randSigned(lo: number, hi: number): number {
  return rand(lo, hi) * (Math.random() < 0.5 ? -1 : 1)
}

export interface IcosaGeometry {
  /* Sampled cloud: face fill plus a sprinkling along edges */
  points: Vec3[]
  /* The 12 vertices and 30 edges, drawn as a wireframe overlay */
  wireVerts: Vec3[]
  wireEdges: [number, number][]
}

/*
  Sample an icosahedron as a point cloud with a wireframe: points
  fill the twenty triangular faces uniformly with some scattered
  along edges, while the vertex and edge lists let the renderer
  stroke the frame so the solid reads sharply. Faces and edges are
  derived from vertex adjacency rather than hardcoded index tables.
*/
export function makeIcosahedron(): IcosaGeometry {
  const phi = (1 + Math.sqrt(5)) / 2
  const RADIUS = 1.15
  const norm = RADIUS / Math.sqrt(1 + phi * phi)

  // 12 vertices from three orthogonal golden rectangles
  const verts: Vec3[] = []
  for (const a of [-1, 1]) {
    for (const b of [-phi, phi]) {
      verts.push({ x: 0, y: a * norm, z: b * norm })
      verts.push({ x: a * norm, y: b * norm, z: 0 })
      verts.push({ x: b * norm, y: 0, z: a * norm })
    }
  }

  const d2 = (p: Vec3, q: Vec3): number => {
    const dx = p.x - q.x
    const dy = p.y - q.y
    const dz = p.z - q.z
    return dx * dx + dy * dy + dz * dz
  }

  // Neighbors sit one edge length apart, the shortest pair distance
  let minD = Infinity
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) minD = Math.min(minD, d2(verts[i], verts[j]))
  }
  const isEdge = (i: number, j: number): boolean => d2(verts[i], verts[j]) < minD * 1.01

  const edgeIdx: [number, number][] = []
  const faces: [Vec3, Vec3, Vec3][] = []
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      if (!isEdge(i, j)) continue
      edgeIdx.push([i, j])
      for (let k = j + 1; k < 12; k++) {
        if (isEdge(i, k) && isEdge(j, k)) faces.push([verts[i], verts[j], verts[k]])
      }
    }
  }

  const pts: Vec3[] = []

  // A light sprinkling of points along the edges; the stroked
  // wireframe carries most of the definition
  const edgeN = Math.floor(POINT_COUNT * 0.18)
  for (let i = 0; i < edgeN; i++) {
    const [ia, ib] = edgeIdx[i % edgeIdx.length]
    const a = verts[ia]
    const b = verts[ib]
    const t = Math.random()
    pts.push({
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t,
    })
  }

  // Face points fill the surface: uniform barycentric samples, and
  // every face has equal area so no weighting is needed
  while (pts.length < POINT_COUNT) {
    const [a, b, c] = faces[Math.floor(Math.random() * faces.length)]
    let r1 = Math.random()
    let r2 = Math.random()
    if (r1 + r2 > 1) {
      r1 = 1 - r1
      r2 = 1 - r2
    }
    pts.push({
      x: a.x + (b.x - a.x) * r1 + (c.x - a.x) * r2,
      y: a.y + (b.y - a.y) * r1 + (c.y - a.y) * r2,
      z: a.z + (b.z - a.z) * r1 + (c.z - a.z) * r2,
    })
  }

  return { points: pts, wireVerts: verts, wireEdges: edgeIdx }
}

function applyOffset(p: Vec3, o: Offset, out: Vec3): void {
  const [ax, ay, az, tx, ty, tz] = o
  // Rotate about x, then y, then z, then translate
  const cx = Math.cos(ax)
  const sx = Math.sin(ax)
  const cy = Math.cos(ay)
  const sy = Math.sin(ay)
  const cz = Math.cos(az)
  const sz = Math.sin(az)

  const y1 = p.y * cx - p.z * sx
  const z1 = p.y * sx + p.z * cx
  const x1 = p.x

  const x2 = x1 * cy + z1 * sy
  const z2 = -x1 * sy + z1 * cy

  const x3 = x2 * cz - y1 * sz
  const y3 = x2 * sz + y1 * cz

  out.x = x3 + tx
  out.y = y3 + ty
  out.z = z2 + tz
}

function easeOutCubic(t: number): number {
  const u = 1 - t
  return 1 - u * u * u
}

function randomOffset(): Offset {
  return [
    randSigned(0.35, 0.8),
    randSigned(0.5, 1.2),
    randSigned(0.3, 0.75),
    randSigned(0.4, 0.85),
    randSigned(0.3, 0.7),
    randSigned(0.35, 0.8),
  ]
}

export class IcpSim {
  readonly reference: Vec3[]
  readonly source: Vec3[]
  readonly locked: boolean[]
  /* Per-point distance to the counterpart, feeds the heatmap */
  readonly dist: number[]
  readonly lineIndices: number[]
  /* Wireframe: fixed reference vertices, transformed source copies,
     and the edge index pairs connecting them */
  readonly wireRef: Vec3[]
  readonly wireSrc: Vec3[]
  readonly wireEdges: [number, number][]

  phase: Phase = 'settling'
  meanResidual = 0
  initialResidual = 1
  lockedCount = 0

  private offsetFrom: Offset
  private offsetTo: Offset
  private current: Offset
  private timer = 0
  private step = 0

  constructor() {
    const geo = makeIcosahedron()
    this.reference = geo.points
    this.wireRef = geo.wireVerts
    this.wireSrc = geo.wireVerts.map((p) => ({ ...p }))
    this.wireEdges = geo.wireEdges
    this.source = this.reference.map((p) => ({ ...p }))
    this.locked = new Array(this.reference.length).fill(false)
    this.dist = new Array(this.reference.length).fill(0)

    const stride = Math.floor(this.reference.length / LINE_COUNT)
    this.lineIndices = []
    for (let i = 0; i < LINE_COUNT; i++) this.lineIndices.push(i * stride)

    this.offsetFrom = randomOffset()
    this.offsetTo = this.nextTarget(this.offsetFrom)
    this.current = [...this.offsetFrom] as Offset
    this.respawn()
  }

  /* Each step commits an update that cuts the offset roughly in half,
     with variation so the error curve looks measured, not scripted. */
  private nextTarget(from: Offset): Offset {
    if (this.step >= MAX_STEPS - 1) return [0, 0, 0, 0, 0, 0]
    const f = rand(0.42, 0.58)
    return from.map((v) => v * f) as Offset
  }

  private respawn(): void {
    this.step = 0
    this.timer = 0
    this.phase = 'settling'
    this.locked.fill(false)
    this.lockedCount = 0
    this.offsetFrom = randomOffset()
    this.offsetTo = this.nextTarget(this.offsetFrom)
    this.current = [...this.offsetFrom] as Offset
    this.apply()
    this.initialResidual = Math.max(this.meanResidual, 0.001)
  }

  private apply(): void {
    let sum = 0
    let locks = 0
    for (let i = 0; i < this.reference.length; i++) {
      applyOffset(this.reference[i], this.current, this.source[i])
      const r = this.reference[i]
      const s = this.source[i]
      const dx = s.x - r.x
      const dy = s.y - r.y
      const dz = s.z - r.z
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
      this.dist[i] = d
      sum += d
      if (d < LOCK_TOL) this.locked[i] = true
      if (this.locked[i]) locks++
    }
    this.meanResidual = sum / this.reference.length
    this.lockedCount = locks

    // The source wireframe rides the same rigid transform
    for (let i = 0; i < this.wireRef.length; i++) {
      applyOffset(this.wireRef[i], this.current, this.wireSrc[i])
    }
  }

  /* Jump straight to the aligned state. Used for reduced motion. */
  snapAligned(): void {
    this.current = [0, 0, 0, 0, 0, 0]
    this.phase = 'hold'
    this.apply()
  }

  update(dtMs: number): void {
    this.timer += dtMs

    if (this.phase === 'settling') {
      const t = Math.min(this.timer / STEP_MS, 1)
      const e = easeOutCubic(t)
      for (let k = 0; k < 6; k++) {
        this.current[k] = this.offsetFrom[k] + (this.offsetTo[k] - this.offsetFrom[k]) * e
      }
      this.apply()
      if (t >= 1) {
        this.timer = 0
        this.step++
        if (this.step >= MAX_STEPS) {
          this.phase = 'hold'
        } else {
          this.phase = 'gap'
        }
      }
      return
    }

    if (this.phase === 'gap') {
      if (this.timer >= GAP_MS) {
        this.timer = 0
        this.offsetFrom = [...this.offsetTo] as Offset
        this.offsetTo = this.nextTarget(this.offsetFrom)
        this.phase = 'settling'
      }
      return
    }

    // hold, fully lit, then loop with a fresh offset
    if (this.timer >= HOLD_MS) {
      this.respawn()
    }
  }
}
