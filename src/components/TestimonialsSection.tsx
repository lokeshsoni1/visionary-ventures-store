import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BadgeCheck, Star } from 'lucide-react';

type Testimonial = {
  name: string;
  location: string;
  package: string;
  content: string;
  rating: number;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Emily H.",
    location: "Phoenix, Arizona",
    package: "Purchased: 3-Bottle Package",
    content:
      "After weeks of brain fog, I finally feel like myself again. My mornings start sharp and the afternoon slump is gone. It's subtle at first—then one day you realize you're just clearer.",
    rating: 5,
    initials: "EH",
  },
  {
    name: "Daniel R.",
    location: "Tampa, Florida",
    package: "Purchased: 6-Bottle Package",
    content:
      "I'm 58 and was worried about my memory. Names, appointments, little details—they're staying with me now. My wife noticed before I did. Worth every penny.",
    rating: 5,
    initials: "DR",
  },
  {
    name: "Bethany Doyle",
    location: "Missoula, Montana",
    package: "Purchased: 3-Bottle Package",
    content:
      "The deeper sleep alone changed my life. I wake up rested instead of dragging myself out of bed. My focus during long workdays is something I haven't felt in years.",
    rating: 5,
    initials: "BD",
  },
  {
    name: "Marcus W.",
    location: "Denver, Colorado",
    package: "Purchased: 6-Bottle Package",
    content:
      "What surprised me most is how calm my mind feels now. The constant overthinking quieted down. Conversations flow easier and I actually finish what I start.",
    rating: 5,
    initials: "MW",
  },
  {
    name: "Linda S.",
    location: "Charleston, South Carolina",
    package: "Purchased: 3-Bottle Package",
    content:
      "I'd tried so many things for energy. This is the first that feels steady—no jitters, no crash. Just smooth, even focus from morning to evening.",
    rating: 5,
    initials: "LS",
  },
  {
    name: "Robert P.",
    location: "Columbus, Ohio",
    package: "Purchased: 6-Bottle Package",
    content:
      "At 62, I wasn't expecting much. Three weeks in, my recall is sharper and I'm sleeping through the night for the first time in years. My doctor was impressed.",
    rating: 5,
    initials: "RP",
  },
  {
    name: "Jessica T.",
    location: "Portland, Oregon",
    package: "Purchased: 3-Bottle Package",
    content:
      "Reading complex material used to take me twice as long. Now I'm absorbing it on the first pass. The mental clarity is real and it builds quietly over time.",
    rating: 5,
    initials: "JT",
  },
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 md:p-7 border border-white/[0.06] bg-white/[0.025] backdrop-blur-md hover:border-electric/30 transition-colors duration-300"
      style={{ boxShadow: '0 10px 40px -20px rgba(0,0,0,0.6)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300/90 ml-2">
          <BadgeCheck className="w-3.5 h-3.5" />
          Verified Purchase
        </span>
      </div>

      <p className="text-zinc-200 text-[15px] md:text-base leading-[1.75] mb-6">
        "{t.content}"
      </p>

      <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-electric/80 to-cosmic/80 flex items-center justify-center text-background font-semibold text-sm flex-shrink-0">
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-zinc-100 text-sm leading-tight">{t.name}</p>
          <p className="text-zinc-400 text-xs mt-0.5">{t.location}</p>
          <p className="text-electric/80 text-[11px] mt-0.5 font-medium tracking-wide">{t.package}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section ref={ref} className="section-container relative py-24">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-[11px] text-zinc-300 font-medium tracking-[0.18em] uppercase border border-white/10 bg-white/[0.03] mb-6">
            Real Experiences
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 leading-tight">
            What Real Users Are Saying
          </h2>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-zinc-400">
            Our Customers Say
          </span>
          <div className="hidden sm:block w-px h-4 bg-white/15" />
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/15" />
          <span className="text-sm text-zinc-300">
            based on <span className="font-semibold text-zinc-100">11,231</span> reviews
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {visible.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Reveal more */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-full text-sm font-medium text-zinc-200 border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-electric/40 transition-all duration-300"
            >
              Read More Reviews →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
