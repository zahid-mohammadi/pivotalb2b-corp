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
            Transform Your B2B Pipeline with Precision-Targeted Lead Generation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-8"
          >
            Drive sustainable growth with our advanced targeting capabilities, multi-channel campaigns, and transparent, compliant lead generation services that are 4-5x more cost-efficient.
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
              Schedule a Strategy Call
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/services'}
            >
              View Solutions
            </Button>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">4-5x</div>
              <div className="text-sm text-slate-400">More Cost-Efficient</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-slate-400">GDPR Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-slate-400">Lead Generation</div>
            </div>
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