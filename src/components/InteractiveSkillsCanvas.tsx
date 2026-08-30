// Particle Saturn — Originkit with Magnetic Pull-Out Skill Cards
// Originkit — props baked into the default export.
"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Layers, Code2, Box, Bot, Cpu, Wrench } from "lucide-react"
import { FadeIn } from "./FadeIn"

/* =========================================================
   SKILLS DATA (With 1-Line Descriptions for Drag Cards)
   ========================================================= */
export interface RingSkill {
  id: string
  name: string
  role: string
  description: string
  category: "frontend" | "creative" | "ai" | "backend" | "database" | "cloud" | "tools"
  color: string
  logoUrl: string
  radiusFactor: number
  initialAngle: number
}

const TECH_SKILLS: RingSkill[] = [
  // Inner Ring Band
  {
    id: "react",
    name: "React 19",
    role: "Frontend UI Architecture",
    description: "Component-based declarative UI architecture & server actions",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "/assets/skills/react.svg",
    radiusFactor: 0.12,
    initialAngle: 0,
  },
  {
    id: "js",
    name: "JavaScript",
    role: "ESNext / V8 Engine",
    description: "Modern ESNext asynchronous runtime & high-performance logic",
    category: "frontend",
    color: "#EAB308",
    logoUrl: "/assets/skills/js.svg",
    radiusFactor: 0.18,
    initialAngle: (Math.PI * 2) / 8,
  },
  {
    id: "threejs",
    name: "Three.js",
    role: "WebGL 3D Graphics",
    description: "Interactive 3D WebGL scenes, custom shaders & particle physics",
    category: "creative",
    color: "#18181B",
    logoUrl: "/assets/skills/threejs.svg",
    radiusFactor: 0.25,
    initialAngle: (Math.PI * 4) / 8,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "OpenAI GPT-4o",
    description: "Generative LLM systems, prompt engineering & cognitive workflows",
    category: "ai",
    color: "#10A37F",
    logoUrl: "/assets/skills/chatgpt.svg",
    radiusFactor: 0.22,
    initialAngle: (Math.PI * 6) / 8,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    role: "Utility CSS Design",
    description: "Rapid responsive styling with utility-first modern design systems",
    category: "frontend",
    color: "#06B6D4",
    logoUrl: "/assets/skills/tailwind.svg",
    radiusFactor: 0.28,
    initialAngle: (Math.PI * 8) / 8,
  },
  {
    id: "nodejs",
    name: "Node.js",
    role: "High-Throughput Backend",
    description: "Event-driven asynchronous server runtime & scalable microservices",
    category: "backend",
    color: "#16A34A",
    logoUrl: "/assets/skills/nodejs.svg",
    radiusFactor: 0.15,
    initialAngle: (Math.PI * 10) / 8,
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "PostgreSQL BaaS",
    description: "Realtime PostgreSQL backend-as-a-service with edge authentication",
    category: "backend",
    color: "#3ECF8E",
    logoUrl: "/assets/skills/supabase.svg",
    radiusFactor: 0.2,
    initialAngle: (Math.PI * 12) / 8,
  },
  {
    id: "figma",
    name: "Figma",
    role: "UI/UX & Prototyping",
    description: "Collaborative vector UI/UX design, interactive wireframes & systems",
    category: "creative",
    color: "#F24E1E",
    logoUrl: "/assets/skills/figma.svg",
    radiusFactor: 0.26,
    initialAngle: (Math.PI * 14) / 8,
  },

  // Mid Ring Band
  {
    id: "claude",
    name: "Claude AI",
    role: "Anthropic Neural Models",
    description: "Deep reasoning, code synthesis & contextual agent pipelines",
    category: "ai",
    color: "#D97757",
    logoUrl: "/assets/skills/claude.svg",
    radiusFactor: 0.45,
    initialAngle: 0.4,
  },
  {
    id: "aws",
    name: "AWS",
    role: "Cloud Infrastructure",
    description: "Scalable cloud infrastructure, S3 storage & serverless Lambdas",
    category: "cloud",
    color: "#FF9900",
    logoUrl: "/assets/skills/aws.svg",
    radiusFactor: 0.5,
    initialAngle: 1.2,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "NoSQL Database",
    description: "Flexible document database for high-scale distributed schemas",
    category: "database",
    color: "#15803D",
    logoUrl: "/assets/skills/mongodb.svg",
    radiusFactor: 0.55,
    initialAngle: 2.0,
  },
  {
    id: "docker",
    name: "Docker",
    role: "Container Architecture",
    description: "Containerized application environments & microservice orchestration",
    category: "cloud",
    color: "#0284C7",
    logoUrl: "/assets/skills/docker.svg",
    radiusFactor: 0.48,
    initialAngle: 2.8,
  },
  {
    id: "html5",
    name: "HTML5",
    role: "Semantic Web Structure",
    description: "Semantic document markup, accessibility & modern browser standards",
    category: "frontend",
    color: "#EA580C",
    logoUrl: "/assets/skills/html5.svg",
    radiusFactor: 0.52,
    initialAngle: 3.6,
  },
  {
    id: "mysql",
    name: "MySQL",
    role: "Relational SQL Engine",
    description: "ACID-compliant relational database management & query indexing",
    category: "database",
    color: "#0284C7",
    logoUrl: "/assets/skills/mysql.svg",
    radiusFactor: 0.46,
    initialAngle: 4.4,
  },
  {
    id: "ai_agents",
    name: "AI Agents",
    role: "Autonomous Agentic Pipelines",
    description: "Multi-agent autonomous systems, tool calling & automated execution",
    category: "ai",
    color: "#7C3AED",
    logoUrl: "/assets/skills/ai_agents.svg",
    radiusFactor: 0.56,
    initialAngle: 5.2,
  },
  {
    id: "firebase",
    name: "Firebase",
    role: "Realtime Database & Auth",
    description: "Realtime cloud document sync, analytics & serverless triggers",
    category: "backend",
    color: "#F59E0B",
    logoUrl: "/assets/skills/firebase.svg",
    radiusFactor: 0.53,
    initialAngle: 5.9,
  },

  // Outer Ring Band
  {
    id: "gsap",
    name: "GSAP",
    role: "Interactive Timelines",
    description: "Ultra high-performance timeline animations & scroll choreography",
    category: "creative",
    color: "#84CC16",
    logoUrl: "/assets/skills/gsap.svg",
    radiusFactor: 0.78,
    initialAngle: 0.2,
  },
  {
    id: "github",
    name: "GitHub",
    role: "CI/CD Actions & Repos",
    description: "Git version control, CI/CD automation & repository management",
    category: "tools",
    color: "#181717",
    logoUrl: "/assets/skills/github.svg",
    radiusFactor: 0.84,
    initialAngle: 1.1,
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Serverless Edge Cloud",
    description: "Global edge network deployments, serverless functions & automated CI",
    category: "cloud",
    color: "#181717",
    logoUrl: "/assets/skills/vercel.svg",
    radiusFactor: 0.8,
    initialAngle: 2.1,
  },
  {
    id: "php",
    name: "PHP",
    role: "Backend Architecture",
    description: "Server-side web scripting, robust REST APIs & backend frameworks",
    category: "backend",
    color: "#6366F1",
    logoUrl: "/assets/skills/php.svg",
    radiusFactor: 0.86,
    initialAngle: 3.1,
  },
  {
    id: "vite",
    name: "Vite",
    role: "Modern Frontend Tooling",
    description: "Blazing fast ESM bundler with instant HMR development environment",
    category: "frontend",
    color: "#6366F1",
    logoUrl: "/assets/skills/vite.svg",
    radiusFactor: 0.82,
    initialAngle: 4.1,
  },
  {
    id: "flutter",
    name: "Flutter",
    role: "Cross-Platform Mobile/Web",
    description: "Cross-platform native mobile & desktop application development",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "/assets/skills/flutter.svg",
    radiusFactor: 0.88,
    initialAngle: 5.1,
  },
]

const FILTERS = [
  { id: "all", label: "ALL ORBITS", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "creative", label: "CREATIVE & 3D", icon: Box },
  { id: "ai", label: "AI & AGENTS", icon: Bot },
  { id: "backend", label: "BACKEND", icon: Cpu },
  { id: "database", label: "DATABASES", icon: Cpu },
  { id: "cloud", label: "CLOUD & DEVOPS", icon: Wrench },
]

/* =========================================================
   ORIGINKIT PARTICLE SATURN ENGINE
   ========================================================= */

const PERSPECTIVE = 0.15
const VIEW_SPAN = 6.4
const CORE_RADIUS = 1
const MAX_MOTES = 85000
const RING_THICKNESS = 0.012
const RING_MOTE_FACTOR = 1.35

const DEFAULTS = {
  coreColor: "#60A5FA",
  ringColor: "#00E5FF",
  density: 16,
  particleSize: 14,
  glow: 18,
  tilt: 8,
  roll: 10,
  spinSpeed: 6,
  ringOptions: {
    defaultValue: { gaps: 2, orbitSpeed: 8, innerRadius: 135, outerRadius: 260 },
    innerRadius: 135,
    outerRadius: 260,
    gaps: 2,
    orbitSpeed: 8,
  },
  dragSensitivity: 2,
  sizePercent: 125,
}

type RingOptions = {
  innerRadius: number
  outerRadius: number
  gaps: number
  orbitSpeed: number
}

type Config = {
  coreColor: string
  ringColor: string
  density: number
  particleSize: number
  glow: number
  tilt: number
  roll: number
  spinSpeed: number
  ringOptions: RingOptions
  dragSensitivity: number
  sizePercent: number
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
  const n = typeof v === "number" && isFinite(v) ? v : fallback
  return Math.max(lo, Math.min(hi, n))
}

function settingsFor(cfg: Config) {
  const ring = cfg.ringOptions ?? DEFAULTS.ringOptions
  const density = clamp(cfg.density, 1, 20, DEFAULTS.density)
  const baseMotes = 500 + density * density * 75
  const coreMotes = Math.min(MAX_MOTES, Math.round(baseMotes))
  const ringMotes = Math.min(MAX_MOTES, Math.round(baseMotes * RING_MOTE_FACTOR))

  const innerFraction = clamp(ring.innerRadius, 105, 200, DEFAULTS.ringOptions.innerRadius) / 100
  const outerFraction = clamp(ring.outerRadius, 110, 300, DEFAULTS.ringOptions.outerRadius) / 100

  return {
    coreMotes,
    ringMotes,
    moteSize: 0.5 + clamp(cfg.particleSize, 1, 20, DEFAULTS.particleSize) * 0.12,
    glow: 0.15 + clamp(cfg.glow, 1, 20, DEFAULTS.glow) * 0.05,
    tiltRadians: (clamp(cfg.tilt, -80, 80, DEFAULTS.tilt) * Math.PI) / 180,
    rollRadians: (clamp(cfg.roll, -90, 90, DEFAULTS.roll) * Math.PI) / 180,
    spinRate: clamp(cfg.spinSpeed, 0, 20, DEFAULTS.spinSpeed) * 0.04,
    innerRadius: innerFraction * CORE_RADIUS,
    outerRadius: Math.max(innerFraction + 0.08, outerFraction) * CORE_RADIUS,
    gapCount: Math.round(clamp(ring.gaps, 0, 4, DEFAULTS.ringOptions.gaps)),
    ringThickness: RING_THICKNESS,
    orbitRate: clamp(ring.orbitSpeed, 0, 20, DEFAULTS.ringOptions.orbitSpeed) * 0.1,
  }
}

type Settings = ReturnType<typeof settingsFor>

function insideGap(S: Settings, radius: number, span: number): boolean {
  for (let g = 0; g < S.gapCount; g++) {
    const centre = S.innerRadius + span * ((g + 1) / (S.gapCount + 1))
    const halfWidth = span * (0.075 - g * 0.011)
    if (Math.abs(radius - centre) < halfWidth) return true
  }
  return false
}

function pickRingRadius(S: Settings, span: number): number {
  for (let attempt = 0; attempt < 10; attempt++) {
    const u = Math.sqrt(Math.random())
    const radius = S.innerRadius + u * span
    if (!insideGap(S, radius, span)) return radius
  }
  return S.outerRadius
}

function buildCloud(S: Settings): THREE.BufferGeometry {
  const count = S.coreMotes + S.ringMotes
  const position = new Float32Array(count * 3)
  const kind = new Float32Array(count)
  const along = new Float32Array(count)
  const seed = new Float32Array(count)
  const radius = new Float32Array(count)

  for (let i = 0; i < S.coreMotes; i++) {
    kind[i] = 0
    along[i] = (i + 0.5) / S.coreMotes
    seed[i] = Math.random()
    radius[i] = 0
  }

  const span = S.outerRadius - S.innerRadius
  for (let i = 0; i < S.ringMotes; i++) {
    const k = S.coreMotes + i
    kind[k] = 1
    along[k] = i / Math.max(1, S.ringMotes - 1)
    seed[k] = Math.random()
    radius[k] = pickRingRadius(S, span)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3))
  geometry.setAttribute("aKind", new THREE.BufferAttribute(kind, 1))
  geometry.setAttribute("aAlong", new THREE.BufferAttribute(along, 1))
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1))
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radius, 1))
  return geometry
}

const SATURN_VERTEX = /* glsl */ `
    attribute float aKind;
    attribute float aAlong;
    attribute float aSeed;
    attribute float aRadius;

    uniform float uTime;
    uniform float uMoteSize;
    uniform float uOrbitRate;
    uniform float uRingThickness;
    uniform float uCoreRadius;
    uniform float uPixelRatio;

    varying float vKind;
    varying float vBright;

    const float TAU = 6.28318530718;

    float hash11(float n) {
        return fract(sin(n * 78.233) * 43758.5453);
    }

    void main() {
        vec3 modelPos;
        float bright = 1.0;

        if (aKind < 0.5) {
            float y = 1.0 - aAlong * 2.0;
            float ringRadius = sqrt(max(0.0, 1.0 - y * y));
            float theta = aAlong * 2399.96;
            modelPos = vec3(cos(theta) * ringRadius, y, sin(theta) * ringRadius) * uCoreRadius;
            modelPos *= 1.0 + (hash11(aSeed * 91.7) - 0.5) * 0.012;
            bright = 0.85 + hash11(aSeed * 13.1) * 0.55;
        } else {
            float orbitRadius = aRadius;
            float rate = uOrbitRate / pow(max(orbitRadius, 0.2), 1.5);
            float theta = aSeed * TAU + uTime * rate;
            float lift = (hash11(aSeed * 37.9) - 0.5) * 2.0 * uRingThickness;
            modelPos = vec3(cos(theta) * orbitRadius, lift, sin(theta) * orbitRadius);
            float lane = hash11(floor(orbitRadius * 46.0));
            bright = (0.45 + lane * 0.85) * (0.7 + hash11(aSeed * 5.3) * 0.6);
        }

        vec4 viewPos = modelViewMatrix * vec4(modelPos, 1.0);
        vec3 modelCentre = modelViewMatrix[3].xyz;
        vec3 fromCamera = viewPos.xyz;
        float rayLength = max(length(fromCamera), 1e-5);
        vec3 rayDir = fromCamera / rayLength;

        float alongRay = dot(modelCentre, rayDir);
        float offAxis = length(modelCentre - rayDir * alongRay);

        bool occluded;
        if (aKind < 0.5) {
            occluded = dot(viewPos.xyz - modelCentre, rayDir) > 0.0;
        } else {
            float inside = uCoreRadius * uCoreRadius - offAxis * offAxis;
            float nearHit = alongRay - sqrt(max(inside, 0.0));
            occluded = inside > 0.0 && rayLength > nearHit;
        }

        if (occluded) {
            gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
            gl_PointSize = 0.0;
            vKind = aKind;
            vBright = 0.0;
            return;
        }

        gl_Position = projectionMatrix * viewPos;
        gl_PointSize = uMoteSize * uPixelRatio * (9.5 / max(0.001, -viewPos.z));

        vKind = aKind;
        vBright = bright;
    }
`

const SATURN_FRAGMENT = /* glsl */ `
    precision highp float;

    uniform vec3 uCoreColor;
    uniform vec3 uRingColor;
    uniform float uGlow;

    varying float vKind;
    varying float vBright;

    void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;

        float fall = 1.0 - d;
        float shape = pow(fall, 4.5) + pow(fall, 1.4) * 0.4;

        vec3 col = vKind < 0.5 ? uCoreColor : uRingColor;
        float a = shape * vBright * (0.45 + uGlow);

        gl_FragColor = vec4(col * a, a);
    }
`

export interface ProjectedBadge {
  id: string
  x: number
  y: number
  scale: number
  opacity: number
  isBehind: boolean
  depth: number
}

class SaturnScene {
  private container: HTMLElement
  private cfg: Config

  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 2000)
  private group = new THREE.Group()

  private cloudGeometry: THREE.BufferGeometry
  private material: THREE.ShaderMaterial
  private cloud: THREE.Points

  private time = 0
  private spinAngle = 0
  private dragYaw = 0
  private dragPitch = 0
  private velocityYaw = 0
  private velocityPitch = 0
  private isDragging = false
  private lastX = 0
  private lastY = 0

  private width = 0
  private height = 0
  private frameId = 0
  private lastT = 0
  private disposed = false

  public onUpdateBadges?: (badges: Record<string, ProjectedBadge>) => void

  constructor(container: HTMLElement, cfg: Config) {
    this.container = container
    this.cfg = cfg
    const S = settingsFor(cfg)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.renderer.setPixelRatio(dpr)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setClearColor(0x000000, 0)
    const el = this.renderer.domElement
    el.style.position = "absolute"
    el.style.inset = "0"
    el.style.width = "100%"
    el.style.height = "100%"
    el.style.cursor = "grab"
    el.style.touchAction = "none"
    container.appendChild(el)

    this.material = new THREE.ShaderMaterial({
      vertexShader: SATURN_VERTEX,
      fragmentShader: SATURN_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uMoteSize: { value: S.moteSize },
        uOrbitRate: { value: S.orbitRate },
        uRingThickness: { value: S.ringThickness },
        uCoreRadius: { value: CORE_RADIUS },
        uPixelRatio: { value: dpr },
        uCoreColor: { value: new THREE.Color(cfg.coreColor) },
        uRingColor: { value: new THREE.Color(cfg.ringColor) },
        uGlow: { value: S.glow },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    })

    this.cloudGeometry = buildCloud(S)
    this.cloud = new THREE.Points(this.cloudGeometry, this.material)
    this.cloud.frustumCulled = false
    this.group.add(this.cloud)

    this.group.rotation.order = "ZXY"
    this.scene.add(this.group)

    this.bindEvents()
  }

  private bindEvents() {
    const el = this.renderer.domElement

    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest(".skill-badge-node") || (e.target as HTMLElement)?.closest(".detached-skill-card")) return
      this.isDragging = true
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.velocityYaw = 0
      this.velocityPitch = 0
      el.style.cursor = "grabbing"
    }
    const move = (e: PointerEvent) => {
      if (!this.isDragging) return
      const dx = e.clientX - this.lastX
      const dy = e.clientY - this.lastY
      this.lastX = e.clientX
      this.lastY = e.clientY
      const s = clamp(this.cfg.dragSensitivity, 0, 10, 3) * 0.007
      this.dragYaw += dx * s
      this.dragPitch += dy * s
      this.velocityYaw = dx * s
      this.velocityPitch = dy * s
    }
    const up = () => {
      this.isDragging = false
      el.style.cursor = "grab"
    }

    el.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)

    this.unbind = () => {
      el.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointercancel", up)
    }
  }

  private unbind = () => {}

  start() {
    this.lastT = performance.now()
    const loop = () => {
      this.frameId = requestAnimationFrame(loop)
      this.step()
    }
    loop()
  }

  setSize(width: number, height: number) {
    if (this.disposed || width <= 0 || height <= 0) return
    this.width = width
    this.height = height
    this.renderer.setSize(width, height, false)
    this.updateCamera()
  }

  updateConfig(cfg: Config) {
    if (this.disposed) return
    const prev = this.cfg
    this.cfg = cfg
    const S = settingsFor(cfg)
    const u = this.material.uniforms

    u.uMoteSize.value = S.moteSize
    u.uOrbitRate.value = S.orbitRate
    u.uRingThickness.value = S.ringThickness
    u.uGlow.value = S.glow
    u.uCoreColor.value.set(cfg.coreColor || "#60A5FA")
    u.uRingColor.value.set(cfg.ringColor || "#00E5FF")

    const prevRing = prev.ringOptions ?? DEFAULTS.ringOptions
    const nextRing = cfg.ringOptions ?? DEFAULTS.ringOptions
    const cloudChanged =
      cfg.density !== prev.density ||
      nextRing.innerRadius !== prevRing.innerRadius ||
      nextRing.outerRadius !== prevRing.outerRadius ||
      nextRing.gaps !== prevRing.gaps

    if (cloudChanged) {
      const next = buildCloud(S)
      this.cloudGeometry.dispose()
      this.cloudGeometry = next
      this.cloud.geometry = next
    }

    this.updateCamera()
  }

  private updateCamera() {
    const w = Math.max(1, this.width)
    const h = Math.max(1, this.height)
    const aspect = w / h
    const distance = 1 / PERSPECTIVE
    const sizePct = clamp(this.cfg.sizePercent, 20, 200, 90)

    const span = VIEW_SPAN * (100 / sizePct)
    const visibleHeight = aspect < 1 ? span / aspect : span

    this.camera.aspect = aspect
    this.camera.position.set(0, 0, distance)
    this.camera.lookAt(0, 0, 0)
    this.camera.fov = 2 * Math.atan(visibleHeight / 2 / distance) * (180 / Math.PI)
    this.camera.near = Math.max(0.1, distance - 20)
    this.camera.far = distance + 20
    this.camera.updateProjectionMatrix()
  }

  private step() {
    if (this.disposed) return
    const now = performance.now()
    let dt = (now - this.lastT) / 1000
    this.lastT = now
    if (!isFinite(dt) || dt < 0) dt = 0
    if (dt > 0.05) dt = 0.05

    const S = settingsFor(this.cfg)
    this.time += dt

    if (!this.isDragging) {
      const decay = Math.exp(-dt * 3)
      this.dragYaw += this.velocityYaw
      this.dragPitch += this.velocityPitch
      this.velocityYaw *= decay
      this.velocityPitch *= decay
      this.spinAngle += S.spinRate * dt
    }

    const pitch = Math.max(-1.2, Math.min(1.2, this.dragPitch))
    this.group.rotation.set(
      S.tiltRadians + pitch,
      this.dragYaw + this.spinAngle,
      S.rollRadians
    )

    this.material.uniforms.uTime.value = this.time
    this.renderer.render(this.scene, this.camera)

    // Calculate 3D Orbit Position for Skills
    if (this.onUpdateBadges && this.width > 0 && this.height > 0) {
      this.group.updateMatrixWorld(true)
      this.camera.updateMatrixWorld(true)

      const badgeCoords: Record<string, ProjectedBadge> = {}
      const modelCentre = new THREE.Vector3().setFromMatrixPosition(this.group.matrixWorld).applyMatrix4(this.camera.matrixWorldInverse)
      const span = S.outerRadius - S.innerRadius

      for (let i = 0; i < TECH_SKILLS.length; i++) {
        const skill = TECH_SKILLS[i]
        const radius = S.innerRadius + skill.radiusFactor * span
        const rate = (S.orbitRate * 0.65) / Math.pow(Math.max(radius, 0.2), 1.5)
        const theta = skill.initialAngle + this.time * rate

        const localPos = new THREE.Vector3(
          Math.cos(theta) * radius,
          0,
          Math.sin(theta) * radius
        )

        const worldPos = localPos.clone().applyMatrix4(this.group.matrixWorld)
        const viewPos = worldPos.clone().applyMatrix4(this.camera.matrixWorldInverse)

        // Occlusion Check with Saturn Core Sphere
        const fromCam = viewPos.clone()
        const rayLen = Math.max(fromCam.length(), 1e-4)
        const rayDir = fromCam.clone().divideScalar(rayLen)
        const alongRay = modelCentre.dot(rayDir)
        const perpDist = modelCentre.clone().sub(rayDir.clone().multiplyScalar(alongRay)).length()
        const inside = CORE_RADIUS * CORE_RADIUS - perpDist * perpDist
        const nearHit = alongRay - Math.sqrt(Math.max(inside, 0))
        const isBehind = inside > 0 && alongRay > 0 && rayLen > nearHit

        // Project to 2D Screen
        const proj = worldPos.clone().project(this.camera)
        const screenX = (proj.x * 0.5 + 0.5) * this.width
        const screenY = (-(proj.y * 0.5) + 0.5) * this.height

        const scale = Math.max(0.7, Math.min(1.25, 7.5 / Math.max(0.01, -viewPos.z)))
        const depthAlpha = THREE.MathUtils.clamp(((-viewPos.z - (this.camera.position.z - 2.5)) / 5.0), 0.45, 1.0)

        badgeCoords[skill.id] = {
          id: skill.id,
          x: screenX,
          y: screenY,
          scale,
          opacity: isBehind ? 0.15 : depthAlpha,
          isBehind,
          depth: -viewPos.z,
        }
      }

      this.onUpdateBadges(badgeCoords)
    }
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frameId)
    this.unbind()
    this.cloudGeometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
    const el = this.renderer.domElement
    if (el.parentNode === this.container) this.container.removeChild(el)
  }
}

/* =========================================================
   REACT COMPONENT (With True Pull-Out Magnetic Cards)
   ========================================================= */

interface ActiveDragState {
  skillId: string
  x: number
  y: number
  isSnapping?: boolean
}

export interface ParticleSaturnProps {
  coreColor?: string
  ringColor?: string
  density?: number
  particleSize?: number
  glow?: number
  tilt?: number
  roll?: number
  spinSpeed?: number
  ringOptions?: RingOptions
  dragSensitivity?: number
  sizePercent?: number
  style?: React.CSSProperties
}

function __OriginkitBase_ParticleSaturn(props: ParticleSaturnProps) {
  const {
    coreColor = DEFAULTS.coreColor,
    ringColor = DEFAULTS.ringColor,
    density = DEFAULTS.density,
    particleSize = DEFAULTS.particleSize,
    glow = DEFAULTS.glow,
    tilt = DEFAULTS.tilt,
    roll = DEFAULTS.roll,
    spinSpeed = DEFAULTS.spinSpeed,
    ringOptions = { gaps: 2, orbitSpeed: 8, innerRadius: 135, outerRadius: 260 },
    dragSensitivity = DEFAULTS.dragSensitivity,
    sizePercent = DEFAULTS.sizePercent,
    style,
  } = props

  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<SaturnScene | null>(null)

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null)
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null)
  const [badgeMap, setBadgeMap] = useState<Record<string, ProjectedBadge>>({})

  const cfgRef = useRef<Config>(null as any)
  cfgRef.current = {
    coreColor,
    ringColor,
    density,
    particleSize,
    glow,
    tilt,
    roll,
    spinSpeed,
    ringOptions,
    dragSensitivity,
    sizePercent,
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let scene: SaturnScene
    try {
      scene = new SaturnScene(container, cfgRef.current)
    } catch {
      return
    }
    sceneRef.current = scene
    scene.onUpdateBadges = (badges) => {
      setBadgeMap(badges)
    }
    scene.setSize(container.clientWidth, container.clientHeight)
    scene.start()

    const ro = new ResizeObserver(() => {
      scene.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)
    return () => {
      ro.disconnect()
      scene.dispose()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.updateConfig(cfgRef.current)
  }, [
    coreColor,
    ringColor,
    density,
    particleSize,
    glow,
    tilt,
    roll,
    spinSpeed,
    ringOptions?.innerRadius,
    ringOptions?.outerRadius,
    ringOptions?.gaps,
    ringOptions?.orbitSpeed,
    dragSensitivity,
    sizePercent,
  ])

  // Drag handlers to pull badge anywhere outside the ring
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
      // Trigger snap-back animation
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

  const draggedSkill = activeDrag ? TECH_SKILLS.find((s) => s.id === activeDrag.skillId) : null
  const draggedBadgeSlot = activeDrag && activeDrag.skillId ? badgeMap[activeDrag.skillId] : null

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Particle Saturn with Orbiting Tech Stack Skills"
      className="relative w-full h-full min-h-[820px] sm:min-h-[920px] lg:min-h-[1000px] overflow-hidden select-none flex flex-col justify-between pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 text-[#D7E2EA]"
      style={{
        ...style,
      }}
    >
      {/* 1. TOP EDITORIAL BANNER */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-none mb-10 sm:mb-16">
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-[#00E5FF] uppercase mb-4 shadow-2xl backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: "6s" }} />
            <span>// KEPLER ORBITING TECH STACK • DRAG BADGE OUTSIDE TO INSPECT</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={15}>
          <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-xl leading-relaxed">
            Click &amp; drag any skill badge out of the ring to view details • Release mouse to snap back into orbit
          </p>
        </FadeIn>
      </div>

      {/* 2. ORBITING SKILL BADGES */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
        {TECH_SKILLS.map((skill) => {
          const badge = badgeMap[skill.id]
          if (!badge) return null

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
                opacity: isBeingDragged ? 0.2 : isMatch ? (badge.isBehind ? 0.2 : 1.0) : 0.2,
                zIndex: isHovered ? 60 : Math.round(badge.depth * 10),
                pointerEvents: badge.isBehind && !isBeingDragged ? "none" : "auto",
                transition: "opacity 0.25s ease",
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
                  borderColor: isHovered ? skill.color : "rgba(255, 255, 255, 0.8)",
                  boxShadow: isHovered
                    ? `0 0 30px ${skill.color}, 0 12px 35px rgba(0,0,0,0.9)`
                    : `0 6px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${skill.color}50`,
                }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center p-2.5 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-2xl ${
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

                {/* Hover Tooltip (When in orbit) */}
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
            {/* Glowing Cyber Magnetic Tether connecting orbit slot to pulled card */}
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

            {/* The Floating 1-Line Expanded Card */}
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
              {/* White Icon Badge */}
              <div className="w-9 h-9 flex-shrink-0 p-1.5 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={draggedSkill.logoUrl}
                  alt={draggedSkill.name}
                  className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-sm"
                />
              </div>

              {/* Text Info */}
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

      {/* 4. FUTURISTIC CELESTIAL HUD FILTER DOCK */}
      <div className="relative z-30 w-full max-w-5xl mx-auto mt-auto flex flex-col items-center pointer-events-auto gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            ORBITAL TELEMETRY • {activeCategory === "all" ? `${TECH_SKILLS.length} NODES SYNCHRONIZED` : `${TECH_SKILLS.filter((s) => s.category === activeCategory).length} NODES FILTERED`}
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

const __originkitPresetProps = {
  coreColor: "#60A5FA",
  ringColor: "#00E5FF",
  density: 16,
  particleSize: 14,
  glow: 18,
  tilt: 8,
  roll: 10,
  spinSpeed: 6,
  dragSensitivity: 2,
  sizePercent: 125,
}

export default function ParticleSaturn(props: Record<string, unknown>) {
  return <__OriginkitBase_ParticleSaturn {...(__originkitPresetProps as Record<string, unknown>)} {...props} />
}

ParticleSaturn.displayName = "Particle Saturn"

export const InteractiveSkillsCanvas = ParticleSaturn
