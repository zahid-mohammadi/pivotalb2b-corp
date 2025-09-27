import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, TrendingUp, Users, CheckCircle } from "lucide-react";

export function LeadGeneration() {
  const benefits = [
    "BANT-qualified prospects with verified budget and authority",
    "AI-powered lead scoring and qualification",
    "Multi-channel outreach for maximum reach",
    "Real-time lead tracking and analytics",
    "Dedicated account management support"
  ];

  const stats = [
    { value: "300%", label: "Average Pipeline Growth" },
    { value: "85%", label: "Lead Quality Score" },
    { value: "72hrs", label: "Average Response Time" },
    { value: "40+", label: "Industries Served" }
  ];

  return (
    <>
      <Helmet>
        <title>B2B Lead Generation Services | Qualified Leads | Pivotal B2B</title>
        <meta 
          name="description" 
          content="Generate qualified B2B leads with our proven lead generation services. BANT-qualified prospects, AI-powered scoring, and guaranteed results for B2B pipeline growth." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
                B2B Lead Generation Services
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Transform your marketing spend into qualified B2B leads that drive revenue growth. Our proven lead generation services deliver BANT-qualified prospects ready to buy.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Our Lead Generation Services?
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our B2B lead generation process combines advanced technology with human expertise to deliver qualified leads that convert into customers.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 gap-6"
              >
                <div className="bg-gradient-to-br from-primary/10 to-purple-100 rounded-2xl p-8">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Precision Targeting</h3>
                  <p className="text-slate-600">
                    Identify and engage your ideal customers with laser-focused targeting based on firmographics, technographics, and behavioral data.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8">
                  <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Scalable Growth</h3>
                  <p className="text-slate-600">
                    Build a predictable pipeline that scales with your business goals and revenue targets.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Generate Qualified B2B Leads?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start building your pipeline with leads that convert. Get a custom strategy call today.
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Get Free Strategy Call
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}