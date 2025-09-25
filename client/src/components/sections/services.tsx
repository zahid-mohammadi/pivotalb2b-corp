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
    y: 60,
    scale: 0.8,
    rotateX: 20,
    rotateY: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.8
    }
  },
  hover: {
    y: -20,
    scale: 1.05,
    rotateX: -5,
    rotateY: 5,
    z: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: {
    scale: 0.95,
    rotateX: 0,
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

// Creative service data with enhanced visual elements
const services = [
  {
    icon: TargetIcon,
    title: "Account-Based Marketing (ABM) Programs",
    description: "We engage entire buying committees at your target accounts early—building trust and influencing deals before competitors even enter the conversation.",
    features: [
      { icon: Users, text: "Complete buying committee mapping" },
      { icon: BarChart3, text: "Multi-threaded engagement" },
      { icon: Award, text: "Executive-level messaging" }
    ],
    gradients: [
      "from-rose-600/30 via-red-500/30 to-pink-500/20",
      "from-pink-500/20 via-red-500/30 to-rose-600/30"
    ],
    highlight: "Average deal size increased 340%",
    pattern: "hexagon",
    accentColor: "rose"
  },
  {
    icon: LineChart,
    title: "B2B Lead Generation & Qualification",
    description: "We identify and connect with decision-makers from companies actively evaluating solutions like yours—verified for intent, authority, and budget alignment.",
    features: [
      { icon: Zap, text: "Sales-ready prospects" },
      { icon: BarChart3, text: "BANT qualification" },
      { icon: TrendingUp, text: "Live verification calls" }
    ],
    gradients: [
      "from-blue-600/30 via-purple-500/30 to-pink-500/20",
      "from-pink-500/20 via-purple-500/20 to-blue-500/30"
    ],
    highlight: "Sales team close rate up 85%",
    pattern: "circuit",
    accentColor: "blue"
  },
  {
    icon: Share2,
    title: "Intent-Based Demand Generation",
    description: "We detect buying signals and deliver tailored content to in-market buyers—positioning your brand as the trusted choice when purchase decisions are made.",
    features: [
      { icon: Globe, text: "Intent signal monitoring" },
      { icon: Users, text: "Early buyer engagement" },
      { icon: Award, text: "Thought leadership content" }
    ],
    gradients: [
      "from-purple-600/30 via-indigo-500/30 to-blue-500/20",
      "from-blue-500/20 via-indigo-500/30 to-purple-600/30"
    ],
    highlight: "Win rate vs competitors up 245%",
    pattern: "waves",
    accentColor: "purple"
  },
  {
    icon: Video,
    title: "Event Marketing & Audience Acquisition",
    description: "We fill your webinars, field events, and trade shows with qualified decision-makers who have real buying intent—turning attendance into measurable pipeline.",
    features: [
      { icon: Users, text: "ICP-matched attendees" },
      { icon: CheckCircle, text: "Qualified registrations" },
      { icon: TrendingUp, text: "Post-event follow-up" }
    ],
    gradients: [
      "from-emerald-600/30 via-green-500/30 to-teal-500/20",
      "from-teal-500/20 via-green-500/30 to-emerald-600/30"
    ],
    highlight: "Event ROI increased 340%",
    pattern: "dots",
    accentColor: "emerald"
  },
  {
    icon: CheckSquare,
    title: "Lead Validation & Enrichment",
    description: "We clean, verify, and validate your inbound or event leads—ensuring only genuine, in-market buyers enter your CRM while low-intent contacts are filtered out.",
    features: [
      { icon: Sparkles, text: "Live BANT verification" },
      { icon: CheckCircle, text: "Evidence-based qualification" },
      { icon: TrendingUp, text: "Lead replacement policy" }
    ],
    gradients: [
      "from-amber-600/30 via-orange-500/30 to-yellow-500/20",
      "from-yellow-500/20 via-orange-500/30 to-amber-600/30"
    ],
    highlight: "Sales team productivity up 190%",
    pattern: "geometric",
    accentColor: "amber"
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

        {/* Revolutionary Creative Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20 perspective-1000"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={!isMobile ? "hover" : undefined}
              whileTap={!isMobile ? "tap" : undefined}
              onHoverStart={() => !isMobile && setActiveIndex(index)}
              onHoverEnd={() => !isMobile && setActiveIndex(null)}
              className="group cursor-pointer transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Container with Creative Layout */}
              <div className="relative h-[500px] w-full">
                
                {/* Background Pattern Element */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  {/* Dynamic Pattern Background */}
                  {service.pattern === 'hexagon' && (
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id={`hexagon-${index}`} x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                            <polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#hexagon-${index})`} className="text-gray-300"/>
                      </svg>
                    </div>
                  )}
                  {service.pattern === 'circuit' && (
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id={`circuit-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                            <path d="M0 12.5h25M12.5 0v25M6.25 6.25h12.5M6.25 18.75h12.5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                            <circle cx="6.25" cy="6.25" r="1" fill="currentColor"/>
                            <circle cx="18.75" cy="18.75" r="1" fill="currentColor"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#circuit-${index})`} className="text-blue-300"/>
                      </svg>
                    </div>
                  )}
                  {service.pattern === 'waves' && (
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <pattern id={`waves-${index}`} x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                            <path d="M0 5 Q5 0 10 5 T20 5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#waves-${index})`} className="text-purple-300"/>
                      </svg>
                    </div>
                  )}
                  {service.pattern === 'dots' && (
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id={`dots-${index}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="5" cy="5" r="1" fill="currentColor"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#dots-${index})`} className="text-emerald-300"/>
                      </svg>
                    </div>
                  )}
                  {service.pattern === 'geometric' && (
                    <div className="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id={`geometric-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            <rect x="6" y="6" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#geometric-${index})`} className="text-amber-300"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Main Card */}
                <motion.div
                  className="relative h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden group-hover:bg-white transition-all duration-500"
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {/* Animated Gradient Border */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradients[0].replace('/20', '/40').replace('/30', '/50')} p-[2px] -z-10`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0,
                      background: [
                        `linear-gradient(0deg, ${service.gradients[0].replace('/20', '/40').replace('/30', '/50')})`,
                        `linear-gradient(90deg, ${service.gradients[1].replace('/20', '/40').replace('/30', '/50')})`,
                        `linear-gradient(180deg, ${service.gradients[0].replace('/20', '/40').replace('/30', '/50')})`,
                        `linear-gradient(270deg, ${service.gradients[1].replace('/20', '/40').replace('/30', '/50')})`,
                        `linear-gradient(360deg, ${service.gradients[0].replace('/20', '/40').replace('/30', '/50')})`
                      ]
                    }}
                    transition={{ 
                      opacity: { duration: 0.3 },
                      background: { duration: 3, repeat: Infinity, ease: "linear" }
                    }}
                  />

                  {/* Creative Header Section */}
                  <div className="relative p-8 pb-6">
                    {/* Floating Icon with Creative Background */}
                    <motion.div
                      className="relative mb-6 flex justify-center"
                      animate={{
                        y: activeIndex === index ? [-2, 2, -2] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: activeIndex === index ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      {/* Icon Background with Creative Shape */}
                      <div className="relative">
                        {/* Animated Glow Ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.gradients[0].replace('/20', '/30').replace('/30', '/40')} blur-xl`}
                          animate={{
                            scale: activeIndex === index ? [1, 1.2, 1] : 1,
                            opacity: activeIndex === index ? [0.3, 0.6, 0.3] : 0.2
                          }}
                          transition={{
                            duration: 2,
                            repeat: activeIndex === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        />
                        
                        {/* Icon Container */}
                        <motion.div
                          className="relative w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.6 }}
                        >
                          <service.icon className={`h-10 w-10 text-${service.accentColor}-600`} />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Title with Creative Typography */}
                    <motion.h3 
                      className="text-2xl font-bold text-center mb-4 leading-tight"
                      animate={{
                        backgroundImage: activeIndex === index 
                          ? [`linear-gradient(90deg, #000, #000)`, `linear-gradient(90deg, ${service.gradients[0].replace('from-', '').replace('/30', '').replace('/20', '').split(' ')[0]}, ${service.gradients[0].replace('to-', '').split(' ').pop()})`] 
                          : [`linear-gradient(90deg, #000, #000)`]
                      }}
                      style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: activeIndex === index ? 'transparent' : 'inherit'
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.title}
                    </motion.h3>
                    
                    {/* Dynamic Underline */}
                    <motion.div
                      className={`h-1 mx-auto rounded-full bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')}`}
                      initial={{ width: '20%' }}
                      animate={{ width: activeIndex === index ? '80%' : '20%' }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>

                  {/* Description Section */}
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 text-center leading-relaxed mb-6">{service.description}</p>
                    
                    {/* Features List with Creative Icons */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 + 0.3 }}
                        >
                          <motion.div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradients[0].replace('/20', '/10').replace('/30', '/15')} flex items-center justify-center`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <feature.icon className={`h-4 w-4 text-${service.accentColor}-600`} />
                          </motion.div>
                          <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="px-8 pb-8">
                    {/* Metrics Banner */}
                    <motion.div
                      className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${service.gradients[0].replace('/20', '/8').replace('/30', '/8')} border border-${service.accentColor}-100 relative overflow-hidden`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Animated Background Element */}
                      <motion.div
                        className={`absolute top-0 right-0 w-24 h-24 bg-${service.accentColor}-100 rounded-full opacity-20 -mr-12 -mt-12`}
                        animate={{
                          scale: activeIndex === index ? [1, 1.2, 1] : 1,
                          rotate: activeIndex === index ? [0, 90, 0] : 0
                        }}
                        transition={{
                          duration: 4,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      />
                      
                      <div className="relative flex items-center justify-center">
                        <TrendingUp className={`mr-3 h-5 w-5 text-${service.accentColor}-600`} />
                        <span className={`font-bold text-${service.accentColor}-700`}>{service.highlight}</span>
                      </div>
                    </motion.div>
                    
                    {/* CTA Button */}
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
                      className={`w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${service.gradients[0].replace('/20', '').replace('/30', '')} hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: activeIndex === index ? '100%' : '-100%' }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatDelay: 2
                        }}
                      />
                      
                      <span className="relative flex items-center justify-center">
                        Request Proposal
                        <motion.div
                          className="ml-2"
                          animate={{ x: activeIndex === index ? [0, 5, 0] : 0 }}
                          transition={{
                            duration: 1,
                            repeat: activeIndex === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </span>
                    </motion.button>
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