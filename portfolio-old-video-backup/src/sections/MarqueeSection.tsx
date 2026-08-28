import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { AnimatedMotionTile } from '../components/AnimatedMotionTile';

interface MarqueeItem {
  title: string;
  tag: string;
  image: string;
  link?: string;
  motionType?: 'airplane' | 'gym' | 'monument';
}

const FEATURED_PROJECTS: MarqueeItem[] = [
  {
    title: 'EcoVista — Taj Mahal 3D Tour',
    tag: 'Flight & 3D Tour',
    image: '/projects/airplane_sunset.jpg',
    link: 'https://naks-frontend-9c8k-beige.vercel.app/',
    motionType: 'airplane',
  },
  {
    title: 'Apex Elite Fitness',
    tag: 'Gym & Performance',
    image: 'https://images.unsplash.com/photo-1778828494354-9b717d36dc99?w=1200',
    link: 'https://apex-elite-fitness-vz6z.vercel.app/',
    motionType: 'gym',
  },
  {
    title: 'Taj Mahal 3D Monument',
    tag: 'Virtual Tourism',
    image:
      'https://res.cloudinary.com/qrhgjdrs/image/upload/v1783957306/An_improved__highly_detailed_cinematic_202607132108_wv1rpx.jpg',
    link: 'https://naks-frontend-9c8k-beige.vercel.app/',
    motionType: 'monument',
  },
  {
    title: 'Space Voyage Experience',
    tag: 'Kinetic 3D',
    image: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  },
  {
    title: 'CodeNest Interactive',
    tag: 'Web Platform',
    image: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  },
  {
    title: 'Vex Ventures',
    tag: 'Brand Space',
    image: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  },
  {
    title: 'Stellar AI Engine',
    tag: 'AI Interface',
    image: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  },
  {
    title: 'Terra Environmental',
    tag: 'Spatial UI',
    image: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  },
  {
    title: 'Aethera Interactive',
    tag: 'Motion Lab',
    image: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  },
  {
    title: 'Orbit Web3 Protocol',
    tag: 'Decentralized UI',
    image: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  },
  {
    title: 'Luminex Creative',
    tag: 'Design Studio',
    image: 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  },
];

const ROW1_ITEMS = [...FEATURED_PROJECTS];
const ROW2_ITEMS = [...FEATURED_PROJECTS].reverse();

const ROW1_TRIPLED = [...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS];
const ROW2_TRIPLED = [...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const calculatedOffset =
              (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  const renderTile = (item: MarqueeItem, key: string) => {
    if (item.motionType) {
      return (
        <a
          key={key}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <AnimatedMotionTile
            type={item.motionType}
            title={item.title}
            tag={item.tag}
            image={item.image}
            link={item.link}
          />
        </a>
      );
    }

    const standardTile = (
      <div className="group relative w-[420px] h-[270px] rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#38bdf8] bg-[#082f49]/80 px-2 py-0.5 rounded border border-[#0ea5e9]/30">
                {item.tag}
              </span>
              <h4 className="text-white font-medium text-base mt-1.5 tracking-wide">
                {item.title}
              </h4>
            </div>
            {item.link && (
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-colors">
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    );

    return item.link ? (
      <a
        key={key}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        {standardTile}
      </a>
    ) : (
      <div key={key}>{standardTile}</div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
          className="flex gap-4 whitespace-nowrap"
        >
          {ROW1_TRIPLED.map((item, index) => renderTile(item, `row1-${index}`))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
          className="flex gap-4 whitespace-nowrap"
        >
          {ROW2_TRIPLED.map((item, index) => renderTile(item, `row2-${index}`))}
        </div>
      </div>
    </section>
  );
};
