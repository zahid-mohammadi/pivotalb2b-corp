import { motion } from "framer-motion";
import { User } from "lucide-react";
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
      {/* Simplified lead entry visualization */}
      <div className="absolute w-full py-8">
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            style={{
              left: `${50 + (index * 100)}px`,
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, 100, 200, 300],
              x: [
                0,
                -20 - (index * 10),
                -40 - (index * 20),
                -60 - (index * 30)
              ],
              scale: [1, 0.95, 0.9, 0.85]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "linear",
            }}
          >
            <div 
              className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md shadow-xl border-2 transition-all duration-300"
              style={{
                backgroundColor: `${job.color}20`,
                borderColor: job.color
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white whitespace-nowrap">
                  {job.title}
                </span>
                <span className="text-sm text-white/70">Potential Lead</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${job.color}00`,
                    `0 0 30px 4px ${job.color}40`,
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
      </div>

      {/* Funnel shape */}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              />
            );
          })}

          {/* Stage labels */}
          {funnelStages.map((stage, index) => (
            <text
              key={`label-${index}`}
              x="20"
              y={stage.y - 10}
              fill="white"
              fontSize="14"
              className="font-medium"
            >
              {stage.name}
            </text>
          ))}
        </svg>
      </div>
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
              {/*Sparkles className="w-7 h-7 text-white" / */}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};