import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { MarketingChannels } from "@/components/sections/marketing-channels";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Building2, Laptop, DollarSign, Heart, Factory, Briefcase, ChevronRight, TrendingUp, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

        {/* Industry-Specific Solutions Section */}
        <AnimatedSection className="relative z-35 py-24 bg-gradient-to-b from-gray-50 to-white" delay={0.125}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Industry Expertise</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Tailored Solutions for Your Industry
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Proven strategies and industry-specific expertise across key B2B sectors
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Laptop,
                  industry: "Enterprise Software & SaaS",
                  description: "Accelerate pipeline velocity with account-based strategies targeting decision-makers in enterprise tech stacks",
                  metrics: ["45% faster sales cycles", "3.2x pipeline growth", "62% win rate"],
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: DollarSign,
                  industry: "Financial Services",
                  description: "Compliant, conversion-focused campaigns for wealth management, fintech, and banking solutions",
                  metrics: ["98% compliance rate", "2.8x ROI average", "34% engagement lift"],
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Heart,
                  industry: "Healthcare & Life Sciences",
                  description: "Reach clinical decision-makers and administrators with HIPAA-compliant precision targeting",
                  metrics: ["100% HIPAA compliant", "42% conversion rate", "2M+ healthcare pros"],
                  color: "from-red-500 to-pink-500"
                },
                {
                  icon: Factory,
                  industry: "Manufacturing & Industrial",
                  description: "Connect with procurement, operations, and engineering leaders to drive equipment and service sales",
                  metrics: ["18-month avg deal size", "56% demo-to-close", "Global reach"],
                  color: "from-orange-500 to-amber-500"
                },
                {
                  icon: Briefcase,
                  industry: "Professional Services",
                  description: "Build authority and generate qualified leads for consulting, legal, and advisory firms",
                  metrics: ["$125K avg contract", "4.2 referral rate", "92% retention"],
                  color: "from-purple-500 to-violet-500"
                },
                {
                  icon: Building2,
                  industry: "Enterprise Technology",
                  description: "Multi-touch ABM campaigns for complex enterprise sales with 6+ stakeholders",
                  metrics: ["8.5 touches avg", "$450K deal size", "14-month cycle"],
                  color: "from-indigo-500 to-blue-500"
                }
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {industry.industry}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {industry.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {industry.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.color}`} />
                          <span className="text-gray-700 font-medium">{metric}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/request-proposal">
                      <Button 
                        variant="ghost" 
                        className="group/btn w-full justify-between hover:bg-primary/5"
                        data-testid={`button-industry-cta-${index}`}
                      >
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mt-16"
            >
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Don't see your industry?</p>
                    <p className="text-sm text-gray-600">We serve 25+ verticals with custom strategies</p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="default" className="whitespace-nowrap" data-testid="button-contact-industry">
                    Discuss Your Needs
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
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