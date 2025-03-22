import { motion } from "framer-motion";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Building2, Users, Target, Filter, MapPin, Database, Laptop, Globe, CheckCircle, Network, LineChart as LucideLineChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

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

const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Infinity
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

      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-primary/20 to-[#0a0a1a] text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm">135+ Million Professional Profiles</span>
            </motion.div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connect with Your Ideal B2B Audience
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl">
              Leverage our precision targeting capabilities to reach decision-makers across industries, company sizes, and job functions. Drive meaningful engagement with the right professionals at the right time.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Enhanced Account Targeting Section */}
          <motion.section 
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Animated background patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
            <div className="absolute inset-0">
              {/* Business-themed animated patterns */}
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute h-[2px] w-[200px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#60A5FA' : '#818CF8'}, transparent)`,
                      top: `${20 + i * 20}%`,
                      right: `${10 + i * 5}%`,
                      transform: `rotate(${-30 + i * 15}deg)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      x: [-20, 20, -20],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-xl bg-primary/10 shadow-lg"
                >
                  <Building2 className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Account Targeting Capabilities</h2>
                  <p className="text-muted-foreground mt-1">Precision targeting for your ideal business accounts</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-12 max-w-3xl">
                Identify and engage the exact companies that align with your goals. Our account-based targeting leverages detailed filters to pinpoint high-value organizations with precision.
              </p>

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
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl blur group-hover:opacity-100 opacity-0 transition-opacity" />
                    <Card className="relative h-full p-6 hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-3 mb-6"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{category.title}</h3>
                      </motion.div>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <div className="relative">
                              <CheckCircle className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                              <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-full"
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0, 0.2, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: itemIndex * 0.2
                                }}
                              />
                            </div>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          scaleX: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Enhanced Professional Targeting Section */}
          <motion.section 
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-background to-background/80 p-12"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0">
              {/* Network connection pattern */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`network-${i}`}
                  className="absolute"
                  style={{
                    width: '300px',
                    height: '300px',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    border: '2px solid rgba(var(--primary), 0.1)',
                    borderRadius: '50%',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-xl bg-primary/10 shadow-lg"
                >
                  <Users className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Professional Targeting Capabilities</h2>
                  <p className="text-muted-foreground mt-1">Connect with the right decision-makers</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-12 max-w-3xl">
                Reach decision-makers and influencers with precision. Our professional targeting allows you to connect with the right individuals based on their role, experience, and engagement patterns.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl blur group-hover:opacity-100 opacity-0 transition-opacity" />
                    <Card className="relative h-full p-8 hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-4 mb-6"
                      >
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                      </motion.div>
                      <ul className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <div className="relative mt-1">
                              <CheckCircle className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                              <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-full"
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0, 0.2, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: itemIndex * 0.2
                                }}
                              />
                            </div>
                            <span className="leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          scaleX: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Enhanced Audience Stats Section with Chart */}
          <motion.section
            variants={itemVariants}
            className="relative bg-gradient-to-br from-background to-background/80 rounded-3xl p-8 border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Total Audience Reach by Job Function</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
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
                          style={{ filter: 'brightness(1.1)' }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[200px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={audienceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--primary), 0.1)" />
                    <XAxis
                      dataKey="name"
                      tick={false}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="rgb(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'rgb(var(--primary))', r: 4 }}
                      activeDot={{ r: 8, fill: 'rgb(var(--primary))', stroke: 'white', strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

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
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 bg-white/50 backdrop-blur-sm">
                    <h3 className="text-sm text-muted-foreground mb-1 line-clamp-1">{stat.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}M+</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Enhanced CTA Section */}
          <motion.section
            variants={itemVariants}
            className="text-center py-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl -z-10" />
            <h2 className="text-3xl font-bold mb-4">Ready to Reach Your Ideal B2B Audience?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with decision-makers and drive meaningful engagement with our precision targeting capabilities.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 shadow-lg group relative overflow-hidden"
                onClick={() => window.location.href = '/contact'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Start Your Campaign</span>
              </Button>
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
}