// Globe Study — Originkit
// Originkit — props baked into the default export.
"use client"

import * as React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, Code2, Box, Bot, Cpu, Wrench, Globe } from "lucide-react"
import { FadeIn } from "./FadeIn"

/* =========================================================
   SKILLS DATA (Distributed Geographically on Globe)
   ========================================================= */
export interface GlobeSkill {
  id: string
  name: string
  role: string
  description: string
  category: "frontend" | "creative" | "ai" | "backend" | "database" | "cloud" | "tools"
  color: string
  logoUrl: string
  lat: number // Latitude in degrees (-90 to 90)
  lon: number // Longitude in degrees (-180 to 180)
}

const TECH_SKILLS: GlobeSkill[] = [
  // North America
  {
    id: "react",
    name: "React 19",
    role: "Frontend UI Architecture",
    description: "Component-based declarative UI architecture & server actions",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    lat: 37.77,
    lon: -122.42, // San Francisco
  },
  {
    id: "js",
    name: "JavaScript",
    role: "ESNext / V8 Engine",
    description: "Modern ESNext asynchronous runtime & dynamic engines",
    category: "frontend",
    color: "#EAB308",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    lat: 40.71,
    lon: -74.01, // New York
  },
  {
    id: "threejs",
    name: "Three.js",
    role: "WebGL 3D Graphics",
    description: "Interactive 3D WebGL scenes, custom shaders & particle physics",
    category: "creative",
    color: "#18181B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    lat: 34.05,
    lon: -118.24, // Los Angeles
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "OpenAI GPT-4o",
    description: "Generative LLM systems, prompt engineering & cognitive reasoning",
    category: "ai",
    color: "#10A37F",
    logoUrl: "https://cdn.simpleicons.org/openai/10A37F",
    lat: 37.44,
    lon: -122.16, // Palo Alto
  },
  {
    id: "claude",
    name: "Claude AI",
    role: "Anthropic Neural Models",
    description: "Deep reasoning, code synthesis & contextual agent pipelines",
    category: "ai",
    color: "#D97757",
    logoUrl: "https://cdn.simpleicons.org/anthropic/D97757",
    lat: 38.58,
    lon: -121.49, // Sacramento
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    role: "Utility CSS Design",
    description: "Rapid responsive styling with utility-first modern design systems",
    category: "frontend",
    color: "#06B6D4",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    lat: 45.52,
    lon: -122.68, // Portland
  },
  {
    id: "aws",
    name: "AWS",
    role: "Cloud Infrastructure",
    description: "Scalable cloud infrastructure, S3 storage & serverless Lambdas",
    category: "cloud",
    color: "#FF9900",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    lat: 47.61,
    lon: -122.33, // Seattle
  },
  {
    id: "figma",
    name: "Figma",
    role: "UI/UX & Prototyping",
    description: "Collaborative vector UI/UX design, interactive wireframes & systems",
    category: "creative",
    color: "#F24E1E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    lat: 37.33,
    lon: -121.89, // San Jose
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "PostgreSQL BaaS",
    description: "Realtime PostgreSQL backend-as-a-service with edge authentication",
    category: "backend",
    color: "#3ECF8E",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    lat: 32.72,
    lon: -117.16, // San Diego
  },
  {
    id: "github",
    name: "GitHub",
    role: "CI/CD Actions & Repos",
    description: "Git version control, CI/CD automation & repository management",
    category: "tools",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    lat: 41.88,
    lon: -87.63, // Chicago
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Serverless Edge Cloud",
    description: "Global edge network deployments, serverless functions & automated CI",
    category: "cloud",
    color: "#181717",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    lat: 42.36,
    lon: -71.06, // Boston
  },
  {
    id: "firebase",
    name: "Firebase",
    role: "Realtime Database & Auth",
    description: "Realtime cloud document sync, analytics & serverless triggers",
    category: "backend",
    color: "#F59E0B",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    lat: 30.27,
    lon: -97.74, // Austin
  },

  // Europe
  {
    id: "nodejs",
    name: "Node.js",
    role: "High-Throughput Backend",
    description: "Event-driven asynchronous server runtime & scalable microservices",
    category: "backend",
    color: "#16A34A",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    lat: 51.51,
    lon: -0.13, // London
  },
  {
    id: "docker",
    name: "Docker",
    role: "Container Architecture",
    description: "Containerized application environments & microservice orchestration",
    category: "cloud",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    lat: 48.86,
    lon: 2.35, // Paris
  },
  {
    id: "php",
    name: "PHP",
    role: "Backend Architecture",
    description: "Server-side web scripting, robust REST APIs & backend frameworks",
    category: "backend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    lat: 52.52,
    lon: 13.41, // Berlin
  },
  {
    id: "gsap",
    name: "GSAP",
    role: "Interactive Timelines",
    description: "Ultra high-performance timeline animations & scroll choreography",
    category: "creative",
    color: "#84CC16",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gsap/gsap-original.svg",
    lat: 53.35,
    lon: -6.26, // Dublin
  },
  {
    id: "vite",
    name: "Vite",
    role: "Modern Frontend Tooling",
    description: "Blazing fast ESM bundler with instant HMR development environment",
    category: "frontend",
    color: "#6366F1",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    lat: 50.85,
    lon: 4.35, // Brussels
  },

  // Asia & Oceania
  {
    id: "ai_agents",
    name: "AI Agents",
    role: "Autonomous Agentic Pipelines",
    description: "Multi-agent autonomous systems, tool calling & automated execution",
    category: "ai",
    color: "#7C3AED",
    logoUrl: "https://cdn.simpleicons.org/robotframework/7C3AED",
    lat: 35.68,
    lon: 139.69, // Tokyo
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "NoSQL Database",
    description: "Flexible document database for high-scale distributed schemas",
    category: "database",
    color: "#15803D",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    lat: 12.97,
    lon: 77.59, // Bengaluru
  },
  {
    id: "mysql",
    name: "MySQL",
    role: "Relational SQL Engine",
    description: "ACID-compliant relational database management & query indexing",
    category: "database",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    lat: 1.35,
    lon: 103.82, // Singapore
  },
  {
    id: "flutter",
    name: "Flutter",
    role: "Cross-Platform Mobile/Web",
    description: "Cross-platform native mobile & desktop application development",
    category: "frontend",
    color: "#0284C7",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    lat: -33.87,
    lon: 151.21, // Sydney
  },
  {
    id: "html5",
    name: "HTML5",
    role: "Semantic Web Structure",
    description: "Semantic document markup, accessibility & modern browser standards",
    category: "frontend",
    color: "#EA580C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    lat: 25.03,
    lon: 121.57, // Taipei
  },
]

const FILTERS = [
  { id: "all", label: "ALL GLOBAL NODES", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "creative", label: "CREATIVE & 3D", icon: Box },
  { id: "ai", label: "AI & AGENTS", icon: Bot },
  { id: "backend", label: "BACKEND", icon: Cpu },
  { id: "database", label: "DATABASES", icon: Cpu },
  { id: "cloud", label: "CLOUD & DEVOPS", icon: Wrench },
]

/* =========================================================
   ORIGINKIT GLOBE STUDY CONSTANTS & DATA
   ========================================================= */

const MAX_DPR = 2
const FACE = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const QA = Math.PI / 36 // 5 degrees, so the type does not shimmer between frames
const MW = 288
const MH = 144

// 288 x 144 one-bit land mask, inline so the component owns no external asset.
const LAND_B64 =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcBAOD/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA" +
  "//+P//f/LwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4/v/4/////wcAAAAEAPABAAAAfAAAAAAAAAAAAAAAAAAAAADg9w/4" +
  "/////wEAAP4AAAAAAAAA+AAAAAAAAAAAAAAAAAAAAIAG+Of//////wAAAHwGAAAAAAAAAAMAAAAAAAAAAAAAAACABwAc/4P/////" +
  "/wAAADAAAAAAQAAAAD4AAAAAAAAAAAAAAAAAfMbDcQAA/v///wAAAAAAAADABwAA//8HAMAPAAAAAAAAAABgAAAAAAAA/P///wAA" +
  "AAAAAABwAADg//8AAAAAAAAAAAAAAADwG457dwcA8P//HwAAAAAAAAAYAAD///9/eAAAAAAAAAAAAAD4/g0H/w8A8P//PwAAAAAA" +
  "AAAOgOv/////fwD/AAAAAAA/AAAA/B84/v8A8P//LwAAAAD4AAAA4PP//////////wAAAOD///H/+D/3cPgDoP//DwAAAID/BwAA" +
  "x/v/////////P4AA/P///////////////////////w8AAOcBAAgAAAAAAAAAAAAAgP///////////////////////wcAACYAAAQA" +
  "AAAAAAAAAAAAgf///////////////////////wMM8AAAAAAAAAAAAAAAAAAAIID/////////e+wPwH8AgA8AAP/5z///////////" +
  "//////8/ANH///////9/AIALgD8AAAAAwH/+//////////////////9/APj///////8fADwAAD8AAAAA8D/+////////////////" +
  "//sPAPC/+f////8fAPwAADgAAAAA8D/+////////////////D/wBAMCfAP////8PAPwYAAAAAAAA8H/4//////////////9/DgcA" +
  "AAAcAOD///8/APw/AAAAAAAQAB7w//////////////8BgAMAAAACAMD/////Afh/AAAAAAA4gBz+/////////////38A4AMAAMAA" +
  "AMD/////B/z/AAAAAABwwAb+/////////////x8A8AEAAAAAAAD/////P///AwAAAADmgOH//////////////z8A4AAAAAAAAAD+" +
  "////P/7/BwAAAAD28P////////////////8D4AAAAAAAAAD8////f/7/BwAAAADz+f////////////////8HIAAAAAAAAAD6////" +
  "////BAAAAABw/v////////////////8EAAAAAAAAAADo//////8jHgAAAACA//////////////////8MAAAAAAAAAADQ//////8O" +
  "PgAAAADw//////////////////8AAAAAAAAAAADg//////+PIAAAAADA////v////////////38EAAAAAAAAAADg////////AAAA" +
  "AACA//v/zD/8/////////z8AAAAAAAAAAADg//////8bAAAAAACA//N/gD///////////x8GAAAAAAAAAADw//////8AAAAAAAD+" +
  "B8c/AD/+/////////wcPAAAAAAAAAADg//////8AAAAAAAD+gx4/DH74/////////wABAAAAAAAAAADg/////x8AAAAAAAD+gbCn" +
  "///8////////fQABAAAAAAAAAADg/////w8AAAAAAAD/gCDn///4//////9/MgADAAAAAAAAAADA/////w8AAAAAAAD+AADm/3/4" +
  "//////8/cIABAAAAAAAAAADA/////wcAAAAAAAA44AHC///5////////4+ABAAAAAAAAAACA/////wcAAAAAAACI/wEA4P//////" +
  "////4OgAAAAAAAAAAAAA/////wMAAAAAAAD4/wAA4P//////////ADYAAAAAAAAAAAAA/P///wEAAAAAAAD+/wEA8P//////////" +
  "AQcAAAAAAAAAAAAA+P//fwAAAAAAAAD//w8P8P//////////AQEAAAAAAAAAAAAAyP//fwAAAAAAAAD//3//////////////AQAA" +
  "AAAAAAAAAAAA0P+PYQAAAAAAAAD//////z//////////AwAAAAAAAAAAAAAAoP8HwAAAAAAAAMD/////83/+////////AQAAAAAA" +
  "AAAAAAAAIP8DwAAAAAAAAOD/////5//I////////AAAAAAAAAAAAAAAAQP4DgAAAAAAAAPD/////z/+A////////AAAAAAAAAAAA" +
  "AAAAAPwDAAIAAAAAAPD/////z/8ZwP////9/AQAAAAAAAAAAAAAAAPgDQAAAAAAAAPj/////j/9/gP////8fAQAAAAAAAAAAAAAA" +
  "APADEAMAAAAAAPz/////v///AP9//P8DAAAAAAAAAAAAAAAAAPADAwwAAAAAAPj/////P/9/APw//B8AAAAAAAAAAAAIAAAAAPCH" +
  "A8AAAAAAAPj/////P/4/APwP+J8BAAAAAAAAAAAAAAAAAMD/A0YEAAAAAPj/////f/4fAPwH+B8AAwAAAAAAAAAAAAAAAAD/AQAA" +
  "AAAAAPj/////f/wHAPgD8D8AAwAAAAAAAAAAAAAAAADgHwAAAAAAAPj///////wDAPgAwH8AAQAAAAAAAAAAAAAAAADAHwAAAAAA" +
  "APz//////30AAPAAwH8AAAAAAAAAAAAAAAAAAAAAHAAAAAAAAPj//////wsAAPAAgH4AAQAAAAAAAAAAAAAAAAAAGEAAAAAAAPj/" +
  "/////wMBAPAAgHwAAAAAAAAAAAAAAAAAAAAAGPAhAAAAAPD///////cBAOAAgDiABAAAAAAAAAAAAAAAAAAAIPl/AAAAAOD/////" +
  "//8AAGABABBAFAAAAAAAAAAAAAAAAAAAgP7/AQAAAMD///////8AAAABgAAAHAAAAAAAAAAAAAAAAAAAAPz/AQAAAID///////8A" +
  "AAABAAEgCAAAAAAAAAAAAAAAAAAAAPz/HwAAAAD/8P///38AAAAAAANgAAAAAAAAAAAAAAAAAAAAAPz/fwAAAAAAoP///z8AAAAA" +
  "YAd4AAAAAAAAAAAAAAAAAAAAAPz/fwAAAAAAAP///x8AAAAAwAY8AAAAAAAAAAAAAAAAAAAAAP7//wAAAAAAAP///w8AAAAAgAc+" +
  "AAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAP///wcAAAAAgIM/TwAAAAAAAAAAAAAAAAAAAP///wEAAAAAgP///wMAAAAAAIc/QAQA" +
  "AAAAAAAAAAAAAAAAgP///w8AAAAAgP///wEAAAAAAA6fAUQAAAAAAAAAAAAAAAAAAP////8AAAAAAP///wAAAAAAAB6ewuwDAgAA" +
  "AAAAAAAAAAAAgP////8DAAAAAP7//wAAAAAAABwAAvAPAgAAAAAAAAAAAAAAgP////8PAAAAAPz/fwAAAAAAABAAAMCfAQAAAAAA" +
  "AAAAAAAAAP////8PAAAAAPz//wAAAAAAAOADAIA/MAAAAAAAAAAAAAAAAP7///8PAAAAAPz/fwAAAAAAAAAPAMBngAAAAAAAAAAA" +
  "AAAAAP7///8PAAAAAPz//wAAAAAAAAAACABAAAAAAAAAAAAAAAAAAPz///8HAAAAAPj//wAAAAAAAAAAAAAAAAIAAAAAAAAAAAAA" +
  "APz///8DAAAAAPj//wAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAPj///8BAAAAAPz//4AAAAAAAAAAAB8GAAAAAAAAAAAAAAAAAPj/" +
  "//8BAAAAAPz//8EAAAAAAAAAIB8OAAAAAAAAAAAAAAAAAPD///8BAAAAAP7//+AAAAAAAAAA+B8OACAAAAAAAAAAAAAAAMD///8B" +
  "AAAAAP7/f/gAAAAAAAAA/H8eAAAAAAAAAAAAAAAAAID///8AAAAAAP7/H/gAAAAAAAAA/P8fAABAAAAAAAAAAAAAAAD///8AAAAA" +
  "APz/D3AAAAAAAAAA/v8/AAAAAAAAAAAAAAAAAAD///8AAAAAAPj/D3gAAAAAAADA//9/AAgAAAAAAAAAAAAAAAD//38AAAAAAPj/" +
  "DzgAAAAAAADw////AAAAAAAAAAAAAAAAAAD//x8AAAAAAPD/DzgAAAAAAAD4////AQAAAAAAAAAAAAAAAAD//wMAAAAAAPD/DzgA" +
  "AAAAAAD4////AwAAAAAAAAAAAAAAAID//wEAAAAAAPD/AwAAAAAAAAD4////AwAAAAAAAAAAAAAAAID//wEAAAAAAPD/AwAAAAAA" +
  "AAD4////BwAAAAAAAAAAAAAAAID//wEAAAAAAOD/AwAAAAAAAAD4////BwAAAAAAAAAAAAAAAID//wAAAAAAAOD/AQAAAAAAAADw" +
  "////BwAAAAAAAAAAAAAAAID//wAAAAAAAMD/AAAAAAAAAADw////AwAAAAAAAAAAAAAAAID/fwAAAAAAAIB/AAAAAAAAAADgf/z/" +
  "AwAAAAAAAAAAAAAAAID/PwAAAAAAAIA/AAAAAAAAAADgB/D/AQAAAAAAAAAAAAAAAMD/HQAAAAAAAIABAAAAAAAAAADwAND/AQAA" +
  "AAAAAAAAAAAAAMD/AwAAAAAAAAAAAAAAAAAAAAAAAID/AAAIAAAAAAAAAAAAAMD/BwAAAAAAAAAAAAAAAAAAAAAAAAD/AAAQAAAA" +
  "AAAAAAAAAOD/AwAAAAAAAAAAAAAAAAAAAAAAAAA+AABwAAAAAAAAAAAAAOA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAA" +
  "AAAAAOA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAOAPAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAGAAAAAAAAAAAA" +
  "AMAPAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAADAAAAAAAAAAAAAPAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMABAAAAAAAAAAAAAPAD" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAOABAAAAAAAAAAAAAPAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAHAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPCBAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGABAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAA" +
  "AAAAAAAAAAAAAAAcAAAAAAAAAAAAAAA+AABAAJ8//j8PAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAPD/fwD///////8/AAAAAAAA" +
  "AAAAAAAAAIA+AAAAAAAAAAAAPP///8D/////////HwAAAAAAAAAAAAAAAIA9AAAAAAAA8Pz/////P/j//////////wMAAAAAAAAA" +
  "AMAAAPB9AAAAAID/////////P/7///////////8BAAAAAAAAAOABAwB/AAAAAPD///////////////////////8AAAAAAFACPoD/" +
  "//9/AAAAAPD//////////////////////x8AAAAA+P////////8HAAAAAP///////////////////////wcAAAAA/v///////wMA" +
  "AAAA/v///////////////////////wcAAAD8/////////w8AAA7w/////////////////////////w8AAMAB/////////wMAgB84" +
  "/////////////////////////wEAAAAA/P///////3/w4AcA/////////////////////////wAAAADg//////////8/gM//////" +
  "/////////////////////wMAAADg/////////////f///////////////////////////z8A7wMA/v//////////////////////" +
  "//////////////////8/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAA"

function num(v: unknown, fb: number): number {
  return typeof v === "number" && isFinite(v) ? v : fb
}

function clampN(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

function parseRGB(input: string | undefined, fb: [number, number, number]): [number, number, number] {
  if (!input) return fb
  const str = String(input).trim()
  if (str.charAt(0) === "#") {
    let hex = str.slice(1)
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b]
    }
    return fb
  }
  const m = str.match(/[\d.]+/g)
  if (m && m.length >= 3) return [+m[0], +m[1], +m[2]]
  return fb
}

type Node = { lat: number; lon: number; land: boolean; c: string }

export interface ProjectedGlobeSkill {
  id: string
  x: number
  y: number
  scale: number
  opacity: number
  isVisible: boolean
  depth: number
}

interface GlobeGroup {
  radius?: number
  drift?: number
  letters?: number
}
const GLOBE_DEFAULTS: Required<GlobeGroup> = { radius: 100, drift: 210, letters: 100 }

interface PointerGroup {
  zoom?: number
  light?: number
  pins?: number
}
const POINTER_DEFAULTS: Required<PointerGroup> = { zoom: 100, light: 100, pins: 7 }

interface Props {
  style?: React.CSSProperties
  width?: number
  height?: number
  background?: string
  baseColor?: string
  phrase?: string
  density?: number
  glyphSize?: number
  speed?: number
  hover?: number
  globe?: GlobeGroup
  pointer?: PointerGroup
}

interface ActiveDragState {
  skillId: string
  x: number
  y: number
  isSnapping?: boolean
}

function __OriginkitBase_GlobeStudy(props: Props) {
  const {
    style,
    background = "#0C0C0C",
    baseColor = "#E2E4E9",
    phrase = "everypointonthisballisapathbacktoanotherone",
    density = 53,
    glyphSize = 90,
    speed = 100,
    hover = 100,
    globe,
    pointer,
    width,
    height,
  } = props

  const globe_ = { ...GLOBE_DEFAULTS, ...(globe || {}) }
  const pointer_ = { ...POINTER_DEFAULTS, ...(pointer || {}) }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  sizeRef.current = { w: num(width, 0), h: num(height, 0) }

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null)
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null)
  const [skillCoordMap, setSkillCoordMap] = useState<Record<string, ProjectedGlobeSkill>>({})

  const ptrRef = useRef({
    on: 0,
    x: -1e9,
    y: -1e9,
    dragging: 0,
    dx: 0,
    dy: 0,
    moved: 0,
    click: 0,
  })

  const vRef = useRef<Record<string, number | string>>({})
  vRef.current = {
    base: baseColor,
    phrase: String(phrase || "").length ? String(phrase) : "globe",
    density: clampN(num(density, 100), 40, 200) / 100,
    glyphSize: clampN(num(glyphSize, 100), 20, 300) / 100,
    speed: clampN(num(speed, 50), 0, 100) / 50,
    hover: clampN(num(hover, 100), 0, 200) / 100,
    radius: clampN(num(globe_.radius, 100), 40, 200) / 100,
    drift: clampN(num(globe_.drift, 100), 0, 400) / 100,
    letters: clampN(num(globe_.letters, 100), 0, 200) / 100,
    zoom: clampN(num(pointer_.zoom, 100), 0, 300) / 100,
    light: clampN(num(pointer_.light, 100), 0, 300) / 100,
    pins: Math.round(clampN(num(pointer_.pins, 7), 0, 24)),
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let land: Uint8Array | null = null
    try {
      const bin = atob(LAND_B64)
      land = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) land[i] = bin.charCodeAt(i)
    } catch {
      land = null
    }

    const isLand = (lon: number, lat: number) => {
      if (!land) return false
      const gx = Math.floor(((lon + 180) / 360) * MW)
      const gy = Math.floor(((90 - lat) / 180) * MH)
      if (gx < 0 || gx >= MW || gy < 0 || gy >= MH) return false
      const b = gy * MW + gx
      return ((land[b >> 3] >> (b & 7)) & 1) === 1
    }

    let nodes: Node[] = []
    let builtKey = ""
    const build = (dens: number, letterK: number, text: string) => {
      const step = 3.05 / dens
      nodes = []
      let k = 0
      let run = 0
      let sea3 = 0
      const every = letterK <= 0 ? 0 : Math.max(1, Math.round(2 / letterK))
      for (let lat = -86; lat <= 86; lat += step) {
        const rl = Math.cos((lat * Math.PI) / 180)
        const n = Math.max(1, Math.round(98 * dens * rl))
        for (let i = 0; i < n; i++) {
          const lon = -180 + (360 * i) / n
          const l = isLand(lon, lat)
          if (!l && sea3++ % 2) continue
          let letter = ""
          if (l && every && run++ % every === 0) letter = text.charAt(k++ % text.length)
          nodes.push({ lat: (lat * Math.PI) / 180, lon: (lon * Math.PI) / 180, land: l, c: letter })
        }
      }
      builtKey = dens + "|" + letterK + "|" + text
    }

    const pins: { lat: number; lon: number; t: number }[] = []
    const view = { cx: 0, cy: 0, R: 1, cs: 1, sn: 0, ct: 1, st: 0 }

    const unproject = (px: number, py: number) => {
      const x1 = (px - view.cx) / view.R
      const y2 = (view.cy - py) / view.R
      const q = 1 - x1 * x1 - y2 * y2
      if (q <= 0.002) return null
      const z2 = Math.sqrt(q)
      const y0 = y2 * view.ct + z2 * view.st
      const z1 = -y2 * view.st + z2 * view.ct
      const x0 = x1 * view.cs + z1 * view.sn
      const z0 = -x1 * view.sn + z1 * view.cs
      return { lat: Math.asin(clampN(y0, -1, 1)), lon: Math.atan2(z0, x0) }
    }

    let raf = 0
    let last = performance.now()
    let clock = 0
    let spin = 2.1
    let vel = 0.16
    let tilt = -0.36
    let vtilt = 0
    let zoom = 1
    let zoomT = 1
    let seenClick = 0
    const sea: number[] = []
    const soil: number[] = []
    const land8: number[][] = []

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const v = vRef.current
      const sp = v.speed as number
      clock += dt * sp

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const cw = sizeRef.current.w || canvas.clientWidth || 1200
      const ch = sizeRef.current.h || canvas.clientHeight || 800
      const bw = Math.max(1, Math.round(cw * dpr))
      const bh = Math.max(1, Math.round(ch * dpr))
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, cw, ch)

      const key = (v.density as number) + "|" + (v.letters as number) + "|" + (v.phrase as string)
      if (key !== builtKey) build(v.density as number, v.letters as number, v.phrase as string)

      const u = Math.min(cw, ch)
      const ptr = ptrRef.current
      const hv = (v.hover as number) * (ptr.on ? 1 : 0)

      zoom += (zoomT - zoom) * Math.min(1, dt / 0.18)

      const cx = cw / 2
      const cy = ch / 2 + u * 0.035
      const R = u * 0.32 * zoom * (v.radius as number)
      const fs = u * 0.0275 * Math.pow(zoom, 0.72) * (v.glyphSize as number)

      if (ptr.dragging) {
        const dspin = (ptr.dx * u) / R
        const dtilt = (-ptr.dy * u) / R
        ptr.dx = 0
        ptr.dy = 0
        spin += dspin
        tilt = clampN(tilt + dtilt, -1.15, 1.15)
        const k = Math.min(1, dt / 0.07)
        const inv = 1 / Math.max(dt, 1 / 240)
        vel += (clampN(dspin * inv, -9, 9) - vel) * k
        vtilt += (clampN(dtilt * inv, -9, 9) - vtilt) * k
      } else {
        const idle = 0.16 * (v.drift as number) * (hv > 0 ? 0.28 : 1)
        vel += (idle - vel) * Math.min(1, (dt * sp) / 0.9)
        vtilt *= Math.exp(-dt * sp * 6.6)
        tilt = clampN(tilt + vtilt * dt * sp, -1.15, 1.15)
        tilt += (-0.36 - tilt) * Math.min(1, (dt * sp) / 4)
        spin += vel * dt * sp
      }

      if (ptr.click !== seenClick) {
        seenClick = ptr.click
        const g = unproject(ptr.x, ptr.y)
        const cap = v.pins as number
        if (g && cap > 0) {
          pins.push({ lat: g.lat, lon: g.lon, t: clock })
          while (pins.length > cap) pins.shift()
        }
      }

      const cs = Math.cos(spin)
      const sn = Math.sin(spin)
      const ct = Math.cos(tilt)
      const st = Math.sin(tilt)
      view.cx = cx
      view.cy = cy
      view.R = R
      view.cs = cs
      view.sn = sn
      view.ct = ct
      view.st = st

      const lightK = (v.light as number) * hv
      const lx = lightK > 0 && !ptr.dragging ? ptr.x : -1e9
      const ly = lightK > 0 && !ptr.dragging ? ptr.y : -1e9
      const lr = u * 0.2
      const lr2 = lr * lr

      const ink = parseRGB(v.base as string, [226, 228, 233])
      const rgb = ink[0] + "," + ink[1] + "," + ink[2]
      const tone = (a: number) => "rgba(" + rgb + "," + clampN(a, 0, 1).toFixed(3) + ")"

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      sea.length = 0
      soil.length = 0
      for (let bi = 0; bi < 8; bi++) if (land8[bi]) land8[bi].length = 0

      for (let i = 0; i < nodes.length; i++) {
        const nd = nodes[i]
        const cl = Math.cos(nd.lat)
        const x0 = cl * Math.cos(nd.lon)
        const y0 = Math.sin(nd.lat)
        const z0 = cl * Math.sin(nd.lon)
        const x1 = x0 * cs - z0 * sn
        const z1 = x0 * sn + z0 * cs
        const y2 = y0 * ct - z1 * st
        const z2 = y0 * st + z1 * ct
        if (z2 <= 0.02) continue

        const px = cx + x1 * R
        const py = cy - y2 * R
        const ddx = px - lx
        const ddy = py - ly
        const glow = ddx * ddx + ddy * ddy < lr2 ? (1 - Math.sqrt(ddx * ddx + ddy * ddy) / lr) * lightK : 0
        if (!nd.land) {
          sea.push(px, py, Math.min(0.999, z2 + glow * 0.55))
          continue
        }
        if (!nd.c) {
          soil.push(px, py, Math.min(0.999, z2 + glow * 0.55))
          continue
        }

        const tx0 = -Math.sin(nd.lon)
        const tz0 = Math.cos(nd.lon)
        const tx1 = tx0 * cs - tz0 * sn
        const tz1 = tx0 * sn + tz0 * cs
        const ang = Math.round(Math.atan2(tz1 * st, tx1) / QA) * QA
        const b = Math.min(7, Math.max(0, (Math.min(0.999, z2 + glow * 0.6) * 7.99) | 0))
        ;(land8[b] || (land8[b] = [])).push(px, py, ang, i)
      }

      const dmin = Math.max(0.7, u * 0.0029)
      const dots = (list: number[], baseA: number, gain: number, grow: number) => {
        for (let lvl = 0; lvl < 6; lvl++) {
          const z = (lvl + 0.5) / 6
          const dsz = dmin * grow * (0.55 + 0.75 * z)
          ctx.fillStyle = tone(baseA + gain * z)
          ctx.beginPath()
          for (let q = 0; q < list.length; q += 3) {
            const lv = list[q + 2] >= 1 ? 5 : (list[q + 2] * 6) | 0
            if (lv !== lvl) continue
            ctx.rect(list[q] - dsz / 2, list[q + 1] - dsz / 2, dsz, dsz)
          }
          ctx.fill()
        }
      }
      dots(sea, 0.1, 0.22, 1.0)
      dots(soil, 0.34, 0.46, 1.7)

      for (let bi = 0; bi < 8; bi++) {
        const arr = land8[bi]
        if (!arr || !arr.length) continue
        const zb = (bi + 0.5) / 8
        ctx.font = "bold " + (fs * (0.42 + 0.58 * zb)).toFixed(2) + "px " + FACE
        ctx.fillStyle = tone(0.28 + 0.72 * Math.pow(zb, 0.6))
        for (let t = 0; t < arr.length; t += 4) {
          ctx.save()
          ctx.translate(arr[t], arr[t + 1])
          ctx.rotate(arr[t + 2])
          ctx.fillText(nodes[arr[t + 3]].c, 0, 0)
          ctx.restore()
        }
      }

      for (let pi = 0; pi < pins.length; pi++) {
        const pn = pins[pi]
        const pcl = Math.cos(pn.lat)
        const ax = pcl * Math.cos(pn.lon)
        const ay = Math.sin(pn.lat)
        const az = pcl * Math.sin(pn.lon)
        const bx1 = ax * cs - az * sn
        const bz1 = ax * sn + az * cs
        const by2 = ay * ct - bz1 * st
        const bz2 = ay * st + bz1 * ct
        if (bz2 <= 0.02) continue
        const ppx = cx + bx1 * R
        const ppy = cy - by2 * R
        const age = clock - pn.t
        const pop = Math.min(1, age / 0.22)
        const rr2 = u * 0.016 * (0.4 + 0.6 * pop) * (0.55 + 0.45 * bz2)
        ctx.beginPath()
        ctx.arc(ppx, ppy, rr2, 0, Math.PI * 2)
        ctx.strokeStyle = tone(0.3 + 0.55 * bz2)
        ctx.lineWidth = Math.max(0.7, u * 0.0022)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(ppx, ppy, Math.max(0.7, rr2 * 0.22), 0, Math.PI * 2)
        ctx.fillStyle = tone(0.45 + 0.55 * bz2)
        ctx.fill()
        if (age < 0.9) {
          const w2 = 1 - age / 0.9
          ctx.beginPath()
          ctx.arc(ppx, ppy, rr2 + (1 - w2) * u * 0.05, 0, Math.PI * 2)
          ctx.strokeStyle = tone(0.55 * w2 * w2)
          ctx.lineWidth = Math.max(0.6, u * 0.0016)
          ctx.stroke()
        }
      }

      // 3D Projection for Tech Skills on Globe
      const coords: Record<string, ProjectedGlobeSkill> = {}
      for (let i = 0; i < TECH_SKILLS.length; i++) {
        const skill = TECH_SKILLS[i]
        const latRad = (skill.lat * Math.PI) / 180
        const lonRad = (skill.lon * Math.PI) / 180

        const pcl = Math.cos(latRad)
        const ax = pcl * Math.cos(lonRad)
        const ay = Math.sin(latRad)
        const az = pcl * Math.sin(lonRad)

        const bx1 = ax * cs - az * sn
        const bz1 = ax * sn + az * cs
        const by2 = ay * ct - bz1 * st
        const bz2 = ay * st + bz1 * ct

        const isVisible = bz2 > 0.03
        const ppx = cx + bx1 * R
        const ppy = cy - by2 * R
        const scale = Math.max(0.65, Math.min(1.15, 0.72 + 0.45 * bz2))
        const depthAlpha = isVisible ? Math.min(1, Math.max(0.25, bz2 * 1.4)) : 0

        coords[skill.id] = {
          id: skill.id,
          x: ppx,
          y: ppy,
          scale,
          opacity: depthAlpha,
          isVisible,
          depth: bz2,
        }
      }
      setSkillCoordMap(coords)

      raf = requestAnimationFrame(render)
    }

    let lastX = 0
    let lastY = 0
    const localPoint = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      if (r.width <= 0 || r.height <= 0) return null
      const cw = sizeRef.current.w || canvas.clientWidth || 1200
      const ch = sizeRef.current.h || canvas.clientHeight || 800
      return { x: ((e.clientX - r.left) / r.width) * cw, y: ((e.clientY - r.top) / r.height) * ch }
    }

    const track = (e: PointerEvent) => {
      const p = localPoint(e)
      if (!p) return
      const ptr = ptrRef.current
      ptr.on = 1
      if (ptr.dragging) {
        const u = Math.min(sizeRef.current.w || 1200, sizeRef.current.h || 800)
        ptr.dx += (p.x - lastX) / u
        ptr.dy += (p.y - lastY) / u
        ptr.moved = 1
      }
      ptr.x = p.x
      ptr.y = p.y
      lastX = p.x
      lastY = p.y
    }

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest(".skill-badge-node") || (e.target as HTMLElement)?.closest(".detached-skill-card")) return
      const p = localPoint(e)
      if (!p) return
      const ptr = ptrRef.current
      ptr.dragging = 1
      ptr.moved = 0
      ptr.x = p.x
      ptr.y = p.y
      lastX = p.x
      lastY = p.y
      try {
        canvas.setPointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }

    const onUp = () => {
      const ptr = ptrRef.current
      if (ptr.dragging && !ptr.moved) ptr.click++
      ptr.dragging = 0
    }

    const onLeave = () => {
      if (!ptrRef.current.dragging) ptrRef.current.on = 0
    }

    const onWheel = (e: WheelEvent) => {
      const v = vRef.current
      if ((v.zoom as number) <= 0) return
      e.preventDefault()
      zoomT = clampN(zoomT * Math.exp(-e.deltaY * 0.0016 * (v.zoom as number)), 0.85, 2.6)
    }

    canvas.addEventListener("pointermove", track)
    canvas.addEventListener("pointerenter", track)
    canvas.addEventListener("pointerleave", onLeave)
    canvas.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    canvas.addEventListener("wheel", onWheel, { passive: false })
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener("pointermove", track)
      canvas.removeEventListener("pointerenter", track)
      canvas.removeEventListener("pointerleave", onLeave)
      canvas.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      canvas.removeEventListener("wheel", onWheel)
    }
  }, [])

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

  const draggedSkill = activeDrag ? TECH_SKILLS.find((s) => s.id === activeDrag.skillId) : null
  const draggedBadgeSlot = activeDrag && activeDrag.skillId ? skillCoordMap[activeDrag.skillId] : null

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D Globe Study with Tech Stack Geolocation Skills"
      className="relative w-full h-full min-h-[850px] sm:min-h-[920px] lg:min-h-[1000px] overflow-hidden select-none flex flex-col justify-between pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 text-[#D7E2EA]"
      style={{
        background,
        ...style,
      }}
    >
      {/* 1. TOP EDITORIAL BANNER */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-none mb-6 sm:mb-10">
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-[#38BDF8] uppercase mb-3 shadow-2xl backdrop-blur-xl">
            <Globe className="w-3.5 h-3.5 text-[#38BDF8] animate-spin" style={{ animationDuration: "12s" }} />
            <span>// GLOBAL TECH NODE MATRIX • ORIGINKIT GLOBE</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={15}>
          <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-xl leading-relaxed">
            Drag the 3D globe to spin &amp; tilt • Drag any skill node outward to view capability card
          </p>
        </FadeIn>
      </div>

      {/* 2. THE 2D CANVAS GLOBE */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none select-none z-10 cursor-grab active:cursor-grabbing"
      />

      {/* 3. INTERACTIVE 3D PINNED SKILL BADGES */}
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
                zIndex: isHovered ? 60 : Math.round(badge.depth * 100),
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

      {/* 5. FUTURISTIC CELESTIAL HUD FILTER DOCK */}
      <div className="relative z-30 w-full max-w-5xl mx-auto mt-auto flex flex-col items-center pointer-events-auto gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>
            GLOBAL TELEMETRY • {activeCategory === "all" ? `${TECH_SKILLS.length} NODES SYNCHRONIZED` : `${TECH_SKILLS.filter((s) => s.category === activeCategory).length} NODES FILTERED`}
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
  globe: {
    drift: 210,
    radius: 100,
    letters: 100,
  },
  pointer: {
    pins: 7,
    zoom: 100,
    light: 100,
  },
}

export default function GlobeStudy(props: Record<string, unknown>) {
  return <__OriginkitBase_GlobeStudy {...(__originkitPresetProps as Record<string, unknown>)} {...props} />
}

GlobeStudy.displayName = "Globe Study"

export const InteractiveSkillsCanvas = GlobeStudy
