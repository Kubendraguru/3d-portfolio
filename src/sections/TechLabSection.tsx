import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  Terminal,
  Activity,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Layers,
  Check,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

type ExperimentMode = 'particles' | 'waves' | 'neural' | 'terminal';
type ColorScheme = 'cyber' | 'emerald' | 'solar' | 'ice';

interface LabParams {
  speed: number;
  density: number;
  colorScheme: ColorScheme;
  turbulence: number;
  glow: number;
}

const COLOR_PALETTES: Record<
  ColorScheme,
  { name: string; primary: string; secondary: string; accent: string; bgGlow: string }
> = {
  cyber: {
    name: 'Cyberpunk Neon',
    primary: '#7621B0',
    secondary: '#38BDF8',
    accent: '#F43F5E',
    bgGlow: 'rgba(118, 33, 176, 0.15)',
  },
  emerald: {
    name: 'Matrix Emerald',
    primary: '#10B981',
    secondary: '#06B6D4',
    accent: '#34D399',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
  },
  solar: {
    name: 'Solar Amber',
    primary: '#F59E0B',
    secondary: '#EF4444',
    accent: '#FBBF24',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
  },
  ice: {
    name: 'Electric Ice',
    primary: '#0EA5E9',
    secondary: '#818CF8',
    accent: '#38BDF8',
    bgGlow: 'rgba(14, 165, 233, 0.15)',
  },
};

const EXPERIMENT_CONFIGS = [
  {
    id: 'particles' as ExperimentMode,
    title: 'Quantum Vortex',
    subtitle: 'N-Body Magnetic Particle Swarm',
    icon: Sparkles,
    badge: 'GPU Physics',
  },
  {
    id: 'waves' as ExperimentMode,
    title: 'Chromatic Waves',
    subtitle: 'Harmonic Fluid Ribbon Field',
    icon: Zap,
    badge: 'Harmonics',
  },
  {
    id: 'neural' as ExperimentMode,
    title: 'Neural Connectome',
    subtitle: 'Dynamic Proximity Network',
    icon: Layers,
    badge: 'Graph Mesh',
  },
  {
    id: 'terminal' as ExperimentMode,
    title: 'Hacker Terminal',
    subtitle: 'Interactive Command Shell',
    icon: Terminal,
    badge: 'Interactive CLI',
  },
];

export const TechLabSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperimentMode>('particles');
  const [params, setParams] = useState<LabParams>({
    speed: 1.0,
    density: 800,
    colorScheme: 'cyber',
    turbulence: 50,
    glow: 70,
  });

  const [fps, setFps] = useState(60);
  const [particleCount, setParticleCount] = useState(800);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: 'input' | 'output' | 'system'; text: string }>
  >([
    { type: 'system', text: 'ANTIGRAVITY LAB OS v4.2.0 [Ready]' },
    { type: 'system', text: 'Type "help" or click suggestions below.' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Smooth FPS tracking & animation frame
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // ----------------------------------------------------------------
  // Canvas 2D Physics & Render Loop for 3 Graphical Modes
  // ----------------------------------------------------------------
  useEffect(() => {
    if (activeMode === 'terminal') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };

    window.addEventListener('resize', handleResize);

    // Particle Swarm Initializer
    const count = Math.floor(params.density);
    setParticleCount(count);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      angle: number;
      speed: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = [
      COLOR_PALETTES[params.colorScheme].primary,
      COLOR_PALETTES[params.colorScheme].secondary,
      COLOR_PALETTES[params.colorScheme].accent,
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2.2 + 0.8,
        baseSize: Math.random() * 2.2 + 0.8,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.005) * params.speed,
        radius: Math.random() * Math.min(width, height) * 0.45 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      targetMouseX = (clientX - rect.left) * scaleX;
      targetMouseY = (clientY - rect.top) * scaleY;
      setMousePos({ x: Math.round(targetMouseX), y: Math.round(targetMouseY) });
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    let shockwaveRadius = 0;
    let shockwaveOrigin = { x: width / 2, y: height / 2 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      shockwaveOrigin = {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
      shockwaveRadius = 1;
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });

    let waveTime = 0;

    // Render loop
    const render = (time: number) => {
      // FPS Calculation
      frameCountRef.current++;
      if (time - lastTimeRef.current >= 500) {
        setFps(Math.round((frameCountRef.current * 1000) / (time - lastTimeRef.current)));
        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.fillStyle = 'rgba(12, 12, 12, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // MODE 1: QUANTUM PARTICLES VORTEX
      if (activeMode === 'particles') {
        const center = { x: mouseX, y: mouseY };
        const turbFactor = params.turbulence / 50;

        if (shockwaveRadius > 0) {
          shockwaveRadius += 18 * params.speed;
          ctx.beginPath();
          ctx.arc(shockwaveOrigin.x, shockwaveOrigin.y, shockwaveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = COLOR_PALETTES[params.colorScheme].accent;
          ctx.lineWidth = Math.max(1, 4 - shockwaveRadius / 100);
          ctx.globalAlpha = Math.max(0, 1 - shockwaveRadius / 400);
          ctx.stroke();
          ctx.globalAlpha = 1;
          if (shockwaveRadius > 400) shockwaveRadius = 0;
        }

        particles.forEach((p) => {
          p.angle += p.speed * params.speed;
          const orbitX = center.x + Math.cos(p.angle) * p.radius;
          const orbitY = center.y + Math.sin(p.angle) * p.radius * 0.6;

          // Pull to orbit with turbulence
          p.x += (orbitX - p.x) * 0.04 * turbFactor;
          p.y += (orbitY - p.y) * 0.04 * turbFactor;

          // Shockwave dispersion
          if (shockwaveRadius > 0) {
            const dx = p.x - shockwaveOrigin.x;
            const dy = p.y - shockwaveOrigin.y;
            const dist = Math.hypot(dx, dy);
            if (Math.abs(dist - shockwaveRadius) < 30) {
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * 15;
              p.y += Math.sin(angle) * 15;
            }
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          if (params.glow > 0) {
            ctx.shadowBlur = (params.glow / 10) * p.size;
            ctx.shadowColor = p.color;
          }
          ctx.fill();
          ctx.restore();
        });
      }

      // MODE 2: CHROMATIC WAVES / HARMONIC RIBBONS
      else if (activeMode === 'waves') {
        waveTime += 0.015 * params.speed;
        const ribbons = 7;
        const points = 80;
        const colorPalette = COLOR_PALETTES[params.colorScheme];

        for (let r = 0; r < ribbons; r++) {
          ctx.save();
          ctx.beginPath();

          const offset = (r * Math.PI) / ribbons;
          const color = r % 2 === 0 ? colorPalette.primary : colorPalette.secondary;

          for (let i = 0; i <= points; i++) {
            const x = (i / points) * width;
            const mouseInfluence =
              Math.sin((x / width) * Math.PI) * ((mouseY - height / 2) * 0.4);
            const y =
              height / 2 +
              Math.sin(i * 0.12 + waveTime + offset) * (60 + r * 12) * (params.turbulence / 50) +
              Math.cos(i * 0.08 - waveTime) * 35 +
              mouseInfluence;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.strokeStyle = color;
          ctx.lineWidth = (r === 0 ? 3 : 1.8) * (params.glow / 50);
          ctx.globalAlpha = 0.45 + (r / ribbons) * 0.4;
          if (params.glow > 40) {
            ctx.shadowBlur = params.glow * 0.3;
            ctx.shadowColor = color;
          }
          ctx.stroke();
          ctx.restore();
        }
      }

      // MODE 3: NEURAL CONNECTOME
      else if (activeMode === 'neural') {
        const maxDist = 90 * (params.turbulence / 40);
        const palette = COLOR_PALETTES[params.colorScheme];

        // Draw nodes
        particles.slice(0, 140).forEach((p, idx) => {
          p.x += p.vx * params.speed;
          p.y += p.vy * params.speed;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Connect with mouse
          const mdx = mouseX - p.x;
          const mdy = mouseY - p.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = palette.accent;
            ctx.globalAlpha = (1 - mDist / 160) * 0.8;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          // Connect with other nodes
          for (let j = idx + 1; j < 140; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = palette.secondary;
              ctx.globalAlpha = (1 - dist / maxDist) * 0.35;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Node body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = palette.primary;
          ctx.globalAlpha = 0.9;
          ctx.fill();
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('touchstart', handlePointerDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeMode, params]);

  // ----------------------------------------------------------------
  // Terminal Command Parser
  // ----------------------------------------------------------------
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'AVAILABLE COMMANDS:\n  • projects   - List live portfolio projects\n  • skills     - Show technical stack & architectures\n  • contact    - Get email & contact channels\n  • metrics    - Display performance telemetry\n  • clear      - Clear terminal screen\n  • hire       - Quick recruiter direct contact link\n  • secret     - Unlock hidden developer easter egg',
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: '⚡ ACTIVE PORTFOLIO PROJECTS:\n  01. EcoVista — Taj Mahal 3D Tour (WebGL Spatial Flight)\n  02. Apex Elite Fitness (Full Stack Performance Platform)\n  03. Anna University Study Hub (E-Learning & Exam Portal)\n  04. Solespace — Haute Footwear (3D Interactive Store)\n  05. SnapTask (AI Note-to-Task & OCR Mobile App)',
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: '🛠️ CORE SPECIALIZATIONS:\n  • Frontend: React 18, Next.js, TypeScript, Tailwind CSS, Framer Motion\n  • Creative 3D: Three.js, WebGL Shaders, GLTF Optimization, Physics Engine\n  • Backend: Node.js, Express, Python AI, PostgreSQL, MongoDB, Prisma\n  • Cloud: Vercel Edge, AWS, Docker, CI/CD Pipelines, Cloudflare CDN',
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: '📫 CONNECT WITH ME:\n  • GitHub: https://github.com/Kubendraguru\n  • Status: 🟢 Open for Full-Stack & Creative Engineering roles\n  • Message: Use the contact dock or drop a direct inquiry!',
        });
        break;
      case 'metrics':
        newHistory.push({
          type: 'output',
          text: `📊 SYSTEM TELEMETRY:\n  • FPS: ${fps} FPS\n  • Active Particles: ${particleCount}\n  • Current Palette: ${COLOR_PALETTES[params.colorScheme].name}\n  • Turbulence: ${params.turbulence}%\n  • Core Architecture: React + WebGL Canvas 2D + Framer Motion`,
        });
        break;
      case 'hire':
        newHistory.push({
          type: 'output',
          text: '🚀 READY TO COLLABORATE!\nAvailable for full-time frontend/full-stack positions, high-impact contract work, and creative spatial web experiences.',
        });
        break;
      case 'secret':
        newHistory.push({
          type: 'output',
          text: '✨ EASTER EGG UNLOCKED!\n"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke\n(Switch to Quantum Vortex mode and click rapidly to spawn particle shockwaves!)',
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'output',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleCopyCode = () => {
    const codeSnippet = `// Antigravity ${EXPERIMENT_CONFIGS.find((c) => c.id === activeMode)?.title} Algorithm
// Real-time parameters: Speed: ${params.speed}x, Density: ${params.density}
const renderFrame = (ctx, particles, mouse) => {
  particles.forEach(p => {
    p.angle += p.speed * ${params.speed};
    p.x += (mouse.x + Math.cos(p.angle) * p.radius - p.x) * 0.04 * ${(params.turbulence / 50).toFixed(2)};
    p.y += (mouse.y + Math.sin(p.angle) * p.radius * 0.6 - p.y) * 0.04;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  });
};`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="tech-lab"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] py-24 sm:py-32 px-4 sm:px-6 md:px-10 z-20 border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D7E2EA]/10 pb-8">
          <div>
            <FadeIn delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#38BDF8] font-mono mb-4">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                Interactive Sandbox & GPU Lab
              </div>
              <h2
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
                className="font-bold tracking-tight text-[#D7E2EA] uppercase leading-none"
              >
                Creative Tech Lab
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <p className="text-[#888888] text-sm sm:text-base max-w-xl mt-3 font-light">
                An interactive playground showcasing custom WebGL physics, GPU particle dynamics,
                real-time mathematical harmonic ribbons, and interactive terminal shells.
              </p>
            </FadeIn>
          </div>

          {/* Telemetry Badges */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] border border-white/10 text-[#38BDF8]">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>
                  FPS: <strong className="text-white">{fps}</strong>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] border border-white/10 text-[#D7E2EA]/80">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>
                  Nodes: <strong className="text-white">{particleCount}</strong>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Experiment Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {EXPERIMENT_CONFIGS.map((exp) => {
            const Icon = exp.icon;
            const isActive = activeMode === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveMode(exp.id)}
                className={`relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 overflow-hidden ${
                  isActive
                    ? 'bg-[#181818] border-[#38BDF8] shadow-[0_0_30px_rgba(56,189,248,0.18)]'
                    : 'bg-[#111111] border-white/10 hover:border-white/20 hover:bg-[#141414]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none"
                  />
                )}
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isActive ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'bg-white/5 text-[#888888]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-[#888888] border border-white/5">
                    {exp.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-white">{exp.title}</h4>
                  <p className="text-xs text-[#777777] font-light mt-0.5">{exp.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Studio Canvas & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Screen (8 Cols) */}
          <div
            className={`lg:col-span-8 relative w-full h-[450px] sm:h-[540px] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A0A0A] border-2 border-white/15 shadow-2xl flex flex-col ${
              isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)]' : ''
            }`}
          >
            {/* Screen Top Bar */}
            <div className="h-12 px-5 bg-[#121212] border-b border-white/10 flex items-center justify-between z-10 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-[#888888] tracking-widest uppercase">
                  {activeMode === 'terminal' ? 'Interactive Terminal' : 'Canvas Render Target'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeMode !== 'terminal' && (
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 px-2.5 transition-colors ${
                      showCode
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                        : 'bg-white/5 border-white/10 text-[#888888] hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Inspect Code</span>
                  </button>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#888888] hover:text-white transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Screen Viewport */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              {activeMode !== 'terminal' ? (
                <>
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full block cursor-crosshair touch-none"
                  />
                  {/* Subtle Canvas Interaction Helper */}
                  <div className="absolute bottom-4 left-5 pointer-events-none text-[11px] font-mono text-white/40 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Move cursor to attract · Click / Tap for impulse shockwave</span>
                  </div>
                </>
              ) : (
                /* Interactive Terminal Shell */
                <div className="w-full h-full p-6 font-mono text-xs sm:text-sm bg-[#0C0C0C] text-[#D7E2EA] overflow-y-auto flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    {terminalHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className={`whitespace-pre-wrap leading-relaxed ${
                          item.type === 'input'
                            ? 'text-[#38BDF8] font-bold'
                            : item.type === 'system'
                            ? 'text-[#888888]'
                            : 'text-[#E2E8F0] bg-white/5 p-3 rounded-xl border border-white/5'
                        }`}
                      >
                        {item.text}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Terminal Input Bar & Command Suggestions */}
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {['help', 'projects', 'skills', 'metrics', 'hire', 'secret', 'clear'].map(
                        (sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => {
                              setTerminalInput(sug);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#38BDF8] hover:bg-white/10 transition-colors"
                          >
                            ${sug}
                          </button>
                        )
                      )}
                    </div>

                    <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#38BDF8] animate-pulse" />
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type a command (e.g. projects, skills, help)..."
                        className="flex-1 bg-transparent border-none outline-none text-[#D7E2EA] placeholder-white/20 font-mono text-sm"
                        autoFocus
                      />
                    </form>
                  </div>
                </div>
              )}

              {/* Code Drawer Overlay */}
              <AnimatePresence>
                {showCode && activeMode !== 'terminal' && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="absolute inset-x-4 bottom-4 top-14 p-5 rounded-2xl bg-[#0F0F0F]/95 backdrop-blur-xl border border-white/20 flex flex-col justify-between font-mono text-xs text-[#D7E2EA] shadow-2xl z-20"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[#38BDF8] font-bold">
                        // {EXPERIMENT_CONFIGS.find((c) => c.id === activeMode)?.title} Algorithm
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-[11px]"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="flex-1 overflow-auto py-3 text-[#A0AEC0] leading-relaxed">
                      {`// Real-time Active WebGL / 2D Canvas Shader Logic
const palette = "${COLOR_PALETTES[params.colorScheme].name}";
const speedMultiplier = ${params.speed};
const turbulence = ${(params.turbulence / 50).toFixed(2)};

function updateFrame(canvas, ctx, mouse) {
  // Harmonic oscillation & proximity attraction
  particles.forEach((p, i) => {
    p.angle += p.speed * speedMultiplier;
    const targetX = mouse.x + Math.cos(p.angle) * p.radius;
    const targetY = mouse.y + Math.sin(p.angle) * p.radius * 0.6;
    p.x += (targetX - p.x) * 0.04 * turbulence;
    p.y += (targetY - p.y) * 0.04 * turbulence;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  });
}`}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Controls & Parameter Deck (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5 p-6 rounded-[32px] sm:rounded-[40px] bg-[#121212] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="font-semibold text-sm uppercase tracking-wider text-white">
                  Studio Controls
                </h3>
              </div>
              <button
                onClick={() =>
                  setParams({
                    speed: 1.0,
                    density: 800,
                    colorScheme: 'cyber',
                    turbulence: 50,
                    glow: 70,
                  })
                }
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white transition-colors"
                title="Reset Parameters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Parameter: Color Spectrum Palette */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-mono text-[#888888] tracking-wider">
                Chromatic Palette
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(COLOR_PALETTES) as ColorScheme[]).map((scheme) => (
                  <button
                    key={scheme}
                    onClick={() => setParams({ ...params, colorScheme: scheme })}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      params.colorScheme === scheme
                        ? 'bg-white/10 border-[#38BDF8] text-white'
                        : 'bg-white/5 border-white/5 text-[#777777] hover:border-white/15'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: COLOR_PALETTES[scheme].secondary }}
                    />
                    <span className="truncate">{COLOR_PALETTES[scheme].name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter: Speed Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888] uppercase">Oscillation Velocity</span>
                <span className="text-[#38BDF8]">{params.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={params.speed}
                onChange={(e) => setParams({ ...params, speed: parseFloat(e.target.value) })}
                className="w-full accent-[#38BDF8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Parameter: Particle Density */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888] uppercase">Density / Complexity</span>
                <span className="text-[#38BDF8]">{params.density}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={params.density}
                onChange={(e) => setParams({ ...params, density: parseInt(e.target.value, 10) })}
                className="w-full accent-[#38BDF8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Parameter: Turbulence / Force */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888] uppercase">Magnetic Turbulence</span>
                <span className="text-[#38BDF8]">{params.turbulence}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.turbulence}
                onChange={(e) => setParams({ ...params, turbulence: parseInt(e.target.value, 10) })}
                className="w-full accent-[#38BDF8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Parameter: Glow & Bloom */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#888888] uppercase">Photon Glow & Bloom</span>
                <span className="text-[#38BDF8]">{params.glow}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={params.glow}
                onChange={(e) => setParams({ ...params, glow: parseInt(e.target.value, 10) })}
                className="w-full accent-[#38BDF8] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Live Coordinates Readout */}
            <div className="mt-2 p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between font-mono text-[11px] text-[#777777]">
              <span>CURSOR POSITION</span>
              <span className="text-white">
                X: {mousePos.x} | Y: {mousePos.y}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
