import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Volume2, Film } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export const VideoTransitionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scrubbed camera zoom & velocity tunnel
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 1.35]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [60, 0, -60]);

  // High-velocity light tunnel canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const streakCount = 120;
    const streaks = Array.from({ length: streakCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 600 + 50,
      length: Math.random() * 80 + 30,
      speed: Math.random() * 8 + 4,
      color: Math.random() > 0.4 ? '#00F0FF' : '#818CF8',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      streaks.forEach(s => {
        s.dist += s.speed;
        if (s.dist > Math.max(width, height)) {
          s.dist = 50;
          s.angle = Math.random() * Math.PI * 2;
        }

        const x1 = cx + Math.cos(s.angle) * s.dist;
        const y1 = cy + Math.sin(s.angle) * s.dist;
        const x2 = cx + Math.cos(s.angle) * (s.dist + s.length);
        const y2 = cy + Math.sin(s.angle) * (s.dist + s.length);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = Math.min(1, s.dist / 300);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="video-transition"
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#0A0A0A] overflow-hidden"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Fullscreen Video / Kinetic Canvas Background */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Looping Fullscreen Tunnel Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.75] contrast-135 saturate-135"
          >
            <source src="/videos/tunnel-loop.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80"
              alt="Cinematic luxury artwork"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Procedural light streak tunnel */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-radial-glow from-cyan-500/25 via-transparent to-black/60 mix-blend-screen" />

          {/* Anamorphic Frame Guides */}
          <div className="absolute inset-10 md:inset-20 border border-cyan-400/20 rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
          </div>
        </motion.div>

        {/* Video Scrubber Indicator Badge */}
        <div className="absolute top-10 left-10 z-20 flex items-center space-x-3 px-4 py-2 rounded-full glass-panel border border-white/10">
          <Film className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            Chapter VIII • Cinematic Scrub Sequence
          </span>
          <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full">
            REC • 60 FPS
          </span>
        </div>

        {/* Center Animated Typography Overlays */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,240,255,0.4)] group cursor-pointer hover:scale-110 transition-transform"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400 mb-3">
            Pure Velocity
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase text-white tracking-tight leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            A Quantum Leap In Motion.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/70 font-light max-w-xl">
            Where time dilatates and engineering becomes cinematic poetry.
          </p>

          <div className="mt-8 flex items-center space-x-6 text-xs font-mono text-white/40">
            <span className="flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>SPATIAL AUDIO: IMMERSIVE</span>
            </span>
            <span>•</span>
            <span>SHUTTER ANGLE: 180°</span>
          </div>
        </motion.div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
          Scroll To Traverse Timeline
        </div>
      </div>
    </section>
  );
};
