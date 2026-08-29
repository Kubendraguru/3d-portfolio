import React from 'react';
import { Lanyard } from '../components/Lanyard';
import { FadeIn } from '../components/FadeIn';

export const LanyardSection: React.FC = () => {
  return (
    <section
      id="lanyard"
      className="relative w-full min-h-screen bg-[#000000] text-[#D7E2EA] overflow-hidden flex flex-col justify-center items-center border-t border-white/10 z-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#7621B0]/20 via-[#38BDF8]/15 to-transparent rounded-full blur-[180px] pointer-events-none" />

      {/* Floating Header Tag */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center flex flex-col items-center gap-3">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono uppercase tracking-widest text-[#38BDF8] backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            3D Physics Lanyard Pass // Drag & Toss
          </div>
        </FadeIn>
      </div>

      {/* Standalone 100vh Lanyard Canvas */}
      <div className="w-full h-screen relative z-10">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          fov={20}
          frontImage="/assets/lanyard/card_front.png"
          backImage="/assets/lanyard/card_back.png"
          imageFit="cover"
          lanyardWidth={1}
        />
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-xs font-mono tracking-widest text-[#777777] uppercase">
          Grab, drag, and fling the badge to spin in real-time 3D physics
        </span>
      </div>
    </section>
  );
};
