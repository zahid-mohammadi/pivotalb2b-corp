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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        {/* Funnel Shape with Interactive Hover */}
        <svg viewBox="0 0 400 500" className="w-full">
          <defs>
            {funnelStages.map((stage, index) => (
              <React.Fragment key={`defs-${index}`}>
                <linearGradient
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
                <linearGradient
                  id={`stage${index}HoverGradient`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={stage.color.replace('0.3', '0.6')} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={stage.color.replace('0.3', '0.6')} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={stage.color.replace('0.3', '0.6')} stopOpacity="0.9" />
                </linearGradient>
                <filter id={`glow${index}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </React.Fragment>
            ))}
          </defs>

          {/* Funnel Stages */}
          {funnelStages.map((stage, index) => {
            const startY = index === 0 ? 0 : funnelStages[index - 1].y;
            const endY = stage.y;
            const startWidth = 300 - (index * 50);
            const endWidth = 300 - ((index + 1) * 50);

            return (
              <motion.g key={`stage-${index}`}>
                <motion.path
                  d={`M${200 - startWidth/2},${startY} 
                     L${200 + startWidth/2},${startY} 
                     L${200 + endWidth/2},${endY} 
                     L${200 - endWidth/2},${endY} Z`}
                  fill={`url(#stage${index}Gradient)`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  initial={{ filter: 'none' }}
                  whileHover={{
                    fill: `url(#stage${index}HoverGradient)`,
                    filter: `url(#glow${index})`,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="cursor-pointer"
                />
                <motion.path
                  d={`M${200 - startWidth/2},${startY} 
                     L${200 + startWidth/2},${startY} 
                     L${200 + endWidth/2},${endY} 
                     L${200 - endWidth/2},${endY} Z`}
                  fill="transparent"
                  stroke="transparent"
                  className="cursor-pointer"
                  whileHover={{
                    stroke: "rgba(255, 255, 255, 0.4)",
                    strokeWidth: 2,
                    transition: { duration: 0.2 }
                  }}
                />
                <text
                  x="20"
                  y={stage.y - 10}
                  fill="white"
                  fontSize="14"
                  className="font-medium pointer-events-none"
                >
                  {stage.name}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Lead Flow Animation */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            style={{
              top: -80,
              left: 100 + (index * 50),
            }}
            animate={{
              y: [0, 100, 250, 400],
              x: [0, -(index * 10), -(index * 20), -(index * 30)],
              scale: [1, 0.95, 0.9, 0.85],
              opacity: [1, 1, 1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 1,
              ease: "linear"
            }}
          >
            <div className="relative">
              {/* Job Title */}
              <div 
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-base font-medium backdrop-blur-sm shadow-lg"
                style={{ 
                  backgroundColor: job.color,
                  minWidth: 'max-content',
                  whiteSpace: 'nowrap'
                }}
              >
                {job.title}
              </div>

              {/* Lead Icon */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: job.color }}
              >
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const targetAccounts = [
  { x: 50, y: 50 },
  { x: 150, y: 30 },
  { x: 250, y: 50 },
  { x: 350, y: 30 },
];