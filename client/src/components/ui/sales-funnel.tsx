import { motion } from "framer-motion";
import { Target, User, Sparkles, CheckCircle } from "lucide-react";
import React from "react";

const jobTitles = [
  { title: "IT Director", color: "#60A5FA", stage: 1 },
  { title: "Marketing VP", color: "#34D399", stage: 2 },
  { title: "CIO", color: "#818CF8", stage: 3 },
  { title: "Chief Financial Officer", color: "#F472B6", stage: 1 },
  { title: "HR Director", color: "#A78BFA", stage: 2 },
  { title: "CTO", color: "#FBBF24", stage: 3 },
  { title: "CX/UX Director", color: "#F87171", stage: 1 }
];

const funnelStages = [
  { name: "Awareness", color: "rgba(96, 165, 250, 0.3)", y: 100 },
  { name: "Consideration", color: "rgba(167, 139, 250, 0.3)", y: 200 },
  { name: "Decision", color: "rgba(52, 211, 153, 0.3)", y: 300 }
];

export const SalesFunnel = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Lead Entry Points */}
      <div className="absolute -top-20 w-full">
        {jobTitles.map((job, index) => (
          <motion.div
            key={`entry-${index}`}
            className="absolute"
            style={{
              left: `${10 + (index * 80)}px`,
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-20, 0, 20, 40],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.5,
              times: [0, 0.1, 0.9, 1]
            }}
          >
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm shadow-lg border-2 transition-all duration-300"
              style={{
                backgroundColor: `${job.color}20`,
                borderColor: job.color
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  {job.title}
                </span>
                <span className="text-xs text-white/70">New Lead</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Funnel */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <svg viewBox="0 0 400 500" className="w-full">
          <defs>
            {funnelStages.map((stage, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`stage${index}Gradient`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={stage.color} stopOpacity="0.8" />
                <stop offset="50%" stopColor={stage.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={stage.color} stopOpacity="0.8" />
              </linearGradient>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {funnelStages.map((stage, index) => {
            const startY = index === 0 ? 0 : funnelStages[index - 1].y;
            const endY = stage.y;
            const startWidth = 300 - (index * 50);
            const endWidth = 300 - ((index + 1) * 50);

            return (
              <motion.path
                key={`stage-${index}`}
                d={`M${200 - startWidth/2},${startY} 
                   L${200 + startWidth/2},${startY} 
                   L${200 + endWidth/2},${endY} 
                   L${200 - endWidth/2},${endY} Z`}
                fill={`url(#stage${index}Gradient)`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              />
            );
          })}

          {funnelStages.map((stage, index) => (
            <motion.g key={`label-${index}`}>
              <text
                x="20"
                y={stage.y - 10}
                fill="white"
                fontSize="12"
                opacity="0.8"
                className="text-xs"
              >
                {stage.name}
              </text>
              <motion.line
                x1="0"
                y1={stage.y}
                x2="400"
                y2={stage.y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="4"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Animated leads flowing through funnel */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            initial={{ 
              x: 10 + (index * 80),
              y: -20,
              scale: 1,
              opacity: 0 
            }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [1, 0.9, 0.8, 0.7, 0.6],
              x: [
                10 + (index * 80), 
                -150 + (index * 40), 
                -100 + (index * 30), 
                -50 + (index * 20),  
                0                    
              ],
              y: [-20, 100, 200, 300, 400]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 1,
              ease: "linear"
            }}
          >
            <div 
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300"
              style={{
                backgroundColor: `${job.color}20`,
                border: `1px solid ${job.color}40`
              }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-white whitespace-nowrap">
                {job.title}
              </span>
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${job.color}00`,
                    `0 0 20px 2px ${job.color}40`,
                    `0 0 0 0 ${job.color}00`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Conversion effect at bottom */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};