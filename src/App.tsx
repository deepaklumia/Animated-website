import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { HeroSection } from './components/sections/HeroSection';
import { ParallaxStorySection } from './components/sections/ParallaxStorySection';
import { HorizontalGallerySection } from './components/sections/HorizontalGallerySection';
import { ExplodedViewSection } from './components/sections/ExplodedViewSection';
import { TypographyStorySection } from './components/sections/TypographyStorySection';
import { FeatureShowcaseSection } from './components/sections/FeatureShowcaseSection';
import { DepthExperienceSection } from './components/sections/DepthExperienceSection';
import { VideoTransitionSection } from './components/sections/VideoTransitionSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Track active section on scroll
    const sections = ['hero', 'parallax', 'gallery', 'exploded', 'typography', 'features', 'depth', 'video-transition', 'testimonials', 'cta'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-cyan-400 selection:text-black">
      {/* Noise grain overlay */}
      <div className="film-grain" />

      {/* Dynamic Background Video, Image Frame & Atmospheric Lighting Engine */}
      <BackgroundAtmosphere />

      {/* Interactive Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Scroll Laser & HUD Progress */}
      <ScrollProgress />

      {/* Floating Glassmorphic Top Navigation */}
      <Navbar onChapterSelect={scrollToId} activeSection={activeSection} />

      {/* Main 10-Scene Cinematic Timeline */}
      <main className="relative z-10">
        {/* Scene 1: Cinematic Hero */}
        <HeroSection
          onExploreClick={() => scrollToId('parallax')}
          onLearnMoreClick={() => scrollToId('video-transition')}
        />

        {/* Scene 2: Multi-Layer Parallax Story */}
        <ParallaxStorySection />

        {/* Scene 3: Pinned Horizontal Scroll Gallery */}
        <HorizontalGallerySection />

        {/* Scene 4: Canvas Exploded-View Product Reveal */}
        <ExplodedViewSection />

        {/* Scene 5: Kinetic Text Storytelling */}
        <TypographyStorySection />

        {/* Scene 6: Immersive Split Feature Showcase */}
        <FeatureShowcaseSection />

        {/* Scene 7: 3D Depth Spatial Immersion */}
        <DepthExperienceSection />

        {/* Scene 8: Fullscreen Video & Velocity Scrub */}
        <VideoTransitionSection />

        {/* Scene 9: Premium 3D Floating Testimonials */}
        <TestimonialsSection />

        {/* Scene 10: Final Grand CTA & Epilogue */}
        <FinalCtaSection onBackToTop={handleBackToTop} />
      </main>
    </div>
  );
};

export default App;
