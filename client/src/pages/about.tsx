import { PageBanner } from "@/components/ui/page-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users2, Brain, Globe2, Award, ChartBar, Share2, ShieldCheck, LinkedinIcon, TwitterIcon, NewspaperIcon, UsersIcon, BookOpenIcon } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

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

      {/* Hero Section with Background Pattern */}
      <div className="relative bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.1]" />
        <PageBanner
          title="About Us"
          description="Transforming B2B marketing through innovation, data-driven strategies, and measurable results."
          pattern="grid"
          className="relative z-10"
        />
      </div>

      <div className="container mx-auto py-16">
        {/* Leadership Section with Enhanced Visual Design */}
        <motion.div {...fadeInUp} className="mb-32">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Leadership
          </h2>
          <Card className="max-w-5xl mx-auto overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Visual Section with Animation */}
                <div className="relative min-h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 p-12 flex items-center justify-center group">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="w-80 h-80 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-primary/20 transform group-hover:rotate-3 transition-transform duration-300"
                    >
                      <img
                        src="/Zahid Mohammadi.jpeg"
                        alt="Zahid Mohammadi - Founder & CEO"
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                        loading="eager"
                      />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/80 transition-colors duration-300"
                      onClick={() => window.open('https://www.linkedin.com/in/zahid-m/', '_blank')}
                      aria-label="Visit Zahid Mohammadi's LinkedIn profile"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/80 transition-colors duration-300"
                      onClick={() => window.open('https://twitter.com/', '_blank')}
                      aria-label="Visit Zahid Mohammadi's Twitter profile"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {/* Content Section with Enhanced Typography */}
                <div className="p-12 bg-white">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold mb-2">Zahid Mohammadi</h3>
                    <p className="text-primary font-semibold mb-6 text-lg">Founder & CEO</p>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
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
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Purpose Section with Overlapping Cards */}
        <motion.div {...fadeInUp} className="mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10 rounded-3xl" />
          <h2 className="text-5xl font-bold mb-16 text-center">Our Purpose</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="relative overflow-hidden hover-lift group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
                <CardContent className="p-8 relative">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-white rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="relative overflow-hidden hover-lift group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-primary/10 to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
                <CardContent className="p-8 relative">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-white rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
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
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section with Hexagonal Grid */}
        <motion.div {...fadeInUp} className="mb-32">
          <h2 className="text-5xl font-bold mb-16 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
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
                <Card className="relative overflow-hidden group transform hover:scale-105 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
                  <CardContent className="p-8 relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 mb-6">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expertise Section with Interactive Cards */}
        <motion.div {...fadeInUp} className="mb-32">
          <h2 className="text-5xl font-bold mb-16 text-center">Our Expertise</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
                <Card className="relative overflow-hidden group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
                  <CardContent className="p-8 relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 mb-6">
                        <item.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statistics with Animated Counters */}
        <motion.div {...fadeInUp} className="mb-32">
          <div className="relative py-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
            <div className="relative">
              <h2 className="text-5xl font-bold mb-16 text-center">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                {[
                  { value: "15M+", label: "Qualified Leads Generated" },
                  { value: "250+", label: "Active Enterprise Clients" },
                  { value: "98%", label: "Client Satisfaction Rate" },
                  { value: "60+", label: "Countries Served" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardContent className="p-8 relative text-center">
                        <motion.div
                          initial={{ scale: 0.9 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="text-4xl font-bold text-primary mb-3"
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Media Property Section with Enhanced Visual Design */}
        <motion.div {...fadeInUp} className="mb-32">
          <div className="relative py-16 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 text-white">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.1]" />
            <div className="relative">
              <h2 className="text-5xl font-bold mb-16 text-center text-white">Our Media Property</h2>
              <Card className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-12">
                  <div className="text-center mb-12">
                    <p className="text-xl text-white/90 mb-8">
                      A sub-division of Pivotal B2B LLC, empowering you to navigate the evolving B2B tech landscape - completely free.
                    </p>
                    <div className="flex justify-center gap-6">
                      <Button 
                        onClick={() => window.open('https://www.industryevolve360.com', '_blank')}
                        className="gap-2 bg-white text-primary hover:bg-white/90"
                      >
                        <Globe2 className="h-4 w-4" />
                        Visit Website
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => window.open('https://www.linkedin.com/showcase/industry-svolve-360', '_blank')}
                        className="gap-2 border-white text-white hover:bg-white/20"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                        Follow on LinkedIn
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: NewspaperIcon,
                        title: "Free, Cutting-Edge Content",
                        description: "Access exclusive news, expert analysis, and in-depth reports on the most impactful B2B technologies."
                      },
                      {
                        icon: UsersIcon,
                        title: "Connect with Leaders",
                        description: "Network with industry visionaries at our complimentary webinars, forums, and conferences featuring cutting-edge solutions."
                      },
                      {
                        icon: BookOpenIcon,
                        title: "Empowering Resources",
                        description: "Download informative white papers, ebooks, infographics, and solution briefs from leading B2B software providers - all at no cost."
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Card className="relative overflow-hidden h-full group bg-white/5 border-white/10 backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <CardContent className="p-8 relative">
                            <div className="mb-6">
                              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-7 w-7 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                            <p className="text-white/80">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}