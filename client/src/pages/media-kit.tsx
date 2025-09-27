import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";

export default function MediaKit() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Professional Media Kit | Pivotal B2B - B2B Lead Generation Experts"
        description="Download our comprehensive professional media kit with company information, services, case studies, and brand assets for press and partners."
        keywords="media kit, press kit, brand assets, B2B lead generation, company information, professional services"
      />

      {/* Header with Download Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Pivotal B2B Professional Media Kit</h1>
              <p className="text-blue-100">Comprehensive brand assets and company information</p>
            </div>
            <Button 
              onClick={() => setIsGeneratingPDF(true)} 
              disabled={isGeneratingPDF}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              data-testid="button-download-pdf"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                  Generating Professional PDF...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Professional Media Kit
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Professional Media Kit
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Everything you need to know about Pivotal B2B - our story, services, and success metrics.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/logo.png" 
                  alt="Pivotal B2B Logo" 
                  className="h-24 mx-auto md:mx-0 mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Every Lead. Vetted. Qualified. Revenue-Ready.</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pivotal B2B transforms B2B marketing with data-driven Account-Based Marketing (ABM) solutions, 
                  advanced content creation, and optimization capabilities that deliver qualified leads and scalable pipeline growth.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-gray-600">
                    <p>📧 contact@pivotal-b2b.com</p>
                    <p>📞 +1 417-900-3844</p>
                    <p>🌐 pivotal-b2b.com</p>
                    <p>💼 linkedin.com/company/pivotalb2b</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}