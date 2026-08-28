import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, ArrowUpRight, Github, Linkedin } from 'lucide-react';

export const SpotlightOutroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse parallax interaction for 3D spotlight beam and character
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const beamRotate = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const characterX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const characterScale = useTransform(smoothY, [-0.5, 0.5], [0.97, 1.03]);
  const characterRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#000000] text-[#D7E2EA] pt-20 pb-16 px-6 sm:px-10 flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. CINEMATIC VOLUMETRIC SPOTLIGHT BEAM */}
      {/* ============================================================ */}
      <motion.div
        style={{
          rotateZ: beamRotate,
          transformOrigin: 'top center',
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] md:w-[1200px] h-[95%] pointer-events-none z-0"
      >
        {/* Spotlight Source Emitter at Ceiling */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/90 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-white rounded-full blur-md" />

        {/* Volumetric Conical Light Beam */}
        <div
          style={{
            clipPath: 'polygon(48% 0%, 52% 0%, 92% 100%, 8% 100%)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(215, 226, 234, 0.28) 25%, rgba(187, 204, 215, 0.12) 65%, rgba(0, 0, 0, 0) 100%)',
          }}
          className="w-full h-full"
        />

        {/* Floating Atmospheric Dust Particles in Light Beam */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60 animate-pulse" />
      </motion.div>

      {/* Stage Floor Reflection Oval */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-16 bg-white/15 rounded-full blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[220px] sm:w-[320px] h-8 bg-[#38bdf8]/20 rounded-full blur-xl pointer-events-none z-0" />

      {/* ============================================================ */}
      {/* 2. TOP CREDITS */}
      {/* ============================================================ */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center mt-2">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#8E97A0] font-medium">
          KUBENDRA GURU
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#555E68] font-normal">
          A 3D CREATOR EXPERIENCE
        </span>
      </div>

      {/* ============================================================ */}
      {/* 3. CENTER HERO: TITLE & 3D ANIMATED CHARACTER IN SPOTLIGHT */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-6 sm:my-10">
        {/* Massive Cinematic Title: KUBENDRA GURU */}
        <div className="relative flex flex-col items-center text-center">
          <h2
            style={{
              fontFamily: "'Kanit', sans-serif",
              lineHeight: 0.85,
              fontSize: 'clamp(3.5rem, 14vw, 150px)',
              letterSpacing: '-0.03em',
            }}
            className="font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D7E2EA] to-[#3B424D] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            KUBENDRA
          </h2>
          <h2
            style={{
              fontFamily: "'Kanit', sans-serif",
              lineHeight: 0.85,
              fontSize: 'clamp(3.5rem, 14vw, 150px)',
              letterSpacing: '-0.03em',
            }}
            className="font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#D7E2EA] via-[#9AA7B3] to-[#2B313A] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            GURU
          </h2>
        </div>

        {/* 3D Animated Character Walking in Spotlight */}
        <motion.div
          style={{
            x: characterX,
            scale: characterScale,
            rotateY: characterRotateY,
          }}
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative -mt-16 sm:-mt-24 md:-mt-32 w-[180px] sm:w-[240px] md:w-[300px] flex flex-col items-center pointer-events-none"
        >
          {/* 3D Character Cutout */}
          <img
            src="/character_3d_spotlight.png"
            alt="Kubendra Guru 3D Animated Character"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            draggable={false}
          />
          {/* Character Footing Shadow */}
          <div className="w-3/4 h-4 bg-black/90 rounded-full blur-md -mt-2" />
        </motion.div>

        {/* Iconic Tagline */}
        <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#A6B4C0] font-normal text-center max-w-2xl px-4">
          NO ONE SEES THE WORLD THE SAME WAY YOU DO
        </p>
      </div>

      {/* ============================================================ */}
      {/* 4. FOOTER CREDITS & CONTACT ACTION */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-8 pt-8 border-t border-white/5">
        {/* Contact CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contact@kubendraguru.com"
            className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-105 transition-all duration-200 uppercase tracking-widest font-medium flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#38bdf8]" />
            <span>Get In Touch</span>
          </a>

          <a
            href="#home"
            className="liquid-glass rounded-full px-7 py-3 text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 uppercase tracking-widest font-medium flex items-center gap-1.5"
          >
            <span>Back To Top</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Metadata & Social Links */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#636C75]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="uppercase tracking-wider font-mono text-[11px] text-[#8E97A0]">
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="text-[11px] tracking-wider text-[#555E68] uppercase font-mono">
            © 2026 KUBENDRA GURU
          </div>
        </div>
      </div>
    </section>
  );
};
