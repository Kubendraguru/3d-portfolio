'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '../lib/utils'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
    id: number | string
    title: string
    subtitle?: string
    description?: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
}

export interface StaggeredGridProps {
    images?: string[]
    bentoItems?: BentoItem[]
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

const CONNECTIVE_TOOLS = [
    {
        name: 'GitHub',
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/Kubendraguru',
        hoverBorder: 'group-hover:border-white/60',
        hoverText: 'group-hover:text-white',
    },
    {
        name: 'LinkedIn',
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com',
        hoverBorder: 'group-hover:border-[#0A66C2]/80',
        hoverText: 'group-hover:text-[#38BDF8]',
    },
    {
        name: 'Email',
        icon: FaEnvelope,
        label: 'Email',
        href: 'mailto:kubendraguru07@gmail.com',
        hoverBorder: 'group-hover:border-[#38BDF8]/80',
        hoverText: 'group-hover:text-[#38BDF8]',
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://instagram.com',
        hoverBorder: 'group-hover:border-[#E1306C]/80',
        hoverText: 'group-hover:text-[#E1306C]',
    },
    {
        name: 'WhatsApp',
        icon: FaWhatsapp,
        label: 'WhatsApp',
        href: 'https://wa.me/919999999999',
        hoverBorder: 'group-hover:border-[#25D366]/80',
        hoverText: 'group-hover:text-[#25D366]',
    },
];

export function StaggeredGrid({
    images = [],
    bentoItems = [],
    centerText = "KUBENDRA",
    credits = {
        madeBy: { text: "@Kubendraguru", href: "https://github.com/Kubendraguru" },
        moreDemos: { text: "Contact Me", href: "#contact" }
    },
    className,
    showFooter = false,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block text-white font-black drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            if (typeof document !== 'undefined') {
                document.body.classList.remove('loading')
            }
            setIsLoaded(true)
        }

        const elements = document.querySelectorAll('.grid__item-img');
        if (elements.length > 0) {
            imagesLoaded(elements, { background: true }, handleLoad)
        } else {
            setIsLoaded(true)
        }

        return () => {
            // Cleanup
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const computedStyle = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns')
            const numColumns = computedStyle ? computedStyle.split(' ').length : 7
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item: any) => {
                const colAttr = item.getAttribute('data-col');
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')).filter(Boolean), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container')

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.05,
                    scale: 1.15,
                    zIndex: 1000,
                    ease: 'power2.out',
                    duration: 1,
                    force3D: true
                }, 0)
            }
        }
    }, [isLoaded, scroller])

    const fallbackImages = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    ];
    const imageList = images && images.length > 0 ? images : fallbackImages;

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => imageList[i % imageList.length]);
    mixedGridItems[16] = 'BENTO_GROUP';

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            <section className="grid place-items-center w-full relative mt-4 sm:mt-6">
                <div ref={textRef} className="text font-kanit font-black uppercase flex content-center text-[clamp(2.4rem,9vw,6rem)] leading-[0.85] text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] select-none">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="grid place-items-center w-full relative">
                <div ref={gridFullRef} className="grid--full relative w-full my-4 sm:my-6 h-auto aspect-[1.15] max-w-none p-2 sm:p-4 grid gap-2 sm:gap-3.5 grid-cols-7 grid-rows-5">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={2} className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-1.5 sm:gap-2 h-full w-full will-change-transform">
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        return (
                                            <div
                                                key={bentoItem.id}
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                    isActive
                                                        ? "bg-zinc-900/10 shadow-2xl"
                                                        : "bg-zinc-950"
                                                )}
                                                style={{ width: isActive ? "64%" : "18%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => setActiveBento(index)}
                                            >
                                                {/* Border Overlay */}
                                                <div className={cn(
                                                    "absolute inset-0 rounded-xl sm:rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                                                    isActive
                                                        ? "border-sky-500/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                                                        : "border-zinc-800/50 group-hover:border-zinc-700"
                                                )} />

                                                {/* Content Container */}
                                                <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                    {/* Active State Content */}
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                    )}>
                                                        {/* Image */}
                                                        <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0 group/img">
                                                            {bentoItem.image && (
                                                                <>
                                                                    <img
                                                                        src={bentoItem.image}
                                                                        alt={bentoItem.title}
                                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 w-full h-24 sm:h-36 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Footer Row */}
                                                        <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 flex items-center justify-between px-3 sm:px-4 z-20">
                                                            <div className="flex flex-col relative z-10 overflow-hidden">
                                                                <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-none tracking-tight truncate">{bentoItem.title}</h3>
                                                                {bentoItem.subtitle && (
                                                                    <span className="text-[9px] text-white/70 font-mono mt-0.5 truncate hidden sm:inline">{bentoItem.subtitle}</span>
                                                                )}
                                                            </div>
                                                            <div className="text-white/90 transition-colors hover:text-white drop-shadow-md relative z-10 scale-90 sm:scale-100 shrink-0">
                                                                {bentoItem.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Inactive State - Icon Only */}
                                                <div className={cn(
                                                    "absolute inset-0 flex flex-col items-center justify-center gap-1 transition-all duration-500 p-1",
                                                    isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                )}>
                                                    <div className="text-white/50 group-hover:text-white transition-colors scale-75 sm:scale-90">
                                                        {bentoItem.icon}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                        if (i === 17 || i === 18) return null;

                        if (typeof item === 'string') {
                            const toolIndex = i % CONNECTIVE_TOOLS.length;
                            const tool = CONNECTIVE_TOOLS[toolIndex];
                            const Icon = tool.icon;

                            return (
                                <a
                                    key={`tool-${i}`}
                                    href={tool.href}
                                    target={tool.name === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    data-col={i % 7}
                                    className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer block"
                                >
                                    <div className={cn(
                                        "grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl",
                                        tool.hoverBorder
                                    )}>
                                        {/* Gradient Overlay for Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        {/* Content Container */}
                                        <div className="relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2 p-1">
                                            <Icon className={cn(
                                                "w-4 h-4 sm:w-6 sm:h-6 text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover:scale-110",
                                                tool.hoverText
                                            )} />

                                            <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                <span className="block text-[7px] sm:text-[9px] font-medium text-white/90 uppercase tracking-wider mb-0.5">Connect on</span>
                                                <span className="block text-[9px] sm:text-xs font-bold text-white tracking-tight">{tool.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        }
                        return null;
                    })}
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-4 sm:p-6 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider border-t border-white/10">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    )
}

export default StaggeredGrid
