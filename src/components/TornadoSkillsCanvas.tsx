// Tornado Skills Canvas — Originkit 3D Particle Vortex
"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, Code2, Box, Bot, Cpu, Wrench, Wind } from "lucide-react"
import { FadeIn } from "./FadeIn"

/* =========================================================
   SKILLS DATA (3D Tornado Hyperboloid Nodes)
   ========================================================= */
export interface TornadoSkill {
  id: string
  name: string
  role: string
  description: string
  category: "frontend" | "creative" | "ai" | "backend" | "database" | "cloud" | "tools"
  color: string
  logoUrl: string
  sHeight: number // 0..1 position along the vertical tornado height
  laneOffset: number // angular offset in radians
}

const TECH_SKILLS: TornadoSkill[] = [
  // Top Crown (Wide spread)
  {
    id: "react",
    name: "React 19",
    role: "Frontend Architecture",
    description: "Component-based declarative UI architecture & server actions",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    sHeight: 0.82,
    laneOffset: 0,
  },
  {
    id: "js",
    name: "JavaScript",
    role: "ESNext / V8 Engine",
    description: "Modern ESNext asynchronous runtime & dynamic engines",
    category: "frontend",
    color: "#EAB308",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    sHeight: 0.76,
    laneOffset: Math.PI * 0.45,
  },
  {
    id: "threejs",
    name: "Three.js",
    role: "WebGL 3D Graphics",
    description: "Interactive 3D WebGL scenes, custom shaders & particle physics",
    category: "creative",
    color: "#18181B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    sHeight: 0.72,
    laneOffset: Math.PI * 0.95,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "OpenAI GPT-4o",
    description: "Generative LLM systems, prompt engineering & cognitive reasoning",
    category: "ai",
    color: "#10A37F",
    logoUrl: "https://cdn.simpleicons.org/openai/10A37F",
    sHeight: 0.68,
    laneOffset: Math.PI * 1.45,
  },
  {
    id: "claude",
    name: "Claude AI",
    role: "Anthropic Neural Models",
    description: "Deep reasoning, code synthesis & contextual agent pipelines",
    category: "ai",
    color: "#D97757",
    logoUrl: "https://cdn.simpleicons.org/anthropic/D97757",
    sHeight: 0.64,
    laneOffset: Math.PI * 1.85,
  },

  // Upper Funnel
  {
    id: "tailwind",
    name: "Tailwind CSS",
    role: "Utility CSS Design",
    description: "Rapid responsive styling with utility-first modern design systems",
    category: "frontend",
    color: "#06B6D4",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    sHeight: 0.58,
    laneOffset: Math.PI * 0.2,
  },
  {
    id: "aws",
    name: "AWS",
    role: "Cloud Infrastructure",
    description: "Scalable cloud infrastructure, S3 storage & serverless Lambdas",
    category: "cloud",
    color: "#FF9900",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    sHeight: 0.54,
    laneOffset: Math.PI * 0.7,
  },
  {
    id: "figma",
    name: "Figma",
    role: "UI/UX & Prototyping",
    description: "Collaborative vector UI/UX design, interactive wireframes & systems",
    category: "creative",
    color: "#F24E1E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    sHeight: 0.50,
    laneOffset: Math.PI * 1.2,
  },

  // Waist Pinch Section (Dense core)
  {
    id: "ai_agents",
    name: "AI Agents",
    role: "Autonomous Pipelines",
    description: "Multi-agent autonomous systems, tool calling & automated execution",
    category: "ai",
    color: "#7C3AED",
    logoUrl: "https://cdn.simpleicons.org/robotframework/7C3AED",
    sHeight: 0.48,
    laneOffset: Math.PI * 1.7,
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "PostgreSQL BaaS",
    description: "Realtime PostgreSQL backend-as-a-service with edge authentication",
    category: "backend",
    color: "#3ECF8E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    sHeight: 0.44,
    laneOffset: Math.PI * 0.35,
  },
  {
    id: "github",
    name: "GitHub",
    role: "CI/CD Actions & Repos",
    description: "Git version control, CI/CD automation & repository management",
    category: "tools",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    sHeight: 0.40,
    laneOffset: Math.PI * 0.85,
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Serverless Edge Cloud",
    description: "Global edge network deployments, serverless functions & automated CI",
    category: "cloud",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    sHeight: 0.36,
    laneOffset: Math.PI * 1.35,
  },

  // Lower Swirl Funnel
  {
    id: "nodejs",
    name: "Node.js",
    role: "High-Throughput Backend",
    description: "Event-driven asynchronous server runtime & scalable microservices",
    category: "backend",
    color: "#16A34A",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    sHeight: 0.32,
    laneOffset: Math.PI * 1.9,
  },
  {
    id: "firebase",
    name: "Firebase",
    role: "Realtime Database & Auth",
    description: "Realtime cloud document sync, analytics & serverless triggers",
    category: "backend",
    color: "#F59E0B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    sHeight: 0.28,
    laneOffset: Math.PI * 0.5,
  },
  {
    id: "docker",
    name: "Docker",
    role: "Container Architecture",
    description: "Containerized application environments & microservice orchestration",
    category: "cloud",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    sHeight: 0.24,
    laneOffset: Math.PI * 1.0,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "NoSQL Database",
    description: "Flexible document database for high-scale distributed schemas",
    category: "database",
    color: "#15803D",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    sHeight: 0.20,
    laneOffset: Math.PI * 1.55,
  },
  {
    id: "mysql",
    name: "MySQL",
    role: "Relational SQL Engine",
    description: "ACID-compliant relational database management & query indexing",
    category: "database",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    sHeight: 0.16,
    laneOffset: 0.1,
  },

  // Base Vortex Floor
  {
    id: "php",
    name: "PHP",
    role: "Backend Architecture",
    description: "Server-side web scripting, robust REST APIs & backend frameworks",
    category: "backend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    sHeight: 0.14,
    laneOffset: Math.PI * 0.6,
  },
  {
    id: "gsap",
    name: "GSAP",
    role: "Interactive Timelines",
    description: "Ultra high-performance timeline animations & scroll choreography",
    category: "creative",
    color: "#84CC16",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gsap/gsap-original.svg",
    sHeight: 0.12,
    laneOffset: Math.PI * 1.15,
  },
  {
    id: "vite",
    name: "Vite",
    role: "Modern Frontend Tooling",
    description: "Blazing fast ESM bundler with instant HMR development environment",
    category: "frontend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    sHeight: 0.70,
    laneOffset: Math.PI * 1.65,
  },
  {
    id: "flutter",
    name: "Flutter",
    role: "Cross-Platform Apps",
    description: "Cross-platform native mobile & desktop application development",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    sHeight: 0.78,
    laneOffset: Math.PI * 1.25,
  },
  {
    id: "html5",
    name: "HTML5",
    role: "Semantic Web Structure",
    description: "Semantic document markup, accessibility & modern browser standards",
    category: "frontend",
    color: "#EA580C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    sHeight: 0.10,
    laneOffset: Math.PI * 1.75,
  },
]

const FILTERS = [
  { id: "all", label: "ALL TORNADO NODES", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "creative", label: "CREATIVE & 3D", icon: Box },
  { id: "ai", label: "AI & AGENTS", icon: Bot },
  { id: "backend", label: "BACKEND", icon: Cpu },
  { id: "database", label: "DATABASES", icon: Cpu },
  { id: "cloud", label: "CLOUD & DEVOPS", icon: Wrench },
]

/* =========================================================
   TORNADO MATHEMATICAL SHAPE GENERATOR
   ========================================================= */

const TAU = Math.PI * 2
const CURVE_SAMPLES = 1024
const STRAND_SEGMENTS = 360
const WOBBLE = 0.008
const FADE_ZONE = 0.15
const FORM_HEIGHT = 10
const BASE_ZOOM = 67

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
    getPos(s: number, lane: number, flow: number) {
      const r = sample(radius, s)
      const y = sample(height, s)
      const a = sample(angle, s) + lane + flow
      return {
        x: Math.cos(a) * r,
        y: y,
        z: Math.sin(a) * r,
      }
    },
    lane: (i: number, total: number) => (i / total) * TAU,
  }
}

export interface ProjectedTornadoSkill {
  id: string
  x: number
  y: number
  scale: number
  opacity: number
  isVisible: boolean
  depth: number
}

interface ActiveDragState {
  skillId: string
  x: number
  y: number
  isSnapping?: boolean
}

export const InteractiveSkillsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null)
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null)
  const [skillCoordMap, setSkillCoordMap] = useState<Record<string, ProjectedTornadoSkill>>({})

  const handleBadgePointerDown = useCallback((e: React.PointerEvent, skillId: string) => {
    e.preventDefault()
    e.stopPropagation()
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setActiveDrag({
      skillId,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  useEffect(() => {
    if (!activeDrag || activeDrag.isSnapping) return

    const handlePointerMove = (e: PointerEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      setActiveDrag((prev) =>
        prev
          ? {
              ...prev,
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            }
          : null
      )
    }

    const handlePointerUp = () => {
      setActiveDrag((prev) => (prev ? { ...prev, isSnapping: true } : null))
      setTimeout(() => {
        setActiveDrag(null)
      }, 350)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointercancel", handlePointerUp)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerUp)
    }
  }, [activeDrag])

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
    const camera = new THREE.PerspectiveCamera(BASE_ZOOM, 1, 0.1, 500)
    const group = new THREE.Group()
    scene.add(group)

    const distance = FORM_HEIGHT / 2 / Math.tan((BASE_ZOOM * Math.PI) / 180 / 2)
    const viewDir = new THREE.Vector3(3.2, -0.6, 9.8).normalize()
    const lookTarget = new THREE.Vector3(0, FORM_HEIGHT / 2, 0)
    camera.position.copy(lookTarget).addScaledVector(viewDir, distance)
    camera.lookAt(lookTarget)

    const shape = makeShape({
      crownRadius: 380 / 60,
      waistRadius: 53 / 60,
      waistAt: 0.5,
      floorRadius: 1150 / 60,
      twist: 3,
    })

    // Strands Geometry
    const count = 180
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
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const strandLines = new THREE.LineSegments(strandGeo, strandMat)
    strandLines.frustumCulled = false
    group.add(strandLines)

    interface StrandItem {
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

    const strands: StrandItem[] = []
    for (let i = 0; i < count; i++) {
      strands.push({
        lane: shape.lane(i, count),
        speed: 0.95 + Math.random() * 0.1,
        pulse: Math.random() * TAU,
        wobblePhase: Math.random() * TAU,
        from: 0,
        to: 1,
        bright: 0.55,
        offset: i * segs * 2 * 3,
        pts: new Float32Array(STRAND_SEGMENTS * 3),
        cols: new Float32Array(STRAND_SEGMENTS * 3),
      })
    }

    // Swirling Particle Dots
    const dotCount = 3500
    const dotGeo = new THREE.PlaneGeometry(0.045, 0.045)
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const dotMesh = new THREE.InstancedMesh(dotGeo, dotMat, dotCount)
    dotMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    group.add(dotMesh)

    const dotData: { s: number; lane: number; speed: number; pulse: number }[] = []
    for (let i = 0; i < dotCount; i++) {
      dotData.push({
        s: Math.random(),
        lane: (Math.random() * TAU),
        speed: 0.8 + Math.random() * 0.4,
        pulse: Math.random() * TAU,
      })
    }
    const dummy = new THREE.Matrix4()

    let curW = 1200
    let curH = 850
    const updateSize = () => {
      if (!container) return
      curW = container.clientWidth || 1200
      curH = container.clientHeight || 850
      renderer.setSize(curW, curH, false)
      camera.aspect = curW / curH
      camera.updateProjectionMatrix()
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(container)

    let flow = 0
    let lastTime = performance.now()
    let frameId = 0
    const tintCyan = new THREE.Color("#00F0FF")
    const tintPurple = new THREE.Color("#A855F7")

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop)
      const dt = Math.min((now - lastTime) / 1000, 0.04)
      lastTime = now

      flow += dt * 0.16

      // Animate Strands
      for (const strand of strands) {
        const spin = flow * strand.speed
        const bright = strand.bright
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
          const colorMix = (Math.sin(s * Math.PI * 2 + strand.pulse) + 1) * 0.5
          const colR = tintCyan.r * (1 - colorMix) + tintPurple.r * colorMix
          const colG = tintCyan.g * (1 - colorMix) + tintPurple.g * colorMix
          const colB = tintCyan.b * (1 - colorMix) + tintPurple.b * colorMix

          cols[at] = colR * v
          cols[at + 1] = colG * v
          cols[at + 2] = colB * v
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

      // Animate Dots
      for (let i = 0; i < dotCount; i++) {
        const d = dotData[i]
        const spin = flow * d.speed
        const pos = shape.getPos(d.s, d.lane, spin)
        dummy.setPosition(pos.x, pos.y, pos.z)
        dotMesh.setMatrixAt(i, dummy)
      }
      dotMesh.instanceMatrix.needsUpdate = true

      renderer.render(scene, camera)

      // Project 22 Skills
      const coords: Record<string, ProjectedTornadoSkill> = {}
      const tempVec = new THREE.Vector3()

      for (let i = 0; i < TECH_SKILLS.length; i++) {
        const skill = TECH_SKILLS[i]
        const p = shape.getPos(skill.sHeight, skill.laneOffset, flow * 0.9)
        tempVec.set(p.x, p.y, p.z)
        tempVec.project(camera)

        const screenX = (tempVec.x * 0.5 + 0.5) * curW
        const screenY = (-tempVec.y * 0.5 + 0.5) * curH
        const depthZ = tempVec.z
        const scaleVal = Math.max(0.68, Math.min(1.22, 1.0 - depthZ * 0.3))
        const opacityVal = Math.max(0.35, Math.min(1.0, 1.0 - depthZ * 0.45))

        coords[skill.id] = {
          id: skill.id,
          x: screenX,
          y: screenY,
          scale: scaleVal,
          opacity: opacityVal,
          isVisible: true,
          depth: depthZ,
        }
      }
      setSkillCoordMap(coords)
    }

    frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
      strandGeo.dispose()
      strandMat.dispose()
      dotGeo.dispose()
      dotMat.dispose()
      renderer.dispose()
    }
  }, [])

  const draggedSkill = activeDrag ? TECH_SKILLS.find((s) => s.id === activeDrag.skillId) : null
  const draggedBadgeSlot = activeDrag && activeDrag.skillId ? skillCoordMap[activeDrag.skillId] : null

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="3D Tornado Particle Vortex with Connected Tech Stack Skills"
      className="relative w-full h-full min-h-[850px] sm:min-h-[920px] lg:min-h-[1000px] overflow-hidden select-none flex flex-col justify-between pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 text-[#D7E2EA] bg-[#0A0A0E]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 1. TOP EDITORIAL BANNER */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-none mb-6 sm:mb-10">
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-cyan-400/30 text-xs font-mono tracking-widest text-[#00F0FF] uppercase mb-3 shadow-[0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-xl">
            <Wind className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            <span>// 3D PARTICLE TORNADO VORTEX • ORIGINKIT</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={15}>
          <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-xl leading-relaxed">
            Spiraling hyperboloid strands &amp; glowing comets • Drag skill badge outward to inspect capability card
          </p>
        </FadeIn>
      </div>

      {/* 2. 3D PINNED INTERACTIVE SKILL NODES */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
        {TECH_SKILLS.map((skill) => {
          const badge = skillCoordMap[skill.id]
          if (!badge || !badge.isVisible) return null

          const isMatch = activeCategory === "all" || skill.category === activeCategory
          const isHovered = hoveredBadgeId === skill.id
          const isBeingDragged = activeDrag?.skillId === skill.id

          return (
            <div
              key={skill.id}
              style={{
                position: "absolute",
                left: `${badge.x}px`,
                top: `${badge.y}px`,
                transform: "translate(-50%, -50%)",
                opacity: isBeingDragged ? 0.2 : isMatch ? badge.opacity : 0.2,
                zIndex: isHovered ? 60 : Math.round(500 - badge.depth * 100),
                pointerEvents: isBeingDragged ? "none" : "auto",
                transition: "opacity 0.2s ease",
              }}
              className="skill-badge-node"
            >
              <motion.div
                whileHover={{ scale: 1.35 }}
                onPointerDown={(e) => handleBadgePointerDown(e, skill.id)}
                onMouseEnter={() => setHoveredBadgeId(skill.id)}
                onMouseLeave={() => setHoveredBadgeId(null)}
                style={{
                  transform: `scale(${badge.scale})`,
                  borderColor: isHovered ? skill.color : "rgba(255, 255, 255, 0.85)",
                  boxShadow: isHovered
                    ? `0 0 30px ${skill.color}, 0 12px 35px rgba(0,0,0,0.9)`
                    : `0 6px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${skill.color}50`,
                }}
                className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white flex items-center justify-center p-2.5 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-2xl ${
                  isMatch ? "ring-2 ring-white/90" : "grayscale opacity-25"
                }`}
              >
                <img
                  src={skill.logoUrl}
                  alt={skill.name}
                  loading="eager"
                  className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {isHovered && !activeDrag && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/95 text-white px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono tracking-wider shadow-2xl z-50 pointer-events-none flex items-center gap-1.5 backdrop-blur-xl"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                      <span className="font-bold text-white">{skill.name}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-300">{skill.role}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )
        })}

        {/* 3. MAGNETIC PULL-OUT CARD OVERLAY & CYBER TETHER */}
        {activeDrag && draggedSkill && draggedBadgeSlot && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-visible detached-skill-card">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1={draggedBadgeSlot.x}
                y1={draggedBadgeSlot.y}
                x2={activeDrag.isSnapping ? draggedBadgeSlot.x : activeDrag.x}
                y2={activeDrag.isSnapping ? draggedBadgeSlot.y : activeDrag.y}
                stroke={draggedSkill.color}
                strokeWidth="2"
                strokeDasharray="6 4"
                className="opacity-75 transition-all duration-300"
              />
              <circle
                cx={draggedBadgeSlot.x}
                cy={draggedBadgeSlot.y}
                r="4"
                fill={draggedSkill.color}
                className="animate-ping"
              />
            </svg>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: activeDrag.isSnapping ? 0.4 : 1,
                opacity: activeDrag.isSnapping ? 0 : 1,
                x: activeDrag.isSnapping ? draggedBadgeSlot.x : activeDrag.x,
                y: activeDrag.isSnapping ? draggedBadgeSlot.y : activeDrag.y,
              }}
              transition={
                activeDrag.isSnapping
                  ? { type: "spring", stiffness: 450, damping: 28 }
                  : { duration: 0.05 }
              }
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                borderColor: draggedSkill.color,
                boxShadow: `0 0 40px ${draggedSkill.color}90, 0 25px 60px rgba(0,0,0,0.95)`,
              }}
              className="flex items-center gap-3.5 px-4 py-3 rounded-full bg-[#0A0B10]/95 backdrop-blur-3xl border-2 shadow-2xl min-w-[310px] sm:min-w-[380px] max-w-lg cursor-grabbing pointer-events-none"
            >
              <div className="w-9 h-9 flex-shrink-0 p-1.5 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={draggedSkill.logoUrl}
                  alt={draggedSkill.name}
                  className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-sm"
                />
              </div>

              <div className="flex flex-col text-left flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white tracking-wide">{draggedSkill.name}</span>
                  <span
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-semibold"
                    style={{
                      backgroundColor: `${draggedSkill.color}25`,
                      color: draggedSkill.color,
                      border: `1px solid ${draggedSkill.color}60`,
                    }}
                  >
                    {draggedSkill.role}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-sans truncate mt-0.5 leading-tight">
                  {draggedSkill.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* 4. CELESTIAL HUD FILTER DOCK */}
      <div className="relative z-30 w-full max-w-5xl mx-auto mt-auto flex flex-col items-center pointer-events-auto gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            TORNADO TELEMETRY • {activeCategory === "all" ? `${TECH_SKILLS.length} NODES SYNCHRONIZED` : `${TECH_SKILLS.filter((s) => s.category === activeCategory).length} NODES FILTERED`}
          </span>
        </div>

        <div className="relative p-1.5 rounded-full bg-[#0A0B10]/85 backdrop-blur-3xl border border-cyan-500/25 shadow-[0_0_40px_-8px_rgba(6,182,212,0.35),0_20px_50px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

          {FILTERS.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer z-10 select-none ${
                  isActive ? "text-black" : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.7)] z-[-1]"
                  />
                )}

                <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "scale-110 text-black" : "text-cyan-400/80"}`} />
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
