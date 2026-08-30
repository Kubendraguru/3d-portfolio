import React, { useState, useRef } from 'react';
import { Volume2, ArrowUpRight, Check, Copy, Sparkles } from 'lucide-react';

const BOY_SWING_VIDEO = 'https://res.cloudinary.com/qrhgjdrs/video/upload/v1788081355/boy-swing_gzljlr.mp4';

export const CinematicFooterSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const emailAddress = 'kubendraguru23@gmail.com';

  const handleMouseEnter = () => {
    setIsPlayingAudio(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.85;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.log('Audio & Video playback prevented on hover:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlayingAudio(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
    }
  };

  const handleCopyOrSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
        'Website Project Inquiry — Kubendra Guru'
      )}&body=${encodeURIComponent(
        `Hi Kubendra,\n\nI came across your 3D portfolio and I am interested in discussing a website project.\n\nFrom: ${emailInput}\n\nProject Details:\n• Type of Project (e.g. 3D Web Experience, Portfolio, Web Application): \n• Estimated Timeline: \n• Budget Range: \n\nLooking forward to connecting!\n\nBest regards,`
      )}`;
      window.open(url, '_blank');
    } else {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer
      id="cinematic-footer"
      className="relative w-full bg-[#090909] text-[#E0E0E0] font-mono select-none overflow-hidden border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6 md:px-10"
    >
      {/* Blueprint Grid Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#CCFF00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* 1. Header Toolbar: Monogram + Nav + Direct Email Form */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Left: Brand Monogram */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-black text-sm tracking-tighter text-white shadow-inner">
              KG
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                KUBENDRA GURU
              </span>
              <span className="text-[10px] text-[#888888] tracking-widest uppercase">
                3D Creative &amp; Engineering Lab
              </span>
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav aria-label="Footer Nav" className="hidden md:flex items-center gap-6 font-mono text-xs">
            {[
              { name: 'HOME', href: '#' },
              { name: 'ABOUT', href: '#about' },
              { name: 'SERVICES', href: '#services' },
              { name: 'PROJECTS', href: '#projects' },
              { name: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#888888] hover:text-[#CCFF00] transition-colors uppercase tracking-wider text-[11px]"
              >
                [ {link.name} ]
              </a>
            ))}
          </nav>

          {/* Right: Direct Email Form */}
          <div className="flex items-center gap-3">
            {/* Email Trigger Pill */}
            <form
              onSubmit={handleCopyOrSend}
              className="flex items-center justify-between p-1 pl-3 rounded-full bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.25)] transition-transform hover:scale-[1.02]"
            >
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-transparent text-black placeholder:text-black/60 text-[10px] font-bold font-mono outline-none w-24 sm:w-28 uppercase"
              />
              <button
                type="submit"
                className="w-6 h-6 rounded-full bg-black text-[#CCFF00] flex items-center justify-center hover:bg-neutral-900 transition-colors shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* 2. Panoramic Banner Strip: Exactly matching the 1024x376 size reference with Hover-to-Play-Audio */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EBE6DD] border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] group cursor-pointer transition-all duration-300 hover:border-[#CCFF00]/50 hover:shadow-[0_25px_70px_rgba(204,255,0,0.15)]"
        >
          {/* Top Mini Toolbar Overlay */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-30 font-mono text-[9px] sm:text-[10px] uppercase select-none pointer-events-none">
            <span className="flex items-center gap-1.5 bg-black/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm text-[#111111]/75">
              <Sparkles className="w-3 h-3 text-black" />
              <span className="font-bold">Panoramic VR Lab</span>
            </span>

            {/* Live Audio Status Indicator */}
            {isPlayingAudio ? (
              <div className="flex items-center gap-2 bg-black/90 text-[#CCFF00] px-3 py-1 rounded-full border border-[#CCFF00]/50 backdrop-blur-md shadow-[0_0_20px_rgba(204,255,0,0.35)] transition-all">
                <span className="flex items-end gap-0.5 h-3 pb-0.5">
                  <span className="w-0.5 h-2 bg-[#CCFF00] animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-3 bg-[#CCFF00] animate-[pulse_0.4s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 h-1.5 bg-[#CCFF00] animate-[pulse_0.5s_ease-in-out_infinite_0.1s]" />
                  <span className="w-0.5 h-2.5 bg-[#CCFF00] animate-[pulse_0.45s_ease-in-out_infinite_0.3s]" />
                </span>
                <span className="font-bold text-[10px] tracking-widest text-[#CCFF00]">AUDIO &amp; VIDEO PLAYING</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-black/15 text-neutral-800 px-3 py-0.5 rounded-full backdrop-blur-sm border border-black/10 transition-all group-hover:bg-black/25">
                <Volume2 className="w-3 h-3 text-neutral-800" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider">HOVER TO PLAY VIDEO &amp; AUDIO</span>
              </div>
            )}
          </div>

          {/* Panoramic Strip Container (1024x376 Ratio: 2.72:1) */}
          <div className="relative w-full aspect-[1024/376] flex items-center justify-center">
            {/* VIDEO PLAYING DIRECTLY INSIDE THE VR VISOR SCREEN (Coordinates: left=37.988%, top=44.947%, width=25.488%, height=26.330%) */}
            <div
              style={{
                position: 'absolute',
                left: '37.988%',
                top: '44.947%',
                width: '25.488%',
                height: '26.330%',
              }}
              className="overflow-hidden z-0 rounded-[5px] sm:rounded-[8px] md:rounded-[10px] bg-[#EBE6DD] shadow-inner"
            >
              <video
                ref={videoRef}
                src={BOY_SWING_VIDEO}
                preload="auto"
                loop
                muted={!isPlayingAudio}
                playsInline
                style={{
                  filter: 'sepia(35%) contrast(110%) brightness(98%) saturate(85%) hue-rotate(-6deg)',
                }}
                className="w-full h-full object-cover scale-[1.05]"
              />

              {/* Clean Subtle Parchment Tint (Zero pixel lines, pristine HD clarity) */}
              <div className="absolute inset-0 bg-[#C2AF92]/15 mix-blend-color pointer-events-none z-10" />
            </div>

            {/* Ink-Illustrated Panoramic Strip Overlay with Clean Visor Cutout */}
            <img
              src="/assets/footer/vr_strip_transparent.png"
              alt="Panoramic VR Lab Strip"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
            />
          </div>
        </div>

        {/* 3. Bottom Footer Meta Ribbon */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-[#777777] font-mono">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-bold">KUBENDRA GURU</strong> / ALL RIGHTS RESERVED
          </div>

          {/* Quick Email Copy Action */}
          <div className="flex items-center gap-2">
            <span>EMAIL:</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(emailAddress);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-[#CCFF00] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : emailAddress}</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-[#CCCCCC]">
            <a
              href="https://github.com/Kubendraguru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#CCFF00] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#CCFF00] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/harix_23__/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#CCFF00] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href={`https://wa.me/917338790574?text=${encodeURIComponent(
                "Hi Kubendra, I came across your 3D portfolio and I'd like to discuss a website project!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#CCFF00] transition-colors"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CinematicFooterSection;
