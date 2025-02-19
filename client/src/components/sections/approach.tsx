import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";

export function Approach() {
  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Precision Targeting",
      description: "Advanced filtering using ABM, persona-based filters, technographic data, and geographic targeting for optimal reach.",
    },
    {
      icon: ContentEngagementIcon,
      title: "Multi-Channel Campaigns",
      description: "Deploy integrated campaigns across multiple channels with personalized messaging and content strategies.",
    },
    {
      icon: ScaleGrowthIcon,
      title: "Transparent Results",
      description: "Track campaign performance with detailed analytics, lead quality metrics, and clear ROI measurement.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Proven Approach</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering high-quality B2B leads through a transparent, compliant, and cost-efficient process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <motion.div 
                    className="mb-4 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <step.icon />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}