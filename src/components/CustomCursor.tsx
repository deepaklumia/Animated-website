import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        isHovered.current = !!target.closest('button, a, input, [data-cursor-hover], .clickable');
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // High performance smooth interpolation without triggering React re-renders
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.18);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        const scale = isClicking.current ? 0.8 : isHovered.current ? 1.5 : 1;
        const borderColor = isHovered.current ? '#00F0FF' : 'rgba(255, 255, 255, 0.35)';
        const bg = isHovered.current ? 'rgba(0, 240, 255, 0.1)' : 'transparent';

        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = borderColor;
        ringRef.current.style.backgroundColor = bg;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Tiny sharp center point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_12px_#00F0FF] will-change-transform"
      />
      {/* Outer fluid aura ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/30 pointer-events-none transition-[border-color,background-color] duration-150 ease-out will-change-transform"
      />
    </div>
  );
};
