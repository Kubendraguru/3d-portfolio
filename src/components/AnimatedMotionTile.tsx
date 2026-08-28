import React from 'react';
import { ExternalLink, Compass, Activity, Plane, Sparkles } from 'lucide-react';

interface AnimatedMotionTileProps {
  type: 'airplane' | 'gym' | 'monument';
  title: string;
  tag: string;
  image: string;
  link?: string;
}

export const AnimatedMotionTile: React.FC<AnimatedMotionTileProps> = ({
  type,
  title,
  tag,
  image,
  link,
}) => {
  return (
    <div className="group relative w-[420px] h-[270px] rounded-2xl overflow-hidden bg-[#121212] border border-white/10 hover:border-[#38bdf8]/60 transition-all duration-500 shadow-2xl flex-shrink-0 cursor-pointer">
      {/* 1. Base Image with Continuous Ken Burns & Parallax Motion */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover rounded-2xl pointer-events-none ${
            type === 'airplane'
              ? 'animate-airplane-motion'
              : type === 'gym'
              ? 'animate-gym-motion'
              : 'animate-monument-motion'
          }`}
          draggable={false}
        />
      </div>

      {/* 2. Type-Specific Living Motion Layers */}

      {/* A. AIRPLANE TILE MOTION: Atmospheric Clouds, Sun Flare & Flight HUD */}
      {type === 'airplane' && (
        <>
          {/* Drifting Clouds / Mist */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-amber-200/15 to-white/0 animate-cloud-drift pointer-events-none mix-blend-screen" />
          
          {/* Pulsing Sun Flare on the Wing */}
          <div className="absolute top-8 right-16 w-32 h-32 rounded-full bg-amber-400/25 blur-2xl animate-sun-flare pointer-events-none" />

          {/* Airplane Window Frame Reflection Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

          {/* Flight HUD Floating Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 text-amber-300 text-[10px] font-mono tracking-wider shadow-lg">
            <Plane className="w-3 h-3 animate-pulse" />
            <span>FL380 • 850 KM/H</span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white/90 text-[10px] font-mono tracking-wider">
            <Compass className="w-3 h-3 text-[#38bdf8] animate-spin" style={{ animationDuration: '12s' }} />
            <span>AGRA HD 3D</span>
          </div>
        </>
      )}

      {/* B. APEX GYM TILE MOTION: Neon Laser Sweep, Audio Equalizer & Heartbeat */}
      {type === 'gym' && (
        <>
          {/* Cyan Neon Laser Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 animate-neon-sweep pointer-events-none" />

          {/* Ambient Dark Neon Glow */}
          <div className="absolute bottom-4 left-4 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Gym Performance Telemetry Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 text-[10px] font-mono tracking-wider shadow-lg">
            <Activity className="w-3 h-3 text-cyan-400 animate-bounce" />
            <span>145 BPM • ATHLETE MODE</span>
          </div>

          {/* Animated Equalizer Wave */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-0.5 bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
            <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-eq-1" />
            <span className="w-1 h-4 bg-cyan-300 rounded-full animate-eq-2" />
            <span className="w-1 h-1.5 bg-cyan-400 rounded-full animate-eq-3" />
            <span className="w-1 h-3 bg-cyan-300 rounded-full animate-eq-1" />
          </div>
        </>
      )}

      {/* C. MONUMENT TILE MOTION: Golden God-Rays, 3D Spatial Particles & Floating Mist */}
      {type === 'monument' && (
        <>
          {/* Golden Volumetric God Rays */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-300/15 via-transparent to-amber-500/20 animate-golden-haze pointer-events-none mix-blend-screen" />

          {/* Shimmering Golden Dust */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent animate-pulse pointer-events-none" />

          {/* Spatial 3D Explorer Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40 text-amber-300 text-[10px] font-mono tracking-wider shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>360° 3D VIRTUAL MONUMENT</span>
          </div>
        </>
      )}

      {/* 3. Bottom Information Bar & Live Badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end opacity-95 group-hover:opacity-100 transition-opacity z-20">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-[#38bdf8] bg-[#082f49]/90 px-2.5 py-0.5 rounded-full border border-[#0ea5e9]/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                {tag}
              </span>
            </div>
            <h4 className="text-white font-semibold text-base mt-2 tracking-wide group-hover:text-[#38bdf8] transition-colors">
              {title}
            </h4>
          </div>

          {link && (
            <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#38bdf8] group-hover:text-black transition-all duration-300 group-hover:scale-110 shadow-lg border border-white/20">
              <ExternalLink className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
