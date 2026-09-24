import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Award, Shield } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Principal Design Director',
    company: 'Vanguard Industrial Labs, Zürich',
    quote:
      'Aetherion is not simply a device—it is an ethereal manifestation of modern horology and neural intelligence. The tactile weight and response fidelity redefine what premium means in the 21st century.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    highlight: 'Masterpiece of Kinetic Art',
  },
  {
    id: 't2',
    name: 'Marcus Sterling',
    role: 'Chief Architect of Propulsion',
    company: 'Apex Hypercraft Studio, Tokyo',
    quote:
      'The zero-latency synaptic core delivers a level of responsiveness previously considered physically impossible. We incorporated Aetherion telemetry into our prototype hypercars with startling results.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    highlight: 'Unprecedented Computational Speed',
  },
  {
    id: 't3',
    name: 'Seraphina Vance',
    role: 'Editor-in-Chief',
    company: 'L’Architecture & Futura, Paris',
    quote:
      'In an era flooded with ephemeral gadgets, Aetherion stands like an immovable titanium monolith. It belongs equally in an haute couture salon, a supersonic cockpit, and an art museum.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    highlight: 'Timeless Monument to Craft',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#0A0A0A] py-32 px-6 overflow-hidden perspective-2000"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ambient-glow-cyan pointer-events-none opacity-20 blur-[120px]" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
            <Award className="w-4 h-4" />
            <span>Chapter IX • Critical Acclaim</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
            Voices of the Visionaries
          </h2>
          <p className="mt-4 text-white/60 font-sans text-sm md:text-base font-light max-w-xl mx-auto">
            Honored by leaders across aerospace, industrial architecture, and luxury horology.
          </p>
        </div>

        {/* 3D Floating Glass Testimonial Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => {
            const isHovered = activeCard === t.id;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveCard(t.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                className="relative rounded-3xl p-8 glass-panel-glow border transition-all duration-500 flex flex-col justify-between group"
                style={{
                  borderColor: isHovered ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  transform: isHovered
                    ? 'translateY(-12px) scale(1.02) rotateX(4deg)'
                    : 'translateY(0px) scale(1)',
                  boxShadow: isHovered
                    ? '0 25px 60px -10px rgba(0, 240, 255, 0.2)'
                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Subtle top quote and badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
                    <div className="flex items-center space-x-1 text-amber-400">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold block mb-3">
                    {t.highlight}
                  </span>

                  <p className="text-white/80 font-sans text-sm md:text-base font-light leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-6 border-t border-white/10">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-cyan-400/30 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 text-black" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {t.name}
                    </span>
                    <span className="text-xs text-white/50">{t.role}</span>
                    <span className="text-[10px] font-mono text-white/30 tracking-wider">
                      {t.company}
                    </span>
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
