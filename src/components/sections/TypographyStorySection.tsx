import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface StoryStatement {
  id: string;
  word: string;
  lead: string;
  subtext: string;
  accent: string;
  glow: string;
  chapter: string;
}

const statements: StoryStatement[] = [
  {
    id: 'designed',
    chapter: '01 / 03',
    word: 'Designed.',
    lead: 'Without compromise.',
    subtext: 'Every line drawn with mathematical poise. Zero extraneous surfaces. Pure intentional form.',
    accent: '#FFFFFF',
    glow: 'rgba(255, 255, 255, 0.5)',
  },
  {
    id: 'crafted',
    chapter: '02 / 03',
    word: 'Crafted.',
    lead: 'Beyond industrial tolerance.',
    subtext: 'Forged under vacuum pressure. Polished by master horologists. Built for generations beyond our time.',
    accent: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.6)',
  },
  {
    id: 'perfected',
    chapter: '03 / 03',
    word: 'Perfected.',
    lead: 'In the silence of tomorrow.',
    subtext: 'Where tactile hardware dissolves into intuitive pure sensation. The ultimate state of creation.',
    accent: '#D4AF37',
    glow: 'rgba(212, 175, 55, 0.6)',
  },
];

export const TypographyStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll position to advance between statements cleanly
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let nextIndex = 0;
    if (latest < 0.35) {
      nextIndex = 0;
    } else if (latest < 0.70) {
      nextIndex = 1;
    } else {
      nextIndex = 2;
    }

    if (nextIndex !== activeIndex) {
      sound.playHover();
      setActiveIndex(nextIndex);
    }
  });

  const activeStatement = statements[activeIndex];

  return (
    <section
      id="typography"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#0A0A0A] isolate z-20"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-between py-16 px-6 overflow-hidden bg-[#0A0A0A]/90 backdrop-blur-md">
        {/* Ambient Moving Spotlight & Architectural Texture */}
        <div className="absolute inset-0 bg-radial-glow from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

        {/* Top Header Label */}
        <div className="relative z-30 flex items-center space-x-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/20 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Chapter V • Kinetic Typography Manifest</span>
          </div>
          <span className="font-mono text-xs text-white/40 tracking-widest hidden sm:inline">
            {activeStatement.chapter}
          </span>
        </div>

        {/* Center Kinetic Word Showcase: Only ONE word renders at a time with AnimatePresence mode="wait" */}
        <div className="relative w-full max-w-5xl h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center z-20 my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStatement.word}
              initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -50, scale: 1.08, filter: 'blur(16px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center text-center px-4"
            >
              {/* Micro Subtitle */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-cyan-400 mb-4 font-semibold"
              >
                {activeStatement.lead}
              </motion.span>

              {/* Massive Kinetic Word */}
              <h2
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-display font-black uppercase tracking-tighter leading-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                style={{
                  color: activeStatement.accent,
                  textShadow: `0 0 70px ${activeStatement.glow}, 0 20px 40px rgba(0,0,0,0.9)`,
                }}
              >
                {activeStatement.word}
              </h2>

              {/* Philosophy Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-8 max-w-xl text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed font-sans"
              >
                {activeStatement.subtext}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Step Indicators */}
        <div className="relative z-30 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {statements.map((stmt, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={stmt.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 border flex items-center space-x-2 ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-105'
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isActive ? '#00F0FF' : 'rgba(255,255,255,0.2)' }} />
                  <span>{stmt.word.replace('.', '')}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-white/40 tracking-widest uppercase">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Scroll Or Click To Traverse Manifest</span>
          </div>
        </div>
      </div>
    </section>
  );
};
