import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  Zap,
  Target,
  Users,
  TrendingUp,
  Building2,
  BarChart4,
  Lightbulb,
  HelpCircle,
  Workflow
} from "lucide-react";
import type { Service } from "@shared/schema";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: [`/api/services/${params?.slug}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with success metrics */}
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
            <h1 className="text-5xl font-bold text-white mb-6">{service.title}</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {service.successMetrics?.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1 min-w-[200px] text-center"
                >
                  <p className="text-white/90 text-sm mb-2">Success Metric</p>
                  <p className="text-white font-semibold">{metric}</p>
                </motion.div>
              ))}
            </div>
            <Button size="lg" variant="secondary" className="shadow-xl">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-20">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-auto gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Features Card */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Key Features</h2>
                    </div>
                    <div className="space-y-4">
                      {service.features.map((feature, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                          <p>{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits Card */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Benefits</h2>
                    </div>
                    <div className="space-y-4">
                      {service.benefits.map((benefit, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                          <p>{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tools & Technologies */}
              {service.toolsAndTechnologies && (
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Workflow className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Tools & Technologies</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {service.toolsAndTechnologies.map((tool, index) => (
                          <div 
                            key={index}
                            className="bg-slate-50 rounded-lg p-4 text-center"
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          {/* Methodology Tab */}
          <TabsContent value="methodology">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Methodology</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  {service.methodology && (
                    <div dangerouslySetInnerHTML={{ __html: service.methodology }} />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Use Cases Tab */}
          <TabsContent value="use-cases">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.useCases?.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-6">{useCase.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{useCase.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <p className="text-sm text-muted-foreground">{useCase.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Outcome</h4>
                        <p className="text-sm text-muted-foreground">{useCase.outcome}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Industries Tab */}
          <TabsContent value="industries">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Industries We Serve</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {service.industries?.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 rounded-lg p-6"
                    >
                      <h3 className="font-semibold mb-2">{industry}</h3>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                  {service.faqQuestions?.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-200 pb-6 last:border-0"
                    >
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our {service.title} solution can help achieve your business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary">
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent">
                  Download Brochure
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