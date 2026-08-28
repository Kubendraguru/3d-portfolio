import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {children}
      </motion.span>
    </span>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  wordStartIndex: number;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({ children, progress, wordStartIndex, totalChars }) => {
  const chars = children.split('');

  return (
    <span className="inline-block whitespace-nowrap">
      {chars.map((char, index) => {
        const charIndex = wordStartIndex + index;
        const start = charIndex / totalChars;
        const end = Math.min(1, (charIndex + 1) / totalChars);

        return (
          <Char key={index} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let currentTotalChars = 0;

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, index) => {
        const wordStartIndex = currentTotalChars;
        currentTotalChars += word.length + 1; // +1 for the space

        return (
          <React.Fragment key={index}>
            <Word
              progress={scrollYProgress}
              wordStartIndex={wordStartIndex}
              totalChars={totalChars}
            >
              {word}
            </Word>
            {index < words.length - 1 && (
              <span className="inline-block whitespace-pre"> </span>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};
