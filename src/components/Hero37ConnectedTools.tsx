import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingSquircle {
  id: string;
  name: string;
  x: string; // percentage from left
  y: string; // percentage from top
  rotate: number;
  scale?: number;
  floatClass: string;
  hasHandCursor?: boolean;
  icon: React.ReactNode;
}

// Exact icons and positions matching media_1787926364510.png
const SQUIRCLE_ICONS: FloatingSquircle[] = [
  // 1. Google Drive (Top Left)
  {
    id: 'drive',
    name: 'Google Drive',
    x: '10%',
    y: '8%',
    rotate: -8,
    floatClass: 'animate-float-1',
    icon: (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 pointer-events-none" viewBox="0 0 87.3 78" fill="none">
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA"/>
        <path d="M43.65 25 29.9 1.2C28.55.4 27 0 25.45 0H18.2c1.55 0 3.1.4 4.45 1.2l21 36.4 13.75-23.8z" fill="#00AC47"/>
        <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 5.25-9.1c.8-1.4 1.2-2.95 1.2-4.5H56.1l5.85 10.15 11.6 9.5z" fill="#EA4335"/>
        <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0h-9.3c-1.55 0-3.1.4-4.45 1.2L18.2 37.6l13.75 23.8L43.65 25z" fill="#00832D"/>
        <path d="M59.8 45.4H27.5L13.75 69.2c1.35.8 2.9 1.2 4.45 1.2h50.9c1.55 0 3.1-.4 4.45-1.2L59.8 45.4z" fill="#2684FC"/>
        <path d="M73.4 26.5 59.65 2.7C58.3 1.35 56.75.4 55.05 0l-11.4 19.75 13.75 23.8h27.45c0-1.55-.4-3.1-1.2-4.5l-5.25-12.55z" fill="#FFBA00"/>
      </svg>
    ),
  },
  // 2. Google Calendar "31" (Top Center Left)
  {
    id: 'calendar',
    name: 'Google Calendar',
    x: '28%',
    y: '6%',
    rotate: -10,
    floatClass: 'animate-float-2',
    icon: (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex flex-col items-center justify-center border border-gray-100 shadow-sm overflow-hidden pointer-events-none">
        <div className="w-full h-3.5 bg-[#4285F4] flex items-center justify-center" />
        <span className="text-lg sm:text-xl font-bold font-sans text-[#3C4043] leading-none mt-1">
          31
        </span>
      </div>
    ),
  },
  // 3. Hexagon / Cube Blueprint (Bottom Left)
  {
    id: 'hexagon_cube',
    name: 'Cube / Module',
    x: '38%',
    y: '70%',
    rotate: 0,
    floatClass: 'animate-float-3',
    icon: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#00A3FF] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  // 4. Cyan Waves (Center Right)
  {
    id: 'cyan_waves',
    name: 'Wave Sync',
    x: '60%',
    y: '42%',
    rotate: 4,
    floatClass: 'animate-float-4',
    icon: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#00D8FF] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M2 10c3-3 6-3 9 0s6 3 9 0" />
        <path d="M2 15c3-3 6-3 9 0s6 3 9 0" />
      </svg>
    ),
  },
  // 5. Slack (Bottom Right)
  {
    id: 'slack',
    name: 'Slack',
    x: '64%',
    y: '68%',
    rotate: -4,
    floatClass: 'animate-float-1',
    icon: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 pointer-events-none" viewBox="0 0 24 24">
        <path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zm2-8a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5zm8 2a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5zm-2 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#E01E5A"/>
      </svg>
    ),
  },
  // 6. Figma (Flagship Tile with Hand Pointer Cursor - Top Right)
  {
    id: 'figma',
    name: 'Figma',
    x: '78%',
    y: '28%',
    rotate: 0,
    scale: 1.18,
    floatClass: 'animate-float-2',
    hasHandCursor: true,
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12 pointer-events-none" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
];

export const Hero37ConnectedTools: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [floatingIcons] = useState<FloatingSquircle[]>(SQUIRCLE_ICONS);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-10 select-none">
      {/* ============================================================ */}
      {/* EXACT ORIGINKIT HEROKIT CANVAS (Matching media_1787926364510.png) */}
      {/* ============================================================ */}
      <div
        ref={canvasRef}
        className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] rounded-[36px] sm:rounded-[44px] bg-[#F9F9FB] border border-gray-200/90 shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 overflow-hidden flex flex-col justify-between"
      >
        {/* Soft Fluted Edge Texture on Left & Right */}
        <div className="absolute top-0 bottom-0 left-0 w-24 opacity-30 pointer-events-none flex gap-3 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[3px] h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          ))}
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-24 opacity-30 pointer-events-none flex justify-end gap-3 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[3px] h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          ))}
        </div>

        {/* Ambient Center Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-200/20 via-purple-100/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* ============================================================ */}
        {/* HAND-DRAWN "DRAG ME" DOODLE ARROW (Matching Screenshot) */}
        {/* ============================================================ */}
        <motion.div
          drag
          dragElastic={0.4}
          dragMomentum={true}
          whileHover={{ scale: 1.08, cursor: 'grab' }}
          whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 90 }}
          style={{
            position: 'absolute',
            left: '74%',
            top: '72%',
          }}
          className="z-20 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none pointer-events-auto"
        >
          {/* Curved Hand-drawn Arrow Pointing towards the tiles */}
          <svg className="w-11 h-11 text-gray-800 -rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="none">
            <path
              d="M 20 20 Q 60 10 75 45 Q 85 70 80 85"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 68 75 L 80 85 L 90 70"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="font-covered text-2xl sm:text-3xl text-gray-900 rotate-12 drop-shadow-sm pointer-events-none">
            Drag me
          </span>
        </motion.div>

        {/* ============================================================ */}
        {/* SCATTERED 3D SQUIRCLE TILES (LIVING FLOAT + UNCONSTRAINED DRAG) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
          {floatingIcons.map((item) => (
            <motion.div
              key={item.id}
              drag
              dragElastic={0.5}
              dragMomentum={true}
              dragTransition={{ bounceStiffness: 350, bounceDamping: 25, power: 0.3 }}
              whileHover={{
                scale: (item.scale || 1) * 1.14,
                rotate: item.rotate - 6,
                cursor: 'grab',
                boxShadow:
                  '0 28px 55px -10px rgba(0, 0, 0, 0.18), 0 12px 24px -5px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 1)',
              }}
              whileDrag={{
                scale: (item.scale || 1) * 1.25,
                rotate: item.rotate + 12,
                cursor: 'grabbing',
                zIndex: 100,
                boxShadow:
                  '0 35px 70px -15px rgba(0, 0, 0, 0.28), 0 18px 30px -8px rgba(0, 0, 0, 0.16), inset 0 2px 4px rgba(255, 255, 255, 1)',
              }}
              initial={{
                rotate: item.rotate,
                scale: item.scale || 1,
              }}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                pointerEvents: 'auto',
                boxShadow:
                  '0 20px 45px -8px rgba(0, 0, 0, 0.12), 0 8px 18px -4px rgba(0, 0, 0, 0.06), inset 0 2px 4px rgba(255, 255, 255, 1)',
              }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white via-[#FCFCFD] to-[#F1F3F5] border border-white/90 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none transition-shadow"
            >
              {/* Living Float Motion Wrapper */}
              <div className={`w-full h-full flex items-center justify-center ${item.floatClass} pointer-events-none relative`}>
                {/* Specular Cushion Glaze */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent rounded-t-[inherit] pointer-events-none" />

                {/* Main Icon */}
                <div className="relative z-10">{item.icon}</div>

                {/* Exact Hand Pointer / Thumbs-Up Cursor for Figma Card */}
                {item.hasHandCursor && (
                  <motion.div
                    animate={{
                      scale: [1, 0.92, 1],
                      rotate: [-12, -8, -12],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-3.5 -right-3.5 z-30 pointer-events-none drop-shadow-md"
                  >
                    <svg className="w-8 h-8 text-black fill-white stroke-black" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
