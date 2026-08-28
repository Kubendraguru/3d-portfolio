import React, { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

interface HeroPinCanvasProps {
  progress: MotionValue<number>;
  totalFrames?: number;
}

export const HeroPinCanvas: React.FC<HeroPinCanvasProps> = ({
  progress,
  totalFrames = 247,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);

  // 1. Preload frame sequence
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/hero-frames/frame_${frameNum}.webp`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        // Draw initial frame as soon as frame 1 is ready
        if (i === 1 && canvasRef.current) {
          drawFrame(img);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.length = 0;
    };
  }, [totalFrames]);

  // 2. Helper to draw frame with proper 'cover' aspect ratio
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const ox = (cw - nw) / 2;
    const oy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, nw, nh);
  };

  // 3. Handle window resizing & canvas buffer resolution
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;

      // Re-draw current frame after resize
      const currentImg = imagesRef.current[currentFrameRef.current - 1];
      if (currentImg && currentImg.complete) {
        drawFrame(currentImg);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 4. Smooth RAF animation loop for buttery 60fps frame scrubbing
  useEffect(() => {
    let animationId: number;

    const renderLoop = () => {
      // Lerp currentFrame towards targetFrame for velvety smooth scrubbing
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.25;
        const frameIndex = Math.min(
          Math.max(Math.round(currentFrameRef.current), 1),
          totalFrames
        );

        const img = imagesRef.current[frameIndex - 1];
        if (img && img.complete) {
          drawFrame(img);
        }
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationId);
  }, [totalFrames]);

  // 5. Subscribe to scroll progress
  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      const clamped = Math.min(Math.max(latest, 0), 1);
      targetFrameRef.current = 1 + clamped * (totalFrames - 1);
    });

    return () => unsubscribe();
  }, [progress, totalFrames]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0C0C0C]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Subtle loading indicator while initial frames buffer */}
      {loadedCount < 10 && (
        <div className="absolute bottom-6 right-6 text-[10px] uppercase font-mono tracking-widest text-muted-foreground/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          Buffering 3D frames...
        </div>
      )}
    </div>
  );
};
