"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tilt, type TiltProps } from "@/components/unlumen-ui/primitives/tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** left half of the split badge pill; shown as a simple pill if `badgeLabel` is omitted */
  price?: string;
  /** right half of the split pill, coloured by `badgeVariant` */
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
  imageSrc?: string;
  imageAlt?: string;
  /** wraps the card in a plain `<a>` tag */
  href?: string;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

const BADGE_LABEL_CLASSES_LIGHT: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/15 text-emerald-700",
  warning: "bg-amber-500/20 text-amber-700",
};

const BADGE_LABEL_CLASSES_DARK: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/25 text-emerald-300",
  warning: "bg-amber-500/30 text-amber-300",
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  // Motion values for smooth cursor-following circle mask
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(100);
  const radius = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRadius = useSpring(radius, springConfig);

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
    radius.set(280); // Expands the black circle on hover
  };

  const handleMouseLeave = () => {
    radius.set(0); // Contracts circle on leave
  };

  const inner = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
    >
      <Tilt
        rotationFactor={11}
        {...tiltProps}
        className={cn(
          "relative group overflow-hidden select-none",
          "bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-sm",
          "flex flex-col gap-4",
          "h-48 sm:h-52 md:h-56 w-full",
          "hover:shadow-2xl hover:scale-[1.02] transition-all duration-400 ease-out",
          className,
        )}
      >
        {/* ========================================================= */}
        {/* LAYER 1: BASE WHITE CARD (Dark text on White Background) */}
        {/* ========================================================= */}
        <div className="flex flex-row justify-between px-5 sm:px-7 py-5 sm:py-6 relative z-10 w-full h-full pointer-events-none">
          <div className="flex flex-col gap-1 flex-1 max-w-[60%] sm:max-w-[65%] mr-2">
            <h2 className="text-lg sm:text-xl tracking-tight leading-tight font-bold text-neutral-950 font-sans">
              {title}
            </h2>
            {description && (
              <p className="text-neutral-500 text-xs sm:text-sm font-normal leading-relaxed">
                {description}
              </p>
            )}
            {children && <div className="mt-2">{children}</div>}
          </div>

          {/* Light Split Badge Pill */}
          {price && badgeLabel ? (
            <div className="inline-flex h-fit items-center text-xs sm:text-sm whitespace-nowrap shrink-0 border border-neutral-200/80 rounded-full overflow-hidden shadow-2xs bg-neutral-50">
              <span className="bg-neutral-100 text-neutral-900 h-fit py-1 px-2.5 font-medium">
                {price}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm h-fit py-1 px-2.5 font-medium",
                  BADGE_LABEL_CLASSES_LIGHT[badgeVariant],
                )}
              >
                {badgeLabel}
              </span>
            </div>
          ) : price ? (
            <span className="h-fit rounded-full bg-neutral-100 text-neutral-900 px-3 py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border border-neutral-200/80">
              {price}
            </span>
          ) : null}
        </div>

        {/* Base Floating Image */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            width={288}
            height={224}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute z-10 top-20 sm:top-24 w-64 sm:w-72 -right-8 sm:-right-10 pointer-events-none object-cover",
              "rotate-[-5deg] border border-neutral-200 rounded-xl shadow-md",
              "transition-transform duration-300 ease-out",
              "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5",
            )}
          />
        )}

        {/* ========================================================= */}
        {/* LAYER 2: OVERLAY BLACK CARD (Clipped to mouse circle radius) */}
        {/* Inside the black circle, text turns pure WHITE!          */}
        {/* ========================================================= */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-30 bg-black text-white border border-black rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none select-none flex flex-col justify-between"
        >
          <div className="flex flex-row justify-between px-5 sm:px-7 py-5 sm:py-6 relative z-10 w-full h-full">
            <div className="flex flex-col gap-1 flex-1 max-w-[60%] sm:max-w-[65%] mr-2">
              <h2 className="text-lg sm:text-xl tracking-tight leading-tight font-bold text-white font-sans drop-shadow-sm">
                {title}
              </h2>
              {description && (
                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed drop-shadow-sm">
                  {description}
                </p>
              )}
              {children && <div className="mt-2 text-neutral-300">{children}</div>}
            </div>

            {/* Dark Split Badge Pill */}
            {price && badgeLabel ? (
              <div className="inline-flex h-fit items-center text-xs sm:text-sm whitespace-nowrap shrink-0 border border-neutral-800 rounded-full overflow-hidden shadow-md bg-neutral-900">
                <span className="bg-neutral-800 text-white h-fit py-1 px-2.5 font-medium">
                  {price}
                </span>
                <span
                  className={cn(
                    "text-xs sm:text-sm h-fit py-1 px-2.5 font-medium",
                    BADGE_LABEL_CLASSES_DARK[badgeVariant],
                  )}
                >
                  {badgeLabel}
                </span>
              </div>
            ) : price ? (
              <span className="h-fit rounded-full bg-neutral-800 text-white px-3 py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border border-neutral-700">
                {price}
              </span>
            ) : null}
          </div>

          {/* Overlay Floating Image with Dark Accent */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              width={288}
              height={224}
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute z-10 top-20 sm:top-24 w-64 sm:w-72 -right-8 sm:-right-10 pointer-events-none object-cover",
                "rotate-[-5deg] border border-neutral-700 rounded-xl shadow-2xl",
                "transition-transform duration-300 ease-out",
                "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5",
              )}
            />
          )}
        </motion.div>
      </Tilt>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}

export default TiltCard;
