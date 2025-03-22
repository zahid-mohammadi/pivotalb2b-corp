import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart, Users, Database, PieChart, TrendingUp } from "lucide-react";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  return (
    <div className="relative bg-[#14213d] text-white overflow-hidden">
      {/* Simplified animated background */}
      <div className="absolute inset-0">
        {/* Base gradient layer - using a different color palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14213d] via-[#14213d]/90 to-[#14213d]" />
        
        {/* Main background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FCA311]/30 via-transparent to-[#FCA311]/10"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* B2B marketing themed elements */}
        <div className="absolute inset-0">
          {/* Data-driven graph elements */}
          <div className="absolute inset-y-0 right-0 w-1/2">
            {/* Animated bar chart that represents lead generation metrics */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`bar-${i}`}
                className="absolute w-6 bg-gradient-to-t from-[#E5E5E5] to-[#FCA311] rounded-t-lg shadow-md"
                style={{
                  height: `${(i + 1) * 25 + 10}px`,
                  bottom: '30%',
                  right: `${30 + i * 8}%`,
                }}
                animate={{
                  height: [`${(i + 1) * 25 + 10}px`, `${(i + 1) * 25 + 40}px`, `${(i + 1) * 25 + 10}px`],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FCA311] rounded-full animate-ping" />
              </motion.div>
            ))}

            {/* Growth trend line animation */}
            <motion.svg
              className="absolute right-[25%] top-[35%] w-48 h-24"
              viewBox="0 0 100 50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.path
                d="M0,50 L20,45 L40,35 L60,20 L80,10 L100,5"
                fill="none"
                stroke="#FCA311"
                strokeWidth="2"
                strokeDasharray="1, 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5,
                }}
              />
              {/* Data points on the trend line */}
              {[0, 20, 40, 60, 80, 100].map((x, i) => {
                const y = i === 0 ? 50 : i === 1 ? 45 : i === 2 ? 35 : i === 3 ? 20 : i === 4 ? 10 : 5;
                return (
                  <motion.circle
                    key={`point-${i}`}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#FCA311"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: i * 0.4,
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                  />
                );
              })}
            </motion.svg>
          </div>

          {/* Connection network dots (representing B2B network) */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => {
              const x = 15 + (i % 4) * 20;
              const y = 15 + Math.floor(i / 4) * 25;
              return (
                <motion.div
                  key={`node-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-[#E5E5E5]"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              );
            })}
            
            {/* Connection lines between nodes */}
            {[...Array(8)].map((_, i) => {
              const fromNode = i % 12;
              const toNode = (fromNode + 1 + i) % 12;
              const fromX = 15 + (fromNode % 4) * 20;
              const fromY = 15 + Math.floor(fromNode / 4) * 25;
              const toX = 15 + (toNode % 4) * 20;
              const toY = 15 + Math.floor(toNode / 4) * 25;
              
              return (
                <motion.svg
                  key={`connection-${i}`}
                  className="absolute left-0 top-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <line
                    x1={`${fromX}%`}
                    y1={`${fromY}%`}
                    x2={`${toX}%`}
                    y2={`${toY}%`}
                    stroke="#E5E5E5"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                </motion.svg>
              );
            })}
          </div>

          {/* Floating B2B marketing icons */}
          {[
            { Icon: PieChart, top: '15%', left: '75%' },
            { Icon: Users, top: '50%', left: '80%' },
            { Icon: Database, top: '70%', left: '70%' },
            { Icon: TrendingUp, top: '25%', left: '65%' }
          ].map((item, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-[#FCA311]/60"
              style={{
                top: item.top,
                left: item.left,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <item.Icon size={24} />
            </motion.div>
          ))}

          {/* Simplified grid overlay to represent data organization */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        </div>

        {/* Bottom light effect for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14213d] to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 border border-[#FCA311]/30 hover:border-[#FCA311]/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FCA311] animate-pulse" />
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
              className="shadow-lg group relative overflow-hidden bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#14213d]"
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
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border-white/30 hover:border-[#FCA311]/60 text-white"
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#FCA311]/40 to-[#FCA311]/20 rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                <div className="relative flex items-center gap-3 bg-[#14213d]/90 rounded-xl p-6 backdrop-blur-sm border border-white/20 group-hover:border-[#FCA311]/40 transition-all">
                  <div className="p-2 bg-[#FCA311]/80 rounded-lg group-hover:bg-[#FCA311] transition-colors">
                    <benefit.icon className="h-6 w-6 text-[#14213d]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white group-hover:text-[#FCA311] transition-colors">{benefit.metric}</div>
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