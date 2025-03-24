import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion, useAnimate, stagger } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  // Reference to the main container for animations
  const containerRef = useRef(null);
  // For direct animation control
  const [scope, animate] = useAnimate();
  // Track animation state
  const [hasAnimated, setHasAnimated] = useState(false);
  // Detect mobile devices for simplified animations
  const isMobile = useIsMobile();
  
  // Force animations to play on initial page load
  useEffect(() => {
    // Make animations run immediately without waiting for another page navigation
    const timer = setTimeout(() => {
      setHasAnimated(true);
      
      // Run animations for each section
      if (scope.current) {
        animate("section", 
          { opacity: 1, y: 0 }, 
          { 
            duration: 0.5, 
            delay: stagger(0.15),
            ease: "easeOut"
          }
        );
      }
    }, 100); // Short delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, [animate, scope]);
  
  return (
    <>
      <MetaTags
        title="Premium B2B Lead Generation & Marketing Solutions | Pivotal B2B"
        description="Transform your B2B marketing with Pivotal B2B's premium lead generation services, intent-based targeting, and comprehensive marketing solutions. Drive growth with our data-driven approach to lead qualification and account-based marketing."
        canonical="https://pivotal-b2b.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pivotal B2B",
          "url": "https://pivotal-b2b.com",
          "description": "Premium B2B lead generation and marketing solutions provider",
          "sameAs": [
            "https://linkedin.com/company/pivotal-b2b",
            "https://twitter.com/pivotalb2b"
          ]
        }}
      />
      <div className="relative min-h-screen">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        {/* Enhanced page sections with animations - attach the ref for direct animation control */}
        <motion.div
          ref={scope}
          className="relative z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Hero Section with enhanced styling */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            className="relative z-10"
          >
            <Hero />
          </motion.section>

          {/* Approach Section with visual enhancements */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            className="relative z-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <Approach />
          </motion.section>

          {/* Services Section with improved visuals */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            className="relative z-30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <Services />
          </motion.section>

          {/* Testimonials Section with improved presentation */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            className="relative z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <Testimonials />
          </motion.section>
        </motion.div>

        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </>
  );
}