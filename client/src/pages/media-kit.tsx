import { useState, useRef, useEffect } from "react";
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
  ExternalLink,
  BarChart,
  CheckCircle
} from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Counter Animation Component
interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

const CounterAnimation = ({ target, suffix = "", duration = 2, delay = 0, className }: CounterAnimationProps) => {
  const [current, setCurrent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    const increment = target / (duration * 60); // 60fps
    let currentValue = 0;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(currentValue));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className}>
      {current.toLocaleString()}{suffix}
    </div>
  );
};

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
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-16 relative overflow-hidden">
          {/* Dynamic background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/10 to-violet-300/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-violet-300/15 to-indigo-300/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.7, 1],
                x: [0, 50, 0]
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Geometric accent shapes */}
            <motion.div 
              className="absolute top-1/3 right-10 w-8 h-8 bg-purple-400/30 rotate-45"
              animate={{ 
                y: [0, -40, 0],
                rotate: [45, 405, 45]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-10 w-6 h-6 bg-violet-400/40 rounded-full"
              animate={{ 
                x: [0, 30, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 10,
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
                  className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl flex items-center justify-center shadow-2xl relative group"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <h2 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  Core Value Promises
                </h2>
              </div>
              <motion.div 
                className="w-48 h-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mx-auto rounded-full shadow-lg mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 192 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Our commitment to delivering exceptional value through quality, compliance, and performance
              </motion.p>
            </motion.div>
            
            {/* Enhanced promise cards in asymmetric layout */}
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
              {valuePromises.map((promise, index) => {
                const titlePart = promise.split(' – ')[0];
                const descriptionPart = promise.split(' – ')[1];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                    whileHover={{ y: -12, rotate: index % 2 === 0 ? 2 : -2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-violet-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-100/50 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/50 to-violet-100/50 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-violet-100/50 to-indigo-100/50 rounded-full blur-xl" />
                      
                      <div className="relative z-10 flex items-start gap-6">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow relative"
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Check className="w-8 h-8 text-white" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <motion.h3 
                            className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-4 leading-tight"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                            viewport={{ once: true }}
                          >
                            {titlePart}
                          </motion.h3>
                          <motion.p 
                            className="text-slate-600 leading-relaxed text-lg font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                            viewport={{ once: true }}
                          >
                            {descriptionPart}
                          </motion.p>
                          
                          {/* Progress indicator */}
                          <motion.div 
                            className="mt-6 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full shadow-sm"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Central call-to-action */}
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-10 rounded-3xl shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Award className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Our Guarantee</h3>
                  <p className="text-purple-100 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Every promise backed by proven methodologies and a track record of success since 2017
                  </p>
                </div>
              </div>
            </motion.div>
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

        {/* Section 4: Our Services - Enhanced Creative Layout */}
        <section className="min-h-screen bg-gradient-to-br from-white via-purple-50/40 to-violet-50/40 p-16 relative overflow-hidden">
          {/* Enhanced background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/15 to-violet-200/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.4, 1],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-200/20 to-indigo-200/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.8, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 28,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating service icons */}
            <motion.div 
              className="absolute top-20 right-20 w-12 h-12 bg-purple-300/20 rounded-full flex items-center justify-center"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Target className="w-6 h-6 text-purple-500/60" />
            </motion.div>
            <motion.div 
              className="absolute bottom-20 left-20 w-10 h-10 bg-violet-300/20 rounded-full flex items-center justify-center"
              animate={{ 
                x: [0, 25, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Users className="w-5 h-5 text-violet-500/60" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-6 mb-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl flex items-center justify-center shadow-2xl relative group"
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.4 }}
                >
                  <Briefcase className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
                <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  Our Services
                </h2>
              </div>
              <motion.div 
                className="w-52 h-2 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mx-auto rounded-full shadow-lg mb-10"
                initial={{ width: 0 }}
                whileInView={{ width: 208 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Comprehensive B2B marketing solutions designed to drive qualified leads and accelerate revenue growth
              </motion.p>
            </motion.div>
            
            {/* Enhanced services grid with creative layouts */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isLargeCard = index === 0 || index === 3; // Make certain cards more prominent
                
                return (
                  <motion.div
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      y: 60,
                      rotate: index % 2 === 0 ? -2 : 2,
                      scale: 0.95
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      rotate: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className={`group relative ${
                      isLargeCard ? 'md:col-span-2 xl:col-span-1' : ''
                    }`}
                    whileHover={{ 
                      y: -15, 
                      rotate: index % 2 === 0 ? 3 : -3,
                      scale: 1.02
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-violet-200/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100/60 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      {/* Background decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-violet-100/40 rounded-full blur-3xl opacity-60" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-violet-100/50 to-indigo-100/50 rounded-full blur-2xl opacity-50" />
                      
                      <div className="relative z-10 p-8 lg:p-10">
                        {/* Enhanced icon design */}
                        <div className="mb-8">
                          <motion.div 
                            className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center shadow-xl relative group-hover:shadow-2xl transition-shadow mb-6`}
                            whileHover={{ 
                              rotate: 360,
                              scale: 1.15 
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                            <motion.div 
                              className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                          
                          <motion.h3 
                            className={`${
                              isLargeCard ? 'text-2xl' : 'text-xl'
                            } font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-4 leading-tight`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                            viewport={{ once: true }}
                          >
                            {service.title}
                          </motion.h3>
                        </div>
                        
                        <motion.p 
                          className={`text-slate-600 leading-relaxed ${
                            isLargeCard ? 'text-lg' : 'text-base'
                          } font-medium mb-8`}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                          viewport={{ once: true }}
                        >
                          {service.description}
                        </motion.p>
                        
                        {/* Interactive progress bar */}
                        <motion.div 
                          className="relative h-2 bg-gray-100 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className={`h-full bg-gradient-to-r ${service.color} rounded-full shadow-sm`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.1 + 0.8,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          />
                          <motion.div 
                            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                        
                        {/* Service number badge */}
                        <motion.div 
                          className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-200/50"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1 + 0.2,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                        >
                          <span className="text-sm font-bold text-purple-700">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Call-to-action section */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-12 rounded-4xl shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your B2B Marketing?</h3>
                  <p className="text-purple-100 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                    Discover how our precision-driven approach can turn your marketing budget into predictable revenue growth
                  </p>
                </div>
              </div>
            </motion.div>
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

        {/* Section 5: Marketing Channels - Enhanced Interactive Layout */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-16 relative overflow-hidden">
          {/* Dynamic background flow */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Flowing lines representing channel connections */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <motion.path
                d="M0,500 Q250,300 500,400 T1000,300"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M0,400 Q250,600 500,500 T1000,600"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, delay: 1 }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Floating channel icons */}
            <motion.div 
              className="absolute top-32 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Mail className="w-8 h-8 text-purple-500/60" />
            </motion.div>
            <motion.div 
              className="absolute bottom-32 right-1/4 w-14 h-14 bg-violet-200/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                y: [0, 20, 0],
                x: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Phone className="w-7 h-7 text-violet-500/60" />
            </motion.div>
            
            {/* Data flow particles */}
            <motion.div 
              className="absolute top-1/2 left-10 w-3 h-3 bg-purple-400/40 rounded-full"
              animate={{ 
                x: [0, 300, 600, 900],
                y: [0, -50, 50, 0],
                scale: [1, 1.5, 1, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-10 w-2 h-2 bg-violet-400/50 rounded-full"
              animate={{ 
                x: [0, -250, -500, -750],
                y: [0, 30, -30, 0],
                scale: [1, 1.3, 1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
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
              <div className="inline-flex items-center gap-6 mb-10">
                <motion.div 
                  className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl flex items-center justify-center shadow-2xl group"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  <TrendingUp className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  
                  {/* Pulsing rings */}
                  <motion.div 
                    className="absolute -inset-4 border-2 border-purple-300/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -inset-8 border border-violet-300/20 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
                <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  Marketing Channels
                </h2>
              </div>
              <motion.div 
                className="w-56 h-2 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mx-auto rounded-full shadow-lg mb-10"
                initial={{ width: 0 }}
                whileInView={{ width: 224 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                We use a precision multi-channel strategy to reach buyers exactly where they are
              </motion.p>
            </motion.div>
            
            {/* Central flow visualization */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block">
                <motion.div 
                  className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-full px-12 py-6 shadow-2xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%']
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <span className="text-white font-bold text-xl">Multi-Channel Precision Targeting</span>
                  </div>
                </motion.div>
                
                {/* Connection lines to channels */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
                  <svg width="400" height="120" className="opacity-20">
                    <motion.path
                      d="M200,0 L80,100"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1 }}
                      viewport={{ once: true }}
                    />
                    <motion.path
                      d="M200,0 L200,100"
                      stroke="#a855f7"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      viewport={{ once: true }}
                    />
                    <motion.path
                      d="M200,0 L320,100"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.4 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced channel cards with flow design */}
            <div className="grid md:grid-cols-3 gap-10 lg:gap-12 mt-16">
              {marketingChannels.map((channel, index) => {
                const IconComponent = channel.icon;
                const isCenter = index === 1;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      y: 80,
                      scale: 0.9,
                      rotate: isCenter ? 0 : (index === 0 ? -5 : 5)
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2 + 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                    whileHover={{ 
                      y: -20, 
                      scale: 1.03,
                      rotate: isCenter ? 0 : (index === 0 ? 3 : -3)
                    }}
                  >
                    {/* Connection flow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-violet-200/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className={`relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border group-hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                      isCenter ? 'border-purple-200/80 shadow-purple-100/50' : 'border-purple-100/60'
                    }`}>
                      {/* Enhanced background decorations */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-violet-100/40 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-violet-100/50 to-indigo-100/50 rounded-full blur-2xl" />
                      
                      {/* Data flow visualization */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.div 
                          className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ 
                            x: [0, 100, 200],
                            y: [0, 50, 100],
                            scale: [1, 1.5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div 
                          className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-violet-400 rounded-full"
                          animate={{ 
                            x: [0, -80, -160],
                            y: [0, -30, -60],
                            scale: [1, 1.3, 0]
                          }}
                          transition={{ 
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                      </div>
                      
                      <div className="relative z-10 p-10 text-center">
                        {/* Enhanced icon with pulse effect */}
                        <div className="mb-8">
                          <motion.div 
                            className={`w-20 h-20 bg-gradient-to-br ${channel.color} rounded-3xl flex items-center justify-center mx-auto shadow-xl relative group-hover:shadow-2xl transition-shadow mb-6`}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: 360
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                            
                            {/* Pulse rings */}
                            <motion.div 
                              className="absolute -inset-2 border-2 border-purple-300/30 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>
                          
                          <motion.h3 
                            className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-4 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                            viewport={{ once: true }}
                          >
                            {channel.title}
                          </motion.h3>
                        </div>
                        
                        <motion.p 
                          className="text-slate-600 leading-relaxed text-lg font-medium mb-8"
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 1.2 }}
                          viewport={{ once: true }}
                        >
                          {channel.description}
                        </motion.p>
                        
                        {/* Interactive channel strength indicator */}
                        <motion.div 
                          className="relative h-2 bg-gray-100 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + 1.4 }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className={`h-full bg-gradient-to-r ${channel.color} rounded-full shadow-sm relative`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ 
                              duration: 2, 
                              delay: index * 0.2 + 1.6,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.div 
                              className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              animate={{ x: ['-100%', '300%'] }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                          </motion.div>
                        </motion.div>
                        
                        {/* Channel effectiveness badge */}
                        <motion.div 
                          className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full backdrop-blur-sm border border-purple-200/50"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.2 + 0.8,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-xs font-bold text-purple-700">
                            High Impact
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Results showcase */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-12 rounded-4xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)'
                    ]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Database className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white mb-6">Integrated Channel Intelligence</h3>
                  <p className="text-purple-100 text-xl font-medium max-w-4xl mx-auto leading-relaxed">
                    Every channel works in harmony, delivering consistent messaging and maximizing touchpoint effectiveness for higher conversion rates
                  </p>
                </div>
              </div>
            </motion.div>
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

        {/* Section 6: Target Audience Reach - Enhanced Data Visualization */}
        <section className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-purple-50/30 p-16 relative overflow-hidden">
          {/* Data visualization background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Network connection visualization */}
            <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600">
              {/* Network nodes */}
              <motion.circle cx="150" cy="150" r="4" fill="#8b5cf6"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              />
              <motion.circle cx="650" cy="200" r="3" fill="#a855f7"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.circle cx="400" cy="100" r="5" fill="#8b5cf6"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
              />
              <motion.circle cx="200" cy="400" r="3" fill="#a855f7"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle cx="600" cy="450" r="4" fill="#8b5cf6"
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
              />
              
              {/* Connection lines */}
              <motion.path d="M150,150 Q300,50 400,100" stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path d="M400,100 Q550,150 650,200" stroke="#a855f7" strokeWidth="1" fill="none" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.path d="M150,150 Q175,275 200,400" stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </svg>
            
            {/* Floating data points */}
            <motion.div 
              className="absolute top-20 right-20 w-12 h-12 bg-purple-200/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Users className="w-6 h-6 text-purple-500/60" />
            </motion.div>
            <motion.div 
              className="absolute bottom-32 left-20 w-10 h-10 bg-violet-200/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                x: [0, 40, 0],
                y: [0, -20, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Database className="w-5 h-5 text-violet-500/60" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-6 mb-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl flex items-center justify-center shadow-2xl relative group"
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.4 }}
                >
                  <Target className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  
                  {/* Data flow rings */}
                  <motion.div 
                    className="absolute -inset-3 border-2 border-purple-300/20 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -inset-6 border border-violet-300/15 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
                <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  Target Audience Reach
                </h2>
              </div>
              <motion.div 
                className="w-60 h-2 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 mx-auto rounded-full shadow-lg mb-10"
                initial={{ width: 0 }}
                whileInView={{ width: 240 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                We help you connect with decision-makers across industries and functions using precision targeting
              </motion.p>
            </motion.div>
            
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Enhanced Capabilities Section */}
              <div className="lg:col-span-3 space-y-8">
                <motion.div 
                  className="text-center lg:text-left mb-10"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Database className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
                      Our Targeting Capabilities
                    </h3>
                  </div>
                  <motion.div 
                    className="w-24 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </motion.div>

                <div className="space-y-6">
                  {[
                    { 
                      title: "Company Intelligence", 
                      desc: "Size, revenue, growth stage, tech stack",
                      icon: Building,
                      color: "from-blue-500 to-blue-600",
                      percentage: 95
                    },
                    { 
                      title: "Role & Authority Mapping", 
                      desc: "Job titles, departments, decision-making power",
                      icon: Users,
                      color: "from-purple-500 to-purple-600",
                      percentage: 92
                    },
                    { 
                      title: "Technology Profiling", 
                      desc: "Current tech stack & adoption readiness",
                      icon: Globe,
                      color: "from-violet-500 to-violet-600",
                      percentage: 88
                    },
                    { 
                      title: "Behavioral Signals", 
                      desc: "Content engagement, event participation, buying intent",
                      icon: TrendingUp,
                      color: "from-indigo-500 to-indigo-600",
                      percentage: 90
                    }
                  ].map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50, rotate: -2 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      className="group relative"
                      whileHover={{ y: -5, rotate: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-violet-100/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100/50 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/30 to-violet-100/30 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-violet-100/40 to-indigo-100/40 rounded-full blur-xl" />
                        
                        <div className="relative z-10 flex items-start gap-6">
                          <motion.div 
                            className={`w-14 h-14 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <capability.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <motion.h4 
                              className="text-xl font-bold text-slate-800 mb-2"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                              viewport={{ once: true }}
                            >
                              {capability.title}
                            </motion.h4>
                            <motion.p 
                              className="text-slate-600 mb-4 leading-relaxed"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                            >
                              {capability.desc}
                            </motion.p>
                            
                            {/* Accuracy indicator */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 font-medium">Targeting Accuracy</span>
                                <motion.span 
                                  className="text-purple-600 font-bold"
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                                  viewport={{ once: true }}
                                >
                                  {capability.percentage}%
                                </motion.span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                  className={`h-full bg-gradient-to-r ${capability.color} rounded-full relative`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${capability.percentage}%` }}
                                  transition={{ 
                                    duration: 1.5, 
                                    delay: index * 0.1 + 0.8,
                                    ease: "easeOut"
                                  }}
                                  viewport={{ once: true }}
                                >
                                  <motion.div 
                                    className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{ x: ['-100%', `${capability.percentage * 4}px`] }}
                                    transition={{ 
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Audience Segments Visualization */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="text-center mb-10"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                      whileHover={{ rotate: -360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-violet-800 bg-clip-text text-transparent">
                      Key Segments
                    </h3>
                  </div>
                  <motion.div 
                    className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {audienceSegments.map((segment, index) => {
                    const IconComponent = segment.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          scale: 0.8,
                          rotate: Math.random() * 10 - 5
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                          rotate: 0
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 150
                        }}
                        viewport={{ once: true }}
                        className="group relative"
                        whileHover={{ 
                          y: -8, 
                          scale: 1.05,
                          rotate: Math.random() * 6 - 3
                        }}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-violet-200/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100/50 group-hover:shadow-xl transition-all duration-300 text-center overflow-hidden">
                          {/* Background decoration */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-100/30 to-violet-100/30 rounded-full blur-2xl" />
                          
                          <div className="relative z-10">
                            <motion.div 
                              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow"
                              whileHover={{ 
                                scale: 1.2, 
                                rotate: 360,
                                background: "linear-gradient(135deg, #8b5cf6, #a855f7)"
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconComponent className="w-6 h-6 text-white" />
                            </motion.div>
                            
                            <motion.h4 
                              className="font-bold text-slate-800 text-sm leading-tight mb-3"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                              viewport={{ once: true }}
                            >
                              {segment.title}
                            </motion.h4>
                            
                            {/* Segment reach indicator */}
                            <motion.div 
                              className="h-1 bg-gray-100 rounded-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 + 0.4 }}
                              viewport={{ once: true }}
                            >
                              <motion.div 
                                className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${75 + Math.random() * 25}%` }}
                                transition={{ 
                                  duration: 1, 
                                  delay: index * 0.05 + 0.6,
                                  ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Summary stats */}
                <motion.div 
                  className="mt-10 p-8 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl shadow-2xl text-white relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%']
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div 
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-bold mb-4">Precision Targeting</h4>
                    <p className="text-purple-100 leading-relaxed">
                      Access decision-makers across 8+ key business functions with 90%+ targeting accuracy
                    </p>
                  </div>
                </motion.div>
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

        {/* Section 7: Proof of Impact - Enhanced Animated Statistics */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/40 p-16 relative overflow-hidden">
          {/* Dynamic background visualization */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Chart visualization elements */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-200/10 to-blue-200/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-200/15 to-violet-200/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.8, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating chart elements */}
            <motion.div 
              className="absolute top-32 right-32 w-14 h-14 bg-green-200/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <TrendingUp className="w-7 h-7 text-green-500/60" />
            </motion.div>
            <motion.div 
              className="absolute bottom-32 left-32 w-12 h-12 bg-blue-200/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
              animate={{ 
                x: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BarChart className="w-6 h-6 text-blue-500/60" />
            </motion.div>
            
            {/* Performance indicators */}
            <motion.div 
              className="absolute top-1/2 left-20 w-4 h-4 bg-green-400/40 rounded-full"
              animate={{ 
                x: [0, 200, 400, 600],
                y: [0, -80, 40, 0],
                scale: [1, 1.5, 1, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400/50 rounded-full"
              animate={{ 
                x: [0, -150, -300, -450],
                y: [0, 60, -40, 0],
                scale: [1, 1.3, 1, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
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
              <div className="inline-flex items-center gap-6 mb-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl relative group"
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.4 }}
                >
                  <BarChart className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  
                  {/* Performance indicator rings */}
                  <motion.div 
                    className="absolute -inset-3 border-2 border-green-300/20 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -inset-6 border border-blue-300/15 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
                <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-green-800 to-blue-800 bg-clip-text text-transparent">
                  Proof of Impact
                </h2>
              </div>
              <motion.div 
                className="w-64 h-2 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 mx-auto rounded-full shadow-lg mb-10"
                initial={{ width: 0 }}
                whileInView={{ width: 256 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Real results from real partnerships – driving measurable growth for B2B companies since 2017
              </motion.p>
            </motion.div>
            
            {/* Enhanced animated statistics grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                { value: "150+", label: "Qualified Leads Delivered Monthly", percentage: 95 },
                { value: "73%", label: "Average Lead-to-Opportunity Rate", percentage: 92 },
                { value: "2.5x", label: "Cost Efficiency vs Industry Average", percentage: 88 },
                { value: "7+", label: "Years of Proven B2B Success", percentage: 100 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    y: 60,
                    scale: 0.9,
                    rotate: Math.random() * 10 - 5
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                  whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotate: Math.random() * 6 - 3
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-green-100/50 group-hover:shadow-2xl transition-all duration-500 text-center overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-2xl" />
                    
                    <div className="relative z-10">
                      {/* Animated counter */}
                      <motion.div 
                        className="mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                          {stat.value}
                        </div>
                        <motion.div 
                          className="text-sm text-green-600 font-bold uppercase tracking-wider"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
                          viewport={{ once: true }}
                        >
                          {stat.label}
                        </motion.div>
                      </motion.div>
                      
                      {/* Performance bar */}
                      <motion.div 
                        className="h-2 bg-gray-100 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.percentage}%` }}
                          transition={{ 
                            duration: 2, 
                            delay: index * 0.1 + 1.2,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: ['-100%', '400%'] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                      </motion.div>
                      
                      {/* Impact badge */}
                      <motion.div 
                        className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-green-200/50"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1 + 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-xs font-bold text-green-700">
                          Verified
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced proof points */}
            <div className="space-y-16">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-4 mb-8">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
                    Our Proven Approach
                  </h3>
                </div>
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-purple-600 to-violet-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 128 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {proofPoints.map((point, index) => {
                  const IconComponent = point.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        y: 50,
                        rotate: index % 2 === 0 ? -3 : 3,
                        scale: 0.95
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        rotate: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      className="group relative"
                      whileHover={{ 
                        y: -15, 
                        rotate: index % 2 === 0 ? 2 : -2,
                        scale: 1.02
                      }}
                    >
                      {/* Success glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-purple-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-100/50 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-green-100/30 to-purple-100/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                          <motion.div 
                            className="mb-8"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: index * 0.2 + 0.3,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                          >
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl mb-6 group-hover:shadow-2xl transition-shadow">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-slate-800 mb-4">
                              {point.title}
                            </div>
                          </motion.div>
                          
                          <motion.p 
                            className="text-slate-600 leading-relaxed text-lg mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                            viewport={{ once: true }}
                          >
                            {point.description}
                          </motion.p>
                          
                          {/* Success indicator */}
                          <motion.div 
                            className="h-2 bg-gray-100 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + 0.7 }}
                            viewport={{ once: true }}
                          >
                            <motion.div 
                              className="h-full bg-gradient-to-r from-green-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.2 + 0.9,
                                ease: "easeOut"
                              }}
                              viewport={{ once: true }}
                            />
                          </motion.div>
                          
                          {/* Client badge */}
                          <motion.div 
                            className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-200/50"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.2 + 0.2,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Enhanced call-to-action section */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 p-12 rounded-4xl shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(34, 197, 94, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(37, 99, 235, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(37, 99, 235, 0.1) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(34, 197, 94, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(37, 99, 235, 0.1) 100%)'
                    ]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white mb-6">Ready to Join Our Success Stories?</h3>
                  <p className="text-green-100 text-xl font-medium max-w-4xl mx-auto leading-relaxed">
                    Experience proven methodologies that have delivered consistent results across industries for over 7 years
                  </p>
                </div>
              </div>
            </motion.div>
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

        {/* Section 8: Trusted By - Enhanced Trust Visualization */}
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-16 relative overflow-hidden">
          {/* Trust network visualization background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Network nodes representing trust connections */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-200/10 to-green-200/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 80, 0],
                y: [0, -40, 0]
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-200/15 to-blue-200/15 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 0.7, 1],
                rotate: [0, 360, 720]
              }}
              transition={{ 
                duration: 22,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Trust indicator elements */}
            <motion.div 
              className="absolute top-32 right-24 w-16 h-16 bg-green-200/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-200/30"
              animate={{ 
                y: [0, -35, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="w-8 h-8 text-green-500/70" />
            </motion.div>
            <motion.div 
              className="absolute bottom-24 left-24 w-14 h-14 bg-blue-200/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-200/30"
              animate={{ 
                x: [0, 40, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Award className="w-7 h-7 text-blue-500/70" />
            </motion.div>
            
            {/* Trust network connections */}
            <motion.div 
              className="absolute top-1/2 left-16 w-5 h-5 bg-green-400/50 rounded-full"
              animate={{ 
                x: [0, 250, 500, 750],
                y: [0, -100, 50, 0],
                scale: [1, 1.8, 1, 0],
                opacity: [1, 0.8, 0.6, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-16 w-4 h-4 bg-blue-400/60 rounded-full"
              animate={{ 
                x: [0, -200, -400, -600],
                y: [0, 80, -30, 0],
                scale: [1, 1.5, 1, 0],
                opacity: [1, 0.7, 0.5, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-6 mb-12">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl relative group"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.5 }}
                >
                  <Shield className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  
                  {/* Trust indicator pulses */}
                  <motion.div 
                    className="absolute -inset-4 border-2 border-green-300/30 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -inset-8 border border-blue-300/20 rounded-full"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </motion.div>
                <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-green-800 bg-clip-text text-transparent">
                  Trusted By
                </h2>
              </div>
              <motion.div 
                className="w-80 h-2 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 mx-auto rounded-full shadow-lg mb-12"
                initial={{ width: 0 }}
                whileInView={{ width: 320 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Building lasting partnerships across industries with a foundation of trust, reliability, and proven results
              </motion.p>
            </motion.div>
            
            {/* Trust metrics dashboard */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { metric: "98%", label: "Client Satisfaction Rate", icon: Heart, color: "from-pink-500 to-red-500" },
                { metric: "7+", label: "Years of Trusted Partnerships", icon: Award, color: "from-blue-500 to-indigo-500" },
                { metric: "100%", label: "Data Privacy Compliance", icon: Shield, color: "from-green-500 to-emerald-500" }
              ].map((trust, index) => {
                const IconComponent = trust.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      y: 60,
                      scale: 0.9,
                      rotate: Math.random() * 8 - 4
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 120
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                    whileHover={{ 
                      y: -20, 
                      scale: 1.05,
                      rotate: Math.random() * 4 - 2
                    }}
                  >
                    {/* Trust aura */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-green-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-blue-100/50 group-hover:shadow-2xl transition-all duration-500 text-center overflow-hidden">
                      {/* Background trust elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-green-100/30 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-green-100/40 to-blue-100/40 rounded-full blur-2xl" />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="mb-8"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.2 + 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-20 h-20 bg-gradient-to-r ${trust.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow`}>
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                            {trust.metric}
                          </div>
                          <motion.div 
                            className="text-sm text-blue-600 font-bold uppercase tracking-wider"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                            viewport={{ once: true }}
                          >
                            {trust.label}
                          </motion.div>
                        </motion.div>
                        
                        {/* Trust verification badge */}
                        <motion.div 
                          className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-green-200/50"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.2 + 0.2,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-xs font-bold text-green-700">
                            Verified
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Enhanced industry ecosystem */}
            <div className="space-y-20">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-4 mb-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Globe className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">
                    Industry Ecosystem
                  </h3>
                </div>
                <motion.div 
                  className="w-40 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 160 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              
              {/* Innovative industry grid with network connections */}
              <div className="relative">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        y: 50,
                        scale: 0.9,
                        rotate: index % 2 === 0 ? -5 : 5
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        rotate: 0
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      className="group relative"
                      whileHover={{ 
                        y: -18, 
                        scale: 1.05,
                        rotate: index % 2 === 0 ? 3 : -3
                      }}
                    >
                      {/* Industry connection glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/25 to-blue-200/25 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-indigo-100/50 group-hover:shadow-2xl transition-all duration-500 text-center overflow-hidden">
                        {/* Network background pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                          <motion.div 
                            className="mb-8"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: index * 0.15 + 0.3,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                          >
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow">
                              <Building className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 leading-tight">
                              {industry}
                            </h4>
                          </motion.div>
                          
                          {/* Industry strength indicator */}
                          <motion.div 
                            className="h-2 bg-gray-100 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
                            viewport={{ once: true }}
                          >
                            <motion.div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.15 + 0.7,
                                ease: "easeOut"
                              }}
                              viewport={{ once: true }}
                            />
                          </motion.div>
                          
                          {/* Trust connection badge */}
                          <motion.div 
                            className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-200/50"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.15 + 0.2,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.3, rotate: 360 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Network connection lines between industries */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-20">
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    {/* Animated connection paths */}
                    <motion.path
                      d="M 100 100 Q 300 50 500 150"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 3, delay: 1 }}
                      viewport={{ once: true }}
                    />
                    <motion.path
                      d="M 200 200 Q 400 100 600 250"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 3, delay: 1.5 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Enhanced partnership promise */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-gradient-to-r from-indigo-600 via-blue-600 to-green-600 p-16 rounded-4xl shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(79, 70, 229, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, rgba(79, 70, 229, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(79, 70, 229, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
                    ]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-10 backdrop-blur-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <Heart className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-5xl font-bold text-white mb-8">
                    Building Trust Through Results
                  </h3>
                  <p className="text-indigo-100 text-2xl font-medium max-w-5xl mx-auto leading-relaxed">
                    From startups to enterprises across technology, SaaS, finance, and beyond – our commitment to excellence has earned the trust of growth-driven companies since 2017
                  </p>
                </div>
              </div>
            </motion.div>
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