import { PageBanner } from "@/components/ui/page-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users2, Brain, Globe2, Award, ChartBar, Share2, ShieldCheck, LinkedinIcon, TwitterIcon } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
        {/* Leadership Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Leadership
          </h2>
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Visual Section */}
                <div className="relative min-h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                  <div className="relative z-10">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-xl">
                      <span className="text-6xl text-primary font-bold">ZM</span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <LinkedinIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <TwitterIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {/* Content Section */}
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold mb-2">Zahid Mohammadi</h3>
                  <p className="text-primary font-semibold mb-4">Founder & CEO</p>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      As a recognized innovator in B2B marketing technology, Zahid Mohammadi founded Pivotal B2B 
                      with a vision to transform the B2B marketing landscape. With over 15 years of experience 
                      in digital marketing and technology leadership, Zahid has pioneered advanced targeting 
                      methodologies and AI-powered engagement tools.
                    </p>
                    <p>
                      Prior to founding Pivotal B2B, Zahid led digital transformation initiatives for Fortune 500 
                      companies, developing expertise in intent data analytics, account-based marketing, 
                      and marketing automation. His innovative approach has consistently delivered exceptional 
                      growth through data-driven strategies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission and Vision Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Our Purpose</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden hover-lift group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
              <CardContent className="p-8 relative">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To empower B2B organizations with cutting-edge marketing solutions that drive 
                      meaningful engagement and measurable growth. Through our innovative approach to 
                      intent-based targeting and content distribution, we're revolutionizing how 
                      businesses connect with their ideal prospects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden hover-lift group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-primary/10 to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
              <CardContent className="p-8 relative">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
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
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users2,
                title: "Client Success Focus",
                description: "We prioritize our clients' success through dedicated support, strategic guidance, and continuous optimization of marketing campaigns to ensure exceptional ROI.",
                gradient: "from-blue-500/20 via-primary/20 to-purple-500/20"
              },
              {
                icon: ChartBar,
                title: "Data-Driven Innovation",
                description: "We leverage advanced analytics and AI to deliver actionable insights and measurable results, constantly evolving our solutions to stay ahead of market trends.",
                gradient: "from-purple-500/20 via-primary/20 to-pink-500/20"
              },
              {
                icon: ShieldCheck,
                title: "Integrity & Compliance",
                description: "We maintain the highest standards of data privacy and regulatory compliance, ensuring ethical practices in all our marketing operations.",
                gradient: "from-pink-500/20 via-primary/20 to-rose-500/20"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full group hover-lift overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardContent className="p-8 relative">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Our Expertise</h2>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "15M+", label: "Qualified Leads Generated" },
            { value: "250+", label: "Active Enterprise Clients" },
            { value: "98%", label: "Client Satisfaction Rate" },
            { value: "60+", label: "Countries Served" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="text-center hover-lift overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}