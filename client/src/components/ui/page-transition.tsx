import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
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
  // State to force initial animation on first page load
  const [isFirstMount, setIsFirstMount] = useState(true);
  
  // Force animations to run on initial page load
  useEffect(() => {
    // Set to false after first render to ensure animations run
    setIsFirstMount(false);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={!isFirstMount}>
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
    </div>
  );
}