import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  return (
    <div className="relative bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Transform Your B2B Sales Pipeline with Data-Driven Lead Generation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-8"
          >
            Connect with decision-makers, accelerate your sales cycle, and drive sustainable business growth through our proven lead generation strategies.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button 
              size="lg"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              Schedule a Consultation
            </Button>
            <Button size="lg" variant="outline">
              Explore Solutions
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated background shape */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.svg
          className="absolute right-0 top-0 h-full text-blue-500/10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M0 0 L100 0 L100 100 L0 0"
            fill="currentColor"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}