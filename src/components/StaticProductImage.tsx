import { motion } from 'framer-motion';
import productImage from '@/assets/product-static.png';

export default function StaticProductImage() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Outer glow layer */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.4), rgba(138, 43, 226, 0.4))',
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
          }}
        />
        
        {/* Middle glow layer */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-40"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 191, 255, 0.6), rgba(138, 43, 226, 0.6))',
            filter: 'blur(25px)',
            transform: 'scale(1.05)',
          }}
        />
        
        {/* Glowing border container */}
        <div 
          className="relative p-1 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.8), rgba(138, 43, 226, 0.8), rgba(0, 191, 255, 0.8))',
            boxShadow: `
              0 0 30px rgba(0, 191, 255, 0.5),
              0 0 60px rgba(138, 43, 226, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Inner dark background */}
          <div className="bg-background/90 backdrop-blur-sm rounded-[22px] p-4 md:p-6">
            {/* Product Image */}
            <img
              src={productImage}
              alt="Premium Cognitive Enhancement Supplement"
              className="w-full max-w-[320px] md:max-w-[400px] h-auto object-contain mx-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))',
              }}
            />
          </div>
        </div>
        
        {/* Subtle animated pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.2), rgba(138, 43, 226, 0.2))',
            filter: 'blur(30px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
