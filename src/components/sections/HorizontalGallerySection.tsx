import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Eye, Shield, Zap, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  accent: string;
  stat: string;
  statLabel: string;
  details: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: '01',
    tag: 'Monolith • Exterior',
    title: 'Titanium Exoskeleton',
    subtitle: 'Zero-tolerance monolithic body milled from a solid billet of Grade 5 titanium.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    accent: '#00F0FF',
    stat: '0.002mm',
    statLabel: 'Machining Tolerance',
    details: ['Vapor Deposition Finish', 'Hypersonic Aerodynamics', 'Thermal Dissipation Mesh'],
  },
  {
    id: '02',
    tag: 'Core • Dynamics',
    title: 'Photonic Quantum Core',
    subtitle: 'Harnessing coherent light pulses for near-zero latency cognitive processing.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80',
    accent: '#6366F1',
    stat: '10.8 PFLOPs',
    statLabel: 'Neural Processing',
    details: ['Sub-Kelvin Superconducting', 'Optical Waveguides', 'Instantaneous Telemetry'],
  },
  {
    id: '03',
    tag: 'Interface • Spatial',
    title: 'Haptic Retina Display',
    subtitle: 'Micro-LED visual surface seamlessly bonded beneath diamond-grade sapphire glass.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    accent: '#D4AF37',
    stat: '4,000 Nits',
    statLabel: 'Peak Luminance',
    details: ['120Hz Ultra-Adaptive', 'Zero Refraction Index', 'Localized Haptic Feedback'],
  },
  {
    id: '04',
    tag: 'Autonomous • Velocity',
    title: 'Kinetic Drive System',
    subtitle: 'Dual magnetic-levitation propulsion vectors achieving perpetual fluid balance.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    accent: '#10B981',
    stat: '< 1.2 ms',
    statLabel: 'Torque Vectoring',
    details: ['Electromagnetic Bearings', 'Silent Flux Modulation', 'Regenerative Damping'],
  },
];

export const HorizontalGallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth horizontal translation across the slides
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(galleryItems.length - 1) * 100}vw`]
  );

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full h-[360vh] bg-[#0A0A0A] isolate z-10"
    >
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        {/* Horizontal Moving Track */}
        <motion.div
          style={{ x }}
          className="flex flex-row w-[400vw] h-full items-center will-change-transform"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-16 relative"
            >
              {/* Background Panel Image with Depth & Luminous Ambient Vignette */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.58] contrast-125 saturate-110 scale-105 transition-transform duration-1000"
                />
                {/* Vibrant accent glow corresponding to each panel */}
                <div
                  className="absolute inset-0 opacity-25 mix-blend-color-dodge pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 60% 50%, ${item.accent}, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-black/75" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Massive Editorial Typography */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="flex items-center space-x-3">
                    <span
                      className="font-mono text-xs uppercase tracking-[0.3em] px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${item.accent}40`,
                        backgroundColor: `${item.accent}15`,
                        color: item.accent,
                      }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs text-white/40 tracking-widest">
                      0{index + 1} / 0{galleryItems.length}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-white tracking-tight leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-white/70 font-light max-w-xl leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Specs List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    {item.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-xs font-mono text-white/80"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action */}
                  <div className="pt-2 flex items-center space-x-4">
                    <button
                      onClick={() => sound.playClick()}
                      onMouseEnter={() => sound.playHover()}
                      className="px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 flex items-center space-x-2 border border-white/20 hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Specs</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Floating Luxury Hologram HUD Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    className="w-full max-w-md p-8 rounded-3xl glass-panel-glow border border-white/15 relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500 shadow-2xl"
                    onMouseEnter={() => sound.playHover()}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        {index % 2 === 0 ? (
                          <Shield className="w-6 h-6" style={{ color: item.accent }} />
                        ) : (
                          <Zap className="w-6 h-6" style={{ color: item.accent }} />
                        )}
                      </div>
                      <span className="font-mono text-3xl font-bold text-white/20">
                        #{item.id}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                        {item.statLabel}
                      </span>
                      <div
                        className="text-4xl sm:text-5xl font-display font-black tracking-tight"
                        style={{ color: item.accent }}
                      >
                        {item.stat}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                      <span>STATUS: OPTIMAL</span>
                      <span className="flex items-center space-x-1.5 text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span>LIVE SYNC</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Panel Navigation Guide */}
              <div className="absolute bottom-10 left-16 hidden lg:flex items-center space-x-3 text-xs font-mono text-white/30 uppercase tracking-widest">
                <span>Scroll Vertically to Traverse Showcase</span>
                <div className="w-12 h-[1px] bg-white/20" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
