import React, { useEffect, useRef } from 'react';
import { FadeIn } from '../components/FadeIn';
import { Hero37ConnectedTools } from '../components/Hero37ConnectedTools';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset and play video whenever the user scrolls into the Skills section
          video.currentTime = 0;
          video.play().catch((err) => {
            console.log('Video autoplay on scroll prevented:', err);
          });
        } else {
          // Pause when scrolling away
          video.pause();
        }
      },
      {
        threshold: 0.2, // Trigger as soon as 20% of the section is in view
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] pt-20 sm:pt-28 md:pt-36 pb-20 overflow-hidden z-20"
    >
      {/* 1. Large Gradient Heading */}
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4 mb-16 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
          >
            Skills
          </h2>
        </FadeIn>
      </div>

      {/* 2. Fully Covered Full-Screen Video */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        >
          <source
            src="https://res.cloudinary.com/qrhgjdrs/video/upload/v1787924762/skill-1_vqhy3t.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 3. Hero 37 Connected Tools Canvas (Floating & Draggable 3D Squircle Skills) */}
      <div className="relative z-10 w-full">
        <Hero37ConnectedTools />
      </div>
    </section>
  );
};
