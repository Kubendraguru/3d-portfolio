import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Heading scroll transforms
  const headingScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.9]);
  const headingY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-40, 0, 0, -30]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  // Corner 3D Element 1: Top-Left Moon
  const moonX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-140, 0, 0, -100]);
  const moonY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-90, 0, 0, -60]);
  const moonRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 30]);
  const moonScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.75, 1.05, 1, 0.85]);

  // Corner 3D Element 2: Top-Right Lego Brick
  const legoX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [140, 0, 0, 100]);
  const legoY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-90, 0, 0, -60]);
  const legoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -35]);
  const legoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.75, 1.05, 1, 0.85]);

  // Corner 3D Element 3: Bottom-Left Smiley
  const smileyX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-140, 0, 0, -100]);
  const smileyY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [110, 0, 0, 80]);
  const smileyRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 25]);
  const smileyScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.75, 1.05, 1, 0.85]);

  // Corner 3D Element 4: Bottom-Right 3D Cursor Arrow
  const cursorX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [140, 0, 0, 100]);
  const cursorY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [110, 0, 0, 80]);
  const cursorRotate = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const cursorScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.75, 1.05, 1, 0.85]);

  // Tagline Scroll Transform
  const taglineOpacity = useTransform(scrollYProgress, [0.70, 0.84], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.70, 0.84], [20, 0]);
  const taglineScale = useTransform(scrollYProgress, [0.70, 0.84], [0.9, 1]);

  // Contact Button Scroll Transform
  const buttonOpacity = useTransform(scrollYProgress, [0.80, 0.94], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.80, 0.94], [0.8, 1]);
  const buttonY = useTransform(scrollYProgress, [0.80, 0.94], [25, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#0C0C0C]"
    >
      {/* Pinned Viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* 1. Corner 3D Floating Elements with Scroll-Driven Parallax */}
        {/* Top-Left: Moon Icon */}
        <motion.div
          style={{
            x: moonX,
            y: moonY,
            rotate: moonRotate,
            scale: moonScale,
          }}
          className="absolute top-[6%] sm:top-[8%] md:top-[10%] left-[2%] sm:left-[3%] md:left-[5%] pointer-events-none z-10"
        >
          <motion.img
            animate={{
              y: [0, -12, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decorative"
            className="w-[100px] sm:w-[135px] md:w-[180px] object-contain drop-shadow-[0_15px_35px_rgba(0,122,255,0.35)]"
            draggable={false}
          />
        </motion.div>

        {/* Top-Right: Lego Icon */}
        <motion.div
          style={{
            x: legoX,
            y: legoY,
            rotate: legoRotate,
            scale: legoScale,
          }}
          className="absolute top-[6%] sm:top-[8%] md:top-[10%] right-[2%] sm:right-[3%] md:right-[5%] pointer-events-none z-10"
        >
          <motion.img
            animate={{
              y: [0, 14, 0],
              rotate: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decorative"
            className="w-[100px] sm:w-[135px] md:w-[180px] object-contain drop-shadow-[0_15px_35px_rgba(168,85,247,0.35)]"
            draggable={false}
          />
        </motion.div>

        {/* Bottom-Left: 3D Smiley Face */}
        <motion.div
          style={{
            x: smileyX,
            y: smileyY,
            rotate: smileyRotate,
            scale: smileyScale,
          }}
          className="absolute bottom-[5%] sm:bottom-[7%] md:bottom-[8%] left-[2%] sm:left-[4%] md:left-[6%] pointer-events-none z-10"
        >
          <motion.img
            animate={{
              y: [0, -10, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Smiley Decorative"
            className="w-[85px] sm:w-[120px] md:w-[155px] object-contain drop-shadow-[0_15px_35px_rgba(236,72,153,0.35)]"
            draggable={false}
          />
        </motion.div>

        {/* Bottom-Right: 3D Group / Cursor Arrow */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            rotate: cursorRotate,
            scale: cursorScale,
          }}
          className="absolute bottom-[5%] sm:bottom-[7%] md:bottom-[8%] right-[2%] sm:right-[4%] md:right-[6%] pointer-events-none z-10"
        >
          <motion.img
            animate={{
              y: [0, 12, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Cursor Decorative"
            className="w-[105px] sm:w-[140px] md:w-[185px] object-contain drop-shadow-[0_15px_35px_rgba(139,92,246,0.35)]"
            draggable={false}
          />
        </motion.div>

        {/* 2. Main Content Wrapper */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Huge Hero Heading */}
          <motion.h2
            style={{
              fontSize: 'clamp(2.75rem, 9.5vw, 130px)',
              scale: headingScale,
              y: headingY,
              opacity: headingOpacity,
            }}
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6 sm:mb-8 md:mb-10 select-none"
          >
            About me
          </motion.h2>

          {/* Synchronized Pinned Scroll Text Reveal: Paragraph 1 & Paragraph 2 */}
          <div className="max-w-[760px] px-3 flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
            <AnimatedText
              text="Hey, I’m Kubendra Guru, an IT student and Full-Stack Developer who loves turning ideas into interactive digital experiences. I work across Frontend, Backend, AWS, DevOps, and AI, while exploring creative web technologies like 3D, GSAP, and smooth web animations."
              externalProgress={scrollYProgress}
              range={[0.10, 0.48]}
              className="font-medium text-center leading-relaxed text-[clamp(0.95rem,1.75vw,1.25rem)]"
            />
            <AnimatedText
              text="I enjoy building modern websites, developing complete applications from UI to backend, and experimenting with new technologies to make every project more engaging and functional."
              externalProgress={scrollYProgress}
              range={[0.45, 0.72]}
              className="font-medium text-center leading-relaxed text-[clamp(0.95rem,1.75vw,1.25rem)] text-zinc-300"
            />
          </div>

          {/* Punchy Tagline Reveal */}
          <motion.div
            style={{
              opacity: taglineOpacity,
              scale: taglineScale,
              y: taglineY,
            }}
            className="mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <span className="font-mono font-bold tracking-wider text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-[#38BDF8] to-[#F472B6]">
                Code it. Animate it. Ship it. 🚀
              </span>
            </div>
          </motion.div>

          {/* Contact Button Linked to Pinned Scroll Scrub */}
          <motion.div
            style={{
              opacity: buttonOpacity,
              scale: buttonScale,
              y: buttonY,
            }}
          >
            <ContactButton
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

