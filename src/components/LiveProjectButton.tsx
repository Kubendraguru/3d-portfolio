import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href = '#', onClick, className = '' }) => {
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
      Live Project
    </motion.a>
  );
};
