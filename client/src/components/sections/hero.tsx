import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock } from "lucide-react";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900/90" />

        {/* Enhanced radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-primary/30 to-transparent" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />

        {/* Top right animated blob */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Bottom left animated blob */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-primary/30 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45],
              opacity: [0.7, 0.4, 0.7]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional animated elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32">
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-40 h-40">
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="text-sm font-medium">Trusted by Enterprise Leaders</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white to-primary/90 bg-clip-text text-transparent"
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
              className="group relative overflow-hidden bg-primary hover:bg-primary/90"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shine_2s_ease-in-out_infinite] -translate-x-full" />
              <span className="relative flex items-center">
                Schedule a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors border-white/20 hover:border-white/40"
              onClick={() => window.location.href = '/services'}
            >
              Explore Solutions
            </Button>
          </motion.div>

          {/* Enhanced Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { icon: Target, metric: "4-5x", label: "More Cost-Efficient" },
              { icon: Shield, metric: "100%", label: "GDPR Compliant" },
              { icon: Clock, metric: "24/7", label: "Lead Generation" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3 bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="p-2 bg-primary/30 rounded-lg group-hover:bg-primary/40 transition-colors">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{benefit.metric}</div>
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">{benefit.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}