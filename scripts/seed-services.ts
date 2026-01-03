import "dotenv/config";
import { db } from "../server/db";
import { services } from "../shared/schema";

const servicesData = [
  {
    title: "Account-Based Marketing (ABM) Programs",
    slug: "account-based-marketing-abm-programs",
    description: "Target and engage high-value accounts with personalized, multi-channel campaigns that drive meaningful conversations with decision-makers.",
    features: [
      "Target Account Identification & Prioritization",
      "Buying Committee Mapping",
      "Personalized Content Development",
      "Multi-Channel Campaign Orchestration",
      "Account Engagement Tracking",
      "Sales & Marketing Alignment"
    ],
    benefits: [
      "Higher deal sizes from focused targeting",
      "Shorter sales cycles with pre-engaged buyers",
      "Better alignment between sales and marketing",
      "Improved ROI on marketing spend"
    ],
    successMetrics: [
      "Target Account Engagement Rate",
      "Pipeline Generated from ABM Accounts",
      "Average Deal Size Increase",
      "Sales Cycle Reduction"
    ],
    methodology: "Our ABM methodology combines data-driven account selection with personalized engagement strategies.",
    industries: ["Enterprise Software", "Financial Services", "IT Services", "Professional Services"]
  },
  {
    title: "B2B Lead Generation & Qualification",
    slug: "b2b-lead-generation-qualification",
    description: "Generate high-quality, sales-ready leads through targeted outreach and rigorous qualification processes.",
    features: [
      "BANT Qualification Framework",
      "Multi-Touch Lead Nurturing",
      "Intent Data Integration",
      "Lead Scoring & Prioritization",
      "CRM Integration",
      "Real-Time Lead Delivery"
    ],
    benefits: [
      "Higher conversion rates from qualified leads",
      "Reduced time spent on unqualified prospects",
      "Predictable pipeline growth",
      "Better sales productivity"
    ],
    successMetrics: [
      "Lead-to-Opportunity Conversion Rate",
      "Cost Per Qualified Lead",
      "Sales Accepted Lead Rate",
      "Pipeline Velocity"
    ],
    methodology: "Our lead generation process combines targeted outreach with rigorous qualification.",
    industries: ["Technology", "SaaS", "Financial Services", "Manufacturing"]
  },
  {
    title: "Precision Demand Generation",
    slug: "precision-demand-generation",
    description: "Build awareness and generate demand among your ideal buyers through strategic content distribution and targeted campaigns.",
    features: [
      "Content Syndication",
      "Display Advertising",
      "Social Media Marketing",
      "Email Marketing Campaigns",
      "Webinar & Event Promotion",
      "SEO & SEM Integration"
    ],
    benefits: [
      "Increased brand awareness",
      "Larger top-of-funnel pipeline",
      "Better content ROI",
      "Multi-channel reach"
    ],
    successMetrics: [
      "Content Downloads",
      "Brand Awareness Lift",
      "Website Traffic Growth",
      "Marketing Qualified Leads"
    ],
    methodology: "Our demand generation approach focuses on reaching the right audience with the right content.",
    industries: ["B2B Technology", "Professional Services", "Healthcare IT", "Manufacturing"]
  },
  {
    title: "Event Marketing & Audience Acquisition",
    slug: "event-marketing-audience-acquisition",
    description: "Drive attendance and engagement for virtual, hybrid, and in-person events with targeted audience acquisition strategies.",
    features: [
      "Event Registration Campaigns",
      "Attendee Qualification",
      "Pre-Event Engagement",
      "Post-Event Follow-Up",
      "Webinar Promotion",
      "Trade Show Support"
    ],
    benefits: [
      "Higher event attendance rates",
      "Better qualified attendees",
      "Improved post-event conversion",
      "Extended event ROI"
    ],
    successMetrics: [
      "Registration Rate",
      "Attendance Rate",
      "Post-Event MQL Conversion",
      "Event ROI"
    ],
    methodology: "We combine targeted outreach with engagement strategies to maximize event success.",
    industries: ["Technology", "Healthcare", "Financial Services", "Manufacturing"]
  },
  {
    title: "Lead Nurturing & Buyer Engagement",
    slug: "lead-nurturing-buyer-engagement",
    description: "Keep prospects engaged throughout their buying journey with personalized content and strategic touchpoints.",
    features: [
      "Automated Nurture Sequences",
      "Personalized Content Delivery",
      "Behavioral Triggers",
      "Lead Scoring Updates",
      "Sales Handoff Optimization",
      "Re-Engagement Campaigns"
    ],
    benefits: [
      "Higher lead-to-opportunity conversion",
      "Shorter sales cycles",
      "Better buyer experience",
      "Improved marketing ROI"
    ],
    successMetrics: [
      "Nurture-to-SQL Conversion",
      "Engagement Score Improvement",
      "Time to Opportunity",
      "Content Engagement Rate"
    ],
    methodology: "Our nurturing approach combines behavioral data with personalized content delivery.",
    industries: ["Enterprise Software", "B2B Services", "Financial Technology", "Healthcare IT"]
  },
  {
    title: "Lead Validation & Enrichment",
    slug: "lead-validation-enrichment",
    description: "Ensure data accuracy and completeness with comprehensive validation and enrichment services.",
    features: [
      "Contact Data Verification",
      "Company Data Enrichment",
      "Email Verification",
      "Phone Verification",
      "Duplicate Detection",
      "Data Standardization"
    ],
    benefits: [
      "Higher data accuracy",
      "Better deliverability",
      "Reduced bounce rates",
      "Improved campaign performance"
    ],
    successMetrics: [
      "Data Accuracy Rate",
      "Email Deliverability",
      "Contact Rate Improvement",
      "Data Completeness Score"
    ],
    methodology: "We use multi-source verification to ensure the highest data quality standards.",
    industries: ["All B2B Industries", "Technology", "Financial Services", "Healthcare"]
  }
];

async function seedServices() {
  console.log("Seeding services...");
  
  for (const service of servicesData) {
    try {
      await db.insert(services).values(service).onConflictDoNothing();
      console.log(`✓ Inserted: ${service.title}`);
    } catch (error) {
      console.error(`✗ Failed to insert ${service.title}:`, error);
    }
  }
  
  console.log("Services seeding complete!");
  process.exit(0);
}

seedServices().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
