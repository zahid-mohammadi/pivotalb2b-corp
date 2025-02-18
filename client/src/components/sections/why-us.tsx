import { Globe2, Target, Cpu, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function WhyUs() {
  const features = [
    {
      icon: Globe2,
      title: "Global Reach",
      description: "Access our network of over 50 million B2B decision-makers across industries and regions.",
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Advanced AI-powered filters to reach your exact ideal customer profile with 95% accuracy.",
    },
    {
      icon: Cpu,
      title: "Smart Technology",
      description: "Proprietary MarTech stack that automates lead scoring and qualification in real-time.",
    },
    {
      icon: Shield,
      title: "Data Compliance",
      description: "100% GDPR and CCPA compliant processes with regular security audits and certifications.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">The Pivotal Advantage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of data-driven lead generation backed by advanced technology and proven expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div 
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}