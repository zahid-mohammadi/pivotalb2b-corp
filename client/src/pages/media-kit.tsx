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
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Capture the entire content container once
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: contentRef.current.scrollHeight,
        width: contentRef.current.scrollWidth
      });
      
      // Calculate mm-per-pixel ratio and page dimensions in pixels
      const mmPerPixel = pdfWidth / canvas.width;
      const pageHeightPx = pdfHeight / mmPerPixel;
      const pageWidthPx = pdfWidth / mmPerPixel;
      
      // Calculate number of pages needed
      const totalPages = Math.ceil(canvas.height / pageHeightPx);
      
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        // Create a canvas for this page slice
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = pageWidthPx;
        sliceCanvas.height = pageHeightPx;
        const sliceCtx = sliceCanvas.getContext('2d');
        
        if (sliceCtx) {
          // Fill with white background
          sliceCtx.fillStyle = '#ffffff';
          sliceCtx.fillRect(0, 0, pageWidthPx, pageHeightPx);
          
          // Calculate source rectangle for this slice
          const sourceY = pageIndex * pageHeightPx;
          const remainingHeight = Math.min(pageHeightPx, canvas.height - sourceY);
          
          // Draw the slice from the main canvas
          sliceCtx.drawImage(
            canvas,
            0, sourceY, // source x, y
            canvas.width, remainingHeight, // source width, height
            0, 0, // destination x, y
            pageWidthPx, remainingHeight // destination width, height
          );
          
          // Convert slice to image and add to PDF at full A4 dimensions
          const sliceImgData = sliceCanvas.toDataURL('image/png');
          pdf.addImage(sliceImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }
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
        <section className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary gradient orbs */}
            <motion.div 
              className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-violet-500/20 rounded-full blur-3xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{ 
                x: [0, -25, 0],
                y: [0, 15, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-2xl"
              animate={{ 
                x: [0, 20, 0],
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating geometric particles */}
            <motion.div 
              className="absolute top-40 right-1/3 w-6 h-6 bg-purple-500/40 rotate-45"
              animate={{ 
                y: [0, -30, 0],
                rotate: [45, 225, 405]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-40 left-1/4 w-4 h-4 bg-violet-500/50 rounded-full"
              animate={{ 
                y: [0, 25, 0],
                x: [0, 15, 0]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-500/60"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }} />
            </div>
          </div>
          
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-16"
            >
              {/* Enhanced Logo */}
              <motion.div 
                className="w-40 h-40 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl relative group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-white font-bold text-5xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  PB2B
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              
              {/* Enhanced Typography */}
              <motion.h1 
                className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Pivotal B2B
              </motion.h1>
              
              <motion.div 
                className="relative mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  Every Lead. Vetted. Qualified.
                </div>
                <motion.div 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Revenue-Ready.
                </motion.div>
                
                {/* Accent line */}
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto mt-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.div>
              
              {/* Enhanced Contact Grid */}
              <motion.div 
                className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {[
                  { icon: Globe, text: "pivotal-b2b.com", href: "https://pivotal-b2b.com", color: "text-purple-600" },
                  { icon: Mail, text: "contact@pivotal-b2b.com", href: "mailto:contact@pivotal-b2b.com", color: "text-violet-600" },
                  { icon: Phone, text: "+1 417-900-3844", href: "tel:+14179003844", color: "text-indigo-600" },
                  { icon: ExternalLink, text: "LinkedIn", href: "https://linkedin.com/company/pivotalb2b", color: "text-blue-600" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-white/90"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <div className={`w-12 h-12 ${item.color} bg-gradient-to-br from-white to-gray-50 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <a href={item.href} className={`${item.color} hover:opacity-80 transition-opacity font-medium text-lg`}>
                        {item.text}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Footer on cover page */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-500 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 2: About Pivotal B2B */}
        <section className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 p-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-violet-200/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 20, 0]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-10 w-48 h-48 bg-gradient-to-br from-violet-200/20 to-indigo-200/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.8, 1],
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-4 mb-8">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  About Pivotal B2B
                </h2>
              </div>
              <motion.div 
                className="w-40 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mx-auto rounded-full shadow-lg"
                initial={{ width: 0 }}
                whileInView={{ width: 160 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Left side - Mission & Expertise with more creative design */}
              <div className="lg:col-span-3 space-y-10">
                <motion.div 
                  className="relative bg-gradient-to-br from-white via-purple-50/50 to-violet-50/50 p-10 rounded-3xl shadow-2xl border border-purple-100/50 backdrop-blur-sm group hover:shadow-3xl transition-all duration-500"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent mb-6">Our Mission</h3>
                    <p className="text-slate-700 leading-relaxed text-xl font-medium">
                      Founded in 2017 by <span className="font-bold text-purple-700">Zahid Mohammadi</span>, Pivotal B2B helps companies turn marketing budgets into predictable revenue.
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-purple-600 font-semibold">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                      <span>Transforming B2B Marketing Since 2017</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative bg-gradient-to-br from-white via-violet-50/50 to-purple-50/50 p-10 rounded-3xl shadow-2xl border border-violet-100/50 backdrop-blur-sm group hover:shadow-3xl transition-all duration-500"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="mr-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent mb-6">Our Expertise</h3>
                    <p className="text-slate-700 leading-relaxed text-xl font-medium mb-6">
                      We specialize in precision-driven B2B lead generation, demand generation, and ABM programs that deliver qualified leads aligned with your ICP.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['Lead Generation', 'Demand Generation', 'ABM Programs'].map((tag, index) => (
                        <motion.span 
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-200"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right side - Company Facts with creative cards */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Company Highlights</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
                </motion.div>

                {[
                  { icon: Calendar, title: "Founded", value: "2017", color: "from-blue-500 to-blue-600", delay: 0.4 },
                  { icon: Users, title: "Founder & CEO", value: "Zahid Mohammadi", color: "from-purple-500 to-purple-600", delay: 0.5 },
                  { icon: Target, title: "Focus Areas", value: "Lead Quality, Compliance, Predictable Growth", color: "from-violet-500 to-violet-600", delay: 0.6 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30, rotate: -5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, rotate: 2 }}
                  >
                    <Card className="p-8 bg-gradient-to-br from-white to-gray-50/50 shadow-xl border-0 rounded-2xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                            <p className="text-slate-600 font-medium leading-relaxed">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                
                {/* Add a special highlight card */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white rounded-2xl shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Award className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2">7+ Years</h4>
                      <p className="text-purple-100 font-medium">of B2B Marketing Excellence</p>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 3: Core Value Promises */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">Core Value Promises</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
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
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
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
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
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
        <section className="bg-white p-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-bold text-slate-800 mb-6">Target Audience Reach</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We help you connect with decision-makers across industries and functions
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Capabilities */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Capabilities</h3>
                <div className="space-y-4">
                  {[
                    { title: "Company Information", desc: "Size, revenue, growth stage" },
                    { title: "Role & Seniority", desc: "Job titles, departments, authority" },
                    { title: "Technology", desc: "Tech stack & adoption stage" },
                    { title: "Engagement Signals", desc: "Content interactions, event participation, buying intent" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                      <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
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
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Audience Segments</h3>
                <div className="grid grid-cols-2 gap-4">
                  {audienceSegments.map((segment, index) => {
                    const IconComponent = segment.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow text-center group"
                      >
                        <IconComponent className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
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
          <div className="mt-8 pt-6 flex justify-between items-center text-sm text-slate-400 border-t">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
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
            
            {/* Central value proposition */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-br from-purple-600 to-violet-700 rounded-full px-8 py-4 shadow-2xl">
                <div className="flex items-center gap-3 text-white">
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-lg">Proven Results</span>
                </div>
              </div>
            </div>
            
            {/* Simple responsive grid layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {proofPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-purple-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight">
                        {point.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {point.description}
                      </p>
                      <div className="h-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Value proposition at bottom */}
            <div className="mt-32 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">The Pivotal Difference</h3>
                <p className="text-purple-100 text-lg leading-relaxed max-w-3xl mx-auto">
                  We don't just generate leads — we deliver revenue-ready prospects that fit your ideal customer profile, backed by data-driven insights and proven methodologies.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 flex justify-between items-center text-sm text-slate-400 border-t border-slate-200 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 8: Trusted By */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">Trusted By</h2>
              </div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Trusted by leading B2B teams across multiple industries
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="text-center">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-purple-100 mb-16">
                  <div className="inline-flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">Industry Focus</h3>
                  </div>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {industries.map((industry, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border border-purple-100"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                          {industry}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-12 rounded-3xl text-center shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
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
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span>Pivotal B2B</span>
            </div>
            <span>contact@pivotal-b2b.com | +1 417-900-3844</span>
          </div>
        </section>

        {/* Section 9: Contact Information */}
        <section className="min-h-screen bg-gradient-to-br from-slate-800 via-purple-800 to-violet-900 p-16 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Contact Us</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 via-violet-400 to-white mx-auto mb-8 rounded-full shadow-lg" />
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
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
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
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
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
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