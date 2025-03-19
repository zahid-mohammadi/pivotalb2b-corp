import { motion } from "framer-motion";
import { User } from "lucide-react";
import React from "react";

const jobTitles = [
  { title: "IT Director", color: "#60A5FA" },
  { title: "Marketing VP", color: "#34D399" },
  { title: "CIO", color: "#818CF8" },
  { title: "Chief Financial Officer", color: "#F472B6" },
  { title: "HR Director", color: "#A78BFA" },
  { title: "CTO", color: "#FBBF24" },
  { title: "CX/UX Director", color: "#F87171" }
];

const funnelStages = [
  { name: "Awareness", color: "rgba(96, 165, 250, 0.3)", y: 100 },
  { name: "Consideration", color: "rgba(167, 139, 250, 0.3)", y: 250 },
  { name: "Decision", color: "rgba(52, 211, 153, 0.3)", y: 400 }
];

export const SalesFunnel = () => {
  return (
    <div className="relative w-full h-[600px]">
      {/* Main Funnel */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        {/* Lead Generation Points */}
        <div className="absolute -top-20 w-full">
          {jobTitles.map((job, index) => (
            <div key={`source-${index}`} className="absolute" style={{ left: `${index * 80}px`, top: 0 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 1
                }}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: job.color }}
              />
            </div>
          ))}
        </div>

        {/* Funnel Shape */}
        <svg viewBox="0 0 400 500" className="w-full">
          {/* Stage-specific gradients */}
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

          {/* Funnel sections with different colors */}
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

        {/* Animated Lead Flow */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            initial={{ 
              x: index * 80,
              y: 0,
              opacity: 0 
            }}
            animate={{
              x: [
                index * 80, // Start position
                (index * 60) - 30, // First stage
                (index * 40) - 60, // Second stage
                (index * 20) - 90  // Final stage
              ],
              y: [0, 150, 300, 450],
              opacity: [0, 1, 1, 0],
              scale: [1, 0.9, 0.8, 0.7]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "linear"
            }}
            className="absolute -top-20"
          >
            <div className="relative">
              {/* Job Title Label */}
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-white text-sm font-medium whitespace-nowrap"
                style={{ backgroundColor: `${job.color}90` }}
              >
                {job.title}
              </div>

              {/* Lead Icon */}
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};