import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock } from "lucide-react";
import { SalesFunnel } from "@/components/ui/sales-funnel";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  return (
    <div className="relative bg-[#0a0a1a] text-white overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-primary/20 to-[#0a0a1a]" />

        {/* Multiple layered gradient animations */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"
          animate={{
            opacity: [0.7, 0.9, 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-blue-600/80 via-purple-600/70 to-transparent"
          animate={{
            opacity: [0.6, 0.8, 0.6],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Line chart animation */}
        <motion.svg
          className="absolute right-20 top-1/4 w-64 h-32"
          viewBox="0 0 100 50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.path
            d="M0,25 Q25,40 50,20 T100,25"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="rgb(var(--primary))" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm mb-6 border border-white/30 hover:border-white/40 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/90">Trusted by B2B Leaders to Build High-Performing Sales Pipelines</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold mb-6 leading-tight"
            >
              Precision-Targeted Lead Generation That Drives Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-8 leading-relaxed"
            >
              At Pivotal B2B, we specialize in demand generation and compliant lead generation that transforms your sales pipeline into a high-performing engine. Through pinpoint audience targeting, multi-channel engagement, and measurable results, we help you connect with ideal buyers and accelerate revenue growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="shadow-lg group relative overflow-hidden bg-primary hover:bg-primary/90"
                onClick={() => window.open(calendlyUrl, '_blank')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shine_2s_ease-in-out_infinite] -translate-x-full" />
                <span className="relative flex items-center">
                  Schedule a Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors border-white/40 hover:border-white/60"
                onClick={() => window.location.href = '/services'}
              >
                Explore Solutions
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {[
                { icon: Target, metric: "4-5x", label: "More Cost-Efficient" },
                { icon: Shield, metric: "100%", label: "GDPR & Global Compliance" },
                { icon: Clock, metric: "24/7", label: "Lead Generation Engine" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/40 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                  <div className="relative flex items-center gap-3 bg-[#0f0f2a]/80 rounded-xl p-6 backdrop-blur-sm border border-white/30 group-hover:border-white/40 transition-all">
                    <div className="p-2 bg-primary/50 rounded-lg group-hover:bg-primary/60 transition-colors">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{benefit.metric}</div>
                      <div className="text-sm text-white/80 group-hover:text-white transition-colors">{benefit.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Sales Funnel Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative h-full min-h-[600px] flex items-center justify-center"
          >
            <SalesFunnel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}