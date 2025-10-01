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

// Enhanced Services Data with Color Themes
const services = [
  {
    title: "Account-Based Marketing (ABM) Programs",
    description: "Engage full buying committees inside your Target Accounts before competitors enter the conversation.",
    slogan: "Engage Target Accounts with Precision",
    icon: Target,
    ctaLabel: "Explore ABM Solutions",
    gradient: "from-blue-500 to-indigo-600",
    hoverGradient: "from-blue-600 to-indigo-700",
    bgGradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600"
  },
  {
    title: "B2B Lead Generation & Qualification",
    description: "Fill your pipeline only with decision-makers who match your ICP and show genuine interest.",
    slogan: "Only Real Buyers in Your Pipeline",
    icon: Users,
    ctaLabel: "Generate Quality Leads",
    gradient: "from-green-500 to-emerald-600",
    hoverGradient: "from-green-600 to-emerald-700",
    bgGradient: "from-green-50 to-emerald-50",
    iconColor: "text-green-600"
  },
  {
    title: "Lead Nurturing & Buyer Engagement",
    description: "Keep early-stage prospects engaged until timing aligns — ensuring no opportunity goes cold.",
    slogan: "Cold Leads to Future Revenue",
    icon: Sparkles,
    ctaLabel: "Start Nurturing Leads",
    gradient: "from-purple-500 to-violet-600",
    hoverGradient: "from-purple-600 to-violet-700",
    bgGradient: "from-purple-50 to-violet-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Precision Demand Generation",
    description: "Educate in-market buyers early and convert research-stage interest into active sales conversations.",
    slogan: "Turn Interest into Revenue Momentum",
    icon: TrendingUp,
    ctaLabel: "Request Precision Demand Gen Proposal",
    gradient: "from-orange-500 to-red-600",
    hoverGradient: "from-orange-600 to-red-700",
    bgGradient: "from-orange-50 to-red-50",
    iconColor: "text-orange-600"
  },
  {
    title: "Event Marketing & Audience Acquisition",
    description: "Fill your events with the right audience — engaged decision-makers from your Target Accounts who are exploring solutions and open to meaningful conversations.",
    slogan: "Events Filled with Decision-Makers",
    icon: Rocket,
    ctaLabel: "Scale Event Marketing",
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "from-cyan-600 to-blue-700",
    bgGradient: "from-cyan-50 to-blue-50",
    iconColor: "text-cyan-600"
  },
  {
    title: "Lead Validation & Enrichment",
    description: "Turn raw or outdated contact lists into accurate, compliant, and actionable sales intelligence.",
    slogan: "Clean Data, Clear Opportunities",
    icon: CheckCircle2,
    ctaLabel: "Validate Your Leads",
    gradient: "from-pink-500 to-rose-600",
    hoverGradient: "from-pink-600 to-rose-700",
    bgGradient: "from-pink-50 to-rose-50",
    iconColor: "text-pink-600"
  }
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Services That Build Predictable Revenue
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            From ABM to Demand Gen, every program is designed to deliver qualified leads and scalable pipeline growth.
          </motion.p>
        </motion.div>

        {/* Services Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Enhanced Card Container with Beautiful Hover Effects */}
              <Card className="h-full bg-white relative overflow-hidden flex flex-col transition-all duration-500 ease-in-out transform-gpu group-hover:shadow-2xl border-2 border-transparent">
                
                {/* Continuous Rotating Background Animation - Full Card Fill */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-75 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, ${service.gradient.includes('blue') ? '#3B82F6, #60A5FA, #93C5FD, #DBEAFE, #3B82F6' : service.gradient.includes('green') ? '#10B981, #34D399, #6EE7B7, #D1FAE5, #10B981' : service.gradient.includes('purple') ? '#8B5CF6, #A78BFA, #C4B5FD, #EDE9FE, #8B5CF6' : service.gradient.includes('orange') ? '#F97316, #FB923C, #FDBA74, #FED7AA, #F97316' : service.gradient.includes('cyan') ? '#06B6D4, #22D3EE, #67E8F9, #CFFAFE, #06B6D4' : '#EC4899, #F472B6, #F9A8D4, #FCE7F3, #EC4899'})`
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Text Readability Overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/90 opacity-100 group-hover:opacity-85 transition-opacity duration-500"
                />
                
                {/* Card Header */}
                <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 text-center">
                  {/* Animated Icon Container */}
                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${service.bgGradient} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -10, 10, -5, 0],
                      boxShadow: `0 10px 25px -5px ${service.gradient.includes('blue') ? '#3B82F620' : service.gradient.includes('green') ? '#10B98120' : service.gradient.includes('purple') ? '#8B5CF620' : service.gradient.includes('orange') ? '#F9731620' : service.gradient.includes('cyan') ? '#06B6D420' : '#EC489920'}`
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Animated Background Pulse */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <service.icon className={`h-10 w-10 ${service.iconColor} relative z-10`} />
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated Title */}
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {service.title}
                  </motion.h3>
                </div>
                
                {/* Card Content */}
                <div className="relative px-6 pb-6 flex-1 flex flex-col">
                  {/* Description */}
                  <motion.p 
                    className="text-gray-600 leading-relaxed mb-4 flex-1 group-hover:text-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.description}
                  </motion.p>
                  
                  {/* Solution Slogan with Color Animation */}
                  <motion.div 
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.p 
                      className={`font-semibold text-lg italic bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: "200% 200%"
                      }}
                    >
                      "{service.slogan}"
                    </motion.p>
                  </motion.div>
                  
                  {/* Enhanced Call to Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      onClick={() => {
                        const serviceSlugMap: Record<string, string> = {
                          'Account-Based Marketing (ABM) Programs': 'account-based-marketing-abm-programs',
                          'B2B Lead Generation & Qualification': 'b2b-lead-generation-qualification',
                          'Lead Nurturing & Buyer Engagement': 'lead-nurturing-buyer-engagement',
                          'Precision Demand Generation': 'precision-demand-generation',
                          'Event Marketing & Audience Acquisition': 'event-marketing-audience-acquisition',
                          'Lead Validation & Enrichment': 'lead-validation-enrichment'
                        };
                        const slug = serviceSlugMap[service.title] || service.title.toLowerCase().replace(/ & | /g, '-');
                        window.location.href = `/services/${slug}`;
                      }}
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient} text-white font-semibold py-3 rounded-xl transition-all duration-500 relative overflow-hidden group/btn shadow-lg hover:shadow-xl`}
                    >
                      {/* Button Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      
                      <span className="relative flex items-center justify-center">
                        {service.ctaLabel}
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
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