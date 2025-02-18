import { motion } from "framer-motion";

export function ContentEngagementIcon() {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Document */}
      <motion.path
        d="M30 20 H90 V100 H30 Z"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Content Lines */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1="40"
          y1={40 + i * 15}
          x2="80"
          y2={40 + i * 15}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1 + i * 0.2
          }}
        />
      ))}

      {/* Engagement Particles */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={90}
          cy={40 + i * 20}
          r="3"
          fill="currentColor"
          animate={{
            x: [0, 20, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity
          }}
        />
      ))}
    </motion.svg>
  );
}
