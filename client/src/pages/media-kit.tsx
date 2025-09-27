import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, Check, Target, Users, TrendingUp, Rocket, Sparkles, Shield,
  Building2, UserCheck, DollarSign, Award, Globe, Mail, Phone, Linkedin,
  ExternalLink, Calendar, Star, CheckCircle2, BarChart3
} from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

export default function MediaKit() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();
  
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      toast({
        title: "Generating Media Kit PDF",
        description: "Please wait while we create your high-resolution media kit...",
        duration: 5000,
      });

      const element = document.getElementById('media-kit-content');
      if (!element) return;

      // High-quality PDF generation
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        allowTaint: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions for better fit
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if content is long
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Pivotal-B2B-Media-Kit.pdf');
      
      toast({
        title: "Download Complete!",
        description: "Your media kit has been downloaded successfully.",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "There was a problem generating the PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const services = [
    {
      title: "Account-Based Marketing (ABM) Programs",
      description: "Engage full buying committees at target accounts before competitors enter the conversation.",
      icon: Target,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "B2B Lead Generation & Qualification",
      description: "Generate and qualify net-new leads that align with your ICP and are ready to convert.",
      icon: UserCheck,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Precision Demand Generation",
      description: "Identify in-market accounts, deliver educational insights, and capture demand at the right moment.",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Event Marketing & Audience Acquisition",
      description: "Fill your events with decision-makers who have budget and intent to buy.",
      icon: Rocket,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Lead Validation & Enrichment",
      description: "Clean, validate, and enrich lead data to ensure accuracy, compliance, and conversion-readiness.",
      icon: Shield,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Lead Nurturing & Buyer Engagement",
      description: "Keep future buyers engaged with personalized journeys until they are revenue-ready.",
      icon: Sparkles,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const valuePromises = [
    {
      title: "Quality Over Quantity",
      description: "Only real buyers, not browsers",
      icon: Target
    },
    {
      title: "100% Compliant Outreach",
      description: "GDPR, CCPA & TCPA ready",
      icon: Shield
    },
    {
      title: "Lower Cost per Lead",
      description: "Reduce acquisition costs, increase ROI",
      icon: DollarSign
    },
    {
      title: "No Long-Term Contracts, Zero Lock-In",
      description: "Full flexibility",
      icon: Award
    }
  ];

  const successStories = [
    {
      company: "TechFlow Solutions",
      result: "+180 qualified prospects in 90 days",
      impact: "$2.4M pipeline added"
    },
    {
      company: "DataCore Systems",
      result: "Cost per acquisition down 60%",
      impact: "340% ROI improvement"
    },
    {
      company: "CloudScale Industries",
      result: "Close rate jumped from 8% to 31%",
      impact: "Fully pre-qualified leads delivered"
    }
  ];

  const impactStats = [
    {
      stat: "3x",
      description: "Higher Lead Quality",
      subtext: "compared to traditional providers",
      icon: Target
    },
    {
      stat: "90 Days",
      description: "Guaranteed Pipeline Growth",
      subtext: "measurable results in 3 months",
      icon: TrendingUp
    },
    {
      stat: "87%",
      description: "Client Retention Rate",
      subtext: "long-term partnerships",
      icon: Users
    },
    {
      stat: "135M+",
      description: "Professional Profiles",
      subtext: "across all major industries",
      icon: Globe
    }
  ];

  const trustedCompanies = [
    "Microsoft", "Salesforce", "HubSpot", "Oracle", "AWS", "Google"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Media Kit | Pivotal B2B - Professional B2B Lead Generation"
        description="Download our comprehensive media kit with company information, services, case studies, and contact details for press and partners."
        keywords="media kit, press kit, brand assets, B2B lead generation, company information"
      />

      {/* Header with Download Button */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Pivotal B2B Media Kit</h1>
          <Button 
            onClick={generatePDF} 
            disabled={isGeneratingPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 shadow-lg"
            data-testid="button-download-pdf"
          >
            {isGeneratingPDF ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating PDF...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Media Kit Content - Optimized for PDF */}
      <div 
        id="media-kit-content" 
        className="bg-white max-w-[210mm] mx-auto"
        style={{ 
          fontFamily: '"Open Sans", "Lato", system-ui, -apple-system, sans-serif',
          lineHeight: '1.6'
        }}
      >
        
        {/* 1. Cover Page */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Logo */}
            <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl">
              <span className="text-6xl font-bold text-white">PB</span>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">Pivotal B2B</h1>
            <p className="text-3xl text-blue-600 font-semibold mb-12 tracking-wide">
              Every Lead. Vetted. Qualified. Revenue-Ready.
            </p>
          </motion.div>
          
          <div className="text-gray-600 space-y-4 text-lg">
            <p className="flex items-center justify-center gap-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <span className="font-medium">pivotal-b2b.com</span>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="font-medium">contact@pivotal-b2b.com</span>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <span className="font-medium">+1 417-900-3844</span>
            </p>
          </div>
        </section>

        {/* 2. About Pivotal B2B */}
        <section className="py-20 px-16 bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              About Pivotal B2B
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Founded in 2017 by Zahid Mohammadi, Pivotal B2B helps companies transform marketing budgets into predictable revenue. We specialize in precision-driven B2B lead generation and demand generation services that guarantee qualified leads aligned with your ICP.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-bold text-gray-900 text-lg">Founded:</span>
                    <span className="text-gray-700 text-lg ml-2">2017</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-bold text-gray-900 text-lg">Founder & CEO:</span>
                    <span className="text-gray-700 text-lg ml-2">Zahid Mohammadi</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-bold text-gray-900 text-lg">Core Strengths:</span>
                    <span className="text-gray-700 text-lg ml-2">Lead Quality, Compliance, Pipeline Growth</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl leading-relaxed text-blue-100">
                To transform B2B marketing from a cost center into a predictable revenue engine through precision targeting, compliant outreach, and qualified lead delivery.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold">Transforming B2B Marketing Since 2017</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Value Promises */}
        <section className="py-20 px-16 bg-gray-50">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Our Core Value Promises
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {valuePromises.map((promise, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{promise.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{promise.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Services Overview */}
        <section className="py-20 px-16 bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Our Services
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Target Audience Reach */}
        <section className="py-20 px-16 bg-gray-50">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Target Audience Reach
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2">
              <div className="bg-white p-10 rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  135M+ Professional Profiles
                </h3>
                
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-6 text-xl">Departments</h4>
                    <div className="space-y-4">
                      {['IT & Technology', 'Sales & Business Development', 'Marketing', 'Human Resources', 'Finance', 'Operations'].map((dept, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700 text-lg">{dept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-6 text-xl">Filtering Criteria</h4>
                    <div className="space-y-4">
                      {['Company Size & Revenue', 'Job Title & Seniority', 'Technology Stack', 'Buying Signals', 'Geographic Location', 'Industry Vertical'].map((criteria, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700 text-lg">{criteria}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-2xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-center">Decision-Maker Focus</h3>
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">87%</div>
                  <div className="text-blue-200 text-lg">Director+ Level</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">$1M+</div>
                  <div className="text-blue-200 text-lg">Budget Authority</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">92%</div>
                  <div className="text-blue-200 text-lg">Verified Profiles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Proof of Impact */}
        <section className="py-20 px-16 bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Proof of Impact
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">{stat.stat}</div>
                <div className="font-bold text-gray-800 mb-2 text-lg">{stat.description}</div>
                <div className="text-gray-600">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Client Success Stories */}
        <section className="py-20 px-16 bg-gray-50">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Client Success Stories
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{story.company}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{story.result}</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="font-bold text-blue-900 text-lg">{story.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Trusted By */}
        <section className="py-20 px-16 bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-16 bg-blue-600 rounded-full mr-6"></div>
              Trusted By
            </h2>
            <div className="w-24 h-1 bg-blue-600 ml-8"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-2xl border border-gray-200 shadow-lg">
            <div className="grid grid-cols-6 gap-8 items-center">
              {trustedCompanies.map((company, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                    <Building2 className="w-10 h-10 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="font-bold text-gray-700 group-hover:text-blue-700 transition-colors">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Contact Information */}
        <section className="py-20 px-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 flex items-center">
              <div className="w-2 h-16 bg-white rounded-full mr-6"></div>
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-white ml-8"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8">Ready to Transform Your Pipeline?</h3>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Get in touch with our team to discuss how we can help you generate qualified leads and accelerate your revenue growth.
              </p>
              
              <div className="space-y-6">
                <a href="https://pivotal-b2b.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold block">Website</span>
                    <span className="text-blue-200">pivotal-b2b.com</span>
                  </div>
                  <ExternalLink className="w-5 h-5 ml-auto" />
                </a>
                
                <a href="mailto:contact@pivotal-b2b.com" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold block">Email</span>
                    <span className="text-blue-200">contact@pivotal-b2b.com</span>
                  </div>
                </a>
                
                <a href="tel:+14179003844" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold block">Phone</span>
                    <span className="text-blue-200">+1 417-900-3844</span>
                  </div>
                </a>
                
                <a href="https://linkedin.com/company/pivotalb2b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold block">LinkedIn</span>
                    <span className="text-blue-200">linkedin.com/company/pivotalb2b</span>
                  </div>
                  <ExternalLink className="w-5 h-5 ml-auto" />
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-56 h-56 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-2xl">
                <div className="text-8xl font-bold text-white">PB</div>
              </div>
              <p className="text-2xl text-blue-100 font-semibold tracking-wide">
                Every Lead. Vetted. Qualified. Revenue-Ready.
              </p>
              <div className="mt-6 text-blue-200">
                © {new Date().getFullYear()} Pivotal B2B. All rights reserved.
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}