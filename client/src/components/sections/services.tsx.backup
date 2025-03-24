import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
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

// Simplified animation variants (reduced complexity)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.5
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Service data with enhanced content
const services = [
  {
    icon: TargetIcon,
    title: "Account-Based Marketing",
    description: "Smarter engagement with buying groups at high-value accounts. Our targeted strategies personalize outreach, foster consensus among decision-makers, and accelerate sales cycles to drive success for your key accounts.",
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
  },
  {
    icon: LineChart,
    title: "Strategic Lead Generation",
    description: "Capture high-intent opt-in leads with tailored multi-channel campaigns. We attract and convert prospects across platforms, delivering qualified leads ready to engage and aligned with your goals.",
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
    description: "Connect with ideal buyers and elevate branded demand. We distribute your content across curated channels to boost reach, strengthen brand awareness, and spark interest in your offerings.",
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
    description: "Maximize ideal customer registrations and event attendance. Our campaigns promote and manage virtual or in-person events, ensuring strong turnout and impactful experiences for your audience.",
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
    description: "Prioritize leads with high conversion potential for sales teams using BANT criteria. We evaluate prospects for fit, intent, and readiness, refining your pipeline to boost efficiency and achieve stronger results.",
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
      {/* Static Background (replaced animated background) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60" />
        
        {/* Fine-grain texture overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        
        {/* Accent color rays */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-primary/5 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-primary/3 to-transparent opacity-60" />
        
        {/* Static decorative elements (replaced animated blobs) */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-[80px]" />
        <div className="absolute -bottom-60 -right-20 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Simplified header section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-20"
        >
          <div className="inline-block mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Industry-Leading Solutions
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Comprehensive B2B Marketing Services
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our data-driven solutions are designed to scale your demand generation efforts,
            delivering measurable results and exceptional ROI for your B2B marketing initiatives.
          </p>
        </motion.div>

        {/* Simplified service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="flex"
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              <div className="relative w-full h-full">
                {/* Simplified card with hover effect */}
                <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-sm border-0 shadow-lg group transition-all duration-300 ease-out hover:shadow-xl">
                  {/* Color accent top bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${service.gradients[0].replace('/20', '/80').replace('/30', '/90')}`}></div>
                  
                  {/* Simplified icon */}
                  <div className="relative flex justify-center mt-[-25px] sm:mt-[-30px]">
                    <div className="p-4 rounded-[20px] z-10 shadow-lg border border-white/80 bg-gradient-to-br from-white to-white/90">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-[16px] opacity-30 bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')} blur-[10px] -z-10`} />
                        <service.icon className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="px-4 sm:px-6 md:px-8 pt-4 pb-6 md:pb-8">
                    {/* Title with static underline */}
                    <div className="relative inline-block mb-3">
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <div className={`h-1 rounded-full bg-gradient-to-r ${service.gradients[0].replace('/20', '/60').replace('/30', '/70')}`} 
                          style={{width: activeIndex === index ? '100%' : '0%', 
                                 transition: 'width 0.3s ease-in-out'}} />
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <motion.ul 
                      variants={featureVariants}
                      className="space-y-2 mb-6"
                    >
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <feature.icon className="h-5 w-5 text-primary/70" />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </motion.ul>
                    
                    {/* Highlight */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-primary/5 text-primary rounded-full px-3 py-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="text-sm font-medium">{service.highlight}</span>
                      </div>
                      
                      <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to supercharge your lead generation?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Schedule a no-obligation consultation to discuss your business goals and discover how our tailored solutions can help you exceed your targets.
          </p>
          <a 
            href={calendlyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Schedule a 30-minute consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}