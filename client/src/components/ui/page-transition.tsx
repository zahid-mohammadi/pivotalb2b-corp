import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
}

// Simplified animations for better mobile performance
const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2, // Reduced duration
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15, // Reduced duration
      ease: "easeIn",
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={location}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen will-change-opacity relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}