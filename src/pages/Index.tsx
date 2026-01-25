import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import ProblemSection from '../components/ProblemSection';
import BenefitsSection from '../components/BenefitsSection';
import TrustSection from '../components/TrustSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ParticleField from '../components/ParticleField';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Global particle background - lightweight */}
      <ParticleField />
      
      {/* Sections */}
      <HeroSection />
      <ProductSection />
      <ProblemSection />
      <BenefitsSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
