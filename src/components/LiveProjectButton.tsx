import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  label = 'Live Project',
  onClick,
  className = '',
}) => {
  if (!href || href === '#') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/80 font-mono tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm select-none whitespace-nowrap bg-white/5 uppercase backdrop-blur-md ${className}`}
      >
        {label === 'Live Project' ? 'Mobile & Web App' : label}
      </div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 cursor-pointer select-none whitespace-nowrap ${className}`}
    >
      {label}
    </motion.a>
  );
};
