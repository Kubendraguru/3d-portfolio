import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Clock,
  MapPin,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { Lanyard } from '../components/Lanyard';

const PROJECT_TYPES = [
  '3D Web Experience',
  'Full Stack Platform',
  'Mobile Application',
  'Creative WebGL / UI',
  'Full-Time Role',
  'Other Inquiry',
];

const BUDGET_RANGES = ['< $1,000', '$1k – $3k', '$3k – $5k', '$5k+', 'Full-Time Hire'];

export const ContactSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('3D Web Experience');
  const [selectedBudget, setSelectedBudget] = useState<string>('$1k – $3k');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lanyardResetKey, setLanyardResetKey] = useState(0);

  const emailAddress = 'kubendraguru07@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResetPhysics = () => {
    setLanyardResetKey((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#000000] text-[#D7E2EA] pt-20 sm:pt-28 pb-16 px-4 sm:px-6 md:px-10 z-20 border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#7621B0]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Section Heading: "Contact Me" */}
        <div className="flex flex-col items-center text-center gap-4">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for New Opportunities & Freelance Projects
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
              className="hero-heading font-black uppercase tracking-tight text-[#D7E2EA] leading-none select-none"
            >
              Contact Me
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="text-[#888888] text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
              Interact with the 3D physics ID card on the left (drag & toss!), or drop a direct message below to bring your next vision to life.
            </p>
          </FadeIn>
        </div>

        {/* Main Grid: Left 3D Lanyard ID Card (6 Cols) + Right Interactive Console (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive 3D Lanyard Physics ID Card */}
          <div className="lg:col-span-6 flex flex-col rounded-[28px] sm:rounded-[36px] bg-[#0A0A0A] border-2 border-white/10 overflow-hidden shadow-2xl relative min-h-[580px] sm:min-h-[640px]">
            {/* Background Watermark Typography (Behind Lanyard 3D Canvas) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <span
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontFamily: "'Kanit', sans-serif" }}
                className="font-black uppercase tracking-tighter text-white/[0.04] whitespace-nowrap"
              >
                KUBENDRA GURU
              </span>
            </div>

            {/* Top Toolbar: Status Tag & Physics Reset Button */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                ⚡ 3D Physics Pass
              </span>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] animate-pulse mr-1">
                  Drag & Toss
                </span>
                <button
                  onClick={handleResetPhysics}
                  title="Reset Physics"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#38BDF8]/20 border border-white/15 hover:border-[#38BDF8]/50 text-white hover:text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3D Lanyard Physics Canvas */}
            <div className="w-full h-full flex-1 relative z-10 min-h-[520px]">
              <Lanyard
                resetKey={lanyardResetKey}
                position={[0, 0.4, 13.8]}
                gravity={[0, -40, 0]}
                fov={20}
                frontImage="/assets/lanyard/card_front.png"
                backImage="/assets/lanyard/card_back.png"
                imageFit="cover"
                lanyardWidth={1}
              />
            </div>

            {/* Card Bottom Meta Bar */}
            <div className="p-3.5 sm:p-4 bg-[#121212]/90 border-t border-white/10 backdrop-blur-md flex items-center justify-between font-mono text-xs text-[#888888] relative z-20">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-white">India · Global Remote</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Console */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 rounded-[32px] sm:rounded-[40px] bg-[#0E0E0E] border-2 border-white/10 shadow-2xl flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              {/* Direct Email Copy Ribbon */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#38BDF8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#777777]">
                      Direct Email
                    </span>
                    <span className="text-sm font-medium text-white truncate font-mono">
                      {emailAddress}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#38BDF8]/20 border border-white/15 hover:border-[#38BDF8]/50 text-white hover:text-[#38BDF8] text-xs font-mono flex items-center gap-1.5 transition-all select-none whitespace-nowrap"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* 1. Project Type Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                    1. What are you looking to build?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          selectedType === type
                            ? 'bg-[#38BDF8] text-black font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                            : 'bg-white/5 text-[#A0AEC0] border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Budget Scope Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                    2. Approximate Budget / Engagement
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_RANGES.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setSelectedBudget(budget)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          selectedBudget === budget
                            ? 'bg-[#7621B0] text-white font-semibold shadow-[0_0_15px_rgba(118,33,176,0.4)] border border-[#7621B0]'
                            : 'bg-white/5 text-[#A0AEC0] border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Inputs: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm font-sans transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                {/* 4. Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                    Project Details / Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share a brief overview of your timeline, objectives, or questions..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm font-sans transition-all resize-none"
                  />
                </div>

                {/* Submit & Status Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <AnimatePresence>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-400 text-xs font-mono"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Inquiry received! I'll reply within 24 hours.</span>
                      </motion.div>
                    ) : (
                      <div className="text-[11px] font-mono text-[#777777]">
                        🔒 Direct delivery · Fast response guaranteed
                      </div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#D7E2EA] to-white text-black font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(215,226,234,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Social Channels Dock */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {[
                { name: 'GitHub', href: 'https://github.com/Kubendraguru', icon: Github },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
                { name: 'X / Twitter', href: 'https://twitter.com', icon: Twitter },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 flex items-center justify-center gap-2 text-xs font-medium text-[#D7E2EA] hover:text-white transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-[#38BDF8]" />
                    <span>{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Ribbon */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-medium">Kubendraguru</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Engineered with Next.js, WebGL & Three.js</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D7E2EA] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
