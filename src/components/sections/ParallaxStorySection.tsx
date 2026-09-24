import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Compass, Cpu, Layers } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export const ParallaxStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layer parallax speeds
  const bgY = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  const midY = useTransform(scrollYProgress, [0, 1], [150, -180]);
  const fgY = useTransform(scrollYProgress, [0, 1], [300, -320]);

  // Subtle rotations
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [8, -8]);

  // Opposing text slide
  const textLeftX = useTransform(scrollYProgress, [0, 0.5, 1], [-150, 0, 100]);
  const textRightX = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -100]);

  return (
    <section
      id="parallax"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#0A0A0A] py-28 px-6 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Cinematic Texture & Blueprint Imagery */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80"
          alt="Architectural space background"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-150 saturate-100 opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] ambient-glow-cyan pointer-events-none opacity-50 blur-[130px]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] ambient-glow-purple pointer-events-none opacity-40 blur-[130px]" />
      </div>

      {/* Opposing Direction Header Text */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center mb-16 relative z-20">
        <motion.div
          style={{ x: textLeftX }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400 mb-2 flex items-center space-x-2"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Chapter II • Multi-Layer Spatial Parallax</span>
        </motion.div>

        <motion.h2
          style={{ x: textRightX }}
          className="text-3xl sm:text-5xl md:text-7xl font-display font-extrabold uppercase text-center text-metallic max-w-4xl tracking-tight leading-tight"
        >
          Born From Chaos. Sculpted In Silence.
        </motion.h2>

        <p className="mt-4 text-center text-sm md:text-base text-white/50 max-w-xl font-light">
          Observe the layered anatomy of pure precision. Three structural planes shift independently
          to craft an unmatched cinematic continuum.
        </p>
      </div>

      {/* Parallax Depth Composition Area */}
      <div className="relative w-full max-w-6xl h-[650px] md:h-[750px] flex items-center justify-center">
        {/* Layer 1: Background (Slow Movement) */}
        <motion.div
          style={{ y: bgY, rotate: rotateLeft }}
          className="absolute w-[80%] md:w-[65%] h-[380px] md:h-[460px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1600&q=80"
            alt="Futuristic architectural space"
            className="w-full h-full object-cover filter brightness-50 contrast-125 saturate-50 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
              Layer 01 • Atmospheric Foundation
            </span>
            <h4 className="font-display text-lg text-white font-semibold">Tectonic Carbon Sub-Chassis</h4>
          </div>
        </motion.div>

        {/* Layer 2: Middle (Medium Movement) */}
        <motion.div
          style={{ y: midY, rotate: rotateRight }}
          className="absolute right-4 md:right-16 top-16 w-[60%] md:w-[45%] h-[320px] md:h-[400px] rounded-2xl overflow-hidden glass-panel-glow z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          onMouseEnter={() => sound.playHover()}
        >
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            alt="Abstract liquid chrome waves"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-cyan-500/10" />
          <div className="absolute top-6 right-6 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400">
              Layer 02 • Computational Core
            </span>
            <h4 className="font-display text-base text-white font-semibold">
              Neural Processing Architecture
            </h4>
            <p className="text-xs text-white/60 mt-1 line-clamp-2">
              Adaptive feedback loop operating at sub-millisecond response intervals.
            </p>
          </div>
        </motion.div>

        {/* Layer 3: Foreground (Fast Movement) */}
        <motion.div
          style={{ y: fgY }}
          className="absolute left-4 md:left-12 bottom-8 w-[55%] md:w-[38%] h-[260px] md:h-[320px] rounded-2xl glass-panel-glow z-30 p-6 flex flex-col justify-between border-cyan-400/30 shadow-[0_25px_60px_rgba(0,240,255,0.15)]"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20">
              Layer 03 • Foreground
            </span>
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <span className="font-mono text-xs text-white/50 uppercase">Kinetic Response</span>
            <div className="text-2xl md:text-3xl font-display font-bold text-white mt-1">
              99.98% Purity
            </div>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              Aerospace-grade titanium alloy sintered under cold plasma atmospheric containment.
            </p>
          </div>

          <div className="flex items-center space-x-2 pt-2 border-t border-white/10 text-[11px] font-mono text-cyan-300">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Harmonic Alignment: Calibrated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
