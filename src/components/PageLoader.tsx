import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IllustratedKeyboard } from './IllustratedKeyboard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PageLoaderProps {
  onLoaded?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoaded }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlocked = () => {
    setIsUnlocked(true);
    onLoaded?.();
  };

  const handleSkip = () => {
    setIsUnlocked(true);
    onLoaded?.();
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0E0F12] text-white flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden select-none p-4 sm:p-6"
        >
          {/* Ambient Comic Inked Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#FF3D00]/20 via-[#7621B0]/20 to-transparent rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Header Navbar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl flex items-center justify-between z-20 pt-2"
          >
            <div className="flex items-center gap-2 font-kanit font-black text-xl tracking-wider text-white">
              <span>CTRL SHIFT!</span>
              <span className="text-xs font-mono font-normal text-[#FF3D00] bg-[#FF3D00]/10 px-2 py-0.5 rounded-full border border-[#FF3D00]/30">
                2.5D MECHANICAL
              </span>
            </div>

            <button
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono tracking-wider text-white/70 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF3D00]" />
            </button>
          </motion.div>

          {/* Center 2.5D Illustrated Keyboard */}
          <div className="w-full max-w-5xl flex flex-col items-center justify-center my-auto z-10">
            <IllustratedKeyboard
              targetPhrase="KUBENDRAGURU PORTFOLIO"
              onUnlocked={handleUnlocked}
              enableSound={true}
            />
          </div>

          {/* Bottom Footer Minimalist Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/10 pt-4 z-20"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3D00]" />
              <span>Kubendra Guru · 3D Portfolio &amp; Full Stack Architecture</span>
            </div>
            <div>
              <span>Press physical keys to type</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
