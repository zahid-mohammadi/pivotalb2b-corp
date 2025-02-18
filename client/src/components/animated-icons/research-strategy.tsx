import { motion } from "framer-motion";

export function ResearchStrategyIcon() {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Magnifying Glass */}
      <motion.g
        initial={{ rotate: -45, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.line
          x1="65"
          y1="65"
          x2="85"
          y2="85"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </motion.g>

      {/* Data Points */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={40 + i * 15}
          cy={40}
          r="3"
          fill="currentColor"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </motion.svg>
  );
}
