import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, CheckCircle, Sparkles, TrendingUp, Users, FileCheck, Zap, Building2, Lock, BookOpen, Award } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const industries = [
    "SaaS / Software",
    "Cybersecurity",
    "IT Services & Infrastructure",
    "HR Tech / People Platforms",
    "Industrial & Manufacturing",
    "Professional Services",
    "B2B Marketing Agencies"
  ];

  const beliefs = [
    { text: "Quality outweighs volume — always.", icon: Award },
    { text: "Compliance isn't an obstacle — it's a competitive advantage.", icon: Shield },
    { text: "Content should educate, not interrupt.", icon: BookOpen },
    { text: "Every lead delivered should be relevant, reachable, and revenue-capable.", icon: Target }
  ];

  const partnershipPrinciples = [
    { text: "No long-term contracts — partnerships are earned, not enforced.", icon: CheckCircle },
    { text: "Fully compliant outreach — GDPR, CCPA, and TCPA aligned.", icon: Lock },
    { text: "Measurable outcomes — programs tied directly to pipeline contribution.", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" />
                Founded in 2017
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-blue-200 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
              Built for B2B Teams That Demand Precision
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium mb-8">
              Not Just Promotion
            </p>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Pivotal B2B was founded by <span className="font-semibold text-gray-900 dark:text-white">Zahid Mohammadi</span> with a clear mission: 
              To help B2B organizations engage only the buyers who matter — by replacing disconnected outreach with 
              <span className="font-semibold text-primary"> targeted, compliant, revenue-focused programs.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Principle Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Where We Stand Apart
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              While most providers focus on volume and vanity metrics, we built on a different principle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pipeline Confidence Over Lead Count
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We measure success by revenue impact, not vanity metrics
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ideal Customer Profile (ICP) Alignment
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every campaign precisely targets your perfect customer
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Compliant Engagement
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Full buying committee reach with complete compliance
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              We operate as a <span className="font-bold text-primary">strategic partner</span>, not just a data vendor or lead supplier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Pivotal B2B supports mid-market to enterprise organizations across multiple industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {industry}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our programs are designed for revenue-focused teams that sell <span className="font-semibold text-gray-900 dark:text-white">complex or considered solutions</span>, 
              require <span className="font-semibold text-gray-900 dark:text-white">multi-stakeholder engagement</span>, and value long-term commercial alignment over transactional lead handoffs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What We Believe
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {beliefs.map((belief, index) => {
              const Icon = belief.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-2">
                    {belief.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Partner */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How We Partner
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Every engagement is built on flexibility and transparency
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {partnershipPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-6 p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed pt-3">
                    {principle.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-primary to-purple-900 dark:from-gray-950 dark:via-primary dark:to-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-8">
              <Zap className="w-4 h-4" />
              Our Commitment
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              An Extension of Your Team,<br />
              <span className="text-blue-200">Not an External Vendor</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-12">
              Whether you need to activate Account-Based Marketing (ABM), scale content-led demand generation, 
              or strengthen sales pipeline consistency, Pivotal B2B is designed to operate as your growth partner.
            </p>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12">
              <p className="text-2xl md:text-3xl font-bold text-white italic">
                "Let's build a pipeline that converts — not just one that fills."
              </p>
            </div>

            <Link href="/request-proposal">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-blue-50 text-lg px-10 py-7 rounded-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 group"
                data-testid="button-start-partnership"
              >
                Start Your Partnership
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
