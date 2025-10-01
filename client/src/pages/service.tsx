import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  Rocket,
  TrendingUp,
  MessageSquare,
  Calendar,
  FileText,
  Sparkles,
} from "lucide-react";
import type { Service } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const calendlyUrl = "https://calendly.com/zahid-m/30min";

  const industries = [
    "Enterprise Software",
    "Telecommunication", 
    "Financial Services",
    "IT Services and Consulting",
    "Professional Services",
    "B2B Vendors",
    "B2B Marketing Agencies"
  ];

  const serviceContent: Record<string, {
    headline: string;
    subheadline: string;
    keyOutcomes: string[];
    methodology: Array<{ title: string; description: string }>;
    whyChoose: string;
    faqs: Array<{ question: string; answer: string }>;
  }> = {
    "account-based-marketing-abm-programs": {
      headline: "Engage Entire Buying Committees Before Competitors Do",
      subheadline: "Our ABM programs help you build influence inside your Target Accounts — connecting with decision-makers across the org long before they enter vendor comparison mode.",
      keyOutcomes: [
        "Reach decision-makers within your highest-value Target Accounts",
        "Drive multi-stakeholder engagement across the full buying committee",
        "Educate buyers early with insight-led messaging and positioning",
        "Build preference before pricing discussions ever begin"
      ],
      methodology: [
        {
          title: "Target Account Intelligence",
          description: "We work with your sales and marketing team to identify priority accounts and map decision-makers, influencers, and stakeholders involved in buying decisions."
        },
        {
          title: "Insight-Led Messaging Development",
          description: "We build narratives aligned with industry pain points, business challenges, and strategic priorities relevant to those accounts — positioning your solution as the best-fit partner."
        },
        {
          title: "Multi-Channel Activation",
          description: "We orchestrate outreach across email, phone, content distribution, and strategic touchpoints designed to reach buyers wherever they are already active and consuming information."
        },
        {
          title: "Engagement and Qualification Hand-Off",
          description: "When key contacts show interest or interaction, we qualify readiness, gather context, and transition them to your sales team with insight notes and interaction history."
        }
      ],
      whyChoose: "Most ABM efforts focus on ads and branding instead of actual engagement. We focus on real conversations inside target accounts — not impressions. Instead of waiting for buyers to come to you, we strategically position your brand as a trusted partner before formal evaluation begins.",
      faqs: [
        {
          question: "How is this different from traditional lead generation?",
          answer: "Lead generation often delivers individual contacts without context. ABM focuses on full account penetration — ensuring multiple stakeholders are aware, educated, and aligned before sales enters the conversation."
        },
        {
          question: "Can this work if we already have a list of Target Accounts defined?",
          answer: "Yes. We can either work with your existing Target Account list or help refine and expand it using our data enrichment and research capabilities."
        },
        {
          question: "How do you handle messaging across different roles within one account?",
          answer: "We develop tailored messaging tracks for economic buyers, technical evaluators, and influencers — ensuring each stakeholder receives communication aligned to their priorities."
        },
        {
          question: "How will results be reported?",
          answer: "You receive regular visibility into account engagement, contact-level interactions, and activation patterns so you know exactly where traction is building inside each account."
        }
      ]
    },
    "b2b-lead-generation-qualification": {
      headline: "Fill Your Pipeline with Buyers Who Are Ready to Talk",
      subheadline: "We identify, engage, and qualify prospects that match your Ideal Customer Profile — delivering only opportunities with genuine interest, authority, and alignment.",
      keyOutcomes: [
        "Consistent flow of sales-ready conversations from your ICP",
        "No time wasted on unqualified or uninterested prospects",
        "Confidence that every lead is worth pursuing",
        "Scalable program aligned with revenue goals"
      ],
      methodology: [
        {
          title: "Ideal Customer Profile Alignment",
          description: "We work with your team to clearly define qualifying criteria across industry, company size, tech stack, pain points, and buying triggers."
        },
        {
          title: "Strategic Outreach with Relevant Messaging",
          description: "We use insight-driven messaging to connect with prospects through email, phone, and landing pages — focused on their challenges, not just your features."
        },
        {
          title: "Human Validation and Interest Confirmation",
          description: "Every lead is engaged and verified by real people — ensuring genuine engagement rather than automated form fills."
        },
        {
          title: "Qualified Handoff",
          description: "Only the prospects demonstrating relevance and readiness are passed to your sales team — along with context and engagement history."
        }
      ],
      whyChoose: "Most lead providers deliver lists — we deliver real conversations. Instead of chasing random contacts, your team speaks only with buyers who meet your standards and show interest.",
      faqs: [
        {
          question: "Can you integrate directly with our CRM?",
          answer: "Yes. We seamlessly deliver qualified leads into your CRM or platform of choice with full tagging and notes to support tracking and follow-up."
        },
        {
          question: "What level of qualification is included?",
          answer: "We assess basic fit, interest, and need. If you require deeper qualification layers such as timeline or budget, we can include that as part of the engagement process."
        },
        {
          question: "Do you use automation or manual outreach?",
          answer: "We combine scalable systems with human validation to ensure outreach is compliant, relevant, and respectful — without risking deliverability or reputation."
        },
        {
          question: "How quickly can a program begin?",
          answer: "Most lead generation programs begin within weeks once ICP and messaging alignment is complete."
        }
      ]
    },
    "precision-demand-generation": {
      headline: "Turn Early Interest into Measurable Pipeline",
      subheadline: "We identify in-market accounts and educate decision-makers with content-driven programs that build trust long before they speak to sales.",
      keyOutcomes: [
        "Engage buyers at the research stage — not just when they request demos",
        "Build authority and preference before formal vendor evaluation begins",
        "Align marketing efforts to real buying signals, not guesswork",
        "Create momentum across the full buyer journey"
      ],
      methodology: [
        {
          title: "Intent and Behavior Tracking",
          description: "We monitor signals across search, engagement, and industry activity to identify accounts likely to be exploring solutions like yours."
        },
        {
          title: "Thought Leadership and Educational Messaging",
          description: "We craft content that speaks directly to their challenges, helping them frame the problem and see your approach as a clear solution."
        },
        {
          title: "Account-Level Activation",
          description: "We reach stakeholders across multiple channels, ensuring your message is seen consistently across email, ads, and curated touchpoints."
        },
        {
          title: "Engagement Scoring and Sales Handoff",
          description: "Only accounts demonstrating meaningful interaction are prioritized for sales outreach — with timing, context, and messaging history provided."
        }
      ],
      whyChoose: "Most demand gen happens too late — when buyers are already comparing vendors. We shift engagement earlier in the process so you're seen as the advisor instead of the option.",
      faqs: [
        {
          question: "What's the difference between demand generation and lead generation?",
          answer: "Lead generation captures contact information. Demand generation creates interest, education, and preference — turning passive researchers into active buyers."
        },
        {
          question: "Do we need content to start a program?",
          answer: "If you have existing materials, we'll leverage them. If not, we'll develop targeted content assets such as talking points or insight summaries to drive engagement."
        },
        {
          question: "How do you identify in-market accounts?",
          answer: "We use behavioral patterns, search topics, and available intent data — combined with validation through direct outreach."
        },
        {
          question: "How long does it take to see momentum?",
          answer: "Early engagement often begins within the first month of activity, with pipeline-ready signals emerging once nurture tracks begin to compound."
        }
      ]
    },
    "event-marketing-audience-acquisition": {
      headline: "Fill Your Events with Buyers Who Belong in the Room",
      subheadline: "We attract decision-makers with real interest and intent — ensuring every attendee is relevant, engaged, and tied to revenue potential.",
      keyOutcomes: [
        "Events filled with buyers, not just bodies",
        "Higher post-event conversion into pipeline",
        "Stronger ROI across field events, webinars, and conferences",
        "Consistent engagement before, during, and after the event"
      ],
      methodology: [
        {
          title: "Event Positioning and Audience Definition",
          description: "We clarify who should be in attendance and why — aligning goals with ICP, messaging, and call-to-action structure."
        },
        {
          title: "Targeted Outreach and Invitations",
          description: "We promote events directly to relevant contacts through email, phone, and aligned channels — focusing on value-based communication rather than generic invites."
        },
        {
          title: "Pre-Event Engagement and Confirmation",
          description: "To ensure attendance, we deliver reminders, preview materials, and context that builds anticipation and locks in participation."
        },
        {
          title: "Post-Event Follow-Up and Qualification",
          description: "We re-engage contacts immediately after the event to identify interest, confirm priorities, and pass qualified opportunities to sales."
        }
      ],
      whyChoose: "Most event campaigns chase registration numbers — we focus on audience quality. Whether it's digital or in-person, your event should feed pipeline, not just attendance reports.",
      faqs: [
        {
          question: "Can this support both virtual and physical events?",
          answer: "Yes. Whether you're running webinars, roadshows, or conferences, we tailor outreach and engagement based on format."
        },
        {
          question: "Do you provide follow-up messaging and nurture sequences?",
          answer: "Yes. We build post-event follow-ups to ensure no attendee goes cold after attending."
        },
        {
          question: "How do you ensure attendance rather than just sign-ups?",
          answer: "Our engagement includes reminder touchpoints with context — increasing commitment and reducing no-show rates."
        },
        {
          question: "Can you help with sponsor or partner recruitment as well?",
          answer: "If required, we can identify and qualify potential event collaborators or sponsors aligned with your theme."
        }
      ]
    },
    "lead-nurturing-buyer-engagement": {
      headline: "Turn Cold Prospects into Future Revenue",
      subheadline: "We design engagement journeys that keep early-stage leads active until they're ready to buy — ensuring no opportunity is wasted.",
      keyOutcomes: [
        "Stay top-of-mind with prospects who aren't ready yet",
        "Build trust through consistent, insight-led communication",
        "Reactivate idle conversations without relying on sales effort",
        "Convert long-term interest into pipeline over time"
      ],
      methodology: [
        {
          title: "Segmentation of Early or Unqualified Leads",
          description: "We categorize leads based on industry, behavior, and interest level to determine nurture direction."
        },
        {
          title: "Journey Design with Relevant Messaging",
          description: "We craft communication tracks based on pain points, objections, or potential trigger events."
        },
        {
          title: "Multi-Channel Touchpoints",
          description: "Outreach happens across email, phone, and content assets to keep engagement active."
        },
        {
          title: "Re-Qualification and Sales Hand-Off",
          description: "Once intent resurfaces, leads are validated and passed back to sales for timely action."
        }
      ],
      whyChoose: "Sales teams rarely have time to nurture long-term leads. We ensure high-value prospects never go cold — and reappear when timing is right.",
      faqs: [
        {
          question: "What type of leads are best suited for nurturing?",
          answer: "Leads who showed initial interest but lacked timing, budget, or urgency — often the most valuable future opportunities."
        },
        {
          question: "How do you personalize nurture communications?",
          answer: "We segment by industry, role, and challenge — delivering value-based messaging rather than generic follow-ups."
        },
        {
          question: "What signals determine when a nurtured lead is ready?",
          answer: "We look at engagement behavior, response patterns, and timing cues to trigger requalification."
        },
        {
          question: "Can this be integrated with our existing workflows?",
          answer: "Yes. Nurtured leads can be reintroduced to sales via CRM or direct notification depending on your setup."
        }
      ]
    },
    "lead-validation-enrichment": {
      headline: "Turn Raw Lead Data into Revenue-Ready Intelligence",
      subheadline: "We clean, verify, and enrich contact and account records — ensuring your team only works with accurate, compliant, and conversion-ready data.",
      keyOutcomes: [
        "Remove duplicates, errors, and outdated records",
        "Append missing information like titles, company details, or tech stack",
        "Validate relevance before your team invests time",
        "Maintain compliance across communication channels"
      ],
      methodology: [
        {
          title: "Data Assessment and Categorization",
          description: "We analyze your current databases, segmenting usable, salvageable, and disqualified records."
        },
        {
          title: "Cleansing and Standardization",
          description: "We normalize formats, remove invalid contacts, and consolidate duplicates for consistency."
        },
        {
          title: "Enrichment and Research Layer",
          description: "We source missing job titles, company info, hierarchy, and digital footprints to add context."
        },
        {
          title: "Validation and Scoring",
          description: "Contacts and accounts are reviewed to ensure accuracy, compliance, and relevance to your campaigns."
        }
      ],
      whyChoose: "Bad data kills campaigns and wastes sales time. We turn messy records into a reliable asset — protecting your deliverability, reputation, and ROI.",
      faqs: [
        {
          question: "Can you work with data from multiple sources?",
          answer: "Yes. Whether your leads are from events, inbound forms, purchased lists, or legacy databases, we can centralize and clean them."
        },
        {
          question: "How do you ensure compliance when validating contacts?",
          answer: "We check against legal frameworks like GDPR and TCPA while verifying consent and communication legitimacy."
        },
        {
          question: "Do you remove or flag non-ICP contacts?",
          answer: "Yes. We classify contacts based on ICP fit so your team spends time only where it matters."
        },
        {
          question: "How often should data be enriched?",
          answer: "For most active databases, quarterly refresh cycles are recommended — we can support ongoing maintenance if needed."
        }
      ]
    }
  };

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: [`/api/services/${params?.slug}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!service || !params?.slug) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </div>
    );
  }

  const content = serviceContent[params.slug];
  
  if (!content) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Content not available</h1>
      </div>
    );
  }

  const industryKeywords = industries.map(industry => 
    `${service.title} for ${industry}, ${industry} ${service.title.toLowerCase()}`
  ).join(', ');

  const stepIcons = [Target, Users, Rocket, TrendingUp];

  return (
    <>
      <MetaTags
        title={`${service.title} - B2B Marketing Solutions | Pivotal B2B`}
        description={`Transform your B2B marketing with our ${service.title}. ${service.description} Expert solutions for enterprise software, telecommunication, financial services, and IT services sectors.`}
        keywords={`${service.title.toLowerCase()}, B2B ${service.title.toLowerCase()}, ${industryKeywords}, enterprise marketing solutions, B2B lead generation`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "url": "https://pivotal-b2b.com"
          },
          "serviceType": "B2B Marketing Service",
          "areaServed": industries
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="container mx-auto px-4 py-20 lg:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium text-blue-100">{service.title}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200" data-testid="headline-service">
                {content.headline}
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed max-w-4xl mx-auto font-light" data-testid="subheadline-service">
                {content.subheadline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
                  onClick={() => window.location.href = '/request-proposal'}
                  data-testid="button-request-proposal"
                >
                  Request a Proposal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                  onClick={() => window.open(calendlyUrl, '_blank')}
                  data-testid="button-schedule-call"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Strategy Call
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Key Outcomes Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-key-outcomes">
                  Key Outcomes
                </h2>
                <p className="text-xl text-gray-600">What you can expect when working with us</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {content.keyOutcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <Card className="h-full border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300" data-testid={`card-outcome-${index}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <p className="text-lg text-gray-700 leading-relaxed pt-2">{outcome}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-methodology">
                  Our Proven Methodology
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A systematic, four-step approach designed to deliver measurable results
                </p>
              </div>

              <div className="space-y-8">
                {content.methodology.map((step, index) => {
                  const Icon = stepIcons[index] || CheckCircle2;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      className="relative"
                      data-testid={`methodology-step-${index}`}
                    >
                      <Card className="overflow-hidden border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            {/* Step Number & Icon */}
                            <div className="md:w-48 bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                              <div className="absolute inset-0 bg-white/10 transform -skew-y-6"></div>
                              <div className="relative">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-3xl border-2 border-white/30">
                                  {index + 1}
                                </div>
                              </div>
                              <div className="relative">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                  <Icon className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-8">
                              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-lg text-gray-600 leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Connector Line */}
                      {index < content.methodology.length - 1 && (
                        <div className="hidden md:flex justify-center py-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full"></div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <MessageSquare className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium text-blue-100">Why Choose This Service</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="heading-why-choose">
                  What Sets Us Apart
                </h2>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  <p className="text-xl lg:text-2xl text-white/90 leading-relaxed text-center" data-testid="text-why-choose">
                    {content.whyChoose}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-faq">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">Get answers to common questions about this service</p>
              </div>

              <div className="space-y-6">
                {content.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    data-testid={`faq-item-${index}`}
                  >
                    <Card className="border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                            <span className="text-blue-600 font-bold text-sm">Q</span>
                          </div>
                          <span className="flex-1" data-testid={`faq-question-${index}`}>{faq.question}</span>
                        </h3>
                        <div className="flex items-start gap-3 ml-11">
                          <p className="text-lg text-gray-600 leading-relaxed" data-testid={`faq-answer-${index}`}>{faq.answer}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white relative overflow-hidden">
          {/* Animated Shapes */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6" data-testid="heading-cta">
                Ready to Get Started?
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
                Let's discuss how this service can transform your B2B marketing results
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 group"
                  onClick={() => window.open(calendlyUrl, '_blank')}
                  data-testid="button-schedule-strategy-call"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Schedule a Strategy Call
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                  onClick={() => window.location.href = '/request-proposal'}
                  data-testid="button-request-proposal-footer"
                >
                  <FileText className="mr-2 h-6 w-6" />
                  Request a Proposal
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
