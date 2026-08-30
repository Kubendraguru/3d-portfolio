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
  Clock,
  MapPin,
  RotateCcw,
  Sparkles,
  Layers,
  Code2,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { Lanyard } from '../components/Lanyard';
import { StaggeredGrid, BentoItem } from '../components/StaggeredGrid';

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
            {/* Background Watermark Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <span
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontFamily: "'Kanit', sans-serif" }}
                className="font-black uppercase tracking-tighter text-white/[0.04] whitespace-nowrap"
              >
                KUBENDRA GURU
              </span>
            </div>

            {/* Top Toolbar */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                ⚡ 3D Physics Pass
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

            {/* Card Bottom Meta Bar */}
            <div className="p-3.5 sm:p-4 bg-[#121212]/90 border-t border-white/10 backdrop-blur-md flex items-center justify-between font-mono text-xs text-[#888888] relative z-20">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-white">India · Global Remote</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>IST (UTC+5:30)</span>
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

            {/* Social Channels Dock */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-4 bg-[#0A0A0A] border-t border-white/10">
              {[
                { name: 'GitHub', href: 'https://github.com/Kubendraguru', icon: Github },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
                { name: 'Instagram', href: 'https://www.instagram.com/harix_23__/', icon: Instagram },
                {
                  name: 'WhatsApp',
                  href: `https://wa.me/917338790574?text=${encodeURIComponent(
                    "Hi Kubendra, I came across your 3D portfolio and I'd like to discuss a website project!"
                  )}`,
                  icon: MessageCircle,
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 flex items-center justify-center gap-2 text-xs font-medium text-[#D7E2EA] hover:text-white transition-all shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span className="truncate">{social.name}</span>
                  </motion.a>
                );
              })}
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
