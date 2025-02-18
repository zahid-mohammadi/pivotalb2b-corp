import { motion } from "framer-motion";

export function DataPipelineIcon() {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Pipeline Path */}
      <motion.path
        d="M20 60 L100 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Data Dots */}
      <motion.circle
        cx="30"
        cy="60"
        r="4"
        fill="currentColor"
        animate={{
          x: [0, 70, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.circle
        cx="45"
        cy="60"
        r="4"
        fill="currentColor"
        animate={{
          x: [0, 70, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Connection Points */}
      <motion.circle
        cx="20"
        cy="60"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      <motion.circle
        cx="100"
        cy="60"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    </motion.svg>
  );
}
