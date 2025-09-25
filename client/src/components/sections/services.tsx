import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Share2,
  Video,
  CheckSquare,
  TargetIcon,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  Sparkles,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  Workflow,
} from "lucide-react";

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    rotateY: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.8
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const iconAnimationVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { 
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: { 
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as "reverse",
      ease: "easeInOut"
    }
  }
};

// Service data with enhanced content
const services = [
  {
    icon: TargetIcon,
    title: "Account-Based Marketing (ABM) Programs",
    description: "We engage entire buying committees at target accounts before evaluations begin, positioning your solution as the trusted choice.",
    features: [
      { icon: Users, text: "Complete buying committee mapping" },
      { icon: BarChart3, text: "Multi-threaded engagement" },
      { icon: Award, text: "Executive-level messaging" }
    ],
    gradients: [
      "from-rose-600/30 via-red-500/30 to-pink-500/20",
      "from-pink-500/20 via-red-500/30 to-rose-600/30"
    ],
    highlight: "Average deal size increased 340%"
  },
  {
    icon: LineChart,
    title: "B2B Lead Generation & Qualification",
    description: "We deliver sales-ready leads with authority, budget, and intent, so your sales team focuses only on opportunities that close.",
    features: [
      { icon: Zap, text: "Sales-ready prospects" },
      { icon: BarChart3, text: "BANT qualification" },
      { icon: TrendingUp, text: "Live verification calls" }
    ],
    gradients: [
      "from-blue-600/30 via-purple-500/30 to-pink-500/20",
      "from-pink-500/20 via-purple-500/20 to-blue-500/30"
    ],
    highlight: "Sales team close rate up 85%"
  },
  {
    icon: Share2,
    title: "Intent-Based Demand Generation",
    description: "We identify active buying signals and deliver content to decision-makers early, making you the clear choice when budgets open.",
    features: [
      { icon: Globe, text: "Intent signal monitoring" },
      { icon: Users, text: "Early buyer engagement" },
      { icon: Award, text: "Thought leadership content" }
    ],
    gradients: [
      "from-purple-600/30 via-indigo-500/30 to-blue-500/20",
      "from-blue-500/20 via-indigo-500/30 to-purple-600/30"
    ],
    highlight: "Win rate vs competitors up 245%"
  },
  {
    icon: Video,
    title: "Event Marketing & Audience Acquisition",
    description: "We attract ICP-matched decision-makers to your webinars, trade shows, and events—converting attendance into pipeline.",
    features: [
      { icon: Users, text: "ICP-matched attendees" },
      { icon: CheckCircle, text: "Qualified registrations" },
      { icon: TrendingUp, text: "Post-event follow-up" }
    ],
    gradients: [
      "from-emerald-600/30 via-green-500/30 to-teal-500/20",
      "from-teal-500/20 via-green-500/30 to-emerald-600/30"
    ],
    highlight: "Event ROI increased 340%"
  },
  {
    icon: CheckSquare,
    title: "Lead Validation & Sales Development Support",
    description: "We verify every lead with live evidence and BANT checks, ensuring your CRM is filled only with sales-ready contacts.",
    features: [
      { icon: Sparkles, text: "Live BANT verification" },
      { icon: CheckCircle, text: "Evidence-based qualification" },
      { icon: TrendingUp, text: "Lead replacement policy" }
    ],
    gradients: [
      "from-amber-600/30 via-orange-500/30 to-yellow-500/20",
      "from-yellow-500/20 via-orange-500/30 to-amber-600/30"
    ],
    highlight: "Sales team productivity up 190%"
  },
];

const calendlyUrl = "https://calendly.com/zahid-m/30min";

export function Services() {
  // Scroll-triggered animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 }); // Reduced threshold for mobile
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Check if user is on mobile device
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      id="services-section"
    >
      {/* Static Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60" />
        
        {/* Fine-grain texture overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        
        {/* Accent color rays */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-primary/5 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-primary/3 to-transparent opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header section */}
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Industry-Leading Solutions
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From Wasted Leads to Measurable Revenue
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every solution we offer is designed to solve one problem—turn marketing investment into predictable, scalable revenue growth.
          </motion.p>
        </motion.div>

        {/* Enhanced service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-20 perspective-1000"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={!isMobile ? "hover" : undefined}
              whileTap={!isMobile ? "tap" : undefined}
              onHoverStart={() => !isMobile && setActiveIndex(index)}
              onHoverEnd={() => !isMobile && setActiveIndex(null)}
              className="flex transform-gpu"
            >
              <div className="relative w-full h-full">
                {/* Card with simplified mobile animations */}
                <motion.div
                  className="relative w-full h-full"
                  style={isMobile ? {} : { transformStyle: "preserve-3d" }}
                  whileHover={!isMobile ? { 
                    rotateY: [-1, 3, 0], 
                    rotateX: [1, -2, 0],
                    z: 10,
                  } : {
                    scale: 1.02
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  {/* Main card body with stacked design */}
                  <div className={`
                    w-full rounded-2xl overflow-hidden
                    bg-gradient-to-br from-white/90 via-white/80 to-white/70
                    backdrop-blur-sm border-0 shadow-lg group
                    transition-all duration-500 ease-out
                    hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)]
                  `}>
                    {/* Color accent top bar */}
                    <div className={`
                      h-2 w-full bg-gradient-to-r 
                      ${service.gradients[0].replace('/20', '/80').replace('/30', '/90')}
                      animate-morph-gradient
                    `}></div>
                    
                    {/* Floating icon element with simplified mobile effects */}
                    <div className="relative flex justify-center mt-[-25px] sm:mt-[-30px]">
                      <motion.div
                        className={`
                          p-4 rounded-[20px] z-10
                          shadow-xl border border-white/80
                          bg-gradient-to-br from-white to-white/90
                        `}
                        animate={!isMobile ? { 
                          y: [0, -2, 0],
                          boxShadow: [
                            '0 10px 25px rgba(0, 0, 0, 0.1)', 
                            '0 20px 25px rgba(0, 0, 0, 0.12)', 
                            '0 10px 25px rgba(0, 0, 0, 0.1)'
                          ]
                        } : {}}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          repeatType: "reverse"
                        }}
                      >
                        <div className="relative">
                          {!isMobile && (
                            <motion.div 
                              className={`
                                absolute inset-0 rounded-[16px] opacity-30
                                bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')}
                                blur-[10px] -z-10
                              `}
                              animate={{ 
                                opacity: [0.3, 0.5, 0.3]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                repeatType: "reverse"
                              }}
                            />
                          )}
                          <service.icon className="h-12 w-12 text-primary" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Content area */}
                    <div className="px-4 sm:px-6 md:px-8 pt-4 pb-6 md:pb-8">
                      {/* Title with animated underline */}
                      <div className="relative inline-block mb-3">
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <motion.div 
                          className={`
                            h-1 rounded-full
                            bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')}
                          `}
                          initial={{ width: isMobile ? '30%' : 0 }}
                          animate={!isMobile && activeIndex === index ? { width: '100%' } : { width: '30%' }}
                          transition={{ 
                            duration: 0.8, 
                            ease: "easeOut" 
                          }}
                        />
                      </div>
                      
                      {/* Description with improved typography */}
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      
                      {/* Highlight metrics banner */}
                      <motion.div
                        className={`
                          mb-6 py-3 px-4 rounded-lg
                          bg-gradient-to-r ${service.gradients[0].replace('/20', '/10').replace('/30', '/10')}
                          border border-primary/10 flex items-center font-medium
                        `}
                        initial={{ opacity: 0.7, y: 10 }}
                        animate={!isMobile && activeIndex === index ? 
                          { opacity: 1, y: 0, scale: 1.02 } : 
                          { opacity: 0.9, y: 0, scale: 1 }
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        <span className="text-primary">{service.highlight}</span>
                      </motion.div>
                      
                      {/* CTA Button with animated arrow */}
                      <motion.button
                        onClick={() => {
                          const url = `/services/${service.title.toLowerCase().replace(/ & | /g, '-')}`;
                          window.location.href = url;
                        }}
                        className={`
                          w-full py-3 px-6 rounded-xl text-white font-medium
                          bg-gradient-to-r from-primary to-primary/90
                          hover:shadow-lg hover:shadow-primary/20
                          transition-all duration-300 flex items-center justify-center
                        `}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Request a Proposal</span>
                        <motion.span
                          className="ml-2 flex items-center"
                          animate={{ 
                            x: !isMobile && activeIndex === index ? [0, 5, 0] : 0,
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: !isMobile && activeIndex === index ? Infinity : 0, 
                            repeatType: "reverse"
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Redesigned CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 50 }}
          className="mt-16 md:mt-20 lg:mt-28 relative"
        >
          <div className="rounded-[2rem] overflow-hidden">
            {/* Elegant background with animated elements */}
            <div className="absolute inset-0 -z-10">
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
              
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              />
              
              {/* Glowing orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]"
                  animate={{ 
                    y: [0, 20, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                <motion.div 
                  className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[60px]"
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
              </div>
            </div>
            
            {/* Content wrapper */}
            <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 z-10 backdrop-blur-[2px]">
              <div className="max-w-4xl mx-auto">
                {/* Section accent line */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mb-12 opacity-80" />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="text-center"
                >
                  <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight">
                    Ready to Build a Revenue Engine?
                  </h2>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Whether scaling demand generation, optimizing pipeline efficiency, or tightening lead qualification, our data-driven system delivers measurable growth you can trust.
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-full sm:w-auto"
                    >
                      <motion.button
                        onClick={() => window.location.href = '/request-proposal'}
                        className="relative group w-full sm:w-auto py-4 px-8 rounded-xl text-white font-medium
                          bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/20
                          transition-all duration-300 flex items-center justify-center overflow-hidden"
                      >
                        {/* Button glow effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <span className="mr-2">Request a Proposal</span>
                        <motion.span
                          animate={{ 
                            x: [0, 5, 0],
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="flex items-center"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </motion.button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-full sm:w-auto"
                    >
                      <motion.button
                        onClick={() => window.location.href = "/services"}
                        className="w-full sm:w-auto py-4 px-8 rounded-xl 
                          border border-primary/20 text-primary font-medium hover:bg-primary/5
                          transition-all duration-300 flex items-center justify-center"
                      >
                        View All Services
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}