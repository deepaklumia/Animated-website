import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface HeroSectionProps {
  onExploreClick: () => void;
  onLearnMoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onLearnMoreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll scrubbed values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const zoomScale = useTransform(scrollYProgress, [0, 1], [1, 1.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Canvas particle & cybernetic vortex animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 200;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
    }> = [];

    const colors = ['#00F0FF', '#818CF8', '#C084FC', '#FFFFFF', '#D4AF37'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1.5 + 0.5,
      });
    }

    let angle = 0;

    const render = () => {
      // Semi-transparent clear for subtle motion trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      angle += 0.003;

      // Draw cybernetic horizon glow
      const horizonGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.6);
      horizonGlow.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      horizonGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      horizonGlow.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      // Render 3D starfield particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.z -= p.speed * 2.2;
        if (p.z <= 1) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 400 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1000 - p.z) / 600);
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, p.size * k), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 10 * k;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Concentric orbital grid rings (Tesla / Apple Keynote aesthetic)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.4); // perspective tilt
      for (let r = 140; r < width * 0.9; r += 160) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 16]);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headlineWords = ['Experience', 'The', 'Future'];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Scroll-Scrubbed Cinematic Video & Frame Backdrop */}
      <motion.div
        style={{ scale: zoomScale, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none w-full h-full origin-center overflow-hidden"
      >
        {/* Looping Cinematic Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-130 saturate-130 scale-105"
        >
          <source src="/videos/ambient-loop.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2200&q=85"
            alt="Cinematic futuristic landscape"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Ambient Gradient Horizon Glow & Color Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-cyan-950/25 to-[#0A0A0A]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-glow from-cyan-500/35 via-indigo-600/20 to-transparent pointer-events-none mix-blend-screen" />

        {/* Interactive 3D Canvas Starfield & Particle Horizon on Top */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-90" />

        {/* Cinematic Camera Viewfinder Frame Brackets ("Image Frame") */}
        <div className="absolute inset-8 md:inset-16 pointer-events-none border border-white/10 rounded-3xl">
          {/* Top-Left Corner Bracket */}
          <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
          {/* Top-Right Corner Bracket */}
          <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
          {/* Bottom-Left Corner Bracket */}
          <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
          {/* Bottom-Right Corner Bracket */}
          <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-cyan-400" />

          {/* Viewfinder Telemetry Overlay */}
          <div className="absolute top-4 left-6 flex items-center space-x-3 text-[10px] font-mono text-cyan-300/80">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>OPTICAL STABILIZATION • ACTIVE</span>
            <span>|</span>
            <span>FOV: 84°</span>
          </div>

          <div className="absolute top-4 right-6 text-[10px] font-mono text-white/50 hidden md:block">
            <span>ISO 400 • F/1.4 • 1/250s</span>
          </div>

          <div className="absolute bottom-4 left-6 text-[10px] font-mono text-white/40 hidden md:block">
            <span>COORD: [37.7749° N, 122.4194° W]</span>
          </div>

          <div className="absolute bottom-4 right-6 text-[10px] font-mono text-cyan-400/70">
            <span>FRAME: 2.39:1 ANAMORPHIC</span>
          </div>
        </div>
        
        {/* Soft bottom edge feathering */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/20 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
            AETHERION KINETIC SERIES • MK-VIII
          </span>
        </motion.div>

        {/* Letter-by-letter Staggered Large Headline */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-7 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase"
        >
          {headlineWords.map((word, wordIndex) => (
            <div key={wordIndex} className="inline-flex overflow-hidden py-1">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial={{ y: '120%', opacity: 0, rotateX: 65, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.1,
                    delay: 0.2 + wordIndex * 0.25 + letterIndex * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${
                    word === 'Future'
                      ? 'text-cyan-glow drop-shadow-[0_0_35px_rgba(0,240,255,0.5)]'
                      : 'text-metallic drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-white/60 font-sans font-light leading-relaxed tracking-wide px-4"
        >
          A seamless fusion of pure engineering, luxury aesthetics, and scroll-reactive physics.
          Every gesture commands the universe of high-fidelity precision.
        </motion.p>

        {/* Glass CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              sound.playClick();
              onExploreClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-semibold bg-white text-black hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Explore Experience</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onLearnMoreClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-medium glass-button text-white/90 hover:text-white flex items-center justify-center space-x-2"
          >
            <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            <span>Watch Film</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Ambient Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          Scroll To Begin Story
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]"
          />
        </div>
      </motion.div>
    </section>
  );
};
