import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long does a typical 3D/web project take?',
    answer:
      "Quick turnarounds are standard. But when a project takes longer, it’s because we aren't just building a website—we're crafting a digital masterpiece that hits right in the soul.",
  },
  {
    question: 'Will the website/project be provided at a cheap price?',
    answer:
      "We offer premium quality at fair, budget-friendly prices. It’s not 'cheap'—it’s an investment in a high-end result that will truly elevate your brand.",
  },
  {
    question: 'Do you provide support after the website goes live, or am I on my own?',
    answer:
      "We don’t just launch your project and ghost you. We offer ongoing support, updates, and maintenance to ensure your digital space stays as flawless and fast as the day it went live. Think of us as your long-term digital partners.",
  },
  {
    question: 'It’s going to look amazing, but will people actually be able to find it on Google?',
    answer:
      '100%. A gorgeous website is useless if no one sees it. We build every project with best-in-class, modern SEO practices baked right into the code. From fast load times to optimized structure, we make sure your site is designed to rank high and attract eyes.',
  },
  {
    question: 'Will all these cool 3D animations and fluid effects make my website slow?',
    answer:
      'Not a chance. We use cutting-edge optimization (like GSAP and highly optimized WebGL) to ensure that every kinetic motion and 3D element runs smoothly. You get the high-end, premium visual flex with lightning-fast load times and zero lag.',
  },
];

export const CorporateSpidermanSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq-showcase"
      className="relative w-full bg-[#080808] text-[#D7E2EA] py-20 sm:py-28 px-4 sm:px-6 md:px-10 z-20 border-t border-white/10 overflow-hidden"
    >
      {/* Rose & Crimson Ambient Glow Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4384A]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#38BDF8]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Section Top Header: Bold "FAQ" Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <FadeIn delay={0} y={30}>
            <h2
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
              className="hero-heading font-black uppercase tracking-tight text-[#D7E2EA] leading-none select-none"
            >
              FAQ
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <p className="text-[#888888] text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed">
              Everything you need to know about working together on your next high-impact project.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Grid: Left Side FAQ Accordion + Right Side Portrait Poster Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (6 Cols): Interactive FAQ Accordion */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeIn delay={0.1} y={30}>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4384A] font-bold">
                  Zero Chaos · 100% Clarity
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  Common Questions <br />
                  <span className="text-[#D4384A] drop-shadow-[0_0_30px_rgba(212,56,74,0.35)]">
                    Answered Simply.
                  </span>
                </h3>
              </div>
            </FadeIn>

            {/* Expandable Accordion List */}
            <FadeIn delay={0.2} y={20}>
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <motion.div
                      key={idx}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen
                          ? 'bg-white/[0.06] border-[#D4384A]/60 shadow-[0_0_20px_rgba(212,56,74,0.15)]'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                            isOpen
                              ? 'bg-[#D4384A] text-white border-[#D4384A]'
                              : 'bg-white/5 text-white/60 border-white/10'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-white/75 leading-relaxed font-light border-t border-white/5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Direct CTA Button */}
            <FadeIn delay={0.3} y={20}>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4384A] to-[#FF5E72] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(212,56,74,0.4)] hover:shadow-[0_0_45px_rgba(212,56,74,0.6)] transition-all cursor-pointer hover:scale-[1.03]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Have Another Question? Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (6 Cols): Exact Portrait Artwork Card */}
          <div className="lg:col-span-6 flex items-center justify-center sticky top-24">
            <FadeIn delay={0.2} y={30} className="w-full flex justify-center">
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border-2 border-white/15 bg-[#F6CCD0] shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-w-md sm:max-w-lg w-full group"
              >
                {/* Exact Portrait Ratio Artwork */}
                <div className="relative w-full aspect-[764/1024]">
                  <img
                    src="/assets/showcase/kubendra_overthinking_portrait.jpg"
                    alt="Overthinking is my full time job - Kubendraguru"
                    className="w-full h-full object-cover block"
                  />

                  {/* Subtle Glass Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSpidermanSection;
