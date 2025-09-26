import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Target, Users, TrendingUp, CheckCircle, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Driving Predictable B2B Revenue{" "}
            <span className="text-primary">Since 2017</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We help businesses stop wasting budget on unqualified leads—and start building pipelines 
            filled with decision-makers actively evaluating solutions.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Our Story */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Founded in 2017 by <strong>Zahid Mohammadi (Founder & CEO)</strong>, Pivotal B2B was created to solve 
              one of the biggest frustrations in B2B marketing: generating leads that don't convert into meaningful revenue.
            </p>
            <p>
              What started as a small initiative to improve lead quality has grown into a trusted demand generation 
              partner for enterprises and agencies worldwide. From day one, our vision has been clear—help businesses 
              connect with the right buyers, at the right time, with measurable impact.
            </p>
          </div>
        </motion.section>

        {/* Our Mission */}
        <motion.section 
          className="mb-16 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/5 dark:to-slate-800 rounded-2xl p-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            To transform B2B marketing from a cost center into a predictable revenue engine. We achieve this by 
            blending data, technology, and proven methodology to deliver opportunities from buyers who are 
            genuinely in-market.
          </p>
        </motion.section>

        {/* Our Approach */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Approach</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Buyer-Centric
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                We target your exact Ideal Customer Profile (ICP) and connect you with real decision-makers.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Data-Driven
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                We use advanced intent signals, precise targeting, and rigorous validation.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Results-Focused
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our programs are measured by pipeline growth, conversion rates, and ROI—not vanity metrics.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Agile & Scalable
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Whether you're a growing SaaS firm or a global enterprise, we adapt to your business needs and goals.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Leadership */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Leadership</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Zahid Mohammadi – Founder & CEO
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              With nearly a decade of experience in B2B demand generation, Zahid founded Pivotal B2B with a guiding 
              belief: lead quality matters more than lead volume. His mission has been to create a partner-first company 
              that consistently delivers growth and trust for its clients.
            </p>
          </div>
        </motion.section>

        {/* Why Work With Us */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No long-term contracts</h3>
                <p className="text-slate-600 dark:text-slate-300">We earn your business every month.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">72-hour campaign setup</h3>
                <p className="text-slate-600 dark:text-slate-300">Fast execution without long onboarding delays.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">90-day performance guarantee</h3>
                <p className="text-slate-600 dark:text-slate-300">Measurable impact, or we make it right.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Partnership mindset</h3>
                <p className="text-slate-600 dark:text-slate-300">Your success is the only metric that matters.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          className="text-center bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build Predictable Growth Together
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Since 2017, we've been helping companies turn their marketing spend into real revenue. 
            Let's talk about how we can do the same for you.
          </p>
          <Link href="/request-proposal">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 group"
              data-testid="button-request-audit"
            >
              Request Your Free Revenue Audit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}