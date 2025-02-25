import { lazy, Suspense } from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MetaTags } from "@/components/ui/meta-tags";
import {
  ArrowRight,
  BarChart3,
  Building2,
  HandshakeIcon,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      duration: 0.3
    }
  }
};

export default function AgencyPartnerships() {
  return (
    <>
      <MetaTags
        title="Agency Partnership Program - B2B Lead Generation Partnership"
        description="Partner with Pivotal B2B for premium lead generation services at competitive CPL rates. Access high-quality leads, advanced targeting capabilities, and comprehensive marketing solutions through our partnership program."
        keywords="agency partnership, B2B lead generation partnership, marketing agency partner program, CPL partnership, lead generation services, white label marketing solutions, agency growth program"
        canonicalUrl="https://pivotal-b2b.com/agency-partnerships"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Agency Partnership Program",
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B"
          },
          "description": "Premium lead generation partnership program for marketing agencies",
          "offers": {
            "@type": "Offer",
            "description": "Partner with Pivotal B2B to access premium lead generation services at competitive CPL rates"
          }
        }}
      />

      <LazyMotion features={domAnimation}>
        <div className="min-h-screen">
          {/* Hero Section - Optimized */}
          <div className="relative bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-16 sm:py-20">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { duration: 0.5 }
                  }
                }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">Agency Partnership Program</h1>
                <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8">
                  Partner with Pivotal B2B to access premium lead generation services at competitive
                  cost-per-lead rates, helping your agency deliver exceptional value to clients.
                </p>
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Get Partnership Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Main Content - Optimized */}
          <div className="container mx-auto px-4 py-16 sm:py-20">
            {/* Partnership Benefits */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-16 sm:mb-20"
            >
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why Partner With Us?</h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Access our proven lead generation services with transparent CPL pricing
                  and maintain complete control of your client relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: Target,
                    title: "Premium Lead Quality",
                    description: "Access highly qualified leads through our advanced verification and qualification process."
                  },
                  {
                    icon: Wallet,
                    title: "Competitive CPL Rates",
                    description: "Benefit from volume-based pricing and competitive cost-per-lead rates that improve your margins."
                  },
                  {
                    icon: TrendingUp,
                    title: "Complete Transparency",
                    description: "Get full visibility into lead costs, quality metrics, and performance through detailed reporting."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="inline-flex p-2 sm:p-3 rounded-xl bg-primary/10 mb-4">
                          <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Success Metrics - Optimized */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-16 sm:mb-20"
            >
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Partner Success Metrics</h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our partnership program delivers measurable results for agencies.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { metric: "40%", label: "Average CPL Reduction" },
                  { metric: "65%", label: "Lead Quality Improvement" },
                  { metric: "3x", label: "Client Base Growth" },
                  { metric: "95%", label: "Partner Retention Rate" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <Card>
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.metric}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section - Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-primary text-primary-foreground overflow-hidden">
                <CardContent className="p-8 sm:p-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Optimize Your Lead Generation?</h2>
                  <p className="text-base sm:text-lg text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Let's discuss how our CPL-based partnership program can help your agency deliver
                    better results for your clients while improving your margins.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" variant="secondary">
                      Schedule a Partnership Discussion
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent">
                      View CPL Pricing Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}