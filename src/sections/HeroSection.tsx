import React from 'react';
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

export const HeroSection: React.FC = () => {
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
      {/* 1. Fullscreen Looping Background Video */}
      <video
        key={CURRENT_SOURCE.mp4}
        autoPlay
        loop
        muted
        playsInline
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

          {/* Nav CTA Button */}
          <button
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer uppercase tracking-wider font-medium whitespace-nowrap"
          >
            Contact Me
          </button>
        </nav>
      </header>

      {/* 3. Hero Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto w-full flex-1">
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise select-none"
        >
          Where{' '}
          <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">
            through the silence.
          </em>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-normal">
          A 3D creator driven by crafting striking and unforgettable projects.
          Designing digital spaces for sharp focus and inspired visual work.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-fade-rise-delay-2">
          <button
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="liquid-glass rounded-full px-12 py-4 sm:px-14 sm:py-5 text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform duration-200 uppercase tracking-wider font-medium"
          >
            View Projects
          </button>
          <button
            onClick={(e) => handleScrollTo(e, '#about')}
            className="liquid-glass rounded-full px-10 py-4 sm:px-12 sm:py-5 text-base text-muted-foreground hover:text-foreground hover:scale-[1.03] cursor-pointer transition-transform duration-200 uppercase tracking-wider font-medium"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full h-4"></div>
    </section>
  );
};
