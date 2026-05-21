import { motion } from 'framer-motion';
import brainBackground from '@/assets/brain-background.jpg';

export default function HeroSection() {
  // Use a flat structure with explicit spaces between coloured spans so that
  // inline-block whitespace can never collapse on any browser/breakpoint.
  const headlineParts = [
    { text: 'What If a', className: 'text-foreground' },
    { text: 'Secret Brain Switch', className: 'gradient-text text-glow' },
    { text: 'Could Unlock', className: 'text-foreground' },
    { text: 'Superhuman Focus', className: 'gradient-text-reverse text-glow-purple' },
  ];

  return (
    <section className="section-container relative min-h-screen">
      {/* Static Blurred Brain Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundImage: `url(${brainBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
        }}
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-background/70 z-5" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-electric/5 via-transparent to-transparent pointer-events-none z-10 animate-breathe" />
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 glass-card rounded-full text-sm text-electric font-medium tracking-wider uppercase">
            The Future of Cognitive Enhancement
          </span>
        </motion.div>
        
        <h1 className="font-display text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-8 text-balance">
          {headlineParts.map((part, i) => (
            <span key={i} className="inline">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${part.className}`}
              >
                {part.text}
              </motion.span>
              {i < headlineParts.length - 1 && ' '}
            </span>
          ))}
          <span className="text-foreground">?</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          style={{ lineHeight: 1.75 }}
        >
          A breakthrough natural formula hidden in plain sight—crafted to support mental clarity and healthy cognitive function.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <motion.a
            href="#product"
            className="cta-button text-lg group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <span className="flex items-center gap-2">
              Discover How It Works
              <svg
                className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.a>

          {/* Scarcity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 0 18px hsl(45 100% 55% / 0.1)',
                '0 0 32px hsl(45 100% 55% / 0.25)',
                '0 0 18px hsl(45 100% 55% / 0.1)',
              ],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 1.55 },
              y: { duration: 0.6, delay: 1.55 },
              boxShadow: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.55 },
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm text-amber-200/90 text-xs sm:text-sm font-medium tracking-wide"
          >
            <span aria-hidden>⚠️</span>
            <span>High Demand: Limited Stock Available Globally</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
