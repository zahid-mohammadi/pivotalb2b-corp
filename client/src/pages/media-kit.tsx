import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Download, Palette, Layout, Image as ImageIcon, Users, BarChart2, Award, Share2, 
  BookText, FileText, Target, Zap, Globe, MessageSquare, Phone, Mail, Building, Bookmark,
  Calendar, Briefcase, Link2, Copy, Sparkles, TrendingUp, LineChart, CheckCircle2,
  Smile, Clock, DollarSign, ShieldCheck, PieChart
} from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

export default function MediaKit() {
  const [activeTab, setActiveTab] = useState("brand");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();
  
  const downloadPDF = async () => {
    const mediaKit = document.getElementById('media-kit');
    if (!mediaKit) return;
    
    try {
      setIsGeneratingPDF(true);
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your media kit...",
        duration: 5000,
      });
      
      const canvas = await html2canvas(mediaKit, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate image dimensions to fit A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = -pdfHeight + (heightLeft - imgHeight);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Pivotal-B2B-Media-Kit.pdf");
      
      toast({
        title: "Download complete!",
        description: "Your media kit has been downloaded successfully.",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
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

  // References for TOC bookmarks in PDF
  const brandRef = useRef(null);
  const companyRef = useRef(null);
  const metricsRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const servicesRef = useRef(null);
  
  // Advanced PDF generation with table of contents
  const generateAdvancedPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      toast({
        title: "Generating Professional PDF",
        description: "Creating your branded media kit with interactive table of contents...",
        duration: 5000,
      });
      
      const mediaKit = document.getElementById('media-kit');
      if (!mediaKit) return;
      
      const canvas = await html2canvas(mediaKit, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Add cover page
      pdf.setFillColor(147, 51, 234); // Purple color
      pdf.rect(0, 0, pdfWidth, 50, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.text("Pivotal B2B Media Kit", 105, 30, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text("Official Brand Assets & Company Information", 105, 60, { align: 'center' });
      
      // Add logo
      const logoImg = document.querySelector('img[alt="Pivotal B2B Logo"]');
      if (logoImg) {
        const logoCanvas = await html2canvas(logoImg as HTMLElement, { scale: 2 });
        const logoData = logoCanvas.toDataURL('image/png');
        pdf.addImage(logoData, 'PNG', 80, 80, 50, 50);
      }
      
      pdf.setFontSize(10);
      pdf.text("© " + new Date().getFullYear() + " Pivotal B2B", 105, 150, { align: 'center' });
      
      // Add Table of Contents on second page
      pdf.addPage();
      
      pdf.setFillColor(147, 51, 234); // Purple color
      pdf.rect(0, 0, pdfWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Table of Contents", 105, 15, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      
      const tocItems = [
        { title: "1. Brand Assets", page: 3 },
        { title: "2. Company Information", page: 4 },
        { title: "3. Key Metrics & Achievements", page: 5 },
        { title: "4. Client Success Stories", page: 6 },
        { title: "5. Services Overview", page: 7 }
      ];
      
      let yPos = 40;
      
      tocItems.forEach(item => {
        pdf.setFont("helvetica", "bold");
        pdf.text(item.title, 30, yPos);
        
        pdf.setFont("helvetica", "normal");
        pdf.text("Page " + item.page, 150, yPos);
        
        // Draw line between text and page number
        pdf.setDrawColor(200, 200, 200);
        pdf.line(30, yPos + 2, 180, yPos + 2);
        
        // Make the text clickable
        pdf.link(30, yPos - 10, 150, 15, { pageNumber: item.page });
        
        yPos += 20;
      });
      
      // Disclaimer at bottom of TOC
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text("This document contains proprietary information. All content is confidential.", 105, 280, { align: 'center' });
      
      // Add the actual content on subsequent pages
      // Calculate image dimensions to fit A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add content pages
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = -pdfHeight + (heightLeft - imgHeight);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Pivotal-B2B-Media-Kit.pdf");
      
      toast({
        title: "Download complete!",
        description: "Your media kit has been downloaded successfully.",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating advanced PDF:", error);
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

  return (
    <div>
      <MetaTags
        title="Pivotal B2B Media Kit - Brand Assets & Guidelines"
        description="Official media kit for Pivotal B2B, including brand guidelines, logos, company information, and success metrics for press and partners."
        keywords="media kit, press kit, brand assets, company information, B2B marketing, lead generation"
      />
      
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 border-purple-400/20">
              Official Brand Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pivotal B2B Media Kit</h1>
            <p className="text-xl text-purple-100 max-w-2xl">
              Brand assets, company information, and marketing resources for partners, press, and media professionals.
            </p>
          </motion.div>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Button 
              variant="secondary" 
              className="bg-white text-purple-900 hover:bg-gray-100"
              onClick={generateAdvancedPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Media Kit
                </>
              )}
            </Button>
            
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <BookText className="h-4 w-4 mr-2" />
              View Our Blog
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bookmark className="h-5 w-5 mr-2 text-primary" />
                  Media Kit Contents
                </h2>
                <nav className="space-y-3">
                  <a href="#brand" className="flex items-center p-2 rounded-md text-primary bg-purple-50 hover:bg-purple-100 transition-colors">
                    <Palette className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Brand Assets</span>
                  </a>
                  <a href="#company" className="flex items-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-purple-50 transition-colors">
                    <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Company Information</span>
                  </a>
                  <a href="#metrics" className="flex items-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-purple-50 transition-colors">
                    <BarChart2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Key Metrics</span>
                  </a>
                  <a href="#case-studies" className="flex items-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-purple-50 transition-colors">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Case Studies</span>
                  </a>
                  <a href="#services" className="flex items-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-purple-50 transition-colors">
                    <Target className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Services Overview</span>
                  </a>
                </nav>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>contact@pivotal-b2b.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>+1 417-900-3844</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    <a href="https://pivotal-b2b.com" className="text-primary hover:underline">pivotal-b2b.com</a>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                onClick={generateAdvancedPDF} 
                disabled={isGeneratingPDF}
                className="w-full flex items-center justify-center gap-2 mb-3"
                size="lg"
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Media Kit with TOC
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                PDF includes a clickable table of contents and high-resolution imagery.
              </p>
            </div>
          </div>
          
          <div id="media-kit" className="lg:w-3/4 bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <Tabs defaultValue="brand" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="brand" id="brand">
                  <span className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Brand</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="company" id="company">
                  <span className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    <span className="hidden sm:inline">Company</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="metrics" id="metrics">
                  <span className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Metrics</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="case-studies" id="case-studies">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Case Studies</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="services" id="services">
                  <span className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Services</span>
                  </span>
                </TabsTrigger>
              </TabsList>
              
              {/* Brand Assets Tab */}
              <TabsContent value="brand" className="space-y-8">
                <div ref={brandRef}>
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-1.5 bg-primary rounded-full mr-3"></div>
                    <div>
                      <h2 className="text-3xl font-bold" id="brand">Brand Assets</h2>
                      <p className="text-muted-foreground mt-1">
                        Our official logos, colors, and brand guidelines for use in publications and partnerships.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-12 bg-gradient-to-r from-purple-50 to-transparent p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                      <Palette className="h-6 w-6 mr-2 text-primary" />
                      <h3 className="text-xl font-semibold">Logo</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="border-0 shadow-lg overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-100 to-white">
                          <Badge className="w-fit mb-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Primary Logo</Badge>
                          <CardDescription>For use on light backgrounds</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center p-8 bg-white">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <img 
                              src="/logo.png" 
                              alt="Pivotal B2B Logo" 
                              className="max-h-40 drop-shadow-sm"
                            />
                          </motion.div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 bg-gray-50 border-t">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Format:</span> PNG with transparency
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.open('/logo.png', '_blank')}>
                              <ImageIcon className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/logo.png';
                                link.download = 'Pivotal-B2B-Logo.png';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                
                                toast({
                                  title: "Logo downloaded",
                                  description: "The Pivotal B2B logo has been downloaded successfully.",
                                  duration: 3000,
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <div className="flex flex-col justify-center space-y-6">
                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-primary" />
                            Logo Usage Guidelines
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="h-5 w-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                              Maintain clear space around the logo equal to the height of the "P" in "Pivotal"
                            </li>
                            <li className="flex items-start">
                              <span className="h-5 w-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                              Use the logo at a readable size, minimum 150px wide for digital
                            </li>
                            <li className="flex items-start">
                              <span className="h-5 w-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">×</span>
                              Don't stretch, distort, or change the proportions
                            </li>
                            <li className="flex items-start">
                              <span className="h-5 w-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">×</span>
                              Don't change the colors or add additional effects
                            </li>
                          </ul>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-br from-purple-800 to-purple-900 text-white rounded-lg shadow-lg">
                          <h4 className="font-semibold mb-3">Need Something Different?</h4>
                          <p className="text-sm text-purple-100 mb-4">Contact us for additional logo formats, usage permissions, or special requests.</p>
                          <Button size="sm" variant="secondary" className="w-full bg-white text-purple-900 hover:bg-gray-100">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Brand Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">C</span>
                      </div>
                      <h3 className="text-xl font-semibold">Brand Colors</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="overflow-hidden border-0 shadow-md">
                        <div className="h-32 bg-[#9333EA] flex flex-col justify-end p-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1.5 text-white text-sm inline-block">
                            Primary
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">Purple</p>
                            <Badge variant="outline">#9333EA</Badge>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>RGB: 147, 51, 234</p>
                            <p>CMYK: 37%, 78%, 0%, 8%</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="overflow-hidden border-0 shadow-md">
                        <div className="h-32 bg-[#171717] flex flex-col justify-end p-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1.5 text-white text-sm inline-block">
                            Secondary
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">Black</p>
                            <Badge variant="outline">#171717</Badge>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>RGB: 23, 23, 23</p>
                            <p>CMYK: 0%, 0%, 0%, 91%</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="overflow-hidden border-0 shadow-md">
                        <div className="h-32 bg-[#DB2777] flex flex-col justify-end p-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1.5 text-white text-sm inline-block">
                            Accent
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">Pink</p>
                            <Badge variant="outline">#DB2777</Badge>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>RGB: 219, 39, 119</p>
                            <p>CMYK: 0%, 82%, 45%, 14%</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="overflow-hidden border-0 shadow-md">
                        <div className="h-32 bg-white flex flex-col justify-end p-4 border-b">
                          <div className="bg-black/10 backdrop-blur-sm rounded-md px-3 py-1.5 text-gray-700 text-sm inline-block">
                            Background
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">White</p>
                            <Badge variant="outline">#FFFFFF</Badge>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>RGB: 255, 255, 255</p>
                            <p>CMYK: 0%, 0%, 0%, 0%</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">T</span>
                      </div>
                      <h3 className="text-xl font-semibold">Typography</h3>
                    </div>
                    
                    <p className="mb-6">We use a modern sans-serif font system for all our digital and print materials:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-4xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Aa</p>
                        <Separator className="my-4" />
                        <h4 className="font-semibold mb-1.5">Display / Headers</h4>
                        <p className="text-sm text-muted-foreground">For main headings and titles, using Inter Bold at 24px or larger.</p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-4xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Aa</p>
                        <Separator className="my-4" />
                        <h4 className="font-semibold mb-1.5">Subheaders</h4>
                        <p className="text-sm text-muted-foreground">For section titles and subtitles, using Inter Semibold at 16-20px.</p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-4xl" style={{ fontFamily: 'Inter, sans-serif' }}>Aa</p>
                        <Separator className="my-4" />
                        <h4 className="font-semibold mb-1.5">Body Text</h4>
                        <p className="text-sm text-muted-foreground">For paragraph text and general content, using Inter Regular at 14-16px.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Company Information Tab */}
              <TabsContent value="company" className="space-y-8">
                <div ref={companyRef}>
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-1.5 bg-primary rounded-full mr-3"></div>
                    <div>
                      <h2 className="text-3xl font-bold" id="company">Company Information</h2>
                      <p className="text-muted-foreground mt-1">
                        Essential information about Pivotal B2B for media and press reference.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-12 bg-gradient-to-r from-purple-50 to-transparent p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                      <Building className="h-6 w-6 mr-2 text-primary" />
                      <h3 className="text-xl font-semibold">About Pivotal B2B</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-7">
                        <div className="prose max-w-none">
                          <p className="text-lg leading-relaxed">
                            Pivotal B2B delivers cutting-edge B2B marketing solutions with a focus on account-based marketing, 
                            lead generation, content syndication, and event marketing. Our data-driven approach helps B2B companies 
                            identify, engage, and convert high-value prospects into qualified leads.
                          </p>
                          <p className="text-lg leading-relaxed">
                            With our specialized expertise in B2B marketing, we enable businesses to streamline their marketing 
                            efforts, reduce sales cycles, and achieve measurable ROI through targeted campaigns and strategic content distribution.
                          </p>
                        </div>
                        <div className="mt-8">
                          <Badge variant="secondary" className="mb-2 mr-2">Account-Based Marketing</Badge>
                          <Badge variant="secondary" className="mb-2 mr-2">Strategic Lead Generation</Badge>
                          <Badge variant="secondary" className="mb-2 mr-2">Content Syndication</Badge>
                          <Badge variant="secondary" className="mb-2 mr-2">Event Marketing</Badge>
                          <Badge variant="secondary" className="mb-2 mr-2">BANT Qualification</Badge>
                          <Badge variant="secondary" className="mb-2 mr-2">Marketing Strategy</Badge>
                        </div>
                      </div>
                      <div className="md:col-span-5">
                        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white border-0 shadow-lg overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Award className="h-5 w-5 mr-2" />
                              Company Overview
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-purple-200">Founded</p>
                                <p className="font-medium">2020</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-200">Headquarters</p>
                                <p className="font-medium">Delaware, USA</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-200">Industry</p>
                                <p className="font-medium">B2B Marketing Services</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-200">Service Areas</p>
                                <p className="font-medium">North America, Europe, Asia-Pacific</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-200">Specialization</p>
                                <p className="font-medium">Technology, SaaS, Finance, Healthcare</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">D</span>
                      </div>
                      <h3 className="text-xl font-semibold">Company Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <Card className="lg:col-span-6 border-0 shadow-md overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
                          <CardTitle className="flex items-center text-lg">
                            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Building className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Address:</p>
                                <p className="text-muted-foreground">
                                  16192 Coastal Highway<br />
                                  Lewes, Delaware 19958<br />
                                  USA
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Phone:</p>
                                <p className="text-muted-foreground">+1 417-900-3844</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Email:</p>
                                <p className="text-muted-foreground">contact@pivotal-b2b.com</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Globe className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Website:</p>
                                <a href="https://pivotal-b2b.com" className="text-primary hover:underline">
                                  pivotal-b2b.com
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="lg:col-span-6 border-0 shadow-md overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
                          <CardTitle className="flex items-center text-lg">
                            <FileText className="h-5 w-5 mr-2 text-primary" />
                            Media Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Press Contact:</p>
                                <p className="text-muted-foreground">media@pivotal-b2b.com</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Founded:</p>
                                <p className="text-muted-foreground">2020</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Briefcase className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Industry:</p>
                                <p className="text-muted-foreground">B2B Marketing Services</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-3 text-primary">
                                <Link2 className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Media Property:</p>
                                <a href="https://www.industryevolve360.com" className="text-primary hover:underline">
                                  IndustryEvolve360.com
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">B</span>
                      </div>
                      <h3 className="text-xl font-semibold">Boilerplate</h3>
                    </div>
                    
                    <Card className="border border-primary/10 shadow-md overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b pb-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          Official Company Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="prose max-w-none">
                          <div className="p-4 border rounded-md bg-gray-50">
                            <p className="text-foreground leading-relaxed">
                              <span className="font-bold">About Pivotal B2B:</span> Pivotal B2B is a 
                              leading provider of B2B marketing solutions specializing in account-based marketing, lead generation, 
                              content syndication, and event marketing. With a data-driven approach, we help B2B companies 
                              identify, engage, and convert high-value prospects into qualified leads. Our customized marketing 
                              strategies enable businesses to streamline their marketing efforts, reduce sales cycles, and achieve 
                              measurable ROI. Learn more at <a href="https://pivotal-b2b.com" className="text-primary hover:underline">pivotal-b2b.com</a>.
                            </p>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText('About Pivotal B2B: Pivotal B2B is a leading provider of B2B marketing solutions specializing in account-based marketing, lead generation, content syndication, and event marketing. With a data-driven approach, we help B2B companies identify, engage, and convert high-value prospects into qualified leads. Our customized marketing strategies enable businesses to streamline their marketing efforts, reduce sales cycles, and achieve measurable ROI. Learn more at pivotal-b2b.com.');
                                
                                toast({
                                  title: "Copied to clipboard",
                                  description: "The boilerplate text has been copied to your clipboard.",
                                  duration: 3000,
                                });
                              }}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Text
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Key Metrics Tab */}
              <TabsContent value="metrics" className="space-y-8">
                <div ref={metricsRef}>
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-1.5 bg-primary rounded-full mr-3"></div>
                    <div>
                      <h2 className="text-3xl font-bold" id="metrics">Key Metrics & Achievements</h2>
                      <p className="text-muted-foreground mt-1">
                        Our performance metrics and achievements across different marketing services.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-purple-50 to-white">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-4xl font-bold text-primary mb-1">45%</p>
                        <p className="text-sm text-muted-foreground">Higher Conversion Rates</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-purple-50 to-white">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-4xl font-bold text-primary mb-1">85%</p>
                        <p className="text-sm text-muted-foreground">Increase in Qualified Leads</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-purple-50 to-white">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-4xl font-bold text-primary mb-1">3x</p>
                        <p className="text-sm text-muted-foreground">Content Engagement Rates</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-purple-50 to-white">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-4xl font-bold text-primary mb-1">40%</p>
                        <p className="text-sm text-muted-foreground">Higher Event Attendance</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">A</span>
                      </div>
                      <h3 className="text-xl font-semibold">Account-Based Marketing</h3>
                    </div>
                    
                    <Card className="border-0 shadow-md overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="flex items-center">
                            <Target className="h-8 w-8 text-white mr-3" />
                            <h4 className="text-white font-semibold text-lg">Performance Metrics</h4>
                          </div>
                          <Badge className="bg-white/20 text-white hover:bg-white/30 mt-2 md:mt-0">Industry-Leading Results</Badge>
                        </div>
                      </div>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Conversion Rate</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">45%</span>
                              <span className="text-sm text-green-600 font-medium">↑ Improvement</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Over industry average of 15-20%</p>
                          </div>
                          
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <Clock className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Deal Velocity</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">30%</span>
                              <span className="text-sm text-green-600 font-medium">↑ Faster</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Average sales cycle reduction</p>
                          </div>
                          
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <Users className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Account-to-Opportunity</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">3x</span>
                              <span className="text-sm text-green-600 font-medium">↑ Higher</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Conversion from targeted accounts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">L</span>
                      </div>
                      <h3 className="text-xl font-semibold">Lead Generation</h3>
                    </div>
                    
                    <Card className="border-0 shadow-md overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="flex items-center">
                            <Sparkles className="h-8 w-8 text-white mr-3" />
                            <h4 className="text-white font-semibold text-lg">Performance Metrics</h4>
                          </div>
                          <Badge className="bg-white/20 text-white hover:bg-white/30 mt-2 md:mt-0">Premium Lead Quality</Badge>
                        </div>
                      </div>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Qualified Leads</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">85%</span>
                              <span className="text-sm text-green-600 font-medium">↑ Increase</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Year over year growth</p>
                          </div>
                          
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Intent-Based Targeting ROI</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">2.5x</span>
                              <span className="text-sm text-green-600 font-medium">Return</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">Return on marketing investment</p>
                          </div>
                          
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center mb-2">
                              <LineChart className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold">Lead Quality</h5>
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <span className="text-3xl font-bold text-primary">60%</span>
                              <span className="text-sm text-green-600 font-medium">↑ Improvement</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">In BANT-qualified leads</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary font-semibold">C</span>
                        </div>
                        <h3 className="text-xl font-semibold">Content Syndication</h3>
                      </div>
                      
                      <Card className="border-0 shadow-md h-full">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <BookText className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Content Engagement</p>
                                <p className="text-sm text-muted-foreground">Compared to industry average</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">3x Higher</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Zap className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Lead Generation</p>
                                <p className="text-sm text-muted-foreground">From syndicated content</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">200% Increase</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <PieChart className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Brand Awareness</p>
                                <p className="text-sm text-muted-foreground">Through content campaigns</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">150% Lift</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary font-semibold">E</span>
                        </div>
                        <h3 className="text-xl font-semibold">Event Marketing</h3>
                      </div>
                      
                      <Card className="border-0 shadow-md h-full">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Users className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Event Attendance</p>
                                <p className="text-sm text-muted-foreground">Compared to previous events</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">40% Higher</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Registration-to-Attendance</p>
                                <p className="text-sm text-muted-foreground">Conversion rate</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">75-80%</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Smile className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Post-Event Engagement</p>
                                <p className="text-sm text-muted-foreground">Follow-up response rate</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-primary">60% Increase</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">O</span>
                      </div>
                      <h3 className="text-xl font-semibold">Overall Business Impact</h3>
                    </div>
                    
                    <Card className="border-0 bg-gradient-to-br from-purple-900 to-purple-800 text-white shadow-lg overflow-hidden">
                      <CardHeader className="border-b border-white/10 pb-4">
                        <CardTitle className="text-center text-white flex items-center justify-center">
                          <Award className="h-6 w-6 mr-2" />
                          Revenue-Driving Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center p-4">
                            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                              <Users className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-4xl font-bold text-white mb-2">300%</p>
                            <p className="text-purple-100">Average Lead Quality Improvement</p>
                          </div>
                          
                          <div className="text-center p-4">
                            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                              <Clock className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-4xl font-bold text-white mb-2">40%</p>
                            <p className="text-purple-100">Reduction in Sales Cycles</p>
                          </div>
                          
                          <div className="text-center p-4">
                            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                              <DollarSign className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-4xl font-bold text-white mb-2">2.5x</p>
                            <p className="text-purple-100">Average ROI Improvement</p>
                          </div>
                        </div>
                        
                        <div className="mt-8 bg-white/10 p-6 rounded-lg">
                          <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0 text-center md:text-left">
                              <h4 className="text-xl font-semibold text-white">Ready to achieve similar results?</h4>
                              <p className="text-purple-100 mt-1">Our data-driven approach delivers measurable ROI across all marketing services.</p>
                            </div>
                            <Button className="bg-white text-purple-900 hover:bg-gray-100 hover:text-purple-900">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Request a Proposal
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Case Studies Tab */}
              <TabsContent value="case-studies" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Client Success Stories</h2>
                  <p className="text-muted-foreground mb-8">
                    Featured case studies highlighting our successful client partnerships.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Enterprise Software Solutions Inc.</CardTitle>
                        <CardDescription>Technology Industry</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Challenge:</h4>
                            <p className="text-muted-foreground">
                              Low quality leads, extended sales cycles, and high customer acquisition costs.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Solution:</h4>
                            <p className="text-muted-foreground">
                              Implemented intent-based lead targeting, account-based marketing strategy, and multi-channel campaign optimization.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Results:</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>300% increase in qualified leads</li>
                              <li>40% reduction in sales cycle</li>
                              <li>2.5x ROI improvement</li>
                              <li>60% higher conversion rate</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <p className="italic text-muted-foreground">
                          "Pivotal B2B transformed our lead generation strategy. Their precision targeting helped us achieve unprecedented growth in qualified leads."
                        </p>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Services Firm</CardTitle>
                        <CardDescription>Consulting Industry</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Challenge:</h4>
                            <p className="text-muted-foreground">
                              Securing consulting deals with mid-sized firms.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Solution:</h4>
                            <p className="text-muted-foreground">
                              Personalized ABM outreach to executives and HR departments, aligning with their specific needs.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Results:</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>5 accounts converted to clients</li>
                              <li>30% shorter sales cycles</li>
                              <li>Improved targeting accuracy and message relevance</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Enterprise Technology Company</CardTitle>
                        <CardDescription>Global Tech Industry</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Challenge:</h4>
                            <p className="text-muted-foreground">
                              Limited content visibility in target markets.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Solution:</h4>
                            <p className="text-muted-foreground">
                              Implemented strategic content syndication across key channels.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Results:</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>200% increase in qualified leads</li>
                              <li>Significant improvement in brand awareness</li>
                              <li>Higher engagement with target audience</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Services Overview Tab */}
              <TabsContent value="services" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Services Overview</h2>
                  <p className="text-muted-foreground mb-8">
                    Our comprehensive B2B marketing service offerings.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Account-Based Marketing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Smarter engagement with buying groups at high-value accounts. Our targeted strategies personalize outreach, 
                          foster consensus among decision-makers, and accelerate sales cycles to drive success for your key accounts.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>Account intelligence</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Engagement analytics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-primary" />
                            <span>ROI measurement</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Strategic Lead Generation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Capture high-intent opt-in leads with tailored multi-channel campaigns. We attract and convert 
                          prospects across platforms, delivering qualified leads ready to engage and aligned with your goals.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>Intent-based targeting</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Performance analytics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-primary" />
                            <span>Conversion optimization</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Content Syndication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Connect with ideal buyers and elevate branded demand. We distribute your content across curated channels 
                          to boost reach, strengthen brand awareness, and spark interest in your offerings.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>Multi-channel distribution</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Audience targeting</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-primary" />
                            <span>Premium publisher network</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Event Marketing Solutions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Maximize ideal customer registrations and event attendance. Our campaigns promote and manage virtual 
                          or in-person events, ensuring strong turnout and impactful experiences for your audience.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>Audience acquisition</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Registration management</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-primary" />
                            <span>Post-event analytics</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Lead Qualification Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Prioritize leads with high conversion potential for sales teams using BANT criteria. We evaluate prospects 
                          for fit, intent, and readiness, refining your pipeline to boost efficiency and achieve stronger results.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>BANT qualification</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Sales readiness assessment</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-primary" />
                            <span>Lead scoring and prioritization</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}