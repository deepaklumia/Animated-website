import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, BatteryCharging, Wifi, Lock, Activity, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface FeatureCard {
  id: string;
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  stat: string;
  statDetail: string;
  accent: string;
}

const features: FeatureCard[] = [
  {
    id: 'f1',
    icon: Cpu,
    category: 'Architecture',
    title: 'Zero-Latency Synaptic Core',
    description: 'Direct neural interface matrix with multi-threaded cognitive dispatch. Synchronizes with intent before physical contact.',
    stat: '0.04ms',
    statDetail: 'Response Horizon',
    accent: '#00F0FF',
  },
  {
    id: 'f2',
    icon: BatteryCharging,
    category: 'Power Density',
    title: 'Superconducting Solid-State Cell',
    description: 'Harnessing graphene-encapsulated lithium-sulfur chemistry to deliver 72 hours of uninterrupted computational endurance.',
    stat: '72 Hrs',
    statDetail: 'Per Continuous Charge',
    accent: '#10B981',
  },
  {
    id: 'f3',
    icon: ShieldCheck,
    category: 'Material Science',
    title: 'Diamond-Sputtered Casing',
    description: 'Cold plasma deposition generates an amorphous carbon layer impervious to atmospheric abrasion, extreme heat, and pressure.',
    stat: '9.8 Mohs',
    statDetail: 'Structural Rigidity',
    accent: '#D4AF37',
  },
  {
    id: 'f4',
    icon: Wifi,
    category: 'Connectivity',
    title: 'Terahertz Spatial Relays',
    description: 'Beamforming millimeter-wave antennas transmitting lossless 8K telemetry across encrypted distributed channels.',
    stat: '120 Gbps',
    statDetail: 'Wireless Throughput',
    accent: '#6366F1',
  },
  {
    id: 'f5',
    icon: Lock,
    category: 'Security',
    title: 'Quantum Key Distribution',
    description: 'Hardware entropy generators powered by quantum vacuum fluctuations guarantee mathematically uncrackable privacy.',
    stat: '4096-Bit',
    statDetail: 'Post-Quantum Lattice',
    accent: '#EC4899',
  },
];

export const FeatureShowcaseSection: React.FC = () => {
  return (
    <section id="features" className="relative w-full bg-[#0A0A0A] py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Sticky Telemetry Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Chapter VI • Feature Matrix</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
              Engineered Beyond Human Limit.
            </h2>

            <p className="text-white/60 font-sans font-light leading-relaxed text-sm md:text-base">
              Every card represents a breakthrough in materials science, quantum computing, and
              tactile luxury. Scroll to inspect each component in isolation.
            </p>

            {/* Live Telemetry Radar */}
            <div className="p-6 rounded-2xl glass-panel-glow border border-white/10 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>SYSTEM DIAGNOSTIC</span>
                <span className="text-cyan-400">ALL SYSTEMS NOMINAL</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Thermal Load</span>
                  <div className="text-lg font-mono font-bold text-white mt-1">32.4°C</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Flux Density</span>
                  <div className="text-lg font-mono font-bold text-cyan-400 mt-1">1.42 Tesla</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono text-white/40">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Continuous telemetry verification enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scrolling Animated Feature Cards */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => sound.playHover()}
                className="group relative p-8 md:p-10 rounded-3xl glass-panel-glow border border-white/10 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,240,255,0.12)] overflow-hidden"
              >
                {/* Ambient glow accent */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: item.accent }}
                />

                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${item.accent}30`,
                        backgroundColor: `${item.accent}10`,
                        color: item.accent,
                      }}
                    >
                      {item.category}
                    </span>
                    <div
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                      style={{ color: item.accent }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                        {item.statDetail}
                      </span>
                      <span
                        className="text-3xl sm:text-4xl font-display font-black tracking-tight"
                        style={{ color: item.accent }}
                      >
                        {item.stat}
                      </span>
                    </div>

                    <button
                      onClick={() => sound.playClick()}
                      className="text-xs font-mono tracking-widest uppercase text-white/50 hover:text-white flex items-center space-x-1"
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
