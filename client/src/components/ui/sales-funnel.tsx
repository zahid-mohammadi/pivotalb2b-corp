import { motion } from "framer-motion";
import { Target, User, Sparkles, CheckCircle } from "lucide-react";
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

      {/* Main Funnel */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <svg viewBox="0 0 400 500" className="w-full">
          {/* Funnel gradient definition */}
          <defs>
            <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
              <stop offset="50%" stopColor="rgba(129, 140, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0.3)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Funnel shape with glow */}
          <motion.path
            d="M50,0 L350,0 L300,400 L100,400 Z"
            fill="url(#funnelGradient)"
            stroke="rgba(96, 165, 250, 0.5)"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Funnel stages */}
          {[100, 200, 300].map((y, i) => (
            <motion.line
              key={`stage-${i}`}
              x1={75 + i * 25}
              y1={y}
              x2={325 - i * 25}
              y2={y}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="5,5"
              animate={{
                strokeDashoffset: [0, -100],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>

        {/* Animated leads flowing through funnel */}
        {jobTitles.map((job, index) => (
          <motion.div
            key={`lead-${index}`}
            className="absolute"
            animate={{
              y: [0, 400],
              x: [
                -180 + index * 50,
                -100 + index * 30,
                -50 + index * 20,
              ],
              scale: [1, 0.8, 0.6],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "linear",
            }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 pr-3 shadow-lg">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: job.color }}>
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-white whitespace-nowrap">{job.title}</span>
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
            <div className="relative w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};