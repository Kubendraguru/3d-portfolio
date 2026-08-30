import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  liveUrl: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'EcoVista — Taj Mahal 3D Tour',
    category: '3D Web Experience / Flight Tour',
    liveUrl: 'https://naks-frontend-9c8k-beige.vercel.app/',
    col1Img1:
      'https://res.cloudinary.com/qrhgjdrs/image/upload/v1783957306/An_improved__highly_detailed_cinematic_202607132108_wv1rpx.jpg',
    col1Img2:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1280&q=85',
    col2Img: '/projects/airplane_sunset.jpg',
  },
  {
    number: '02',
    name: 'Apex Elite Fitness',
    category: 'Full Stack Performance & Gym Platform',
    liveUrl: 'https://apex-elite-fitness-vz6z.vercel.app/',
    col1Img1:
      'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=1200',
    col1Img2:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
    col2Img:
      'https://images.unsplash.com/photo-1778828494354-9b717d36dc99?w=1200',
  },
  {
    number: '03',
    name: 'Anna University Study Hub',
    category: 'Full Stack Performance & Learning Platform',
    liveUrl: '',
    col1Img1: '/projects/anna_hub_1.jpg',
    col1Img2: '/projects/anna_hub_2.jpg',
    col2Img: '/projects/anna_hub_main.jpg',
  },
  {
    number: '04',
    name: 'Solespace — Haute Footwear',
    category: '3D E-Commerce & Interactive Footwear',
    liveUrl: 'https://soles-shoe.vercel.app/',
    col1Img1: '/projects/soles_sneaker.jpg',
    col1Img2: '/projects/soles_slider.jpg',
    col2Img: '/projects/soles_showroom.jpg',
  },
  {
    number: '05',
    name: 'SnapTask — AI Note-to-Task App',
    category: 'AI OCR & Intelligent Task Management',
    liveUrl: '',
    col1Img1: '/projects/snaptask_1.jpg',
    col1Img2: '/projects/snaptask_2.jpg',
    col2Img: '/projects/snaptask_main.jpg',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  targetScale: number;
  range: [number, number];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  targetScale,
  range,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 shadow-2xl origin-top"
      >
        {/* Top Row: Number, Category, Project Name, Live Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#D7E2EA]/10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              className="font-black text-[#D7E2EA] leading-none select-none"
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#777777] font-medium">
                {project.category}
              </span>
              <h3
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
                className="font-medium uppercase text-[#D7E2EA] tracking-wide"
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="self-end sm:self-center">
            <LiveProjectButton href={project.liveUrl} />
          </div>
        </div>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 w-full">
          {/* Left Column (40% width / 5 cols) with 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            {/* Left Top Image */}
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616]"
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                draggable={false}
              />
            </div>

            {/* Left Bottom Image */}
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616]"
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) with 1 tall image */}
          <div className="md:col-span-7 h-[290px] sm:h-[350px] md:h-auto rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#161616]">
            <img
              src={project.col2Img}
              alt={`${project.name} main showcase`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-48 sm:pb-60 md:pb-72 px-4 sm:px-6 md:px-10 z-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading: Singular "Project" with gradient */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky-Stacking Project Cards */}
        <div className="w-full relative">
          {PROJECTS.map((project, index) => {
            const targetScale = 1 - (totalCards - 1 - index) * 0.03;
            const range: [number, number] = [index * (1 / totalCards), 1];

            return (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                targetScale={targetScale}
                range={range}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
