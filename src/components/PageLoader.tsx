import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveTypingKeyboard } from './InteractiveTypingKeyboard';
import { Lock, ShieldCheck } from 'lucide-react';

interface PageLoaderProps {
  onLoaded?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoaded }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlocked = () => {
    setIsUnlocked(true);
    onLoaded?.();
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#05070A] text-white flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden select-none p-4 sm:p-6"
        >
          {/* Ambient Cyber Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-[#38BDF8]/15 via-[#7621B0]/20 to-transparent rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#38D9FF]/10 rounded-full blur-[130px] pointer-events-none" />

          {/* Top Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono tracking-widest text-[#38BDF8] uppercase shadow-lg mb-6 sm:mb-8"
          >
            <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>PORTFOLIO TERMINAL LOCK · INTERACTIVE KEYBOARD</span>
          </motion.div>

          {/* Center Combined Interactive Typing Keyboard */}
          <div className="w-full max-w-3xl flex flex-col items-center justify-center my-auto">
            <InteractiveTypingKeyboard
              targetPhrase="KUBENDRAGURU PORTFOLIO"
              onUnlocked={handleUnlocked}
            />
          </div>

          {/* Bottom Security Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex items-center gap-2 text-xs font-mono text-white/40 text-center"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400/70 inline" />
            <span>Type on your physical keyboard or tap the keys above to unlock the experience</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
