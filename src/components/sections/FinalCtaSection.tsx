import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEngine';

interface FinalCtaSectionProps {
  onBackToTop: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onBackToTop }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reserved, setReserved] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const bgZoom = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const btnScale = useTransform(scrollYProgress, [0.4, 0.9], [0.8, 1]);

  const handlePreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sound.playClick();
    sound.playChime(880); // High celebration chime
    setReserved(true);

    // Luxury cyan & gold particle burst
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.75 },
        colors: ['#00F0FF', '#D4AF37', '#6366F1', '#FFFFFF'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0A0A0A] flex flex-col justify-between overflow-hidden"
    >
      {/* Background Cinematic Visual with Zoom & Ambient Radiance */}
      <motion.div
        style={{ scale: bgZoom }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80"
          alt="Majestic stargazing mountain night"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-150 saturate-125"
        />
        <div className="absolute inset-0 bg-radial-glow from-cyan-500/20 via-black/80 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />
      </motion.div>

      {/* Main Closing Scene Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center flex flex-col items-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/30 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
            Epilogue • The Horizon Awaits
          </span>
        </motion.div>

        {/* Large Typography: "Ready To Begin?" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase text-white tracking-tight leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
        >
          Ready To Begin?
        </motion.h2>

        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed">
          Join the vanguard of individuals entering the next paradigm of computational luxury.
          Limited numbered allocations worldwide for Genesis Batch.
        </p>

        {/* Interactive Reservation Form */}
        <motion.div
          style={{ scale: btnScale }}
          className="mt-10 w-full max-w-md"
        >
          {!reserved ? (
            <form onSubmit={handlePreOrder} className="relative flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter VIP Allocation Email..."
                className="w-full px-5 py-4 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl text-white placeholder-white/40 font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300 text-black hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center justify-center space-x-2 flex-shrink-0 hover:scale-105 active:scale-95"
              >
                <span>Reserve</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl glass-panel-glow border-cyan-400/50 flex flex-col items-center space-y-2 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 animate-bounce" />
              <div className="font-display font-bold text-lg text-white">
                Genesis Reservation Confirmed
              </div>
              <div className="text-xs font-mono text-white/60">
                Encrypted dispatch delivered to {email}. Welcome to Aetherion.
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Luxury Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-black/60 backdrop-blur-xl px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="font-display font-bold tracking-[0.25em] text-white uppercase text-sm">
              Aetherion Kinetic Chronometry
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-wider">
              © {new Date().getFullYear()} AETHERION CORP • ALL RIGHTS RESERVED
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-6 text-xs font-mono text-white/50">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Manifesto</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Telemetry</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Security</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Patents</span>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={() => {
              sound.playClick();
              onBackToTop();
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-3 rounded-full border border-white/15 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center space-x-2 text-xs font-mono group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span className="tracking-widest uppercase">Apex</span>
          </button>
        </div>
      </footer>
    </section>
  );
};
