import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  MessageCircle,
  Mail,
  Twitter,
  Linkedin,
  Send,
  ArrowUpRight,
  Check,
  Sparkles,
} from 'lucide-react';

export type SocialTab = 'github' | 'chat' | 'email' | 'twitter' | 'linkedin';

export const SocialHoverCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SocialTab | null>('github');
  const [quickMsg, setQuickMsg] = useState('');
  const [sentQuickMsg, setSentQuickMsg] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (tab: SocialTab) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveTab(tab);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 200);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('kubendraguru07@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    setSentQuickMsg(true);
    setTimeout(() => {
      setQuickMsg('');
      setSentQuickMsg(false);
    }, 2500);
  };

  // 4 rows x 18 cols contribution heatmap matrix
  const contributionGrid = [
    [0, 1, 0, 2, 3, 1, 0, 2, 4, 3, 2, 1, 3, 4, 2, 1, 3, 2],
    [1, 2, 3, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 4, 2, 1, 3],
    [0, 0, 2, 1, 3, 4, 2, 1, 0, 2, 3, 4, 1, 2, 3, 4, 2, 1],
    [1, 3, 4, 2, 1, 3, 2, 4, 3, 1, 0, 2, 4, 3, 1, 2, 4, 3],
  ];

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-900/60';
      case 2:
        return 'bg-emerald-600/80';
      case 3:
        return 'bg-emerald-500';
      case 4:
        return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]';
      default:
        return 'bg-white/10';
    }
  };

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center pt-2"
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Hover Card with Morphing Spring Transition */}
      <div className="absolute bottom-full mb-3 z-30 pointer-events-auto">
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 28,
              }}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
              className="w-[320px] sm:w-[350px] rounded-3xl bg-[#111827]/95 text-white border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 backdrop-blur-xl flex flex-col gap-3.5 text-left select-none"
            >
              {/* GitHub Card Content */}
              {activeTab === 'github' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#7621B0] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        KG
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-white">Kubendra Guru</span>
                        <span className="text-xs text-white/50 font-mono">@Kubendraguru</span>
                      </div>
                    </div>
                    <Github className="w-5 h-5 text-white/70" />
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Animated React & 3D WebGL components built for polished interfaces.
                  </p>

                  {/* Contribution Grid Heatmap */}
                  <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center justify-between text-[10px] text-white/40 font-mono pb-1">
                      <span>Recent Activity</span>
                      <span className="text-emerald-400">● 580+ Contributions</span>
                    </div>
                    <div className="grid grid-rows-4 gap-1">
                      {contributionGrid.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1 justify-between">
                          {row.map((lvl, cIdx) => (
                            <motion.div
                              key={cIdx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: (rIdx * 18 + cIdx) * 0.005 }}
                              className={`w-2.5 h-2.5 rounded-xs ${getColor(lvl)} transition-colors`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://github.com/Kubendraguru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors group mt-0.5"
                  >
                    <span>Open profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </>
              )}

              {/* Quick Message / Chat Card Content */}
              {activeTab === 'chat' && (
                <>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                      Send a quick message
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
                    </span>
                    <span className="text-xs text-white/50 font-sans">Usually replies within a day</span>
                  </div>

                  <form onSubmit={handleSendQuick} className="relative mt-1">
                    <input
                      type="text"
                      value={quickMsg}
                      onChange={(e) => setQuickMsg(e.target.value)}
                      placeholder="Write a message..."
                      className="w-full px-3.5 py-2.5 pr-11 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#38BDF8] transition-all font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!quickMsg.trim() || sentQuickMsg}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl bg-white/10 hover:bg-[#38BDF8] text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                      {sentQuickMsg ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
                    <span>{sentQuickMsg ? '✓ Sent to Kubendra' : 'Direct delivery'}</span>
                    <span className="text-[#38BDF8]">Online 🟢</span>
                  </div>
                </>
              )}

              {/* Email Card Content */}
              {activeTab === 'email' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-white">Email Kubendra</span>
                      <span className="text-xs text-white/50 font-mono">kubendraguru07@gmail.com</span>
                    </div>
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Have a project, an idea, or something you want to build together?
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleCopyEmail}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <span>Copy Email</span>
                      )}
                    </button>

                    <a
                      href="mailto:kubendraguru07@gmail.com"
                      className="py-2 px-3 rounded-xl bg-[#007AFF] hover:bg-[#0066D6] text-xs font-semibold text-white flex items-center justify-center gap-1 transition-all shadow-md"
                    >
                      <span>Mail Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

              {/* X / Twitter Card Content */}
              {activeTab === 'twitter' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        KG
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-sm text-white">Kubendra</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </span>
                        </div>
                        <span className="text-xs text-white/50 font-mono">@kubendraguru</span>
                      </div>
                    </div>

                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors"
                    >
                      Follow
                    </a>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Building thoughtful 3D interfaces and sharing the creative details behind them.
                  </p>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D9BF0] hover:text-white transition-colors group"
                  >
                    <span>View profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </>
              )}

              {/* LinkedIn Card Content */}
              {activeTab === 'linkedin' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        KG
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-white">Kubendra Guru</span>
                        <span className="text-xs text-white/50 font-mono">Creative Full-Stack Dev</span>
                      </div>
                    </div>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#084e96] transition-colors"
                    >
                      Connect
                    </a>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Open for high-impact frontend engineering, 3D WebGL designs & freelance partnerships.
                  </p>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] hover:text-white transition-colors group"
                  >
                    <span>View LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Icons Dock Row */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-all backdrop-blur-md shadow-inner">
        {[
          { id: 'github' as SocialTab, icon: Github, label: 'GitHub' },
          { id: 'chat' as SocialTab, icon: MessageCircle, label: 'Quick Message' },
          { id: 'email' as SocialTab, icon: Mail, label: 'Email' },
          { id: 'twitter' as SocialTab, icon: Twitter, label: 'Twitter / X' },
          { id: 'linkedin' as SocialTab, icon: Linkedin, label: 'LinkedIn' },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => setActiveTab(isActive ? null : item.id)}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer relative flex items-center justify-center ${
                isActive
                  ? 'bg-white/20 text-white scale-110 shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10 hover:scale-105'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 transition-transform" />
              {isActive && (
                <motion.div
                  layoutId="social-active-indicator"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialHoverCards;
