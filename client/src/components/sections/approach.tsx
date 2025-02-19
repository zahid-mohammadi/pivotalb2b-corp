import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";

export function Approach() {
  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Strategic Targeting",
      description: "Identify and profile your ideal customer segments using advanced data analytics, technographic insights, and intent signals to build a focused prospect universe.",
    },
    {
      icon: ContentEngagementIcon,
      title: "Engagement Optimization",
      description: "Deploy personalized multi-channel campaigns that resonate with decision-makers, leveraging targeted content and precise messaging to drive meaningful interactions.",
    },
    {
      icon: ScaleGrowthIcon,
      title: "Pipeline Acceleration",
      description: "Convert prospects into qualified opportunities through proven nurture workflows, BANT qualification, and seamless sales team integration.",
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Our Approach to Building Winning Sales Pipelines</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We transform your lead generation into a systematic pipeline-building engine through precise targeting, 
            strategic engagement, and proven conversion methodologies that consistently deliver qualified opportunities to your sales team.
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
              <Card className="text-center h-full hover-lift">
                <CardContent className="pt-6 p-8">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <step.icon />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}