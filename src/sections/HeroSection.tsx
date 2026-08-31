import React, { useRef, useEffect } from 'react';
import { GooeyNav } from '../components/GooeyNav';

interface VideoSource {
  mp4: string;
  webm?: string;
  mov?: string;
}

export const HERO_VIDEO_OPTIONS: Record<string, VideoSource> = {
  finalPort: {
    webm: 'https://res.cloudinary.com/qrhgjdrs/video/upload/v1787880199/final-port_uqljed.webm',
    mp4: 'https://res.cloudinary.com/qrhgjdrs/video/upload/v1787880199/final-port_uqljed.mp4',
    mov: 'https://res.cloudinary.com/qrhgjdrs/video/upload/v1787880199/final-port_uqljed.mov',
  },
};

const CURRENT_SOURCE: VideoSource = HERO_VIDEO_OPTIONS.finalPort;

export interface HeroSectionProps {
  isEntered?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isEntered = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isEntered) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Fallback if browser requires user gesture
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isEntered]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (
    item: { label: string; href: string },
    _index: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    const id = item.href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-background"
    >
      {/* 1. Fullscreen Looping Background Video (Only plays when entered) */}
      <video
        ref={videoRef}
        key={CURRENT_SOURCE.mp4}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      >
        {CURRENT_SOURCE.webm && (
          <source src={CURRENT_SOURCE.webm} type="video/webm" />
        )}
        <source src={CURRENT_SOURCE.mp4} type="video/mp4" />
        {CURRENT_SOURCE.mov && (
          <source src={CURRENT_SOURCE.mov} type="video/quicktime" />
        )}
      </video>

      {/* 2. Glassmorphic Navigation Bar with React Bits GooeyNav */}
      <header className="relative z-10 w-full">
        <nav className="flex items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto w-full gap-4">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-2xl sm:text-3xl tracking-tight text-foreground select-none hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Kubendra Guru<sup className="text-xs">®</sup>
          </a>

          {/* Center: React Bits GooeyNav */}
          <div className="hidden lg:flex items-center justify-center">
            <GooeyNav
              items={navItems}
              particleCount={16}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              onItemClick={handleNavClick}
            />
          </div>

          {/* Right: Portfolio Typography Link matching Logo */}
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-2xl sm:text-3xl tracking-tight text-foreground select-none hover:opacity-80 hover:text-[#38D9FF] transition-all whitespace-nowrap cursor-pointer"
          >
            Portfolio<sup className="text-xs">®</sup>
          </a>
        </nav>
      </header>

      {/* 3. Hero Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto w-full flex-1">
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-1.5px] max-w-5xl font-normal text-[#F5F7FA] animate-fade-rise select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        >
          Where{' '}
          <span className="not-italic text-[#38D9FF] font-light drop-shadow-[0_0_25px_rgba(56,217,255,0.45)]">
            dreams
          </span>{' '}
          rise{' '}
          <span className="not-italic text-[#79CFFF] font-light drop-shadow-[0_0_20px_rgba(121,207,255,0.35)]">
            through the silence.
          </span>
        </h1>

        <p className="text-[#A7B0BA] text-base sm:text-lg md:text-xl max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-normal drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          A 3D creator driven by crafting{' '}
          <span className="text-[#F5F7FA] font-medium">striking and unforgettable projects</span>.
          Designing digital spaces for sharp focus and inspired visual work.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-12 animate-fade-rise-delay-2">
          {/* View Projects Button (Primary Electric Cyan) */}
          <button
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-4.5 rounded-full bg-[#061522]/85 backdrop-blur-xl border border-[#38D9FF] text-[#F5F7FA] font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-300 hover:bg-[#38D9FF] hover:text-[#061522] hover:shadow-[0_0_35px_rgba(56,217,255,0.55)] hover:scale-[1.04] cursor-pointer shadow-[0_0_20px_rgba(56,217,255,0.25)]"
          >
            <span>View Projects</span>
          </button>

          {/* Contact Me Button (Secondary Soft Blue Glass) */}
          <button
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-4.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-[#496576] text-[#A7B0BA] font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-300 hover:border-[#79CFFF] hover:text-[#79CFFF] hover:shadow-[0_0_25px_rgba(121,207,255,0.3)] hover:scale-[1.04] cursor-pointer"
          >
            <span>Contact Me</span>
          </button>
        </div>
      </div>

      {/* Bottom spacer with generous gap and smooth transition into About section */}
      <div className="relative z-10 w-full h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent via-[#0C0C0C]/70 to-[#0C0C0C] pointer-events-none" />
    </section>
  );
};
