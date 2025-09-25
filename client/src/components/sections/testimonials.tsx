
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, TrendingUp, Users, DollarSign, Award, Building, CheckCircle } from "lucide-react";

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const testimonials = [
    {
      quote: "We went from 12 leads per month to 180+ qualified prospects in 90 days. Our sales team can't keep up with all the opportunities—this is the best problem we've ever had.",
      author: "Sarah Chen",
      role: "VP of Sales",
      company: "TechFlow Solutions",
      revenue: "$2.4M",
      metric: "Pipeline added in 6 months",
      avatar: "SC"
    },
    {
      quote: "Finally, marketing that actually drives revenue. Our cost per acquisition dropped 60% while deal sizes increased 40%. The ROI is undeniable.",
      author: "Michael Rodriguez",
      role: "CMO",
      company: "DataCore Systems", 
      revenue: "340%",
      metric: "ROI improvement",
      avatar: "MR"
    },
    {
      quote: "Before Pivotal B2B, our sales team was chasing ghosts. Now every lead comes pre-qualified with budget and timeline. Our close rate jumped from 8% to 31%.",
      author: "Jennifer Park",
      role: "CEO",
      company: "CloudScale Industries",
      revenue: "31%",
      metric: "Close rate achieved",
      avatar: "JP"
    }
  ];

  const trustLogos = [
    { name: "Microsoft", width: "w-24" },
    { name: "Salesforce", width: "w-28" },
    { name: "HubSpot", width: "w-24" },
    { name: "Oracle", width: "w-20" },
    { name: "AWS", width: "w-16" },
    { name: "Google", width: "w-24" }
  ];

  const metrics = [
    { value: "300+", label: "Companies Transformed", icon: Building },
    { value: "$50M+", label: "Revenue Generated", icon: DollarSign },
    { value: "87%", label: "Client Retention Rate", icon: Award },
    { value: "180%", label: "Average ROI", icon: TrendingUp }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Real Results From Real Customers
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Companies Who Stopped Wasting Money on Bad Leads
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we transformed struggling marketing teams into revenue-generating machines—with real numbers and documented results.
          </p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center">
                <metric.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-gray-600 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Metric highlight */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6 border border-green-100">
                <div className="text-2xl font-bold text-green-700">{testimonial.revenue}</div>
                <div className="text-green-600 text-sm">{testimonial.metric}</div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="text-primary text-sm font-medium">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-8 text-lg">Trusted by marketing teams at:</p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={index}
                className={`${logo.width} h-12 bg-gray-300 rounded-lg flex items-center justify-center`}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-600 font-semibold text-sm">{logo.name}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-8 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              See how we can transform your marketing spend into predictable revenue in just 90 days.
            </p>
            <motion.button
              onClick={() => window.open('https://calendly.com/zahid-m/30min', '_blank')}
              className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Your Free Revenue Audit →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
