import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion, animate as runAnimate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

export default function Home() {
  // Reference to the main container for animations
  const containerRef = useRef<HTMLDivElement>(null);
  // Track animation state
  const [hasAnimated, setHasAnimated] = useState(false);
  // Detect mobile devices for simplified animations
  const isMobile = useIsMobile();
  
  // Force animations to play on initial page load
  useEffect(() => {
    // Only run this once
    if (!hasAnimated && containerRef.current) {
      // Set the flag to prevent re-running
      setHasAnimated(true);
      
      // Select all sections inside the container
      const sections = containerRef.current.querySelectorAll('section');
      
      // Run the animation immediately
      sections.forEach((section, index) => {
        runAnimate(section, 
          { opacity: [0, 1], y: [20, 0] }, 
          { 
            duration: 0.5, 
            delay: index * 0.15, 
            ease: "easeOut" 
          }
        );
      });
    }
  }, [hasAnimated]);
  
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
        <div ref={containerRef} className="relative z-10">
          {/* Hero Section with enhanced styling */}
          <section className="relative z-10">
            <Hero />
          </section>

          {/* Approach Section with visual enhancements */}
          <section className="relative z-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <Approach />
          </section>

          {/* Services Section with improved visuals */}
          <section className="relative z-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <Services />
          </section>

          {/* Testimonials Section with improved presentation */}
          <section className="relative z-50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <Testimonials />
          </section>
        </div>

        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </>
  );
}