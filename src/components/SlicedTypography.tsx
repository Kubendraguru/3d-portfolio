import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SlicedTypographyProps {
  title?: string;
  topLabel?: string;
  bottomLabel?: string;
  imageUrl?: string;
  className?: string;
  nameBadge?: string;
}

export const SlicedTypography: React.FC<SlicedTypographyProps> = ({
  title = 'PORTFOLIO',
  topLabel = 'ARCHITECTURE',
  bottomLabel = '2024 - 2026',
  nameBadge = 'KUBENDRA GURU',
  imageUrl = '/assets/loader/architecture_mask.jpg',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const topSliceRef = useRef<HTMLDivElement>(null);
  const middleSliceRef = useRef<HTMLDivElement>(null);
  const bottomSliceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const middle = middleSliceRef.current;
    const top = topSliceRef.current;
    const bottom = bottomSliceRef.current;

    if (!container || !middle || !top || !bottom) return;

    // Set initial GSAP states: completely flat, 0 offset, no shadows
    gsap.set([top, bottom], {
      x: 0,
      y: 0,
      filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
    });

    gsap.set(middle, {
      x: 0,
      y: 0,
      filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
      backgroundPosition: '50% 50%',
    });

    // Hover In Animation (staggered cutout + 3D depth drop shadows)
    const handleMouseEnter = () => {
      gsap.to(middle, {
        x: 14,
        y: 8,
        filter: 'drop-shadow(-8px 12px 14px rgba(0,0,0,0.38)) drop-shadow(4px 6px 8px rgba(0,0,0,0.2))',
        duration: 0.55,
        ease: 'power3.out',
      });

      gsap.to(top, {
        x: -4,
        y: -3,
        filter: 'drop-shadow(0px 8px 10px rgba(0,0,0,0.22))',
        duration: 0.55,
        ease: 'power3.out',
      });

      gsap.to(bottom, {
        x: 2,
        y: 2,
        duration: 0.55,
        ease: 'power3.out',
      });
    };

    // Hover Out Animation (return to flat aligned state)
    const handleMouseLeave = () => {
      gsap.to([top, middle, bottom], {
        x: 0,
        y: 0,
        filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        duration: 0.6,
        ease: 'power3.inOut',
      });

      gsap.to(middle, {
        backgroundPosition: '50% 50%',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    };

    // Bonus Parallax Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle parallax shift on the background image inside middle text slice (moving 4-8px)
      gsap.to(middle, {
        backgroundPosition: `${50 + relX * 12}% ${50 + relY * 12}%`,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Subtle 3D tilt responsiveness
      gsap.to(textWrapperRef.current, {
        rotateX: -relY * 8,
        rotateY: relX * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center bg-[#f4f4f4] text-[#111] p-8 select-none overflow-hidden cursor-pointer ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Top Label with Accent Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-[2.5px] bg-[#111]" />
        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-[#111] font-bold">
          {topLabel}
        </span>
        <div className="w-8 h-[2.5px] bg-[#111]" />
      </div>

      {/* Main 3-Slice Typography Container */}
      <div
        ref={textWrapperRef}
        className="relative flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 1: Top Slice (Solid Black #111, Clipped to top 34%) */}
        <div
          ref={topSliceRef}
          className="relative z-30 font-black tracking-tight uppercase leading-none select-none text-[#111]"
          style={{
            fontSize: 'clamp(4rem, 14vw, 160px)',
            fontFamily: '"Impact", "Anton", "Arial Black", sans-serif',
            clipPath: 'inset(0% 0% 66% 0%)',
            WebkitClipPath: 'inset(0% 0% 66% 0%)',
          }}
        >
          {title}
        </div>

        {/* Layer 2: Middle Slice (Image-Mask with Grayscale Architectural Background, Clipped to 33%-66%) */}
        <div
          ref={middleSliceRef}
          className="absolute inset-0 z-20 font-black tracking-tight uppercase leading-none select-none"
          style={{
            fontSize: 'clamp(4rem, 14vw, 160px)',
            fontFamily: '"Impact", "Anton", "Arial Black", sans-serif',
            clipPath: 'inset(33.5% 0% 33.5% 0%)',
            WebkitClipPath: 'inset(33.5% 0% 33.5% 0%)',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: '160% 160%',
            backgroundPosition: '50% 50%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          {title}
        </div>

        {/* Layer 3: Bottom Slice (Solid Black #111, Clipped to bottom 34%) */}
        <div
          ref={bottomSliceRef}
          className="absolute inset-0 z-10 font-black tracking-tight uppercase leading-none select-none text-[#111]"
          style={{
            fontSize: 'clamp(4rem, 14vw, 160px)',
            fontFamily: '"Impact", "Anton", "Arial Black", sans-serif',
            clipPath: 'inset(66% 0% 0% 0%)',
            WebkitClipPath: 'inset(66% 0% 0% 0%)',
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom Subtitle / Identity Box */}
      <div className="flex items-center justify-between w-full max-w-xl mt-6 px-2">
        <span className="text-xs sm:text-sm font-mono font-semibold text-[#111]/70 tracking-wider">
          {bottomLabel}
        </span>

        {/* Enclosed Box Badge for Name */}
        <div className="border-2 border-[#111] bg-[#f4f4f4] px-4 py-1 shadow-[3px_3px_0px_#111]">
          <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#111] uppercase">
            {nameBadge}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlicedTypography;
