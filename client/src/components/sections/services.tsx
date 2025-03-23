import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimationControls, AnimatePresence, useInView } from "framer-motion";
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
    icon: LineChart,
    title: "Strategic Lead Generation",
    description: "Drive high-quality leads with multi-channel campaigns, intent signal identification, and account-based targeting.",
    features: [
      { icon: Zap, text: "Intent-based targeting" },
      { icon: BarChart3, text: "Performance analytics" },
      { icon: TrendingUp, text: "Conversion optimization" }
    ],
    gradients: [
      "from-blue-600/30 via-purple-500/30 to-pink-500/20",
      "from-pink-500/20 via-purple-500/20 to-blue-500/30"
    ],
    highlight: "85% increase in qualified leads"
  },
  {
    icon: Share2,
    title: "Content Syndication",
    description: "Create and distribute compelling B2B content that resonates with your target audience and drives engagement.",
    features: [
      { icon: Globe, text: "Multi-channel distribution" },
      { icon: Users, text: "Audience targeting" },
      { icon: Award, text: "Premium publisher network" }
    ],
    gradients: [
      "from-purple-600/30 via-indigo-500/30 to-blue-500/20",
      "from-blue-500/20 via-indigo-500/30 to-purple-600/30"
    ],
    highlight: "3x content engagement rates"
  },
  {
    icon: Video,
    title: "Event Marketing Solutions",
    description: "Maximize event attendance and engagement with targeted outreach and post-event lead nurturing strategies.",
    features: [
      { icon: Users, text: "Audience acquisition" },
      { icon: CheckCircle, text: "Registration management" },
      { icon: TrendingUp, text: "Post-event analytics" }
    ],
    gradients: [
      "from-emerald-600/30 via-green-500/30 to-teal-500/20",
      "from-teal-500/20 via-green-500/30 to-emerald-600/30"
    ],
    highlight: "40% higher event attendance"
  },
  {
    icon: CheckSquare,
    title: "Lead Qualification Services",
    description: "Ensure sales readiness with expert lead qualification, data validation, and enrichment services.",
    features: [
      { icon: Sparkles, text: "AI-powered scoring" },
      { icon: CheckCircle, text: "Data validation" },
      { icon: TrendingUp, text: "Conversion tracking" }
    ],
    gradients: [
      "from-amber-600/30 via-orange-500/30 to-yellow-500/20",
      "from-yellow-500/20 via-orange-500/30 to-amber-600/30"
    ],
    highlight: "67% improvement in lead quality"
  },
  {
    icon: TargetIcon,
    title: "Account-Based Marketing",
    description: "Engage high-value accounts with personalized, multi-channel ABM strategies that drive measurable results.",
    features: [
      { icon: Users, text: "Account intelligence" },
      { icon: BarChart3, text: "Engagement analytics" },
      { icon: Award, text: "ROI measurement" }
    ],
    gradients: [
      "from-rose-600/30 via-red-500/30 to-pink-500/20",
      "from-pink-500/20 via-red-500/30 to-rose-600/30"
    ],
    highlight: "45% higher conversion rates"
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
      className="py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/70"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        
        {/* Animated floating shapes */}
        <AnimatePresence>
          {isInView && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: -100, y: -50 }}
                animate={{ 
                  opacity: 0.4, 
                  scale: 1,
                  x: [-100, -80, -100],
                  y: [-50, -30, -50]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 100, y: 50 }}
                animate={{ 
                  opacity: 0.3, 
                  scale: 1,
                  x: [100, 120, 100],
                  y: [100, 120, 100]
                }}
                transition={{ 
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl"
              />
            </>
          )}
        </AnimatePresence>
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
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Comprehensive B2B Marketing Services
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our data-driven solutions are designed to scale your demand generation efforts,
            delivering measurable results and exceptional ROI for your B2B marketing initiatives.
          </motion.p>
        </motion.div>

        {/* Enhanced service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 perspective-1000"
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
              <Card className={`
                flex flex-col w-full bg-white/70 backdrop-blur-sm 
                border-slate-200/80 hover:border-primary/30 
                transition-all duration-300 rounded-xl
                relative overflow-hidden group hover:shadow-xl
              `}>
                {/* Enhanced gradient backgrounds with parallax effect */}
                <motion.div 
                  className={`
                    absolute inset-0 bg-gradient-to-br bg-[size:200%_200%]
                    ${service.gradients[0]}
                    opacity-40 group-hover:opacity-80
                    transition-all duration-700 ease-out
                  `} 
                  animate={{
                    backgroundPosition: activeIndex === index 
                      ? ['0% 0%', '100% 100%'] 
                      : ['0% 0%', '50% 50%', '0% 0%'],
                  }}
                  transition={{
                    duration: activeIndex === index ? 8 : 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className={`
                    absolute inset-0 bg-gradient-to-tr bg-[size:200%_200%]
                    ${service.gradients[1]}
                    opacity-0 group-hover:opacity-40
                    transition-all duration-700 ease-out
                  `}
                  animate={{
                    backgroundPosition: activeIndex === index 
                      ? ['100% 100%', '0% 0%'] 
                      : ['100% 100%', '50% 50%', '100% 100%'],
                  }}
                  transition={{
                    duration: activeIndex === index ? 8 : 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />

                {/* Card content with enhanced animations */}
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start gap-4 mb-5">
                    <motion.div 
                      className="p-3.5 bg-white/90 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                      variants={iconAnimationVariants}
                      initial="initial"
                      animate={activeIndex === index ? "animate" : "initial"}
                    >
                      <service.icon className="h-8 w-8 text-primary transition-all duration-300" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight mb-2">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  
                  {/* Achievement highlight */}
                  <motion.div 
                    className="mt-2 mb-3 py-2 px-3 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={activeIndex === index ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="flex items-center">
                      <TrendingUp className="mr-1.5 h-4 w-4" />
                      {service.highlight}
                    </span>
                  </motion.div>
                </CardHeader>

                <CardContent className="pt-0 pb-4 relative z-10">
                  <motion.div 
                    className="space-y-3"
                    variants={featureVariants}
                  >
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex}
                        variants={featureItemVariants}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <span className="rounded-full p-1 bg-primary/10 text-primary">
                          <feature.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-muted-foreground font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>

                <CardFooter className="pt-2 pb-5 relative z-10">
                  <Link href={`/services/${service.title.toLowerCase().replace(/ & | /g, '-')}`}>
                    <Button
                      className="w-full group bg-white/90 hover:bg-primary text-primary hover:text-white 
                        transition-all duration-300 shadow hover:shadow-lg"
                    >
                      <span>Learn More</span>
                      <motion.span
                        animate={{ x: activeIndex === index ? [0, 4, 0] : 0 }}
                        transition={{ 
                          duration: 1, 
                          repeat: activeIndex === index ? Infinity : 0, 
                          repeatType: "reverse" 
                        }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center relative rounded-2xl overflow-hidden"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 rounded-3xl" />
            <motion.div 
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-t-3xl"
              animate={{ 
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          <div className="relative p-16">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Ready to Transform Your B2B Marketing?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Whether you're looking to scale your demand generation, optimize your sales pipeline, or enhance your compliant 
                lead generation efforts, our data-driven approach delivers measurable growth and exceptional ROI.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  size="lg"
                  className="shadow-lg group bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                  onClick={() => window.open(calendlyUrl, '_blank')}
                >
                  Schedule a Consultation
                  <motion.span
                    animate={{ 
                      x: [0, 5, 0],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}