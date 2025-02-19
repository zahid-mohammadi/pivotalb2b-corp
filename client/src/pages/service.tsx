import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
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
  Workflow,
  CircleDot,
  BookOpen,
  Award,
  Sparkles
} from "lucide-react";
import type { Service, UseCase, FAQ } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";

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
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  const industries = [
    "Telecommunications",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "Enterprise Technology",
    "Retail & Ecommerce",
    "HR Technology & Services",
    "Energy"
  ];

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
    <>
      <MetaTags
        title={`${service.title} - B2B Marketing Services`}
        description={`${service.description} Learn how our ${service.title} service can transform your B2B marketing strategy and drive measurable business growth.`}
        keywords={`${service.title}, B2B marketing service, lead generation, ${industries.join(', ')}, business growth, marketing solutions`}
      />
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
              <Button
                size="lg"
                variant="secondary"
                className="shadow-xl"
                onClick={() => window.open(calendlyUrl, '_blank')}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="container mx-auto px-4 py-20">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto gap-4 p-1 bg-gradient-to-r from-slate-100 to-white rounded-xl shadow-lg border border-slate-200/50">
              <TabsTrigger
                value="overview"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <BookOpen className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Overview</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="methodology"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <Workflow className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Methodology</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="use-cases"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <Sparkles className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Use Cases</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="industries"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <Building2 className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">Industries</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="relative group overflow-hidden rounded-lg py-6 transition-all duration-300 bg-gradient-to-br from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 data-[state=active]:from-rose-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative flex items-center justify-center gap-2">
                  <div className="p-2 rounded-lg bg-white/80 group-hover:bg-white/90 group-data-[state=active]:bg-white/20 transition-colors">
                    <HelpCircle className="h-4 w-4 group-data-[state=active]:text-white transition-colors" />
                  </div>
                  <span className="font-medium">FAQ</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Features Card */}
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <Zap className="h-6 w-6 text-blue-500" />
                          </div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Key Features</h2>
                        </div>
                        <div className="space-y-4">
                          {service.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full transform group-hover:scale-110 transition-transform">
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <p className="leading-tight pt-1 group-hover:text-blue-600 transition-colors">{feature}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Benefits Card */}
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            <Award className="h-6 w-6 text-purple-500" />
                          </div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Benefits</h2>
                        </div>
                        <div className="space-y-4">
                          {service.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full transform group-hover:scale-110 transition-transform">
                                  <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <p className="leading-tight pt-1 group-hover:text-purple-600 transition-colors">{benefit}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Tools & Technologies */}
                  {service.toolsAndTechnologies && (
                    <motion.div variants={itemVariants} className="lg:col-span-2" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                              <Workflow className="h-6 w-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">Tools & Technologies</h2>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {service.toolsAndTechnologies.map((tool, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="relative bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200/80 hover:border-emerald-200 transition-colors">
                                  {tool}
                                </div>
                              </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Workflow className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Our Methodology</h2>
                      </div>
                      <div className="prose prose-slate max-w-none">
                        {service.methodology && (
                          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: service.methodology }} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Use Cases Tab */}
              <TabsContent value="use-cases">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {Array.isArray(service.useCases) && service.useCases.length > 0 ? (
                    service.useCases.map((useCase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="h-full bg-gradient-to-br from-white to-slate-50 border-slate-200/80 hover:border-primary/20">
                          <CardContent className="p-8">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-primary" />
                              {useCase.title}
                            </h3>
                            <p className="text-muted-foreground mb-6">{useCase.description}</p>

                            <div className="space-y-6">
                              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Challenge
                                </h4>
                                <p className="text-sm text-muted-foreground">{useCase.challenge}</p>
                              </div>

                              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4" />
                                  Solution
                                </h4>
                                <p className="text-sm text-muted-foreground">{useCase.solution}</p>
                              </div>

                              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                  <BarChart3 className="h-4 w-4" />
                                  Outcome
                                </h4>
                                <p className="text-sm text-muted-foreground">{useCase.outcome}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-muted-foreground">No use cases available at this time.</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              {/* Industries Tab */}
              <TabsContent value="industries">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Industries We Serve</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((industry, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/80 group-hover:border-primary/20 transition-colors">
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <CircleDot className="h-4 w-4 text-primary" />
                                {industry}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Specialized solutions tailored for {industry.toLowerCase()} sector requirements and challenges.
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/80">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <HelpCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                      </div>
                      <div className="space-y-6">
                        {service.faqQuestions && service.faqQuestions.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                          >
                            <div className="border-b border-slate-200 pb-6 last:border-0">
                              <h3 className="font-semibold mb-3 text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                                <CircleDot className="h-4 w-4 text-primary" />
                                {faq.question}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed pl-6">{faq.answer}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <Card className="bg-primary text-primary-foreground overflow-hidden relative">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary" />
              </div>
              <CardContent className="p-12 relative">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl">
                  Let's discuss how our {service.title} solution can help achieve your business goals.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => window.open(calendlyUrl, '_blank')}
                    className="shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    Schedule a Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:bg-white/10 transition-colors"
                  >
                    Download Brochure
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}