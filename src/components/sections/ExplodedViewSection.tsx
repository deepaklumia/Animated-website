import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Cpu, Info, RefreshCw, Eye } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface ComponentAnnotation {
  id: string;
  name: string;
  material: string;
  depthOffset: number;
  description: string;
  specs: string;
}

const componentsList: ComponentAnnotation[] = [
  {
    id: 'lens',
    name: '01. Sapphire Crystal Prism',
    material: 'Monocrystalline Al₂O₃ • 9 Mohs',
    depthOffset: -160,
    description: 'Anti-reflective nano-etched glass shielding the optical sensor matrix.',
    specs: '0.4mm Ultra-thin profile',
  },
  {
    id: 'bezel',
    name: '02. Titanium Retention Ring',
    material: 'Grade 5 Aerospace Titanium',
    depthOffset: -90,
    description: 'Precision-turned outer bezel with integrated laser telemetry channels.',
    specs: 'Zero thermal expansion',
  },
  {
    id: 'coil',
    name: '03. Electromagnetic Flux Resonator',
    material: 'Cryo-annealed Silver-Copper Alloy',
    depthOffset: 0,
    description: 'Induction power transfer delivering wireless energy at 99.4% efficiency.',
    specs: '600 kHz resonant field',
  },
  {
    id: 'core',
    name: '04. Photonic Quantum Engine',
    material: 'Silicon-Germanium Photonic Substrate',
    depthOffset: 80,
    description: 'Dual-optical neural node executing 14 trillion tensor calculations/sec.',
    specs: 'Sub-nanometer lithography',
  },
  {
    id: 'chassis',
    name: '05. Carbon-Ceramic Baseplate',
    material: 'Forged Toray T1100 Carbon Composite',
    depthOffset: 160,
    description: 'Vibration-damping thermal anchor isolating delicate quantum states.',
    specs: '800°C thermal threshold',
  },
];

export const ExplodedViewSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeComponentIndex, setActiveComponentIndex] = useState(2);
  const [explosionProgress, setExplosionProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Calculate smooth explosion factor: 0 (assembled) -> 1 (fully exploded) -> 0 (reassembled)
      let explosion = 0;
      if (latest < 0.5) {
        explosion = latest * 2; // 0 to 1
      } else {
        explosion = (1 - latest) * 2; // 1 to 0 (re-assembles!)
      }
      setExplosionProgress(explosion);

      // Active component selection based on scroll
      const activeIdx = Math.min(
        componentsList.length - 1,
        Math.floor(latest * componentsList.length)
      );
      setActiveComponentIndex(activeIdx);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // High-performance Canvas Rendering of the Exploded Mechanical Core
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let baseAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      baseAngle += 0.005;

      const progress = explosionProgress; // 0 = assembled, 1 = maximum explosion

      // Perspective transformation settings
      const tilt = 0.55; // Elliptical perspective factor

      // Render components back-to-front (depth sorted)
      // Order: Chassis (back), Core, Coil, Bezel, Sapphire Lens (front)
      componentsList.forEach((comp, idx) => {
        const explosionMultiplier = progress * 2.2;
        // Calculate Y offset based on exploded depth
        const layerY = cy + comp.depthOffset * explosionMultiplier;
        const radius = 130 - idx * 12;
        const isHoveredOrActive = idx === activeComponentIndex;

        ctx.save();
        ctx.translate(cx, layerY);
        ctx.scale(1, tilt);
        ctx.rotate(baseAngle * (idx % 2 === 0 ? 1 : -0.8) + (progress * 0.5));

        // Outer glow when active
        if (isHoveredOrActive) {
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 25 * progress;
        }

        // Draw component geometry
        if (comp.id === 'chassis') {
          // Octagonal carbon baseplate
          ctx.beginPath();
          const sides = 8;
          for (let s = 0; s < sides; s++) {
            const a = (s / sides) * Math.PI * 2;
            const r = radius * 1.35;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(25, 27, 34, 0.9)';
          ctx.fill();
          ctx.strokeStyle = isHoveredOrActive ? '#00F0FF' : 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (comp.id === 'core') {
          // Central glowing micro-processor die
          const boxSize = radius * 0.9;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
          ctx.fillRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
          ctx.strokeStyle = isHoveredOrActive ? '#6366F1' : 'rgba(99, 102, 241, 0.5)';
          ctx.lineWidth = 2;
          ctx.strokeRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);

          // Internal circuit conduits
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = '#6366F1';
          ctx.shadowColor = '#6366F1';
          ctx.shadowBlur = 20;
          ctx.fill();
        } else if (comp.id === 'coil') {
          // Copper flux electromagnetic spiral
          ctx.beginPath();
          ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
          ctx.strokeStyle = isHoveredOrActive ? '#D4AF37' : 'rgba(212, 175, 55, 0.6)';
          ctx.lineWidth = 6;
          ctx.setLineDash([8, 12]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (comp.id === 'bezel') {
          // Titanium ring with serrated notches
          ctx.beginPath();
          ctx.arc(0, 0, radius * 1.25, 0, Math.PI * 2);
          ctx.strokeStyle = isHoveredOrActive ? '#00F0FF' : 'rgba(226, 232, 240, 0.7)';
          ctx.lineWidth = 8;
          ctx.stroke();

          // Notches
          for (let notch = 0; notch < 12; notch++) {
            const na = (notch / 12) * Math.PI * 2;
            const nx = Math.cos(na) * (radius * 1.25);
            const ny = Math.sin(na) * (radius * 1.25);
            ctx.beginPath();
            ctx.arc(nx, ny, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00F0FF';
            ctx.fill();
          }
        } else if (comp.id === 'lens') {
          // Sapphire optical prism
          ctx.beginPath();
          ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
          ctx.fill();
          ctx.strokeStyle = isHoveredOrActive ? '#00F0FF' : 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Glass reflection sheen
          ctx.beginPath();
          ctx.ellipse(-radius * 0.4, -radius * 0.4, radius * 0.5, radius * 0.15, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.fill();
        }

        ctx.restore();

        // Connecting annotation laser lines when exploded
        if (progress > 0.25 && isHoveredOrActive) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx, layerY);
          const targetX = cx + (idx % 2 === 0 ? 180 : -180);
          ctx.lineTo(targetX, layerY);
          ctx.strokeStyle = '#00F0FF';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(targetX, layerY, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#00F0FF';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00F0FF';
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [explosionProgress, activeComponentIndex]);

  const activeComponent = componentsList[activeComponentIndex];

  return (
    <div
      id="exploded"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#0A0A0A] isolate z-20"
    >
      {/* Sticky Fullscreen Canvas Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 bg-[#0A0A0A]/85 backdrop-blur-md">
        {/* Stage Header */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between z-20">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Chapter IV • Canvas Deconstruction</span>
            </div>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight">
              Anatomy of Perfection
            </h3>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Scroll to Deconstruct & Assemble</span>
            </div>
            <span className="font-mono text-xs text-cyan-300 font-semibold">
              EXPANSION: {Math.round(explosionProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Center Canvas Viewport */}
        <div className="relative w-full max-w-5xl mx-auto h-[60vh] flex items-center justify-center my-auto">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Bottom Interactive Telemetry Card */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end z-20">
          {/* Quick Component Tabs */}
          <div className="md:col-span-6 flex flex-wrap gap-2">
            {componentsList.map((comp, idx) => (
              <button
                key={comp.id}
                onClick={() => {
                  sound.playClick();
                  setActiveComponentIndex(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 border ${
                  activeComponentIndex === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                }`}
              >
                {comp.name.split('.')[1]}
              </button>
            ))}
          </div>

          {/* Active Component Details Box */}
          <div className="md:col-span-6 glass-panel-glow p-5 rounded-2xl border border-white/10 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                {activeComponent.name}
              </span>
              <span className="font-mono text-[11px] text-white/40">
                {activeComponent.specs}
              </span>
            </div>
            <div className="font-sans text-sm text-white/80">
              {activeComponent.description}
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span className="flex items-center space-x-1">
                <Info className="w-3 h-3 text-cyan-400" />
                <span>MATERIAL: {activeComponent.material}</span>
              </span>
              <span className="text-cyan-300 flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>INSPECTING</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
