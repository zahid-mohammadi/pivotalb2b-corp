import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock } from "lucide-react";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  return (
    <div className="relative bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6 leading-tight"
          >
            High-Quality B2B Leads That Build Winning Sales Pipelines
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-8 leading-relaxed"
          >
            At Pivotal B2B, we understand the challenges of scaling B2B sales pipelines. Our mission is to connect you with ideal buyers through precision-targeted lead generation and multi-channel marketing campaigns that deliver measurable results.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg"
              className="group"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/services'}
            >
              Explore Solutions
            </Button>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4-5x</div>
                <div className="text-sm text-slate-400">More Cost-Efficient</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-slate-400">GDPR Compliant</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-slate-400">Lead Generation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced animated background */}
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