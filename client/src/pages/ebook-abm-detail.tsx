import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Download, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3,
  Lightbulb,
  Rocket,
  BookOpen,
  ArrowRight,
  Award,
  Brain
} from "lucide-react";
import { useLocation } from "wouter";

export default function EbookABMDetail() {
  const [, navigate] = useLocation();
  
  const sections = [
    {
      number: "1",
      title: "Introduction",
      subtitle: "Why Traditional Lead Generation Fails to Deliver Revenue Confidence",
      icon: Lightbulb,
      content: "For years, B2B marketing has been driven by one metric: lead volume. Landing pages, list rentals, generic content syndication — all designed to collect as many email addresses as possible. But here's the problem: Most of those leads were never real buyers. Sales teams waste time sifting through unqualified conversations. Marketing reports \"success,\" while revenue remains unpredictable.",
      highlight: "Your marketing activity must align with account-level strategy and revenue expectations. That's where Account-Based Marketing (ABM) changes the game."
    },
    {
      number: "2",
      title: "The Shift to ABM",
      subtitle: "Targeting Accounts vs. Chasing Contacts",
      icon: Target,
      content: "Traditional lead generation casts a wide net and hopes the right fish swim in. ABM takes the opposite approach.",
      highlight: "ABM is not just a tactic — it's a mindset shift from reach to relevance. Instead of hoping leads turn into opportunities, ABM creates demand inside accounts that match your ideal profile."
    },
    {
      number: "3",
      title: "Building ICP Precision",
      subtitle: "How to Define and Prioritize Ideal Customer Profiles",
      icon: Target,
      content: "Your Ideal Customer Profile (ICP) is not just a description — it's a filter that determines where your time, budget, and sales effort go.",
      points: [
        "Industry & Subsector (SaaS, Cybersecurity, Manufacturing, HR Tech)",
        "Company Size (Headcount or revenue-based tiers)",
        "Technology Stack (CRM platforms, cloud hosting, security tools)",
        "Pain Points (Operational inefficiency, compliance risk, growth blockages)",
        "Buying Committee Complexity (Number of stakeholders involved)"
      ]
    },
    {
      number: "4",
      title: "Engaging the Buying Committee",
      subtitle: "Tailoring Content to Every Stakeholder Role",
      icon: Users,
      content: "In modern B2B, no single person makes the decision. Deals involve multiple stakeholders with different motivations:",
      stakeholders: [
        { role: "CFO", motivation: "ROI, cost savings, financial justification" },
        { role: "CTO / CIO", motivation: "Security, scalability, integration" },
        { role: "Operations / Enablement", motivation: "Workflow fit, adoption ease" },
        { role: "End Users / Managers", motivation: "Productivity & daily usability" }
      ],
      highlight: "ABM success comes from messaging each role differently — while telling a unified story."
    },
    {
      number: "5",
      title: "Content-Led ABM",
      subtitle: "Educating Buyers Early and Shaping Vendor Preference",
      icon: BookOpen,
      content: "Most outreach asks for a meeting. Great ABM offers insight first.",
      contentTypes: [
        { type: "Playbooks / Guides", purpose: "Teach frameworks your buyers can adopt" },
        { type: "Benchmark Reports", purpose: "Show industry trends to drive urgency" },
        { type: "Executive Briefs", purpose: "Help leaders justify change internally" },
        { type: "Use Case Spotlights", purpose: "Connect pain to proven outcomes" }
      ],
      highlight: "When decision-makers learn from you before they buy from you, you become the default vendor of choice."
    },
    {
      number: "6",
      title: "From Awareness to Pipeline",
      subtitle: "Metrics That Prove ABM ROI",
      icon: BarChart3,
      content: "ABM success is not measured in clicks. It's measured in account momentum.",
      metrics: [
        "Account Engagement — Are target accounts responding or consuming content?",
        "Stakeholder Penetration — How many decision-makers per account are active?",
        "Pipeline Contribution — Which ABM accounts are moving into sales-qualified stages?",
        "Revenue Velocity — Are ABM-sourced deals closing faster or at higher rates?"
      ],
      highlight: "This tracking turns ABM from a campaign — into a predictable revenue system."
    },
    {
      number: "7",
      title: "Implementation Framework",
      subtitle: "Step-by-Step ABM Rollout Guide",
      icon: Rocket,
      content: "Follow this structure for ABM activation:",
      phases: [
        { phase: "1. Foundation", actions: "Define ICP → Build account list → Map decision-makers" },
        { phase: "2. Messaging", actions: "Develop role-based positioning → Craft outreach + content sequences" },
        { phase: "3. Launch", actions: "Deploy across email, phone, LinkedIn, retargeting" },
        { phase: "4. Monitor", actions: "Track account-level response → Shift budget to best-performing segments" },
        { phase: "5. Expand", actions: "Deepen engagement → Activate sales for multithreaded conversations" }
      ],
      highlight: "ABM is iterative — not static. The more feedback loops you build, the stronger the system becomes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <MetaTags
        title="The Executive Guide to ABM-Driven Growth | Pivotal B2B"
        description="A strategic framework for transforming B2B marketing from lead volume to revenue precision. Learn how to build effective Account-Based Marketing programs."
        keywords="ABM guide, account-based marketing, B2B strategy, ICP, buying committees, revenue growth"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm">
              <Award className="w-4 h-4 inline mr-2" />
              Executive Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              The Executive Guide to<br />
              <span className="text-blue-300">ABM-Driven Growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              A strategic framework for transforming B2B marketing from lead volume to revenue precision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg"
                data-testid="button-download-pdf"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg"
                onClick={() => navigate("/contact")}
                data-testid="link-contact-us"
              >
                Talk to an Expert
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Inside</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-blue-600">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {section.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-20"
                id={`section-${section.number}`}
              >
                <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
                  {/* Section Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blue-600 mb-2">Chapter {section.number}</div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                      <p className="text-xl text-gray-600">{section.subtitle}</p>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>

                    {/* Points */}
                    {section.points && (
                      <ul className="space-y-3 mb-6">
                        {section.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Stakeholders */}
                    {section.stakeholders && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {section.stakeholders.map((stakeholder, i) => (
                          <div key={i} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <div className="font-bold text-blue-900 mb-1">{stakeholder.role}</div>
                            <div className="text-sm text-gray-700">{stakeholder.motivation}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content Types */}
                    {section.contentTypes && (
                      <div className="space-y-3 mb-6">
                        {section.contentTypes.map((content, i) => (
                          <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                            <Brain className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-gray-900">{content.type}</div>
                              <div className="text-sm text-gray-600">{content.purpose}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metrics */}
                    {section.metrics && (
                      <ul className="space-y-3 mb-6">
                        {section.metrics.map((metric, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Phases */}
                    {section.phases && (
                      <div className="space-y-4 mb-6">
                        {section.phases.map((phase, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-gray-900 mb-1">{phase.phase}</div>
                              <div className="text-gray-600">{phase.actions}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight */}
                    {section.highlight && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-lg p-6 mt-6">
                        <p className="text-lg font-semibold text-gray-900 italic">
                          {section.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Activate ABM Inside Your Target Accounts?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Whether you're just beginning with ABM or scaling an existing framework, Pivotal B2B helps accelerate execution with ICP mapping, content-led engagement programs, multi-stakeholder sequencing, and compliant, validated delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg"
                onClick={() => navigate("/contact")}
                data-testid="button-schedule-call"
              >
                <Target className="w-5 h-5 mr-2" />
                Schedule a Strategy Call
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg"
                onClick={() => navigate("/request-proposal")}
                data-testid="button-request-proposal"
              >
                Request a Proposal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
