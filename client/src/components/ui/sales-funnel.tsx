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
        {/* Entry Points for Leads */}
        <div className="absolute -top-32 w-full">
          {[0, 1, 2].map((position) => (
            <div 
              key={`entry-${position}`} 
              className="absolute h-2 w-2 rounded-full bg-primary/50"
              style={{
                left: `${100 + position * 100}px`,
                top: 0
              }}
            />
          ))}
        </div>

        {/* Funnel Background */}
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

          {/* Funnel Shape */}
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

          {/* Stage Labels */}
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

        {/* Animated Leads */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            style={{
              left: `${100 + ((index % 3) * 100)}px`, // Start from 3 entry points
              top: "-120px"
            }}
            animate={{
              y: [0, 550], // Move down through the funnel
              x: [0, -50 + (index * 10)], // Slight horizontal movement based on index
              scale: [1, 0.8], // Gradually reduce size
              opacity: [1, 1, 1, 0] // Fade out at the end
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: index * 1.2, // Stagger the animations
              ease: "linear"
            }}
          >
            {/* Lead Icon with Job Title */}
            <div className="relative">
              {/* Job Title Banner */}
              <div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                style={{ backgroundColor: job.color }}
              >
                <span className="text-sm font-medium text-white">
                  {job.title}
                </span>
              </div>

              {/* Lead Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
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