import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart, Users, Database, PieChart, TrendingUp, CheckCircle, Sparkles, Zap, Rocket, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden flex items-center">
      {/* Ultra-Modern Background Architecture */}
      <div className="absolute inset-0">
        {/* Multi-layer Gradient Foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-purple-950/40" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-cyan-950/20 to-transparent" />

        {/* Sophisticated Particle System */}
        {!isMobile && (
          <>
            {/* Primary Floating Orbs with Advanced Physics */}
            <motion.div
              className="absolute top-1/5 left-1/5 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/25 via-purple-500/15 to-cyan-500/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 0.9, 1.2, 1],
                opacity: [0.2, 0.4, 0.6, 0.3, 0.2],
                x: [0, 60, -30, 40, 0],
                y: [0, -40, 20, -20, 0],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/6 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/20 via-orange-500/10 to-red-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.1, 0.8, 1.4, 1, 1.1],
                opacity: [0.15, 0.35, 0.25, 0.45, 0.15],
                x: [0, -50, 30, -20, 0],
                y: [0, 50, -30, 40, 0],
                rotate: [0, -90, -180, -270, -360],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/2 w-[350px] h-[350px] bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-blue-500/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1.1, 0.9, 1],
                opacity: [0.3, 0.1, 0.5, 0.2, 0.3],
                x: [0, 70, -50, 20, 0],
                y: [0, -60, 10, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 6,
              }}
            />

            {/* Advanced Geometric Constellation */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 4 === 0 ? 'bg-blue-400/40' : 
                  i % 4 === 1 ? 'bg-purple-400/40' : 
                  i % 4 === 2 ? 'bg-pink-400/40' : 'bg-cyan-400/40'
                }`}
                style={{
                  top: `${5 + Math.random() * 90}%`,
                  left: `${5 + Math.random() * 90}%`,
                }}
                animate={{
                  y: [0, -30, 15, -45, 0],
                  x: [0, 20, -10, 25, 0],
                  scale: [1, 2, 0.5, 2.5, 1],
                  opacity: [0.2, 0.8, 0.4, 1, 0.2],
                }}
                transition={{
                  duration: 8 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Dynamic Success Metrics Visualization */}
            <div className="absolute top-1/3 right-8 opacity-10">
              <motion.div
                className="flex items-end gap-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                {[45, 65, 85, 110, 135, 160, 140].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-3 bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-t-sm"
                    style={{ height: 0 }}
                    animate={{ 
                      height: [0, height, height * 0.8, height, 0, height * 1.2, height],
                      opacity: [0.3, 0.8, 0.6, 1, 0.4, 0.9, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      delay: 2 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Floating Interactive Icons */}
            {[
              { Icon: Target, top: '15%', right: '18%', color: 'text-blue-400/30' },
              { Icon: Users, top: '35%', right: '12%', color: 'text-purple-400/30' },
              { Icon: Rocket, top: '55%', right: '22%', color: 'text-pink-400/30' },
              { Icon: TrendingUp, top: '75%', right: '15%', color: 'text-cyan-400/30' },
            ].map((item, i) => (
              <motion.div
                key={`icon-${i}`}
                className={`absolute ${item.color}`}
                style={{ top: item.top, right: item.right }}
                animate={{
                  y: [0, -25, 10, -20, 0],
                  x: [0, 15, -10, 20, 0],
                  rotate: [0, 15, -10, 20, 0],
                  opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
                  scale: [1, 1.3, 0.9, 1.2, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.2,
                }}
              >
                <item.Icon size={28} />
              </motion.div>
            ))}
          </>
        )}

        {/* Advanced Layered Mesh Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Premium Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.div 
              className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-2xl border border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                background: "linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(6, 182, 212, 0.15))"
              }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"]
                }}
                transition={{ 
                  rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                  filter: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
              </motion.div>
              
              <span className="text-white font-semibold tracking-wide text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Every Lead. Vetted. Qualified. Revenue-Ready.
              </span>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                  filter: ["drop-shadow(0 0 0 rgba(251, 191, 36, 0.5))", "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))", "drop-shadow(0 0 0 rgba(251, 191, 36, 0.5))"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Ultra-Premium Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-8 relative">
              <motion.span 
                className="inline-block relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
              >
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(147, 51, 234, 0.7)",
                      "0 0 60px rgba(244, 114, 182, 0.5)",
                      "0 0 40px rgba(6, 182, 212, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{
                    backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" },
                    textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{
                    background: "linear-gradient(45deg, #ffffff, #60a5fa, #a78bfa, #06b6d4, #f472b6, #fbbf24, #ffffff)",
                    backgroundSize: "600% 600%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="drop-shadow-2xl"
                >
                  Build a Pipeline That
                  <br />
                  <motion.span
                    className="relative"
                    animate={{
                      scale: [1, 1.02, 1],
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
                    }}
                    style={{
                      background: "linear-gradient(45deg, #ffffff, #60a5fa, #a78bfa, #06b6d4, #f472b6, #fbbf24, #ffffff)",
                      backgroundSize: "600% 600%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Actually Converts
                    <motion.div
                      className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </motion.span>
                </motion.span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Enhanced Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center mb-16"
          >
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed font-light"
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Our programs generate and qualify leads that align with your{' '}
              <motion.span
                className="font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"]
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
                ICP
              </motion.span>
              , ensuring every opportunity in your funnel has the potential to drive{' '}
              <motion.span
                className="font-semibold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                real revenue
              </motion.span>
              .
            </motion.p>
          </motion.div>

          {/* Ultra-Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" 
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-xl font-bold px-12 py-8 rounded-3xl shadow-2xl transition-all duration-500 border-2 border-white/20 hover:border-white/40"
                onClick={() => window.open(calendlyUrl, '_blank')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "linear"
                  }}
                />
                <span className="relative flex items-center gap-4">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="w-7 h-7" />
                  </motion.div>
                  Get Your Free Revenue Audit
                  <motion.div
                    className="group-hover:translate-x-2 transition-transform duration-300"
                    animate={{
                      x: [0, 5, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-7 h-7" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur opacity-50 group-hover:opacity-100 transition-all duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Button
                size="lg"
                variant="outline"
                className="relative bg-white/5 hover:bg-white/15 backdrop-blur-2xl border-2 border-white/40 hover:border-white/70 text-white text-xl font-semibold px-12 py-8 rounded-3xl transition-all duration-500 shadow-xl hover:shadow-2xl"
                onClick={() => window.location.href = '/request-proposal'}
              >
                <span className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="w-7 h-7" />
                  </motion.div>
                  Request a Proposal
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Ultra-Premium Core Value Promises */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="text-center mb-20"
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-12 relative"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 255, 255, 0.5)",
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(255, 255, 255, 0.5)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span
                className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"]
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
                🔹 Our Commitment to You
              </motion.span>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { icon: Target, text: "Quality Over Quantity", gradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/20", iconColor: "text-blue-400" },
                { icon: CheckCircle, text: "100% Compliant Outreach", gradient: "from-green-500/20 via-emerald-500/10 to-green-500/20", iconColor: "text-green-400" },
                { icon: BarChart, text: "Lower Cost per Lead", gradient: "from-purple-500/20 via-pink-500/10 to-purple-500/20", iconColor: "text-purple-400" },
                { icon: Shield, text: "No Long-Term Contracts, Zero Lock-In", gradient: "from-orange-500/20 via-yellow-500/10 to-orange-500/20", iconColor: "text-orange-400" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, y: 30, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 1.8 + (i * 0.2), 
                    duration: 1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5,
                    rotateX: -5
                  }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 shadow-xl group-hover:shadow-2xl h-full">
                    <motion.div
                      className="flex flex-col items-center text-center space-y-6"
                      animate={{
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    >
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.2
                        }}
                        transition={{
                          rotate: { duration: 0.5 },
                          scale: { duration: 0.3 }
                        }}
                      >
                        <item.icon className={`w-8 h-8 ${item.iconColor} drop-shadow-lg`} />
                        <motion.div
                          className={`absolute inset-0 rounded-2xl ${item.iconColor.replace('text-', 'bg-').replace('400', '400/20')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                      
                      <motion.span 
                        className="font-semibold text-white/95 text-lg leading-tight group-hover:text-white transition-colors duration-300"
                        animate={{
                          opacity: [0.95, 1, 0.95]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {item.text}
                      </motion.span>
                    </motion.div>
                    
                    {/* Subtle bottom border animation */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={{
                        scaleX: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}