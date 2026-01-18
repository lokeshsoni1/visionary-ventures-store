import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const trustPoints = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
        <path d="M16 4l10 4v8c0 6-4 10-10 12-6-2-10-6-10-12V8l10-4z" strokeWidth="2" className="text-electric" />
        <path d="M12 16l3 3 5-6" strokeWidth="2" className="text-cosmic" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Peer-Reviewed Research",
    description: "Formulated based on published scientific studies exploring natural cognitive support compounds."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
        <rect x="6" y="8" width="20" height="16" rx="2" strokeWidth="2" className="text-electric" />
        <path d="M10 12h12M10 16h8M10 20h10" strokeWidth="2" className="text-cosmic opacity-70" strokeLinecap="round" />
        <circle cx="24" cy="20" r="2" className="fill-cosmic" />
      </svg>
    ),
    title: "FDA-Registered Facility",
    description: "Manufactured in state-of-the-art, FDA-registered facilities following strict quality protocols."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
        <circle cx="16" cy="16" r="10" strokeWidth="2" className="text-electric" />
        <path d="M16 10v6l4 2" strokeWidth="2" className="text-cosmic" strokeLinecap="round" />
        <path d="M12 6l8 0M12 26l8 0" strokeWidth="2" className="text-electric opacity-50" strokeLinecap="round" />
      </svg>
    ),
    title: "GMP Certified",
    description: "Every batch meets rigorous Good Manufacturing Practice standards for purity and potency."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
        <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4z" strokeWidth="2" className="text-electric" />
        <path d="M12 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.5 3-4 4" strokeWidth="2" className="text-cosmic" strokeLinecap="round" />
        <circle cx="16" cy="22" r="1.5" className="fill-cosmic" />
      </svg>
    ),
    title: "100% Natural Formula",
    description: "No artificial fillers, synthetic additives, or questionable ingredients—just pure, natural support."
  }
];

export default function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-container relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-xs text-electric font-medium tracking-wider uppercase mb-6">
            Uncompromising Quality
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Built on </span>
            <span className="gradient-text">Science & Trust</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't cut corners. Every aspect of our formula meets the highest standards of quality and transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-electric/20 to-cosmic/20 flex items-center justify-center">
                {point.icon}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground italic">
            But why are top researchers and elite performers buzzing about this? 
            <span className="text-electric"> See real stories below.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
