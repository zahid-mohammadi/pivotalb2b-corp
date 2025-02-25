import { lazy } from "react";
import { motion as m } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MetaTags } from "@/components/ui/meta-tags";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

// Optimized animation variants with reduced complexity for mobile
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

// Component with reduced re-renders
const BenefitCard = ({ icon: Icon, title, description }) => (
  <Card className="h-full">
    <CardContent className="p-4 sm:p-6">
      <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// Component with reduced re-renders
const MetricCard = ({ metric, label }) => (
  <Card>
    <CardContent className="p-3 sm:p-4 text-center">
      <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">{metric}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

export default function AgencyPartnerships() {
  return (
    <>
      <MetaTags
        title="Agency Partnership Program - B2B Lead Generation Partnership"
        description="Partner with Pivotal B2B for premium lead generation services at competitive CPL rates. Access high-quality leads, advanced targeting capabilities, and comprehensive marketing solutions through our partnership program."
        keywords="agency partnership, B2B lead generation partnership, marketing agency partner program, CPL partnership, lead generation services"
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

      <LazyMotion features={domAnimation} strict>
        <div className="min-h-screen">
          {/* Hero Section - Mobile Optimized */}
          <section className="bg-primary text-primary-foreground">
            <div className="container px-4 py-12 sm:py-16">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">Agency Partnership Program</h1>
                <p className="text-base sm:text-lg opacity-90 mb-6">
                  Partner with Pivotal B2B to access premium lead generation services at competitive
                  cost-per-lead rates, helping your agency deliver exceptional value to clients.
                </p>
                <Button size="lg" variant="secondary">
                  Get Partnership Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </m.div>
            </div>
          </section>

          <div className="container px-4 py-12 sm:py-16">
            {/* Benefits Section - Mobile Optimized */}
            <m.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="mb-12 sm:mb-16"
            >
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why Partner With Us?</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Access our proven lead generation services with transparent CPL pricing
                  and maintain complete control of your client relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
                  <m.div key={index} variants={itemVariants}>
                    <BenefitCard {...benefit} />
                  </m.div>
                ))}
              </div>
            </m.section>

            {/* Metrics Section - Mobile Optimized */}
            <m.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="mb-12 sm:mb-16"
            >
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Partner Success Metrics</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Our partnership program delivers measurable results for agencies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { metric: "40%", label: "Average CPL Reduction" },
                  { metric: "65%", label: "Lead Quality Improvement" },
                  { metric: "3x", label: "Client Base Growth" },
                  { metric: "95%", label: "Partner Retention Rate" }
                ].map((stat, index) => (
                  <m.div key={index} variants={itemVariants}>
                    <MetricCard {...stat} />
                  </m.div>
                ))}
              </div>
            </m.section>

            {/* CTA Section - Mobile Optimized */}
            <m.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-primary text-primary-foreground overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to Optimize Your Lead Generation?</h2>
                  <p className="text-sm sm:text-base text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Let's discuss how our CPL-based partnership program can help your agency deliver
                    better results for your clients while improving your margins.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button size="lg" variant="secondary">
                      Schedule a Discussion
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent">
                      View Pricing Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </m.section>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}