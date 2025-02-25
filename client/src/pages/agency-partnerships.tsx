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
  LucideIcon,
  LinkedinIcon,
  TwitterIcon,
  NewspaperIcon,
  UsersIcon,
  BookOpenIcon
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => (
  <Card className="relative overflow-hidden hover-lift group h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
    <CardContent className="p-8 relative">
      <div className="flex items-start gap-6">
        <div className="p-4 bg-white rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface MetricCardProps {
  metric: string;
  label: string;
}

const MetricCard = ({ metric, label }: MetricCardProps) => (
  <Card className="relative overflow-hidden group transform hover:scale-105 transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
    <CardContent className="p-8 relative text-center">
      <m.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-primary mb-3"
      >
        {metric}
      </m.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);

export default function AgencyPartnerships() {
  return (
    <>
      <MetaTags
        title="Global Agency Partnership Program - Premium B2B Lead Generation Network"
        description="Join our elite network of global partners. Access 60M+ B2B decision-makers, advanced ABM capabilities, and multi-channel marketing solutions with transparent CPL pricing."
        keywords="global B2B partnership, premium lead generation, account-based marketing, international B2B network, transparent CPL partnership"
        canonicalUrl="https://pivotal-b2b.com/agency-partnerships"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Global Agency Partnership Program",
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B"
          },
          "description": "Premium global B2B partnership network with advanced marketing capabilities",
          "offers": {
            "@type": "Offer",
            "description": "Elite partnership program with access to 60M+ global B2B contacts"
          }
        }}
      />

      <LazyMotion features={domAnimation}>
        <div className="min-h-screen">
          {/* Hero Section with Enhanced Design */}
          <div className="relative bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 text-white">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.1]" />
            <section className="relative">
              <div className="container px-4 py-20 sm:py-32">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto text-center"
                >
                  <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-primary-foreground to-white text-transparent bg-clip-text">
                    Elite Global B2B Partnership Network
                  </h1>
                  <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                    Join our exclusive network of global partners and access advanced B2B marketing capabilities, 
                    premium data, and innovative solutions that drive exceptional results.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="text-lg group"
                    >
                      Join Our Network
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 text-white text-lg"
                    >
                      View Success Stories
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </m.div>
              </div>
            </section>
          </div>

          <div className="container px-4 py-16 sm:py-24">
            {/* Premium Features Section */}
            <m.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mb-24"
            >
              <div className="text-center mb-16">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    Premium Partnership Benefits
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Access world-class B2B marketing capabilities and drive exceptional results for your clients
                  </p>
                </m.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Globe2,
                    title: "Unparalleled Global Reach",
                    description: "Access our network of 60M+ B2B decision-makers across 100+ countries. Multi-language campaign capabilities and localized content distribution."
                  },
                  {
                    icon: Target,
                    title: "Advanced ABM Platform",
                    description: "Leverage our sophisticated account-based marketing platform with intent data, technographics, and precision targeting capabilities."
                  },
                  {
                    icon: MessageSquare,
                    title: "Omni-Channel Execution",
                    description: "Deploy campaigns across email, content syndication, programmatic display, social media, and virtual events platforms."
                  },
                  {
                    icon: Shield,
                    title: "Enterprise-Grade Security",
                    description: "Built-in GDPR, CCPA, and global privacy compliance. Advanced data protection and regular security audits ensure safety."
                  },
                  {
                    icon: BarChart3,
                    title: "Real-Time Intelligence",
                    description: "Access comprehensive analytics dashboard with live campaign metrics, audience insights, and predictive analytics."
                  },
                  {
                    icon: Wallet,
                    title: "Transparent Partnership",
                    description: "Clear, performance-based pricing with volume incentives. No hidden fees or long-term commitments required."
                  }
                ].map((benefit, index) => (
                  <m.div key={index} variants={itemVariants}>
                    <BenefitCard {...benefit} />
                  </m.div>
                ))}
              </div>
            </m.section>

            {/* Global Impact Metrics */}
            <m.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mb-24"
            >
              <div className="relative py-16 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                <div className="relative">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">Global Impact</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Our partnership network delivers measurable results across markets worldwide
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { metric: "60M+", label: "B2B Decision Makers" },
                      { metric: "100+", label: "Countries Covered" },
                      { metric: "45%", label: "CPL Cost Reduction" },
                      { metric: "98%", label: "Compliance Rate" },
                      { metric: "85%", label: "Lead Acceptance" },
                      { metric: "<12hrs", label: "Lead Delivery" },
                      { metric: "24/7", label: "Partner Support" },
                      { metric: "95%", label: "Partner Retention" }
                    ].map((stat, index) => (
                      <m.div key={index} variants={itemVariants}>
                        <MetricCard {...stat} />
                      </m.div>
                    ))}
                  </div>
                </div>
              </div>
            </m.section>

            {/* Enhanced CTA Section */}
            <m.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 text-white">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.1]" />
                <div className="relative p-12 sm:p-16">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                      Ready to Transform Your B2B Marketing?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                      Join our elite partner network to access premium B2B data, advanced marketing capabilities, 
                      and comprehensive support. Let's discuss how we can help you deliver exceptional results 
                      for your global clients.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button 
                        size="lg" 
                        variant="secondary"
                        className="text-lg group"
                      >
                        Schedule Partnership Call
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 text-white text-lg"
                      >
                        Download Partnership Guide
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </m.section>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}