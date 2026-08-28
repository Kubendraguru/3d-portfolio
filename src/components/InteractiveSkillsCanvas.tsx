import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Sparkles, Layers, Box, Code2, Cpu, Wrench, Bot, ExternalLink } from 'lucide-react';

export type TechCategory = 'all' | 'ai' | '3d' | 'frontend' | 'backend' | 'tools';

export interface FloatingSkill {
  id: string;
  name: string;
  category: TechCategory;
  role: string;
  x: number; // default % left
  y: number; // default % top (cleanly between 6% and 66% so it stays completely above the bottom dock)
  rotate: number;
  glowColor: string;
  floatClass: string;
  hasHandCursor?: boolean;
  logoUrl?: string;
  svgFallback?: React.ReactNode;
}

export const FLOATING_SKILLS: FloatingSkill[] = [
  // =========================================================================
  // 1. CREATIVE TECHNOLOGY / 3D & MOTION
  // =========================================================================
  {
    id: 'threejs',
    name: 'Three.js',
    category: '3d',
    role: 'WebGL 3D Engine',
    x: 6,
    y: 46,
    rotate: 12,
    glowColor: 'rgba(255, 255, 255, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: '3d',
    role: 'Kinetic Motion',
    x: 58,
    y: 8,
    rotate: -10,
    glowColor: 'rgba(136, 206, 2, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.simpleicons.org/greensock/88CE02',
  },
  {
    id: 'webgl',
    name: 'WebGL',
    category: '3d',
    role: 'GPU Shaders',
    x: 8,
    y: 65,
    rotate: -8,
    glowColor: 'rgba(153, 0, 0, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.simpleicons.org/webgl/990000',
  },
  {
    id: 'scrolltrigger',
    name: 'ScrollTrigger',
    category: '3d',
    role: 'Scroll Orchestration',
    x: 86,
    y: 64,
    rotate: 10,
    glowColor: 'rgba(10, 228, 72, 0.45)',
    floatClass: 'animate-float-1',
    svgFallback: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#0AE448" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="4" fill="#0AE448" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#0AE448" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '3d_experiences',
    name: '3D Experiences',
    category: '3d',
    role: 'Spatial Web',
    x: 18,
    y: 66,
    rotate: -6,
    glowColor: 'rgba(56, 189, 248, 0.45)',
    floatClass: 'animate-float-2',
    svgFallback: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'interactive_interfaces',
    name: 'Interactive Interfaces',
    category: '3d',
    role: 'Spatial UI / UX',
    x: 64,
    y: 64,
    rotate: 8,
    glowColor: 'rgba(168, 85, 247, 0.45)',
    floatClass: 'animate-float-3',
    svgFallback: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#A855F7" strokeWidth="1.8" />
        <path d="M9 12h6M12 9v6" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="8" r="1.5" fill="#A855F7" />
      </svg>
    ),
  },
  {
    id: 'scroll_animation',
    name: 'Scroll Animation',
    category: '3d',
    role: 'Timeline Scrubbing',
    x: 76,
    y: 48,
    rotate: -8,
    glowColor: 'rgba(245, 158, 11, 0.45)',
    floatClass: 'animate-float-1',
    svgFallback: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="2" width="12" height="20" rx="6" stroke="#F59E0B" strokeWidth="1.8" />
        <path d="M12 6v4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 12h2M19 12h2" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'motion_design',
    name: 'Motion Design',
    category: '3d',
    role: 'Kinetic Choreography',
    x: 82,
    y: 18,
    rotate: -10,
    glowColor: 'rgba(236, 72, 153, 0.45)',
    floatClass: 'animate-float-2',
    svgFallback: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24" fill="none">
        <path d="M3 18C7 18 8 6 12 6C16 6 17 18 21 18" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="12" cy="6" r="2" fill="#EC4899" />
      </svg>
    ),
  },

  // =========================================================================
  // 2. AI & AGENTS
  // =========================================================================
  {
    id: 'claude',
    name: 'Claude',
    category: 'ai',
    role: 'Anthropic AI',
    x: 74,
    y: 10,
    rotate: 8,
    glowColor: 'rgba(217, 119, 87, 0.45)',
    floatClass: 'animate-float-1',
    hasHandCursor: true,
    logoUrl: 'https://cdn.simpleicons.org/anthropic/D97757',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'ai',
    role: 'OpenAI LLM',
    x: 10,
    y: 10,
    rotate: -10,
    glowColor: 'rgba(16, 163, 127, 0.45)',
    floatClass: 'animate-float-2',
    svgFallback: (
      <svg className="w-9 h-9 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="#10A37F">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.182a5.985 5.985 0 0 0-3.997 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.76a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.495zm-9.661-4.126a4.47 4.47 0 0 1-.535-3.013l.142.085 4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.141-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.814 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.787A4.504 4.504 0 0 1 2.34 7.896zm16.1 3.855l-5.843-3.368 5.843-3.369a.076.076 0 0 1 .071 0l4.83 2.791a4.495 4.495 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.388-.681zm2.01-3.023l-.142-.085-4.773-2.782a.776.776 0 0 0-.785 0L9.407 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.499 4.499 0 0 1 7.375-3.454l-.141.08-4.779 2.759a.795.795 0 0 0-.393.681v6.723zm2.441-2.825l2.754-1.589 2.753 1.589v3.178l-2.753 1.588-2.754-1.588z" />
      </svg>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'ai',
    role: 'DeepMind Agent',
    x: 88,
    y: 62,
    rotate: -6,
    glowColor: 'rgba(66, 133, 244, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.simpleicons.org/google/4285F4',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'ai',
    role: 'Google AI',
    x: 44,
    y: 6,
    rotate: 4,
    glowColor: 'rgba(78, 136, 212, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.simpleicons.org/googlegemini/4E88D4',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'ai',
    role: 'AI Pair Programmer',
    x: 78,
    y: 30,
    rotate: 6,
    glowColor: 'rgba(112, 71, 235, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.simpleicons.org/githubcopilot/7047EB',
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'ai',
    role: 'Automation',
    x: 20,
    y: 32,
    rotate: -8,
    glowColor: 'rgba(234, 75, 113, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.simpleicons.org/n8n/EA4B71',
  },

  // =========================================================================
  // 3. FRONTEND & CORE STACK
  // =========================================================================
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    role: 'Semantic Structure',
    x: 14,
    y: 48,
    rotate: -6,
    glowColor: 'rgba(227, 79, 38, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    role: 'Modern Layouts',
    x: 32,
    y: 12,
    rotate: 8,
    glowColor: 'rgba(21, 114, 182, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'frontend',
    role: 'Responsive Framework',
    x: 34,
    y: 50,
    rotate: -10,
    glowColor: 'rgba(121, 82, 179, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'frontend',
    role: 'Core Frontend',
    x: 24,
    y: 8,
    rotate: 6,
    glowColor: 'rgba(97, 218, 251, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    role: 'Type System',
    x: 28,
    y: 66,
    rotate: 8,
    glowColor: 'rgba(49, 120, 198, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    role: 'ESNext Web',
    x: 4,
    y: 28,
    rotate: -12,
    glowColor: 'rgba(247, 223, 30, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    role: 'Full Stack App',
    x: 66,
    y: 66,
    rotate: -10,
    glowColor: 'rgba(255, 255, 255, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Styling Engine',
    x: 22,
    y: 34,
    rotate: 10,
    glowColor: 'rgba(6, 182, 212, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },

  // =========================================================================
  // 4. BACKEND & CLOUD
  // =========================================================================
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    role: 'Database & Auth',
    x: 40,
    y: 66,
    rotate: -6,
    glowColor: 'rgba(62, 207, 142, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    role: 'V8 Runtime',
    x: 54,
    y: 66,
    rotate: 8,
    glowColor: 'rgba(95, 160, 78, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    role: 'SQL Database',
    x: 76,
    y: 48,
    rotate: -8,
    glowColor: 'rgba(65, 105, 225, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    role: 'NoSQL Database',
    x: 3,
    y: 8,
    rotate: 6,
    glowColor: 'rgba(71, 162, 72, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'backend',
    role: 'Containers',
    x: 16,
    y: 64,
    rotate: 8,
    glowColor: 'rgba(36, 150, 237, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'backend',
    role: 'Cloud Infrastructure',
    x: 88,
    y: 22,
    rotate: -10,
    glowColor: 'rgba(255, 153, 0, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },

  // =========================================================================
  // 5. DESIGN & TOOLS
  // =========================================================================
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    role: 'UI/UX Design',
    x: 88,
    y: 42,
    rotate: 8,
    glowColor: 'rgba(242, 78, 30, 0.45)',
    floatClass: 'animate-float-2',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'tools',
    role: 'Visual Assets & Media',
    x: 80,
    y: 28,
    rotate: -6,
    glowColor: 'rgba(0, 196, 204, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    role: 'Primary IDE',
    x: 86,
    y: 6,
    rotate: -12,
    glowColor: 'rgba(0, 122, 204, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    role: 'Version Control',
    x: 8,
    y: 26,
    rotate: 6,
    glowColor: 'rgba(240, 80, 50, 0.45)',
    floatClass: 'animate-float-1',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    role: 'API Diagnostics',
    x: 88,
    y: 52,
    rotate: 10,
    glowColor: 'rgba(255, 108, 55, 0.45)',
    floatClass: 'animate-float-3',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  },
];

const FILTERS: { id: TechCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'ALL', icon: Layers },
  { id: '3d', label: 'CREATIVE TECH', icon: Box },
  { id: 'ai', label: 'AI & AGENTS', icon: Bot },
  { id: 'frontend', label: 'FRONTEND', icon: Code2 },
  { id: 'backend', label: 'BACKEND & CLOUD', icon: Cpu },
  { id: 'tools', label: 'DESIGN & TOOLS', icon: Wrench },
];

export const InteractiveSkillsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const filteredTiles = FLOATING_SKILLS.filter(
    (tile) => activeCategory === 'all' || tile.category === activeCategory
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[850px] lg:min-h-[920px] bg-[#0A0B0E] border-t border-white/5 overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 select-none"
    >
      {/* Background Soft Ambient Light Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7621B0]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Soundwave Graphics in Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 sm:px-16 pointer-events-none opacity-15">
        <svg className="w-28 sm:w-44 h-44 text-white/30" viewBox="0 0 100 100" fill="currentColor">
          <rect x="10" y="35" width="4" height="30" rx="2" />
          <rect x="20" y="20" width="4" height="60" rx="2" />
          <rect x="30" y="10" width="4" height="80" rx="2" />
          <rect x="40" y="25" width="4" height="50" rx="2" />
          <rect x="50" y="40" width="4" height="20" rx="2" />
          <rect x="60" y="15" width="4" height="70" rx="2" />
          <rect x="70" y="30" width="4" height="40" rx="2" />
          <rect x="80" y="45" width="4" height="10" rx="2" />
        </svg>
        <svg className="w-28 sm:w-44 h-44 text-white/30" viewBox="0 0 100 100" fill="currentColor">
          <rect x="10" y="45" width="4" height="10" rx="2" />
          <rect x="20" y="30" width="4" height="40" rx="2" />
          <rect x="30" y="15" width="4" height="70" rx="2" />
          <rect x="40" y="40" width="4" height="20" rx="2" />
          <rect x="50" y="25" width="4" height="50" rx="2" />
          <rect x="60" y="10" width="4" height="80" rx="2" />
          <rect x="70" y="20" width="4" height="60" rx="2" />
          <rect x="80" y="35" width="4" height="30" rx="2" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 1. CENTER TYPOGRAPHY & CTAs */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center my-auto px-4 pointer-events-auto">
        <FadeIn delay={0.1} y={20}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#38BDF8] uppercase mb-6 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tech Stack</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={25}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[1.08] mb-5">
            Crafted with Precision. <br />
            <span className="hero-heading">Connected by Design.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.3} y={25}>
          <p className="text-sm sm:text-base text-[#9FA8B3] max-w-md mx-auto leading-relaxed mb-8">
            Grab, throw, and freely explore the creative technologies, spatial 3D WebGL runtimes, and full-stack systems.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} y={20}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#about"
              className="px-6 py-3 rounded-full bg-white/5 text-white border border-white/15 font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>
          </div>
        </FadeIn>
      </div>

      {/* ============================================================ */}
      {/* 2. HAND-DRAWN "DRAG ME" ANNOTATION & POINTER ARROW */}
      {/* ============================================================ */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute z-30 pointer-events-none hidden sm:flex items-center gap-2"
          style={{ right: '18%', top: '24%' }}
        >
          {/* Cursive "drag me" text */}
          <span
            style={{ fontFamily: "'Covered By Your Grace', cursive" }}
            className="text-2xl sm:text-3xl text-white/80 transform -rotate-12 tracking-wide drop-shadow-md"
          >
            drag me
          </span>

          {/* Curved Hand-Drawn Arrow */}
          <svg className="w-12 h-12 text-white/70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path
              d="M20 70 C 40 20, 70 20, 85 45"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <path d="M72 45 L 85 45 L 82 32" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}

      {/* ============================================================ */}
      {/* 3. FREEFORM DRAGGABLE 3D SQUIRCLES */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {filteredTiles.map((tile, idx) => (
            <motion.div
              key={tile.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              dragMomentum={true}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onDragStart={() => setHasInteracted(true)}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.03,
                type: 'spring',
                stiffness: 280,
                damping: 22,
              }}
              style={{
                position: 'absolute',
                left: `${tile.x}%`,
                top: `${tile.y}%`,
                zIndex: 25,
              }}
              className="pointer-events-auto cursor-grab active:cursor-grabbing touch-none select-none"
            >
              {/* Inner Continuous Floating Element */}
              <div className={tile.floatClass}>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 0,
                    zIndex: 60,
                    boxShadow: `0 20px 45px -10px ${tile.glowColor}, 0 0 35px ${tile.glowColor}`,
                  }}
                  whileTap={{ scale: 0.94 }}
                  style={{ transform: `rotate(${tile.rotate}deg)` }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-[24px] sm:rounded-[28px] bg-[#141519]/90 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/40 group p-3.5"
                >
                  {/* Real Official Brand Vector Logo or SVG Graphic */}
                  {tile.logoUrl ? (
                    <img
                      src={tile.logoUrl}
                      alt={tile.name}
                      loading="eager"
                      className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    tile.svgFallback
                  )}

                  {/* Optional Floating Hand Pointer on first tile */}
                  {tile.hasHandCursor && !hasInteracted && (
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-3 -right-3 z-30 pointer-events-none filter drop-shadow-md text-xl sm:text-2xl"
                    >
                      👆
                    </motion.div>
                  )}

                  {/* Tooltip on Hover */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono tracking-wider text-white shadow-xl z-50">
                    <span className="font-bold text-[#38BDF8]">{tile.name}</span>
                    <span className="text-white/60 mx-1.5">•</span>
                    <span className="text-white/80">{tile.role}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM FROSTED GLASS DOCK & CATEGORY FILTER */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-4xl mx-auto mt-auto pt-6 flex flex-col items-center pointer-events-auto">
        <div className="bg-[#141519]/90 backdrop-blur-2xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 shadow-2xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full">
          {FILTERS.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md scale-[1.03]'
                    : 'text-[#8E97A0] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
