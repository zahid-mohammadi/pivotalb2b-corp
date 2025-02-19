import { Globe2, Target, Share2, DollarSign, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function WhyUs() {
  const features = [
    {
      icon: Globe2,
      title: "Massive and Global B2B Audience Reach",
      description: "Access one of the largest and most comprehensive B2B databases globally, connecting you with decision-makers across industries, geographies, and company sizes.",
    },
    {
      icon: Target,
      title: "Advanced Targeting",
      description: "Utilize cutting-edge filters such as Account-Based Marketing (ABM), persona-based segmentation, technographic data, and geographic targeting to reach your ideal audience.",
    },
    {
      icon: Share2,
      title: "Multi-Channel Execution",
      description: "Execute campaigns across email and phone channels to maximize engagement and conversion rates.",
    },
    {
      icon: DollarSign,
      title: "Cost-Effective Solutions",
      description: "Our simple cost-per-lead pricing model ensures affordability without compromising on quality. No volume commitments – you pay only for the leads you need.",
    },
    {
      icon: Shield,
      title: "Compliance and Integrity",
      description: "We adhere to global data privacy regulations, including GDPR, CCPA, and CASL, ensuring your campaigns are ethical and compliant.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "We deliver on our promises with full transparency, providing high-quality leads that convert into tangible business outcomes.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Pivotal B2B?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Pivotal Difference: Precision, Transparency, and Results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
              <Card className="relative h-full bg-white/80 backdrop-blur-sm border-slate-200/80 group-hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}