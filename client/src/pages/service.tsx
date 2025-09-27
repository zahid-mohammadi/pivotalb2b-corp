import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Zap,
  Target,
  Users,
  TrendingUp,
  Building2,
  BarChart4,
  Lightbulb,
  HelpCircle,
  Workflow,
  CircleDot,
  BookOpen,
  Award,
  Sparkles
} from "lucide-react";
import type { Service, UseCase, FAQ } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const [isHovering, setIsHovering] = useState(false);
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  const industries = [
    "Enterprise Software",
    "Telecommunication",
    "Financial Services",
    "IT Services and Consulting",
    "Professional Services",
    "B2B Vendors",
    "B2B Marketing Agencies"
  ];

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: [`/api/services/${params?.slug}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </div>
    );
  }

  // Generate industry-specific keywords
  const industryKeywords = industries.map(industry => 
    `${service.title} for ${industry}, ${industry} ${service.title.toLowerCase()}`
  ).join(', ');

  return (
    <>
      <MetaTags
        title={`${service.title} - B2B Marketing Solutions | Pivotal B2B`}
        description={`Transform your B2B marketing with our ${service.title}. ${service.description} Expert solutions for enterprise software, telecommunication, financial services, and IT services sectors.`}
        keywords={`${service.title.toLowerCase()}, B2B ${service.title.toLowerCase()}, ${industryKeywords}, enterprise marketing solutions, B2B lead generation`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "url": "https://pivotal-b2b.com"
          },
          "serviceType": "B2B Marketing Service",
          "areaServed": industries
        }}
      />
      <div className="min-h-screen">
        {/* Revolutionary Hero Section - Conversion Optimized */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-[85vh] flex items-center"
             style={{ perspective: "2000px" }}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
          
          {/* Ultra-Advanced Background System */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98" />
            
            {/* Quantum Field Grid */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px'],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
                opacity: { duration: 6, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Dynamic 3D Geometric Shapes */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-16 left-16 w-40 h-40 border border-white/8 rounded-2xl"
                animate={{
                  rotateY: [0, 60, 0],
                  rotateX: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
              
              <motion.div
                className="absolute top-32 right-24 w-32 h-32 border border-white/10 rounded-full"
                animate={{
                  rotateZ: [0, 180, 360],
                  y: [0, -30, 0],
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  rotateZ: { duration: 15, repeat: Infinity, ease: "linear" },
                  y: { duration: 8, repeat: Infinity, repeatType: "reverse", delay: 2 },
                  opacity: { duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 },
                  scale: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                }}
              />
              
              <motion.div
                className="absolute bottom-40 left-1/3 w-48 h-48 border border-white/6 rounded-2xl"
                animate={{
                  rotateX: [0, -45, 0],
                  rotateY: [0, 45, 0],
                  x: [0, 30, 0],
                  opacity: [0.1, 0.25, 0.1]
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 3
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
            </div>
            
            {/* Holographic Energy Orbs */}
            <motion.div
              className="absolute top-1/4 right-16 w-80 h-80 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), transparent)',
                  'radial-gradient(circle, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.15), transparent)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.15), rgba(59, 130, 246, 0.1), transparent)'
                ],
                scale: [1, 1.4, 1]
              }}
              transition={{
                background: { duration: 8, repeat: Infinity },
                scale: { duration: 6, repeat: Infinity, repeatType: "reverse" }
              }}
            />
            
            <motion.div
              className="absolute bottom-1/4 left-20 w-96 h-96 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(16, 185, 129, 0.12), rgba(245, 158, 11, 0.08), transparent)',
                  'radial-gradient(circle, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.1), transparent)',
                  'radial-gradient(circle, rgba(239, 68, 68, 0.1), rgba(16, 185, 129, 0.08), transparent)'
                ],
                scale: [1.2, 1, 1.2]
              }}
              transition={{
                background: { duration: 10, repeat: Infinity, delay: 2 },
                scale: { duration: 8, repeat: Infinity, repeatType: "reverse", delay: 4 }
              }}
            />
            
            {/* Particle System */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative container mx-auto px-4 py-20 z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Revolutionary Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Ultra-Dynamic Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className="relative"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-400 shadow-lg" />
                    <motion.div
                      className="absolute inset-0 w-4 h-4 rounded-full bg-green-400/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-white/90 font-bold">Trusted by 500+ Enterprise Clients</span>
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map((i) => (
                        <motion.div 
                          key={i} 
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/30 flex items-center justify-center"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Quantum-Enhanced Title */}
                <div className="relative">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative">
                      <span className="block text-white">
                        {service.title.split(' ').slice(0, -2).join(' ')}
                      </span>
                      <motion.span 
                        className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text relative"
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        style={{ 
                          backgroundSize: '300% 300%'
                        }}
                        transition={{ 
                          backgroundPosition: { duration: 6, repeat: Infinity }
                        }}
                      >
                        {service.title.split(' ').slice(-2).join(' ')}
                        
                        {/* Holographic Scanning Lines */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                          style={{ mixBlendMode: 'overlay' }}
                        />
                      </motion.span>
                    </div>
                  </motion.h1>
                </div>
                
                {/* Enhanced Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative"
                >
                  <p className="text-xl text-white/85 mb-10 leading-relaxed font-light relative z-10">
                    {service.description}
                  </p>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-2xl -z-10"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      x: { duration: 4, repeat: Infinity, repeatDelay: 6 },
                      opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                    }}
                  />
                </motion.div>

                {/* Revolutionary CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  {/* Primary CTA */}
                  <motion.button
                    onClick={() => window.location.href = '/request-proposal'}
                    className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl font-bold text-white text-lg shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 20px 40px rgba(59, 130, 246, 0.3)',
                        '0 25px 50px rgba(147, 51, 234, 0.4)',
                        '0 20px 40px rgba(59, 130, 246, 0.3)'
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      {[...Array(6)].map((_, i) => (
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
                    
                    <span className="relative flex items-center justify-center gap-3 z-10">
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                      >
                        🚀 Get Revenue Audit
                      </motion.span>
                      <motion.div
                        animate={{ 
                          x: [0, 5, 0],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          x: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                          rotate: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                    </span>
                  </motion.button>
                  
                  {/* Secondary CTA */}
                  <motion.button
                    onClick={() => window.location.href = '/case-studies'}
                    className="px-10 py-5 border-2 border-white/40 rounded-3xl font-semibold text-white hover:bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.6)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Success Stories
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {/* Right Column - Holographic Metrics Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Revolutionary Metrics Dashboard */}
                <motion.div
                  className="relative bg-white/10 backdrop-blur-md rounded-[2rem] p-10 border border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                  animate={{
                    boxShadow: [
                      '0 25px 50px rgba(0,0,0,0.2)',
                      '0 35px 70px rgba(0,0,0,0.3)',
                      '0 25px 50px rgba(0,0,0,0.2)'
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  {/* Holographic Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-[2rem] border-2"
                    style={{
                      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'subtract',
                      maskComposite: 'subtract'
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <div className="text-center mb-10">
                    <motion.h3 
                      className="text-3xl font-bold text-white mb-3"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      Guaranteed Results
                    </motion.h3>
                    <p className="text-white/70 text-lg">Proven success with our enterprise clients</p>
                  </div>
                  
                  {/* Success Indicators */}
                  <div className="space-y-8 mb-10">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="relative group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            animate={{
                              background: [
                                'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                                'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))',
                                'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))'
                              ]
                            }}
                            transition={{
                              background: { duration: 3, repeat: Infinity }
                            }}
                          >
                            <Target className="h-6 w-6 text-white" />
                          </motion.div>
                          <span className="text-white/80 font-medium">Predictable Pipeline Growth</span>
                        </div>
                      </div>
                      
                      {/* Animated Progress Bar */}
                      <div className="relative bg-white/10 rounded-full p-1 mb-4 overflow-hidden">
                        <motion.div
                          className="h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative overflow-hidden"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ 
                            delay: 1.2, 
                            duration: 1.5,
                            ease: "easeOut"
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{
                              x: ['-100%', '200%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      <motion.p 
                        className="text-white font-bold text-xl"
                        animate={{ 
                          scale: [1, 1.03, 1]
                        }}
                        transition={{ 
                          scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                        }}
                      >
                        Consistent Revenue Generation
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Quantum Trust Indicators */}
                  <motion.div 
                    className="pt-8 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <motion.div 
                        className="flex items-center gap-3 text-white/70 text-sm"
                        whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.9)' }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        </motion.div>
                        <span className="font-medium">90-Day Guarantee</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 text-white/70 text-sm"
                        whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.9)' }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <BarChart3 className="h-5 w-5 text-blue-400" />
                        </motion.div>
                        <span className="font-medium">ROI Tracking</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 text-white/70 text-sm"
                        whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.9)' }}
                      >
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                        </motion.div>
                        <span className="font-medium">24/7 Support</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 text-white/70 text-sm"
                        whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.9)' }}
                      >
                        <motion.div
                          animate={{ rotate: [0, -15, 15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Award className="h-5 w-5 text-purple-400" />
                        </motion.div>
                        <span className="font-medium">Certified Experts</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Quantum Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2], 
                    opacity: [0.4, 0.2, 0.4],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    delay: 2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            {/* Ultimate Social Proof Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-20 text-center"
            >
              <p className="text-white/60 text-lg mb-8 font-light">Trusted by industry leaders worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {['Microsoft', 'Salesforce', 'Oracle', 'IBM', 'AWS', 'Adobe'].map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.1, 
                      opacity: 0.9, 
                      y: -2,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <span className="text-white/70 font-bold text-lg tracking-wider">{company}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Quantum Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-1 h-3 bg-white/60 rounded-full mt-3"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <div className="container mx-auto px-4 py-20">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 p-1 bg-gradient-to-r from-slate-100 to-white rounded-xl shadow-lg border border-slate-200/50">
              <TabsTrigger
                value="overview"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <BookOpen className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Overview</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="methodology"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <Workflow className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Methodology</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 data-[state=active]:from-rose-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <HelpCircle className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">FAQ</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Features Card */}
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <Zap className="h-6 w-6 text-blue-500" />
                          </div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Key Features</h2>
                        </div>
                        <div className="space-y-4">
                          {service.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full transform group-hover:scale-110 transition-transform">
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <p className="leading-tight pt-1 group-hover:text-blue-600 transition-colors">{feature}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Benefits Card */}
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            <Award className="h-6 w-6 text-purple-500" />
                          </div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Benefits</h2>
                        </div>
                        <div className="space-y-4">
                          {service.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full transform group-hover:scale-110 transition-transform">
                                  <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <p className="leading-tight pt-1 group-hover:text-purple-600 transition-colors">{benefit}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Tools & Technologies */}
                  {service.toolsAndTechnologies && (
                    <motion.div variants={itemVariants} className="lg:col-span-2" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                              <Workflow className="h-6 w-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">Tools & Technologies</h2>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {service.toolsAndTechnologies.map((tool, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200/80 hover:border-emerald-200 transition-colors">
                                  {tool}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>

              {/* Methodology Tab */}
              <TabsContent value="methodology">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Workflow className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Our Methodology</h2>
                      </div>
                      <div className="prose prose-slate max-w-none">
                        {service.methodology && (
                          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: service.methodology }} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>


              {/* FAQ Tab */}
              <TabsContent value="faq">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <HelpCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                      </div>
                      <div className="space-y-6">
                        {service.faqQuestions && service.faqQuestions.map((faq, index) => {
                          // Cast to FAQ type
                          const typedFaq = faq as FAQ;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group"
                            >
                              <div className="border-b border-slate-200 pb-6 last:border-0">
                                <h3 className="font-semibold mb-3 text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                                  <CircleDot className="h-4 w-4 text-primary" />
                                  {typedFaq.question}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-6">{typedFaq.answer}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90" />
              </div>
              <CardContent className="p-12 relative">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl">
                  Let's discuss how our {service.title} solution can help achieve your business goals.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => window.location.href = '/request-proposal'}
                    className="shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    Request a Proposal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open(calendlyUrl, '_blank')}
                    className="bg-transparent hover:bg-white/10 transition-colors"
                  >
                    Schedule a Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}