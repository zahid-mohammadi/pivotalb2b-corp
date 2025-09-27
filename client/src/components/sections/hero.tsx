import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Clock, BarChart, Network, LineChart, Users, Database, PieChart, TrendingUp, CheckCircle, Sparkles, Zap, Rocket, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const calendlyUrl = "https://calendly.com/zahid-m/30min";
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden flex items-center">
      {/* Revolutionary Background Design */}
      <div className="absolute inset-0">
        {/* Primary Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Geometric Elements */}
        {!isMobile && (
          <div className="absolute inset-0">
            {/* Floating Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className={`absolute w-4 h-4 rounded-full ${
                  i % 3 === 0 ? 'bg-blue-400/30' : 
                  i % 3 === 1 ? 'bg-purple-400/30' : 'bg-pink-400/30'
                }`}
                style={{
                  top: `${15 + (i * 12)}%`,
                  left: `${10 + (i * 15)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Revenue Growth Visualization */}
            <div className="absolute top-1/2 right-10 opacity-20">
              <motion.div
                className="flex items-end gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {[40, 60, 80, 100, 120].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-6 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ height: 0 }}
                    animate={{ height: height }}
                    transition={{
                      duration: 1.5,
                      delay: 1.5 + i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Floating Success Icons */}
            {[
              { Icon: Target, top: '20%', right: '20%' },
              { Icon: Rocket, top: '40%', right: '15%' },
              { Icon: TrendingUp, top: '60%', right: '25%' },
            ].map((item, i) => (
              <motion.div
                key={`icon-${i}`}
                className="absolute text-white/20"
                style={{ top: item.top, right: item.right }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              >
                <item.Icon size={32} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <span className="text-white font-medium tracking-wide">
                Every Lead. Vetted. Qualified. Revenue-Ready.
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <motion.span 
                className="inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(45deg, #ffffff, #60a5fa, #a78bfa, #f472b6, #ffffff)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Build a Pipeline That
                <br />
                Actually Converts
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Our programs generate and qualify leads that align with your ICP, ensuring every opportunity in your funnel has the potential to drive real revenue.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300" />
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-bold px-10 py-6 rounded-2xl shadow-2xl transition-all duration-300"
                onClick={() => window.open(calendlyUrl, '_blank')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear"
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Get Your Free Revenue Audit
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:border-white/60 text-white text-xl font-semibold px-10 py-6 rounded-2xl transition-all duration-300"
                onClick={() => window.location.href = '/request-proposal'}
              >
                <span className="flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Request a Proposal
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Core Value Promises */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8">🔹 Core Value Promises</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Shield, text: "No long-term contracts, full flexibility" },
                { icon: Clock, text: "Guaranteed pipeline growth in 90 days" },
                { icon: CheckCircle, text: "100% compliant data and outreach — GDPR, CCPA & TCPA ready" },
                { icon: TrendingUp, text: "Predictable, revenue-focused pipeline growth" },
                { icon: BarChart, text: "Lower cost per qualified lead with measurable ROI" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  delay={i * 0.1}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                  </motion.div>
                  <span className="font-medium text-white/90 text-left">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Target, 
                title: "Quality Over Quantity", 
                description: "Every lead is pre-qualified with budget, authority, and genuine buying intent",
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              { 
                icon: TrendingUp, 
                title: "Predictable Growth", 
                description: "Turn your marketing spend into a reliable revenue generation machine",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              { 
                icon: Rocket, 
                title: "Fast Implementation", 
                description: "See your first qualified leads within 72 hours of campaign launch",
                gradient: "from-pink-500/20 to-orange-500/20"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                
                {/* Card Content */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {card.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}