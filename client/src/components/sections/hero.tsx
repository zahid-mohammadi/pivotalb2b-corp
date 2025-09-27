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
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-left"
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

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-96 lg:h-[500px] order-1 lg:order-2"
          >
            {/* Main visual card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-primary/5 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl"
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="p-8 h-full flex flex-col justify-center space-y-6">
                {/* Success metrics visualization */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Our Commitment to You</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lead Quality Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <motion.div 
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ delay: 1.5, duration: 1.5 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-primary">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Qualification Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <motion.div 
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{ delay: 2, duration: 1.5 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-primary">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Cost Reduction</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <motion.div 
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            transition={{ delay: 2.5, duration: 1.5 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-primary">-35%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success indicators */}
                <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">Live Campaigns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Zero Lock-In</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating elements */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Target className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <TrendingUp className="w-6 h-6 text-primary" />
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}