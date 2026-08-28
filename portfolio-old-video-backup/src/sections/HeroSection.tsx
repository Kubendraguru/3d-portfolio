import React from 'react';

// Hero video configurations
// Switch active source between 'new' (Cloudinary) and 'previous' (Original CloudFront)
export const HERO_VIDEO_OPTIONS = {
  new: {
    webm: 'https://res.cloudinary.com/qrhgjdrs/video/upload/final-2x_hvxo1f.webm',
    mp4: 'https://res.cloudinary.com/qrhgjdrs/video/upload/final-2x_hvxo1f.mp4',
    mov: 'https://res.cloudinary.com/qrhgjdrs/video/upload/final-2x_hvxo1f.mov',
  },
  previous: {
    mp4: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
};

// Currently Active Video Source
const CURRENT_SOURCE = HERO_VIDEO_OPTIONS.previous;

export const HeroSection: React.FC = () => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#about' },
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

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-background"
    >
      {/* 1. Fullscreen Looping Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      >
        {'webm' in CURRENT_SOURCE && CURRENT_SOURCE.webm && (
          <source src={CURRENT_SOURCE.webm} type="video/webm" />
        )}
        <source src={CURRENT_SOURCE.mp4} type="video/mp4" />
        {'mov' in CURRENT_SOURCE && CURRENT_SOURCE.mov && (
          <source src={CURRENT_SOURCE.mov} type="video/quicktime" />
        )}
      </video>

      {/* 2. Glassmorphic Navigation Bar */}
      <header className="relative z-10 w-full">
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl tracking-tight text-foreground select-none hover:opacity-80 transition-opacity"
          >
            Kubendra Guru<sup className="text-xs">®</sup>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Nav CTA Button */}
          <button
            onClick={(e) => handleScrollTo(e, '#about')}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer uppercase tracking-wider font-medium"
          >
            Contact Me
          </button>
        </nav>
      </header>

      {/* 3. Hero Main Content (Centered, Cinematic Typography) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto w-full flex-1">
        {/* H1 Heading with Instrument Serif and Emphasized Color Contrast */}
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise select-none"
        >
          Where{' '}
          <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-normal">
          A 3D creator driven by crafting striking and unforgettable projects.
          Designing digital spaces for sharp focus and inspired visual work.
        </p>

        {/* Hero Action Buttons */}
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

      {/* Bottom spacer for balance */}
      <div className="relative z-10 w-full h-4"></div>
    </section>
  );
};
