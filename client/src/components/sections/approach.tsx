import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Target, Zap, TrendingUp, Users, MessageSquare, BarChart3 } from "lucide-react";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";

export function Approach() {
  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Discover",
      subtitle: "Strategic Targeting",
      description: "Pinpoint your ideal buyers using intelligent data analytics, intent signals, and technographic insights. We map your ICP and identify high-value decision-makers actively seeking solutions like yours—ensuring quality-first outreach.",
      gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
      solidGradient: "from-blue-500 via-indigo-500 to-violet-500",
      highlightColor: "text-blue-600 dark:text-blue-400",
      benefit: "Eliminate wasted spend on unqualified leads and focus resources on prospects primed to convert.",
      keyPoints: [
        { icon: Target, text: "Precision targeting with intent data" },
        { icon: Users, text: "Decision-maker identification" },
        { icon: BarChart3, text: "ICP mapping and verification" }
      ]
    },
    {
      icon: ContentEngagementIcon,
      title: "Engage",
      subtitle: "Hyper-Targeted Campaigns",
      description: "Deliver personalized content, multi-channel outreach, and account-specific campaigns that resonate with buyer pain points. From whitepapers to tailored demos, we synchronize messaging across all platforms.",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      solidGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      highlightColor: "text-violet-600 dark:text-violet-400",
      benefit: "Turn cold prospects into engaged buyers by meeting them where they are, with content they need.",
      keyPoints: [
        { icon: MessageSquare, text: "Personalized messaging strategy" },
        { icon: Zap, text: "Multi-channel synchronized outreach" },
        { icon: Target, text: "Pain point-focused content" }
      ]
    },
    {
      icon: ScaleGrowthIcon,
      title: "Convert",
      subtitle: "Revenue-Driven Execution",
      description: "Prioritize hot leads using BANT qualification and arm sales teams with real-time insights. Our automated workflows ensure seamless marketing-to-sales handoffs, maintaining momentum until close.",
      gradient: "from-fuchsia-500/20 via-pink-500/20 to-rose-500/20",
      solidGradient: "from-fuchsia-500 via-pink-500 to-rose-500",
      highlightColor: "text-fuchsia-600 dark:text-fuchsia-400",
      benefit: "Shorten sales cycles, reduce leakage, and turn pipelines into predictable growth engines.",
      keyPoints: [
        { icon: TrendingUp, text: "Sales velocity acceleration" },
        { icon: Zap, text: "Automated qualification workflows" },
        { icon: BarChart3, text: "Real-time performance analytics" }
      ]
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        {/* Dynamic animated shapes */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0.7, 1, 0.7], 
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{ 
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          {/* Enhanced heading with animated underline */}
          <div className="relative inline-block mb-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Our Approach to Building Winning Sales Pipelines
            </h2>
            <motion.div 
              className="absolute -bottom-3 left-1/2 h-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-full"
              initial={{ width: "0%", x: "-50%" }}
              whileInView={{ width: "40%", x: "-50%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-xl text-muted-foreground">
            We don't just generate leads—we build sales pipelines that convert. Our proven process ensures laser-focused targeting, 
            engagement-optimized touchpoints, and revenue-ready conversions that transform prospects into predictable growth.
          </p>
        </motion.div>

        {/* 3-Step Process - Reimagined with connecting paths */}
        <div className="relative max-w-6xl mx-auto mb-24 z-10">
          {/* Connecting Path - A curved line connecting all steps */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2">
            <svg width="100%" height="30" className="absolute top-1/2 left-0 -translate-y-1/2">
              <motion.path 
                d="M0,15 Q150,-20 300,15 Q450,50 600,15 Q750,-20 900,15 Q1050,50 1200,15"
                stroke="url(#pathGradient)" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y1="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
                className="relative flex flex-col items-center"
              >
                {/* Pulsing Step Number Circle with 3D effect */}
                <motion.div 
                  className={`absolute -top-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.solidGradient} z-10 flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  whileInView={{
                    boxShadow: [
                      "0 10px 15px -3px rgba(0,0,0,0.1)",
                      "0 20px 25px -5px rgba(0,0,0,0.1)",
                      "0 10px 15px -3px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    repeatType: "reverse" 
                  }}
                >
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                  {/* Animated ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </motion.div>

                {/* Step Card with enhanced 3D hover effect */}
                <div className="w-full relative pt-12">
                  <motion.div
                    className="relative w-full h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xl group border border-transparent hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card Background with interactive effect */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      whileHover={{ 
                        background: [
                          `linear-gradient(to bottom right, ${step.gradient.replace(/\/\d+/g, "/5")})`,
                          `linear-gradient(to bottom right, ${step.gradient.replace(/\/\d+/g, "/20")})`
                        ] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />

                    <div className="p-8 relative z-10">
                      {/* Icon with floating animation */}
                      <motion.div 
                        className="mb-6 flex justify-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut" 
                        }}
                      >
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} p-5 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 shadow-md`}>
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                            <step.icon />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Title with gradient highlight effect */}
                      <div className="text-center mb-4">
                        <h3 className={`text-3xl font-bold mb-1 bg-gradient-to-r ${step.solidGradient} text-transparent bg-clip-text`}>
                          {step.title}
                        </h3>
                        <p className={`text-lg font-medium ${step.highlightColor}`}>
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Description with a subtle card effect */}
                      <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm shadow-sm mb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Key Points with animated icons */}
                      <div className="space-y-3">
                        {step.keyPoints.map((point, i) => (
                          <motion.div 
                            key={i}
                            className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg shadow-sm"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                              className={`p-2 rounded-full bg-gradient-to-br ${step.solidGradient}`}
                            >
                              <point.icon className="h-4 w-4 text-white" />
                            </motion.div>
                            <p className="text-sm font-medium">{point.text}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Benefit highlight */}
                      <motion.div 
                        className="mt-6 p-4 border-t border-primary/10 text-center"
                        whileHover={{ y: -3 }}
                      >
                        <p className="text-sm font-medium text-primary">
                          {step.benefit}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Next step arrow (except for the last step) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute -right-6 top-1/2 -translate-y-1/2 md:block hidden z-20"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="bg-white dark:bg-slate-800 w-10 h-10 rounded-full shadow-md flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results Section with enhanced interactive metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Proven Results That Speak for Themselves
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "25%", label: "Pipeline Efficiency", icon: Zap },
              { value: "2.5x", label: "Lead Quality Improvement", icon: Target },
              { value: "45%", label: "Cost per Lead Reduction", icon: TrendingUp },
              { value: "99%", label: "Sales Acceptance Rate", icon: CheckCircle }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg h-full">
                  {/* Gradient background that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="mb-3 mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <stat.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  
                  {/* Value with counter animation */}
                  <motion.p 
                    className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text mb-2"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
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