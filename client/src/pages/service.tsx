import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  CircleDot,
  HelpCircle,
  Target,
  Users,
  Rocket,
  TrendingUp,
  Settings,
} from "lucide-react";
import type { Service } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  const industries = [
    "Enterprise Software",
    "Telecommunication", 
    "Financial Services",
    "IT Services and Consulting",
    "Professional Services",
    "B2B Vendors",
    "B2B Marketing Agencies"
  ];

  // Hero content mapping based on user specifications
  const heroContent: Record<string, { headline: string; subheadline: string; cta: string }> = {
    "account-based-marketing-abm-programs": {
      headline: "Influence Buying Committees at Your Target Accounts",
      subheadline: "Our ABM programs engage entire buying groups inside your named target accounts, building relationships and influencing decisions before competitors are even considered.",
      cta: "Request an ABM Proposal"
    },
    "b2b-lead-generation-qualification": {
      headline: "Generate and Qualify Leads That Actually Convert", 
      subheadline: "We combine precise lead generation with rigorous qualification, delivering a steady flow of new opportunities while ensuring every lead is relevant, accurate, and aligned with your target accounts.",
      cta: "Request a Lead Generation Proposal"
    },
    "precision-demand-generation": {
      headline: "Deliver the Right Message to the Right Buyers at the Right Time",
      subheadline: "Our Precision Demand Generation programs identify in-market accounts, connect with the right decision-makers, and educate buyers with insights that solve their challenges—so when they're ready to buy, your solution is already top of mind.",
      cta: "Request a Precision Demand Gen Proposal"
    },
    "event-marketing-audience-acquisition": {
      headline: "Fill Your Events With Real Buyers",
      subheadline: "We ensure your events attract decision-makers with genuine intent, so every conversation moves pipeline forward and every event delivers measurable ROI.",
      cta: "Request an Event Marketing Proposal"
    },
    "lead-validation-enrichment": {
      headline: "Stop Wasting Time on Bad Data",
      subheadline: "We validate, clean, and enrich every lead so your sales team engages only with accurate, compliant, and relevant opportunities.",
      cta: "Request a Lead Validation Proposal"
    },
    "lead-nurturing-buyer-engagement": {
      headline: "Turn Cold Leads Into Future Revenue",
      subheadline: "We keep future buyers engaged with educational content and personalized touchpoints until they're ready to talk with sales—ensuring no opportunity is lost.",
      cta: "Request a Nurture Strategy Proposal"
    }
  };

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

  // Generate industry-specific keywords
  const industryKeywords = industries.map(industry => 
    `${service.title} for ${industry}, ${industry} ${service.title.toLowerCase()}`
  ).join(', ');

  return (
    <>
      <MetaTags
        title={`${service.title} - B2B Marketing Solutions | Pivotal B2B`}
        description={`Transform your B2B marketing with our ${service.title}. ${service.description} Expert solutions for enterprise software, telecommunication, financial services, and IT services sectors.`}
        keywords={`${service.title.toLowerCase()}, B2B ${service.title.toLowerCase()}, ${industryKeywords}, enterprise marketing solutions, B2B lead generation`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "url": "https://pivotal-b2b.com"
          },
          "serviceType": "B2B Marketing Service",
          "areaServed": industries
        }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 lg:py-24">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroContent[params?.slug!]?.headline || service.title}
              </h1>
              <h2 className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                {heroContent[params?.slug!]?.subheadline || service.description}
              </h2>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                onClick={() => window.location.href = '/request-proposal'}
              >
                {heroContent[params?.slug!]?.cta || "Request a Proposal"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* What You Gain Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                What You Gain
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits?.map((benefit: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Overview
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {service.description}
                </p>
                {service.features && (
                  <ul className="space-y-3">
                    {service.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CircleDot className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Our Proven Methodology
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A systematic approach that delivers measurable results through proven, repeatable processes
                </p>
              </div>

              {service.methodology ? (
                <div className="grid gap-8">
                  {service.methodology.split(/\d+\./).filter(Boolean).map((step: string, index: number) => {
                    const [title, ...descriptionParts] = step.split(':');
                    const description = descriptionParts.join(':').trim();
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="relative"
                      >
                        <div className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                          {/* Step Number */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {index + 1}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                              {title.trim()}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                              {description}
                            </p>
                          </div>

                          {/* Visual Icon */}
                          <div className="hidden lg:block flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              {index === 0 && <Target className="w-6 h-6 text-blue-600" />}
                              {index === 1 && <Users className="w-6 h-6 text-blue-600" />}
                              {index === 2 && <Rocket className="w-6 h-6 text-blue-600" />}
                              {index === 3 && <TrendingUp className="w-6 h-6 text-blue-600" />}
                              {index > 3 && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                            </div>
                          </div>
                        </div>

                        {/* Connecting Line */}
                        {index < service.methodology.split(/\d+\./).filter(Boolean).length - 1 && (
                          <div className="hidden lg:block absolute left-8 top-20 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-blue-100 z-10"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 bg-white rounded-2xl p-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>Methodology content will be loaded from database</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {service.faqQuestions?.map((faq: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Lead Generation?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Schedule a consultation to discuss your specific needs and goals.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg"
                onClick={() => window.open(calendlyUrl, '_blank')}
              >
                Schedule Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}