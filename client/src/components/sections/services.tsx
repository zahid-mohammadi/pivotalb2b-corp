import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  LineChart,
  Share2,
  Video,
  CheckSquare,
  TargetIcon,
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

const services = [
  {
    icon: LineChart,
    title: "Intent-Based Lead Generation",
    description: "Target high-value accounts using advanced intent signals and account-based strategies to identify and engage decision-makers actively seeking solutions.",
    features: [
      "Account-based intent tracking",
      "Target account prioritization",
      "Multi-stakeholder engagement mapping",
      "Account-level engagement scoring"
    ],
    gradients: [
      "from-blue-500/20 via-purple-500/20 to-pink-500/20",
      "from-pink-500/20 via-purple-500/20 to-blue-500/20"
    ]
  },
  {
    icon: Share2,
    title: "Content Distribution",
    description: "Strategically distribute content to key accounts through personalized, account-specific channels and engagement strategies.",
    features: [
      "Account-based content personalization",
      "Targeted account syndication",
      "Role-based content delivery",
      "Account engagement analytics"
    ],
    gradients: [
      "from-purple-500/20 via-indigo-500/20 to-blue-500/20",
      "from-blue-500/20 via-indigo-500/20 to-purple-500/20"
    ]
  },
  {
    icon: Video,
    title: "Event and Webinar Promotion",
    description: "Drive attendance from target accounts through personalized event marketing and account-specific engagement strategies.",
    features: [
      "Account-based event targeting",
      "Stakeholder-specific invitations",
      "Account engagement tracking",
      "Post-event account nurturing"
    ],
    gradients: [
      "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      "from-teal-500/20 via-emerald-500/20 to-green-500/20"
    ]
  },
  {
    icon: CheckSquare,
    title: "Lead Qualification",
    description: "Qualify leads within target accounts using comprehensive BANT criteria and account-based engagement metrics.",
    features: [
      "Account-level qualification",
      "Multi-stakeholder assessment",
      "Account engagement scoring",
      "Deal size potential analysis"
    ],
    gradients: [
      "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      "from-yellow-500/20 via-amber-500/20 to-orange-500/20"
    ]
  },
  {
    icon: TargetIcon,
    title: "Account-Based Marketing",
    description: "Comprehensive ABM strategies targeting high-value accounts with personalized, multi-channel engagement campaigns.",
    features: [
      "Strategic account selection",
      "Buying center mapping",
      "Account journey orchestration",
      "Multi-channel ABM campaigns"
    ],
    gradients: [
      "from-red-500/20 via-rose-500/20 to-pink-500/20",
      "from-pink-500/20 via-rose-500/20 to-red-500/20"
    ]
  }
];

const calendlyUrl = "https://calendly.com/zahid-m/30min";

export function Services() {
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
          <h2 className="text-4xl font-bold mb-6">Account-Based Marketing Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your B2B marketing with our integrated account-based approach. 
            Target and engage key accounts that matter most to your business through 
            personalized, data-driven strategies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="flex"
            >
              <Card className={`
                flex flex-col w-full bg-white/50 backdrop-blur-sm 
                border-slate-200/80 hover:border-primary/20 transition-all duration-300
                relative overflow-hidden group
              `}>
                {/* Animated Gradient Background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br
                  animate-gradient-x
                  group-hover:animate-gradient-x-fast
                  ${service.gradients[0]}
                  opacity-50 group-hover:opacity-100 
                  transition-opacity duration-500
                `} />
                <div className={`
                  absolute inset-0 bg-gradient-to-br
                  animate-gradient-x-reverse
                  group-hover:animate-gradient-x-fast-reverse
                  ${service.gradients[1]}
                  opacity-0 group-hover:opacity-50
                  transition-opacity duration-500
                `} />

                <CardHeader className="pb-4 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/80 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                      <service.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold leading-tight">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardHeader>

                <CardContent className="flex-grow pt-2 relative">
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <CheckSquare className="h-5 w-5 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110 duration-300" />
                          <span className="leading-tight">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-6 relative">
                  <Link href={`/services/${service.title.toLowerCase().replace(/ & | /g, '-')}`}>
                    <Button
                      className="w-full group bg-white/80 hover:bg-primary text-primary hover:text-white 
                        transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Account-Based Marketing?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how our integrated ABM solutions can help you engage and convert your most valuable target accounts.
          </p>
          <Button
            size="lg"
            className="shadow-lg group"
            onClick={() => window.open(calendlyUrl, '_blank')}
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}