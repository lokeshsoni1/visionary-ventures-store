import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-border/20">
      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cosmic flex items-center justify-center">
                <svg className="w-6 h-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold gradient-text">
                Visionary Ventures
              </span>
            </div>
          </motion.div>

          {/* Enhanced Disclaimer with glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mb-8 max-w-3xl"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-electric/20 via-cosmic/20 to-electric/20 blur-sm animate-pulse" />
            <div className="relative glass-card rounded-xl p-5 border border-electric/30">
              <p className="text-sm text-foreground leading-relaxed font-medium">
                <span className="text-electric font-bold">Disclaimer:</span> This site is for informational purposes only. 
                Visionary Ventures promotes this product but provides no medical guarantees or claims. 
                It is not intended to diagnose, treat, cure, or prevent any disease. 
                Always consult your doctor or healthcare professional before use for personalized advice. 
                Results may vary.
              </p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">
              © 2026 Visionary Ventures.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Powered by <span className="gradient-text font-medium">Visionary Ventures</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
