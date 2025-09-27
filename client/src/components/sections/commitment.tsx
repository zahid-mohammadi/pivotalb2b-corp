import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, TrendingUp, Users } from "lucide-react";

export function Commitment() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const commitments = [
    {
      icon: Target,
      title: "Qualified B2B Leads",
      description: "Every lead meets BANT criteria with verified budget and authority",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Predictable Pipeline Growth",
      description: "Build consistent revenue streams with demand generation services",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Risk-Free Guarantee",
      description: "If leads don't meet quality standards, we replace them at no cost",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Expert ABM Programs",
      description: "Accelerate B2B pipeline growth by engaging entire buying committees with strategic account-based marketing",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Our Commitment to You
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto px-4 sm:px-0">
            We deliver qualified B2B leads through proven demand generation services and ABM programs that accelerate B2B pipeline growth and transform your marketing investment into predictable revenue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {commitments.map((commitment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r ${commitment.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <commitment.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                {commitment.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                {commitment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}