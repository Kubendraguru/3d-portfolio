import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Code,
} from 'lucide-react';

interface SquircleItem {
  id: string;
  name: string;
  category: string;
  isLarge?: boolean;
  hasCursor?: boolean;
  icon: React.ReactNode;
}

// 1. Design & Creative Tools (Exact match to Dribbble shot)
const DESIGN_SQUIRCLES: SquircleItem[] = [
  // Large Figma (2x2)
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX & Design Systems',
    isLarge: true,
    hasCursor: true,
    icon: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  // Notion
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity & Planning',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L17.883 1.97c-.466-.373-1.12-.7-2.147-.606L2.966 2.483c-.373.047-.466.327-.327.56l1.82 1.165zm.793 4.293v12.27c0 .7.373 1.027 1.213.98l13.68-.793c.84-.047.933-.56.933-1.167V7.521c0-.606-.28-.84-.793-.793l-14.24.793c-.513.047-.793.373-.793.98zm12.98.7c.093.42 0 .84-.42.887l-.7.14v8.868c-.606.327-1.167.513-1.633.513-.746 0-1.027-.233-1.54-1.027l-4.573-7.14v6.86l1.493.327c.42.093.513.42.42.84l-.373.14-4.2-.233c-.093-.42 0-.84.42-.887l1.073-.28V9.808l-1.447-.14c-.42-.047-.466-.42-.373-.84l4.293-.28 4.853 7.373v-6.58l-1.307-.14c-.42-.047-.466-.42-.373-.84l3.967-.233.14.047z" />
      </svg>
    ),
  },
  // Framer / Red Stack
  {
    id: 'framer',
    name: 'Framer',
    category: 'Interactive Web Prototyping',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#FF5533" />
      </svg>
    ),
  },
  // Linear / Upward Arrows
  {
    id: 'linear',
    name: 'Linear',
    category: 'Issue Tracking',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#0066FF">
        <path d="M4 14l8-8 8 8-2.5 2.5-5.5-5.5-5.5 5.5L4 14zm0-6l8-8 8 8-2.5 2.5-5.5-5.5-5.5 5.5L4 8z" />
      </svg>
    ),
  },
  // Confluence / Atlassian Flow
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'Knowledge Hub',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#0052CC">
        <path d="M1.5 15.75c1.8 1.8 4.2 2.7 6.6 2.7 3.3 0 6.6-1.8 8.4-4.8l-3.3-2.1c-1.2 2.1-3.3 3.3-5.1 3.3-1.5 0-3-.6-4.2-1.8l-2.4 2.7zm21-7.5c-1.8-1.8-4.2-2.7-6.6-2.7-3.3 0-6.6 1.8-8.4 4.8l3.3 2.1c1.2-2.1 3.3-3.3 5.1-3.3 1.5 0 3 .6 4.2 1.8l2.4-2.7z" />
      </svg>
    ),
  },
  // Illustrator (Ai)
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'Vector Graphics & Branding',
    icon: (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#330000] border border-[#FF9A00]/50 flex items-center justify-center text-[#FF9A00] font-black text-base sm:text-lg tracking-tighter">
        Ai
      </div>
    ),
  },
  // After Effects (Ae)
  {
    id: 'aftereffects',
    name: 'Adobe After Effects',
    category: 'Motion Design & VFX',
    icon: (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00005B] border border-[#9999FF]/50 flex items-center justify-center text-[#9999FF] font-black text-base sm:text-lg tracking-tighter">
        Ae
      </div>
    ),
  },
  // Photoshop (Ps)
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Visual Composition',
    icon: (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center text-[#31A8FF] font-black text-base sm:text-lg tracking-tighter">
        Ps
      </div>
    ),
  },
  // Slack
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
      </svg>
    ),
  },
  // Large OpenAI (2x2)
  {
    id: 'openai',
    name: 'OpenAI / AI Engine',
    category: 'Next-Gen Intelligence',
    isLarge: true,
    icon: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.6">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6608zm-12.6413 4.7932l-2.02-1.1639a.0804.0804 0 0 1-.038-.0568V6.7303a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805-4.783 2.7582a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3656l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
  },
];

// 2. Development & Engineering Stack
const CODE_SQUIRCLES: SquircleItem[] = [
  // Large React (2x2)
  {
    id: 'react',
    name: 'React.js',
    category: 'Component Architecture',
    isLarge: true,
    hasCursor: true,
    icon: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  // Three.js
  {
    id: 'threejs',
    name: 'Three.js',
    category: '3D WebGL Engine',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  // Node.js
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend APIs',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 2L3 7.2v10.4l9 5.2 9-5.2V7.2L12 2zm0 2.2l6.8 3.9v7.8L12 19.8l-6.8-3.9V8.1L12 4.2z" />
      </svg>
    ),
  },
  // Supabase
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Database & Auth',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#3ECF8E">
        <path d="M13.5 2L3 14.5h8.5V22L21 9.5h-7.5V2z" />
      </svg>
    ),
  },
  // AWS
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'S3 & CloudFront',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M18.8 14.5c-.2-.1-.5-.2-.8-.2-1.3 0-2.4.9-2.7 2.2-.1.5-.4.8-.8.8-.4 0-.8-.3-.8-.8 0-1.7 1.4-3.1 3.1-3.1.5 0 1 .1 1.5.3l-.5.8zM5.5 17.3c-.6-.4-1-1.1-1-1.8 0-1.3 1-2.3 2.3-2.3.6 0 1.2.2 1.6.6l-.7.8c-.3-.3-.6-.4-.9-.4-.7 0-1.3.6-1.3 1.3 0 .4.2.8.5 1l-.5.8z" />
        <path d="M2.5 18.5c5.5 3.5 13.5 3.5 19 0-.4-.4-.9-.8-1.4-1.1-4.7 2.8-11.5 2.8-16.2 0-.5.3-.9.7-1.4 1.1z" />
      </svg>
    ),
  },
  // GitHub
  {
    id: 'github',
    name: 'GitHub',
    category: 'CI/CD & Source Code',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#181717">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  // PHP
  {
    id: 'php',
    name: 'PHP & MySQL',
    category: 'Backend Data',
    icon: (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#777BB4]/15 border border-[#777BB4]/40 flex items-center justify-center text-[#777BB4] font-black text-xs sm:text-sm tracking-tight">
        PHP
      </div>
    ),
  },
  // Claude AI
  {
    id: 'claude',
    name: 'Claude AI',
    category: 'Deep Reasoning',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#D97706">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#D97706" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="#D97706" />
      </svg>
    ),
  },
  // VS Code
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'IDE Environment',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="#007ACC">
        <path d="M17.5 2.5L7 11.5 2 7.5v9l5-4 10.5 9L22 19V5l-4.5-2.5z" />
      </svg>
    ),
  },
  // Large Gemini AI (2x2)
  {
    id: 'gemini',
    name: 'Google Gemini & AI Studio',
    category: 'Multimodal AI Pipelines',
    isLarge: true,
    icon: (
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
      </svg>
    ),
  },
];

export const DribbbleSkillsUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'code'>('design');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const currentSkills = activeTab === 'design' ? DESIGN_SQUIRCLES : CODE_SQUIRCLES;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 flex flex-col items-center">
      {/* 2-Column Responsive Layout (Dribbble Shots Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Clean Content & Typography */}
        {/* ============================================================ */}
        <FadeIn delay={0.1} x={-30} className="lg:col-span-5 flex flex-col items-start text-left">
          {/* Subtitle Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#38bdf8] uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skills & Tech Stack</span>
          </div>

          {/* Large Editorial Headline with Instrument Serif */}
          <h3
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.05] tracking-tight mb-6"
          >
            Every great idea begins with{' '}
            <em className="not-italic text-muted-foreground">the right tools.</em>
          </h3>

          {/* Description Paragraph */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
            I craft seamless bridges between spatial design, modern frontend architecture, and resilient backend systems — leveraging leading design platforms and AI engines.
          </p>

          {/* Feature Checkpoints */}
          <div className="flex flex-col gap-3.5 mb-10 w-full">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90">
                UI/UX Design Systems & Spatial 3D Modeling
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90">
                Component Architecture & 60fps Kinetic Motion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90">
                Scalable Cloud Infrastructure & Agentic AI
              </span>
            </div>
          </div>

          {/* Tab Switcher: Design Stack vs Code Stack */}
          <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-[#181818] border border-white/10 mb-8">
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-white text-black font-semibold shadow-lg scale-[1.02]'
                  : 'text-[#8E97A0] hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Design & Product</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white text-black font-semibold shadow-lg scale-[1.02]'
                  : 'text-[#8E97A0] hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Code & Infrastructure</span>
            </button>
          </div>

          {/* Action CTA Button */}
          <a
            href="#about"
            className="liquid-glass rounded-full px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-medium text-white hover:scale-105 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Dribbble Squircle Bento Grid (Exact Match) */}
        {/* ============================================================ */}
        <FadeIn delay={0.25} x={30} className="lg:col-span-7 flex justify-center w-full">
          <div className="p-5 sm:p-8 md:p-10 rounded-[44px] sm:rounded-[52px] bg-[#E8EBF0] dark:bg-[#F3F4F6] text-[#0C0C0C] shadow-2xl border border-white/60 w-full max-w-[540px]">
            <motion.div
              layout
              className="grid grid-cols-4 gap-3 sm:gap-4 auto-rows-[75px] sm:auto-rows-[90px] md:auto-rows-[100px]"
            >
              <AnimatePresence mode="popLayout">
                {currentSkills.map((skill) => {
                  const isLarge = skill.isLarge;

                  return (
                    <motion.div
                      layout
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25 }}
                      onHoverStart={() => setHoveredSkill(skill.id)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex items-center justify-center rounded-[24px] sm:rounded-[32px] bg-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_6px_8px_-4px_rgba(0,0,0,0.04)] border border-black/[0.04] transition-all duration-300 cursor-pointer overflow-hidden group ${
                        isLarge
                          ? 'col-span-2 row-span-2 rounded-[32px] sm:rounded-[42px]'
                          : 'col-span-1 row-span-1'
                      }`}
                    >
                      {/* Top-right Cursor Icon (Exact Dribbble Touch) */}
                      {skill.hasCursor && (
                        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-black/70 pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" viewBox="0 0 24 24">
                            <path d="M3 3l7 18 3-7 7-3L3 3z" />
                          </svg>
                        </div>
                      )}

                      {/* Icon Display */}
                      <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {skill.icon}
                      </div>

                      {/* Tooltip Overlay on Hover */}
                      <AnimatePresence>
                        {hoveredSkill === skill.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-2 inset-x-2 z-20 flex flex-col items-center justify-center py-1 px-2 rounded-xl bg-black/90 text-white text-center shadow-lg pointer-events-none"
                          >
                            <span className="text-[11px] font-semibold tracking-tight truncate max-w-full">
                              {skill.name}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};
