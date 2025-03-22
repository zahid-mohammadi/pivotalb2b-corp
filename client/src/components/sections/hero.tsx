import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart } from "lucide-react";

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

        {/* Business-themed animated patterns */}
        <div className="absolute inset-0">
          {/* Bar chart animation - Moved to right side */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`bar-${i}`}
              className="absolute w-8 bg-gradient-to-t from-primary to-blue-400 rounded-t-lg shadow-lg shadow-primary/20"
              style={{
                height: `${(i + 1) * 40}px`,
                bottom: '20%',
                left: `${60 + i * 10}%`,
              }}
              animate={{
                height: [`${(i + 1) * 40}px`, `${(i + 2) * 40}px`, `${(i + 1) * 40}px`],
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            </motion.div>
          ))}

          {/* Network connection lines - Enhanced visuals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-[3px] w-[300px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#60A5FA' : '#818CF8'}, transparent)`,
                top: `${20 + i * 10}%`,
                left: `${50 + Math.random() * 40}%`,
                transform: `rotate(${-30 + i * 15}deg)`,
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                x: [-100, 100, -100],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Enhanced floating data points */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`point-${i}`}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-primary blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${50 + Math.random() * 50}%`,
                boxShadow: '0 0 15px rgba(96, 165, 250, 0.6)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

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

          {/* Glowing circles for data points */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`glow-point-${i}`}
              className="absolute w-6 h-6"
              style={{
                right: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-primary" />
            </motion.div>
          ))}


          {/* Geometric business shapes - Larger on right side */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute w-[400px] h-[400px]"
              style={{
                border: '4px solid',
                borderColor: 'rgb(var(--primary))',
                borderRadius: i === 0 ? '50%' : i === 1 ? '20%' : '0%',
                top: `${20 + i * 20}%`,
                left: `${40 + i * 25}%`,
              }}
              animate={{
                rotate: [0, 180],
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Enhanced wave effects - Flowing right */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute h-[200%] w-[200%] top-[-50%] left-[-50%]"
              style={{
                background: `conic-gradient(from ${i * 120}deg at 50% 50%, transparent 0deg, ${i === 0 ? 'rgb(var(--primary))' : i === 1 ? '#818CF8' : '#A78BFA'}/70 60deg, transparent 120deg)`,
                transform: 'rotate(90deg)',
              }}
              animate={{
                rotate: [90, 450],
              }}
              transition={{
                duration: 12 + i * 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Pulsing glow effects - Concentrated on right */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: `${20 + i * 15}%`,
              left: `${50 + i * 15}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgb(var(--primary))' : '#818CF8'}/80 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* New right-side flowing effect */}
        <motion.div
          className="absolute right-0 h-full w-1/2 bg-gradient-to-l from-primary/30 via-primary/10 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 h-full w-1/2 overflow-hidden"
          style={{ maskImage: 'linear-gradient(to left, transparent, black)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-primary/40"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl">
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
      </div>
    </div>
  );
}