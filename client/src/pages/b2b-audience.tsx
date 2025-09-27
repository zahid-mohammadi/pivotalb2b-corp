import { motion } from "framer-motion";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Building2, Users, Target, Filter, MapPin, Database, Laptop, Globe, CheckCircle, Network, TrendingUp, Zap, Eye, Clock, Award, Rocket } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie } from 'recharts';
import { Suspense } from 'react';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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
      repeatType: "reverse" as const
    }
  }
};

export default function B2BAudiencePage() {
// Real B2B audience data based on industry standards
const audienceData = [
  { name: 'Information Technology', value: 42, displayValue: '42', color: '#3B82F6', growth: '+15%' },
  { name: 'Sales & Business Development', value: 26, displayValue: '26', color: '#60A5FA', growth: '+12%' },
  { name: 'Marketing & Communications', value: 24, displayValue: '24', color: '#818CF8', growth: '+18%' },
  { name: 'Human Resources', value: 14, displayValue: '14', color: '#A78BFA', growth: '+8%' },
  { name: 'Operations & Management', value: 12.8, displayValue: '12.8', color: '#C084FC', growth: '+6%' },
  { name: 'Finance & Accounting', value: 10, displayValue: '10', color: '#E879F9', growth: '+10%' },
  { name: 'Executive Leadership', value: 8.2, displayValue: '8.2', color: '#F472B6', growth: '+5%' },
  { name: 'Engineering & R&D', value: 6.5, displayValue: '6.5', color: '#FB7185', growth: '+20%' },
  { name: 'Customer Success', value: 4.3, displayValue: '4.3', color: '#FCA5A5', growth: '+25%' },
  { name: 'Product Management', value: 3.7, displayValue: '3.7', color: '#FBBF24', growth: '+22%' }
].sort((a, b) => b.value - a.value);

// Industry distribution data
const industryData = [
  { name: 'Enterprise Software', value: 28, color: '#3B82F6' },
  { name: 'Financial Services', value: 22, color: '#10B981' },
  { name: 'Healthcare & Biotech', value: 18, color: '#F59E0B' },
  { name: 'Manufacturing', value: 15, color: '#EF4444' },
  { name: 'Professional Services', value: 12, color: '#8B5CF6' },
  { name: 'Others', value: 5, color: '#6B7280' }
];

// Real performance metrics
const performanceMetrics = [
  { icon: Eye, title: 'Profile Views', value: '2.4M+', subtitle: 'Monthly Active Reach', color: 'from-blue-500 to-cyan-500' },
  { icon: TrendingUp, title: 'Engagement Rate', value: '34%', subtitle: 'Above Industry Average', color: 'from-green-500 to-emerald-500' },
  { icon: Target, title: 'Match Accuracy', value: '92%', subtitle: 'ICP Targeting Precision', color: 'from-purple-500 to-indigo-500' },
  { icon: Clock, title: 'Response Time', value: '4.2hrs', subtitle: 'Average Lead Response', color: 'from-orange-500 to-red-500' },
  { icon: Award, title: 'Data Quality', value: '98.7%', subtitle: 'Verified Professional Data', color: 'from-pink-500 to-rose-500' },
  { icon: Rocket, title: 'Conversion Rate', value: '18.5%', subtitle: 'Lead to Opportunity', color: 'from-teal-500 to-cyan-500' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = audienceData.find(item => item.name === label);
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-primary/20">
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        <p className="text-primary text-xl font-bold">{data?.displayValue} Million Professionals</p>
        <p className="text-green-600 text-sm font-medium mt-1">Growth: {data?.growth}</p>
      </div>
    );
  }
  return null;
};

return (
  <>
    <MetaTags
      title="B2B Audience Reach & Targeting | Pivotal B2B - 135M+ Verified Professionals"
      description="Connect with 135M+ verified enterprise professionals across key job functions. Precision targeting capabilities for B2B marketing campaigns with 92% accuracy rate."
      keywords="B2B audience targeting, professional database, enterprise leads, verified contacts, precision marketing, job function targeting"
    />

    {/* Enhanced Hero Section with Particle Effects */}
    <div className="relative bg-gradient-to-br from-[#0a0a1a] via-[#1a1b3a] to-[#0a0a1a] text-white py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Particle effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Geometric patterns */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pattern-${i}`}
            className="absolute border-2 border-primary/20"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: i === 0 ? '50%' : i === 1 ? '30%' : '0%',
              top: `${10 + i * 25}%`,
              right: `${5 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 25 + i * 5,
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm mb-8 border border-white/30"
          >
            <Globe className="h-6 w-6 text-blue-300" />
            <span className="text-lg font-medium">Real-Time Verified Professional Database</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              135+ Million
            </span>
            <br />
            <span className="text-white/90">Verified B2B Professionals</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/80 mb-12 leading-relaxed max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Connect directly with decision-makers who have real buying power. Our precision targeting helps you reach the exact professionals driving revenue in their organizations—across industries, geographies, and seniority levels.
          </motion.p>

          {/* Enhanced stats grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { value: '135M+', label: 'Verified Professionals', icon: Users },
              { value: '50K+', label: 'Enterprise Companies', icon: Building2 },
              { value: '25K+', label: 'Technologies Tracked', icon: Database },
              { value: '92%', label: 'Targeting Accuracy', icon: Target }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-300" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
        {/* Performance Metrics Section */}
        <motion.section
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 p-12 shadow-2xl border border-primary/10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Real Performance Metrics</h2>
            <p className="text-muted-foreground text-lg">Proven results from our B2B audience platform</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <Card className="h-full p-6 text-center border-0 shadow-lg relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} mb-4 shadow-lg`}>
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Audience Stats Section with Interactive Chart */}
        <motion.section
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white p-12 border border-primary/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 shadow-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-4xl font-bold">Audience Reach by Job Function</h2>
              <p className="text-muted-foreground mt-2 text-lg">Connect with verified professionals across key business functions</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>100% Verified Profiles</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Real-Time Updates</span>
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading interactive chart...</div>}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-primary/5"
            >
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={audienceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--primary), 0.1)" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      domain={[0, 45]}
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
                      radius={[8, 8, 0, 0]}
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

          {/* Enhanced stats grid below chart */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
          >
            {audienceData.slice(0, 5).map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="relative group"
              >
                <Card className="p-4 hover:shadow-xl transition-all duration-300 bg-white border border-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-sm text-muted-foreground mb-1 line-clamp-2">{stat.name}</h3>
                  <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.displayValue}M</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Professionals</span>
                    <span className="text-xs font-medium text-green-600">{stat.growth}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Industry Distribution Section */}
        <motion.section
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden bg-[#1a1c2e] p-12 text-white"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/20 shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold">Industry Distribution</h2>
              <p className="text-white/70 mt-2 text-lg">Coverage across major business sectors</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-6">
                {industryData.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: industry.color }}
                      />
                      <span className="text-white/90">{industry.name}</span>
                    </div>
                    <span className="font-bold text-xl">{industry.value}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80">
                <Suspense fallback={<div className="w-80 h-80 flex items-center justify-center">Loading chart...</div>}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        dataKey="value"
                        stroke="none"
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Suspense>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Targeting Capabilities */}
        <motion.section
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 p-12 shadow-2xl border border-primary/10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Precision Targeting Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Advanced filters and AI-powered matching to connect you with your ideal prospects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Company Intelligence",
                items: ["Revenue Range: $1M - $50B+", "Employee Count: 10 - 500K+", "Growth Stage & Funding", "Technology Stack"],
                iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
                stats: "50K+ Companies"
              },
              {
                icon: MapPin,
                title: "Geographic Precision",
                items: ["195 Countries Coverage", "State/Province Level", "Metro Area Targeting", "Timezone Optimization"],
                iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
                stats: "Global Reach"
              },
              {
                icon: Target,
                title: "Role & Seniority",
                items: ["C-Suite & VP Level", "Department Heads", "Decision Makers", "Budget Authority"],
                iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500",
                stats: "92% Accuracy"
              },
              {
                icon: Network,
                title: "Behavioral Signals",
                items: ["Content Engagement", "Event Participation", "Tech Adoption", "Buying Intent"],
                iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
                stats: "Real-Time Data"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <Card className="h-full p-6 hover:shadow-2xl transition-all duration-300 bg-white border border-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div
                    className={`w-16 h-16 rounded-xl ${category.iconBg} flex items-center justify-center mb-6 shadow-lg relative`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <div className="text-sm text-primary font-medium mb-4">{category.stats}</div>
                  
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced CTA Section */}
        <motion.section
          variants={itemVariants}
          className="text-center py-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1c2e] via-[#2a2d5a] to-[#1a1c2e] text-white"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(var(--primary), 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(var(--primary), 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, rgba(var(--primary), 0.3) 0%, transparent 50%)",
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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">Ready to Connect with Your Ideal Prospects?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join 500+ B2B companies using our precision targeting to generate qualified pipeline and accelerate revenue growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-xl group relative overflow-hidden px-8 py-4 text-lg font-semibold"
                    onClick={() => window.location.href = '/request-proposal'}
                  >
                    <span className="relative z-10">Start Targeting Today</span>
                    <Zap className="ml-2 h-5 w-5 relative z-10" />
                  </Button>
                </motion.div>
                
                <div className="text-sm text-white/60">
                  Free consultation • No long-term contracts
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Setup in 48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>ROI guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Dedicated support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  </>
);
}