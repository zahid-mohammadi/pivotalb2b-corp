import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, Check, Target, Users, TrendingUp, Rocket, Sparkles, Shield,
  Building2, UserCheck, DollarSign, Award, Globe, Mail, Phone, Linkedin,
  ExternalLink, Calendar, Star, CheckCircle2, BarChart3, Send, FileText,
  Heart, Zap
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
        title: "Generating Professional Media Kit",
        description: "Creating your high-resolution media kit with proper page breaks...",
        duration: 6000,
      });

      // Get all page sections
      const pageElements = document.querySelectorAll('.pdf-page');
      if (!pageElements.length) return;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Process each page separately for proper pagination
      for (let i = 0; i < pageElements.length; i++) {
        const element = pageElements[i] as HTMLElement;
        
        // Add page break except for first page
        if (i > 0) {
          pdf.addPage();
        }

        // Generate canvas for this page only
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: element.offsetWidth,
          height: element.offsetHeight,
          logging: false,
          allowTaint: true
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Calculate dimensions to fit page properly
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // If content is too tall, scale it down to fit
        if (imgHeight > pdfHeight) {
          const scale = pdfHeight / imgHeight;
          const scaledWidth = imgWidth * scale;
          const scaledHeight = pdfHeight;
          const xOffset = (pdfWidth - scaledWidth) / 2;
          pdf.addImage(imgData, 'PNG', xOffset, 0, scaledWidth, scaledHeight);
        } else {
          // Center content vertically if it's shorter than page
          const yOffset = (pdfHeight - imgHeight) / 2;
          pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        }
      }

      pdf.save('Pivotal-B2B-Professional-Media-Kit.pdf');
      
      toast({
        title: "Download Complete!",
        description: "Your professional media kit has been downloaded successfully.",
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
      description: "We focus on delivering high-value leads that align with your ideal customer profile rather than overwhelming you with unqualified prospects",
      icon: Target,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "100% Compliant Outreach",
      description: "All our outreach activities strictly follow CAN-SPAM, GDPR, and industry best practices to protect your brand reputation",
      icon: Shield,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Lower Cost per Lead",
      description: "Our proven methodologies and targeting strategies deliver superior ROI and reduce your overall customer acquisition costs",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "No Long-Term Contracts, Zero Lock-In",
      description: "Partner with confidence knowing you can adjust or pause services at any time without penalties or long-term commitments",
      icon: Award,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const successStories = [
    {
      company: "TechFlow Solutions",
      result: "+180 qualified prospects in 90 days",
      impact: "$2.4M pipeline added",
      improvement: "340% ROI increase"
    },
    {
      company: "DataCore Systems",
      result: "Cost per acquisition down 60%",
      impact: "340% ROI improvement",
      improvement: "87% lead quality boost"
    },
    {
      company: "CloudScale Industries",
      result: "Close rate jumped from 8% to 31%",
      impact: "Fully pre-qualified leads delivered",
      improvement: "288% conversion increase"
    }
  ];

  const impactStats = [
    {
      stat: "3x",
      description: "Higher Lead Quality",
      subtext: "compared to traditional providers",
      icon: Target,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      stat: "90 Days",
      description: "Guaranteed Pipeline Growth",
      subtext: "measurable results in 3 months",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600"
    },
    {
      stat: "87%",
      description: "Client Retention Rate",
      subtext: "long-term partnerships",
      icon: Heart,
      color: "from-rose-500 to-rose-600"
    },
    {
      stat: "135M+",
      description: "Professional Profiles",
      subtext: "across all major industries",
      icon: Globe,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const trustedCompanies = [
    "Microsoft", "Salesforce", "HubSpot", "Oracle", "AWS", "Google"
  ];

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
              onClick={generatePDF} 
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

      {/* PDF Content - Each section is a separate page */}
      <div className="pdf-content">
        
        {/* Page 1: Cover Page */}
        <div className="pdf-page min-h-screen flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center relative z-10"
          >
            {/* Logo */}
            <div className="mb-12">
              <img 
                src="/logo.png" 
                alt="Pivotal B2B Logo" 
                className="h-32 mx-auto mb-8 drop-shadow-2xl"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="w-32 h-1 bg-white mx-auto rounded-full"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Pivotal B2B
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light mb-12 text-blue-100 leading-relaxed max-w-3xl">
              Every Lead. Vetted. Qualified. Revenue-Ready.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <Globe className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <p className="font-semibold text-lg">pivotal-b2b.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <Mail className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <p className="font-semibold text-lg">contact@pivotal-b2b.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <Phone className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <p className="font-semibold text-lg">+1 417-900-3844</p>
              </div>
            </div>

            <div className="text-sm text-blue-200">
              Professional Media Kit • {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>

        {/* Page 2: About Pivotal B2B */}
        <div className="pdf-page min-h-screen bg-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">About Pivotal B2B</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transforming B2B marketing from a cost center into a predictable revenue engine
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    Founded in 2017 by Zahid Mohammadi, Pivotal B2B helps companies transform marketing budgets into predictable revenue. We specialize in precision-driven B2B lead generation and demand generation services that guarantee qualified leads aligned with your ICP.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                    <div className="font-bold text-gray-900 text-lg mb-1">Founded</div>
                    <div className="text-gray-700">2017</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <Users className="w-8 h-8 text-purple-600 mb-3" />
                    <div className="font-bold text-gray-900 text-lg mb-1">Founder & CEO</div>
                    <div className="text-gray-700">Zahid Mohammadi</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-3xl text-white shadow-2xl">
                <Star className="w-12 h-12 text-yellow-300 mb-6" />
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl leading-relaxed text-blue-100 mb-8">
                  To transform B2B marketing from a cost center into a predictable revenue engine through precision targeting, compliant outreach, and qualified lead delivery.
                </p>
                <div className="flex items-center gap-4 text-blue-100">
                  <Zap className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold">Accelerating B2B Success Since 2017</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3: Our Commitment to You */}
        <div className="pdf-page min-h-screen bg-gradient-to-br from-gray-50 to-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We deliver qualified B2B leads through proven demand generation services and ABM programs that accelerate B2B pipeline growth and transform your marketing investment into predictable revenue
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {valuePromises.map((promise, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${promise.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <promise.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {promise.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {promise.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 4: Services Overview */}
        <div className="pdf-page min-h-screen bg-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive B2B marketing solutions designed to accelerate your revenue growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 5: Target Audience Reach */}
        <div className="pdf-page min-h-screen bg-gradient-to-br from-blue-50 to-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Target Audience Reach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Access to decision-makers across all major industries and company sizes
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <Globe className="w-12 h-12 text-blue-600" />
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900">135M+</h3>
                      <p className="text-xl text-gray-600">Professional Profiles</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        Key Departments
                      </h4>
                      <div className="space-y-4">
                        {['IT & Technology', 'Sales & Business Development', 'Marketing & Communications', 'Human Resources', 'Finance & Accounting', 'Operations & Supply Chain'].map((dept, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{dept}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2">
                        <Target className="w-6 h-6 text-green-600" />
                        Targeting Criteria
                      </h4>
                      <div className="space-y-4">
                        {['Company Size & Revenue', 'Job Title & Seniority Level', 'Technology Stack & Tools', 'Buying Signals & Intent', 'Geographic Location', 'Industry Vertical & Niche'].map((criteria, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{criteria}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-3xl text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 text-center">Decision-Maker Focus</h3>
                <div className="space-y-8">
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="text-5xl font-bold mb-2">87%</div>
                    <div className="text-blue-200 text-lg">Director+ Level</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="text-5xl font-bold mb-2">$1M+</div>
                    <div className="text-blue-200 text-lg">Budget Authority</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="text-5xl font-bold mb-2">92%</div>
                    <div className="text-blue-200 text-lg">Verified Profiles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 6: Proof of Impact */}
        <div className="pdf-page min-h-screen bg-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Proof of Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Measurable results that demonstrate our commitment to your success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">{stat.stat}</div>
                  <div className="font-bold text-gray-800 mb-2 text-lg">{stat.description}</div>
                  <div className="text-gray-600 text-sm">{stat.subtext}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-3xl text-white text-center shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Pipeline?</h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join hundreds of B2B companies that trust Pivotal B2B to deliver qualified leads and accelerate revenue growth.
              </p>
            </div>
          </div>
        </div>

        {/* Page 7: Client Success Stories */}
        <div className="pdf-page min-h-screen bg-gradient-to-br from-gray-50 to-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Client Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real results from real companies who transformed their lead generation with Pivotal B2B
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.company}</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Key Result</p>
                          <p className="text-gray-700">{story.result}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-4 rounded-2xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Business Impact</p>
                          <p className="text-blue-900 font-bold">{story.impact}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-50 p-4 rounded-2xl border border-purple-200">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Overall Improvement</p>
                          <p className="text-purple-700 font-medium">{story.improvement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 8: Trusted By */}
        <div className="pdf-page min-h-screen bg-white p-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Trusted By Industry Leaders</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join the companies that rely on Pivotal B2B for their lead generation and demand generation success
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-3xl border border-gray-200 shadow-xl mb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {trustedCompanies.map((company, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      <Building2 className="w-10 h-10 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    </div>
                    <div className="font-bold text-gray-700 group-hover:text-blue-700 transition-colors duration-300 text-lg">
                      {company}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-600 to-purple-600 p-12 rounded-3xl text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Ready to Join Them?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Discover how Pivotal B2B can transform your lead generation and drive predictable revenue growth for your business.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Send className="w-8 h-8 text-blue-200" />
                <span className="text-2xl font-semibold">Let's Start the Conversation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page 9: Contact Information */}
        <div className="pdf-page min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20m20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full"></div>
              <h2 className="text-5xl font-bold mb-6">Let's Connect</h2>
              <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your B2B marketing? Get in touch with our team to start your journey to predictable revenue growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold mb-8">Get Started Today</h3>
                <p className="text-xl text-blue-100 leading-relaxed mb-12">
                  Schedule a consultation to discuss your specific needs and learn how we can help you generate qualified leads, accelerate pipeline growth, and achieve predictable revenue.
                </p>
                
                <div className="space-y-6">
                  <a href="https://pivotal-b2b.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-xl">Website</div>
                      <div className="text-blue-200">pivotal-b2b.com</div>
                    </div>
                    <ExternalLink className="w-5 h-5 ml-auto" />
                  </a>
                  
                  <a href="mailto:contact@pivotal-b2b.com" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-xl">Email</div>
                      <div className="text-blue-200">contact@pivotal-b2b.com</div>
                    </div>
                  </a>
                  
                  <a href="tel:+14179003844" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-xl">Phone</div>
                      <div className="text-blue-200">+1 417-900-3844</div>
                    </div>
                  </a>
                  
                  <a href="https://linkedin.com/company/pivotalb2b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors text-lg group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-xl">LinkedIn</div>
                      <div className="text-blue-200">linkedin.com/company/pivotalb2b</div>
                    </div>
                    <ExternalLink className="w-5 h-5 ml-auto" />
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
                  <img 
                    src="/logo.png" 
                    alt="Pivotal B2B Logo" 
                    className="h-32 mx-auto mb-8"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <h4 className="text-3xl font-bold mb-4">Every Lead.</h4>
                  <h4 className="text-3xl font-bold mb-4">Vetted. Qualified.</h4>
                  <h4 className="text-3xl font-bold mb-8">Revenue-Ready.</h4>
                  <div className="text-blue-200 text-lg">
                    © {new Date().getFullYear()} Pivotal B2B. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}