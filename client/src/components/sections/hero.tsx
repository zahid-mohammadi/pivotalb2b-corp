import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart, Users, Database, PieChart, TrendingUp, CheckCircle } from "lucide-react";
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

        {/* B2B marketing themed elements - only on non-mobile */}
        {!isMobile && (
          <div className="absolute inset-0">
            {/* Data-driven graph elements */}
            <div className="absolute inset-y-0 right-0 w-1/2">
              {/* Animated bar chart that represents lead generation metrics */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`bar-${i}`}
                  className="absolute w-6 bg-gradient-to-t from-[#E5E5E5] to-[#9333EA] rounded-t-lg shadow-md"
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
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#DB2777] rounded-full animate-ping" />
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
                  stroke="url(#gradientPath)"
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
                <defs>
                  <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={primaryColor} />
                    <stop offset="50%" stopColor={purpleColor} />
                    <stop offset="100%" stopColor={pinkColor} />
                  </linearGradient>
                </defs>

                {/* Data points on the trend line */}
                {[0, 20, 40, 60, 80, 100].map((x, i) => {
                  const y = i === 0 ? 50 : i === 1 ? 45 : i === 2 ? 35 : i === 3 ? 20 : i === 4 ? 10 : 5;

                  return (
                    <motion.circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="2"
                      fill={i < 2 ? primaryColor : i < 4 ? purpleColor : pinkColor}
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
                    className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-[#9333EA]' : 'bg-[#DB2777]'}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      opacity: 0.7,
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

              {/* Connection lines between nodes - reduced for performance */}
              {[...Array(4)].map((_, i) => {
                const fromNode = i % 12;
                const toNode = (fromNode + 1 + i) % 12;
                const fromX = 15 + (fromNode % 4) * 20;
                const fromY = 15 + Math.floor(fromNode / 4) * 25;
                const toX = 15 + (toNode % 4) * 20;
                const toY = 15 + Math.floor(toNode / 4) * 25;
                const lineColor = i % 3 === 0 ? primaryColor : i % 3 === 1 ? purpleColor : pinkColor;

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
                      stroke={lineColor}
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                  </motion.svg>
                );
              })}
            </div>

            {/* Floating B2B marketing icons - reduced for mobile */}
            {[
              { Icon: PieChart, top: '15%', left: '75%', color: primaryColor },
              { Icon: TrendingUp, top: '25%', left: '65%', color: pinkColor }
            ].map((item, i) => (
              <motion.div
                key={`icon-${i}`}
                className="absolute"
                style={{
                  top: item.top,
                  left: item.left,
                  color: item.color,
                  opacity: 0.6,
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
            <span className="text-sm text-white/90">Stop Losing Revenue to Poor Lead Quality</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Turn Every Marketing Dollar Into <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">Predictable Revenue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed"
          >
When measurable results matter, lead quality is everything. We identify your ideal buyer profile, connect with them through content that builds trust, and deliver decision-ready prospects actively evaluating solutions like yours—guaranteed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Button
              size="lg"
              className="shadow-lg group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 text-white text-lg px-8 py-4"
              onClick={() => window.open(calendlyUrl, '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shine_2s_ease-in-out_infinite] -translate-x-full" />
              <span className="relative flex items-center font-semibold">
                Request Your Free Revenue Audit
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border-white/30 hover:border-purple-600/60 text-white text-lg px-8 py-4"
              onClick={() => window.location.href = '/request-proposal'}
            >
              Explore Case Studies
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-6 mb-12 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>90-day performance guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Campaigns live in 72 hours</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { icon: Target, metric: "3x", label: "Higher Quality Leads", subtitle: "vs traditional providers" },
              { icon: TrendingUp, metric: "$2.5M", label: "Average Client Revenue Impact", subtitle: "(Year 1)" },
              { icon: Clock, metric: "72hrs", label: "To First Qualified Lead", subtitle: "delivered" }
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
                    <div className="text-sm text-white/90 group-hover:text-white transition-colors font-medium">{benefit.label}</div>
                    <div className="text-xs text-white/70 group-hover:text-white/80 transition-colors">{benefit.subtitle}</div>
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