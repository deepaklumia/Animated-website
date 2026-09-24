import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Eye, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export type BgMode = 'video' | 'nebula' | 'cyber';

interface BackgroundAtmosphereProps {
  currentMode?: BgMode;
  onModeChange?: (mode: BgMode) => void;
}

export const BackgroundAtmosphere: React.FC<BackgroundAtmosphereProps> = ({
  currentMode = 'video',
  onModeChange,
}) => {
  const [mode, setMode] = useState<BgMode>(currentMode);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll();

  // Gentle parallax shifts
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const switchMode = (newMode: BgMode) => {
    sound.playClick();
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <>
      {/* Fixed Ambient Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0A]">
        {/* Mode 1: Cinematic Looping Background Video */}
        {mode === 'video' && (
          <motion.div
            style={{ scale: bgScale, y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover filter brightness-[0.72] contrast-125 saturate-125"
            >
              <source src="/videos/ambient-loop.mp4" type="video/mp4" />
            </video>
            {/* Luminous color wash over video */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]/70" />
            <div className="absolute inset-0 bg-radial-glow from-cyan-500/20 via-indigo-900/15 to-transparent mix-blend-screen" />
          </motion.div>
        )}

        {/* Mode 2: Deep Luminous Nebula & Cosmos Imagery */}
        {mode === 'nebula' && (
          <motion.div
            style={{ scale: bgScale, y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=85"
              alt="Luminous space nebula"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-130 saturate-140"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/80" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-purple-600/20 to-transparent mix-blend-screen" />
          </motion.div>
        )}

        {/* Mode 3: Cyber Architecture & High-Tech Blueprint City */}
        {mode === 'cyber' && (
          <motion.div
            style={{ scale: bgScale, y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85"
              alt="Cyber architecture lights"
              className="w-full h-full object-cover filter brightness-[0.68] contrast-140 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/80" />
            <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color-dodge" />
          </motion.div>
        )}

        {/* Cybernetic Geometric Grid Frame Lines */}
        <div className="absolute inset-0 bg-cyber-grid opacity-35" />

        {/* Hardware-accelerated ambient glow gradients (No expensive 150px CSS blurs) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,240,255,0.18)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.18)_0%,_transparent_60%)]" />

        {/* High-Tech Framing Borders (Left & Right HUD Lines) */}
        <div className="absolute top-0 left-6 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent hidden xl:block" />
        <div className="absolute top-0 right-6 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent hidden xl:block" />
      </div>

      {/* Floating HUD Pill: Live Background Atmosphere Mode Selector */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center space-x-1 p-1.5 rounded-full glass-panel-glow border border-white/15 shadow-2xl backdrop-blur-2xl">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 px-2.5 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Atmosphere</span>
        </span>

        <button
          onClick={() => switchMode('video')}
          onMouseEnter={() => sound.playHover()}
          className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
            mode === 'video'
              ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Film className="w-3 h-3" />
          <span>Cinematic Video</span>
        </button>

        <button
          onClick={() => switchMode('nebula')}
          onMouseEnter={() => sound.playHover()}
          className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
            mode === 'nebula'
              ? 'bg-indigo-400 text-black font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Cosmic Nebula</span>
        </button>

        <button
          onClick={() => switchMode('cyber')}
          onMouseEnter={() => sound.playHover()}
          className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
            mode === 'cyber'
              ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Cyber City</span>
        </button>
      </div>
    </>
  );
};
