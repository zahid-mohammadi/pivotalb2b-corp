import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Link2, Palette, Layout, Image as ImageIcon, Users, BarChart2, Award, Share2 } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div>
      <MetaTags
        title="Pivotal B2B Media Kit - Brand Assets & Guidelines"
        description="Official media kit for Pivotal B2B, including brand guidelines, logos, company information, and success metrics for press and partners."
        keywords="media kit, press kit, brand assets, company information, B2B marketing, lead generation"
      />
      <PageBanner
        title="Media Kit"
        description="Brand assets, company information, and media resources for press and partners."
        pattern="grid"
      />
      
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Media Kit Contents</h2>
                <nav className="space-y-2">
                  <a href="#brand" className="block text-primary hover:underline">Brand Assets</a>
                  <a href="#company" className="block text-gray-600 hover:text-primary">Company Information</a>
                  <a href="#metrics" className="block text-gray-600 hover:text-primary">Key Metrics</a>
                  <a href="#case-studies" className="block text-gray-600 hover:text-primary">Case Studies</a>
                  <a href="#services" className="block text-gray-600 hover:text-primary">Services Overview</a>
                </nav>
              </div>
              <Button 
                onClick={downloadPDF} 
                disabled={isGeneratingPDF}
                className="w-full flex items-center justify-center gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Media Kit
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div id="media-kit" className="lg:w-3/4 bg-white rounded-xl shadow-sm p-8">
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
                <div>
                  <h2 className="text-2xl font-bold mb-4">Brand Assets</h2>
                  <p className="text-muted-foreground mb-8">
                    Our official logos, colors, and brand guidelines for use in publications and partnerships.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Logo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Primary Logo</CardTitle>
                          <CardDescription>For use on light backgrounds</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center p-8 bg-gray-50 rounded-md">
                          <img 
                            src="/logo.png" 
                            alt="Pivotal B2B Logo" 
                            className="max-h-32"
                          />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => window.open('/logo.png', '_blank')}>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
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
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Brand Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="rounded-md overflow-hidden">
                        <div className="h-24 bg-[#9333EA]" />
                        <div className="px-3 py-2 bg-white border border-gray-200 border-t-0">
                          <p className="font-medium">Primary</p>
                          <p className="text-sm text-muted-foreground">#9333EA</p>
                        </div>
                      </div>
                      
                      <div className="rounded-md overflow-hidden">
                        <div className="h-24 bg-[#171717]" />
                        <div className="px-3 py-2 bg-white border border-gray-200 border-t-0">
                          <p className="font-medium">Secondary</p>
                          <p className="text-sm text-muted-foreground">#171717</p>
                        </div>
                      </div>
                      
                      <div className="rounded-md overflow-hidden">
                        <div className="h-24 bg-[#DB2777]" />
                        <div className="px-3 py-2 bg-white border border-gray-200 border-t-0">
                          <p className="font-medium">Accent</p>
                          <p className="text-sm text-muted-foreground">#DB2777</p>
                        </div>
                      </div>
                      
                      <div className="rounded-md overflow-hidden">
                        <div className="h-24 bg-white" />
                        <div className="px-3 py-2 bg-white border border-gray-200 border-t-0">
                          <p className="font-medium">Background</p>
                          <p className="text-sm text-muted-foreground">#FFFFFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Typography</h3>
                    <p className="mb-4">We use a modern sans-serif font system for all our digital and print materials:</p>
                    <div className="space-y-4">
                      <div className="border p-4 rounded-md">
                        <p className="text-4xl font-bold">Display / Headers</p>
                        <p className="text-muted-foreground text-sm mt-2">For main headings and titles</p>
                      </div>
                      <div className="border p-4 rounded-md">
                        <p className="text-xl font-semibold">Subheaders</p>
                        <p className="text-muted-foreground text-sm mt-2">For section titles and subtitles</p>
                      </div>
                      <div className="border p-4 rounded-md">
                        <p className="text-base">Body Text</p>
                        <p className="text-muted-foreground text-sm mt-2">For paragraph text and general content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Company Information Tab */}
              <TabsContent value="company" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Company Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Essential information about Pivotal B2B for media and press reference.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">About Pivotal B2B</h3>
                    <div className="prose max-w-none">
                      <p>
                        Pivotal B2B delivers cutting-edge B2B marketing solutions with a focus on account-based marketing, 
                        lead generation, content syndication, and event marketing. Our data-driven approach helps B2B companies 
                        identify, engage, and convert high-value prospects into qualified leads.
                      </p>
                      <p>
                        With our specialized expertise in B2B marketing, we enable businesses to streamline their marketing 
                        efforts, reduce sales cycles, and achieve measurable ROI through targeted campaigns and strategic content distribution.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="font-medium">Address:</p>
                            <p className="text-muted-foreground">
                              16192 Coastal Highway<br />
                              Lewes, Delaware 19958<br />
                              USA
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Phone:</p>
                            <p className="text-muted-foreground">+1 417-900-3844</p>
                          </div>
                          <div>
                            <p className="font-medium">Email:</p>
                            <p className="text-muted-foreground">contact@pivotal-b2b.com</p>
                          </div>
                          <div>
                            <p className="font-medium">Website:</p>
                            <a href="https://pivotal-b2b.com" className="text-primary hover:underline">
                              pivotal-b2b.com
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Media Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="font-medium">Press Contact:</p>
                            <p className="text-muted-foreground">media@pivotal-b2b.com</p>
                          </div>
                          <div>
                            <p className="font-medium">Founded:</p>
                            <p className="text-muted-foreground">2020</p>
                          </div>
                          <div>
                            <p className="font-medium">Industry:</p>
                            <p className="text-muted-foreground">B2B Marketing Services</p>
                          </div>
                          <div>
                            <p className="font-medium">Media Property:</p>
                            <a href="https://www.industryevolve360.com" className="text-primary hover:underline">
                              IndustryEvolve360.com
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Boilerplate</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="prose max-w-none">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">About Pivotal B2B:</span> Pivotal B2B is a 
                            leading provider of B2B marketing solutions specializing in account-based marketing, lead generation, 
                            content syndication, and event marketing. With a data-driven approach, we help B2B companies 
                            identify, engage, and convert high-value prospects into qualified leads. Our customized marketing 
                            strategies enable businesses to streamline their marketing efforts, reduce sales cycles, and achieve 
                            measurable ROI. Learn more at <a href="https://pivotal-b2b.com" className="text-primary hover:underline">pivotal-b2b.com</a>.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Key Metrics Tab */}
              <TabsContent value="metrics" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Key Metrics & Achievements</h2>
                  <p className="text-muted-foreground mb-8">
                    Our performance metrics and achievements across different marketing services.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Account-Based Marketing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p>Conversion Rate Improvement</p>
                            <p className="font-bold text-primary">45%</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Average Deal Velocity</p>
                            <p className="font-bold text-primary">30% Faster</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Account-to-Opportunity</p>
                            <p className="font-bold text-primary">3x Higher</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Lead Generation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p>Qualified Lead Increase</p>
                            <p className="font-bold text-primary">85%</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Intent-Based Targeting ROI</p>
                            <p className="font-bold text-primary">2.5x</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Lead Quality Improvement</p>
                            <p className="font-bold text-primary">60%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Content Syndication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p>Content Engagement Rate</p>
                            <p className="font-bold text-primary">3x Higher</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Lead Generation from Content</p>
                            <p className="font-bold text-primary">200% Increase</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Brand Awareness Lift</p>
                            <p className="font-bold text-primary">150%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Event Marketing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p>Event Attendance Rate</p>
                            <p className="font-bold text-primary">40% Higher</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Registrant-to-Attendee Conversion</p>
                            <p className="font-bold text-primary">75-80%</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Post-Event Engagement</p>
                            <p className="font-bold text-primary">60% Increase</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Overall Business Impact</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center p-4">
                            <p className="text-4xl font-bold text-primary mb-2">300%</p>
                            <p className="text-muted-foreground">Average Lead Quality Improvement</p>
                          </div>
                          <div className="text-center p-4">
                            <p className="text-4xl font-bold text-primary mb-2">40%</p>
                            <p className="text-muted-foreground">Reduction in Sales Cycles</p>
                          </div>
                          <div className="text-center p-4">
                            <p className="text-4xl font-bold text-primary mb-2">2.5x</p>
                            <p className="text-muted-foreground">Average ROI Improvement</p>
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