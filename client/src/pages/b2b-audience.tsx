import { motion } from "framer-motion";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Building2, Users, Target, Filter, MapPin, Database, Laptop, Globe, CheckCircle } from "lucide-react";

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
          {/* Account Targeting Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Account Targeting Capabilities</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Identify and engage the exact companies that align with your goals. Our account-based targeting leverages detailed filters to pinpoint high-value organizations with precision.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  title: "Industry & Technology",
                  items: [
                    "Industry Classification: NAICS/SIC codes",
                    "Technology Stack: 21,000+ technologies",
                    "Digital Presence: Online footprint",
                    "Business Model: B2B, B2C, or hybrid"
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
                  <Card className="relative h-full p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Professional Targeting Section with enhanced visuals */}
          <motion.section variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Professional Targeting Capabilities</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Reach decision-makers and influencers with precision. Our professional targeting allows you to connect with the right individuals based on their role, experience, and engagement patterns.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  icon: Laptop,
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
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Enhanced Audience Stats Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Total Audience Reach by Job Function</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: 'Information Technology', count: '42M+' },
                { title: 'Sales', count: '26M+' },
                { title: 'Marketing', count: '24M+' },
                { title: 'Human Resources', count: '14M+' },
                { title: 'Operations', count: '12.8M+' },
                { title: 'Finance', count: '10M+' },
                { title: 'Supply Chain', count: '1.8M+' },
                { title: 'Executive Management', count: '2M+' },
                { title: 'Learning & Development', count: '1.5M+' },
                { title: 'Customer Experience', count: '0.7M+' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                    <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-primary">{stat.count}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
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