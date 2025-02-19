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
    <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
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
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The Pivotal Difference: Precision, Transparency, and Results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "98%", label: "Client Satisfaction" },
            { value: "250+", label: "Active Partnerships" },
            { value: "15M+", label: "Qualified Leads" },
            { value: "60+", label: "Countries Reached" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}