import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import ProblemSection from '../components/ProblemSection';
import BenefitsSection from '../components/BenefitsSection';
import TrustSection from '../components/TrustSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  const ambientRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (prefersReducedMotion) return;

    // Lighter, snappier scroll on mobile; never smooth-scroll touch (native is faster)
    const lenis = new Lenis({
      duration: isMobile ? 0.9 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Skip mouse-reactive depth entirely on touch / mobile devices — pure GPU savings.
    if (isCoarsePointer || isMobile) {
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    // Mouse-reactive ambient depth (two layers, water-like delayed follow-through)
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;       // fast layer (ambient gradients)
    let curX2 = 0, curY2 = 0;     // slower layer (mouse light)
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let lx = mx, ly = my, lx2 = mx, ly2 = my;
    let parallaxY = 0, parallaxRaf = 0;
    const onScroll = () => { parallaxY = window.scrollY * 0.06; };
    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 28;
      targetY = (e.clientY / window.innerHeight - 0.5) * 28;
      mx = e.clientX; my = e.clientY;
    };
    const tick = () => {
      // luxury easing — slower lerp for water-like delayed flow
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      curX2 += (targetX - curX2) * 0.025;
      curY2 += (targetY - curY2) * 0.025;
      lx  += (mx - lx)  * 0.10;
      ly  += (my - ly)  * 0.10;
      lx2 += (mx - lx2) * 0.04;
      ly2 += (my - ly2) * 0.04;
      if (ambientRef.current) {
        ambientRef.current.style.transform =
          `translate3d(${curX.toFixed(2)}px, ${(curY - parallaxY).toFixed(2)}px, 0)`;
      }
      if (lightRef.current) {
        lightRef.current.style.setProperty('--mx',  `${lx}px`);
        lightRef.current.style.setProperty('--my',  `${ly}px`);
        lightRef.current.style.setProperty('--mx2', `${lx2}px`);
        lightRef.current.style.setProperty('--my2', `${ly2}px`);
      }
      parallaxRaf = requestAnimationFrame(tick);
    };
    parallaxRaf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(parallaxRaf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Ambient cinematic background — slow-drifting aurora */}
      <div ref={ambientRef} className="ambient-bg" aria-hidden="true" />
      {/* Mouse-reactive cinematic light layer */}
      <div ref={lightRef} className="mouse-light hidden md:block" aria-hidden="true" />

      {/* Sections */}
      <div className="relative z-10">
      <HeroSection />
      <ProductSection />
      <ProblemSection />
      <BenefitsSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      </div>
    </main>
  );
};

export default Index;
