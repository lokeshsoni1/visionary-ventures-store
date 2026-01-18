import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Product3D from './Product3D';

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product" ref={ref} className="section-container relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-cosmic/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* 3D Product */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <Product3D />
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2 text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1.5 glass-card rounded-full text-xs text-cosmic font-medium tracking-wider uppercase mb-6">
            Premium Formula
          </span>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Not Just a Supplement—</span>
            <br />
            <span className="gradient-text">The Key to Neural Optimization</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            This isn't your average brain booster. Our proprietary formula targets 
            the recently discovered neural pathways that control focus, memory retention, 
            and mental clarity—naturally supporting your cognitive potential.
          </p>
          
          <div className="glass-card rounded-2xl p-6 mb-8">
            <p className="text-electric italic font-medium text-center lg:text-left">
              "What if the missing piece to unlocking your full mental capacity 
              has been hiding in nature all along?"
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-electric" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-electric" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>GMP Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-electric" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Made in USA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
