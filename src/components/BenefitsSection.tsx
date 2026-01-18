import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    title: "Deeper Sleep",
    description: "Fall asleep faster, wake up refreshed and ready to conquer.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <circle cx="20" cy="20" r="12" strokeWidth="2" className="text-cosmic" />
        <path d="M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12c0-6.6-5.4-12-12-12" strokeWidth="2" className="text-electric" fill="none" />
        <circle cx="26" cy="14" r="1.5" className="fill-electric" />
        <circle cx="30" cy="18" r="1" className="fill-electric opacity-70" />
      </svg>
    ),
    gradient: "from-cosmic to-electric"
  },
  {
    title: "Sharper Memory",
    description: "Recall names, facts, and details with ease and confidence.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <rect x="8" y="8" width="10" height="10" rx="2" strokeWidth="2" className="text-electric" />
        <rect x="22" y="8" width="10" height="10" rx="2" strokeWidth="2" className="text-electric" />
        <rect x="8" y="22" width="10" height="10" rx="2" strokeWidth="2" className="text-electric" />
        <rect x="22" y="22" width="10" height="10" rx="2" strokeWidth="2" className="text-cosmic" />
        <path d="M18 13h4M13 18v4M27 18v4M18 27h4" strokeWidth="2" className="text-cosmic opacity-50" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-electric to-cosmic"
  },
  {
    title: "Laser Focus",
    description: "Zone in like never before. Eliminate distractions naturally.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <circle cx="20" cy="20" r="14" strokeWidth="2" className="text-electric opacity-30" />
        <circle cx="20" cy="20" r="9" strokeWidth="2" className="text-electric opacity-60" />
        <circle cx="20" cy="20" r="4" strokeWidth="2" className="text-electric" />
        <circle cx="20" cy="20" r="1.5" className="fill-cosmic" />
      </svg>
    ),
    gradient: "from-cosmic to-electric"
  },
  {
    title: "Mental Clarity",
    description: "Cut through the noise with crystal-clear thinking.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <polygon points="20,4 36,32 4,32" strokeWidth="2" className="text-electric" fill="none" />
        <polygon points="20,12 28,28 12,28" strokeWidth="2" className="text-cosmic" fill="none" />
        <circle cx="20" cy="22" r="2" className="fill-electric" />
      </svg>
    ),
    gradient: "from-electric to-cosmic"
  },
  {
    title: "Sustained Energy",
    description: "All-day vitality without jitters or crashes.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <path d="M20 4v8M20 28v8M4 20h8M28 20h8" strokeWidth="2" className="text-electric" strokeLinecap="round" />
        <circle cx="20" cy="20" r="6" strokeWidth="2" className="text-cosmic" />
        <circle cx="20" cy="20" r="2" className="fill-electric" />
      </svg>
    ),
    gradient: "from-cosmic to-electric"
  },
  {
    title: "Mood Balance",
    description: "Support emotional resilience and positive outlook.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40" stroke="currentColor">
        <path d="M8 20c4-8 8 0 12-8s8 0 12-8" strokeWidth="2" className="text-electric" strokeLinecap="round" />
        <path d="M8 28c4-8 8 0 12-8s8 0 12-8" strokeWidth="2" className="text-cosmic" strokeLinecap="round" />
        <circle cx="20" cy="24" r="3" strokeWidth="2" className="text-electric" />
      </svg>
    ),
    gradient: "from-electric to-cosmic"
  }
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-container relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-xs text-cosmic font-medium tracking-wider uppercase mb-6">
            Transform Your Mind
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Experience the </span>
            <span className="gradient-text-reverse">Full Potential</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Imagine waking up every day with unwavering mental clarity and boundless cognitive energy.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="glass-card rounded-2xl p-6 group cursor-pointer perspective-1000"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} p-0.5 mb-5 group-hover:animate-pulse-glow transition-all`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-electric transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground italic mt-12"
        >
          Imagine experiencing all this... but there's more to the story.
        </motion.p>
      </div>
    </section>
  );
}
