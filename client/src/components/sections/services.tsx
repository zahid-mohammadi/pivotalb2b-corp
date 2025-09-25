import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useState } from "react";
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
    title: "Turn Enterprise Prospects Into Closed Deals",
    description: "Tired of losing big deals to competitors? We get you in front of the entire buying committee at your dream accounts—before they even start shopping. No more cold outreach. No more being ghosted by decision-makers.",
    features: [
      { icon: Users, text: "Direct access to C-suite" },
      { icon: BarChart3, text: "Deal velocity tracking" },
      { icon: Award, text: "Revenue attribution" }
    ],
    gradients: [
      "from-rose-600/30 via-red-500/30 to-pink-500/20",
      "from-pink-500/20 via-red-500/30 to-rose-600/30"
    ],
    highlight: "Average deal size increased 340%"
  },
  {
    icon: LineChart,
    title: "Fill Your Pipeline With Buyers, Not Browsers",
    description: "Sick of leads that never buy? We find prospects who are actively looking to purchase solutions like yours—with budget approved and timeline in place. No more chasing tire-kickers who waste your sales team's time.",
    features: [
      { icon: Zap, text: "Ready-to-buy prospects" },
      { icon: BarChart3, text: "Sales-ready scoring" },
      { icon: TrendingUp, text: "Revenue predictability" }
    ],
    gradients: [
      "from-blue-600/30 via-purple-500/30 to-pink-500/20",
      "from-pink-500/20 via-purple-500/20 to-blue-500/30"
    ],
    highlight: "Sales team close rate up 85%"
  },
  {
    icon: Share2,
    title: "Get In Front of Buyers Before Competitors Do",
    description: "While your competitors wait for RFPs, we position you as the trusted advisor. Your content reaches decision-makers when they're researching solutions—making you the obvious choice when they're ready to buy.",
    features: [
      { icon: Globe, text: "First-mover advantage" },
      { icon: Users, text: "Trusted advisor status" },
      { icon: Award, text: "Competitive differentiation" }
    ],
    gradients: [
      "from-purple-600/30 via-indigo-500/30 to-blue-500/20",
      "from-blue-500/20 via-indigo-500/30 to-purple-600/30"
    ],
    highlight: "Win rate vs competitors up 245%"
  },
  {
    icon: Video,
    title: "Pack Your Events With Qualified Prospects",
    description: "Tired of events filled with consultants and competitors instead of buyers? We fill your events with decision-makers who have real budgets and genuine buying intent—not just people collecting swag.",
    features: [
      { icon: Users, text: "Executive attendees" },
      { icon: CheckCircle, text: "Pre-qualified registrations" },
      { icon: TrendingUp, text: "Deal pipeline created" }
    ],
    gradients: [
      "from-emerald-600/30 via-green-500/30 to-teal-500/20",
      "from-teal-500/20 via-green-500/30 to-emerald-600/30"
    ],
    highlight: "Average event ROI increased 340%"
  },
  {
    icon: CheckSquare,
    title: "Stop Your Sales Team From Chasing Ghosts",
    description: "Sales team frustrated with leads that never respond or convert? We pre-qualify every prospect for budget, authority, need, and timeline before they hit your CRM. No more wasted calls or follow-ups.",
    features: [
      { icon: Sparkles, text: "Sales-ready prospects only" },
      { icon: CheckCircle, text: "BANT pre-verified" },
      { icon: TrendingUp, text: "Faster deal velocity" }
    ],
    gradients: [
      "from-amber-600/30 via-orange-500/30 to-yellow-500/20",
      "from-yellow-500/20 via-orange-500/30 to-amber-600/30"
    ],
    highlight: "Sales team productivity up 190%"
  },
  {
    icon: Workflow,
    title: "Turn Marketing Into a Revenue Machine",
    description: "Frustrated that marketing feels like a cost center instead of a profit driver? Our complete system transforms your marketing into a predictable revenue engine—with full attribution and ROI tracking at every stage.",
    features: [
      { icon: Zap, text: "Revenue predictability" },
      { icon: Share2, text: "Full-funnel attribution" },
      { icon: TrendingUp, text: "Marketing ROI proof" }
    ],
    gradients: [
      "from-cyan-600/30 via-blue-500/30 to-indigo-500/20",
      "from-indigo-500/20 via-blue-500/30 to-cyan-600/30"
    ],
    highlight: "Marketing ROI improved 420%"
  }
];

const calendlyUrl = "https://calendly.com/zahid-m/30min";

export function Services() {
  // Scroll-triggered animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
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
            Stop Chasing Dead-End Leads. Start Building Revenue.
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every solution is designed to solve one problem: turn your marketing spend into predictable revenue. 
            Here's how we transform struggling marketing teams into growth engines.
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
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
              className="flex transform-gpu"
            >
              <div className="relative w-full h-full perspective-1000">
                {/* Card with 3D hover effect */}
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ 
                    rotateY: [-1, 3, 0], 
                    rotateX: [1, -2, 0],
                    z: 10,
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
                    
                    {/* Floating icon element with glow effect */}
                    <div className="relative flex justify-center mt-[-25px] sm:mt-[-30px]">
                      <motion.div
                        className={`
                          p-4 rounded-[20px] z-10
                          shadow-xl border border-white/80
                          bg-gradient-to-br from-white to-white/90
                        `}
                        animate={{ 
                          y: [0, -2, 0],
                          boxShadow: [
                            '0 10px 25px rgba(0, 0, 0, 0.1)', 
                            '0 20px 25px rgba(0, 0, 0, 0.12)', 
                            '0 10px 25px rgba(0, 0, 0, 0.1)'
                          ]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          repeatType: "reverse"
                        }}
                      >
                        <div className="relative">
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
                          initial={{ width: 0 }}
                          animate={activeIndex === index ? { width: '100%' } : { width: '30%' }}
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
                        animate={activeIndex === index ? 
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
                            x: activeIndex === index ? [0, 5, 0] : 0,
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: activeIndex === index ? Infinity : 0, 
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
                    Ready to Transform Your B2B Marketing Strategy?
                  </h2>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Whether you're looking to scale your demand generation, optimize your sales pipeline, or enhance your compliant 
                    lead generation efforts, our data-driven approach delivers measurable growth and exceptional ROI.
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