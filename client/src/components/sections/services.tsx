import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Zap,
  BarChart3,
  Rocket,
  Brain
} from "lucide-react";

// Revolutionary 3D Transform Variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.6,
    rotateX: 45,
    rotateY: -25,
    rotateZ: -10
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 1.2,
      delay: i * 0.15
    }
  })
};

// Container Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Title Animation Variants
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Revolutionary Services Data with Enhanced Features
const services = [
  {
    title: "Account-Based Marketing (ABM) Programs",
    description: "Laser-focused campaigns that target high-value accounts with personalized messaging and multi-channel engagement strategies.",
    icon: Target,
    accentColor: "rose",
    gradients: ["from-rose-500/20 to-pink-500/30", "from-pink-500/20 to-rose-500/30"],
    highlight: "847% Average ROI Increase",
    pattern: "hexagon",
    particleColor: "rgba(244, 63, 94, 0.6)"
  },
  {
    title: "B2B Lead Generation & Qualification",
    description: "Advanced lead scoring and qualification processes that identify and nurture high-intent prospects through the entire funnel.",
    icon: Users,
    accentColor: "blue",
    gradients: ["from-blue-500/20 to-cyan-500/30", "from-cyan-500/20 to-blue-500/30"],
    highlight: "312% Lead Quality Improvement",
    pattern: "circuit",
    particleColor: "rgba(59, 130, 246, 0.6)"
  },
  {
    title: "Intent-Based Demand Generation",
    description: "Capture prospects at the exact moment they show purchase intent through advanced behavioral analysis and predictive modeling.",
    icon: TrendingUp,
    accentColor: "purple",
    gradients: ["from-purple-500/20 to-violet-500/30", "from-violet-500/20 to-purple-500/30"],
    highlight: "589% Pipeline Growth",
    pattern: "waves",
    particleColor: "rgba(147, 51, 234, 0.6)"
  },
  {
    title: "Event Marketing & Audience Acquisition",
    description: "Strategic event marketing that drives qualified attendance and converts event engagement into sales opportunities.",
    icon: Rocket,
    accentColor: "emerald",
    gradients: ["from-emerald-500/20 to-teal-500/30", "from-teal-500/20 to-emerald-500/30"],
    highlight: "425% Event ROI Increase",
    pattern: "dots",
    particleColor: "rgba(16, 185, 129, 0.6)"
  },
  {
    title: "Lead Validation & Enrichment",
    description: "Comprehensive data validation and enrichment services that ensure your sales team works with accurate, actionable prospect information.",
    icon: CheckCircle2,
    accentColor: "amber",
    gradients: ["from-amber-500/20 to-orange-500/30", "from-orange-500/20 to-amber-500/30"],
    highlight: "267% Data Accuracy Boost",
    pattern: "grid",
    particleColor: "rgba(245, 158, 11, 0.6)"
  }
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Global mouse tracking for ambient effects
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isMobile) {
        setGlobalMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isMobile]);
  
  // Advanced 3D mouse tracking for individual cards
  const handleMouseMove = (e, index) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x: x * 25, y: y * -25 });
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    if (isMobile) return;
    setMousePosition({ x: 0, y: 0 });
    setActiveIndex(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      {/* Revolutionary Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orb Effects */}
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: globalMouse.x * 0.5,
            y: globalMouse.y * 0.5,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, repeatType: "reverse" }
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl"
          animate={{
            x: globalMouse.x * -0.3,
            y: globalMouse.y * -0.3,
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }
          }}
        />
        
        {/* Dynamic Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M30 0h1v60h-1V0zm29 29v1H0v-1h59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            backgroundPosition: [`0px 0px`, `60px 60px`]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Revolutionary Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-3"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border border-primary/20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="mr-2 h-4 w-4" />
              </motion.div>
              Revolutionary Solutions
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              backgroundSize: "200% 200%",
              animation: "gradientShift 6s ease infinite"
            }}
          >
            From Wasted Leads to Measurable Revenue
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Every solution we offer is designed to solve one problem—turn marketing investment into predictable, scalable revenue growth through cutting-edge technology and proven methodologies.
          </motion.p>
        </motion.div>

        {/* Ultra-Creative Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-20"
          style={{ perspective: "2000px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="group cursor-pointer transform-gpu relative"
              style={{ 
                transformStyle: "preserve-3d"
              }}
            >
              {/* Revolutionary Card Container */}
              <div className="relative h-auto min-h-[500px] lg:h-[600px] w-full">
                
                {/* Magnetic Field Visualization */}
                <AnimatePresence>
                  {activeIndex === index && !isMobile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-[-40px] rounded-[3rem]"
                    >
                      {/* Magnetic Field Rings */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-[3rem] border"
                          style={{
                            borderColor: service.particleColor,
                            borderWidth: "1px"
                          }}
                          animate={{
                            scale: [1, 1.2 + i * 0.1, 1],
                            opacity: [0, 0.3, 0],
                            rotate: [0, 90, 0]
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Card with Ultra-Advanced Effects */}
                <motion.div
                  className="relative h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                  animate={{
                    rotateX: activeIndex === index ? mousePosition.y : 0,
                    rotateY: activeIndex === index ? mousePosition.x : 0,
                    z: activeIndex === index ? 100 : 0,
                    scale: activeIndex === index ? 1.05 : 1,
                    boxShadow: activeIndex === index 
                      ? "0 40px 80px -12px rgba(0, 0, 0, 0.3)"
                      : "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    boxShadow: { duration: 0.3 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Holographic Mesh Background */}
                  <motion.div
                    className="absolute inset-0 opacity-[0.07]"
                    animate={{
                      background: activeIndex === index ? [
                        `radial-gradient(circle at 20% 50%, ${service.particleColor.replace('0.6', '1')} 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, ${service.particleColor.replace('0.6', '0.8')} 0%, transparent 50%),
                         radial-gradient(circle at 40% 80%, ${service.particleColor.replace('0.6', '0.9')} 0%, transparent 50%)`,
                        `radial-gradient(circle at 60% 30%, ${service.particleColor.replace('0.6', '0.9')} 0%, transparent 50%),
                         radial-gradient(circle at 20% 70%, ${service.particleColor.replace('0.6', '1')} 0%, transparent 50%),
                         radial-gradient(circle at 80% 60%, ${service.particleColor.replace('0.6', '0.8')} 0%, transparent 50%)`
                      ] : 'transparent'
                    }}
                    transition={{ duration: 4, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }}
                  />

                  {/* Revolutionary Border System */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl p-[2px] -z-10"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      background: activeIndex === index ? [
                        `conic-gradient(from 0deg, ${service.particleColor.replace('0.6', '1')}, transparent, ${service.particleColor.replace('0.6', '0.8')}, transparent, ${service.particleColor.replace('0.6', '1')})`,
                        `conic-gradient(from 120deg, ${service.particleColor.replace('0.6', '0.8')}, transparent, ${service.particleColor.replace('0.6', '1')}, transparent, ${service.particleColor.replace('0.6', '0.8')})`,
                        `conic-gradient(from 240deg, ${service.particleColor.replace('0.6', '1')}, transparent, ${service.particleColor.replace('0.6', '0.8')}, transparent, ${service.particleColor.replace('0.6', '1')})`
                      ] : 'transparent'
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      background: { duration: 1.5, repeat: activeIndex === index ? Infinity : 0, ease: "linear" }
                    }}
                  />
                  
                  {/* Particle System */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <AnimatePresence>
                      {activeIndex === index && !isMobile && (
                        <>
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ backgroundColor: service.particleColor }}
                              initial={{ 
                                x: Math.random() * 100 + '%', 
                                y: Math.random() * 100 + '%',
                                opacity: 0,
                                scale: 0
                              }}
                              animate={{
                                x: [
                                  Math.random() * 100 + '%', 
                                  Math.random() * 100 + '%',
                                  Math.random() * 100 + '%'
                                ],
                                y: [
                                  Math.random() * 100 + '%', 
                                  Math.random() * 100 + '%',
                                  Math.random() * 100 + '%'
                                ],
                                opacity: [0, 1, 0.5, 0],
                                scale: [0, 1, 1.2, 0]
                              }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                          
                          {/* Energy Lines */}
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={`line-${i}`}
                              className="absolute h-px opacity-30"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${service.particleColor}, transparent)`,
                                width: "100%",
                                top: (20 + i * 20) + '%'
                              }}
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "linear"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Holographic Header Section */}
                  <div className="relative p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6">
                    <motion.div
                      className="relative mb-8 flex justify-center"
                      animate={{
                        y: activeIndex === index ? [-4, 4, -4] : 0,
                        rotateY: activeIndex === index ? [0, 360] : 0
                      }}
                      transition={{
                        y: { duration: 4, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                        rotateY: { duration: 10, repeat: activeIndex === index ? Infinity : 0, ease: "linear" }
                      }}
                    >
                      {/* Multi-Layer Glow System */}
                      <div className="relative">
                        {/* Outer Holographic Ring */}
                        <motion.div
                          className="absolute -inset-12 rounded-full"
                          animate={{
                            background: activeIndex === index ? [
                              `conic-gradient(from 0deg, ${service.particleColor}, transparent, ${service.particleColor.replace('0.6', '0.8')})`,
                              `conic-gradient(from 120deg, ${service.particleColor.replace('0.6', '0.8')}, transparent, ${service.particleColor})`,
                              `conic-gradient(from 240deg, ${service.particleColor}, transparent, ${service.particleColor.replace('0.6', '0.8')})`
                            ] : 'transparent',
                            scale: activeIndex === index ? [1, 1.4, 1] : 1,
                            opacity: activeIndex === index ? [0.2, 0.5, 0.2] : 0
                          }}
                          transition={{
                            background: { duration: 3, repeat: activeIndex === index ? Infinity : 0 },
                            scale: { duration: 2.5, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }
                          }}
                        />
                        
                        {/* Middle Energy Field */}
                        <motion.div
                          className="absolute -inset-6 rounded-full blur-2xl opacity-40"
                          style={{ background: `radial-gradient(circle, ${service.particleColor}, transparent)` }}
                          animate={{
                            scale: activeIndex === index ? [1, 1.6, 1] : 1,
                            opacity: activeIndex === index ? [0.4, 0.8, 0.4] : 0.3,
                            rotate: activeIndex === index ? [0, -180, -360] : 0
                          }}
                          transition={{
                            scale: { duration: 3, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                            opacity: { duration: 2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                            rotate: { duration: 8, repeat: activeIndex === index ? Infinity : 0, ease: "linear" }
                          }}
                        />
                        
                        {/* Icon Container with Holographic Effect */}
                        <motion.div
                          className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-white via-white to-gray-50 shadow-2xl flex items-center justify-center overflow-hidden border border-white/20"
                          animate={{
                            rotateX: activeIndex === index ? [-15, 15, -15] : 0,
                            rotateZ: activeIndex === index ? [0, 8, -8, 0] : 0,
                            scale: activeIndex === index ? [1, 1.1, 1] : 1
                          }}
                          transition={{
                            duration: 5,
                            repeat: activeIndex === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Holographic Shine */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
                            animate={{
                              rotate: activeIndex === index ? [0, 360] : 0,
                              opacity: activeIndex === index ? [0.3, 0.8, 0.3] : 0.3
                            }}
                            transition={{
                              rotate: { duration: 4, repeat: activeIndex === index ? Infinity : 0, ease: "linear" },
                              opacity: { duration: 2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }
                            }}
                          />
                          
                          <motion.div
                            animate={{
                              scale: activeIndex === index ? [1, 1.3, 1] : 1,
                              rotate: activeIndex === index ? [0, -8, 8, 0] : 0
                            }}
                            transition={{
                              scale: { duration: 2.5, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                              rotate: { duration: 1.5, repeat: activeIndex === index ? Infinity : 0 }
                            }}
                          >
                            <service.icon className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 text-${service.accentColor}-600 relative z-10 drop-shadow-lg`} />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Revolutionary Typography */}
                    <div className="text-center mb-8">
                      <motion.h3 
                        className="text-xl sm:text-2xl lg:text-2xl font-bold mb-3 leading-tight relative"
                        animate={{
                          scale: activeIndex === index ? [1, 1.03, 1] : 1
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      >
                        <span 
                          className={`${activeIndex === index ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 text-transparent bg-clip-text' : 'text-gray-800'} relative z-10`}
                          style={{
                            backgroundSize: activeIndex === index ? '200% 100%' : '100% 100%',
                            animation: activeIndex === index ? 'shimmer 3s ease-in-out infinite' : 'none'
                          }}
                        >
                          {service.title}
                        </span>
                        
                        {/* Holographic Scanning Effect */}
                        {activeIndex === index && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 4
                            }}
                            style={{ mixBlendMode: 'overlay' }}
                          />
                        )}
                      </motion.h3>

                      {/* Multi-Dimensional Underline */}
                      <div className="relative">
                        <motion.div
                          className={`h-1 mx-auto rounded-full bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')}`}
                          initial={{ width: '25%' }}
                          animate={{ width: activeIndex === index ? '90%' : '25%' }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        
                        {activeIndex === index && (
                          <motion.div
                            className="absolute top-0 h-1 rounded-full bg-white/60 blur-sm"
                            style={{ left: '50%', transform: 'translateX(-50%)' }}
                            initial={{ width: '0%' }}
                            animate={{ 
                              width: ['0%', '95%', '0%']
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description with Reading Light */}
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                    <motion.div
                      className="relative"
                      animate={{
                        opacity: activeIndex === index ? [0.85, 1, 0.85] : 0.85
                      }}
                      transition={{
                        duration: 4,
                        repeat: activeIndex === index ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8 relative z-10">
                        {service.description}
                      </p>
                      
                      {/* Advanced Reading Light Effect */}
                      {activeIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent rounded-2xl -z-10"
                          animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 0.6, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 6
                          }}
                        />
                      )}
                    </motion.div>

                  </div>

                  {/* Revolutionary Bottom Section */}
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                    {/* Holographic Metrics Display */}
                    <motion.div
                      className="mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-gray-100/50 backdrop-blur-sm"
                      style={{ 
                        background: `linear-gradient(135deg, white, rgba(255,255,255,0.9))`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      animate={{
                        boxShadow: activeIndex === index ? [
                          '0 8px 32px rgba(0,0,0,0.1)',
                          '0 15px 50px rgba(0,0,0,0.15)',
                          '0 8px 32px rgba(0,0,0,0.1)'
                        ] : '0 8px 32px rgba(0,0,0,0.1)'
                      }}
                      transition={{
                        boxShadow: { duration: 3, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }
                      }}
                    >
                      {/* Holographic Background Field */}
                      <motion.div
                        className="absolute inset-0 opacity-5"
                        animate={{
                          background: activeIndex === index ? [
                            `radial-gradient(circle at 0% 0%, ${service.particleColor}, transparent 70%)`,
                            `radial-gradient(circle at 100% 100%, ${service.particleColor}, transparent 70%)`,
                            `radial-gradient(circle at 50% 50%, ${service.particleColor}, transparent 70%)`
                          ] : 'transparent'
                        }}
                        transition={{
                          duration: 4,
                          repeat: activeIndex === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Floating Metric Elements */}
                      <div className="relative">
                        <motion.div
                          className="flex items-center justify-center space-x-6"
                          animate={{
                            y: activeIndex === index ? [0, -3, 0] : 0
                          }}
                          transition={{
                            duration: 3,
                            repeat: activeIndex === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        >
                          <motion.div
                            className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-white/20"
                            animate={{
                              rotate: activeIndex === index ? [0, 12, -12, 0] : 0,
                              scale: activeIndex === index ? [1, 1.15, 1] : 1
                            }}
                            transition={{
                              duration: 4,
                              repeat: activeIndex === index ? Infinity : 0
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            {/* Icon Glow Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-2xl blur-lg opacity-30"
                              style={{ background: service.particleColor }}
                              animate={{
                                scale: activeIndex === index ? [1, 1.4, 1] : 1
                              }}
                              transition={{
                                duration: 2,
                                repeat: activeIndex === index ? Infinity : 0,
                                repeatType: "reverse"
                              }}
                            />
                            <TrendingUp className={`h-6 w-6 sm:h-8 sm:w-8 text-${service.accentColor}-600 relative z-10`} />
                          </motion.div>
                          
                          <div className="text-center">
                            <motion.div
                              animate={{
                                scale: activeIndex === index ? [1, 1.08, 1] : 1
                              }}
                              transition={{
                                duration: 2,
                                repeat: activeIndex === index ? Infinity : 0,
                                repeatType: "reverse"
                              }}
                            >
                              <span className={`font-bold text-lg sm:text-xl text-${service.accentColor}-700 block`}>
                                {service.highlight}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">
                                Proven Results
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Ultra-Creative CTA Button */}
                    <motion.button
                      onClick={() => {
                        const serviceSlugMap: Record<string, string> = {
                          'Account-Based Marketing (ABM) Programs': 'account-based-marketing',
                          'B2B Lead Generation & Qualification': 'b2b-lead-generation-qualification', 
                          'Intent-Based Demand Generation': 'intent-based-lead-generation',
                          'Event Marketing & Audience Acquisition': 'event-marketing-solutions',
                          'Lead Validation & Enrichment': 'lead-validation-enrichment'
                        };
                        const slug = serviceSlugMap[service.title] || service.title.toLowerCase().replace(/ & | /g, '-');
                        window.location.href = `/services/${slug}`;
                      }}
                      className="w-full py-4 sm:py-5 lg:py-6 px-4 sm:px-6 rounded-2xl sm:rounded-3xl font-bold text-white text-sm sm:text-base relative overflow-hidden group transform-gpu border-2 border-transparent"
                      style={{
                        background: `linear-gradient(135deg, ${service.particleColor.replace('0.6', '0.9')}, ${service.particleColor.replace('0.6', '0.7')})`
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                        borderColor: service.particleColor.replace('0.6', '0.3')
                      }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        boxShadow: activeIndex === index ? [
                          '0 15px 40px -10px rgba(0,0,0,0.3)',
                          '0 25px 60px -10px rgba(0,0,0,0.4)',
                          '0 15px 40px -10px rgba(0,0,0,0.3)'
                        ] : '0 15px 40px -10px rgba(0,0,0,0.3)',
                        background: activeIndex === index ? [
                          `linear-gradient(135deg, ${service.particleColor.replace('0.6', '0.9')}, ${service.particleColor.replace('0.6', '0.7')})`,
                          `linear-gradient(135deg, ${service.particleColor.replace('0.6', '1')}, ${service.particleColor.replace('0.6', '0.8')})`,
                          `linear-gradient(135deg, ${service.particleColor.replace('0.6', '0.9')}, ${service.particleColor.replace('0.6', '0.7')})`
                        ] : `linear-gradient(135deg, ${service.particleColor.replace('0.6', '0.9')}, ${service.particleColor.replace('0.6', '0.7')})`
                      }}
                      transition={{
                        boxShadow: { duration: 3, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                        background: { duration: 2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }
                      }}
                    >
                      {/* Multiple Holographic Effects */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        initial={{ x: '-100%', skewX: -25 }}
                        animate={{ x: activeIndex === index ? '200%' : '-100%' }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatDelay: 4,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20"
                        animate={{
                          opacity: activeIndex === index ? [0.4, 0.8, 0.4] : 0.4
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      />
                      
                      {/* Quantum Particles in Button */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        {activeIndex === index && !isMobile && [...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/80 rounded-full"
                            initial={{ 
                              x: Math.random() * 100 + '%', 
                              y: Math.random() * 100 + '%',
                              scale: 0
                            }}
                            animate={{
                              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Button Content */}
                      <motion.span 
                        className="relative flex items-center justify-center space-x-3 z-10"
                        animate={{
                          y: activeIndex === index ? [0, -1, 0] : 0
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      >
                        <span className="font-bold text-lg">Request Proposal</span>
                        
                        {/* Quantum Arrow */}
                        <motion.div
                          className="relative"
                          animate={{ 
                            x: activeIndex === index ? [0, 5, 0] : 0,
                            rotate: activeIndex === index ? [0, 8, -8, 0] : 0
                          }}
                          transition={{
                            x: { duration: 2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                            rotate: { duration: 1.8, repeat: activeIndex === index ? Infinity : 0 }
                          }}
                        >
                          <ArrowRight className="h-6 w-6" />
                          
                          {/* Arrow Energy Trail */}
                          {activeIndex === index && (
                            <>
                              <motion.div
                                className="absolute inset-0"
                                animate={{
                                  x: [-20, 0],
                                  opacity: [0, 0.6, 0]
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  repeatDelay: 2
                                }}
                              >
                                <ArrowRight className="h-6 w-6 opacity-40" />
                              </motion.div>
                              <motion.div
                                className="absolute inset-0"
                                animate={{
                                  x: [-40, 0],
                                  opacity: [0, 0.3, 0]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                  delay: 0.1
                                }}
                              >
                                <ArrowRight className="h-6 w-6 opacity-20" />
                              </motion.div>
                            </>
                          )}
                        </motion.div>
                      </motion.span>
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Quantum Floating Elements */}
                {!isMobile && (
                  <>
                    <motion.div
                      className="absolute -top-3 -right-3 w-6 h-6 rounded-full shadow-lg"
                      style={{ background: `radial-gradient(circle, ${service.particleColor}, transparent)` }}
                      animate={{
                        scale: activeIndex === index ? [1, 1.8, 1] : 1,
                        opacity: activeIndex === index ? [0.6, 1, 0.6] : 0.4,
                        rotate: activeIndex === index ? [0, 180, 360] : 0
                      }}
                      transition={{
                        scale: { duration: 2.5, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                        opacity: { duration: 2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                        rotate: { duration: 6, repeat: activeIndex === index ? Infinity : 0, ease: "linear" }
                      }}
                    />
                    
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-4 h-4 rounded-full shadow-lg"
                      style={{ background: `radial-gradient(circle, ${service.particleColor.replace('0.6', '0.8')}, transparent)` }}
                      animate={{
                        scale: activeIndex === index ? [1.5, 1, 1.5] : 1,
                        rotate: activeIndex === index ? [0, -180, -360] : 0,
                        opacity: activeIndex === index ? [0.7, 0.3, 0.7] : 0.5
                      }}
                      transition={{
                        scale: { duration: 2.2, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" },
                        rotate: { duration: 5, repeat: activeIndex === index ? Infinity : 0, ease: "linear", delay: 1 },
                        opacity: { duration: 1.8, repeat: activeIndex === index ? Infinity : 0, repeatType: "reverse" }
                      }}
                    />
                  </>
                )}
                
                {/* Card Reflection Effect */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                    animate={{
                      background: activeIndex === index 
                        ? `radial-gradient(ellipse at center, ${service.particleColor.replace('0.6', '0.3')}, transparent 70%)`
                        : 'transparent',
                      y: activeIndex === index ? 30 : 0,
                      scale: activeIndex === index ? 0.9 : 0.8
                    }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revolutionary CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <Button
              size="lg"
              className="px-12 py-6 text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group rounded-2xl"
              onClick={() => window.location.href = '/request-proposal'}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear"
                }}
              />
              <span className="relative flex items-center gap-3">
                🚀 Get Your Free Revenue Audit
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom CSS for additional effects */}
      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Particle trail effect */
        .particle-trail {
          position: absolute;
          width: 2px;
          height: 2px;
          background: currentColor;
          border-radius: 50%;
          opacity: 0.7;
          animation: particle-float 3s ease-in-out infinite;
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
}