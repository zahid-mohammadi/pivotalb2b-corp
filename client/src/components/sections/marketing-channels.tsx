import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, FormInput, Phone } from "lucide-react";

export function MarketingChannels() {
  const channels = [
    {
      icon: Mail,
      title: "Email Outreach",
      description: "Educate and influence decision-makers with compliant, personalized messaging that builds trust and drives action.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FormInput,
      title: "Landing Pages & Form Fills",
      description: "Capture high-intent interest through conversion-optimized pages and gated assets that deliver qualified leads.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "Phone Outreach",
      description: "Accelerate engagement with direct, one-to-one conversations that validate intent and open doors for sales.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="marketing-channels" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Multi-Channel Outreach That Reaches Buyers Where They Are
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your prospects don't live in one channel — and neither do we. Our programs integrate proven outreach methods to ensure consistent engagement, stronger responses, and higher-quality opportunities.
            </p>
          </motion.div>

          {/* Channel Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {channels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <channel.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {channel.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {channel.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              Discover How Multi-Channel Programs Drive More Qualified Leads
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              See how our integrated approach delivers better results than single-channel tactics alone.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/request-proposal'}
              data-testid="button-request-proposal"
            >
              Request a Proposal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}