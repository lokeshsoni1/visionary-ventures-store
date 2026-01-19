import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: "Sarah K.",
    location: "New York, NY",
    role: "Marketing Consultant",
    content: "Transformed my daily focus—feels like a real game-changer for staying sharp all day.",
    rating: 5
  },
  {
    name: "Mike R.",
    location: "Los Angeles, CA",
    role: "Software Developer",
    content: "Better sleep has changed everything for me—waking up refreshed and ready instead of drained.",
    rating: 5
  },
  {
    name: "Emily T.",
    location: "Austin, TX",
    role: "Teacher",
    content: "Sharper mind, no more afternoon fog—highly recommend for anyone juggling a busy schedule.",
    rating: 5
  },
  {
    name: "John P.",
    location: "Miami, FL",
    role: "Real Estate Agent",
    content: "Elite-level clarity in my routine now—tasks feel smoother and less overwhelming.",
    rating: 5
  },
  {
    name: "Lisa M.",
    location: "Chicago, IL",
    role: "Graphic Designer",
    content: "Quietly upgraded my life—worth exploring if you're looking for steady mental edge.",
    rating: 5
  },
  {
    name: "David S.",
    location: "Seattle, WA",
    role: "Project Manager",
    content: "Focus like never before—thanks to this discovery, my productivity has leveled up naturally.",
    rating: 5
  }
];

// Double the testimonials for seamless infinite scroll
const scrollingTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className="glass-card rounded-2xl p-6 perspective-1000 min-w-[320px] md:min-w-[380px] flex-shrink-0"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-electric" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-foreground mb-6 leading-relaxed italic">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-cosmic flex items-center justify-center">
          <span className="text-background font-bold text-sm">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
          <p className="text-electric text-xs">{testimonial.location}</p>
          <p className="text-muted-foreground text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // pixels per frame (~30px/sec at 60fps)
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (lastTime) {
        const delta = currentTime - lastTime;
        const newPosition = scrollPosition + (scrollSpeed * delta / 16.67);
        
        // Reset when we've scrolled through half (the duplicated portion)
        const maxScroll = scrollContainer.scrollWidth / 2;
        
        if (newPosition >= maxScroll) {
          setScrollPosition(0);
          scrollContainer.scrollLeft = 0;
        } else {
          setScrollPosition(newPosition);
          scrollContainer.scrollLeft = newPosition;
        }
      }
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrollPosition]);

  return (
    <section ref={ref} className="section-container relative overflow-hidden py-20">
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-xs text-cosmic font-medium tracking-wider uppercase mb-6">
            Real Experiences
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Whispers from </span>
            <span className="gradient-text-reverse">Those Who Discovered It</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've already taken the first step toward cognitive transformation.
          </p>
        </motion.div>

        {/* Auto-scrolling testimonials container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden pb-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {scrollingTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.name}-${index}`} 
              testimonial={testimonial} 
              index={index % testimonials.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
