import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Rocket
} from "lucide-react";

// Simplified Services Data
const services = [
  {
    title: "Account-Based Marketing (ABM) Programs",
    description: "Laser-focused campaigns that target high-value accounts with personalized messaging and multi-channel engagement strategies.",
    slogan: "Turn prospects into partners",
    icon: Target,
    ctaLabel: "Explore ABM Solutions"
  },
  {
    title: "B2B Lead Generation & Qualification",
    description: "Advanced lead scoring and qualification processes that identify and nurture high-intent prospects through the entire funnel.",
    slogan: "Quality leads, guaranteed results",
    icon: Users,
    ctaLabel: "Generate Quality Leads"
  },
  {
    title: "Precision Demand Generation",
    description: "We connect you with buyers who are actively researching solutions like yours, delivering your message at the right time to influence their decision-making and secure pipeline opportunities before competitors.",
    slogan: "Reach buyers when it matters most",
    icon: TrendingUp,
    ctaLabel: "Request Precision Demand Gen Proposal"
  },
  {
    title: "Event Marketing & Audience Acquisition",
    description: "Strategic event marketing that drives qualified attendance and converts event engagement into sales opportunities.",
    slogan: "Events that convert",
    icon: Rocket,
    ctaLabel: "Scale Event Marketing"
  },
  {
    title: "Lead Validation & Enrichment",
    description: "Comprehensive data validation and enrichment services that ensure your sales team works with accurate, actionable prospect information.",
    slogan: "Clean data, clear results",
    icon: CheckCircle2,
    ctaLabel: "Validate Your Leads"
  }
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-3"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border border-primary/20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="mr-2 h-4 w-4" />
              </motion.div>
              Revolutionary Solutions
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From Wasted Leads to Measurable Revenue
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Every solution we offer is designed to solve one problem—turn marketing investment into predictable, scalable revenue growth through cutting-edge technology and proven methodologies.
          </motion.p>
        </motion.div>

        {/* Services Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Simple Card Container */}
              <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Card Header */}
                <div className="p-6 pb-4 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                </div>
                
                {/* Card Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  
                  {/* Solution Slogan */}
                  <div className="mb-6">
                    <p className="text-blue-700 font-semibold text-lg italic">
                      "{service.slogan}"
                    </p>
                  </div>
                  
                  {/* Call to Action Button */}
                  <Button
                    onClick={() => {
                      const serviceSlugMap: Record<string, string> = {
                        'Account-Based Marketing (ABM) Programs': 'account-based-marketing',
                        'B2B Lead Generation & Qualification': 'b2b-lead-generation-qualification', 
                        'Precision Demand Generation': 'precision-demand-generation',
                        'Event Marketing & Audience Acquisition': 'event-marketing-solutions',
                        'Lead Validation & Enrichment': 'lead-validation-enrichment'
                      };
                      const slug = serviceSlugMap[service.title] || service.title.toLowerCase().replace(/ & | /g, '-');
                      window.location.href = `/services/${slug}`;
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  >
                    {service.ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            onClick={() => window.location.href = '/request-proposal'}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear"
              }}
            />
            <span className="relative flex items-center gap-3">
              🚀 Get Your Free Revenue Audit
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}