import { motion } from "framer-motion";

export function ScaleGrowthIcon() {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Growth Chart */}
      <motion.path
        d="M20 100 L20 20 L100 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Growth Line */}
      <motion.path
        d="M20 80 Q40 70, 60 50 T100 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Data Points */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={30 + i * 25}
          cy={70 - i * 15}
          r="4"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.5 + i * 0.2
          }}
        />
      ))}
    </motion.svg>
  );
}
