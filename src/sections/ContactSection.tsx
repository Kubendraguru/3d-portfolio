import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Layers,
  Code2,
  GitBranch,
  ExternalLink,
  Activity,
  Cpu,
  Zap,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { Lanyard } from '../components/Lanyard';
import { StaggeredGrid, BentoItem } from '../components/StaggeredGrid';
import { ExpandableBentoGrid, BentoGridItem } from '../components/ExpandableBentoGrid';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lanyardResetKey, setLanyardResetKey] = useState(0);

  const emailAddress = 'kubendraguru23@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResetPhysics = () => {
    setLanyardResetKey((prev) => prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bentoItems: BentoItem[] = [
    {
      id: 1,
      title: '3D Web Experiences',
      subtitle: 'Three.js · WebGL',
      description: 'Immersive interactive 3D web applications.',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Creative Direction',
      subtitle: 'UI/UX · Motion',
      description: 'High-converting design systems and motion.',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'AI & Fullstack Dev',
      subtitle: 'React · TypeScript',
      description: 'Scalable production web applications.',
      icon: <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />,
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const gridImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
  ];

  const socialBentoItems: BentoGridItem[] = [
    {
      id: 'github',
      title: 'Repository',
      subtitle: '@Kubendraguru',
      description: 'Secure, scalable, and collaborative code management for modern teams.',
      icon: <Github className="w-6 h-6 text-[#38BDF8]" />,
      href: 'https://github.com/Kubendraguru',
      content: (
        <div className="flex flex-col gap-3 text-left w-full">
          <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
            Collaborate on code with your team in a secure environment.
          </p>

          {/* Repo Visualization Container */}
          <div className="flex flex-col gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-mono text-xs font-semibold text-white">Repo Visualization</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                🟢 Active Sync
              </span>
            </div>

            {/* Featured Repositories List */}
            <div className="flex flex-col gap-2.5 pt-1">
              {/* Repo 1: 3D Portfolio */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 hover:border-[#38BDF8]/50 transition-all flex flex-col gap-1.5 group/repo">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs sm:text-sm text-white group-hover/repo:text-[#38BDF8] transition-colors truncate">
                    Kubendraguru / 3d-portfolio
                  </span>
                  <a
                    href="https://github.com/Kubendraguru/3d-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md bg-white/5 hover:bg-[#38BDF8]/20 text-white/70 hover:text-[#38BDF8] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-white/60 line-clamp-2">
                  Modern interactive 3D developer portfolio built with React 18, Three.js, Rapier physics, GSAP, and Tailwind.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A7B0BA] pt-0.5">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3178c6]" /> TypeScript</span>
                  <span>·</span>
                  <span className="text-[#38BDF8]">Three.js</span>
                  <span>·</span>
                  <span className="text-[#CCFF00]">GSAP</span>
                </div>
              </div>

              {/* Repo 2: EcoVista Taj Mahal */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 hover:border-[#38BDF8]/50 transition-all flex flex-col gap-1.5 group/repo">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs sm:text-sm text-white group-hover/repo:text-[#38BDF8] transition-colors truncate">
                    Kubendraguru / ecovista-tajmahal-3d
                  </span>
                  <a
                    href="https://naks-frontend-9c8k-beige.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md bg-white/5 hover:bg-[#38BDF8]/20 text-white/70 hover:text-[#38BDF8] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-white/60 line-clamp-2">
                  Immersive 3D flight tour &amp; interactive cultural monument exploration web application with custom GLSL shaders.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A7B0BA] pt-0.5">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e34c26]" /> WebGL</span>
                  <span>·</span>
                  <span className="text-[#79CFFF]">3D Audio</span>
                </div>
              </div>

              {/* Repo 3: Solespace 3D Footwear */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 hover:border-[#38BDF8]/50 transition-all flex flex-col gap-1.5 group/repo">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs sm:text-sm text-white group-hover/repo:text-[#38BDF8] transition-colors truncate">
                    Kubendraguru / soles-shoe
                  </span>
                  <a
                    href="https://soles-shoe.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md bg-white/5 hover:bg-[#38BDF8]/20 text-white/70 hover:text-[#38BDF8] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-white/60 line-clamp-2">
                  Interactive 3D sneaker showroom &amp; haute footwear store with real-time 360° product material inspection.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A7B0BA] pt-0.5">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#61dafb]" /> React</span>
                  <span>·</span>
                  <span className="text-[#FF5E72]">3D Customizer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      subtitle: 'Professional',
      description: 'Career updates, tech articles, and industry collaborations.',
      icon: <Linkedin className="w-5 h-5 text-[#38BDF8]" />,
      href: 'https://linkedin.com',
      content: (
        <div className="flex flex-col gap-2 text-left">
          <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
            Let’s connect on LinkedIn! I share insights on modern web development, 3D creative front-ends, and scalable software solutions.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79CFFF] pt-1">
            <span>💼 Open for Full-Stack &amp; 3D Opportunities</span>
          </div>
        </div>
      ),
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: '@harix_23__',
      description: 'Behind-the-scenes engineering, design visual flex, and creative life.',
      icon: <Instagram className="w-5 h-5 text-[#FF5E72]" />,
      href: 'https://www.instagram.com/harix_23__/',
      content: (
        <div className="flex flex-col gap-2 text-left">
          <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
            Follow along on Instagram for creative motion teasers, UI micro-interaction demos, and personal developer life updates.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF5E72] pt-1">
            <span>📸 @harix_23__</span>
          </div>
        </div>
      ),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Instant Chat',
      description: 'Direct messaging for rapid project discussions and quick inquiries.',
      icon: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
      href: `https://wa.me/917338790574?text=${encodeURIComponent(
        "Hi Kubendra, I came across your 3D portfolio and I'd like to discuss a website project!"
      )}`,
      content: (
        <div className="flex flex-col gap-2 text-left">
          <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
            Need a rapid turnaround or want to chat about a new website or 3D project? Ping me directly on WhatsApp!
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#25D366] pt-1">
            <span>⚡ +91 7338790574 · Available Daily</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#000000] text-[#D7E2EA] pt-20 sm:pt-28 pb-16 px-4 sm:px-6 md:px-10 z-20 border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#7621B0]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Section Heading: "Contact Me" */}
        <div className="flex flex-col items-center text-center gap-4">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for New Opportunities &amp; Freelance Projects
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
              className="hero-heading font-black uppercase tracking-tight text-[#D7E2EA] leading-none select-none"
            >
              Contact Me
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="text-[#888888] text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
              Interact with the 3D physics ID card on the left (drag &amp; toss!), explore the Staggered Bento Grid on the right, or connect directly.
            </p>
          </FadeIn>
        </div>

        {/* Main Grid: Left 3D Lanyard ID Card (6 Cols) + Right StaggeredGrid Component (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive 3D Lanyard Physics ID Card */}
          <div className="lg:col-span-6 flex flex-col rounded-[28px] sm:rounded-[36px] bg-[#0A0A0A] border-2 border-white/10 overflow-hidden shadow-2xl relative min-h-[580px] sm:min-h-[640px]">
            {/* Background Watermark Typography (Auto-scaling SVG to ensure 100% of 'KUBENDRA GURU' is visible without clipping) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4">
              <svg
                viewBox="0 0 720 100"
                className="w-[90%] max-w-[520px] h-auto pointer-events-none select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.24)"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.5"
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                    fontWeight: 900,
                    fontSize: '62px',
                    letterSpacing: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  KUBENDRA GURU
                </text>
              </svg>
            </div>

            {/* Top Toolbar */}
            <div className="absolute top-4 left-5 right-5 flex items-center justify-between z-20">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/80 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 text-[#38BDF8]" />
                <span>3D Physics Pass</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] animate-pulse mr-1">
                  Drag &amp; Toss
                </span>
                <button
                  onClick={handleResetPhysics}
                  title="Reset Physics"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#38BDF8]/20 border border-white/15 hover:border-[#38BDF8]/50 text-white hover:text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3D Lanyard Physics Canvas */}
            <div className="w-full h-full flex-1 relative z-10 min-h-[520px]">
              <Lanyard
                resetKey={lanyardResetKey}
                position={[0, 0.4, 13.8]}
                gravity={[0, -40, 0]}
                fov={20}
                frontImage="/assets/lanyard/card_front.png"
                backImage="/assets/lanyard/card_back.png"
                imageFit="cover"
                lanyardWidth={1}
              />
            </div>

            {/* Technical Engine & Architecture Diagnostics Dock (Strict Single Line) */}
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-[#090D12]/95 border-t border-white/10 backdrop-blur-xl flex items-center justify-between gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] whitespace-nowrap overflow-hidden relative z-20 shadow-2xl">
              {/* Left: 3D Engine Architecture & WASM Physics */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] font-bold shrink-0">
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Rapier WASM · WebGL 2.0</span>
              </div>

              {/* Center: Live Render Telemetry */}
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-bold shrink-0">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>60 FPS</span>
                <span className="text-white/40 font-normal hidden sm:inline">· 0.4ms</span>
              </div>

              {/* Right: Technical Stack Badges */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/80 text-[10px]">
                  React 18
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-sky-300 text-[10px]">
                  TypeScript
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-purple-300 text-[10px]">
                  Three.js
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact StaggeredGrid Showcase Card */}
          <div className="lg:col-span-6 flex flex-col rounded-[28px] sm:rounded-[36px] bg-[#0A0A0A] border-2 border-white/10 overflow-hidden shadow-2xl relative min-h-[580px] sm:min-h-[640px] justify-between">
            {/* StaggeredGrid Component Inside the Card */}
            <div className="w-full flex-1 relative z-10 flex flex-col items-center justify-center overflow-hidden">
              <StaggeredGrid
                images={gridImages}
                bentoItems={bentoItems}
                centerText="KUBENDRA"
                showFooter={false}
              />
            </div>

            {/* Bottom Direct Email & Contact Action Bar */}
            <div className="p-4 sm:p-6 bg-[#0E0E0E] border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
              {/* Email address pill */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="p-2 rounded-xl bg-white/5 text-[#38BDF8]">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-white/90 truncate font-semibold">
                  {emailAddress}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#38BDF8]/20 border border-white/15 text-white hover:text-[#38BDF8] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Direct Gmail Web Compose Button */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent('Website Project Inquiry — Kubendra Guru')}&body=${encodeURIComponent(`Hi Kubendra,\n\nI came across your 3D portfolio and I am interested in discussing a website project.\n\nProject Details:\n• Type of Project (e.g. 3D Web Experience, Portfolio, Web Application): \n• Estimated Timeline: \n• Budget Range: \n\nLooking forward to connecting!\n\nBest regards,`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D7E2EA] to-white text-black font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(215,226,234,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </a>
            </div>

            {/* Expandable Bento Social Channels */}
            <div className="w-full bg-[#0A0A0A] border-t border-white/10 p-3 sm:p-4">
              <ExpandableBentoGrid items={socialBentoItems} />
            </div>
          </div>
        </div>

        {/* Footer Ribbon */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-medium">Kubendraguru</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Engineered with React, WebGL &amp; Three.js</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D7E2EA] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
