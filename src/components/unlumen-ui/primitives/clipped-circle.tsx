import { motion, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ClippedCircleProps {
  className?: string;
  circleClassName?: string;
  circleSize?: number;
  mouseX?: any;
  mouseY?: any;
  isHovered?: boolean;
}

export function ClippedCircle({
  className,
  circleClassName,
  circleSize = 400,
  mouseX,
  mouseY,
  isHovered,
}: ClippedCircleProps) {
  // If mouse values passed from parent TiltCard, use them directly with spring physics
  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX ?? 200, springConfig);
  const smoothY = useSpring(mouseY ?? 100, springConfig);

  const radialBackground = useMotionTemplate`radial-gradient(${circleSize}px circle at ${smoothX}px ${smoothY}px, rgba(0, 0, 0, 0.16), transparent 75%)`;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-10",
        className,
      )}
    >
      {/* 1. Black Radial Spotlight gradient tracking cursor */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: radialBackground,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* 2. Distinct Black Floating Circle Orb */}
      <motion.div
        className={cn(
          "pointer-events-none absolute rounded-full bg-black/20 blur-2xl transition-opacity duration-300",
          circleClassName,
        )}
        style={{
          left: smoothX,
          top: smoothY,
          width: circleSize * 0.6,
          height: circleSize * 0.6,
          x: "-50%",
          y: "-50%",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}

export default ClippedCircle;
