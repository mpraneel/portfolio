/*
  Full-bleed hero scene renderer.

  Two layers on one canvas:
  1. An ambient particle field spanning the hero, with links drawn
     between nearby particles and toward the cursor, which gently
     repels them. This is the interactive background.
  2. The ICP bunny registration, depth-shaded, sitting right of
     center on wide screens and centered below the copy on narrow.

  Owns the animation loop, projection, pointer tilt, theme colors,
  reduced motion, and tab visibility. Returns a cleanup function.
*/

import { IcpSim, LOCK_TOL, type Vec3 } from './icp'

const MAX_DPR = 2
const FOCAL = 3.6
const START_PITCH = -0.35
const START_YAW = 0.6
const RAMP_STEPS = 12
const HEAT_RANGE = 0.8
const PITCH_LIMIT = 1.1
const TILT_RANGE = 0.1
const TILT_LERP = 0.06
const DRAG_SENS = 0.0075
const INERTIA_DECAY = 0.94

const LINK_DIST = 110
const CURSOR_LINK_DIST = 170
const CURSOR_PUSH = 60

interface Colors {
  ref: string
  src: string
  far: string
  locked: string
  line: string
  ambient: string
  link: string
}

function readColors(): Colors {
  const s = getComputedStyle(document.documentElement)
  const v = (name: string) => s.getPropertyValue(name).trim()
  return {
    ref: v('--pt-ref'),
    src: v('--pt-src'),
    far: v('--pt-far'),
    locked: v('--pt-locked'),
    line: v('--pt-line'),
    ambient: v('--pt-ambient'),
    link: v('--pt-link'),
  }
}

function hexToRgb(h: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(h)
  if (!m) return [255, 138, 94]
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/* Quantized near-to-far color ramp: residual distance picks the
   bucket, so the moving cloud reads as a live deviation heatmap */
function buildRamp(near: string, far: string): string[] {
  const a = hexToRgb(near)
  const b = hexToRgb(far)
  const ramp: string[] = []
  for (let i = 0; i < RAMP_STEPS; i++) {
    const t = i / (RAMP_STEPS - 1)
    const r = Math.round(a[0] + (b[0] - a[0]) * t)
    const g = Math.round(a[1] + (b[1] - a[1]) * t)
    const bl = Math.round(a[2] + (b[2] - a[2]) * t)
    ramp.push(`rgb(${r}, ${g}, ${bl})`)
  }
  return ramp
}

interface Projected {
  x: number
  y: number
  scale: number
  depth: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export function startHero(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  const sim = new IcpSim()
  let colors = readColors()
  let ramp = buildRamp(colors.src, colors.far)
  const heatIdx: number[] = new Array(sim.source.length).fill(0)

  let width = 0
  let height = 0
  let dpr = 1

  // Orbit state: drag to rotate the whole scene like a model viewer,
  // with a light hover tilt layered on top when not dragging
  let yaw = START_YAW
  let pitch = START_PITCH
  let yawVel = 0
  let pitchVel = 0
  let dragging = false
  let lastDragX = 0
  let lastDragY = 0

  let tiltX = 0
  let tiltY = 0
  let targetTiltX = 0
  let targetTiltY = 0

  // Cursor position in canvas space; far offscreen when absent
  let cursorX = -9999
  let cursorY = -9999

  let raf = 0
  let last = 0
  let running = false

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  const projRef: Projected[] = sim.reference.map(() => ({ x: 0, y: 0, scale: 1, depth: 0 }))
  const projSrc: Projected[] = sim.source.map(() => ({ x: 0, y: 0, scale: 1, depth: 0 }))
  const projWireRef: Projected[] = sim.wireRef.map(() => ({ x: 0, y: 0, scale: 1, depth: 0 }))
  const projWireSrc: Projected[] = sim.wireSrc.map(() => ({ x: 0, y: 0, scale: 1, depth: 0 }))

  let particles: Particle[] = []

  function seedParticles(): void {
    const target = Math.max(36, Math.min(96, Math.round((width * height) / 16000)))
    particles = []
    for (let i = 0; i < target; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      })
    }
  }

  function resize(): void {
    const rect = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    width = rect.width
    height = rect.height
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    seedParticles()
  }

  function wide(): boolean {
    return width >= 880
  }

  function project(p: Vec3, out: Projected, rx: number, ry: number): void {
    const cy = Math.cos(ry)
    const sy = Math.sin(ry)
    const cx = Math.cos(rx)
    const sx = Math.sin(rx)

    const x1 = p.x * cy + p.z * sy
    const z1 = -p.x * sy + p.z * cy
    const y2 = p.y * cx - z1 * sx
    const z2 = p.y * sx + z1 * cx

    const s = FOCAL / (FOCAL + z2)
    const unit = wide()
      ? Math.min(width * 0.42, height * 0.86) * 0.36
      : Math.min(width, height) * 0.32
    const centerX = wide() ? width * 0.72 : width * 0.5
    const centerY = wide() ? height * 0.52 : height * 0.6

    // Canvas y runs downward, so flip to keep the bunny upright
    out.x = centerX + x1 * s * unit
    out.y = centerY - y2 * s * unit
    out.scale = s
    // 0 far, 1 near, used for depth shading
    out.depth = Math.max(0, Math.min(1, (1.4 - z2) / 2.8))
  }

  function updateParticles(dt: number): void {
    const f = dt / 16.7
    for (const p of particles) {
      p.x += p.vx * f
      p.y += p.vy * f

      // Gentle push away from the cursor
      const dx = p.x - cursorX
      const dy = p.y - cursorY
      const d2 = dx * dx + dy * dy
      if (d2 < CURSOR_PUSH * CURSOR_PUSH && d2 > 0.01) {
        const d = Math.sqrt(d2)
        const push = ((CURSOR_PUSH - d) / CURSOR_PUSH) * 0.06 * f
        p.x += (dx / d) * push * 10
        p.y += (dy / d) * push * 10
      }

      if (p.x < -10) p.x = width + 10
      if (p.x > width + 10) p.x = -10
      if (p.y < -10) p.y = height + 10
      if (p.y > height + 10) p.y = -10
    }
  }

  function drawParticles(): void {
    const c = ctx!
    c.lineWidth = 1

    c.strokeStyle = colors.link
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 < LINK_DIST * LINK_DIST) {
          c.globalAlpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.5
          c.beginPath()
          c.moveTo(a.x, a.y)
          c.lineTo(b.x, b.y)
          c.stroke()
        }
      }

      // Links reaching toward the cursor read as interactivity
      const dxc = a.x - cursorX
      const dyc = a.y - cursorY
      const dc2 = dxc * dxc + dyc * dyc
      if (dc2 < CURSOR_LINK_DIST * CURSOR_LINK_DIST) {
        c.globalAlpha = (1 - Math.sqrt(dc2) / CURSOR_LINK_DIST) * 0.6
        c.strokeStyle = colors.line
        c.beginPath()
        c.moveTo(a.x, a.y)
        c.lineTo(cursorX, cursorY)
        c.stroke()
        c.strokeStyle = colors.link
      }
    }

    c.globalAlpha = 1
    c.fillStyle = colors.ambient
    for (const p of particles) {
      c.beginPath()
      c.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
      c.fill()
    }
  }

  function drawCloud(): void {
    const c = ctx!
    const rx = pitch + tiltY
    const ry = yaw + tiltX

    for (let i = 0; i < sim.reference.length; i++) {
      project(sim.reference[i], projRef[i], rx, ry)
      project(sim.source[i], projSrc[i], rx, ry)
    }
    for (let i = 0; i < sim.wireRef.length; i++) {
      project(sim.wireRef[i], projWireRef[i], rx, ry)
      project(sim.wireSrc[i], projWireSrc[i], rx, ry)
    }

    // On narrow screens the cloud sits behind copy, so keep it quiet
    const layerAlpha = wide() ? 1 : 0.55

    // Wireframes first so points sit on top. The reference frame is
    // a quiet ghost; the source frame moves with the cloud and takes
    // the locked color once registration completes.
    const aligned = sim.lockedCount === sim.reference.length
    c.lineWidth = 1
    c.strokeStyle = colors.ref
    c.globalAlpha = 0.3 * layerAlpha
    c.beginPath()
    for (const [a, b] of sim.wireEdges) {
      c.moveTo(projWireRef[a].x, projWireRef[a].y)
      c.lineTo(projWireRef[b].x, projWireRef[b].y)
    }
    c.stroke()

    c.strokeStyle = aligned ? colors.locked : colors.src
    c.globalAlpha = (aligned ? 0.55 : 0.4) * layerAlpha
    c.beginPath()
    for (const [a, b] of sim.wireEdges) {
      c.moveTo(projWireSrc[a].x, projWireSrc[a].y)
      c.lineTo(projWireSrc[b].x, projWireSrc[b].y)
    }
    c.stroke()
    c.globalAlpha = 1

    // Correspondence lines on a sparse subset, fading with residuals
    const residualRatio = Math.min(sim.meanResidual / sim.initialResidual, 1)
    if (residualRatio > 0.02) {
      c.strokeStyle = colors.line
      c.globalAlpha = Math.min(residualRatio * 1.6, 1) * layerAlpha
      c.lineWidth = 1
      c.beginPath()
      for (const idx of sim.lineIndices) {
        if (sim.locked[idx]) continue
        c.moveTo(projSrc[idx].x, projSrc[idx].y)
        c.lineTo(projRef[idx].x, projRef[idx].y)
      }
      c.stroke()
    }

    // Reference cloud: quiet, fixed, depth-shaded
    c.fillStyle = colors.ref
    for (let i = 0; i < projRef.length; i++) {
      const p = projRef[i]
      c.globalAlpha = (0.25 + 0.5 * p.depth) * layerAlpha
      c.beginPath()
      c.arc(p.x, p.y, (0.9 + 0.7 * p.depth) * p.scale, 0, Math.PI * 2)
      c.fill()
    }

    // Source cloud: moving points colored by residual, near points
    // amber and far points shifted toward coral, bucketed by ramp
    for (let i = 0; i < projSrc.length; i++) {
      const t = Math.min(Math.max((sim.dist[i] - LOCK_TOL) / HEAT_RANGE, 0), 1)
      heatIdx[i] = Math.round(t * (RAMP_STEPS - 1))
    }
    for (let b = 0; b < RAMP_STEPS; b++) {
      c.fillStyle = ramp[b]
      for (let i = 0; i < projSrc.length; i++) {
        if (sim.locked[i] || heatIdx[i] !== b) continue
        const p = projSrc[i]
        c.globalAlpha = (0.45 + 0.55 * p.depth) * layerAlpha
        c.beginPath()
        c.arc(p.x, p.y, (1.1 + 0.9 * p.depth) * p.scale, 0, Math.PI * 2)
        c.fill()
      }
    }

    // Locked points: same size as the rest, just brighter and crisp,
    // so alignment reads as the cloud settling rather than smearing
    c.fillStyle = colors.locked
    for (let i = 0; i < projSrc.length; i++) {
      if (!sim.locked[i]) continue
      const p = projSrc[i]
      c.globalAlpha = (0.65 + 0.35 * p.depth) * layerAlpha
      c.beginPath()
      c.arc(p.x, p.y, (1.15 + 0.9 * p.depth) * p.scale, 0, Math.PI * 2)
      c.fill()
    }

    c.globalAlpha = 1
  }

  function draw(): void {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx!.clearRect(0, 0, width, height)
    drawParticles()
    drawCloud()
  }

  function frame(now: number): void {
    if (!running) return
    const dt = Math.min(now - last, 50)
    last = now

    tiltX += (targetTiltX - tiltX) * TILT_LERP
    tiltY += (targetTiltY - tiltY) * TILT_LERP

    // Released drags coast to a stop
    if (!dragging) {
      yaw += yawVel
      pitch = clampPitch(pitch + pitchVel)
      yawVel *= INERTIA_DECAY
      pitchVel *= INERTIA_DECAY
    }

    updateParticles(dt)
    sim.update(dt)
    draw()
    raf = requestAnimationFrame(frame)
  }

  function start(): void {
    if (running || reduced.matches) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  function stop(): void {
    running = false
    cancelAnimationFrame(raf)
  }

  function renderStatic(): void {
    sim.snapAligned()
    draw()
  }

  function applyMotionPreference(): void {
    if (reduced.matches) {
      stop()
      renderStatic()
    } else {
      start()
    }
  }

  function clampPitch(v: number): number {
    return Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, v))
  }

  const onPointerDown = (e: PointerEvent): void => {
    // Links and buttons in the hero keep their normal behavior
    if ((e.target as Element).closest('a, button')) return
    dragging = true
    yawVel = 0
    pitchVel = 0
    lastDragX = e.clientX
    lastDragY = e.clientY
    canvas.classList.add('is-grabbing')
    ;(tiltTarget as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect()
    cursorX = e.clientX - rect.left
    cursorY = e.clientY - rect.top

    if (dragging) {
      const dx = e.clientX - lastDragX
      const dy = e.clientY - lastDragY
      lastDragX = e.clientX
      lastDragY = e.clientY
      yaw += dx * DRAG_SENS
      pitch = clampPitch(pitch + dy * DRAG_SENS)
      yawVel = dx * DRAG_SENS
      pitchVel = dy * DRAG_SENS
      // Reduced motion still allows deliberate inspection by drag
      if (!running) draw()
      return
    }

    const nx = (cursorX / rect.width) * 2 - 1
    const ny = (cursorY / rect.height) * 2 - 1
    targetTiltX = nx * TILT_RANGE
    targetTiltY = ny * TILT_RANGE
  }

  const onPointerUp = (): void => {
    dragging = false
    canvas.classList.remove('is-grabbing')
  }

  const onPointerLeave = (): void => {
    dragging = false
    canvas.classList.remove('is-grabbing')
    cursorX = -9999
    cursorY = -9999
    targetTiltX = 0
    targetTiltY = 0
  }

  const onVisibility = (): void => {
    if (document.hidden) stop()
    else applyMotionPreference()
  }

  const onMotionChange = (): void => applyMotionPreference()

  // Repaint with fresh colors when the theme flips
  const themeObserver = new MutationObserver(() => {
    colors = readColors()
    ramp = buildRamp(colors.src, colors.far)
    if (!running) draw()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) draw()
  })
  resizeObserver.observe(canvas)

  const tiltTarget = canvas.closest('[data-hero-tilt]') ?? canvas
  tiltTarget.addEventListener('pointerdown', onPointerDown as EventListener)
  tiltTarget.addEventListener('pointermove', onPointerMove as EventListener)
  tiltTarget.addEventListener('pointerup', onPointerUp)
  tiltTarget.addEventListener('pointercancel', onPointerUp)
  tiltTarget.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibility)
  reduced.addEventListener('change', onMotionChange)

  resize()
  applyMotionPreference()
  if (reduced.matches) renderStatic()

  return () => {
    stop()
    themeObserver.disconnect()
    resizeObserver.disconnect()
    tiltTarget.removeEventListener('pointerdown', onPointerDown as EventListener)
    tiltTarget.removeEventListener('pointermove', onPointerMove as EventListener)
    tiltTarget.removeEventListener('pointerup', onPointerUp)
    tiltTarget.removeEventListener('pointercancel', onPointerUp)
    tiltTarget.removeEventListener('pointerleave', onPointerLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    reduced.removeEventListener('change', onMotionChange)
  }
}
