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
      {/* Stylized Background with Target Accounts */}
      <div className="absolute inset-0">
        {/* Abstract geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: 100 + i * 20,
              height: 100 + i * 20,
              border: '2px solid',
              borderColor: `rgba(96, 165, 250, ${0.1 + i * 0.1})`,
              borderRadius: i % 2 === 0 ? '50%' : '30%',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Interconnected nodes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-8 h-8 rounded-full bg-primary/20"
            style={{
              top: `${30 + i * 20}%`,
              left: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 20px rgba(96, 165, 250, 0.2)',
                '0 0 40px rgba(96, 165, 250, 0.4)',
                '0 0 20px rgba(96, 165, 250, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Connecting lines between nodes */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M100,150 Q200,100 300,200 T500,300"
            fill="none"
            stroke="rgba(96, 165, 250, 0.2)"
            strokeWidth="2"
            strokeDasharray="4"
            animate={{
              strokeDashoffset: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Precision Targeting Effects */}
      <div className="absolute inset-0">
        {/* Radar sweep effect */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-64 h-64"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.2), transparent)',
            borderRadius: '50%',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Targeting crosshair */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`target-${i}`}
            className="absolute"
            style={{
              width: 60 + i * 20,
              height: 60 + i * 20,
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '50%',
              top: '25%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Funnel with enhanced stages */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <svg viewBox="0 0 400 500" className="w-full">
          <defs>
            {/* Stage-specific gradients */}
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

          {/* Funnel sections with different colors for each stage */}
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

          {/* Stage labels */}
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
                animate={{
                  strokeDashoffset: [0, -100]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Enhanced lead flow with stage transitions */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            animate={{
              y: [0, 150, 300, 400],
              x: [
                -180 + index * 50,
                -120 + index * 40,
                -80 + index * 30,
                -50 + index * 20,
              ],
              scale: [1, 0.9, 0.8, 0.7],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 1,
              times: [0, 0.3, 0.6, 1],
              ease: "linear",
            }}
          >
            <div 
              className="flex items-center gap-2 backdrop-blur-sm rounded-full p-1.5 pr-4 shadow-lg transition-all duration-300"
              style={{
                backgroundColor: `${job.color}20`,
                border: `1px solid ${job.color}40`
              }}
            >
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-white whitespace-nowrap">
                {job.title}
              </span>
              <motion.div
                className="absolute inset-0 rounded-full"
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

        {/* Enhanced conversion effect */}
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