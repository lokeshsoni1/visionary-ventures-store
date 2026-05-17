import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import ProblemSection from '../components/ProblemSection';
import BenefitsSection from '../components/BenefitsSection';
import TrustSection from '../components/TrustSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Ambient cinematic background — slow-drifting aurora */}
      <div className="ambient-bg" aria-hidden="true" />

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
