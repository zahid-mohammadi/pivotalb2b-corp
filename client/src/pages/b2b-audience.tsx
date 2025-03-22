import { motion } from "framer-motion";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Building2, Users, Target, Filter, MapPin, Database, Laptop, Globe, CheckCircle, Network } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Suspense } from 'react';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10
    }
  }
};

const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.05,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
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

      {/* Enhanced Banner Section with Dynamic Background */}
      <div className="relative bg-[#0a0a1a] text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-primary/20 to-[#0a0a1a]" />

          {/* Multiple layered gradient animations */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"
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

          {/* Geometric patterns */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pattern-${i}`}
              className="absolute"
              style={{
                width: '400px',
                height: '400px',
                border: '2px solid rgba(var(--primary), 0.1)',
                borderRadius: i === 0 ? '50%' : i === 1 ? '30%' : '0%',
                top: `${20 + i * 20}%`,
                right: `${10 + i * 20}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm">135+ Million Professional Profiles</span>
            </motion.div>

            <motion.h1 
              className="text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Connect with Your Ideal B2B Audience
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Leverage our precision targeting capabilities to reach decision-makers across industries, company sizes, and job functions.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24 py-24"
        >
          {/* Account Targeting Section with Glassmorphism Effect */}
          <motion.section 
            variants={itemVariants} 
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 p-12 shadow-xl border border-primary/10"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 shadow-lg">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Account Targeting Capabilities</h2>
                <p className="text-muted-foreground mt-1">Precision targeting for your ideal business accounts</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Building2,
                  title: "Company Information",
                  items: ["Company Name", "Company Size", "Revenue Range", "Growth Stage"]
                },
                {
                  icon: MapPin,
                  title: "Geography & Location",
                  items: ["Global Region", "Country", "State/Province", "City"]
                },
                {
                  icon: Database,
                  title: "Industry Targeting",
                  items: ["Industry Classification", "Business Model", "Market Segment", "Company Maturity"]
                },
                {
                  icon: Laptop,
                  title: "Technology Stack",
                  items: ["Tech Stack", "Digital Infrastructure", "Software Categories", "Implementation Stage"]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-primary/60" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Professional Targeting Section with Dark Theme */}
          <motion.section 
            variants={itemVariants} 
            className="relative rounded-3xl overflow-hidden bg-[#1a1c2e] p-12 text-white"
          >
            {/* Background pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute h-[2px] w-[300px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#60A5FA' : '#818CF8'}, transparent)`,
                    top: `${20 + i * 20}%`,
                    right: `${10 + i * 10}%`,
                    transform: `rotate(${-30 + i * 15}deg)`,
                  }}
                  animate={{
                    x: [-50, 50, -50],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/20 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Professional Targeting Capabilities</h2>
                  <p className="text-white/60 mt-1">Connect with the right decision-makers</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Role & Seniority",
                    items: ["Job Title", "Seniority Level", "Department", "Authority"],
                    iconBg: "bg-blue-500/30",
                    iconColor: "text-blue-200"
                  },
                  {
                    icon: Filter,
                    title: "Experience & Skills",
                    items: ["Years of Experience", "Skills", "Education", "Groups"],
                    iconBg: "bg-purple-500/30",
                    iconColor: "text-purple-200"
                  },
                  {
                    icon: Network,
                    title: "Engagement & Behavior",
                    items: ["Content Interaction", "Platform Usage", "Event Participation", "Research"],
                    iconBg: "bg-indigo-500/30",
                    iconColor: "text-indigo-200"
                  }
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div 
                          className={`p-3 rounded-xl ${category.iconBg} group-hover:bg-opacity-40 transition-colors shadow-lg relative`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-sm" />
                          <category.icon className={`h-6 w-6 ${category.iconColor} relative z-10`} />
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-white/10"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        <h3 className="font-semibold text-white">{category.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/70"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-300" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
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

          {/* Audience Stats Section with Light Theme and Interactive Chart */}
          <motion.section 
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white p-12 border border-primary/10 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 shadow-lg">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Our Total Audience Reach by Job Function</h2>
                <p className="text-muted-foreground mt-1">Connect with professionals across key industries</p>
              </div>
            </div>

            <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading chart...</div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
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
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </Suspense>

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
                  <Card className="p-4 hover:shadow-xl transition-all duration-300 bg-white border border-primary/10">
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
            className="text-center py-12 relative overflow-hidden rounded-3xl bg-[#1a1c2e] text-white"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(var(--primary), 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(var(--primary), 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(var(--primary), 0.2) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Ready to Reach Your Ideal B2B Audience?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Connect with decision-makers and drive meaningful engagement with our precision targeting capabilities.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg group relative overflow-hidden"
                  onClick={() => window.location.href = '/contact'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">Start Your Campaign</span>
                </Button>
              </motion.div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
}