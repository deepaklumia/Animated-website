import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface NavbarProps {
  onChapterSelect: (id: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onChapterSelect, activeSection }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'parallax', label: 'Architecture' },
    { id: 'gallery', label: 'Showcase' },
    { id: 'exploded', label: 'Anatomy' },
    { id: 'features', label: 'Innovations' },
    { id: 'depth', label: 'Spatial' },
    { id: 'testimonials', label: 'Legacy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 transition-all duration-500 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#0E0E12]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
            : 'bg-black/30 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand Monogram */}
        <button
          onClick={() => {
            sound.playClick();
            onChapterSelect('hero');
          }}
          className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="w-8 h-8 rounded-full border border-cyan-400/40 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-cyan-400">
            <span className="font-display font-black text-xs tracking-wider text-cyan-300">AE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-[0.25em] text-white uppercase group-hover:text-cyan-400 transition-colors">
              Aetherion
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
              Chronicles
            </span>
          </div>
        </button>

        {/* Center Chapter Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onChapterSelect(item.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 relative ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Icons & Audio Toggle */}
        <div className="flex items-center space-x-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => sound.playHover()}
            title={isMuted ? 'Activate Soundscape' : 'Mute Soundscape'}
            className={`p-2.5 rounded-full border transition-all duration-300 flex items-center space-x-1.5 ${
              !isMuted
                ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25'
            }`}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="text-[10px] font-mono tracking-wider hidden sm:inline">
              {isMuted ? 'SOUND: OFF' : 'SOUND: ON'}
            </span>
            {!isMuted && (
              <div className="flex items-end space-x-0.5 h-3">
                <span className="w-0.5 bg-cyan-400 h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 bg-cyan-400 h-3 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 bg-cyan-400 h-1.5 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onChapterSelect('cta');
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Pre-Order
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/20"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-4 top-20 bg-[#0E0E12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onChapterSelect(item.id);
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-mono tracking-widest uppercase text-white/70 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              sound.playClick();
              onChapterSelect('cta');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold font-mono tracking-widest text-xs uppercase text-center mt-2"
          >
            Pre-Order Aetherion
          </button>
        </div>
      )}
    </header>
  );
};
