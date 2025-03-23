import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  CheckCircle, 
  ArrowRight, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  BarChart3, 
  ChevronRight,
  Search,
  BriefcaseBusiness, 
  LineChart,
  Hexagon,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";

export function Approach() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Discover",
      subtitle: "Strategic Targeting",
      description: "Identify your perfect buyers with smart data analytics and advanced filters at the account and persona levels. We define your Ideal Customer Profile (ICP) and pinpoint high-value decision-makers who are actively looking for solutions like yours, guaranteeing top-quality outreach.",
      color: "#4F46E5", // indigo-600
      highlightColor: "text-indigo-600 dark:text-indigo-400",
      benefit: "Eliminate wasted spend on unqualified leads and focus resources on prospects primed to convert.",
      keyPoints: []
    },
    {
      icon: ContentEngagementIcon,
      title: "Engage",
      subtitle: "Hyper-Targeted Campaigns",
      description: "Provide tailored content, multi-channel engagement, and account-focused campaigns that address buyer challenges directly. From whitepapers and eBooks to webinars, we deliver messages that resonate and generate more informed leads",
      color: "#8B5CF6", // violet-500
      highlightColor: "text-violet-600 dark:text-violet-400",
      benefit: "Turn cold prospects into engaged buyers by meeting them where they are, with content they need.",
      keyPoints: []
    },
    {
      icon: ScaleGrowthIcon,
      title: "Convert",
      subtitle: "Revenue-Driven Execution",
      description: "Prioritize hot leads using BANT qualification and arm sales teams with real-time insights. Our automated workflows ensure seamless marketing-to-sales handoffs, maintaining momentum until close.",
      color: "#EC4899", // pink-500
      highlightColor: "text-pink-600 dark:text-pink-400",
      benefit: "Shorten sales cycles, reduce leakage, and turn pipelines into predictable growth engines.",
      keyPoints: [
        { icon: TrendingUp, text: "Sales velocity acceleration" },
        { icon: Zap, text: "Automated qualification workflows" },
        { icon: BarChart3, text: "Real-time performance analytics" }
      ]
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="heroglow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="30" fill="url(#heroglow)" opacity="0.4">
            <motion.animate
              attributeName="cy"
              values="20;25;20"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="70" r="30" fill="url(#heroglow)" opacity="0.2">
            <motion.animate
              attributeName="cx"
              values="80;75;80"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1, 0.8],
                rotate: 360,
              }}
              transition={{ 
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Hexagon className="w-12 h-12 stroke-primary/10 fill-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Title Section */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          {/* Elegant Header */}
          <motion.div 
            className="relative inline-flex flex-col items-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-4" />
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight">
              Our Approach to Building Winning Sales Pipelines
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mt-4" />
          </motion.div>

          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We don't just generate leads—we build sales pipelines that convert. Our proven process ensures 
            laser-focused targeting, engagement-optimized touchpoints, and revenue-ready conversions.
          </motion.p>
        </motion.div>

        {/* ZigZag Flow */}
        <div className="relative mx-auto max-w-7xl">
          {/* Connecting ZigZag Line - Desktop Only */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none">
            <svg width="100%" height="700" className="absolute top-0 left-0">
              {/* Main Connecting Path - Complete zigzag through all steps */}
              <motion.path 
                d="M 200,110 
                   C 280,110 320,110 400,110 
                   L 600,110 
                   C 680,110 720,250 800,250 
                   L 1000,250 
                   C 1080,250 1120,390 1200,390"
                stroke="url(#zigzagGradient)" 
                strokeWidth="3" 
                fill="none"
                strokeDasharray="6,6"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.5 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Animated Particles Following the Path */}
              {[...Array(6)].map((_, i) => {
                // Offset positions for particle flow
                const positions = [
                  { x: 200, y: 110 },   // Starting point at node 1
                  { x: 400, y: 110 },   // Mid-point to node 1
                  { x: 600, y: 110 },   // End of first horizontal section
                  { x: 700, y: 180 },   // Curve down to node 2
                  { x: 800, y: 250 },   // At node 2
                  { x: 900, y: 250 },   // After node 2
                  { x: 1000, y: 250 },  // Mid-point to node 3
                  { x: 1100, y: 320 },  // Curve down to node 3
                  { x: 1200, y: 390 }   // At node 3
                ];

                return (
                  <motion.circle
                    key={i}
                    r="6"
                    fill="url(#glowCircle)"
                    filter="url(#glow)"
                    initial={{ 
                      x: positions[0].x,
                      y: positions[0].y,
                      opacity: 0
                    }}
                    animate={{ 
                      x: positions.map(p => p.x),
                      y: positions.map(p => p.y),
                      opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0]
                    }}
                    transition={{
                      duration: 10,
                      times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                      delay: i * 1.7,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}

              {/* Pulsing Glow Effect Along the Path */}
              <motion.path 
                d="M 200,110 
                   C 280,110 320,110 400,110 
                   L 600,110 
                   C 680,110 720,250 800,250 
                   L 1000,250 
                   C 1080,250 1120,390 1200,390"
                stroke="url(#pulseGradient)" 
                strokeWidth="6" 
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0], 
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />

              <defs>
                <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>

                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5">
                    <animate attributeName="stop-color" 
                      values="#4F46E5; #8B5CF6; #EC4899; #4F46E5" 
                      dur="4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#EC4899">
                    <animate attributeName="stop-color" 
                      values="#EC4899; #4F46E5; #8B5CF6; #EC4899" 
                      dur="4s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>

                <radialGradient id="glowCircle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </radialGradient>

                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>

            {/* Vertical animated connectors for mobile view only */}
            <div className="block lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
              {/* Base gradient line */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-40" />

              {/* Animated pulse */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                initial={{ scaleY: 0, opacity: 0, originY: 0 }}
                animate={{ 
                  scaleY: [0, 1, 0], 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />

              {/* Animated dots moving down the line */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-white shadow-lg left-1/2 -translate-x-1/2 z-10"
                  style={{ 
                    boxShadow: `0 0 10px 2px ${i === 0 ? '#4F46E5' : i === 1 ? '#8B5CF6' : '#EC4899'}`
                  }}
                  initial={{ top: "-5%", opacity: 0 }}
                  animate={{ 
                    top: ["0%", "100%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    delay: i * 2.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative space-y-28 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 
                    ? "lg:flex-row-reverse lg:text-right lg:justify-start" 
                    : "lg:flex-row lg:text-left lg:justify-end"
                } gap-8`}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      when: "beforeChildren",
                      staggerChildren: 0.2,
                      delayChildren: index * 0.1
                    }
                  }
                }}
              >
                {/* Step Node Circle with Number */}
                <motion.div 
                  className={`absolute lg:static top-0 ${index % 2 === 0 ? "left-0" : "right-0"} lg:mx-0 z-20`}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center relative"
                    style={{ backgroundColor: step.color }}
                    initial={{ boxShadow: `0 0 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.4)` }}
                    animate={{ 
                      boxShadow: [
                        `0 0 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.4)`,
                        `0 0 20px rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.6)`,
                        `0 0 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.4)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-2xl font-bold">{index + 1}</span>

                    {/* Animated ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Direction Arrow - Only on desktop */}
                    {index < steps.length - 1 && (
                      <motion.div 
                        className="hidden lg:flex absolute -bottom-16 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {index % 2 === 0 ? (
                          <ArrowDownRight className="w-8 h-8 text-slate-400" />
                        ) : (
                          <ArrowUpRight className="w-8 h-8 text-slate-400" />
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* Step Content Card */}
                <motion.div 
                  className={`w-full lg:w-5/12 mt-10 lg:mt-0 ${index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"}`}
                  variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                >
                  <motion.div
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-800 transform-gpu relative"
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Color Band at Top */}
                    <div className="h-2" style={{ backgroundColor: step.color }} />

                    <div className="p-8">
                      {/* Title and Subtitle */}
                      <div className={`flex items-start gap-4 mb-6 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                        <div 
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{ backgroundColor: `${step.color}15` }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                          >
                            <step.icon />
                          </motion.div>
                        </div>
                        <div className={`${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                          <h3 className="text-2xl font-bold mb-1" style={{ color: step.color }}>
                            {step.title}
                          </h3>
                          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-muted-foreground leading-relaxed mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                        {step.description}
                      </p>

                      {/* Key Features in Cards */}
                      <div className="space-y-3">
                        {step.keyPoints.map((point, i) => (
                          <motion.div 
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 ${
                              index % 2 === 0 ? "lg:flex-row-reverse" : ""
                            }`}
                            initial={{ x: index % 2 === 0 ? 10 : -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                          >
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${step.color}15` }}>
                              <point.icon className="h-4 w-4" style={{ color: step.color }} />
                            </div>
                            <p className={`text-sm font-medium ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                              {point.text}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Benefit Tag */}
                      <div className="mt-6 flex items-center">
                        <div className="flex-1 border-t border-slate-100 dark:border-slate-800" />
                        <motion.div 
                          className="mx-4 flex items-center px-4 py-1 rounded-full"
                          style={{ backgroundColor: `${step.color}15` }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" style={{ color: step.color }} />
                          <p className="text-xs font-medium" style={{ color: step.color }}>
                            {step.benefit}
                          </p>
                        </motion.div>
                        <div className="flex-1 border-t border-slate-100 dark:border-slate-800" />
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div 
                      className={`absolute -z-10 w-40 h-40 rounded-full ${index % 2 === 0 ? "-top-20 -right-20" : "-top-20 -left-20"}`}
                      style={{ 
                        background: `radial-gradient(circle, ${step.color}15 0%, transparent 70%)` 
                      }}
                    />
                    <div 
                      className={`absolute -z-10 w-40 h-40 rounded-full ${index % 2 === 0 ? "-bottom-20 -left-20" : "-bottom-20 -right-20"}`}
                      style={{ 
                        background: `radial-gradient(circle, ${step.color}10 0%, transparent 70%)` 
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results Section with elegant cards */}
        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Proven Results That Speak for Themselves
            </span>
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "25%", label: "Pipeline Efficiency", icon: Zap, color: "#4F46E5" },
              { value: "2.5x", label: "Lead Quality Improvement", icon: Target, color: "#8B5CF6" },
              { value: "45%", label: "Cost per Lead Reduction", icon: TrendingUp, color: "#A855F7" },
              { value: "99%", label: "Sales Acceptance Rate", icon: CheckCircle, color: "#EC4899" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                  {/* Stat Header */}
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: stat.color }}
                  />

                  <div className="p-6 md:p-8 flex flex-col items-center">
                    {/* Icon in Circle */}
                    <div 
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 border-2"
                      style={{ 
                        backgroundColor: `${stat.color}10`, 
                        borderColor: stat.color 
                      }}
                    >
                      <stat.icon style={{ color: stat.color }} className="h-7 w-7" />
                    </div>

                    {/* Value with gradient */}
                    <motion.div
                      className="mb-2 relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      <h4 
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </h4>
                    </motion.div>

                    {/* Label */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

        {/* How It All Connects Section */}
        <div className="text-center mt-16" id="how-it-connects"> {/* Added id for smooth scrolling */}
          <h3 className="text-2xl font-bold mb-6">How It All Connects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="flex items-center gap-2 justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Laser-Focused</span>
              </div>
              <p className="text-muted-foreground">Target only those ready to buy</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Engagement-Optimized</span>
              </div>
              <p className="text-muted-foreground">Deliver value at every touchpoint</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Revenue-Ready</span>
              </div>
              <p className="text-muted-foreground">Convert leads faster with zero wasted effort</p>
            </div>
          </div>
        </div>