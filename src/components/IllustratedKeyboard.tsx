"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, Volume2, VolumeX, CornerDownLeft } from "lucide-react";

// ─── Types & Interfaces ───────────────────────────────────────────────────────

export interface IllustratedKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  targetPhrase?: string;
  onUnlocked?: () => void;
  accentColor?: string;
  keycapColor?: string;
  enableSound?: boolean;
}

interface KeyDefinition {
  id: string;
  label: string;
  subLabel?: string;
  width?: number; // Relative width multiplier (1 = standard 1u, 1.5, 2, 6.25)
  isHero?: boolean; // Highlighted hero letter (K, U, B, E, N, D, R, A, etc.)
  heroLetter?: string;
  code?: string;
  type?: "standard" | "mod" | "enter" | "space" | "accent";
}

// ─── Key Layout Definition (Inspired by CTRL SHIFT!) ──────────────────────────

const KEYBOARD_ROWS: KeyDefinition[][] = [
  // Row 1: Number Row
  [
    { id: "esc", label: "ESC", code: "Escape", width: 1, type: "mod" },
    { id: "1", label: "!", subLabel: "1", code: "Digit1" },
    { id: "2", label: "@", subLabel: "2", code: "Digit2" },
    { id: "3", label: "#", subLabel: "3", code: "Digit3" },
    { id: "4", label: "$", subLabel: "4", code: "Digit4" },
    { id: "5", label: "%", subLabel: "5", code: "Digit5" },
    { id: "6", label: "^", subLabel: "6", code: "Digit6" },
    { id: "7", label: "&", subLabel: "7", code: "Digit7" },
    { id: "8", label: "*", subLabel: "8", code: "Digit8" },
    { id: "9", label: "(", subLabel: "9", code: "Digit9" },
    { id: "0", label: ")", subLabel: "0", code: "Digit0" },
    { id: "minus", label: "_", subLabel: "-", code: "Minus" },
    { id: "equal", label: "+", subLabel: "=", code: "Equal" },
    { id: "backspace", label: "⌫", code: "Backspace", width: 1.6, type: "mod" },
  ],
  // Row 2: Top Alpha Row (Featuring K U B E N D R A)
  [
    { id: "tab", label: "TAB", code: "Tab", width: 1.4, type: "mod" },
    { id: "q", label: "Q", code: "KeyQ" },
    { id: "w", label: "W", code: "KeyW" },
    { id: "k_hero", label: "K", code: "KeyE", isHero: true, heroLetter: "K" },
    { id: "u_hero", label: "U", code: "KeyR", isHero: true, heroLetter: "U" },
    { id: "b_hero", label: "B", code: "KeyT", isHero: true, heroLetter: "B" },
    { id: "e_hero", label: "E", code: "KeyY", isHero: true, heroLetter: "E" },
    { id: "n_hero", label: "N", code: "KeyU", isHero: true, heroLetter: "N" },
    { id: "d_hero", label: "D", code: "KeyI", isHero: true, heroLetter: "D" },
    { id: "r_hero", label: "R", code: "KeyO", isHero: true, heroLetter: "R" },
    { id: "a_hero", label: "A", code: "KeyP", isHero: true, heroLetter: "A" },
    { id: "bracket_l", label: "[", code: "BracketLeft" },
    { id: "bracket_r", label: "]", code: "BracketRight" },
    { id: "backslash", label: "\\", code: "Backslash", width: 1.2 },
  ],
  // Row 3: Home Row (Featuring G U R U)
  [
    { id: "caps", label: "CAPS", code: "CapsLock", width: 1.7, type: "mod" },
    { id: "a", label: "A", code: "KeyA" },
    { id: "s", label: "S", code: "KeyS" },
    { id: "d", label: "D", code: "KeyD" },
    { id: "f", label: "F", code: "KeyF" },
    { id: "g_hero", label: "G", code: "KeyG", isHero: true, heroLetter: "G" },
    { id: "u2_hero", label: "U", code: "KeyH", isHero: true, heroLetter: "U" },
    { id: "r2_hero", label: "R", code: "KeyJ", isHero: true, heroLetter: "R" },
    { id: "u3_hero", label: "U", code: "KeyK", isHero: true, heroLetter: "U" },
    { id: "l", label: "L", code: "KeyL" },
    { id: "semicolon", label: ";", code: "Semicolon" },
    { id: "quote", label: "'", code: "Quote" },
    { id: "enter", label: "ENTER ↵", code: "Enter", width: 2.1, type: "enter" },
  ],
  // Row 4: Bottom Alpha Row
  [
    { id: "shift_l", label: "SHIFT", code: "ShiftLeft", width: 2.1, type: "mod" },
    { id: "z", label: "Z", code: "KeyZ" },
    { id: "x", label: "X", code: "KeyX" },
    { id: "c", label: "C", code: "KeyC" },
    { id: "v", label: "V", code: "KeyV" },
    { id: "b", label: "B", code: "KeyB" },
    { id: "n", label: "N", code: "KeyN" },
    { id: "m", label: "M", code: "KeyM" },
    { id: "comma", label: ",", code: "Comma" },
    { id: "period", label: ".", code: "Period" },
    { id: "slash", label: "/", code: "Slash" },
    { id: "shift_r", label: "SHIFT", code: "ShiftRight", width: 2.7, type: "mod" },
  ],
  // Row 5: Modifiers & Spacebar
  [
    { id: "ctrl_l", label: "ctrl", code: "ControlLeft", width: 1.2, type: "mod" },
    { id: "alt_l", label: "alt", code: "AltLeft", width: 1.2, type: "mod" },
    { id: "cmd_l", label: "⌘", code: "MetaLeft", width: 1.3, type: "accent" },
    { id: "space", label: "SPACE", code: "Space", width: 6.2, type: "space" },
    { id: "cmd_r", label: "⌘", code: "MetaRight", width: 1.3, type: "accent" },
    { id: "alt_r", label: "alt", code: "AltRight", width: 1.2, type: "mod" },
    { id: "left", label: "◀", code: "ArrowLeft", width: 1 },
    { id: "up_down", label: "▲", code: "ArrowUp", width: 1 },
    { id: "right", label: "▶", code: "ArrowRight", width: 1 },
  ],
];

// ─── Web Audio Synthesizer for Realistic Mechanical Switch Clack & Thock ───────

class MechanicalSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playKeySound(keyId = "key") {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const isSpace = keyId === "space";
      const isEnter = keyId === "enter";
      const isMod = keyId.includes("shift") || keyId.includes("ctrl") || keyId.includes("alt") || keyId.includes("backspace") || keyId.includes("tab");

      // Natural human acoustic pitch variance (±7%)
      const pitchVar = 0.94 + Math.random() * 0.12;

      // ─── 1. CRISP TACTILE STEM SNAP (High-frequency transient) ───
      const snapLen = Math.floor(this.ctx.sampleRate * 0.015);
      const snapBuf = this.ctx.createBuffer(1, snapLen, this.ctx.sampleRate);
      const snapData = snapBuf.getChannelData(0);
      for (let i = 0; i < snapLen; i++) {
        const decay = Math.exp(-i / (snapLen * 0.25));
        snapData[i] = (Math.random() * 2 - 1) * decay;
      }
      const snapSource = this.ctx.createBufferSource();
      snapSource.buffer = snapBuf;

      const snapFilter = this.ctx.createBiquadFilter();
      snapFilter.type = "bandpass";
      snapFilter.frequency.setValueAtTime(isSpace ? 2200 : isEnter ? 2900 : 3900 * pitchVar, now);
      snapFilter.Q.setValueAtTime(isSpace ? 2.5 : 4.2, now);

      const snapGain = this.ctx.createGain();
      snapGain.gain.setValueAtTime(isSpace ? 0.35 : 0.65, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      snapSource.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(this.masterGain);
      snapSource.start(now);

      // ─── 2. SOLID PBT KEYCAP BOTTOM-OUT ("THE THOCK") ───
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      const baseFreq = isSpace ? 105 : isEnter ? 145 : isMod ? 165 : 225;

      bodyOsc.type = "triangle";
      bodyOsc.frequency.setValueAtTime(baseFreq * pitchVar * 1.6, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(baseFreq * pitchVar * 0.4, now + 0.05);

      bodyGain.gain.setValueAtTime(isSpace ? 0.85 : 0.6, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      const bodyFilter = this.ctx.createBiquadFilter();
      bodyFilter.type = "lowpass";
      bodyFilter.frequency.setValueAtTime(isSpace ? 420 : 750, now);
      bodyFilter.Q.setValueAtTime(2.4, now);

      bodyOsc.connect(bodyFilter);
      bodyFilter.connect(bodyGain);
      bodyGain.connect(this.masterGain);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.065);

      // ─── 3. ALUMINUM PLATE HOUSING RESONANCE ───
      const plateOsc = this.ctx.createOscillator();
      const plateGain = this.ctx.createGain();
      plateOsc.type = "sine";
      plateOsc.frequency.setValueAtTime((isSpace ? 320 : 580) * pitchVar, now);
      plateOsc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      plateGain.gain.setValueAtTime(isSpace ? 0.4 : 0.28, now);
      plateGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      plateOsc.connect(plateGain);
      plateGain.connect(this.masterGain);
      plateOsc.start(now);
      plateOsc.stop(now + 0.05);

      // ─── 4. METALLIC SPRING TEXTURE ───
      const springOsc = this.ctx.createOscillator();
      const springGain = this.ctx.createGain();
      springOsc.type = "sine";
      springOsc.frequency.setValueAtTime(5400 * pitchVar, now);

      springGain.gain.setValueAtTime(0.08, now);
      springGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      springOsc.connect(springGain);
      springGain.connect(this.masterGain);
      springOsc.start(now);
      springOsc.stop(now + 0.03);

      // ─── 5. SECONDARY KEYCAP RETURN CLACK (Micro-reset tap) ───
      const returnTime = now + (isSpace ? 0.045 : 0.038);
      const returnLen = Math.floor(this.ctx.sampleRate * 0.01);
      const returnBuf = this.ctx.createBuffer(1, returnLen, this.ctx.sampleRate);
      const returnData = returnBuf.getChannelData(0);
      for (let i = 0; i < returnLen; i++) {
        returnData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (returnLen * 0.3));
      }
      const returnSource = this.ctx.createBufferSource();
      returnSource.buffer = returnBuf;

      const returnFilter = this.ctx.createBiquadFilter();
      returnFilter.type = "highpass";
      returnFilter.frequency.setValueAtTime(2400, returnTime);

      const returnGain = this.ctx.createGain();
      returnGain.gain.setValueAtTime(0.22, returnTime);
      returnGain.gain.exponentialRampToValueAtTime(0.001, returnTime + 0.015);

      returnSource.connect(returnFilter);
      returnFilter.connect(returnGain);
      returnGain.connect(this.masterGain);
      returnSource.start(returnTime);
    } catch {
      // Ignore
    }
  }
}

const soundEngine = new MechanicalSoundEngine();

// ─── Main Component ───────────────────────────────────────────────────────────

export const IllustratedKeyboard: React.FC<IllustratedKeyboardProps> = ({
  targetPhrase = "KUBENDRAGURU PORTFOLIO",
  onUnlocked,
  className,
  accentColor = "#FF3D00",
  keycapColor = "#FF4500",
  enableSound = true,
  ...props
}) => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [pressedKeyIds, setPressedKeyIds] = useState<Set<string>>(new Set());
  const [soundMuted, setSoundMuted] = useState(!enableSound);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const totalLength = targetPhrase.length;
  const currentText = targetPhrase.slice(0, typedIndex);
  const progressPercent = Math.min(Math.round((typedIndex / totalLength) * 100), 100);

  // Map keyboard codes to key IDs
  const codeToIdMap = useMemo(() => {
    const map: Record<string, string> = {};
    KEYBOARD_ROWS.forEach((row) => {
      row.forEach((key) => {
        if (key.code) {
          map[key.code] = key.id;
          map[key.code.toLowerCase()] = key.id;
        }
      });
    });
    return map;
  }, []);

  // Handle keystroke progression
  const triggerKeystroke = useCallback(
    (keyId: string) => {
      // Realistic mechanical switch sound feedback
      if (!soundMuted) {
        soundEngine.playKeySound(keyId);
      }

      // Visual press state
      setPressedKeyIds((prev) => new Set(prev).add(keyId));
      setTimeout(() => {
        setPressedKeyIds((prev) => {
          const next = new Set(prev);
          next.delete(keyId);
          return next;
        });
      }, 120);

      // Advance typewriter target phrase
      setTypedIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= totalLength) {
          setIsUnlocked(true);
          setTimeout(() => {
            onUnlocked?.();
          }, 2500);
          return totalLength;
        }
        return nextIndex;
      });
    },
    [soundMuted, targetPhrase, totalLength, onUnlocked]
  );

  // Global Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (["Space", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }

      const keyId = codeToIdMap[e.code] || "space";
      triggerKeystroke(keyId);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [codeToIdMap, triggerKeystroke]);

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center select-none overflow-hidden py-4 sm:py-8",
        className
      )}
      {...props}
    >
      <style>{`
        /* ─── 2.5D Comic Illustrated Chassis & Keycaps ─── */
        .ikb-canvas-wrap {
          perspective: 1400px;
          perspective-origin: 50% 15%;
          transform-style: preserve-3d;
        }

        .ikb-board-body {
          transform: rotateX(24deg) rotateZ(-3.5deg) rotateY(1deg);
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Comic Inked Keycap Button */
        .ikb-cap {
          position: relative;
          cursor: pointer;
          user-select: none;
          transition: transform 0.07s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.07s ease;
          transform-style: preserve-3d;
        }

        .ikb-cap:active,
        .ikb-cap[data-pressed="true"] {
          transform: translateY(5px) scale(0.97) !important;
        }

        /* 3D Beveled Keycap Layers */
        .ikb-cap-top {
          position: relative;
          background: linear-gradient(180deg, #FF5722 0%, #E64A19 100%);
          border: 2.5px solid #111111;
          border-radius: 8px;
          box-shadow: 
            inset 0 2px 0 rgba(255, 255, 255, 0.35),
            inset 0 -2px 0 rgba(0, 0, 0, 0.35),
            0 5px 0 #111111,
            0 8px 12px rgba(0, 0, 0, 0.4);
          z-index: 2;
        }

        .ikb-cap:active .ikb-cap-top,
        .ikb-cap[data-pressed="true"] .ikb-cap-top {
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 1px 0 #111111,
            0 2px 4px rgba(0, 0, 0, 0.6);
          background: linear-gradient(180deg, #D84315 0%, #BF360C 100%);
        }

        /* Hero letters (KUBENDRA GURU) special bright styling */
        .ikb-cap-hero .ikb-cap-top {
          background: linear-gradient(180deg, #FF6E40 0%, #FF3D00 100%);
          border-color: #000000;
        }

        /* Enter & Accent Keycaps */
        .ikb-cap-enter .ikb-cap-top {
          background: linear-gradient(180deg, #FF3D00 0%, #DD2C00 100%);
        }

        .ikb-cap-mod .ikb-cap-top {
          background: linear-gradient(180deg, #2A2E35 0%, #1A1D22 100%);
          color: #E2E8F0;
        }

        .ikb-cap-space .ikb-cap-top {
          background: linear-gradient(180deg, #FF5722 0%, #D84315 100%);
        }

        /* White Inked Chassis */
        .ikb-chassis-shell {
          background: #FAFAFA;
          border: 4px solid #111111;
          border-radius: 24px;
          box-shadow: 
            0 16px 0 #111111,
            0 28px 45px rgba(0, 0, 0, 0.65),
            inset 0 3px 0 rgba(255, 255, 255, 0.8),
            inset 0 -4px 0 rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* ─── 1. TOP STATUS & TERMINAL PROMPT (CTRL SHIFT AESTHETIC) ──────────── */}
      <div className="w-full max-w-4xl px-4 flex flex-col items-center gap-2.5 z-20 mb-12 sm:mb-20">
        {/* Episode / Portfolio Meta Bar */}
        <div className="flex items-center justify-between w-full text-xs font-mono tracking-widest text-[#A7B0BA] uppercase border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3D00] font-black text-sm">CTRL SHIFT!</span>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold">PORTFOLIO EDITION</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Switch Toggle */}
            <button
              onClick={() => setSoundMuted(!soundMuted)}
              title={soundMuted ? "Unmute Switch Sound" : "Mute Switch Sound"}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-colors text-[11px]"
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-white/50" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF3D00]" />}
              <span>{soundMuted ? "MUTED" : "CLACK ON"}</span>
            </button>

            <span className="text-[#FF3D00] font-bold bg-[#FF3D00]/10 px-2.5 py-0.5 rounded-full border border-[#FF3D00]/30">
              {progressPercent}% UNLOCKED
            </span>
          </div>
        </div>

        {/* Headline Output - Scaled cleanly to avoid overlap */}
        <div className="w-full text-center py-1 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-kanit tracking-tight text-white flex items-center justify-center flex-wrap gap-2 drop-shadow-[0_4px_25px_rgba(255,61,0,0.3)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8A65] to-[#FF3D00]">
              {currentText || "TYPE TO UNLOCK"}
            </span>
            <span className="animate-pulse text-[#FF3D00]">_</span>
          </h2>

          <p className="text-[11px] sm:text-xs font-mono text-[#94A3B8] mt-1 flex items-center gap-2">
            {!isUnlocked ? (
              <span className="flex items-center gap-1.5 text-white/70 animate-pulse">
                <Sparkles className="w-3 h-3 text-[#FF3D00]" />
                Press ANY key on your physical keyboard or tap below ({typedIndex}/{totalLength})
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ✓ ACCESS GRANTED — LAUNCHING 3D PORTFOLIO...
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ─── 2. 2.5D ILLUSTRATED MECHANICAL KEYBOARD (CTRL SHIFT STYLE) ───────── */}
      <div className="ikb-canvas-wrap w-full max-w-5xl flex justify-center items-center px-2 sm:px-6 relative">
        <div className="ikb-board-body w-full max-w-[1020px] relative">
          
          {/* CENTERPIECE: Illustrated Steaming Coffee Cup Studio breaking the plane */}
          <div className="absolute left-[50%] -top-16 sm:-top-24 -translate-x-1/2 z-20 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]">
            <div className="relative w-32 h-40 sm:w-44 sm:h-52 flex flex-col items-center justify-end">
              
              {/* Steaming Vapor Rings */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-85">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/80 animate-ping" style={{ animationDuration: "2.4s" }} />
                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              </div>

              {/* Coffee Cup Studio Building SVG */}
              <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-2xl overflow-visible">
                {/* Chimney / Straw */}
                <rect x="72" y="10" width="16" height="30" rx="3" fill="#222" stroke="#111" strokeWidth="3" />
                <rect x="70" y="24" width="20" height="6" rx="2" fill="#FAFAFA" stroke="#111" strokeWidth="2.5" />

                {/* Cup Lid */}
                <ellipse cx="80" cy="48" rx="52" ry="14" fill="#1E2228" stroke="#111" strokeWidth="4" />
                <ellipse cx="80" cy="45" rx="44" ry="10" fill="#2D323B" stroke="#111" strokeWidth="3" />
                
                {/* Cup Body */}
                <path d="M 32,50 L 44,175 Q 80,185 116,175 L 128,50 Z" fill="#FFFFFF" stroke="#111" strokeWidth="4.5" />
                
                {/* Windows on Cup */}
                <rect x="48" y="70" width="18" height="22" rx="3" fill="#111" stroke="#111" strokeWidth="2" />
                <line x1="57" y1="70" x2="57" y2="92" stroke="#FFF" strokeWidth="2" />
                <line x1="48" y1="81" x2="66" y2="81" stroke="#FFF" strokeWidth="2" />

                <rect x="48" y="102" width="18" height="22" rx="3" fill="#111" stroke="#111" strokeWidth="2" />
                <line x1="57" y1="102" x2="57" y2="124" stroke="#FFF" strokeWidth="2" />

                {/* Door Frame & Warm Interior Glow */}
                <rect x="74" y="80" width="34" height="75" rx="5" fill="#111111" stroke="#111" strokeWidth="3.5" />
                
                {/* Warm Golden Light Inside Doorway */}
                <rect
                  x="76"
                  y="82"
                  width="30"
                  height="71"
                  rx="4"
                  fill={isUnlocked ? "url(#door-interior-glow)" : "#181A20"}
                  className="transition-all duration-500"
                />

                <defs>
                  <radialGradient id="door-interior-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD54F" stopOpacity="1" />
                    <stop offset="60%" stopColor="#FF8F00" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#E65100" stopOpacity="0.4" />
                  </radialGradient>
                </defs>

                {/* Animated Door Leaf (Swings open on left hinge) */}
                <g
                  style={{
                    transformOrigin: "74px 117px",
                    transform: isUnlocked ? "rotateY(-110deg) skewY(-8deg)" : "rotateY(0deg)",
                    transition: "transform 0.8s cubic-bezier(0.34, 1.4, 0.64, 1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <rect x="74" y="80" width="34" height="75" rx="5" fill="#FAFAFA" stroke="#111" strokeWidth="3.5" />
                  <rect x="80" y="90" width="22" height="20" rx="3" fill="#111" stroke="#111" strokeWidth="2" />
                  <circle cx="101" cy="122" r="2.5" fill="#111" />
                </g>

                {/* Shadow Base */}
                <ellipse cx="80" cy="182" rx="46" ry="7" fill="#111111" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* White Inked Keyboard Base Shell */}
          <div className="ikb-chassis-shell p-3 sm:p-5 md:p-6 w-full flex flex-col gap-2 sm:gap-2.5 relative z-10">
            {KEYBOARD_ROWS.map((row, rowIdx) => (
              <div key={`row-${rowIdx}`} className="flex items-center justify-between gap-1 sm:gap-2 w-full">
                {row.map((key) => {
                  const isPressed = pressedKeyIds.has(key.id);
                  const isHero = !!key.isHero;
                  const isEnter = key.type === "enter";
                  const isMod = key.type === "mod";
                  const isSpace = key.type === "space";

                  // Calculate flex width based on key width units
                  const flexGrow = key.width || 1;

                  return (
                    <button
                      key={key.id}
                      type="button"
                      onClick={() => triggerKeystroke(key.id)}
                      data-pressed={isPressed}
                      style={{ flex: `${flexGrow} ${flexGrow} 0px` }}
                      className={cn(
                        "ikb-cap h-10 sm:h-12 md:h-14 flex flex-col items-center justify-center p-0 outline-none",
                        isHero && "ikb-cap-hero",
                        isEnter && "ikb-cap-enter",
                        isMod && "ikb-cap-mod",
                        isSpace && "ikb-cap-space"
                      )}
                    >
                      <div className="ikb-cap-top w-full h-full flex flex-col items-center justify-center px-1">
                        {/* Keycap Content */}
                        {isHero ? (
                          <span className="text-white font-black text-sm sm:text-lg md:text-xl font-kanit drop-shadow-md tracking-wider">
                            {key.heroLetter}
                          </span>
                        ) : isEnter ? (
                          <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm font-mono tracking-tight flex items-center gap-1">
                            ENTER <CornerDownLeft className="w-3 h-3 hidden sm:inline" />
                          </span>
                        ) : isSpace ? (
                          <span className="text-white/80 font-bold text-[10px] sm:text-xs font-mono tracking-widest">
                            SPACEBAR
                          </span>
                        ) : (
                          <div className="flex flex-col items-center justify-center leading-none">
                            {key.subLabel && (
                              <span className="text-white/60 text-[8px] sm:text-[9px] font-mono mb-0.5">
                                {key.label}
                              </span>
                            )}
                            <span className="text-white font-extrabold text-[10px] sm:text-xs md:text-sm font-mono">
                              {key.subLabel || key.label}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ─── THE BOY CHARACTER WALKS OUT ONTO THE FOREGROUND (PLACED ABOVE ALL KEYCAPS) ─── */}
          {isUnlocked && (
            <div
              className="absolute z-[999] pointer-events-auto"
              style={{
                left: "52%",
                top: "-15px",
                transform: "translate(-50%, 0)",
                animation: "boy-walk-forward 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              }}
            >
              <style>{`
                /* Forward walking stride from the doorway threshold into the foreground */
                @keyframes boy-walk-forward {
                  0% {
                    opacity: 0;
                    transform: translate(-30px, 10px) scale(0.35) rotate(0deg);
                  }
                  15% {
                    opacity: 1;
                    /* Step 1: Left leg stride */
                    transform: translate(-15px, 20px) scale(0.65) rotate(-6deg) translateY(-8px);
                  }
                  30% {
                    /* Step 1 Landing */
                    transform: translate(0px, 35px) scale(0.9) rotate(1deg) translateY(3px);
                  }
                  48% {
                    /* Step 2: Right leg stride */
                    transform: translate(20px, 50px) scale(1.15) rotate(6deg) translateY(-10px);
                  }
                  64% {
                    /* Step 2 Landing */
                    transform: translate(40px, 68px) scale(1.35) rotate(-1deg) translateY(3px);
                  }
                  80% {
                    /* Step 3: Landing firmly on the keyboard in clear view */
                    transform: translate(55px, 78px) scale(1.5) rotate(2deg) translateY(-4px);
                  }
                  92% {
                    transform: translate(62px, 85px) scale(1.55) rotate(-1deg);
                  }
                  100% {
                    opacity: 1;
                    transform: translate(65px, 82px) scale(1.55) rotate(0deg);
                  }
                }

                /* Walking shadow */
                @keyframes shadow-walk-forward {
                  0% { transform: scale(0.35); opacity: 0; }
                  15% { transform: scale(0.6); opacity: 0.35; }
                  30% { transform: scale(0.85, 0.45); opacity: 0.65; }
                  48% { transform: scale(1.1); opacity: 0.4; }
                  64% { transform: scale(1.3, 0.55); opacity: 0.75; }
                  80%, 100% { transform: scale(1.5, 0.65); opacity: 0.9; }
                }

                /* Speech bubble pop-in */
                @keyframes bubble-pop-clear {
                  0%, 65% {
                    opacity: 0;
                    transform: scale(0.3) translateY(10px);
                  }
                  80% {
                    opacity: 1;
                    transform: scale(1.15) translateY(-3px);
                  }
                  90% {
                    transform: scale(0.95) translateY(1px);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1) translateY(0px);
                  }
                }

                @keyframes float-speech {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-4px); }
                }
              `}</style>

              <div className="relative flex flex-col items-center">
                {/* Comic Speech Bubble */}
                <div
                  className="absolute -top-12 sm:-top-14 -right-4 sm:-right-6 px-3.5 py-1.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-black font-kanit font-black text-[11px] sm:text-xs uppercase tracking-tight whitespace-nowrap z-[1000] flex items-center gap-1.5 pointer-events-none"
                  style={{ animation: "bubble-pop-clear 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, float-speech 2.2s ease-in-out 1.8s infinite" }}
                >
                  <span>WELCOME! LET&apos;S BUILD 🚀</span>
                  <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-black rotate-45" />
                </div>

                {/* Boy Avatar Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] filter hover:scale-105 transition-transform">
                  <img
                    src="/boy_avatar_cutout.png"
                    alt="Kubendra Walking Avatar"
                    className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                  />
                </div>

                {/* Dynamic Ground Shadow */}
                <div
                  className="w-24 h-4 bg-black/80 rounded-full blur-[2px] mt-[-6px] pointer-events-none"
                  style={{ animation: "shadow-walk-forward 1.8s ease-in-out forwards" }}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ─── 3. BOTTOM AUDIO & ACTION PROMPT ─────────────────────────────────── */}
      <div className="mt-8 flex flex-col items-center gap-3 z-20">
        <button
          onClick={() => triggerKeystroke("space")}
          className="px-6 py-2.5 rounded-full bg-[#FF3D00] hover:bg-[#FF5722] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(255,61,0,0.4)] hover:shadow-[0_6px_25px_rgba(255,61,0,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Tap To Type Next Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono text-white/40">
          Crafted with 2.5D Illustrated Inks &amp; Mechanical Sound Engine
        </span>
      </div>
    </div>
  );
};

export default IllustratedKeyboard;
