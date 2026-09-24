import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Diamond, Compass, Disc } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export const DepthExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layer speeds along Y
  const bgLayerY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const midLayerY = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const fgLayerY = useTransform(scrollYProgress, [0, 1], [320, -320]);
  const floatingObjectsY = useTransform(scrollYProgress, [0, 1], [400, -400]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="depth"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[160vh] w-full bg-[#0A0A0A] py-32 px-6 overflow-hidden flex flex-col items-center justify-center perspective-2000"
    >
      {/* Section Introduction */}
      <div className="text-center max-w-4xl mx-auto mb-20 relative z-30">
        <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
          <Box className="w-4 h-4" />
          <span>Chapter VII • Spatial Immersion & 3D Depth</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-white tracking-tight">
          Enter The Hyper-Space.
        </h2>
        <p className="mt-4 text-white/60 font-sans text-sm md:text-base max-w-xl mx-auto font-light">
          Objects do not merely sit on screen—they occupy infinite depth coordinates. Move your
          cursor to tilt the gravitational field.
        </p>
      </div>

      {/* 3D Depth Stacking Stage */}
      <div className="relative w-full max-w-6xl h-[650px] md:h-[800px] flex items-center justify-center transform-style-3d">
        {/* Layer 1: Background Atmospheric Layer */}
        <motion.div
          style={{
            y: bgLayerY,
            x: mouseOffset.x * 20,
            rotateX: -mouseOffset.y * 10,
            rotateY: mouseOffset.x * 10,
          }}
          className="absolute w-[90%] md:w-[75%] h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/5 z-10 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
            alt="Space nebula abstract"
            className="w-full h-full object-cover filter brightness-40 contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-radial-glow from-transparent to-black/90" />
          <div className="absolute top-8 left-8 flex items-center space-x-2 font-mono text-xs text-white/40">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>DEPTH PLANE: -600Z</span>
          </div>
        </motion.div>

        {/* Floating Geometric Artifacts 1 */}
        <motion.div
          style={{
            y: floatingObjectsY,
            x: -mouseOffset.x * 40,
            rotateZ: 25,
          }}
          className="absolute left-8 md:left-24 top-20 z-20 p-5 rounded-2xl glass-panel-glow border-cyan-400/30 flex items-center space-x-3 shadow-[0_20px_40px_rgba(0,240,255,0.2)]"
        >
          <Diamond className="w-7 h-7 text-cyan-400 animate-pulse" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-300">
              Prism Refraction
            </div>
            <div className="text-[11px] text-white/50 font-mono">Index: 2.417 (Diamond)</div>
          </div>
        </motion.div>

        {/* Layer 2: Midground Hero Monolith */}
        <motion.div
          style={{
            y: midLayerY,
            x: mouseOffset.x * 50,
            rotateX: -mouseOffset.y * 15,
            rotateY: mouseOffset.x * 15,
          }}
          onMouseEnter={() => sound.playHover()}
          className="absolute w-[70%] md:w-[50%] h-[340px] md:h-[420px] rounded-3xl overflow-hidden glass-panel-glow border border-white/20 z-30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between p-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20">
              MIDGROUND • 0Z
            </span>
            <Disc className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              Kinetic Singularity
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mt-1">
              Zero Inertia Matrix
            </h3>
            <p className="text-xs md:text-sm text-white/70 mt-2 font-light leading-relaxed">
              Dynamically suspending internal payloads against external g-forces through active
              gravitational damping.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
            <span>AXIS: CALIBRATED</span>
            <span className="text-cyan-400 font-semibold">TILT ACTIVE</span>
          </div>
        </motion.div>

        {/* Floating Geometric Artifacts 2 (Right) */}
        <motion.div
          style={{
            y: floatingObjectsY,
            x: mouseOffset.x * 60,
            rotateZ: -15,
          }}
          className="absolute right-6 md:right-20 bottom-24 z-40 p-5 rounded-2xl glass-panel-glow border-amber-400/30 flex items-center space-x-3 shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
        >
          <Compass className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300">
              Gyro Telemetry
            </div>
            <div className="text-[11px] text-white/50 font-mono">Quaternion: [0.0, 1.0, 0.0]</div>
          </div>
        </motion.div>

        {/* Layer 3: Foreground High-Speed Float */}
        <motion.div
          style={{
            y: fgLayerY,
            x: mouseOffset.x * 80,
            rotateX: -mouseOffset.y * 25,
            rotateY: mouseOffset.x * 25,
          }}
          className="absolute left-6 md:left-14 bottom-10 w-[50%] md:w-[35%] p-6 rounded-2xl glass-panel-glow border border-cyan-400/40 z-50 shadow-[0_35px_80px_rgba(0,240,255,0.25)]"
        >
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
            FOREGROUND • +450Z
          </span>
          <div className="text-lg md:text-xl font-display font-bold text-white mt-1">
            Ultra-Near Sensor Shield
          </div>
          <p className="text-xs text-white/60 mt-1">
            Reaches outward toward the viewer, breaking the boundary of conventional displays.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
