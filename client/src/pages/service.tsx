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
                {(service as any).heroHeadline || service.title}
              </h1>
              <h2 className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                {(service as any).heroSubheadline || service.description}
              </h2>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                onClick={() => window.location.href = '/request-proposal'}
              >
                {(service as any).heroCta || 'Request a Proposal'}
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
                {(service as any).benefits?.map((benefit: any, index: number) => (
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
                )) || (
                  <div className="col-span-2 text-center text-gray-500">
                    Benefits content will be loaded from database
                  </div>
                )}
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
                  {(service as any).overview || service.description}
                </p>
                {(service as any).overviewPoints && (
                  <ul className="space-y-3">
                    {(service as any).overviewPoints.map((point: any, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CircleDot className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
                Methodology
              </h2>
              <div className="space-y-8">
                {(service as any).methodology?.map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </motion.div>
                )) || (
                  <div className="text-center text-gray-500">
                    Methodology content will be loaded from database
                  </div>
                )}
              </div>
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
                {(service as any).faqs?.map((faq: any, index: number) => (
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
                )) || (
                  <div className="text-center text-gray-500">
                    FAQ content will be loaded from database
                  </div>
                )}
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