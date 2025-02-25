import { lazy } from "react";
import { m } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MetaTags } from "@/components/ui/meta-tags";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Wallet,
  Globe2,
  Users2,
  MessageSquare,
  BarChart3,
  Shield,
  LucideIcon
} from "lucide-react";

// Animation variants remain unchanged
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

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Component with reduced re-renders
const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => (
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

interface MetricCardProps {
  metric: string;
  label: string;
}

// Component with reduced re-renders
const MetricCard = ({ metric, label }: MetricCardProps) => (
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
        title="Agency Partnership Program - Global B2B Lead Generation Partnership"
        description="Partner with Pivotal B2B for premium global lead generation services. Access 60+ million B2B decision-makers, advanced ABM capabilities, and multi-channel marketing solutions through our transparent CPL partnership program."
        keywords="global B2B lead generation, account-based marketing partnership, multi-channel B2B marketing, CPL partnership, international lead generation"
        canonicalUrl="https://pivotal-b2b.com/agency-partnerships"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Global Agency Partnership Program",
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B"
          },
          "description": "Premium global lead generation partnership program with advanced ABM capabilities",
          "offers": {
            "@type": "Offer",
            "description": "Partner with Pivotal B2B to access premium global lead generation services with transparent CPL rates"
          }
        }}
      />

      <LazyMotion features={domAnimation} strict>
        <div className="min-h-screen">
          {/* Hero Section - Enhanced Global Focus */}
          <section className="bg-primary text-primary-foreground">
            <div className="container px-4 py-12 sm:py-16">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">Global B2B Lead Generation Partnership</h1>
                <p className="text-base sm:text-lg opacity-90 mb-6">
                  Access our network of 60+ million B2B decision-makers worldwide through advanced 
                  account-based marketing and multi-channel campaigns. Partner with us for transparent, 
                  performance-based lead generation with competitive CPL rates.
                </p>
                <Button size="lg" variant="secondary">
                  Explore Partnership Benefits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </m.div>
            </div>
          </section>

          <div className="container px-4 py-12 sm:py-16">
            {/* Benefits Section - Updated with Enhanced Features */}
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
                  Leverage our global reach and advanced targeting capabilities while maintaining 
                  complete control of your client relationships with transparent CPL pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: Globe2,
                    title: "Global Reach & Coverage",
                    description: "Access 60+ million B2B decision-makers across 100+ countries with multi-language campaign capabilities."
                  },
                  {
                    icon: Target,
                    title: "Advanced ABM Targeting",
                    description: "Utilize intent data, technographics, and firmographics for precise account-based marketing campaigns."
                  },
                  {
                    icon: MessageSquare,
                    title: "Multi-Channel Execution",
                    description: "Engage prospects through email, content syndication, display advertising, and social media channels."
                  },
                  {
                    icon: Wallet,
                    title: "Transparent CPL Pricing",
                    description: "Clear, performance-based pricing with volume discounts and no hidden fees or long-term commitments."
                  },
                  {
                    icon: Shield,
                    title: "Quality Assurance",
                    description: "Rigorous lead verification process with BANT qualification and compliance with global privacy regulations."
                  },
                  {
                    icon: BarChart3,
                    title: "Real-Time Analytics",
                    description: "Comprehensive dashboard with live campaign metrics, lead quality scores, and ROI tracking."
                  }
                ].map((benefit, index) => (
                  <m.div key={index} variants={itemVariants}>
                    <BenefitCard {...benefit} />
                  </m.div>
                ))}
              </div>
            </m.section>

            {/* Metrics Section - Updated with Global Stats */}
            <m.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="mb-12 sm:mb-16"
            >
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Global Partnership Impact</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Our partnership program delivers measurable results across markets worldwide.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { metric: "60M+", label: "Global B2B Contacts" },
                  { metric: "100+", label: "Countries Covered" },
                  { metric: "45%", label: "Average CPL Reduction" },
                  { metric: "98%", label: "GDPR & CCPA Compliance" },
                  { metric: "85%", label: "Lead Acceptance Rate" },
                  { metric: "12hrs", label: "Average Lead Delivery" },
                  { metric: "24/7", label: "Partner Support" },
                  { metric: "95%", label: "Partner Retention" }
                ].map((stat, index) => (
                  <m.div key={index} variants={itemVariants}>
                    <MetricCard {...stat} />
                  </m.div>
                ))}
              </div>
            </m.section>

            {/* CTA Section - Enhanced Value Proposition */}
            <m.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-primary text-primary-foreground overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to Scale Your Lead Generation Globally?</h2>
                  <p className="text-sm sm:text-base text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Join our partner network to access premium B2B data, advanced ABM capabilities, and 
                    multi-channel campaign execution with transparent CPL pricing. Let's discuss how we 
                    can help you deliver better results for your global clients.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button size="lg" variant="secondary">
                      Schedule a Partnership Discussion
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent">
                      Download Partner Success Stories
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