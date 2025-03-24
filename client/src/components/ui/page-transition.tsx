import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageTransitionProps {
  children: ReactNode;
}

// Extremely simplified animations for better performance
const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.15, // Further reduced duration
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1, // Further reduced duration
      ease: "easeIn",
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  
  // For mobile devices, skip animations completely
  if (isMobile) {
    return <div className="relative">{children}</div>;
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}