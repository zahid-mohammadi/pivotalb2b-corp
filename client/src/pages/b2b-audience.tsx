import { motion } from "framer-motion";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Building2, Users, Target, Filter, MapPin, Database, Laptop, Globe, CheckCircle, Network } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function B2BAudiencePage() {
  const audienceData = [
    { name: 'Information Technology', value: 42, color: 'rgb(var(--primary))' },
    { name: 'Sales', value: 26, color: '#60A5FA' },
    { name: 'Marketing', value: 24, color: '#818CF8' },
    { name: 'Human Resources', value: 14, color: '#A78BFA' },
    { name: 'Operations', value: 12.8, color: '#C084FC' },
    { name: 'Finance', value: 10, color: '#E879F9' },
    { name: 'Executive Management', value: 2, color: '#F472B6' },
    { name: 'Supply Chain', value: 1.8, color: '#FB7185' },
    { name: 'Learning & Development', value: 1.5, color: '#FCA5A5' },
    { name: 'Customer Experience', value: 0.7, color: '#FBBF24' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20">
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-primary text-lg font-bold">{payload[0].value}M+ Professionals</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <MetaTags
        title="B2B Audience Reach & Targeting | Pivotal B2B"
        description="Connect with over 135 million professionals across key job functions. Precision targeting capabilities for B2B marketing campaigns across industries and job roles."
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-primary/20 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.2),transparent_70%)]" />

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8 border border-white/20"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-white/90 font-medium">135+ Million Professional Profiles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold mb-6"
            >
              Target Your Ideal B2B Audience with Precision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl"
            >
              Leverage our advanced targeting capabilities to connect with decision-makers across industries, company sizes, and job functions. Drive meaningful engagement with the right professionals at exactly the right time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-colors shadow-xl"
                onClick={() => window.location.href = '/contact'}
              >
                Start Targeting Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Account Targeting Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Account Targeting Capabilities</h2>
                <p className="text-muted-foreground mt-1">Precision targeting for your ideal business accounts</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Company Information",
                  items: [
                    "Company Name: Target specific businesses",
                    "Company Size: Filter by employee count",
                    "Revenue Range: Target by company value",
                    "Growth Stage: From startup to enterprise"
                  ]
                },
                {
                  icon: MapPin,
                  title: "Geography & Location",
                  items: [
                    "Global Region: Continental targeting",
                    "Country: Nation-specific campaigns",
                    "State/Province: Regional focus",
                    "City: Local market targeting"
                  ]
                },
                {
                  icon: Database,
                  title: "Industry Targeting",
                  items: [
                    "Industry Classification: NAICS/SIC codes",
                    "Business Model: B2B, B2C, or hybrid",
                    "Market Segment: Vertical specialization",
                    "Company Maturity: Stage-based targeting"
                  ]
                },
                {
                  icon: Laptop,
                  title: "Technology Stack",
                  items: [
                    "Tech Stack: 21,000+ technologies",
                    "Digital Infrastructure: Cloud/On-prem",
                    "Software Categories: By function",
                    "Implementation Stage: New/Established"
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card className="h-full p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Professional Targeting Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Professional Targeting Capabilities</h2>
                <p className="text-muted-foreground mt-1">Connect with the right decision-makers</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Role & Seniority",
                  items: [
                    "Job Title: Exact or pattern matching",
                    "Seniority Level: C-suite to specialists",
                    "Department: Function-specific targeting",
                    "Purchasing Authority: Decision makers"
                  ]
                },
                {
                  icon: Filter,
                  title: "Experience & Skills",
                  items: [
                    "Years of Experience: Career stage",
                    "Skills & Certifications: Expertise",
                    "Education: Academic background",
                    "Professional Groups: Community involvement"
                  ]
                },
                {
                  icon: Network,
                  title: "Engagement & Behavior",
                  items: [
                    "Content Interaction: Topic interests",
                    "Platform Usage: Activity patterns",
                    "Event Participation: Webinar attendance",
                    "Research Behavior: Download history"
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card className="h-full p-8 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 mt-1 text-primary/60 group-hover:text-primary transition-colors" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Audience Stats Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Total Audience Reach by Job Function</h2>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={audienceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--primary), 0.1)" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    label={{
                      value: 'Millions of Professionals',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fill: 'hsl(var(--muted-foreground))' }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                  >
                    {audienceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
            >
              {audienceData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Card className="p-4 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-sm text-muted-foreground mb-1 line-clamp-1">{stat.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}M+</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            variants={itemVariants}
            className="text-center py-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Reach Your Ideal B2B Audience?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with decision-makers and drive meaningful engagement with our precision targeting capabilities.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Campaign
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
}