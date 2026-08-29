// Gravitational Vortex Skills Canvas — Originkit
"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, Code2, Box, Bot, Cpu, Wrench, Orbit } from "lucide-react"
import { FadeIn } from "./FadeIn"

/* =========================================================
   SKILLS DATA (Accretion Disc Orbit)
   ========================================================= */
export interface VortexSkill {
  id: string
  name: string
  role: string
  description: string
  category: "frontend" | "creative" | "ai" | "backend" | "database" | "cloud" | "tools"
  color: string
  logoUrl: string
  baseRadius: number // 1.2 (inner) to 3.6 (outer rim)
  angleOffset: number // initial angle in radians
  speedMult: number // orbital speed multiplier
}

const TECH_SKILLS: VortexSkill[] = [
  {
    id: "react",
    name: "React 19",
    role: "Frontend Architecture",
    description: "Component-based declarative UI architecture & server actions",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    baseRadius: 1.6,
    angleOffset: 0.1,
    speedMult: 1.2,
  },
  {
    id: "js",
    name: "JavaScript",
    role: "ESNext / V8 Engine",
    description: "Modern ESNext asynchronous runtime & dynamic engines",
    category: "frontend",
    color: "#EAB308",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    baseRadius: 2.1,
    angleOffset: 1.2,
    speedMult: 1.0,
  },
  {
    id: "threejs",
    name: "Three.js",
    role: "WebGL 3D Graphics",
    description: "Interactive 3D WebGL scenes, custom shaders & particle physics",
    category: "creative",
    color: "#18181B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    baseRadius: 1.8,
    angleOffset: 2.3,
    speedMult: 1.15,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "OpenAI GPT-4o",
    description: "Generative LLM systems, prompt engineering & cognitive reasoning",
    category: "ai",
    color: "#10A37F",
    logoUrl: "https://cdn.simpleicons.org/openai/10A37F",
    baseRadius: 2.5,
    angleOffset: 3.4,
    speedMult: 0.95,
  },
  {
    id: "claude",
    name: "Claude AI",
    role: "Anthropic Neural Models",
    description: "Deep reasoning, code synthesis & contextual agent pipelines",
    category: "ai",
    color: "#D97757",
    logoUrl: "https://cdn.simpleicons.org/anthropic/D97757",
    baseRadius: 3.0,
    angleOffset: 4.5,
    speedMult: 0.85,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    role: "Utility CSS Design",
    description: "Rapid responsive styling with utility-first modern design systems",
    category: "frontend",
    color: "#06B6D4",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    baseRadius: 2.7,
    angleOffset: 5.6,
    speedMult: 0.9,
  },
  {
    id: "aws",
    name: "AWS",
    role: "Cloud Infrastructure",
    description: "Scalable cloud infrastructure, S3 storage & serverless Lambdas",
    category: "cloud",
    color: "#FF9900",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    baseRadius: 3.4,
    angleOffset: 0.7,
    speedMult: 0.75,
  },
  {
    id: "figma",
    name: "Figma",
    role: "UI/UX & Prototyping",
    description: "Collaborative vector UI/UX design, interactive wireframes & systems",
    category: "creative",
    color: "#F24E1E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    baseRadius: 2.3,
    angleOffset: 1.8,
    speedMult: 1.05,
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "PostgreSQL BaaS",
    description: "Realtime PostgreSQL backend-as-a-service with edge authentication",
    category: "backend",
    color: "#3ECF8E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    baseRadius: 1.9,
    angleOffset: 2.9,
    speedMult: 1.1,
  },
  {
    id: "github",
    name: "GitHub",
    role: "CI/CD Actions & Repos",
    description: "Git version control, CI/CD automation & repository management",
    category: "tools",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    baseRadius: 3.2,
    angleOffset: 4.0,
    speedMult: 0.8,
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Serverless Edge Cloud",
    description: "Global edge network deployments, serverless functions & automated CI",
    category: "cloud",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    baseRadius: 2.8,
    angleOffset: 5.1,
    speedMult: 0.88,
  },
  {
    id: "firebase",
    name: "Firebase",
    role: "Realtime Database & Auth",
    description: "Realtime cloud document sync, analytics & serverless triggers",
    category: "backend",
    color: "#F59E0B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    baseRadius: 2.0,
    angleOffset: 0.4,
    speedMult: 1.08,
  },
  {
    id: "nodejs",
    name: "Node.js",
    role: "High-Throughput Backend",
    description: "Event-driven asynchronous server runtime & scalable microservices",
    category: "backend",
    color: "#16A34A",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    baseRadius: 1.5,
    angleOffset: 1.5,
    speedMult: 1.25,
  },
  {
    id: "docker",
    name: "Docker",
    role: "Container Architecture",
    description: "Containerized application environments & microservice orchestration",
    category: "cloud",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    baseRadius: 3.5,
    angleOffset: 2.6,
    speedMult: 0.72,
  },
  {
    id: "php",
    name: "PHP",
    role: "Backend Architecture",
    description: "Server-side web scripting, robust REST APIs & backend frameworks",
    category: "backend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    baseRadius: 2.2,
    angleOffset: 3.7,
    speedMult: 1.02,
  },
  {
    id: "gsap",
    name: "GSAP",
    role: "Interactive Timelines",
    description: "Ultra high-performance timeline animations & scroll choreography",
    category: "creative",
    color: "#84CC16",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gsap/gsap-original.svg",
    baseRadius: 2.6,
    angleOffset: 4.8,
    speedMult: 0.92,
  },
  {
    id: "vite",
    name: "Vite",
    role: "Modern Frontend Tooling",
    description: "Blazing fast ESM bundler with instant HMR development environment",
    category: "frontend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    baseRadius: 2.4,
    angleOffset: 5.9,
    speedMult: 0.98,
  },
  {
    id: "ai_agents",
    name: "AI Agents",
    role: "Autonomous Pipelines",
    description: "Multi-agent autonomous systems, tool calling & automated execution",
    category: "ai",
    color: "#7C3AED",
    logoUrl: "https://cdn.simpleicons.org/robotframework/7C3AED",
    baseRadius: 1.4,
    angleOffset: 0.9,
    speedMult: 1.3,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "NoSQL Database",
    description: "Flexible document database for high-scale distributed schemas",
    category: "database",
    color: "#15803D",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    baseRadius: 3.1,
    angleOffset: 2.0,
    speedMult: 0.82,
  },
  {
    id: "mysql",
    name: "MySQL",
    role: "Relational SQL Engine",
    description: "ACID-compliant relational database management & query indexing",
    category: "database",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    baseRadius: 2.9,
    angleOffset: 3.1,
    speedMult: 0.86,
  },
  {
    id: "flutter",
    name: "Flutter",
    role: "Cross-Platform Apps",
    description: "Cross-platform native mobile & desktop application development",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    baseRadius: 1.7,
    angleOffset: 4.2,
    speedMult: 1.18,
  },
  {
    id: "html5",
    name: "HTML5",
    role: "Semantic Web Structure",
    description: "Semantic document markup, accessibility & modern browser standards",
    category: "frontend",
    color: "#EA580C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    baseRadius: 3.3,
    angleOffset: 5.3,
    speedMult: 0.78,
  },
]

const FILTERS = [
  { id: "all", label: "ALL VORTEX NODES", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "creative", label: "CREATIVE & 3D", icon: Box },
  { id: "ai", label: "AI & AGENTS", icon: Bot },
  { id: "backend", label: "BACKEND", icon: Cpu },
  { id: "database", label: "DATABASES", icon: Cpu },
  { id: "cloud", label: "CLOUD & DEVOPS", icon: Wrench },
]

/* =========================================================
   ORIGINKIT GRAVITATIONAL VORTEX CONSTANTS & SHADERS
   ========================================================= */

const TAU = Math.PI * 2
const MAX_PARTICLES = 36000
const CANVAS_FPS = 30
const FRAME_SLACK = 4
const DPR_CAP = 2

const RADIAL_AT_50 = 0.1
const SPIN_AT_50 = 0.15
const EXPOSURE = 1 / 90 + 0.51 / 12
const HOVER_RAMP = 0.45

const R_IN = 0.15
const R_OUT = 4.2
const Z_FLOOR = 2.5
const NEAR_PLANE = 0.6
const FOV = 45
const ROLL = -0.25
const FUNNEL_AT_100 = 4.5
const TWIST_AT_100 = 20.0
const DOT_RADIUS_AT_100 = 0.0051
const DIST_AT_100 = 6.2
const ARMS = 5
const ARM_SPREAD = 0.85

const VS_SOURCE = `
precision highp float;

attribute vec3 aSeed;
attribute vec2 aCorner;

uniform float uPhase;
uniform float uSpin;
uniform float uDu;
uniform float uDSpin;
uniform float uTwist;
uniform float uFunnel;
uniform float uHalfWidth;
uniform float uTilt;
uniform float uOrbit;
uniform float uDist;
uniform float uFocal;
uniform float uAspect;
uniform float uAccentMix;
uniform vec2  uShift;

varying float vAlpha;
varying vec2  vCorner;
varying float vAcc;

#define TAU 6.28318530718
#define R_IN ${R_IN}
#define R_OUT ${R_OUT}
#define Z_FLOOR ${Z_FLOOR}
#define NEAR_PLANE ${NEAR_PLANE}
#define ROLL ${ROLL}

float radiusOf(float u){ return mix(float(R_IN), float(R_OUT), clamp(u, 0.0, 1.0)); }

float spiralOf(float u){
    return uTwist * log((float(R_OUT) + 0.35) / (radiusOf(u) + 0.35));
}

vec3 surf(float u, float seedV, float spin){
    float uc = fract(u);
    float r  = radiusOf(uc);
    float a  = seedV * TAU + spiralOf(uc) + spin;

    float well = uFunnel / (r + 0.12);
    float z = float(Z_FLOOR) * (1.0 - exp(-well / float(Z_FLOOR))) - 0.6;

    return vec3(r * cos(a), r * sin(a), z);
}

mat3 rotX(float t){ float c = cos(t), s = sin(t); return mat3(1.0, 0.0, 0.0,  0.0, c, s,  0.0, -s, c); }
mat3 rotY(float t){ float c = cos(t), s = sin(t); return mat3(c, 0.0, -s,  0.0, 1.0, 0.0,  s, 0.0, c); }
mat3 rotZ(float t){ float c = cos(t), s = sin(t); return mat3(c, s, 0.0,  -s, c, 0.0,  0.0, 0.0, 1.0); }

void main(){
    vCorner = aCorner;
    vAcc = step(1.0 - uAccentMix, aSeed.z);

    float u0 = fract(aSeed.x - uPhase);

    vec3 p0 = surf(u0,        aSeed.y, uSpin);
    vec3 p1 = surf(u0 + uDu,  aSeed.y, uSpin + uDSpin);

    mat3 cam = rotX(1.5707963 - uTilt) * rotY(uOrbit) * rotZ(float(ROLL));
    vec3 pivot = vec3(0.0, 0.15, 0.0);
    vec3 e0 = cam * (p0 - pivot);
    vec3 e1 = cam * (p1 - pivot);

    float zd0 = e0.z + uDist;
    float zd1 = e1.z + uDist;

    if (zd0 < float(NEAR_PLANE) || zd1 < float(NEAR_PLANE)) {
        vAlpha = 0.0;
        gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
        return;
    }

    vec2 sp0 = e0.xy * uFocal / zd0;
    vec2 sp1 = e1.xy * uFocal / zd1;

    vec2 d = sp1 - sp0;
    float len = length(d);
    vec2 tg = len > 1e-6 ? d / len : vec2(1.0, 0.0);
    vec2 nm = vec2(-tg.y, tg.x);

    float W = uHalfWidth * uFocal / zd0;
    float L = max(len, 2.0 * W);

    vec2 sp = sp0 + tg * (aCorner.y * L) + nm * (aCorner.x * W);
    vec2 ndc = vec2((sp.x - uShift.x) / uAspect, sp.y - uShift.y);

    gl_Position = vec4(ndc * zd0, 0.0, zd0);

    float edge = smoothstep(0.0, 0.20, u0) * (1.0 - smoothstep(0.62, 1.0, u0));
    float depthAtt = pow(clamp(uDist / zd0, 0.0, 1.0), 3.0);
    vAlpha = edge * mix(0.35, 1.0, aSeed.z) * mix(0.05, 1.0, depthAtt);
}
`

const FS_SOURCE = `
precision highp float;

uniform vec3 uBase;
uniform vec3 uAccent;

varying float vAlpha;
varying vec2  vCorner;
varying float vAcc;

void main(){
    float cd = abs(vCorner.x * 2.0);
    float glow = exp(-8.0 * cd * cd);
    float taper = smoothstep(0.0, 0.25, vCorner.y);

    float a = vAlpha * glow * taper;
    if (a < 0.004) discard;

    vec3 col = mix(uBase, uAccent, vAcc);
    gl_FragColor = vec4(col * a, a);
}
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
  label: string
): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(`GravitationalVortex ${label}:`, gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VS_SOURCE, "vert")
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE, "frag")
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("GravitationalVortex link:", gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

function eyeShift(
  tiltRad: number,
  orbitRad: number,
  dist: number,
  funnel: number,
  focal: number
): [number, number] {
  const well = funnel / (R_IN + 0.12)
  const z = Z_FLOOR * (1 - Math.exp(-well / Z_FLOOR)) - 0.6

  const px = 0
  const py = -0.15

  const cz = Math.cos(ROLL)
  const sz = Math.sin(ROLL)
  const x1 = cz * px - sz * py
  const y1 = sz * px + cz * py

  const cy = Math.cos(orbitRad)
  const sy = Math.sin(orbitRad)
  const x2 = cy * x1 + sy * z
  const z2 = -sy * x1 + cy * z

  const t = Math.PI / 2 - tiltRad
  const ct = Math.cos(t)
  const st = Math.sin(t)
  const ey = ct * y1 - st * z2
  const ez = st * y1 + ct * z2

  const zd = ez + dist
  if (!(zd >= NEAR_PLANE)) return [0, 0]
  return [(x2 * focal) / zd, (ey * focal) / zd]
}

function parseColor(input?: string): [number, number, number] {
  if (!input) return [1, 1, 1]
  const s = input.trim()
  if (s[0] === "#") {
    let h = s.slice(1)
    if (h.length === 3 || h.length === 4)
      h = h.split("").map((c) => c + c).join("")
    const n = parseInt(h.slice(0, 6), 16)
    if (isNaN(n)) return [1, 1, 1]
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }
  const m = s.match(/rgba?\(([^)]+)\)/i)
  if (m) {
    const p = m[1].split(",").map((x) => parseFloat(x))
    return [(p[0] || 0) / 255, (p[1] || 0) / 255, (p[2] || 0) / 255]
  }
  return [1, 1, 1]
}

export interface ProjectedVortexSkill {
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
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null)
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null)
  const [skillCoordMap, setSkillCoordMap] = useState<Record<string, ProjectedVortexSkill>>({})

  const live = useRef({
    count: 24000,
    speed: 6,
    hoverSpeed: 18,
    dir: 1,
    twist: 28,
    funnel: 54,
    dotSize: 340,
    tilt: 36,
    orbit: 0,
    scale: 82,
    accentMix: 55,
    base: parseColor("#00F0FF"),
    accent: parseColor("#A855F7"),
  })

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      depth: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null
    if (!gl) return

    const program = createProgram(gl)
    if (!program) return
    gl.useProgram(program)

    const aSeedLoc = gl.getAttribLocation(program, "aSeed")
    const aCornerLoc = gl.getAttribLocation(program, "aCorner")
    const U = (n: string) => gl.getUniformLocation(program, n)
    const u = {
      phase: U("uPhase"),
      spin: U("uSpin"),
      du: U("uDu"),
      dspin: U("uDSpin"),
      twist: U("uTwist"),
      funnel: U("uFunnel"),
      halfWidth: U("uHalfWidth"),
      tilt: U("uTilt"),
      orbit: U("uOrbit"),
      dist: U("uDist"),
      focal: U("uFocal"),
      aspect: U("uAspect"),
      accentMix: U("uAccentMix"),
      shift: U("uShift"),
      base: U("uBase"),
      accent: U("uAccent"),
    }

    const VERTS = 6
    const seeds = new Float32Array(MAX_PARTICLES * VERTS * 3)
    const corners = new Float32Array(MAX_PARTICLES * VERTS * 2)

    let s = 1337
    const rng = () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }
    const QUAD = [
      [-0.5, 0.0],
      [0.5, 0.0],
      [-0.5, 1.0],
      [0.5, 0.0],
      [0.5, 1.0],
      [-0.5, 1.0],
    ]
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const u0 = rng()
      const v0 = (Math.floor(rng() * ARMS) + (rng() - 0.5) * ARM_SPREAD) / ARMS
      const jit = rng()
      for (let k = 0; k < VERTS; k++) {
        const a = (i * VERTS + k) * 3
        seeds[a] = u0
        seeds[a + 1] = v0
        seeds[a + 2] = jit
        const c = (i * VERTS + k) * 2
        corners[c] = QUAD[k][0]
        corners[c + 1] = QUAD[k][1]
      }
    }

    const vboSeed = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, vboSeed)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)

    const vboCorner = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCorner)
    gl.bufferData(gl.ARRAY_BUFFER, corners, gl.STATIC_DRAW)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    const focal = 1 / Math.tan(((FOV * Math.PI) / 180) * 0.5)

    const hover = { on: false, k: 0 }
    const onEnter = () => {
      hover.on = true
    }
    const onLeave = () => {
      hover.on = false
    }
    host.addEventListener("pointerenter", onEnter)
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("pointercancel", onLeave)

    let raf = 0
    let lastDraw = 0
    let phase = 0
    let spin = 0

    const render = (now: number) => {
      raf = requestAnimationFrame(render)

      const onCanvas = false
      if (onCanvas && lastDraw && now - lastDraw < 1000 / CANVAS_FPS - FRAME_SLACK) return
      const dt = lastDraw ? Math.min(0.05, (now - lastDraw) / 1000) : 1 / 60
      lastDraw = now

      const L = live.current

      hover.k += ((hover.on ? 1 : 0) - hover.k) * (1 - Math.exp(-dt / HOVER_RAMP))

      const dial = L.speed + (L.hoverSpeed - L.speed) * hover.k
      const rate = (dial / 50) * RADIAL_AT_50 * L.dir
      const spinRate = (dial / 50) * SPIN_AT_50 * L.dir
      phase += dt * rate
      phase -= Math.floor(phase)
      spin += dt * spinRate
      spin -= Math.floor(spin / TAU) * TAU

      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      const cw = host.clientWidth || 1200
      const ch = host.clientHeight || 850
      const w = Math.max(1, Math.floor(cw * dpr))
      const h = Math.max(1, Math.floor(ch * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, vboSeed)
      gl.enableVertexAttribArray(aSeedLoc)
      gl.vertexAttribPointer(aSeedLoc, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, vboCorner)
      gl.enableVertexAttribArray(aCornerLoc)
      gl.vertexAttribPointer(aCornerLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(u.phase, phase)
      gl.uniform1f(u.spin, spin)
      gl.uniform1f(u.du, -rate * EXPOSURE)
      gl.uniform1f(u.dspin, spinRate * EXPOSURE)
      const funnel = (L.funnel / 100) * FUNNEL_AT_100
      const tiltRad = (L.tilt * Math.PI) / 180
      const orbitRad = (L.orbit * Math.PI) / 180
      const dist = (DIST_AT_100 * 100) / Math.max(1, L.scale)

      gl.uniform1f(u.twist, (L.twist / 100) * TWIST_AT_100)
      gl.uniform1f(u.funnel, funnel)
      gl.uniform1f(u.halfWidth, (L.dotSize / 100) * DOT_RADIUS_AT_100)
      gl.uniform1f(u.tilt, tiltRad)
      gl.uniform1f(u.orbit, orbitRad)
      gl.uniform1f(u.dist, dist)
      gl.uniform1f(u.focal, focal)
      const aspect = w / Math.max(1, h)
      gl.uniform1f(u.aspect, aspect)
      gl.uniform1f(u.accentMix, L.accentMix / 100)

      const sh = eyeShift(tiltRad, orbitRad, dist, funnel, focal)
      gl.uniform2f(u.shift, sh[0], sh[1])
      gl.uniform3fv(u.base, L.base)
      gl.uniform3fv(u.accent, L.accent)

      gl.drawArrays(gl.TRIANGLES, 0, L.count * VERTS)

      // Calculate 3D Screen Coordinates for Skills in the Accretion Disc
      const cz = Math.cos(ROLL)
      const sz = Math.sin(ROLL)
      const cy = Math.cos(orbitRad)
      const sy = Math.sin(orbitRad)
      const t = Math.PI / 2 - tiltRad
      const ct = Math.cos(t)
      const st = Math.sin(t)

      const twistVal = (L.twist / 100) * TWIST_AT_100
      const coords: Record<string, ProjectedVortexSkill> = {}

      for (let i = 0; i < TECH_SKILLS.length; i++) {
        const skill = TECH_SKILLS[i]
        const r = skill.baseRadius
        const spiral = twistVal * Math.log((R_OUT + 0.35) / (r + 0.35))
        const curAngle = skill.angleOffset + spiral + spin * (skill.speedMult * 0.5)

        const well = funnel / (r + 0.12)
        const z = Z_FLOOR * (1.0 - Math.exp(-well / Z_FLOOR)) - 0.6
        const px = r * Math.cos(curAngle)
        const py = r * Math.sin(curAngle) - 0.15

        const x1 = cz * px - sz * py
        const y1 = sz * px + cz * py

        const x2 = cy * x1 + sy * z
        const z2 = -sy * x1 + cy * z

        const ey = ct * y1 - st * z2
        const ez = st * y1 + ct * z2
        const zd = ez + dist

        if (zd < NEAR_PLANE) continue

        const spx = (x2 * focal) / zd
        const spy = (ey * focal) / zd
        const ndcX = (spx - sh[0]) / aspect
        const ndcY = spy - sh[1]

        const screenX = (ndcX * 0.5 + 0.5) * cw
        const screenY = (-ndcY * 0.5 + 0.5) * ch
        const scaleVal = Math.max(0.68, Math.min(1.2, (dist / zd) * 1.05))
        const depthAtt = Math.pow(Math.max(0.2, Math.min(1.0, dist / zd)), 2.5)

        coords[skill.id] = {
          id: skill.id,
          x: screenX,
          y: screenY,
          scale: scaleVal,
          opacity: Math.max(0.35, depthAtt),
          isVisible: true,
          depth: zd,
        }
      }

      setSkillCoordMap(coords)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener("pointerenter", onEnter)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointercancel", onLeave)
      gl.deleteBuffer(vboSeed)
      gl.deleteBuffer(vboCorner)
      gl.deleteProgram(program)
    }
  }, [])

  const handleBadgePointerDown = useCallback((e: React.PointerEvent, skillId: string) => {
    e.preventDefault()
    e.stopPropagation()
    const host = hostRef.current
    if (!host) return
    const rect = host.getBoundingClientRect()
    setActiveDrag({
      skillId,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  useEffect(() => {
    if (!activeDrag || activeDrag.isSnapping) return

    const handlePointerMove = (e: PointerEvent) => {
      const host = hostRef.current
      if (!host) return
      const rect = host.getBoundingClientRect()
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

  const draggedSkill = activeDrag ? TECH_SKILLS.find((s) => s.id === activeDrag.skillId) : null
  const draggedBadgeSlot = activeDrag && activeDrag.skillId ? skillCoordMap[activeDrag.skillId] : null

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Gravitational Vortex Accretion Disc with Orbiting Tech Stack Skills"
      className="relative w-full h-full min-h-[850px] sm:min-h-[920px] lg:min-h-[1000px] overflow-hidden select-none flex flex-col justify-between pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 text-[#D7E2EA] bg-[#0C0C0C]"
    >
      {/* 1. TOP EDITORIAL BANNER */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-none mb-6 sm:mb-10">
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-[#00F0FF] uppercase mb-3 shadow-2xl backdrop-blur-xl">
            <Orbit className="w-3.5 h-3.5 text-[#00F0FF] animate-spin" style={{ animationDuration: "10s" }} />
            <span>// GRAVITATIONAL VORTEX ACCRETION DISC • ORIGINKIT</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={15}>
          <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-xl leading-relaxed">
            Hover to accelerate vortex streamlines • Drag any orbiting skill node outward to view capability card
          </p>
        </FadeIn>
      </div>

      {/* 2. WEBGL GRAVITATIONAL VORTEX CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none z-10 select-none"
      />

      {/* 3. INTERACTIVE 3D ORBITING SKILL NODES */}
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
                zIndex: isHovered ? 60 : Math.round(1000 - badge.depth * 50),
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
                  borderColor: isHovered ? skill.color : "rgba(255, 255, 255, 0.8)",
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

        {/* 4. MAGNETIC PULL-OUT CARD OVERLAY & CYBER TETHER */}
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

      {/* 5. CELESTIAL HUD FILTER DOCK */}
      <div className="relative z-30 w-full max-w-5xl mx-auto mt-auto flex flex-col items-center pointer-events-auto gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            VORTEX TELEMETRY • {activeCategory === "all" ? `${TECH_SKILLS.length} NODES SYNCHRONIZED` : `${TECH_SKILLS.filter((s) => s.category === activeCategory).length} NODES FILTERED`}
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
