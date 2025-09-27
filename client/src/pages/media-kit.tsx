import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Download, 
  Check, 
  Users, 
  Target, 
  Zap, 
  Calendar, 
  Database, 
  Heart,
  Mail, 
  FileText, 
  Phone,
  Building, 
  Briefcase, 
  TrendingUp,
  Shield,
  Award,
  Globe,
  ExternalLink
} from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MediaKit() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const sections = contentRef.current.querySelectorAll('section');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        
        const canvas = await html2canvas(section, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          height: section.scrollHeight,
          width: section.scrollWidth
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate scaling to fill A4 page while maintaining aspect ratio
        const canvasAspectRatio = canvas.width / canvas.height;
        const pageAspectRatio = pdfWidth / pdfHeight;
        
        let finalWidth, finalHeight, xOffset, yOffset;
        
        if (canvasAspectRatio > pageAspectRatio) {
          // Canvas is wider relative to its height, fit to width
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
          xOffset = 0;
          yOffset = 0; // Align to top instead of centering
        } else {
          // Canvas is taller relative to its width, fit to height
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
          xOffset = (pdfWidth - finalWidth) / 2;
          yOffset = 0;
        }
        
        // Always start from top of page and fill available space
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      }
      
      pdf.save('Pivotal-B2B-Media-Kit.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const services = [
    {
      title: "Account-Based Marketing (ABM) Programs",
      description: "Engage buying committees inside target accounts before competitors enter the conversation.",
      icon: Target,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "B2B Lead Generation & Qualification",
      description: "Generate and qualify net-new leads that align with your ICP and are ready to convert.",
      icon: Users,
      color: "from-violet-500 to-violet-600"
    },
    {
      title: "Precision Demand Generation",
      description: "Identify in-market accounts, educate buyers, and capture intent at the right moment.",
      icon: Zap,
      color: "from-purple-600 to-violet-600"
    },
    {
      title: "Event Marketing & Audience Acquisition",
      description: "Fill your events with decision-makers who have real budget and authority.",
      icon: Calendar,
      color: "from-violet-600 to-purple-600"
    },
    {
      title: "Lead Validation & Enrichment",
      description: "Clean, validate, and enrich lead data for accuracy, compliance, and conversion-readiness.",
      icon: Database,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Lead Nurturing & Buyer Engagement",
      description: "Keep future buyers engaged until they're ready — turning cold leads into revenue.",
      icon: Heart,
      color: "from-violet-500 to-purple-500"
    }
  ];

  const valuePromises = [
    "Quality Over Quantity – Only real buyers, not browsers",
    "100% Compliant Outreach – GDPR, CCPA & TCPA ready",
    "Lower Cost per Lead – Maximize ROI, reduce acquisition costs",
    "No Long-Term Contracts – Flexibility, zero lock-in"
  ];

  const marketingChannels = [
    {
      title: "Email Marketing",
      description: "Personalized, compliant outreach that drives engagement",
      icon: Mail,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Form Fills & Landing Pages",
      description: "High-intent capture through gated content",
      icon: FileText,
      color: "from-violet-500 to-violet-600"
    },
    {
      title: "Phone Outreach",
      description: "Human-to-human validation and buyer conversations",
      icon: Phone,
      color: "from-purple-600 to-violet-600"
    }
  ];

  const audienceSegments = [
    { title: "Information Technology", icon: Globe },
    { title: "Sales", icon: TrendingUp },
    { title: "Marketing", icon: Target },
    { title: "Human Resources", icon: Users },
    { title: "Finance", icon: Building },
    { title: "Operations", icon: Briefcase },
    { title: "Supply Chain", icon: Database },
    { title: "Customer Success & Support", icon: Heart }
  ];

  const proofPoints = [
    {
      title: "Lead Quality First",
      description: "Every lead vetted for budget, authority, need, and intent",
      icon: Shield
    },
    {
      title: "Pipeline Confidence",
      description: "Opportunities aligned with your ICP and sales priorities",
      icon: TrendingUp
    },
    {
      title: "ROI Focused",
      description: "Lower cost per qualified lead through precision targeting",
      icon: Target
    },
    {
      title: "Trusted Approach",
      description: "Serving growth-driven B2B companies since 2017",
      icon: Award
    }
  ];

  const industries = [
    "Technology", "SaaS", "Finance", "Manufacturing", "Professional Services", "Healthcare"
  ];

  return (
    <div className="min-h-screen bg-white font-['Open_Sans',_sans-serif]">
      <MetaTags
        title="Professional Media Kit | Pivotal B2B - B2B Lead Generation Experts"
        description="Download our comprehensive professional media kit with company information, services, case studies, and brand assets for press and partners."
        keywords="media kit, press kit, brand assets, B2B lead generation, company information, professional services"
      />

      {/* Sticky Header with Download Button */}
      <div className="bg-gradient-to-r from-purple-800 via-violet-800 to-purple-900 shadow-xl border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-white mb-1">Pivotal B2B Media Kit</h1>
              <p className="text-purple-100 text-sm">Professional brand assets and company information</p>
            </div>
            <Button 
              onClick={generatePDF} 
              disabled={isGeneratingPDF}
              className="bg-white text-purple-800 hover:bg-gray-100 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="button-download-pdf"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-800/30 border-t-purple-800 rounded-full animate-spin" />
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
      </div>

      {/* PDF Content */}
      <div ref={contentRef} className="bg-white">
        {/* Section 1: Cover Page */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-gray-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-violet-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl" />
          </div>
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-white font-bold text-4xl">PB2B</span>
              </div>
              
              <h1 className="text-6xl font-bold text-slate-800 mb-6 leading-tight">
                Pivotal B2B
              </h1>
              
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent text-2xl font-semibold mb-8">
                Every Lead. Vetted. Qualified. Revenue-Ready.
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-slate-600">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <a href="https://pivotal-b2b.com" className="hover:text-purple-600 transition-colors">
                    pivotal-b2b.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <a href="mailto:contact@pivotal-b2b.com" className="hover:text-purple-600 transition-colors">
                    contact@pivotal-b2b.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span>+1 417-900-3844</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                  <a href="https://linkedin.com/company/pivotalb2b" className="hover:text-blue-600 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer on cover page */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-500 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 2: About Pivotal B2B */}
        <section className="min-h-screen bg-white p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">About Pivotal B2B</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-8" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Founded in 2017 by Zahid Mohammadi, Pivotal B2B helps companies turn marketing budgets into predictable revenue.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Expertise</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    We specialize in precision-driven B2B lead generation, demand generation, and ABM programs that deliver qualified leads aligned with your ICP.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <Card className="p-8 border-l-4 border-l-blue-600 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-slate-800">Founded</h4>
                      <p className="text-slate-600">2017</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-slate-600 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="w-8 h-8 text-slate-600" />
                    <div>
                      <h4 className="font-bold text-slate-800">Founder & CEO</h4>
                      <p className="text-slate-600">Zahid Mohammadi</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 border-l-4 border-l-blue-600 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-slate-800">Focus Areas</h4>
                      <p className="text-slate-600">Lead Quality, Compliance, Predictable Growth</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 3: Core Value Promises */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">Core Value Promises</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-8" />
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our commitment to delivering exceptional value through quality, compliance, and performance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {valuePromises.map((promise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {promise.split(' – ')[0]}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {promise.split(' – ')[1]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 4: Our Services - Simple Grid Layout */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">Our Services</h2>
              </div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive B2B marketing solutions designed to drive qualified leads and accelerate revenue growth
              </p>
            </div>
            
            {/* Simple responsive grid layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-purple-100">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full" />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 flex justify-between items-center text-sm text-slate-400 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 5: Marketing Channels - Simple Grid Layout */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">Marketing Channels</h2>
              </div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                We use a multi-channel strategy to reach buyers where they are
              </p>
            </div>
            
            {/* Central value proposition */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-br from-purple-600 to-violet-700 rounded-full px-8 py-4 shadow-2xl">
                <span className="text-white font-bold text-lg">Multi-Channel Approach</span>
              </div>
            </div>
            
            {/* Simple responsive grid layout */}
            <div className="grid md:grid-cols-3 gap-8">
              {marketingChannels.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-purple-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight">
                        {channel.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {channel.description}
                      </p>
                      <div className="h-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 flex justify-between items-center text-sm text-slate-400 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 6: Target Audience Reach */}
        <section className="min-h-screen bg-white p-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">Target Audience Reach</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-8" />
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We help you connect with decision-makers across industries and functions
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Capabilities */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Our Capabilities</h3>
                <div className="space-y-6">
                  {[
                    { title: "Company Information", desc: "Size, revenue, growth stage" },
                    { title: "Role & Seniority", desc: "Job titles, departments, authority" },
                    { title: "Technology", desc: "Tech stack & adoption stage" },
                    { title: "Engagement Signals", desc: "Content interactions, event participation, buying intent" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Audience Segments */}
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Audience Segments</h3>
                <div className="grid grid-cols-2 gap-4">
                  {audienceSegments.map((segment, index) => {
                    const IconComponent = segment.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-center group hover:-translate-y-1"
                      >
                        <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                          {segment.title}
                        </h4>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 7: Proof of Impact - Simple Grid Layout */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">Proof of Impact</h2>
              </div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Our commitment to measurable results and client success
              </p>
            </div>
            
            {/* Creative diamond arrangement */}
            <div className="relative flex justify-center items-center min-h-[600px]">
              {/* Center success hub */}
              <div className="absolute z-20 w-48 h-48 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                  <span className="font-bold text-lg">Proven Results</span>
                </div>
              </div>
              
              {/* Connect lines from center to each proof point */}
              <div className="absolute inset-0">
                {/* Top line */}
                <div className="absolute top-20 left-1/2 w-px h-32 bg-gradient-to-b from-blue-300 to-transparent transform -translate-x-px" />
                {/* Right line */}
                <div className="absolute top-1/2 right-20 w-32 h-px bg-gradient-to-l from-blue-300 to-transparent transform -translate-y-px" />
                {/* Bottom line */}
                <div className="absolute bottom-20 left-1/2 w-px h-32 bg-gradient-to-t from-blue-300 to-transparent transform -translate-x-px" />
                {/* Left line */}
                <div className="absolute top-1/2 left-20 w-32 h-px bg-gradient-to-r from-blue-300 to-transparent transform -translate-y-px" />
              </div>
              
              {/* Proof point cards arranged in diamond pattern */}
              {proofPoints.map((point, index) => {
                const IconComponent = point.icon;
                const positions = [
                  { top: '0', left: '50%', transform: 'translate(-50%, 0)' }, // Top
                  { top: '50%', right: '0', transform: 'translate(0, -50%)' }, // Right
                  { bottom: '0', left: '50%', transform: 'translate(-50%, 0)' }, // Bottom
                  { top: '50%', left: '0', transform: 'translate(0, -50%)' } // Left
                ];
                
                return (
                  <div 
                    key={index}
                    className="absolute z-10"
                    style={positions[index]}
                  >
                    <div className="w-72 h-64 bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group relative">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-50/50 rounded-3xl" />
                      
                      <div className="relative z-10 text-center h-full flex flex-col justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight">
                          {point.title}
                        </h3>
                        
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {point.description}
                        </p>
                      </div>
                      
                      {/* Accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-slate-600 rounded-b-3xl" />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Value proposition at bottom */}
            <div className="mt-32 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">The Pivotal Difference</h3>
                <p className="text-blue-100 text-lg leading-relaxed max-w-3xl mx-auto">
                  We don't just generate leads — we deliver revenue-ready prospects that fit your ideal customer profile, backed by data-driven insights and proven methodologies.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 flex justify-between items-center text-sm text-slate-400 border-t border-slate-200 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-slate-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 8: Trusted By */}
        <section className="min-h-screen bg-white p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">Trusted By</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-600 mx-auto mb-8" />
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Trusted by leading B2B teams across multiple industries
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-8">Industry Focus</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border border-slate-100"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {industry}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-12 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Serving Growth-Driven B2B Companies Since 2017
                </h3>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  From emerging startups to established enterprises, we help companies across technology, SaaS, finance, manufacturing, and professional services achieve their growth objectives through precision B2B marketing.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 9: Contact Information */}
        <section className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 p-16 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Contact Us</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto mb-8" />
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Ready to transform your B2B marketing? Let's start a conversation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="text-center md:text-left">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                    <span className="text-slate-800 font-bold text-2xl">PB2B</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Every Lead. Vetted. Qualified. Revenue-Ready.
                  </h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Website</h4>
                        <a href="https://pivotal-b2b.com" className="text-blue-200 hover:text-white transition-colors">
                          pivotal-b2b.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Email</h4>
                        <a href="mailto:contact@pivotal-b2b.com" className="text-blue-200 hover:text-white transition-colors">
                          contact@pivotal-b2b.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Phone</h4>
                        <span className="text-blue-200">+1 417-900-3844</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">LinkedIn</h4>
                        <a href="https://linkedin.com/company/pivotalb2b" className="text-blue-200 hover:text-white transition-colors">
                          linkedin.com/company/pivotalb2b
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-blue-200 border-t border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded text-slate-800 text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B Media Kit</span>
            </div>
            <span>© 2024 Pivotal B2B. All rights reserved.</span>
          </div>
        </section>
      </div>
    </div>
  );
}