import React, { useEffect, useRef } from 'react';
import { FadeIn } from '../components/FadeIn';
import { InteractiveSkillsCanvas } from '../components/InteractiveSkillsCanvas';

export const SkillsSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch((err) => {
            console.log('Autoplay prevented:', err);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] pt-24 sm:pt-32 md:pt-44 pb-0 overflow-hidden z-20"
    >
      {/* 1. Large Gradient "SKILLS" Heading Elevated Cleanly Above Him */}
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4 mb-14 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={35} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(3.5rem, 13vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight select-none drop-shadow-2xl"
          >
            SKILLS
          </h2>
        </FadeIn>
      </div>

      {/* 2. Full-Width Video with High Clearance Below Heading */}
      <div className="relative w-full h-screen min-h-[650px] overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        >
          <source
            src="https://res.cloudinary.com/qrhgjdrs/video/upload/v1787904458/boy-skill_gwr_video_mvp_rlxor2.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle Top & Bottom Cinematic Edge Vignettes */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0C0C0C] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-10" />
      </div>

      {/* 3. Interactive Kinetic 3D Skills Canvas (Mounted Down Below the Video) */}
      <div className="relative z-20 w-full">
        <InteractiveSkillsCanvas />
      </div>
    </section>
  );
};
