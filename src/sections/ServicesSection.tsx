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
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ Custom, responsive Webflow sites</li>
                <li>✓ CMS & dynamic content integration</li>
                <li>✓ Fast, production ready & scalable</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 2. UI/UX Design */}
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

          {/* 3. AI Engineering */}
          <FadeIn delay={0.15} y={20}>
            <TiltCard
              title="AI Engineering"
              price="03"
              badgeLabel="AI Engineering"
              badgeVariant="purple"
              description="Building intelligent applications powered by modern AI models and agentic workflows."
              imageSrc="/assets/services/service_ai_engineering.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ LLM & Gemini API integration</li>
                <li>✓ RAG, embeddings & vector databases</li>
                <li>✓ AI agents & intelligent automation</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 4. Cloud & DevOps */}
          <FadeIn delay={0.2} y={20}>
            <TiltCard
              title="Cloud & DevOps"
              price="04"
              badgeLabel="Cloud & DevOps"
              badgeVariant="blue"
              description="Deploying reliable applications with modern cloud infrastructure and automation."
              imageSrc="/assets/services/service_cloud_devops.svg"
            >
              <ul className="text-sm text-neutral-500 space-y-1 mt-1">
                <li>✓ AWS, Docker & Linux environments</li>
                <li>✓ CI/CD pipelines & Git workflows</li>
                <li>✓ Cloud monitoring & scalable deployments</li>
              </ul>
            </TiltCard>
          </FadeIn>

          {/* 5. Motion & Animation */}
          <FadeIn delay={0.25} y={20}>
            <TiltCard
              title="Motion & Animation"
              price="05"
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
