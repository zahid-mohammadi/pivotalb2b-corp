import { db } from '../db';
import { services } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const structuredServiceData = [
  {
    slug: "account-based-marketing-abm-programs",
    title: "Account-Based Marketing (ABM) Programs", 
    description: "We engage entire buying committees at your target accounts early—building trust and influencing deals before competitors even enter the conversation.",
    features: [
      "Target account identification and prioritization",
      "Buying committee mapping and stakeholder research", 
      "Personalized multi-channel campaigns",
      "Account-based content creation",
      "Sales and marketing alignment",
      "Advanced analytics and attribution"
    ],
    benefits: [
      "Increase deal sizes by 30-50% by engaging complete buying committees",
      "Reduce sales cycles by 20-35% through pre-qualified, warmed prospects",
      "Achieve 3-5x higher conversion rates compared to broad-based campaigns",
      "Build stronger customer relationships that lead to expansion opportunities"
    ],
    features: [
      "Target account identification and prioritization",
      "Buying committee mapping and stakeholder research",
      "Personalized multi-channel campaigns",
      "Account-based content creation",
      "Sales and marketing alignment",
      "Advanced analytics and attribution"
    ],
    methodology: "1. Account Research & Selection: Identify and prioritize target accounts based on ideal customer profile, revenue potential, and strategic alignment. 2. Stakeholder Mapping & Persona Development: Map the complete buying committee for each target account and develop detailed personas. 3. Multi-Channel Campaign Execution: Deploy coordinated campaigns across email, LinkedIn, direct mail, and digital advertising. 4. Sales Enablement & Handoff: Provide sales teams with detailed account intelligence and warm introductions.",
    faqQuestions: [
      {
        question: "How do you identify which accounts to target?",
        answer: "We work with your team to define ideal customer profiles based on company size, industry, technology stack, and buying behaviors. We then use intent data and technographic insights to prioritize accounts showing buying signals."
      },
      {
        question: "What's the typical timeline to see results from ABM?",
        answer: "ABM is a longer-term strategy. You'll typically see initial engagement within 30-60 days, qualified meetings within 60-90 days, and closed deals within 6-12 months depending on your sales cycle."
      },
      {
        question: "How do you personalize campaigns at scale?",
        answer: "We use a combination of account intelligence, dynamic content, and marketing automation to deliver personalized experiences. Our approach balances scalability with the personal touch that makes ABM effective."
      }
    ],
    toolsAndTechnologies: [
      "Account intelligence platforms",
      "Marketing automation",
      "LinkedIn Sales Navigator",
      "Intent data providers",
      "CRM integration and tracking"
    ]
  },
  {
    slug: "b2b-lead-generation-qualification",
    title: "B2B Lead Generation & Qualification",
    description: "We identify and connect with decision-makers from companies actively evaluating solutions like yours—verified for intent, authority, and budget alignment.",
    benefits: [
      "Consistently fill your pipeline with new opportunities each month",
      "Reduce cost per qualified lead by 40-60% compared to generic databases",
      "Improve lead-to-opportunity conversion rates by 25-40%",
      "Eliminate time wasted on unqualified prospects"
    ],
    features: [
      "Intent-based prospect identification",
      "Multi-channel outreach campaigns",
      "Lead scoring and qualification",
      "CRM integration and tracking",
      "Sales team enablement"
    ],
    methodology: "1. Ideal Customer Profile Development: Define your perfect customer characteristics including company size, industry, technology stack, and buying behaviors to ensure precise targeting. 2. Intent Signal Monitoring: Track companies showing buying signals through content consumption, technology research, and competitive intelligence to identify in-market prospects. 3. Multi-Channel Engagement: Reach decision-makers through coordinated email, LinkedIn, and phone campaigns designed to build relationships and generate qualified conversations. 4. Lead Qualification & Nurturing: Qualify prospects against your criteria and nurture them through the consideration process until they're ready for sales engagement.",
    faqQuestions: [
      {
        question: "How do you ensure lead quality?",
        answer: "We use a combination of intent data, technographic analysis, and manual qualification to ensure leads meet your specific criteria for budget, authority, need, and timeline before passing them to sales."
      },
      {
        question: "What's your typical lead-to-opportunity conversion rate?",
        answer: "Our qualified leads typically convert to opportunities at 15-25%, significantly higher than industry averages of 5-10%, because we focus on intent-driven prospects who are actively evaluating solutions."
      }
    ],
    toolsAndTechnologies: [
      "Intent data platforms",
      "Sales engagement tools",
      "LinkedIn Sales Navigator",
      "Email automation platforms",
      "CRM systems"
    ]
  },
  {
    slug: "precision-demand-generation",
    title: "Precision Demand Generation",
    description: "We detect buying signals and deliver tailored content to in-market buyers—positioning your brand as the trusted choice when purchase decisions are made.",
    benefits: [
      "Capture demand when prospects are actively researching",
      "Increase qualified pipeline by 50-80% through intent-driven campaigns",
      "Reduce customer acquisition costs by targeting high-intent audiences",
      "Build brand authority with prospects before competitors appear"
    ],
    features: [
      "Intent signal monitoring",
      "Buyer journey content mapping",
      "Multi-channel campaign orchestration",
      "Lead scoring and nurturing",
      "Performance analytics and optimization"
    ],
    methodology: "1. Buyer Journey Mapping: Map your customer's complete buying journey to identify key decision points, content needs, and optimal engagement moments. 2. Intent Data Integration: Monitor buying signals across web behavior, content consumption, and search patterns to identify prospects entering the market. 3. Content Creation & Distribution: Develop targeted content for each buyer journey stage and distribute through SEO, paid advertising, social media, and email marketing. 4. Lead Capture & Nurturing: Convert content engagement into qualified leads through optimized landing pages, forms, and automated nurturing sequences.",
    faqQuestions: [
      {
        question: "How do you identify buying intent?",
        answer: "We use a combination of first-party data (website behavior, content downloads), third-party intent data, and search trends to identify companies and individuals showing buying signals for your category."
      },
      {
        question: "What types of content perform best for demand generation?",
        answer: "Educational content like whitepapers, case studies, and how-to guides perform well for top-funnel awareness. Comparison guides, ROI calculators, and demos work better for bottom-funnel prospects ready to evaluate solutions."
      },
      {
        question: "How long does it take to see results?",
        answer: "You'll typically see initial traffic and engagement within 30-60 days. Qualified leads usually begin flowing within 60-90 days, with sustained growth over 6-12 months as content and campaigns optimize."
      }
    ],
    toolsAndTechnologies: [
      "Intent data platforms",
      "Marketing automation",
      "Content management systems",
      "SEO and SEM tools",
      "Analytics and attribution"
    ]
  },
  {
    slug: "event-marketing-audience-acquisition",
    title: "Event Marketing & Audience Acquisition",
    description: "We fill your webinars, field events, and trade shows with qualified decision-makers who have real buying intent—turning attendance into measurable pipeline.",
    benefits: [
      "Increase qualified event attendance by 60-100%",
      "Improve event-to-pipeline conversion rates by 35-50%",
      "Reduce cost per qualified lead from events by 40%",
      "Generate measurable ROI from event investments"
    ],
    features: [
      "Targeted audience acquisition",
      "Multi-channel event promotion",
      "Registration optimization",
      "Pre-event qualification and engagement",
      "Post-event follow-up automation"
    ],
    methodology: "1. Audience Strategy & Targeting: Define ideal attendee profiles and use intent data, lookalike modeling, and account targeting to identify prospects most likely to convert. 2. Multi-Channel Promotion: Execute coordinated promotion campaigns across email marketing, social media, paid advertising, and strategic partnerships. 3. Pre-Event Engagement & Qualification: Engage registered attendees with relevant content, polls, and one-on-one outreach to qualify interest levels. 4. Post-Event Follow-Up & Nurturing: Implement systematic follow-up campaigns for attendees and no-shows to maximize conversion opportunities.",
    faqQuestions: [
      {
        question: "How do you ensure event attendees are qualified prospects?",
        answer: "We use intent data, firmographic targeting, and pre-event qualification surveys to attract prospects who match your ideal customer profile and show genuine interest in your solutions."
      },
      {
        question: "What's the typical conversion rate from event attendance to pipeline?",
        answer: "Well-executed event marketing typically generates pipeline conversion rates of 10-20% for webinars and 15-30% for in-person events, depending on the audience quality and follow-up strategy."
      }
    ],
    toolsAndTechnologies: [
      "Event management platforms",
      "Marketing automation",
      "Social media advertising",
      "Email marketing platforms",
      "Webinar and virtual event tools"
    ]
  },
  {
    slug: "lead-validation-enrichment",
    title: "Lead Validation & Enrichment",
    description: "We clean, verify, and validate your inbound or event leads—ensuring only genuine, in-market buyers enter your CRM while low-intent contacts are filtered out.",
    benefits: [
      "Improve lead-to-opportunity conversion rates by 40-60%",
      "Reduce sales team time waste on unqualified prospects by 50%",
      "Increase deal velocity by 25-35% through better lead intelligence",
      "Enhance CRM data quality and sales forecasting accuracy"
    ],
    features: [
      "Email and phone validation",
      "Intent scoring and qualification",
      "Comprehensive data enrichment",
      "CRM integration and sync",
      "Lead routing optimization"
    ],
    methodology: "1. Data Validation & Cleansing: Verify email addresses, phone numbers, and company information to ensure accuracy and deliverability while removing duplicates and outdated records. 2. Intent Assessment & Scoring: Analyze lead behavior, engagement patterns, and buying signals to assign intent scores that help sales teams prioritize follow-up efforts. 3. Lead Enrichment & Intelligence: Append comprehensive company and contact data including technographics, firmographics, recent news, and social insights. 4. Quality Routing & Assignment: Route qualified leads to appropriate sales representatives based on territory, industry expertise, and lead characteristics for optimal conversion.",
    faqQuestions: [
      {
        question: "How do you determine if a lead is sales-ready?",
        answer: "We use a combination of explicit criteria (job title, company size, budget) and implicit signals (engagement level, content consumption, timing) to score leads and determine readiness for sales engagement."
      },
      {
        question: "What data sources do you use for enrichment?",
        answer: "We integrate with premium data providers, social networks, news sources, and technographic databases to provide comprehensive lead intelligence that helps sales teams contextualize their outreach."
      },
      {
        question: "Can you integrate with our existing CRM and marketing automation?",
        answer: "Yes, we provide seamless integration with major CRM platforms (Salesforce, HubSpot, Pipedrive) and marketing automation tools to enrich leads in real-time as they enter your system."
      }
    ],
    toolsAndTechnologies: [
      "Data validation tools",
      "Intent data platforms",
      "Enrichment APIs",
      "CRM integrations",
      "Marketing automation platforms"
    ]
  },
  {
    slug: "lead-nurturing-buyer-engagement",
    title: "Lead Nurturing & Buyer Engagement",
    description: "We keep your prospects engaged throughout their entire buying journey with personalized content and timely touchpoints that build trust and guide them toward purchase decisions.",
    benefits: [
      "Increase lead-to-customer conversion rates by 35-50%",
      "Reduce sales cycle length by 20-30% through educated prospects",
      "Improve sales efficiency with prospects ready to have meaningful conversations",
      "Build stronger customer relationships that drive expansion and referrals"
    ],
    features: [
      "Behavioral trigger campaigns",
      "Dynamic content personalization",
      "Lead scoring and progression tracking",
      "Multi-channel orchestration",
      "Sales enablement and handoff"
    ],
    methodology: "1. Buyer Journey Mapping & Segmentation: Map your customer's decision-making process and segment prospects based on stage, role, industry, and engagement level to deliver relevant experiences. 2. Content Strategy & Creation: Develop educational content, case studies, and tools that address specific concerns and questions prospects have at each stage of their buying journey. 3. Multi-Channel Nurture Orchestration: Execute coordinated touchpoints across email, social media, phone calls, and direct mail to maintain engagement and build relationships over time. 4. Sales Readiness & Handoff: Identify when prospects are ready for sales engagement and provide context about their interests, concerns, and preferred communication style.",
    faqQuestions: [
      {
        question: "How long should nurturing campaigns run?",
        answer: "B2B nurturing should align with your sales cycle length. We typically recommend 6-18 month programs depending on your industry and deal complexity, with ongoing engagement for prospects who aren't immediately ready to buy."
      },
      {
        question: "How do you personalize nurturing at scale?",
        answer: "We use behavioral triggers, dynamic content, and segmentation to deliver personalized experiences. Content and messaging adapts based on engagement patterns, company characteristics, and expressed interests."
      },
      {
        question: "When do you hand prospects over to sales?",
        answer: "We use behavioral scoring and explicit signals (demo requests, pricing inquiries, high engagement) to identify sales-ready prospects. The handoff includes context about their interests, concerns, and optimal approach."
      }
    ],
    toolsAndTechnologies: [
      "Marketing automation platforms",
      "CRM integration",
      "Dynamic content engines",
      "Behavioral tracking tools",
      "Sales enablement platforms"
    ]
  }
];

async function populateStructuredServices() {
  try {
    console.log('Starting structured services population...');
    
    for (const serviceData of structuredServiceData) {
      // Check if service already exists
      const existingService = await db
        .select()
        .from(services)
        .where(eq(services.slug, serviceData.slug))
        .limit(1);

      if (existingService.length > 0) {
        // Update existing service
        await db
          .update(services)
          .set(serviceData)
          .where(eq(services.slug, serviceData.slug));
        console.log(`Updated service: ${serviceData.title}`);
      } else {
        // Create new service
        await db.insert(services).values(serviceData);
        console.log(`Created service: ${serviceData.title}`);
      }
    }
    
    console.log('✅ Structured services population completed successfully');
  } catch (error) {
    console.error('❌ Error populating structured services:', error);
    throw error;
  }
}

// Run if called directly
populateStructuredServices();

export default populateStructuredServices;