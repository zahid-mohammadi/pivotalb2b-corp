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
  Clock,
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

  const relatedServices: Record<string, Array<{ slug: string; title: string; description: string }>> = {
    "account-based-marketing-abm-programs": [
      { slug: "lead-nurturing-buyer-engagement", title: "Lead Nurturing & Buyer Engagement", description: "Keep prospects engaged during long ABM sales cycles" },
      { slug: "precision-demand-generation", title: "Precision Demand Generation", description: "Build early awareness before ABM activation" }
    ],
    "b2b-lead-generation-qualification": [
      { slug: "event-marketing-audience-acquisition", title: "Event Marketing & Audience Acquisition", description: "Add event-sourced leads to your pipeline" },
      { slug: "lead-validation-enrichment", title: "Lead Validation & Enrichment", description: "Ensure lead data quality and accuracy" }
    ],
    "precision-demand-generation": [
      { slug: "account-based-marketing-abm-programs", title: "Account-Based Marketing (ABM) Programs", description: "Target high-value accounts identified through demand gen" },
      { slug: "lead-nurturing-buyer-engagement", title: "Lead Nurturing & Buyer Engagement", description: "Nurture early-stage demand gen leads" }
    ],
    "event-marketing-audience-acquisition": [
      { slug: "lead-nurturing-buyer-engagement", title: "Lead Nurturing & Buyer Engagement", description: "Nurture post-event attendees into opportunities" },
      { slug: "b2b-lead-generation-qualification", title: "B2B Lead Generation & Qualification", description: "Continue pipeline growth beyond events" }
    ],
    "lead-nurturing-buyer-engagement": [
      { slug: "b2b-lead-generation-qualification", title: "B2B Lead Generation & Qualification", description: "Add fresh leads to your nurture database" },
      { slug: "precision-demand-generation", title: "Precision Demand Generation", description: "Create content-led nurture programs" }
    ],
    "lead-validation-enrichment": [
      { slug: "b2b-lead-generation-qualification", title: "B2B Lead Generation & Qualification", description: "Fill pipeline with fresh, validated leads" },
      { slug: "account-based-marketing-abm-programs", title: "Account-Based Marketing (ABM) Programs", description: "Prepare account data for ABM programs" }
    ]
  };

  const serviceContent: Record<string, {
    headline: string;
    subheadline: string;
    keyOutcomes: string[];
    methodology: Array<{ title: string; description: string; timeline?: string }>;
    whyChoose: string;
    whenToUse?: {
      idealFor: string[];
      notIdealFor: string[];
    };
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
          description: "We work with your sales and marketing team to identify priority accounts and map decision-makers, influencers, and stakeholders involved in buying decisions.",
          timeline: "Week 1-2: Account research, stakeholder mapping, and ICP alignment"
        },
        {
          title: "Insight-Led Messaging Development",
          description: "We build narratives aligned with industry pain points, business challenges, and strategic priorities relevant to those accounts — positioning your solution as the best-fit partner.",
          timeline: "Week 2-3: Message development, content creation, and sales enablement"
        },
        {
          title: "Multi-Channel Activation",
          description: "We orchestrate outreach across email, phone, content distribution, and strategic touchpoints designed to reach buyers wherever they are already active and consuming information.",
          timeline: "Week 4+: Ongoing multi-touch campaigns with 8-12 touchpoints per quarter"
        },
        {
          title: "Engagement and Qualification Hand-Off",
          description: "When key contacts show interest or interaction, we qualify readiness, gather context, and transition them to your sales team with insight notes and interaction history.",
          timeline: "Continuous: Real-time qualification and hand-off within 24 hours"
        }
      ],
      whyChoose: "Most ABM efforts focus on ads and branding instead of actual engagement. We focus on real conversations inside target accounts — not impressions. Instead of waiting for buyers to come to you, we strategically position your brand as a trusted partner before formal evaluation begins.",
      whenToUse: {
        idealFor: [
          "You have a defined list of high-value target accounts",
          "Your average deal size justifies focused account investment",
          "Sales cycles involve multiple decision-makers",
          "You're selling complex or enterprise solutions",
          "Your ICP is well-defined and narrow"
        ],
        notIdealFor: [
          "You need immediate lead volume (ABM builds momentum over time)",
          "Your target market is too broad or undefined",
          "Deal sizes are too small to support account-level investment",
          "You lack sales alignment or account intelligence"
        ]
      },
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
        },
        {
          question: "How do you price ABM programs?",
          answer: "Pricing is customized based on the number of target accounts, program complexity, and engagement channels. We offer flexible month-to-month arrangements with no long-term contracts required. During our strategy call, we'll provide transparent pricing aligned with your specific goals and budget."
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
          description: "We work with your team to clearly define qualifying criteria across industry, company size, tech stack, pain points, and buying triggers.",
          timeline: "Week 1: ICP workshop and criteria definition"
        },
        {
          title: "Strategic Outreach with Relevant Messaging",
          description: "We use insight-driven messaging to connect with prospects through email, phone, and landing pages — focused on their challenges, not just your features.",
          timeline: "Week 2-3: Campaign launch with multi-channel activation"
        },
        {
          title: "Human Validation and Interest Confirmation",
          description: "Every lead is engaged and verified by real people — ensuring genuine engagement rather than automated form fills.",
          timeline: "Ongoing: Real-time validation and qualification"
        },
        {
          title: "Qualified Handoff",
          description: "Only the prospects demonstrating relevance and readiness are passed to your sales team — along with context and engagement history.",
          timeline: "Continuous: Daily lead delivery with full context and notes"
        }
      ],
      whyChoose: "Most lead providers deliver lists — we deliver real conversations. Instead of chasing random contacts, your team speaks only with buyers who meet your standards and show interest.",
      whenToUse: {
        idealFor: [
          "You need a consistent flow of qualified opportunities",
          "Your sales team is ready to engage new prospects immediately",
          "You have a clear Ideal Customer Profile defined",
          "Pipeline velocity is a key growth metric for you",
          "You want predictable lead volume without long-term contracts"
        ],
        notIdealFor: [
          "You're targeting only a handful of named accounts (use ABM instead)",
          "Your ICP is still being defined or tested",
          "You lack sales capacity to follow up on qualified leads",
          "Budget is extremely limited (lead gen requires ongoing investment)"
        ]
      },
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
        },
        {
          question: "What does lead generation typically cost?",
          answer: "Pricing is based on lead volume, qualification depth, and target market complexity. We structure programs to deliver measurable ROI with transparent per-lead costs. No long-term commitments required — we'll discuss budget options during your strategy consultation."
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
          description: "We monitor signals across search, engagement, and industry activity to identify accounts likely to be exploring solutions like yours.",
          timeline: "Week 1-2: Intent data setup and account identification"
        },
        {
          title: "Thought Leadership and Educational Messaging",
          description: "We craft content that speaks directly to their challenges, helping them frame the problem and see your approach as a clear solution.",
          timeline: "Week 2-3: Content development and messaging framework"
        },
        {
          title: "Account-Level Activation",
          description: "We reach stakeholders across multiple channels, ensuring your message is seen consistently across email, ads, and curated touchpoints.",
          timeline: "Week 4+: Multi-channel nurture campaigns with 6-8 week cycles"
        },
        {
          title: "Engagement Scoring and Sales Handoff",
          description: "Only accounts demonstrating meaningful interaction are prioritized for sales outreach — with timing, context, and messaging history provided.",
          timeline: "Month 2+: Progressive scoring and qualified account handoff"
        }
      ],
      whyChoose: "Most demand gen happens too late — when buyers are already comparing vendors. We shift engagement earlier in the process so you're seen as the advisor instead of the option.",
      whenToUse: {
        idealFor: [
          "You want to influence buyers before they're actively shopping",
          "Your sales cycle is typically 3+ months",
          "You have (or can create) educational content and thought leadership",
          "You're competing in a crowded market and need early differentiation",
          "Building brand authority is part of your growth strategy"
        ],
        notIdealFor: [
          "You need immediate sales conversations (use lead gen instead)",
          "Your product/service requires minimal education or consideration",
          "You lack content assets and can't invest in creating them",
          "Your target audience is extremely narrow (use ABM instead)"
        ]
      },
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
        },
        {
          question: "What's the investment for demand generation programs?",
          answer: "Programs are priced based on audience size, content requirements, and channel mix. We design scalable programs that grow with your results — no locked contracts. We'll provide clear pricing options based on your pipeline goals during our initial consultation."
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
          description: "We clarify who should be in attendance and why — aligning goals with ICP, messaging, and call-to-action structure.",
          timeline: "2-3 weeks before event: Audience definition and campaign planning"
        },
        {
          title: "Targeted Outreach and Invitations",
          description: "We promote events directly to relevant contacts through email, phone, and aligned channels — focusing on value-based communication rather than generic invites.",
          timeline: "2-6 weeks before event: Multi-wave invitation campaigns"
        },
        {
          title: "Pre-Event Engagement and Confirmation",
          description: "To ensure attendance, we deliver reminders, preview materials, and context that builds anticipation and locks in participation.",
          timeline: "1 week before event: Reminder series and attendance confirmation"
        },
        {
          title: "Post-Event Follow-Up and Qualification",
          description: "We re-engage contacts immediately after the event to identify interest, confirm priorities, and pass qualified opportunities to sales.",
          timeline: "Within 48 hours: Immediate follow-up and qualification"
        }
      ],
      whyChoose: "Most event campaigns chase registration numbers — we focus on audience quality. Whether it's digital or in-person, your event should feed pipeline, not just attendance reports.",
      whenToUse: {
        idealFor: [
          "You're hosting webinars, conferences, or field events",
          "Event ROI and pipeline contribution are critical metrics",
          "You want attendees who convert, not just register",
          "You need to fill seats with your Ideal Customer Profile",
          "Post-event follow-up and nurturing is part of your strategy"
        ],
        notIdealFor: [
          "Your event is purely brand awareness with no sales goal",
          "You have no post-event engagement or follow-up plan",
          "Target audience size is too small to justify promotion efforts",
          "Event timing is too tight for proper audience development"
        ]
      },
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
        },
        {
          question: "What's the cost for event marketing services?",
          answer: "Pricing depends on event type, target audience size, and timeline. We offer both per-event and ongoing event series packages with flexible terms. No contracts required — we'll create a custom proposal based on your event goals and expected attendance."
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
          description: "We categorize leads based on industry, behavior, and interest level to determine nurture direction.",
          timeline: "Week 1: Database audit and lead segmentation"
        },
        {
          title: "Journey Design with Relevant Messaging",
          description: "We craft communication tracks based on pain points, objections, or potential trigger events.",
          timeline: "Week 2: Nurture journey mapping and content development"
        },
        {
          title: "Multi-Channel Touchpoints",
          description: "Outreach happens across email, phone, and content assets to keep engagement active.",
          timeline: "Week 3+: 8-12 week nurture cycles with monthly touchpoints"
        },
        {
          title: "Re-Qualification and Sales Hand-Off",
          description: "Once intent resurfaces, leads are validated and passed back to sales for timely action.",
          timeline: "Ongoing: Re-qualification triggers and immediate handoff"
        }
      ],
      whyChoose: "Sales teams rarely have time to nurture long-term leads. We ensure high-value prospects never go cold — and reappear when timing is right.",
      whenToUse: {
        idealFor: [
          "You have leads that showed interest but weren't ready to buy",
          "Your database contains aging or cold prospects",
          "Sales cycles are long and timing varies by prospect",
          "You want to maximize ROI from past marketing investments",
          "Building long-term relationships is part of your sales model"
        ],
        notIdealFor: [
          "You only have net-new prospect needs (use lead gen instead)",
          "Your database is small or poorly segmented",
          "You lack content or messaging for ongoing engagement",
          "Sales prefers working only active, immediate opportunities"
        ]
      },
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
        },
        {
          question: "How much does lead nurturing cost?",
          answer: "Pricing is based on database size, nurture track complexity, and touchpoint frequency. We create custom programs that fit your budget with flexible monthly terms. During our consultation, we'll align pricing with your specific lead volume and conversion goals."
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
          description: "We analyze your current databases, segmenting usable, salvageable, and disqualified records.",
          timeline: "Week 1: Database audit and quality assessment"
        },
        {
          title: "Cleansing and Standardization",
          description: "We normalize formats, remove invalid contacts, and consolidate duplicates for consistency.",
          timeline: "Week 1-2: Data cleaning and deduplication"
        },
        {
          title: "Enrichment and Research Layer",
          description: "We source missing job titles, company info, hierarchy, and digital footprints to add context.",
          timeline: "Week 2-3: Data enrichment and appending"
        },
        {
          title: "Validation and Scoring",
          description: "Contacts and accounts are reviewed to ensure accuracy, compliance, and relevance to your campaigns.",
          timeline: "Week 3: Final validation and compliance verification"
        }
      ],
      whyChoose: "Bad data kills campaigns and wastes sales time. We turn messy records into a reliable asset — protecting your deliverability, reputation, and ROI.",
      whenToUse: {
        idealFor: [
          "Your database has high bounce rates or low deliverability",
          "You've acquired leads from multiple sources (events, forms, purchases)",
          "Contact records are incomplete or outdated",
          "Compliance requirements demand accurate, verified data",
          "You're preparing for a major campaign and need clean data first"
        ],
        notIdealFor: [
          "Your database is already clean and regularly maintained",
          "Data volume is too small to justify enrichment costs",
          "You need net-new contacts, not data cleanup (use lead gen)",
          "Your CRM hygiene processes are already robust and automated"
        ]
      },
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
        },
        {
          question: "What does data validation and enrichment cost?",
          answer: "Pricing is determined by database size, enrichment depth, and data source complexity. We offer per-record pricing or project-based packages with no ongoing contracts. We'll provide a detailed quote after reviewing your current data quality and enrichment needs."
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

  const seoMetadata: Record<string, { title: string; description: string }> = {
    "account-based-marketing-abm-programs": {
      title: "Account-Based Marketing Programs | Target Account Engagement",
      description: "ABM programs designed to engage full buying committees inside your Target Accounts—driving qualified pipeline before formal vendor comparison."
    },
    "b2b-lead-generation-qualification": {
      title: "B2B Lead Generation & Qualification Services",
      description: "Generate and qualify B2B leads matched to your Ideal Customer Profile. Only speak with decision-makers who have real interest and authority."
    },
    "precision-demand-generation": {
      title: "Precision Demand Generation Services for B2B Teams",
      description: "Convert buyer research into measurable pipeline with content-led demand generation that educates key stakeholders early."
    },
    "event-marketing-audience-acquisition": {
      title: "Event Marketing & Audience Acquisition for B2B Companies",
      description: "Attract decision-makers with real buying intent to your events. Ensure every attendee is relevant, engaged, and revenue-aligned."
    },
    "lead-validation-enrichment": {
      title: "Lead Validation & Data Enrichment Services",
      description: "Clean, verify, and enrich lead data to ensure accuracy, compliance, and sales readiness across your campaigns."
    },
    "lead-nurturing-buyer-engagement": {
      title: "Lead Nurturing & Buyer Engagement Programs",
      description: "Keep early-stage leads engaged with relevant touchpoints until they're ready to buy—turning long-term interest into pipeline."
    }
  };

  const currentSEO = params?.slug ? seoMetadata[params.slug] : null;

  const structuredDataSchemas: Record<string, any[]> = {
    "account-based-marketing-abm-programs": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/account-based-marketing-abm-programs/#service",
        "serviceType": "Account-Based Marketing (ABM) Programs",
        "name": "Account-Based Marketing (ABM) Programs",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/account-based-marketing-abm-programs/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Marketing and Revenue Leaders" },
        "description": "Engage full buying committees inside your Target Accounts with ICP-aligned, content-led ABM programs that build influence before vendor comparison.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/account-based-marketing-abm-programs/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ],
    "b2b-lead-generation-qualification": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/b2b-lead-generation-qualification/#service",
        "serviceType": "B2B Lead Generation & Qualification",
        "name": "B2B Lead Generation & Qualification",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/b2b-lead-generation-qualification/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Sales and Marketing Leaders" },
        "description": "Fill your pipeline with ICP-matched prospects who show genuine interest—real conversations instead of random contacts.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/b2b-lead-generation-qualification/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ],
    "precision-demand-generation": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/precision-demand-generation/#service",
        "serviceType": "Precision Demand Generation",
        "name": "Precision Demand Generation",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/precision-demand-generation/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Marketing Leaders" },
        "description": "Convert research-stage interest into pipeline with content-led programs that educate in-market accounts early and build preference.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/precision-demand-generation/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ],
    "event-marketing-audience-acquisition": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/event-marketing-audience-acquisition/#service",
        "serviceType": "Event Marketing & Audience Acquisition",
        "name": "Event Marketing & Audience Acquisition",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/event-marketing-audience-acquisition/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Event and Marketing Teams" },
        "description": "Fill events with the right audience—engaged decision-makers from your Target Accounts—and convert interest into post-event pipeline.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/event-marketing-audience-acquisition/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ],
    "lead-validation-enrichment": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/lead-validation-enrichment/#service",
        "serviceType": "Lead Validation & Enrichment",
        "name": "Lead Validation & Enrichment",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/lead-validation-enrichment/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Sales and Marketing Operations" },
        "description": "Clean, verify, and enrich lead data to ensure accuracy, compliance, and conversion-readiness across your campaigns.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/lead-validation-enrichment/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ],
    "lead-nurturing-buyer-engagement": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.pivotal-b2b.com/services/lead-nurturing-buyer-engagement/#service",
        "serviceType": "Lead Nurturing & Buyer Engagement",
        "name": "Lead Nurturing & Buyer Engagement",
        "provider": { "@type": "Organization", "@id": "https://www.pivotal-b2b.com/#org" },
        "url": "https://www.pivotal-b2b.com/services/lead-nurturing-buyer-engagement/",
        "areaServed": "Worldwide",
        "audience": { "@type": "Audience", "audienceType": "B2B Demand Generation Teams" },
        "description": "Keep early-stage prospects engaged with tailored journeys until timing aligns, then reintroduce as sales-ready opportunities.",
        "offers": {
          "@type": "Offer",
          "url": "https://www.pivotal-b2b.com/services/lead-nurturing-buyer-engagement/",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" },
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const currentStructuredData = params?.slug && structuredDataSchemas[params.slug] 
    ? structuredDataSchemas[params.slug]
    : [{
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
      }];

  return (
    <>
      <MetaTags
        title={currentSEO?.title || `${service.title} - B2B Marketing Solutions | Pivotal B2B`}
        description={currentSEO?.description || `Transform your B2B marketing with our ${service.title}. ${service.description} Expert solutions for enterprise software, telecommunication, financial services, and IT services sectors.`}
        keywords={`${service.title.toLowerCase()}, B2B ${service.title.toLowerCase()}, ${industryKeywords}, enterprise marketing solutions, B2B lead generation`}
      />
      {currentStructuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
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
                              {step.timeline && (
                                <div className="mt-6 flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-semibold text-blue-900">Expected Timeline</p>
                                    <p className="text-sm text-blue-700">{step.timeline}</p>
                                  </div>
                                </div>
                              )}
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

        {/* When to Use This Service Section */}
        {content.whenToUse && (
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-when-to-use">
                    Is This Service Right for You?
                  </h2>
                  <p className="text-xl text-gray-600">Understand if this service aligns with your needs</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Ideal For */}
                  <Card className="border-2 border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Ideal For</h3>
                      </div>
                      <ul className="space-y-4">
                        {content.whenToUse.idealFor.map((item, index) => (
                          <li key={index} className="flex items-start gap-3" data-testid={`ideal-for-${index}`}>
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Not Ideal For */}
                  <Card className="border-2 border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Consider Alternatives If</h3>
                      </div>
                      <ul className="space-y-4">
                        {content.whenToUse.notIdealFor.map((item, index) => (
                          <li key={index} className="flex items-start gap-3" data-testid={`not-ideal-for-${index}`}>
                            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-orange-600 font-bold text-xs">!</span>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-lg text-gray-600 mb-6">
                    Not sure if this is the right fit? Let's discuss your specific needs.
                  </p>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open(calendlyUrl, '_blank')}
                    data-testid="button-schedule-consultation"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule a Free Consultation
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

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

        {/* Related Services Section */}
        {params?.slug && relatedServices[params.slug] && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-related-services">
                    You Might Also Need
                  </h2>
                  <p className="text-xl text-gray-600">Complementary services that work well together</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {relatedServices[params.slug].map((related, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      data-testid={`related-service-${index}`}
                    >
                      <Card className="h-full border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                        onClick={() => window.location.href = `/services/${related.slug}`}
                      >
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                              <Rocket className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors" data-testid={`related-title-${index}`}>
                                {related.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed mb-4" data-testid={`related-description-${index}`}>
                                {related.description}
                              </p>
                              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                <span>Learn More</span>
                                <ArrowRight className="ml-2 w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

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
