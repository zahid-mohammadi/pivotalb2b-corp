import { motion } from "framer-motion";
import React from "react";

const jobTitles = [
  "IT Director",
  "Marketing VP",
  "CIO",
  "Chief Financial Officer",
  "HR Director",
  "CTO",
  "CX/UX Director"
];

export const SalesFunnel = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Target Accounts */}
      <div className="absolute top-10 left-0 right-0 flex justify-center gap-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`target-${i}`}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
            <div className="relative w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20" />
          </motion.div>
        ))}
      </div>

      {/* Precision Targeting Effect */}
      <motion.div
        className="absolute top-40 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg width="200" height="100" viewBox="0 0 200 100" className="stroke-primary/40">
          <motion.path
            d="M20,80 Q100,20 180,80"
            fill="none"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>

      {/* Main Funnel */}
      <div className="absolute top-60 left-1/2 -translate-x-1/2">
        <motion.div
          className="relative w-[400px] h-[300px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Funnel Shape */}
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50,0 L350,0 L300,250 L100,250 Z"
              fill="url(#funnelGradient)"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Animated Leads */}
          {jobTitles.map((title, index) => (
            <motion.div
              key={title}
              className="absolute top-0"
              initial={{ x: -180 + index * 60, y: -20, opacity: 0 }}
              animate={{
                x: [-180 + index * 60, -100 + index * 30, -50 + index * 20],
                y: [0, 100, 200],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="px-2 py-1 bg-primary/10 backdrop-blur-sm rounded text-xs whitespace-nowrap">
                  {title}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Conversion Effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-green-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
