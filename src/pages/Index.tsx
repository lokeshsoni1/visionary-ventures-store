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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
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

    let targetX = 0, targetY = 0, curX = 0, curY = 0, parallaxY = 0, parallaxRaf = 0;
    const onScroll = () => { parallaxY = window.scrollY * 0.06; };
    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 18;
      targetY = (e.clientY / window.innerHeight - 0.5) * 18;
    };
    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(${curX.toFixed(2)}px, ${(curY - parallaxY).toFixed(2)}px, 0)`;
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
