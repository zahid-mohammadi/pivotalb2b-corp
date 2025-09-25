import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
} from "lucide-react";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";
import { cn } from "@/lib/utils";

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Find",
      subtitle: "Your Ideal Buyers",
      description:
"Is your sales team chasing prospects without authority or budget? We cut the noise by identifying companies with live buying signals, approved budgets, and decision-makers who matter—so your team focuses only on opportunities that can convert.",
      color: "#4F46E5",
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      benefit: "Eliminate wasted outreach. Target only real buyers.",
      metric: "3x Higher Quality",
      tools: ["Intent Monitoring", "BANT Verification", "Account Mapping"]
    },
    {
      icon: ContentEngagementIcon,
      title: "Engage",
      subtitle: "With Authority",
      description:
"If prospects disengage, it's rarely about interest—it's about value. We elevate your brand as a trusted advisor by delivering insight-driven content that speaks directly to buyer pain points, keeping you top-of-mind until they're ready to act.",
      color: "#8B5CF6",
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      benefit: "Build trust and win preference—without competing on price.",
      metric: "85% Response Rate",
      tools: ["Content Strategy", "Multi-Channel", "Thought Leadership"]
    },
    {
      icon: ScaleGrowthIcon,
      title: "Close",
      subtitle: "Deals That Move the Needle",
      description:
"When revenue stalls, the problem isn't sales effort—it's lead quality. Our pre-qualified leads meet strict BANT criteria so your sales team focuses only on deals worth closing.",
      color: "#EC4899",
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      benefit: "Higher close rates, shorter cycles, consistent quota achievement.",
      metric: "40% Faster Cycles",
      tools: ["Pipeline Review", "Deal Coaching", "Revenue Ops"]
    },
  ];

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <div 
        className="container relative mx-auto px-4 max-w-7xl z-10" 
        ref={containerRef}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 border border-indigo-200 dark:border-indigo-800">
            <Lightbulb className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 tracking-wide">OUR REVENUE PROCESS</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight mb-8">
            From Prospects to Pipeline to Profit
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Our systematic approach transforms your marketing spend into measurable revenue outcomes through targeted precision.
          </p>
        </motion.div>

        {/* Interactive Revenue Dashboard */}
        <div className="relative">
          {/* Main Pipeline Container */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 p-8 md:p-12 shadow-2xl">
            
            {/* Pipeline Flow Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Revenue Pipeline Control Center</h3>
                <p className="text-slate-600 dark:text-slate-400">Watch your leads transform into revenue</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {steps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      activeStep === index ? "bg-indigo-500 scale-125" : "bg-slate-300 dark:bg-slate-600"
                    )}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Process Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "relative cursor-pointer group",
                    activeStep === index ? "z-20" : "z-10"
                  )}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-0">
                      <motion.div
                        className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500"
                        animate={{
                          background: activeStep >= index 
                            ? "linear-gradient(to right, #4F46E5, #8B5CF6)" 
                            : "linear-gradient(to right, #cbd5e1, #94a3b8)"
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: step.color }}
                        animate={{
                          scale: activeStep >= index ? [1, 1.5, 1] : 1,
                          opacity: activeStep >= index ? [1, 0.7, 1] : 0.3
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  )}

                  {/* Process Card */}
                  <div
                    className={cn(
                      "relative rounded-2xl border-2 transition-all duration-500 overflow-hidden",
                      activeStep === index 
                        ? "border-indigo-500 shadow-2xl transform scale-105" 
                        : "border-slate-200 dark:border-slate-700 shadow-lg hover:border-slate-300"
                    )}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className={cn("absolute inset-0 bg-gradient-to-br", step.bgGradient)}
                      animate={{
                        opacity: activeStep === index ? 0.1 : 0.05
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Card Content */}
                    <div className="relative p-6">
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
                            `bg-gradient-to-r ${step.gradient}`
                          )}
                          animate={{
                            scale: activeStep === index ? [1, 1.1, 1] : 1,
                            rotate: activeStep === index ? [0, 5, -5, 0] : 0
                          }}
                          transition={{ 
                            duration: activeStep === index ? 2 : 0.5,
                            repeat: activeStep === index ? Infinity : 0
                          }}
                        >
                          {index + 1}
                        </motion.div>
                        
                        <motion.div
                          className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50"
                          animate={{ rotate: activeStep === index ? 360 : 0 }}
                          transition={{ duration: 2, repeat: activeStep === index ? Infinity : 0, ease: "linear" }}
                        >
                          <step.icon />
                        </motion.div>
                      </div>

                      {/* Title & Metric */}
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                          {step.subtitle}
                        </p>
                        <motion.div
                          className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold",
                            activeStep === index 
                              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          )}
                          animate={{
                            scale: activeStep === index ? [1, 1.05, 1] : 1
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🎯 {step.metric}
                        </motion.div>
                      </div>

                      {/* Tools List */}
                      <div className="space-y-2">
                        {step.tools.map((tool, toolIndex) => (
                          <motion.div
                            key={toolIndex}
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: activeStep === index ? 1 : 0.6,
                              x: 0 
                            }}
                            transition={{ 
                              duration: 0.3, 
                              delay: activeStep === index ? toolIndex * 0.1 : 0 
                            }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700 dark:text-slate-300">{tool}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className={cn("h-full bg-gradient-to-r", step.gradient)}
                        animate={{
                          width: activeStep === index ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Step Details */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {steps[activeStep].title}: {steps[activeStep].subtitle}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {steps[activeStep].description}
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {steps[activeStep].benefit}
                    </p>
                  </div>
                </div>
                
                {/* Visual Representation */}
                <div className="flex items-center justify-center">
                  <motion.div
                    className="relative w-48 h-48"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full border-4 border-dashed",
                        activeStep === 0 ? "border-indigo-300" : activeStep === 1 ? "border-violet-300" : "border-pink-300"
                      )}
                    />
                    <motion.div
                      className={cn(
                        "absolute inset-4 rounded-full flex items-center justify-center bg-gradient-to-br",
                        steps[activeStep].bgGradient
                      )}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Render active step icon */}
                      {(() => {
                        const ActiveIcon = steps[activeStep].icon;
                        return (
                          <div className="w-16 h-16 flex items-center justify-center" style={{ color: steps[activeStep].color }}>
                            <ActiveIcon />
                          </div>
                        );
                      })()}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Special Animations for each Step
function DiscoverAnimation() {
  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-dashed border-indigo-200 dark:border-indigo-900"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-4 rounded-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-950 dark:to-slate-900 opacity-80" />
      
        <div className="w-2/3 h-2/3 relative grid grid-cols-2 grid-rows-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="bg-indigo-500/20 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: i
              }}
            >
              <div className="w-4 h-4 rounded-full bg-indigo-500" />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center z-10"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(79, 70, 229, 0)",
              "0 0 0 15px rgba(79, 70, 229, 0.3)",
              "0 0 0 0 rgba(79, 70, 229, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Target className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function EngageAnimation() {
  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-dashed border-violet-200 dark:border-violet-900"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-4 rounded-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-white dark:from-violet-950 dark:to-slate-900 opacity-80" />
      
        <div className="w-2/3 aspect-video relative">
          {/* Messages floating around */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-8 bg-violet-500/20 rounded-lg border border-violet-500/30"
              style={{
                top: `${25 * i}%`,
                left: i % 2 === 0 ? "0%" : "auto",
                right: i % 2 === 0 ? "auto" : "0%",
              }}
              animate={{ 
                x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                delay: i * 0.5,
                repeat: Infinity
              }}
            />
          ))}
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ContentEngagementIcon />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ConvertAnimation() {
  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-dashed border-pink-200 dark:border-pink-900"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-4 rounded-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-white dark:from-pink-950 dark:to-slate-900 opacity-80" />
      
        <div className="relative w-2/3 aspect-square flex items-center justify-center">
          {/* Growth Bars */}
          <div className="absolute bottom-0 w-full flex items-end justify-center gap-3 px-4">
            {[40, 60, 80, 100].map((height, i) => (
              <motion.div
                key={i}
                className="w-1/4 bg-pink-500/20 rounded-t-lg"
                style={{ height: 0 }}
                animate={{ height: `${height}%` }}
                initial={{ height: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 3
                }}
              >
                <motion.div 
                  className="h-2 w-full bg-pink-500 rounded-t-lg"
                  animate={{ 
                    backgroundColor: ["#EC4899", "#8B5CF6", "#EC4899"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="absolute top-0 right-0 w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center"
            animate={{ 
              y: [0, 10, 0],
              boxShadow: [
                "0 0 0 0 rgba(236, 72, 153, 0)",
                "0 0 0 15px rgba(236, 72, 153, 0.3)",
                "0 0 0 0 rgba(236, 72, 153, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}