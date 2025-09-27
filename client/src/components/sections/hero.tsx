import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, Rocket, TrendingUp, Sparkles, Zap, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 text-foreground overflow-hidden">
      {/* Modern Clean Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/20 via-primary/5 to-transparent opacity-30" />
        
        {/* Clean geometric shapes */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary/20 rounded-3xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/6 w-24 h-24 bg-primary/10 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Simple floating dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  right: `${10 + Math.random() * 30}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/30 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Every Lead. Vetted. Qualified. Revenue-Ready.</span>
              </div>
            </motion.div>

            {/* Main Headline - Original Content */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="block text-foreground">Fill Your Pipeline</span>
              <span className="block text-foreground">With </span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200%"
                }}
              >
                Buyers Who Convert
              </motion.span>
            </motion.h1>

            {/* Subheadline - Original Content */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Our programs generate and qualify leads that align with your{' '}
              <span className="font-semibold text-primary">ICP</span>, ensuring every 
              opportunity in your funnel has the potential to drive{' '}
              <span className="font-semibold text-primary">real revenue</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open(calendlyUrl, '_blank')}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Get Your Free Revenue Audit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/20 hover:border-primary/40 bg-background/60 hover:bg-background/80 backdrop-blur text-foreground text-lg font-medium px-8 py-6 rounded-2xl transition-all duration-300"
                  onClick={() => window.location.href = '/request-proposal'}
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5" />
                    Request a Proposal
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { icon: Target, text: "Quality Over Quantity" },
                { icon: Users, text: "100% Compliant Outreach" },
                { icon: TrendingUp, text: "Lower Cost per Lead" },
                { icon: Sparkles, text: "No Long-Term Contracts, Zero Lock-In" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/10 hover:border-primary/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + (i * 0.1), duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Creative Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-96 lg:h-[500px] order-1 lg:order-2 flex items-center justify-center"
          >
            {/* Central Hero Visual */}
            <motion.div
              className="relative w-80 h-80 lg:w-96 lg:h-96"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30 border-dashed"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-primary/50"
                animate={{
                  rotate: [0, -360]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Inner Circle */}
              <motion.div
                className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/30 backdrop-blur-sm border border-primary/40 shadow-2xl flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                    "0 35px 60px -12px rgba(0, 0, 0, 0.2)",
                    "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="text-center space-y-3"
                  animate={{
                    rotate: [0, -360]
                  }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Target className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="text-sm font-semibold text-primary">B2B LEADS</div>
                  <div className="text-xs text-muted-foreground">QUALIFIED</div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Action Icons */}
            {!isMobile && (
              <>
                {[
                  { icon: Users, delay: 0, position: "top-8 left-8" },
                  { icon: Rocket, delay: 0.5, position: "top-8 right-8" },
                  { icon: TrendingUp, delay: 1, position: "bottom-8 left-8" },
                  { icon: Star, delay: 1.5, position: "bottom-8 right-8" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${item.position} w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -8, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      opacity: { delay: item.delay, duration: 0.6 },
                      scale: { delay: item.delay, duration: 0.6 },
                      y: { delay: item.delay + 1, duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { delay: item.delay + 1, duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                ))}
              </>
            )}

            {/* Decorative Elements */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  style={{
                    top: `${20 + (i * 10)}%`,
                    left: `${10 + (i * 10)}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}