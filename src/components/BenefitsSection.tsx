import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Moon, BrainCircuit, Target } from 'lucide-react';

const benefits = [
  {
    title: "Deeper Sleep",
    description: "Fall asleep faster, wake up refreshed and ready to conquer.",
    icon: <Moon className="w-9 h-9 text-electric" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 10px hsl(195 100% 50% / 0.6))' }} />,
    gradient: "from-cosmic to-electric"
  },
  {
    title: "Sharper Memory",
    description: "Recall names, facts, and details with ease and confidence.",
    icon: <BrainCircuit className="w-9 h-9 text-electric" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 10px hsl(271 76% 60% / 0.6))' }} />,
    gradient: "from-electric to-cosmic"
  },
  {
    title: "Laser Focus",
    description: "Zone in like never before. Eliminate distractions naturally.",
    icon: <Target className="w-9 h-9 text-electric" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 10px hsl(195 100% 50% / 0.6))' }} />,
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
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass-card premium-card rounded-2xl p-6 group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} p-0.5 mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_hsl(195_100%_50%/0.5)]`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-0.5">
                    {benefit.icon}
                  </div>
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-electric">
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
