import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, TrendingDown, Unlock, Calendar, FileText, CheckCircle, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-screen pt-16 sm:pt-20 md:pt-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-500/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-600/30 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Animated geometric shapes - Desktop only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-blue-400/30 rounded-3xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full backdrop-blur-sm"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-blue-300/40 rounded-full"
                style={{
                  top: `${15 + Math.random() * 70}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Content - Centered Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8 sm:space-y-10 lg:space-y-12"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Premium B2B Lead Generation & ABM Programs</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              data-testid="headline-hero"
            >
              <span className="block text-white mb-2">Build a Pipeline That</span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200%"
                }}
              >
                Converts
              </motion.span>
              <span className="block text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                — Not Just One That Fills
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-blue-100 leading-relaxed max-w-5xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              data-testid="subheadline-hero"
            >
              Our ABM and demand generation programs engage decision-makers inside your Target Accounts through compliant, content-led outreach — delivering <span className="font-semibold text-white">real buyers</span>, not random leads.
            </motion.p>

            {/* 3 Cs Framework Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
                <Shield className="w-4 h-4 text-green-300" />
                <span className="text-sm font-semibold text-green-100">100% Compliant</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                <TrendingDown className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-semibold text-blue-100">Conversion-Focused</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
                <Unlock className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-semibold text-purple-100">No Contracts</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 text-lg sm:text-xl font-bold px-8 sm:px-10 py-6 sm:py-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group w-full sm:w-auto"
                  onClick={() => window.open(calendlyUrl, '_blank')}
                  data-testid="button-schedule-strategy-call-hero"
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  Schedule a Strategy Call
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg sm:text-xl font-semibold px-8 sm:px-10 py-6 sm:py-8 rounded-2xl transition-all duration-300 w-full sm:w-auto"
                  onClick={() => window.location.href = '/request-proposal'}
                  data-testid="button-request-proposal-hero"
                >
                  <FileText className="w-6 h-6 mr-3" />
                  Request a Proposal
                </Button>
              </motion.div>
            </motion.div>

            {/* Key Benefits - Enhanced Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto pt-8 sm:pt-12"
            >
              {[
                { 
                  icon: Target, 
                  title: "Quality Over Quantity",
                  description: "Only pre-qualified buyers aligned with your ICP",
                  gradient: "from-blue-500 to-cyan-500"
                },
                { 
                  icon: Shield, 
                  title: "100% Compliant Outreach",
                  description: "GDPR, CCPA & TCPA ready",
                  gradient: "from-purple-500 to-pink-500"
                },
                { 
                  icon: TrendingDown, 
                  title: "Lower Cost per Lead",
                  description: "Smarter targeting, measurable ROI",
                  gradient: "from-green-500 to-emerald-500"
                },
                { 
                  icon: Unlock, 
                  title: "No Long-Term Contracts",
                  description: "Total flexibility, zero lock-in",
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.2 + (i * 0.1), duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group"
                  data-testid={`benefit-card-${i}`}
                >
                  <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative p-6 sm:p-8 text-center space-y-4">
                      <motion.div
                        className={`w-16 h-16 mx-auto bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}
