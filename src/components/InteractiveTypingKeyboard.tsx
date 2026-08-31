"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, CornerDownLeft } from "lucide-react";

// ─── Key Code Map ─────────────────────────────────────────────────────────────

const KEY_CODE_MAP: Record<string, string> = {
  Escape: "esc",
  F1: "f1", F2: "f2", F3: "f3", F4: "f4", F5: "f5", F6: "f6",
  F7: "f7", F8: "f8", F9: "f9", F10: "f10", F11: "f11", F12: "f12",
  Backquote: "`", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4", Digit5: "5",
  Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9", Digit0: "0",
  Minus: "-", Equal: "=", Backspace: "delete",
  Tab: "tab", KeyQ: "q", KeyW: "w", KeyE: "e", KeyR: "r", KeyT: "t", KeyY: "y",
  KeyU: "u", KeyI: "i", KeyO: "o", KeyP: "p",
  BracketLeft: "[", BracketRight: "]", Backslash: "\\",
  CapsLock: "caps lock", KeyA: "a", KeyS: "s", KeyD: "d", KeyF: "f", KeyG: "g",
  KeyH: "h", KeyJ: "j", KeyK: "k", KeyL: "l", Semicolon: ";", Quote: "'", Enter: "return",
  ShiftLeft: "shift", ShiftRight: "shift", KeyZ: "z", KeyX: "x", KeyC: "c", KeyV: "v",
  KeyB: "b", KeyN: "n", KeyM: "m", Comma: ",", Period: ".", Slash: "/",
  ControlLeft: "control", ControlRight: "control",
  AltLeft: "option", AltRight: "option",
  MetaLeft: "command", MetaRight: "command",
  Space: "space",
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
};

const PREVENT_DEFAULT_KEYS = new Set([
  "space", "tab", "up", "down", "left", "right", "delete",
]);

export interface InteractiveTypingKeyboardProps {
  targetPhrase?: string;
  onUnlocked?: () => void;
  className?: string;
}

export function InteractiveTypingKeyboard({
  targetPhrase = "KUBENDRAGURU PORTFOLIO",
  onUnlocked,
  className,
}: InteractiveTypingKeyboardProps) {
  const [typedCount, setTypedCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");

  const totalLength = targetPhrase.length;
  const currentText = targetPhrase.slice(0, typedCount);
  const progressPercent = Math.min(Math.round((typedCount / totalLength) * 100), 100);

  // Trigger one character typing step
  const handleKeystroke = (keyLabel: string) => {
    setLastKeyPressed(keyLabel);
    
    // Add key to pressed set for visual animation
    setPressedKeys((prev) => new Set(prev).add(keyLabel));
    setTimeout(() => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(keyLabel);
        return next;
      });
    }, 120);

    setTypedCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= totalLength) {
        setIsCompleted(true);
        setTimeout(() => {
          onUnlocked?.();
        }, 800);
        return totalLength;
      }
      return nextCount;
    });
  };

  // Listen to physical keyboard events globally
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const mappedKey = KEY_CODE_MAP[event.code] || event.key.toLowerCase();
      if (PREVENT_DEFAULT_KEYS.has(mappedKey)) {
        event.preventDefault();
      }

      handleKeystroke(mappedKey);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const mappedKey = KEY_CODE_MAP[event.code] || event.key.toLowerCase();
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(mappedKey);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [totalLength]);

  const keyProps = (keyName: string) => ({
    onClick: () => handleKeystroke(keyName),
    "data-pressed": pressedKeys.has(keyName) || undefined,
  });

  return (
    <div className={cn("w-full flex flex-col items-center justify-center select-none px-4", className)}>
      <style>{`
        .ikb-wrapper {
          --kb-key-top: #1e2229;
          --kb-key-bottom: #0d1117;
          --kb-text: #94a3b8;
          --kb-key-shadow:
            0 0 0.02em 0.01em rgba(0,0,0,0.9),
            0 0.06em 0.08em rgba(0,0,0,0.6),
            0 0.03em 0.02em rgba(255,255,255,0.09) inset,
            0 -0.04em 0.06em rgba(0,0,0,0.6) inset;
          --kb-key-shadow-pressed:
            0 0 0.02em 0.01em rgba(56,189,248,0.6),
            0 0.01em 0.02em rgba(56,189,248,0.4),
            0 0.03em 0.05em rgba(56,189,248,0.8) inset,
            0 -0.02em 0.02em rgba(255,255,255,0.1) inset;
          --kb-press-brightness: 1.4;
          --kb-focus-bg: #222224;
          --kb-focus-text: #38bdf8;

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .ikb-wrapper button {
          background-image: linear-gradient(180deg, var(--kb-key-top), var(--kb-key-bottom));
          border-radius: 0.22em;
          box-shadow: var(--kb-key-shadow);
          color: var(--kb-text);
          display: block;
          font-size: 1em;
          outline: transparent;
          position: relative;
          transition: transform 50ms ease, box-shadow 50ms ease, filter 50ms ease, background-color 50ms ease;
          -webkit-appearance: none;
          appearance: none;
          user-select: none;
          border: 1px solid rgba(255, 255, 255, 0.07);
          margin: 0;
          padding: 0;
          cursor: pointer;
        }

        .ikb-wrapper button:active,
        .ikb-wrapper button[data-pressed] {
          box-shadow: var(--kb-key-shadow-pressed) !important;
          transform: translateY(0.06em) scale(0.97);
          filter: brightness(var(--kb-press-brightness));
          border-color: rgba(56, 189, 248, 0.6);
          color: #38bdf8;
          background-image: linear-gradient(180deg, #1e3a5f, #0f2744) !important;
        }

        .ikb-wrapper button > span {
          margin: auto;
          padding: 0.2em 0.35em;
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 0.5em;
          line-height: 1.8;
          transform: translateY(-50%) scaleX(0.875);
          width: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }

        /* Keyboard Chassis */
        .ikb-chassis {
          background-image: linear-gradient(135deg, #161b22, #080a0d);
          border-radius: 0.75em;
          box-shadow:
            0 2.5em 5em -1em rgba(0,0,0,0.8),
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 1px 2px rgba(255,255,255,0.15) inset,
            0 0 35px rgba(56,189,248,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.35em;
          font-size: clamp(9px, 1.85vw, 19px);
          padding: 0.6em;
          width: fit-content;
          max-width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ikb-row {
          display: flex;
          gap: 0.35em;
          justify-content: center;
        }

        /* Button size standards */
        .ikb-btn-0 { width: 1.15em; height: 0.85em; }
        .ikb-btn-2 { width: 1.15em; height: 1.15em; }
        .ikb-btn-3 { width: 1.8em; height: 1.15em; }
        .ikb-btn-4 { width: 2.1em; height: 1.15em; }
        .ikb-btn-5 { width: 2.7em; height: 1.15em; }
        .ikb-btn-6 { width: 1.5em; height: 1.3em; }
        .ikb-btn-7 { width: 1.7em; height: 1.3em; }
        .ikb-btn-space { width: 7.2em; height: 1.3em; }
        .ikb-btn-enter { width: 2.2em; height: 1.15em; background-image: linear-gradient(180deg, #312e81, #1e1b4b) !important; color: #a5b4fc !important; border-color: rgba(129, 140, 248, 0.3) !important; }
        .ikb-btn-accent { background-image: linear-gradient(180deg, #0c4a6e, #082f49) !important; color: #7dd3fc !important; border-color: rgba(56, 189, 248, 0.3) !important; }

        /* Key label alignment */
        .ikb-wrapper button > span.ikb-ul { top: 0; justify-content: flex-start; transform-origin: 0 50%; }
        .ikb-wrapper button > span.ikb-ll { top: auto; bottom: 0; justify-content: flex-start; transform-origin: 0 50%; }
        .ikb-wrapper button > span.ikb-lr { top: auto; bottom: 0; justify-content: flex-end; transform-origin: 100% 50%; }
        .ikb-wrapper button > span.ikb-bump {
          border-radius: 0.1em;
          box-shadow: 0 1px 0 rgba(255,255,255,0.3);
          background-color: rgba(255,255,255,0.4);
          padding: 0;
          top: 78%;
          left: calc(50% - 0.25em);
          width: 0.5em;
          height: 0.1em;
          transform: none;
        }

        .ikb-wrapper button > span.ikb-xs { font-size: 0.36em; }
        .ikb-wrapper button > span.ikb-sm { font-size: 0.42em; }
      `}</style>

      {/* ─── 1. CYBER TERMINAL DISPLAY SCREEN ─────────────────────────────────── */}
      <div className="w-full max-w-2xl bg-[#070B10] rounded-2xl border-2 border-[#38BDF8]/30 p-5 sm:p-7 shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden mb-6 flex flex-col gap-3">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-[#A7B0BA]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-white/60 ml-2 font-medium">~/portfolio/terminal</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] text-[11px] font-bold">
              {progressPercent}% TYPED
            </span>
            <span className="text-[11px] text-white/40 hidden sm:inline">
              ({typedCount}/{totalLength} KEYS)
            </span>
          </div>
        </div>

        {/* Live Output Screen */}
        <div className="py-4 min-h-[90px] sm:min-h-[110px] flex flex-col justify-center">
          <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-[#79CFFF] to-[#38BDF8] drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center flex-wrap">
            <span>&gt;&nbsp;</span>
            <span className="text-white drop-shadow-[0_0_15px_#38BDF8]">{currentText}</span>
            <span className="animate-pulse text-[#38BDF8] ml-1">_</span>
          </div>

          {/* Prompt instruction subtitle */}
          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm font-mono text-[#94A3B8]">
            {!isCompleted ? (
              <span className="flex items-center gap-1.5 text-amber-300/90 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Press ANY key on your keyboard to type and unlock...
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ✓ ACCESS GRANTED — INITIALIZING PORTFOLIO...
              </span>
            )}

            {lastKeyPressed && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px]">
                KEY: {lastKeyPressed.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Glowing Progress Indicator Track */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 mt-1">
          <div
            className="h-full bg-gradient-to-r from-[#38BDF8] via-[#79CFFF] to-emerald-400 rounded-full shadow-[0_0_12px_rgba(56,217,255,0.8)] transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ─── 2. INTERACTIVE MECHANICAL KEYBOARD CHASSIS ──────────────────────── */}
      <div className="ikb-wrapper">
        <div className="ikb-chassis">
          {/* Row 1: Function Keys */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-0 ikb-btn-accent" {...keyProps("esc")}><span className="ikb-xs">esc</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f1")}><span className="ikb-xs">F1</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f2")}><span className="ikb-xs">F2</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f3")}><span className="ikb-xs">F3</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f4")}><span className="ikb-xs">F4</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f5")}><span className="ikb-xs">F5</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f6")}><span className="ikb-xs">F6</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f7")}><span className="ikb-xs">F7</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f8")}><span className="ikb-xs">F8</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f9")}><span className="ikb-xs">F9</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f10")}><span className="ikb-xs">F10</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f11")}><span className="ikb-xs">F11</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("f12")}><span className="ikb-xs">F12</span></button>
            <button type="button" className="ikb-btn-0" {...keyProps("eject")}><span className="ikb-xs">⏏</span></button>
          </div>

          {/* Row 2: Numbers */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-2" {...keyProps("`")}><span className="ikb-sm">~</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("1")}><span className="ikb-sm">1</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("2")}><span className="ikb-sm">2</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("3")}><span className="ikb-sm">3</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("4")}><span className="ikb-sm">4</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("5")}><span className="ikb-sm">5</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("6")}><span className="ikb-sm">6</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("7")}><span className="ikb-sm">7</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("8")}><span className="ikb-sm">8</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("9")}><span className="ikb-sm">9</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("0")}><span className="ikb-sm">0</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("-")}><span className="ikb-sm">-</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("=")}><span className="ikb-sm">=</span></button>
            <button type="button" className="ikb-btn-3" {...keyProps("delete")}><span className="ikb-xs">delete</span></button>
          </div>

          {/* Row 3: QWERTY */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-3" {...keyProps("tab")}><span className="ikb-xs">tab</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("q")}><span>Q</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("w")}><span>W</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("e")}><span>E</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("r")}><span>R</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("t")}><span>T</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("y")}><span>Y</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("u")}><span>U</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("i")}><span>I</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("o")}><span>O</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("p")}><span>P</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("[")}><span className="ikb-sm">[</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("]")}><span className="ikb-sm">]</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("\\")}><span className="ikb-sm">\</span></button>
          </div>

          {/* Row 4: ASDF */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-4" {...keyProps("caps lock")}><span className="ikb-xs">caps</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("a")}><span>A</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("s")}><span>S</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("d")}><span>D</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("f")}><span>F</span><span className="ikb-bump"></span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("g")}><span>G</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("h")}><span>H</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("j")}><span>J</span><span className="ikb-bump"></span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("k")}><span>K</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("l")}><span>L</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps(";")}><span className="ikb-sm">;</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("'")}><span className="ikb-sm">'</span></button>
            <button type="button" className="ikb-btn-enter" {...keyProps("return")}><span className="ikb-xs font-bold flex items-center justify-center gap-0.5">return <CornerDownLeft className="w-2.5 h-2.5 inline" /></span></button>
          </div>

          {/* Row 5: ZXCV */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-5" {...keyProps("shift")}><span className="ikb-xs">shift</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("z")}><span>Z</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("x")}><span>X</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("c")}><span>C</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("v")}><span>V</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("b")}><span>B</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("n")}><span>N</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("m")}><span>M</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps(",")}><span className="ikb-sm">,</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps(".")}><span className="ikb-sm">.</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("/")}><span className="ikb-sm">/</span></button>
            <button type="button" className="ikb-btn-5" {...keyProps("shift")}><span className="ikb-xs">shift</span></button>
          </div>

          {/* Row 6: Modifier & Space */}
          <div className="ikb-row">
            <button type="button" className="ikb-btn-7" {...keyProps("control")}><span className="ikb-xs">control</span></button>
            <button type="button" className="ikb-btn-6" {...keyProps("option")}><span className="ikb-xs">option</span></button>
            <button type="button" className="ikb-btn-7 ikb-btn-accent" {...keyProps("command")}><span className="ikb-xs">⌘ cmd</span></button>
            <button type="button" className="ikb-btn-space" {...keyProps("space")}><span></span></button>
            <button type="button" className="ikb-btn-7 ikb-btn-accent" {...keyProps("command")}><span className="ikb-xs">⌘ cmd</span></button>
            <button type="button" className="ikb-btn-6" {...keyProps("option")}><span className="ikb-xs">option</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("left")}><span className="ikb-sm">◀</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("up")}><span className="ikb-sm">▲</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("down")}><span className="ikb-sm">▼</span></button>
            <button type="button" className="ikb-btn-2" {...keyProps("right")}><span className="ikb-sm">▶</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveTypingKeyboard;
