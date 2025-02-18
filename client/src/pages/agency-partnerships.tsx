import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
              Join forces with Pivotal B2B to enhance your lead generation capabilities, reduce costs, 
              and build a sustainable partnership that drives mutual growth.
            </p>
            <Button size="lg" variant="secondary" className="shadow-xl">
              Become a Partner
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
              Access premium lead generation capabilities and expertise while maintaining 
              your agency's brand identity and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Enhanced Lead Quality",
                description: "Access our advanced lead qualification processes and industry expertise to deliver higher quality leads to your clients."
              },
              {
                icon: Wallet,
                title: "Cost Optimization",
                description: "Reduce operational costs through our efficient processes and economies of scale in lead generation."
              },
              {
                icon: TrendingUp,
                title: "Complete Transparency",
                description: "Get full visibility into lead generation processes, costs, and performance metrics with detailed reporting."
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

        {/* Partnership Models */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Models</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that best suits your agency's needs and growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Service Reseller Partnership",
                features: [
                  "Access to our complete lead generation services",
                  "Dedicated account management",
                  "Custom reporting dashboard",
                  "White-label option available",
                  "Flexible pricing models",
                ],
                description: "Perfect for agencies looking to offer our lead generation services to their clients."
              },
              {
                title: "Revenue Share Partnership",
                features: [
                  "Performance-based revenue sharing",
                  "Joint marketing initiatives",
                  "Lead generation strategy support",
                  "Performance bonuses",
                  "Co-branded opportunities",
                ],
                description: "Ideal for agencies wanting to maintain their brand while leveraging our expertise."
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                    <p className="text-muted-foreground mb-6">{model.description}</p>
                    <ul className="space-y-3">
                      {model.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Our partnership program has helped agencies achieve significant growth and success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { metric: "40%", label: "Average Cost Reduction" },
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
              <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Agency?</h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Take the first step towards a transformative partnership that will help your agency 
                scale efficiently and deliver exceptional value to your clients.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary">
                  Schedule a Partnership Discussion
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent">
                  Download Partnership Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}