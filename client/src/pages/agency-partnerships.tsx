import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
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
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-primary overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          </div>
          <div className="relative container mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl font-bold text-white mb-6">Agency Partnership Program</h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Partner with Pivotal B2B to access premium lead generation services at competitive
                cost-per-lead rates, helping your agency deliver exceptional value to clients.
              </p>
              <Button size="lg" variant="secondary" className="shadow-xl">
                Get Partnership Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20">
          {/* Partnership Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access our proven lead generation services with transparent CPL pricing
                and maintain complete control of your client relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partnership Model */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Partnership Model</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A straightforward, CPL-based partnership designed to help agencies scale their lead generation capabilities.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Premium Lead Generation Partnership</h3>
                  <p className="text-muted-foreground mb-6">
                    Access our comprehensive lead generation services with transparent, performance-based pricing.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Volume-based CPL pricing tiers",
                      "Dedicated account management",
                      "Custom lead qualification criteria",
                      "Real-time lead delivery",
                      "Detailed performance analytics",
                      "White-label reporting options",
                      "Quality assurance guarantee",
                      "Flexible payment terms"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Partner Success Metrics</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our partnership program delivers measurable results for agencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    <CardContent className="p-6">
                      <p className="text-4xl font-bold text-primary mb-2">{stat.metric}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Lead Generation?</h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our CPL-based partnership program can help your agency deliver
                  better results for your clients while improving your margins.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="secondary">
                    Schedule a Partnership Discussion
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent">
                    View CPL Pricing Guide
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}