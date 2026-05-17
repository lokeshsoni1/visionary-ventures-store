import { motion } from 'framer-motion';
import brainBackground from '@/assets/brain-background.jpg';

export default function HeroSection() {
  return (
    <section className="section-container relative min-h-screen">
      {/* Static Blurred Brain Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${brainBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.05)',
        }}
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-background/70 z-5" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-electric/5 via-transparent to-transparent pointer-events-none z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 glass-card rounded-full text-sm text-electric font-medium tracking-wider uppercase">
            The Future of Cognitive Enhancement
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
        >
          <span className="text-foreground">What If a </span>
          <span className="gradient-text text-glow">Secret Brain Switch</span>
          <span className="text-foreground"> Could Unlock </span>
          <span className="gradient-text-reverse text-glow-purple">Superhuman Focus</span>
          <span className="text-foreground">?</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          style={{ lineHeight: 1.75 }}
        >
          A breakthrough natural formula hidden in plain sight—crafted to support mental clarity and healthy cognitive function.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <a 
            href="#product" 
            className="cta-button text-lg group"
          >
            <span className="flex items-center gap-2">
              Discover How It Works
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          {/* Scarcity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm text-amber-200/90 text-xs sm:text-sm font-medium tracking-wide"
            style={{ boxShadow: '0 0 24px hsl(45 100% 55% / 0.15)' }}
          >
            <span aria-hidden>⚠️</span>
            <span>High Demand: Limited Stock Available Globally</span>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-electric"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
