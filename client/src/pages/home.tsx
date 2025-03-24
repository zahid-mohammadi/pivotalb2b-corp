import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  // State to control animation
  const [animate, setAnimate] = useState(false);
  
  // Force animation to run on component mount
  useEffect(() => {
    // Force update after component is mounted
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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

        {/* Enhanced page sections with animations */}
        <motion.div
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          {/* Hero Section with enhanced styling */}
          <motion.section
            variants={fadeInUp}
            className="relative z-10"
          >
            <Hero />
          </motion.section>

          {/* Approach Section with visual enhancements */}
          <motion.section
            variants={fadeInUp}
            className="relative z-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <Approach />
          </motion.section>

          {/* Services Section with improved visuals */}
          <motion.section
            variants={fadeInUp}
            className="relative z-30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <Services />
          </motion.section>

          {/* Testimonials Section with improved presentation */}
          <motion.section
            variants={fadeInUp}
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