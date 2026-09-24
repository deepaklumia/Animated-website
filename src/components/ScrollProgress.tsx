import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Laser Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-300 transition-all duration-75 shadow-[0_0_12px_#00F0FF]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating HUD Scroll Meter (Right edge) */}
      <div className="fixed right-6 bottom-10 z-40 hidden md:flex flex-col items-center space-y-2 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-semibold">
          {Math.round(progress).toString().padStart(2, '0')}%
        </span>
        <div className="w-[2px] h-16 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="w-full bg-cyan-400 rounded-full transition-all duration-100"
            style={{ height: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[8px] tracking-tighter text-white/30 uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
      </div>
    </>
  );
};
