import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Decorative Corner 3D Elements */}
      {/* Top-Left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decorative"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object Decorative"
            className="w-[100px] sm:w-[140px] md:w-[180px] object-contain drop-shadow-xl"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Top-Right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decorative"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Decorative"
            className="w-[130px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-xl"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight mb-10 sm:mb-14 md:mb-16 select-none"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph with Character-by-Character Scroll Reveal */}
        <div className="max-w-[620px] px-2 mb-16 sm:mb-20 md:mb-24">
          <AnimatedText
            text="Hey! I'm Kubendra Guru, an IT student who loves turning ideas into working software. I enjoy exploring both frontend and backend technologies, and I'm always looking to learn something new."
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton
            onClick={() => {
              const el = document.getElementById('contact') || document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
};
