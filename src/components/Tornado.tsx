// Tornado — 3D Particle Vortex Background Component
// Originkit — Recreated with full Three.js engine
"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

const TAU = Math.PI * 2
const PX_PER_WORLD = 60
const CURVE_SAMPLES = 1024
const STRAND_SEGMENTS = 400
const WOBBLE = 0.008
const FADE_ZONE = 0.15
const FORM_HEIGHT = 10
const BASE_ZOOM = 67

const fovForZoom = (zoom: number) => clamp(2 * BASE_ZOOM - zoom, 1, 175)

const LINE_GLOW_MAX = 1

const DEFAULTS = {
  background: "#000000",
  topRadius: 380,
  waistRadius: 53,
  waistPosition: 50,
  bottomRadius: 1150,
  twist: 3,
  zoom: 75,
  speed: 10,
  direction: "right" as "right" | "left",
  lineOptions: {
    count: 240,
    color: "#00F0FF",
    glow: 10,
  },
  dots: true,
  dotOptions: {
    count: 6000,
    size: 20,
    color: "#A855F7",
    glow: 10,
    flicker: 10,
  },
  comets: true,
  cometOptions: {
    count: 10,
    speed: 6,
    color: "#F97316",
    glow: 8,
    tail: 19,
    delay: 8,
    collide: 6,
  },
  repel: true,
  repelOptions: {
    radius: 60,
    strength: 10,
  },
}

const clamp = (x: number, a: number, b: number) => Math.min(Math.max(x, a), b)

function monotone(points: [number, number][]) {
  const n = points.length
  const slope: number[] = []
  for (let i = 0; i < n - 1; i++) {
    slope[i] = (points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0])
  }
  const m: number[] = [slope[0]]
  for (let i = 1; i < n - 1; i++) {
    m[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2
  }
  m[n - 1] = slope[n - 2]
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(slope[i]) < 1e-12) {
      m[i] = m[i + 1] = 0
      continue
    }
    const a = m[i] / slope[i]
    const b = m[i + 1] / slope[i]
    const s = a * a + b * b
    if (s > 9) {
      const k = 3 / Math.sqrt(s)
      m[i] = k * a * slope[i]
      m[i + 1] = k * b * slope[i]
    }
  }
  return (x: number) => {
    if (x <= points[0][0]) return points[0][1]
    if (x >= points[n - 1][0]) return points[n - 1][1]
    let i = 0
    while (i < n - 2 && points[i + 1][0] < x) i++
    const h = points[i + 1][0] - points[i][0]
    const t = (x - points[i][0]) / h
    const t2 = t * t
    const t3 = t2 * t
    return (
      (2 * t3 - 3 * t2 + 1) * points[i][1] +
      (t3 - 2 * t2 + t) * h * m[i] +
      (-2 * t3 + 3 * t2) * points[i + 1][1] +
      (t3 - t2) * h * m[i + 1]
    )
  }
}

function bake(fn: (x: number) => number) {
  const table = new Float32Array(CURVE_SAMPLES)
  for (let i = 0; i < CURVE_SAMPLES; i++) table[i] = fn(i / (CURVE_SAMPLES - 1))
  return table
}

function sample(table: Float32Array, t: number) {
  if (t <= 0) return table[0]
  const last = table.length - 1
  if (t >= 1) return table[last]
  const x = t * last
  const i = x | 0
  return table[i] + (table[i + 1] - table[i]) * (x - i)
}

function makeShape(cfg: {
  waistAt: number
  floorRadius: number
  crownRadius: number
  waistRadius: number
  twist: number
}) {
  const w = clamp(cfg.waistAt, 0.08, 0.92)
  const floor = cfg.floorRadius
  const crown = cfg.crownRadius
  const turn = cfg.twist * TAU

  const radius = bake(
    monotone([
      [0, floor],
      [0.24 * w, floor * 0.667],
      [0.5 * w, floor * 0.3],
      [0.76 * w, floor * 0.08],
      [w, cfg.waistRadius],
      [w + 0.3 * (1 - w), crown * 0.2],
      [w + 0.6 * (1 - w), crown * 0.44],
      [1, crown],
    ])
  )
  const height = bake(
    monotone([
      [0, 0],
      [0.1, 0.2],
      [0.2, 0.8],
      [0.35, 2],
      [0.5, FORM_HEIGHT * 0.38],
      [0.75, FORM_HEIGHT * 0.7],
      [1, FORM_HEIGHT],
    ])
  )
  const angle = bake(
    monotone([
      [0, 0],
      [0.15, 0.15 * turn],
      [0.25, 0.25 * turn],
      [0.45, 0.55 * turn],
      [0.6, 0.7 * turn],
      [0.8, 0.88 * turn],
      [1, turn],
    ])
  )

  return {
    writePoint(
      out: Float32Array,
      at: number,
      s: number,
      lane: number,
      flow: number,
      wobble: number,
      phase: number,
      time: number
    ) {
      const r = sample(radius, s)
      const y = sample(height, s)
      const a = sample(angle, s) + lane + flow
      const rr = r + Math.sin(s * 25 + phase + time * 0.3) * wobble * r
      out[at] = Math.cos(a) * rr
      out[at + 1] = y
      out[at + 2] = Math.sin(a) * rr
    },
    lane: (i: number, total: number) => (i / total) * TAU,
    sampleRadius: (s: number) => sample(radius, s),
    sampleHeight: (s: number) => sample(height, s),
    sampleAngle: (s: number) => sample(angle, s),
  }
}

export interface TornadoProps {
  background?: string
  topRadius?: number
  waistRadius?: number
  waistPosition?: number
  bottomRadius?: number
  twist?: number
  zoom?: number
  speed?: number
  direction?: "right" | "left"
  lineOptions?: Partial<typeof DEFAULTS.lineOptions>
  dots?: boolean
  dotOptions?: Partial<typeof DEFAULTS.dotOptions>
  comets?: boolean
  cometOptions?: Partial<typeof DEFAULTS.cometOptions>
  repel?: boolean
  repelOptions?: Partial<typeof DEFAULTS.repelOptions>
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

interface StrandDefinition {
  lane: number
  speed: number
  pulse: number
  wobblePhase: number
  from: number
  to: number
  bright: number
  offset: number
  pts: Float32Array
  cols: Float32Array
}

export default function Tornado(props: TornadoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const cfg = {
    ...DEFAULTS,
    ...props,
    lineOptions: { ...DEFAULTS.lineOptions, ...props.lineOptions },
    dotOptions: { ...DEFAULTS.dotOptions, ...props.dotOptions },
    cometOptions: { ...DEFAULTS.cometOptions, ...props.cometOptions },
    repelOptions: { ...DEFAULTS.repelOptions, ...props.repelOptions },
  }

  const liveConfig = useRef({
    crownRadius: cfg.topRadius / PX_PER_WORLD,
    waistRadius: cfg.waistRadius / PX_PER_WORLD,
    waistAt: cfg.waistPosition / 100,
    floorRadius: cfg.bottomRadius / PX_PER_WORLD,
    twist: cfg.twist,
    zoom: cfg.zoom,
    flowSpeed: (cfg.speed / 10) * 0.35,
    flowDir: cfg.direction === "left" ? -1 : 1,
    lineCount: cfg.lineOptions.count,
    lineColor: cfg.lineOptions.color,
    lineGlow: (cfg.lineOptions.glow / 10) * LINE_GLOW_MAX,
    running: true,
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.25

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(fovForZoom(liveConfig.current.zoom), 1, 0.1, 500)
    const group = new THREE.Group()
    scene.add(group)

    const distance = FORM_HEIGHT / 2 / Math.tan((BASE_ZOOM * Math.PI) / 180 / 2)
    const viewDir = new THREE.Vector3(3.4, -0.6, 10).normalize()
    const lookTarget = new THREE.Vector3(0, FORM_HEIGHT / 2, 0)
    camera.position.copy(lookTarget).addScaledVector(viewDir, distance)
    camera.lookAt(lookTarget)

    const shape = makeShape(liveConfig.current)

    // Build Strands
    const count = Math.max(3, Math.round(liveConfig.current.lineCount))
    const segs = STRAND_SEGMENTS - 1
    const verts = count * segs * 2
    const strandPos = new Float32Array(verts * 3)
    const strandCol = new Float32Array(verts * 3)
    const strandGeo = new THREE.BufferGeometry()
    strandGeo.setAttribute("position", new THREE.BufferAttribute(strandPos, 3).setUsage(THREE.DynamicDrawUsage))
    strandGeo.setAttribute("color", new THREE.BufferAttribute(strandCol, 3).setUsage(THREE.DynamicDrawUsage))

    const strandMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const strandLines = new THREE.LineSegments(strandGeo, strandMat)
    strandLines.frustumCulled = false
    group.add(strandLines)

    const strands: StrandDefinition[] = []
    for (let i = 0; i < count; i++) {
      strands.push({
        lane: shape.lane(i, count),
        speed: 0.95 + Math.random() * 0.1,
        pulse: Math.random() * TAU,
        wobblePhase: Math.random() * TAU,
        from: 0,
        to: 1,
        bright: 0.5,
        offset: i * segs * 2 * 3,
        pts: new Float32Array(STRAND_SEGMENTS * 3),
        cols: new Float32Array(STRAND_SEGMENTS * 3),
      })
    }

    const updateSize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(container)

    let flow = 0
    let lastTime = performance.now()
    let frameId = 0
    const tintStrand = new THREE.Color(liveConfig.current.lineColor)

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop)
      const dt = Math.min((now - lastTime) / 1000, 0.04)
      lastTime = now

      flow += dt * liveConfig.current.flowSpeed

      for (const strand of strands) {
        const spin = flow * strand.speed
        const bright = strand.bright * liveConfig.current.lineGlow
        const lift = 0.15 + bright * 1.5
        const alpha = Math.min(bright * 0.5 * (0.9 + 0.1 * Math.sin(now * 0.001 * 0.18 + strand.pulse)), 0.7)
        const { pts, cols } = strand

        for (let i = 0; i < STRAND_SEGMENTS; i++) {
          const u = i / (STRAND_SEGMENTS - 1)
          const s = strand.from + u * (strand.to - strand.from)
          const at = i * 3
          shape.writePoint(pts, at, s, strand.lane, spin, WOBBLE, strand.wobblePhase, now * 0.001)

          let edge = 1
          if (u < FADE_ZONE) {
            const k = u / FADE_ZONE
            edge = k * k
          } else if (u > 1 - FADE_ZONE) {
            const k = (1 - u) / FADE_ZONE
            edge = k * k
          }
          const v = edge * lift * alpha
          cols[at] = tintStrand.r * v
          cols[at + 1] = tintStrand.g * v
          cols[at + 2] = tintStrand.b * v
        }

        let w = strand.offset
        for (let i = 0; i < STRAND_SEGMENTS - 1; i++) {
          const a = i * 3
          const b = (i + 1) * 3
          strandPos[w] = pts[a]
          strandPos[w + 1] = pts[a + 1]
          strandPos[w + 2] = pts[a + 2]
          strandCol[w] = cols[a]
          strandCol[w + 1] = cols[a + 1]
          strandCol[w + 2] = cols[a + 2]
          w += 3
          strandPos[w] = pts[b]
          strandPos[w + 1] = pts[b + 1]
          strandPos[w + 2] = pts[b + 2]
          strandCol[w] = cols[b]
          strandCol[w + 1] = cols[b + 1]
          strandCol[w + 2] = cols[b + 2]
          w += 3
        }
      }

      strandGeo.attributes.position.needsUpdate = true
      strandGeo.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
      strandGeo.dispose()
      strandMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="3D Tornado Particle Vortex"
      className={`relative w-full h-full min-w-[120px] min-h-[120px] overflow-hidden ${props.className || ""}`}
      style={{ position: "relative", width: "100%", height: "100%", ...props.style }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {props.children && <div className="relative z-10 w-full h-full pointer-events-none">{props.children}</div>}
    </div>
  )
}
