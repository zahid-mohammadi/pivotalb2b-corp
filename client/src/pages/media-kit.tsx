import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import logoUrl from "@assets/logo.png";
import { 
  Download, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar, 
  Database, 
  Heart,
  Mail, 
  FileText, 
  Phone,
  Globe, 
  MapPin,
  Shield,
  Zap,
  CheckCircle,
  Building2,
  Briefcase,
  Search,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Lock,
  UserCheck,
  ArrowRight,
  Linkedin,
  BarChart,
  BarChart3,
  Laptop
} from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import { MediaKitForm } from "@/components/forms/media-kit-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    
    const increment = target / (duration * 60);
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
  const [hasAccess, setHasAccess] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const sections = contentRef.current.querySelectorAll('.pdf-page');
      const pdfWidth = 508;
      const pdfHeight = 285.75;
      const pdf = new jsPDF('l', 'mm', [pdfWidth, pdfHeight]);
      
      for (let i = 0; i < sections.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const section = sections[i] as HTMLElement;
        
        // Scroll section into view and wait for animations
        section.scrollIntoView({ behavior: 'instant', block: 'center' });
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Store original styles
        const originalStyles = new Map<HTMLElement, { width: string; height: string; maxWidth: string; minHeight: string }>();
        originalStyles.set(section, {
          width: section.style.width,
          height: section.style.height,
          maxWidth: section.style.maxWidth,
          minHeight: section.style.minHeight
        });
        
        // Apply PDF dimensions temporarily
        section.style.width = '1920px';
        section.style.height = '1080px';
        section.style.maxWidth = '1920px';
        section.style.minHeight = '1080px';
        
        // Force ALL elements to be visible - comprehensive approach
        const allElements = section.querySelectorAll('*');
        const originalElementStyles = new Map<HTMLElement, { opacity: string; visibility: string; transform: string }>();
        
        allElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          const computedStyle = window.getComputedStyle(htmlEl);
          
          // Store original values
          originalElementStyles.set(htmlEl, {
            opacity: htmlEl.style.opacity,
            visibility: htmlEl.style.visibility,
            transform: htmlEl.style.transform
          });
          
          // Force visible if hidden by opacity or visibility
          if (computedStyle.opacity === '0' || htmlEl.style.opacity === '0') {
            htmlEl.style.opacity = '1';
          }
          if (computedStyle.visibility === 'hidden' || htmlEl.style.visibility === 'hidden') {
            htmlEl.style.visibility = 'visible';
          }
          
          // Remove transforms that might hide elements
          if (htmlEl.style.transform && htmlEl.style.transform.includes('translateY')) {
            htmlEl.style.transform = 'none';
          }
        });
        
        // Extra wait for all styles to apply
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080
        });
        
        // Restore ALL original styles
        originalStyles.forEach((styles, element) => {
          element.style.width = styles.width;
          element.style.height = styles.height;
          element.style.maxWidth = styles.maxWidth;
          element.style.minHeight = styles.minHeight;
        });
        
        originalElementStyles.forEach((styles, element) => {
          element.style.opacity = styles.opacity;
          element.style.visibility = styles.visibility;
          element.style.transform = styles.transform;
        });
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
      description: "Engage full buying committees within your Target Accounts before competitors do.",
      icon: Target,
      gradient: "from-violet-600 to-fuchsia-600"
    },
    {
      title: "B2B Lead Generation & Qualification",
      description: "Generate and validate opportunities aligned to your Ideal Customer Profile.",
      icon: Users,
      gradient: "from-fuchsia-600 to-pink-600"
    },
    {
      title: "Precision Demand Generation",
      description: "Convert research-stage interest into pipeline through content-led engagement.",
      icon: Zap,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Event Marketing & Audience Acquisition",
      description: "Fill events with the right attendees — decision-makers with real interest.",
      icon: Calendar,
      gradient: "from-purple-600 to-indigo-600"
    },
    {
      title: "Lead Validation & Enrichment",
      description: "Clean and verify existing data for accuracy, compliance, and usability.",
      icon: Database,
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      title: "Lead Nurturing & Buyer Engagement",
      description: "Keep early-stage prospects engaged until timing aligns.",
      icon: Heart,
      gradient: "from-pink-600 to-rose-600"
    }
  ];

  const channels = [
    {
      title: "Email Outreach",
      description: "Compliant, personalized communication at scale",
      icon: Mail,
      color: "violet"
    },
    {
      title: "Landing Pages & Form Fills",
      description: "Conversion-driven inbound capture",
      icon: FileText,
      color: "fuchsia"
    },
    {
      title: "Phone Outreach",
      description: "Human validation and accelerated engagement",
      icon: Phone,
      color: "purple"
    }
  ];

  const audienceSegments = [
    { title: "Information Technology", icon: Globe },
    { title: "Operations", icon: Briefcase },
    { title: "Marketing", icon: Target },
    { title: "Sales", icon: TrendingUp },
    { title: "Finance", icon: Building2 },
    { title: "Human Resources", icon: Users },
    { title: "Customer Success & Support", icon: Heart },
    { title: "Leadership & Strategy Roles", icon: Award }
  ];

  const industries = [
    "SaaS / Software",
    "Cybersecurity",
    "IT Services & Infrastructure",
    "HR Tech / People Platforms",
    "Industrial & Manufacturing",
    "Professional Services",
    "B2B Marketing Agencies"
  ];

  const complianceItems = [
    { name: "GDPR", region: "Europe", icon: Shield },
    { name: "CCPA", region: "California", icon: Lock },
    { name: "TCPA", region: "U.S. Telecommunication", icon: Phone },
    { name: "CAN-SPAM", region: "Email Governance", icon: Mail }
  ];

  // Show form if user hasn't submitted it yet
  if (!hasAccess) {
    return (
      <>
        <MetaTags
          title="Access Media Kit | Pivotal B2B - Strategic ABM & Demand Generation"
          description="Get instant access to our comprehensive media kit featuring company overview, services, audience capabilities, and contact information."
          keywords="media kit, B2B marketing, ABM, demand generation, lead generation, press kit, company information"
        />
        <MediaKitForm onSuccess={() => setHasAccess(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Professional Media Kit | Pivotal B2B - Strategic ABM & Demand Generation"
        description="Download our comprehensive media kit featuring company overview, services, audience capabilities, and contact information for B2B marketing partnerships."
        keywords="media kit, B2B marketing, ABM, demand generation, lead generation, press kit, company information"
      />

      {/* Sticky Header */}
      <div className="bg-gradient-to-r from-violet-900 via-fuchsia-900 to-purple-900 shadow-2xl border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Pivotal B2B Media Kit</h1>
              <p className="text-violet-100 text-xs sm:text-sm">Strategic ABM & Demand Generation Partner</p>
            </div>
            <Button 
              onClick={generatePDF} 
              disabled={isGeneratingPDF}
              className="bg-white text-violet-900 hover:bg-violet-50 font-bold px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all"
              data-testid="button-download-pdf"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-violet-900/30 border-t-violet-900 rounded-full animate-spin" />
                  <span className="hidden sm:inline">Generating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div ref={contentRef} className="bg-white">
        
        {/* SECTION 1: COVER PAGE */}
        <section className="pdf-page min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-fuchsia-950 flex flex-col items-center justify-center p-8 sm:p-12 relative overflow-hidden">
          {/* Animated orbital background */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.8, 1],
                x: [0, -40, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="text-center max-w-5xl mx-auto relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <div className="inline-block p-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
                <img 
                  src={logoUrl} 
                  alt="Pivotal B2B Logo" 
                  className="h-32 sm:h-40 w-auto mx-auto"
                />
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-7xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Pivotal B2B
            </motion.h1>
            
            {/* Tagline */}
            <motion.div 
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                Strategic ABM & Demand Generation Partner
              </p>
              <p className="text-xl font-semibold text-violet-200">
                For Growth-Focused B2B Revenue Teams
              </p>
              <motion.div 
                className="w-32 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>
            
            {/* Contact Cards */}
            <motion.div 
              className="grid grid-cols-2 gap-4 max-w-4xl mx-auto mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { icon: Globe, text: "pivotal-b2b.com", href: "https://pivotal-b2b.com", testId: "link-website" },
                { icon: Mail, text: "contact@pivotal-b2b.com", href: "mailto:contact@pivotal-b2b.com", testId: "link-email" },
                { icon: Phone, text: "+1 417-900-3844", href: "tel:+14179003844", testId: "link-phone" },
                { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/company/pivotal-b2b-marketing", testId: "link-linkedin" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <a href={item.href} data-testid={item.testId} className="text-white hover:text-violet-200 transition-colors font-medium text-sm sm:text-base">
                    {item.text}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: COMPANY OVERVIEW */}
        <section className="pdf-page bg-gradient-to-br from-white via-violet-50/30 to-fuchsia-50/30 py-12 sm:py-16 px-6 sm:px-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-fuchsia-200/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-full mx-auto relative z-10 h-full flex flex-col">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                Company Overview
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-violet-100/50 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <span className="font-bold text-violet-700">Pivotal B2B</span> is a demand generation and account-based marketing partner built for B2B organizations that value precision over volume.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Founded in <span className="font-bold">2017</span> by <span className="font-bold text-violet-700">Zahid Mohammadi</span>, Pivotal B2B enables marketing and sales teams to generate qualified pipeline through compliant, content-led outreach across high-priority target accounts.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Rather than delivering random leads, we build <span className="font-bold text-violet-700">predictable revenue systems</span> that align directly with Ideal Customer Profiles and sales goals.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-8 shadow-2xl text-white flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-black">Our Mission</h3>
              </div>
              <p className="text-xl font-medium leading-relaxed mb-5">
                To help B2B companies engage only the buyers who matter — through targeted, compliant, and insight-driven programs that convert interest into revenue.
              </p>
              <div className="p-5 bg-white/10 rounded-xl border border-white/20">
                <p className="text-base">
                  Pivotal B2B stands apart by operating as a <span className="font-bold">strategic partner</span> rather than a volume-based data provider. Our focus is on <span className="font-bold">pipeline confidence, not contact delivery</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: WHO WE SERVE */}
        <section className="pdf-page bg-slate-900 py-12 sm:py-16 px-6 sm:px-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiPjxjaXJjbGUgY3g9IjciIGN5PSI3IiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
          </div>

          <div className="max-w-full mx-auto relative z-10 h-full flex flex-col">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-white mb-4">
                Who We Serve
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 mx-auto rounded-full mb-5" />
              <p className="text-lg text-violet-200 max-w-3xl mx-auto">
                We partner with B2B organizations that:
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                { icon: Sparkles, text: "Sell complex or considered solutions" },
                { icon: Building2, text: "Target small, mid-market to enterprise customers" },
                { icon: Users, text: "Require conversations with multiple decision-makers per opportunity" },
                { icon: ThumbsUp, text: "Want quality-controlled pipeline — not inflated lead counts" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-lg font-medium pt-2">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Industries */}
            <motion.div 
              className="bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Typical Industries</h3>
              <div className="grid grid-cols-3 gap-4">
                {industries.map((industry, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/10"
                  >
                    <CheckCircle className="w-5 h-5 text-violet-300 flex-shrink-0" />
                    <span className="text-white font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: B2B AUDIENCE & TARGETING */}
        <section className="pdf-page bg-gradient-to-br from-slate-900 via-violet-950 to-fuchsia-950 py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col justify-center">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
                <Globe className="w-5 h-5 text-violet-300" />
                <span className="text-white font-medium">Verified Professional Database</span>
              </div>
              <h2 className="text-5xl font-black text-white mb-4">
                135+ Million Verified B2B Professionals
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 mx-auto rounded-full mb-4" />
              <p className="text-lg text-white/80 max-w-4xl mx-auto">
                Connect with decision-makers across all key business functions, industries, and geographies with 92% targeting accuracy
              </p>
            </motion.div>

            {/* Audience Reach by Job Function - 2 rows of 5 */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-5 flex items-center justify-center gap-3">
                <Users className="w-6 h-6 text-violet-300" />
                Audience Reach by Job Function
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { name: "Information Technology", value: "42M", color: "from-blue-500 to-cyan-500", icon: Laptop },
                  { name: "Sales & Business Dev", value: "26M", color: "from-green-500 to-emerald-500", icon: TrendingUp },
                  { name: "Marketing & Comms", value: "24M", color: "from-purple-500 to-indigo-500", icon: Target },
                  { name: "Human Resources", value: "14M", color: "from-pink-500 to-rose-500", icon: Users },
                  { name: "Operations & Mgmt", value: "12.8M", color: "from-orange-500 to-red-500", icon: Building2 },
                  { name: "Finance & Accounting", value: "10M", color: "from-teal-500 to-cyan-500", icon: BarChart3 },
                  { name: "Executive Leadership", value: "8.2M", color: "from-violet-500 to-purple-500", icon: Award },
                  { name: "Engineering & R&D", value: "6.5M", color: "from-amber-500 to-yellow-500", icon: Zap },
                  { name: "Customer Success", value: "4.3M", color: "from-sky-500 to-blue-500", icon: Heart },
                  { name: "Product Management", value: "3.7M", color: "from-fuchsia-500 to-pink-500", icon: Target }
                ].map((segment, index) => (
                  <div 
                    key={index}
                    className="relative group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all border border-white/20"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${segment.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                      <segment.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-black text-white mb-1">{segment.value}</p>
                    <p className="text-xs text-white/70 leading-tight">{segment.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Precision Targeting Capabilities - 4 columns */}
            <motion.div 
              className="grid grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Building2,
                  title: "Company Intelligence",
                  items: ["Revenue: $1M-$50B+", "Employees: 10-500K+", "Tech Stack", "Funding Stage"],
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: MapPin,
                  title: "Geographic Precision",
                  items: ["195 Countries", "State/Province", "Metro Areas", "Timezone Optimized"],
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Target,
                  title: "Role & Seniority",
                  items: ["C-Suite & VP Level", "Decision Makers", "Budget Authority", "Department Heads"],
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  icon: Database,
                  title: "Behavioral Signals",
                  items: ["Content Engagement", "Tech Adoption", "Buying Intent", "Event Participation"],
                  color: "from-orange-500 to-red-500"
                }
              ].map((capability, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <capability.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{capability.title}</h3>
                  <ul className="space-y-2">
                    {capability.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Bottom Banner */}
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-xl border border-white/20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-white font-semibold">
                <span className="text-violet-300 font-bold">92% Targeting Accuracy</span> • <span className="text-fuchsia-300 font-bold">98.7% Data Quality</span> • <span className="text-green-300 font-bold">Real-Time Updates</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: CORE SERVICES */}
        <section className="pdf-page bg-white py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                Core Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-3 gap-5">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="group relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  data-testid={`card-service-${index}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: REVENUE PROCESS (Timeline Style) */}
        <section className="pdf-page bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 py-12 sm:py-16 px-6 sm:px-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
              animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </div>

          <div className="max-w-full mx-auto relative z-10 h-full flex flex-col">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-white mb-4">
                Our Revenue Process
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 mx-auto rounded-full" />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  phase: "FIND",
                  title: "Identify ICP-Aligned Buyers",
                  items: [
                    "ICP Targeting & Account Mapping",
                    "Intent Signal Monitoring",
                    "Decision-Maker Identification"
                  ],
                  icon: Search,
                  color: "violet"
                },
                {
                  phase: "ENGAGE",
                  title: "Establish Authority",
                  items: [
                    "Insight-Driven Messaging",
                    "Multi-Channel Communication",
                    "Thought Leadership Positioning"
                  ],
                  icon: MessageSquare,
                  color: "fuchsia"
                },
                {
                  phase: "CLOSE",
                  title: "Accelerate Revenue Outcomes",
                  items: [
                    "Pipeline Quality Review",
                    "Sales-Ready Delivery",
                    "Conversion Enablement"
                  ],
                  icon: ThumbsUp,
                  color: "purple"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-violet-500 to-fuchsia-500" />
                  )}
                  
                  <div className="flex gap-5 items-start">
                    <div className={`w-14 h-14 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`bg-${step.color}-500 text-white px-3 py-1 text-xs font-bold`}>
                          {step.phase}
                        </Badge>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <ul className="space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-violet-400 flex-shrink-0" />
                              <span className="text-white text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: MARKETING CHANNELS */}
        <section className="pdf-page bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col justify-center">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                Marketing Channels
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full mb-4" />
              <p className="text-lg text-slate-700">
                We operate across multiple channels to ensure consistent reach and engagement
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-10">
              {channels.map((channel, index) => (
                <motion.div 
                  key={index}
                  className={`relative p-10 bg-gradient-to-br from-${channel.color}-600 to-${channel.color}-700 rounded-2xl shadow-xl text-white overflow-hidden group`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  data-testid={`card-channel-${index}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform mx-auto">
                      <channel.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-center" data-testid={`text-channel-title-${index}`}>{channel.title}</h3>
                    <p className="text-white/90 text-base text-center">{channel.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: COMPLIANCE & DATA ETHICS */}
        <section className="pdf-page bg-white py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col justify-center">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                Compliance & Data Ethics
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-10 border border-violet-100 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-slate-700 text-center mb-8">
                All outreach adheres to:
              </p>
              
              <div className="grid grid-cols-4 gap-6">
                {complianceItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 bg-white rounded-2xl shadow-lg border border-violet-100 text-center group hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    data-testid={`card-compliance-${index}`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-violet-900 mb-2" data-testid={`text-compliance-${item.name.toLowerCase()}`}>{item.name}</h3>
                    <p className="text-sm text-slate-600">{item.region}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Commitment</h3>
                  <p className="text-base text-violet-100 leading-relaxed">
                    Data is managed responsibly, with opt-out governance and transparent communication protocols. <span className="font-bold text-white">Client reputation remains a priority at every stage</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9: CUSTOMER SUCCESS & SUPPORT */}
        <section className="pdf-page bg-gradient-to-br from-violet-900 via-fuchsia-900 to-purple-900 py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col justify-center">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-white mb-4">
                Customer Success & Support
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-300 to-fuchsia-300 mx-auto rounded-full" />
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-white text-center mb-10">
                Our engagement model is built on <span className="font-bold text-violet-300">partnership, not transaction</span>:
              </p>

              <div className="grid grid-cols-3 gap-12 mb-10">
                {[
                  { icon: Award, title: "Dedicated Support", description: "Strategy and operations support throughout your journey" },
                  { icon: BarChart, title: "Ongoing Insights", description: "Continuous reporting and refinement" },
                  { icon: Heart, title: "Flexibility", description: "No long-term lock-in requirements" }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-violet-100 text-base">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/20 text-center">
                <p className="text-2xl font-bold text-white">
                  Success is measured by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">pipeline contribution</span>, not lead volume.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 10: CONTACT US */}
        <section className="pdf-page bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 py-12 sm:py-16 px-6 sm:px-16">
          <div className="max-w-full mx-auto h-full flex flex-col">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="mb-6">
                <img 
                  src={logoUrl} 
                  alt="Pivotal B2B Logo" 
                  className="h-20 w-auto mx-auto"
                />
              </div>
              
              <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-violet-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full mb-4" />
              <p className="text-lg text-slate-700">Let's build predictable revenue together</p>
            </motion.div>

            {/* Mirrored gradient panels for offices */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* USA Office */}
              <motion.div 
                className="relative p-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl shadow-2xl text-white overflow-hidden group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black">USA Office</h3>
                  </div>
                  <div className="space-y-2 text-base">
                    <p className="font-semibold">Pivotal B2B LLC</p>
                    <p>6192 Coastal Highway</p>
                    <p>Lewes, DE 19958</p>
                    <p>United States</p>
                  </div>
                </div>
              </motion.div>

              {/* Oman Office */}
              <motion.div 
                className="relative p-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-2xl text-white overflow-hidden group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black">Oman Office</h3>
                  </div>
                  <div className="space-y-2 text-base">
                    <p className="font-semibold">Pivotal Business International SPC</p>
                    <p>Way 2403, 191 Muscat</p>
                    <p>Oman 114</p>
                    <p className="pt-2 font-semibold">+968 77523663</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Links */}
            <motion.div 
              className="grid grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <a 
                href="https://pivotal-b2b.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group border border-violet-100"
                data-testid="link-contact-website"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-violet-700">Website</span>
              </a>

              <a 
                href="mailto:contact@pivotal-b2b.com"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group border border-violet-100"
                data-testid="link-contact-email"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-violet-700">Email</span>
              </a>

              <a 
                href="https://www.linkedin.com/company/pivotal-b2b-marketing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group border border-violet-100"
                data-testid="link-contact-linkedin"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-violet-700">LinkedIn</span>
              </a>

              <a 
                href="/request-proposal"
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl shadow-lg hover:shadow-xl transition-all group text-white"
                data-testid="link-request-proposal"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold">Get Proposal</span>
              </a>
            </motion.div>

            {/* Final CTA with Branding */}
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block p-8 bg-gradient-to-br from-slate-900 to-violet-900 rounded-2xl shadow-2xl">
                <p className="text-2xl font-black text-white mb-2">
                  Ready to Scale Your Pipeline?
                </p>
                <p className="text-base text-violet-200 mb-4">
                  Schedule a Strategy Call or Request a Custom Proposal
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                    Pivotal B2B | Strategic ABM & Demand Generation Partner
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-slate-900 py-6 px-8 text-center text-slate-400 text-sm border-t border-slate-800">
          <p>&copy; {new Date().getFullYear()} Pivotal B2B. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
