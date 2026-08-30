import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { TiltCard } from '../components/unlumen-ui/tilt-card';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 z-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header matching unlumen UI */}
        <FadeIn delay={0} y={30} className="w-full flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-600 mb-3 shadow-2xs">
            <span>Services & Capabilities</span>
          </div>

          <h2
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
            className="text-neutral-950 font-black uppercase tracking-tight leading-none mb-4 select-none"
          >
            Services
          </h2>

          <p className="text-neutral-500 text-base md:text-lg max-w-xl font-light leading-relaxed">
            Every interface is designed with clarity, usability, and conversion in mind.
          </p>
        </FadeIn>

        {/* Vertical Stack of TiltCards */}
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* 1. Webflow Development */}
          <FadeIn delay={0.05} y={20}>
            <TiltCard
              title="Webflow Development"
              description="Everything you need to build and ship fast."
              price="01"
              badgeLabel="Popular"
              badgeVariant="success"
              imageSrc="/assets/services/service_web_design.svg"
              href="#webflow"
            />
          </FadeIn>

          {/* 2. UI/UX Design (Custom Children) */}
          <FadeIn delay={0.1} y={20}>
            <TiltCard
              title="UI/UX Design"
              description="Every interface is designed with clarity, usability, and conversion in mind."
              price="02"
              badgeLabel="Design Systems"
              badgeVariant="success"
              imageSrc="/assets/services/service_branding.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ Intuitive user flows & wireframes</li>
                <li>✓ Scalable Figma component libraries</li>
                <li>✓ Pixel-perfect UI & conversion focus</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 3. Motion & Animation (Custom Children with Warning Badge) */}
          <FadeIn delay={0.15} y={20}>
            <TiltCard
              title="Motion & Animation"
              price="03"
              badgeLabel="Best value"
              badgeVariant="warning"
              description="Dynamic kinetic motion graphics that add storytelling to digital experiences."
              imageSrc="/assets/services/service_motion.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ 3D WebGL & camera choreography</li>
                <li>✓ Framer Motion & GSAP fluid easing</li>
                <li>✓ Lottie & vector micro-interactions</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 4. Marketing Strategy */}
          <FadeIn delay={0.2} y={20}>
            <TiltCard
              title="Marketing Strategy"
              description="Data-driven growth roadmaps and high-impact digital launch campaigns."
              price="04"
              badgeLabel="Growth"
              badgeVariant="success"
              imageSrc="/assets/services/service_rendering.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ Brand positioning & market analysis</li>
                <li>✓ High-converting landing page funnels</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 5. Copywriting */}
          <FadeIn delay={0.25} y={20}>
            <TiltCard
              title="Copywriting"
              description="Compelling narratives and sharp brand tone of voice that convert visitors."
              price="05"
              badgeLabel="Brand Voice"
              badgeVariant="success"
              imageSrc="/assets/services/service_3d_modeling.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ High-impact hero messaging</li>
                <li>✓ Product storytelling & case studies</li>
              </ul>
            </TiltCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
