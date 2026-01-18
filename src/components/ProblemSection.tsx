import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    title: "Brain Fog",
    description: "That hazy feeling stealing your productivity and creativity?",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
        <circle cx="24" cy="24" r="16" strokeWidth="2" className="text-electric opacity-30" />
        <path d="M16 24c0-4.4 3.6-8 8-8" strokeWidth="2" className="text-electric" strokeLinecap="round" />
        <circle cx="20" cy="18" r="2" className="fill-cosmic opacity-50" />
        <circle cx="28" cy="22" r="3" className="fill-cosmic opacity-40" />
        <circle cx="24" cy="30" r="2.5" className="fill-cosmic opacity-30" />
      </svg>
    ),
    color: "electric"
  },
  {
    title: "Restless Sleep",
    description: "Waking up exhausted, wondering why rest feels impossible?",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
        <path d="M8 24h32" strokeWidth="2" className="text-cosmic" strokeLinecap="round" />
        <path d="M12 18c4-6 8 6 12 0s8 6 12 0" strokeWidth="2" className="text-electric" strokeLinecap="round" />
        <path d="M12 30c4-6 8 6 12 0s8 6 12 0" strokeWidth="2" className="text-electric opacity-50" strokeLinecap="round" />
      </svg>
    ),
    color: "cosmic"
  },
  {
    title: "Scattered Focus",
    description: "Ideas slipping away just when you need them most?",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
        <circle cx="24" cy="24" r="6" strokeWidth="2" className="text-electric" />
        <path d="M24 8v6M24 34v6M8 24h6M34 24h6" strokeWidth="2" className="text-cosmic" strokeLinecap="round" />
        <path d="M14 14l4 4M30 30l4 4M14 34l4-4M30 18l4-4" strokeWidth="2" className="text-electric opacity-50" strokeLinecap="round" />
      </svg>
    ),
    color: "electric"
  }
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="science" ref={ref} className="section-container relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-xs text-electric font-medium tracking-wider uppercase mb-6">
            The Hidden Struggle
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Sound </span>
            <span className="gradient-text">Familiar</span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't just inconveniences—they're signals that something deeper needs attention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card-hover rounded-2xl p-8 text-center perspective-1000"
            >
              <div className="mb-6 flex justify-center">
                <div className={`p-4 rounded-2xl bg-${problem.color}/10 animate-float`} style={{ animationDelay: `${index * 0.5}s` }}>
                  {problem.icon}
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {problem.description}
              </p>
              <p className="text-sm text-cosmic italic">
                What if the root cause is something you've never considered?
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition to Solution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric to-cosmic flex items-center justify-center animate-pulse-glow">
            <svg className="w-10 h-10 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            <span className="gradient-text">The Breakthrough Discovery</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recent science uncovered a natural neural pathway that, when properly supported, 
            can help <span className="text-electric">flip the switch</span> on these issues—naturally 
            and without harsh stimulants.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
