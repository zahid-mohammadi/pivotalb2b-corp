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
    <section className="py-24 relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Pivotal B2B?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Pivotal Difference: Precision, Transparency, and Results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}