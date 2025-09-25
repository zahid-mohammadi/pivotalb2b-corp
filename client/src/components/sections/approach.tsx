import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Target,
  UserCheck,
} from "lucide-react";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";
import { cn } from "@/lib/utils";

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Changed to once: true so animations trigger immediately when visible
  // and increased threshold amount for earlier triggering
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Find",
      subtitle: "Your Ideal Buyers",
      description:
"Is your sales team chasing prospects without authority or budget? We cut the noise by identifying companies with live buying signals, approved budgets, and decision-makers who matter—so your team focuses only on opportunities that can convert.",
      color: "#4F46E5", // indigo-600
      highlightColor: "text-indigo-600 dark:text-indigo-400",
      benefit:
        "Eliminate wasted outreach. Target only real buyers.",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/40",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      gradientFrom: "from-indigo-600",
      gradientTo: "to-violet-600",
    },
    {
      icon: ContentEngagementIcon,
      title: "Engage",
      subtitle: "With Authority",
      description:
"If prospects disengage, it's rarely about interest—it's about value. We elevate your brand as a trusted advisor by delivering insight-driven content that speaks directly to buyer pain points, keeping you top-of-mind until they're ready to act.",
      color: "#8B5CF6", // violet-500
      highlightColor: "text-violet-600 dark:text-violet-400",
      benefit:
        "Build trust and win preference—without competing on price.",
      iconBg: "bg-violet-100 dark:bg-violet-950/40",
      borderColor: "border-violet-200 dark:border-violet-800",
      gradientFrom: "from-violet-600",
      gradientTo: "to-purple-600",
    },
    {
      icon: ScaleGrowthIcon,
      title: "Close",
      subtitle: "Deals That Move the Needle",
      description:
"When revenue stalls, the problem isn't sales effort—it's lead quality. Our pre-qualified leads meet strict BANT criteria so your sales team focuses only on deals worth closing.",
      color: "#EC4899", // pink-500
      highlightColor: "text-pink-600 dark:text-pink-400",
      benefit:
        "Higher close rates, shorter cycles, consistent quota achievement.",
      iconBg: "bg-pink-100 dark:bg-pink-950/40",
      borderColor: "border-pink-200 dark:border-pink-800",
      gradientFrom: "from-purple-600",
      gradientTo: "to-pink-600",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">

      <div 
        className="container relative mx-auto px-4 max-w-6xl z-10 position-relative" 
        ref={containerRef}
        style={{ position: 'relative' }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex flex-col items-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Our Process</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight max-w-4xl mb-6">
              How We Turn Marketing Spend Into Revenue Growth
            </h2>

            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6" />

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
              Stop guessing. Stop hoping. Our proven 3-step system transforms your marketing budget into measurable, repeatable revenue outcomes.
            </p>
          </div>
        </motion.div>

        {/* Modern Vertical Timeline with Connected Nodes */}
        <div className="relative py-10">
          {/* Central Visual Connector - Visible on all screens */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
          </div>

          {/* Timeline Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative flex flex-col md:flex-row md:items-center gap-8 mb-16 md:mb-32 last:mb-0 z-10",
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              )}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
            >
              {/* Central Node */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                  className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-xl font-bold text-white relative"
                  style={{ backgroundColor: step.color }}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: [0.8, 1, 0.8],
                    boxShadow: [
                      `0 0 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0)`,
                      `0 0 30px rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.5)`,
                      `0 0 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '139, 92, 246' : '236, 72, 153'}, 0)`
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {index + 1}
                  
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Content Card */}
              <div className={cn(
                "w-full md:w-5/12 ml-auto md:ml-0 pl-10 md:pl-0",
                index % 2 === 1 ? "md:ml-auto md:text-right" : "md:mr-auto"
              )}>
                <motion.div
                  className={cn(
                    "bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border",
                    step.borderColor
                  )}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card Header with Gradient */}
                  <div className={cn(
                    "p-6 bg-gradient-to-r", 
                    step.gradientFrom, 
                    step.gradientTo
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg", 
                        step.iconBg
                      )}>
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                          }}
                        >
                          <step.icon />
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="text-white text-2xl font-bold">
                          {step.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {step.description}
                    </p>
                    
                    {/* Benefit Tag */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <CheckCircle 
                        className="w-5 h-5 flex-shrink-0" 
                        style={{ color: step.color }} 
                      />
                      <p className="text-sm" style={{ color: step.color }}>
                        <strong>Key Benefit:</strong> {step.benefit}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow connector to next step */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className={cn(
                        "absolute hidden md:block",
                        index % 2 === 0 ? "right-0 bottom-8 translate-x-full" : "left-0 bottom-8 -translate-x-full"
                      )}
                      animate={{ x: index % 2 === 0 ? [10, 20, 10] : [-10, -20, -10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight 
                        className={cn(
                          "w-8 h-8",
                          index === 0 ? "text-indigo-500" : "text-violet-500"
                        )}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>
              
              {/* Process Step Illustration (for medium and larger screens) */}
              <div className={cn(
                "hidden md:block w-5/12 relative",
                index % 2 === 1 ? "mr-auto" : "ml-auto"
              )}>
                <motion.div
                  className={cn(
                    "aspect-square rounded-full flex items-center justify-center",
                    step.iconBg,
                    index % 2 === 1 ? "ml-auto mr-8" : "mr-auto ml-8"
                  )}
                  style={{ width: "75%" }}
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Each step gets a different illustration */}
                  {index === 0 && (
                    <DiscoverAnimation />
                  )}
                  {index === 1 && (
                    <EngageAnimation />
                  )}
                  {index === 2 && (
                    <ConvertAnimation />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Results Overview Cards */}
        <motion.div
          className="mt-20 md:mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Proven Results That Drive Success
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our approach consistently delivers measurable improvements in key pipeline metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "20%",
                label: "Pipeline Efficiency Gains",
                icon: Target,
                color: "#4F46E5",
                delay: 0
              },
              {
                value: "2.5x",
                label: "Lead Quality Improvement",
                icon: UserCheck,
                color: "#8B5CF6",
                delay: 0.1
              },
              {
                value: "45%",
                label: "Lower Cost per Lead",
                icon: ChevronRight,
                color: "#A855F7",
                delay: 0.2
              },
              {
                value: "99%",
                label: "Sales Acceptance",
                icon: CheckCircle,
                color: "#EC4899",
                delay: 0.3
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: stat.color }}
                />
                
                <div className="p-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon style={{ color: stat.color }} className="w-8 h-8" />
                  </div>
                  
                  <motion.h4
                    className="text-4xl font-bold mb-2 text-center"
                    style={{ color: stat.color }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.h4>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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