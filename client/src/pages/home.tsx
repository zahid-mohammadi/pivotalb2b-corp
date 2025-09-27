import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { MarketingChannels } from "@/components/sections/marketing-channels";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Create a component wrapper for each section to ensure animations work consistently
const AnimatedSection = ({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  // Detect mobile for simplified animations
  const isMobile = useIsMobile();
  
  // Force reset of scroll position on component mount
  useEffect(() => {
    // Reset scroll position to top to ensure animations are visible
    window.scrollTo(0, 0);
    
    // Apply a forced repaint to trigger animations properly
    document.documentElement.style.opacity = "0.99";
    setTimeout(() => {
      document.documentElement.style.opacity = "1";
    }, 10);
  }, []);

  return (
    <>
      <MetaTags
        title="B2B Lead Generation & Demand Generation Services | Pivotal B2B"
        description="Generate qualified B2B leads with precision. Pivotal B2B helps you build predictable pipelines, reduce cost per lead, and scale revenue growth."
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

        {/* Hero Section with enhanced styling */}
        <AnimatedSection className="relative z-10" delay={0}>
          <Hero />
        </AnimatedSection>

        {/* Approach Section with visual enhancements */}
        <AnimatedSection className="relative z-20 overflow-hidden" delay={0.05}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <Approach />
        </AnimatedSection>

        {/* Services Section with improved visuals */}
        <AnimatedSection className="relative z-30" delay={0.1}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <Services />
        </AnimatedSection>

        {/* Marketing Channels Section */}
        <AnimatedSection className="relative z-40" delay={0.15}>
          <MarketingChannels />
        </AnimatedSection>


        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </>
  );
}