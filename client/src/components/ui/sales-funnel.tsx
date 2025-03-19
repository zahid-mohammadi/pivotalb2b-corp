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
  { name: "Awareness", y: 100 },
  { name: "Consideration", y: 250 },
  { name: "Decision", y: 400 }
];

export const SalesFunnel = () => {
  return (
    <div className="relative w-full h-[600px]">
      {/* Simple Funnel Shape */}
      <svg className="absolute inset-0" viewBox="0 0 400 600">
        <path
          d="M50,50 L350,50 L300,500 L100,500 Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        {/* Stage Lines */}
        {funnelStages.map((stage, index) => (
          <line
            key={`stage-${index}`}
            x1={75 + (index * 25)}
            y1={stage.y}
            x2={325 - (index * 25)}
            y2={stage.y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}
      </svg>

      {/* Lead Icons */}
      {jobTitles.map((job, index) => (
        <motion.div
          key={`lead-${index}`}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-50px",
          }}
          animate={{
            top: ["0%", "20%", "40%", "60%", "80%"],
            x: ["-50%", 
              `${-30 + (index * 10)}%`,
              `${-20 + (index * 5)}%`,
              `${-10 + (index * 2)}%`,
              "0%"
            ],
            scale: [1, 0.9, 0.8, 0.7, 0.6],
            opacity: [1, 1, 1, 1, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 0.7,
            ease: "linear"
          }}
        >
          {/* Lead Card with Job Title */}
          <div className="relative">
            {/* Job Title */}
            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full"
              style={{ backgroundColor: job.color }}
            >
              <span className="text-sm font-medium text-white whitespace-nowrap">
                {job.title}
              </span>
            </div>

            {/* Icon Container */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: job.color }}
            >
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Stage Labels */}
      {funnelStages.map((stage, index) => (
        <div
          key={`label-${index}`}
          className="absolute left-4 text-white text-sm font-medium"
          style={{ top: `${stage.y}px` }}
        >
          {stage.name}
        </div>
      ))}
    </div>
  );
};