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
  { name: "Awareness", color: "rgba(96, 165, 250, 0.3)" },
  { name: "Consideration", color: "rgba(167, 139, 250, 0.3)" },
  { name: "Decision", color: "rgba(52, 211, 153, 0.3)" }
];

export const SalesFunnel = () => {
  return (
    <div className="relative w-full h-[600px]">
      {/* Funnel Structure */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
        {/* Funnel Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5" />

        {/* Funnel Shape */}
        <svg className="absolute inset-0" viewBox="0 0 400 500">
          <path
            d="M50,0 L350,0 L300,500 L100,500 Z"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />

          {/* Stage Lines */}
          <line x1="50" y1="166" x2="350" y2="166" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="70" y1="333" x2="330" y2="333" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>

        {/* Stage Labels */}
        {funnelStages.map((stage, index) => (
          <div
            key={stage.name}
            className="absolute left-4 text-white text-sm font-medium"
            style={{ top: `${index * 166 + 156}px` }}
          >
            {stage.name}
          </div>
        ))}

        {/* Animated Leads */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            style={{
              left: `${index * 50}px`,
              top: "-50px"
            }}
            animate={{
              left: [
                `${index * 50}px`,
                `${(index * 40) + 50}px`,
                `${(index * 30) + 100}px`,
                `${(index * 20) + 150}px`
              ],
              top: ["-50px", "166px", "333px", "500px"],
              scale: [1, 0.9, 0.8, 0.7],
              opacity: [1, 1, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "linear"
            }}
          >
            {/* Lead Icon with Title */}
            <div className="relative">
              {/* Job Title */}
              <div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg shadow-lg text-white"
                style={{
                  backgroundColor: job.color,
                  whiteSpace: "nowrap",
                  fontSize: "0.875rem"
                }}
              >
                {job.title}
              </div>

              {/* Icon */}
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