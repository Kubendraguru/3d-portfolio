import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface IsometricCard {
  title: string;
  category: string;
  image: string;
  link?: string;
  badge?: string;
}

// Exactly 3 curated cards per column (12 unique cards total)
const ISOMETRIC_COLUMNS_DATA: IsometricCard[][] = [
  // Column 1 (3 Cards - Train UP)
  [
    {
      title: 'EcoVista Flight Tour',
      category: 'Spatial 3D Experience',
      image: '/projects/airplane_sunset.jpg',
      link: 'https://naks-frontend-9c8k-beige.vercel.app/',
      badge: 'Live Build',
    },
    {
      title: '3D Geometry Prism',
      category: 'WebGL Shader Lab',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      badge: '3D Render',
    },
    {
      title: 'Cyberpunk Neon Lab',
      category: 'Kinetic Motion Design',
      image:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      badge: 'Shaders',
    },
  ],
  // Column 2 (3 Cards - Train DOWN)
  [
    {
      title: 'Apex Elite Fitness',
      category: 'Full Stack Ecosystem',
      image:
        'https://images.unsplash.com/photo-1778828494354-9b717d36dc99?w=800&q=80',
      link: 'https://apex-elite-fitness-vz6z.vercel.app/',
      badge: 'Web App',
    },
    {
      title: 'Moving Your World',
      category: 'Planetary WebGL Interface',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      badge: 'Featured',
    },
    {
      title: 'Orbit Web3 Protocol',
      category: 'Decentralized Finance',
      image:
        'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80',
      badge: 'Web3',
    },
  ],
  // Column 3 (3 Cards - Train UP)
  [
    {
      title: 'Taj Mahal Monument 360',
      category: 'Virtual Heritage Experience',
      image:
        'https://res.cloudinary.com/qrhgjdrs/image/upload/v1783957306/An_improved__highly_detailed_cinematic_202607132108_wv1rpx.jpg',
      link: 'https://naks-frontend-9c8k-beige.vercel.app/',
      badge: 'WebGL 3D',
    },
    {
      title: 'Dark Minimal Device',
      category: 'Product Mockup & UI',
      image:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      badge: 'Hardware UI',
    },
    {
      title: 'Stellar AI Engine',
      category: 'Neural Interface',
      image:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
      badge: 'AI UI',
    },
  ],
  // Column 4 (3 Cards - Train DOWN)
  [
    {
      title: 'Spatial Canvas Protocol',
      category: 'Web3 & Realtime',
      image:
        'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&q=80',
      badge: 'Decentralized',
    },
    {
      title: 'Fluid Gradient Studio',
      category: 'Design Systems',
      image:
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
      badge: 'Brand Identity',
    },
    {
      title: 'Aethera Interactive',
      category: 'Spatial Web3',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      badge: 'Motion Lab',
    },
  ],
];

// Continuous train stream classes: Columns 1 & 3 UP, Columns 2 & 4 DOWN
const COLUMN_ANIM_CLASSES = [
  'animate-iso-train-up',   // Column 1 streams continuously UP
  'animate-iso-train-down', // Column 2 streams continuously DOWN
  'animate-iso-train-up',   // Column 3 streams continuously UP
  'animate-iso-train-down', // Column 4 streams continuously DOWN
];

export const IsometricShowcaseGrid: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const renderCard = (card: IsometricCard, key: string) => {
    const cardContent = (
      <motion.div
        whileHover={{
          scale: 1.12,
          z: 60,
          boxShadow:
            '0 40px 80px -15px rgba(56, 189, 248, 0.55), 0 25px 50px -18px rgba(0, 0, 0, 0.95)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="group relative w-full aspect-[4/4.7] rounded-[28px] sm:rounded-[36px] md:rounded-[42px] overflow-hidden bg-[#161616] border-2 border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-colors hover:border-white/70"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Background Image */}
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

        {/* Top Badge */}
        {card.badge && (
          <div className="absolute top-4 left-4 sm:top-4.5 sm:left-4.5 z-10">
            <span className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs uppercase font-mono tracking-widest bg-black/65 backdrop-blur-md text-[#38bdf8] border border-white/20 shadow-md">
              {card.badge}
            </span>
          </div>
        )}

        {/* Top Right External Link Arrow */}
        <div className="absolute top-4 right-4 sm:top-4.5 sm:right-4.5 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
          <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-[#9CA3AF] block mb-1">
            {card.category}
          </span>
          <h4 className="text-white font-bold text-base sm:text-lg md:text-xl leading-snug tracking-wide group-hover:text-[#38bdf8] transition-colors">
            {card.title}
          </h4>
        </div>
      </motion.div>
    );

    return card.link ? (
      <a
        key={key}
        href={card.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {cardContent}
      </a>
    ) : (
      <div key={key} className="w-full">
        {cardContent}
      </div>
    );
  };

  return (
    <section
      id="showcase"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] pt-14 sm:pt-20 md:pt-24 pb-36 sm:pb-48 overflow-hidden border-t border-white/5 z-20 select-none flex flex-col items-center"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-[#7621B0]/25 via-[#38bdf8]/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">
        {/* Section Heading: "Showcase" with ample space so cards never touch */}
        <div className="max-w-6xl mx-auto flex flex-col items-center px-4 mb-8 sm:mb-12 md:mb-16 text-center">
          <FadeIn delay={0} y={40} className="w-full text-center">
            <h2
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
              className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            >
              Showcase
            </h2>
          </FadeIn>
        </div>

        {/* ============================================================ */}
        {/* SEAMLESS TRAIN STREAM ISOMETRIC 3D GRID (Slightly Shorter Cards) */}
        {/* ============================================================ */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full flex justify-center items-center overflow-visible py-4 mt-2 sm:mt-4 md:mt-6"
        >
          <div
            style={{
              perspective: '1500px',
              perspectiveOrigin: '36% 25%',
            }}
            className="w-full max-w-7xl lg:max-w-[1400px] flex justify-center"
          >
            <div
              style={{
                transform:
                  'translateX(-10%) rotateX(40deg) rotateZ(10deg) rotateY(-5deg) scale(1.14)',
                transformStyle: 'preserve-3d',
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7 md:gap-8 w-[120%] -ml-[10%]"
            >
              {ISOMETRIC_COLUMNS_DATA.map((colCards, colIdx) => {
                const animClass = COLUMN_ANIM_CLASSES[colIdx % COLUMN_ANIM_CLASSES.length];

                return (
                  <div
                    key={colIdx}
                    style={{
                      animationPlayState: isHovered ? 'paused' : 'running',
                      willChange: 'transform',
                    }}
                    className={`flex flex-col ${animClass}`}
                  >
                    {/* Track 1 (3 Cards) */}
                    <div className="flex flex-col gap-5 sm:gap-7 md:gap-8 pb-5 sm:pb-7 md:pb-8">
                      {colCards.map((card, cardIdx) =>
                        renderCard(card, `${colIdx}-track1-${cardIdx}`)
                      )}
                    </div>
                    {/* Track 2 (Duplicate 3 Cards for seamless infinite train loop) */}
                    <div
                      aria-hidden="true"
                      className="flex flex-col gap-5 sm:gap-7 md:gap-8 pb-5 sm:pb-7 md:pb-8"
                    >
                      {colCards.map((card, cardIdx) =>
                        renderCard(card, `${colIdx}-track2-${cardIdx}`)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
