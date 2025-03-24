import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart, Users, Database, PieChart, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  // Purple-to-pink gradient color palette to match "Our Approach" section
  const primaryColor = "rgb(var(--primary))"; // Primary color from CSS variables
  const purpleColor = "#9333EA"; // purple-600
  const pinkColor = "#DB2777"; // pink-600

  const isMobile = useIsMobile();
  
  return (
    <div className="relative bg-[#14213d] text-white overflow-hidden">
      {/* Simplified animated background */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14213d] via-[#14213d]/90 to-[#14213d]" />

        {/* Main background gradient animation matching "Our Approach" colors */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/30 via-transparent to-[#DB2777]/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Simplified B2B marketing background elements */}
        {!isMobile && (
          <div className="absolute inset-0">
            {/* Static background elements for better performance */}
            <div className="absolute inset-0 bg-[url('/marketing-background.svg')] opacity-[0.07]" />
            
            {/* Static grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          </div>
        )}

        {/* Bottom light effect for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14213d] to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative">
        <div className="max-w-4xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 border border-purple-600/30 hover:border-pink-600/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-pulse" />
            <span className="text-sm text-white/90">Trusted by B2B Leaders to Build High-Performing Sales Pipelines</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Precision Demand Generation: Discover, Engage & Convert Ideal Buyers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed"
          >
            Pivotal B2B harnesses precision demand generation to identify high-intent buyers, engage them with targeted campaigns and convert leads into revenue—powered by smarter data insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="shadow-lg group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 text-white"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shine_2s_ease-in-out_infinite] -translate-x-full" />
              <span className="relative flex items-center font-semibold">
                Schedule a Strategy Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border-white/30 hover:border-purple-600/60 text-white"
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
              { icon: Target, metric: "2-3x", label: "More Cost-Efficient" },
              { icon: Shield, metric: "100%", label: "GDPR, CCPA, CASL Compliance" },
              { icon: Clock, metric: "24/7", label: "Lead Generation Engine" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/20 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                <div className="relative flex items-center gap-3 bg-[#14213d]/90 rounded-xl p-6 backdrop-blur-sm border border-white/20 group-hover:border-purple-600/40 transition-all">
                  <div className="p-2 bg-gradient-to-r from-primary via-purple-600/80 to-pink-600/80 rounded-lg group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 transition-colors">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 transition-colors">{benefit.metric}</div>
                    <div className="text-sm text-white/80 group-hover:text-white transition-colors">{benefit.label}</div>
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