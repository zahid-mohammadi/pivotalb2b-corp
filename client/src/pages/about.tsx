import { PageBanner } from "@/components/ui/page-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users2, BarChart3, Brain, Globe2, Rocket, Award, ChartBar, Share2, ShieldCheck } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div>
      <MetaTags
        title="About Pivotal B2B - Leading B2B Marketing & Lead Generation Agency"
        description="Discover how Pivotal B2B transforms B2B marketing through data-driven strategies, innovative technology, and measurable results. Learn about our mission, values, and commitment to delivering exceptional B2B marketing solutions."
        keywords="B2B marketing agency, lead generation experts, data-driven marketing, B2B strategy, marketing innovation, business growth solutions, customer success focus, marketing technology, Zahid Mohammadi"
        canonicalUrl="https://pivotal-b2b.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "description": "Leading B2B marketing platform dedicated to helping businesses grow through advanced content management and AI-powered engagement tools",
            "foundingDate": "2023",
            "founder": {
              "@type": "Person",
              "name": "Zahid Mohammadi",
              "jobTitle": "Founder & CEO"
            },
            "knowsAbout": [
              "B2B Marketing",
              "Lead Generation",
              "Content Marketing",
              "Marketing Automation",
              "Account-Based Marketing",
              "Intent Data Analytics"
            ]
          }
        }}
      />
      <PageBanner
        title="About Us"
        description="Transforming B2B marketing through innovation, data-driven strategies, and measurable results."
        pattern="grid"
      />

      <div className="container mx-auto py-16">
        <div className="prose prose-lg max-w-none">
          {/* Mission and Vision Section */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower B2B organizations with cutting-edge marketing solutions that drive 
                      meaningful engagement and measurable growth. Through our innovative approach to 
                      intent-based targeting and content distribution, we're revolutionizing how 
                      businesses connect with their ideal prospects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the global standard in B2B marketing excellence by combining advanced 
                      technology, data-driven insights, and strategic expertise. We envision a future 
                      where every B2B interaction is personalized, meaningful, and drives exceptional 
                      business outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Founder Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Leadership</h2>
            <Card className="hover-lift max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl text-primary font-bold">ZM</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Zahid Mohammadi</h3>
                    <p className="text-primary font-semibold mb-4">Founder & CEO</p>
                    <p className="text-muted-foreground mb-4">
                      As a recognized innovator in B2B marketing technology, Zahid Mohammadi founded Pivotal B2B 
                      with a vision to transform the B2B marketing landscape. With over 15 years of experience 
                      in digital marketing and technology leadership, Zahid has pioneered advanced targeting 
                      methodologies and AI-powered engagement tools that have revolutionized how businesses 
                      approach lead generation and content marketing.
                    </p>
                    <p className="text-muted-foreground">
                      Prior to founding Pivotal B2B, Zahid led digital transformation initiatives for Fortune 500 
                      companies, where he developed expertise in intent data analytics, account-based marketing, 
                      and marketing automation. His innovative approach to B2B marketing has helped numerous 
                      organizations achieve exceptional growth through data-driven strategies and cutting-edge 
                      marketing solutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="hover-lift fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Client Success Focus</h3>
                      <p className="text-muted-foreground">
                        We prioritize our clients' success through dedicated support, strategic guidance, 
                        and continuous optimization of marketing campaigns to ensure exceptional ROI.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <ChartBar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Data-Driven Innovation</h3>
                      <p className="text-muted-foreground">
                        We leverage advanced analytics and AI to deliver actionable insights and measurable 
                        results, constantly evolving our solutions to stay ahead of market trends.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Integrity & Compliance</h3>
                      <p className="text-muted-foreground">
                        We maintain the highest standards of data privacy and regulatory compliance, 
                        ensuring ethical practices in all our marketing operations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Expertise</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Brain,
                  title: "Intent-Based Marketing",
                  description: "Leveraging advanced data analytics to identify and target high-intent prospects with precision"
                },
                {
                  icon: Share2,
                  title: "Multi-Channel Execution",
                  description: "Orchestrating seamless campaigns across multiple channels for maximum engagement"
                },
                {
                  icon: Globe2,
                  title: "Global Reach",
                  description: "Operating across 60+ countries with multilingual campaign capabilities"
                },
                {
                  icon: Award,
                  title: "Industry Recognition",
                  description: "Award-winning solutions and methodologies in B2B marketing"
                }
              ].map((item, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-lg mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "15M+", label: "Qualified Leads Generated" },
              { value: "250+", label: "Active Enterprise Clients" },
              { value: "98%", label: "Client Satisfaction Rate" },
              { value: "60+", label: "Countries Served" }
            ].map((stat, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}