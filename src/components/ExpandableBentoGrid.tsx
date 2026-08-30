import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { X } from 'lucide-react';

export interface BentoGridItem {
    id: string | number;
    title: string;
    subtitle?: string;
    description?: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    href?: string;
}

export interface BentoGridProps {
    items: BentoGridItem[];
    className?: string;
}

export function ExpandableBentoGrid({ items, className }: BentoGridProps) {
    const [active, setActive] = useState<BentoGridItem | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[10000]"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active ? (
                    <div className="fixed inset-0 grid place-items-center z-[10001] p-4 sm:p-6 overflow-y-auto">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="fixed top-5 right-5 md:right-10 items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-full h-9 w-9 cursor-pointer z-[10002] transition-colors flex shadow-lg backdrop-blur-md"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-4 w-4 text-white" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[540px] my-auto flex flex-col bg-[#0E1318] border border-white/15 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh]"
                        >
                            {/* Top Hero Icon Header */}
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <div className="w-full h-36 sm:h-44 bg-gradient-to-b from-[#162736] to-[#0E1318] border-b border-white/10 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,217,255,0.22),transparent_70%)]" />
                                    {active.icon ? (
                                        <div className="scale-[2.4] text-[#38D9FF] drop-shadow-[0_0_30px_rgba(56,217,255,0.6)] relative z-10">
                                            {active.icon}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-zinc-800" />
                                    )}
                                </div>
                            </motion.div>

                            {/* Card Body */}
                            <div className="flex flex-col flex-1 overflow-y-auto">
                                {/* Title, Description & Visit Button Row */}
                                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                                    <div className="flex flex-col pr-3">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-white text-lg sm:text-xl tracking-tight"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        {active.description && (
                                            <motion.p
                                                layoutId={`description-${active.title}-${id}`}
                                                className="text-[#A7B0BA] text-xs sm:text-sm mt-0.5 leading-relaxed"
                                            >
                                                {active.description}
                                            </motion.p>
                                        )}
                                    </div>

                                    {active.href && (
                                        <motion.a
                                            layoutId={`button-${active.title}-${id}`}
                                            href={active.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#38D9FF] text-[#061522] hover:bg-white hover:shadow-[0_0_25px_rgba(56,217,255,0.6)] hover:scale-[1.04] transition-all whitespace-nowrap shadow-md cursor-pointer shrink-0"
                                        >
                                            Visit
                                        </motion.a>
                                    )}
                                </div>

                                {/* Main Content / Repo Visualization */}
                                <div className="p-5 sm:p-6 flex flex-col gap-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-white/80 text-xs sm:text-sm flex flex-col gap-3 w-full"
                                    >
                                        {active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className={className || "w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 items-stretch"}>
                {items.map((item) => (
                    <motion.li
                        layoutId={`card-${item.title}-${id}`}
                        key={item.id}
                        onClick={() => setActive(item)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-3 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 rounded-xl cursor-pointer bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#38BDF8]/40 transition-all shadow-sm group select-none"
                    >
                        <motion.div layoutId={`image-${item.title}-${id}`} className="shrink-0">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] p-1.5 transition-colors">
                                {item.icon}
                            </div>
                        </motion.div>
                        <div className="flex flex-col min-w-0 text-center sm:text-left">
                            <motion.h3
                                layoutId={`title-${item.title}-${id}`}
                                className="font-semibold text-white text-xs sm:text-sm truncate group-hover:text-[#38BDF8] transition-colors"
                            >
                                {item.title}
                            </motion.h3>
                            {item.subtitle && (
                                <motion.p
                                    layoutId={`description-${item.title}-${id}`}
                                    className="text-[#888888] text-[10px] sm:text-xs truncate"
                                >
                                    {item.subtitle}
                                </motion.p>
                            )}
                        </div>
                    </motion.li>
                ))}
            </ul>
        </>
    );
}

export default ExpandableBentoGrid;
