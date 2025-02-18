import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Loader2,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  BarChart3,
  Eye
} from "lucide-react";
import type { Service } from "@shared/schema";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Comprehensive B2B Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your business with our suite of integrated marketing solutions designed to drive growth, 
            enhance engagement, and deliver measurable results across your digital ecosystem.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services?.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="h-full flex flex-col bg-white/50 backdrop-blur-sm border-slate-200/80 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full group">
                      Explore Solution
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Partner With Us?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference of working with a partner committed to your success
              through proven methodologies and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Industry Expertise",
                description: "Deep understanding of B2B dynamics and market-specific challenges"
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "Personalized attention from expert teams focused on your success"
              },
              {
                icon: BarChart3,
                title: "Measurable Impact",
                description: "Data-driven strategies with clear ROI and performance metrics"
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "Clear communication, honest reporting, and full visibility into campaign performance"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="text-center"
              >
                <Card className="h-full p-6">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
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
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Growth?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how our solutions can help you achieve your business objectives.
          </p>
          <Button size="lg" className="shadow-lg">
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}