import { db } from './server/db.js';
import { services } from './shared/schema.js';
import { eq } from 'drizzle-orm';

async function updateAccountBasedMarketingService() {
  try {
    const serviceId = 9; // ID for Account-Based Marketing

    // Features
    const features = [
      {
        title: "Account Targeting",
        description: "Identify and prioritize high-value accounts."
      },
      {
        title: "Personalized Outreach",
        description: "Craft tailored messages for buying group members."
      },
      {
        title: "Buying Group Engagement",
        description: "Engage multiple decision-makers within each account."
      },
      {
        title: "Consensus Building",
        description: "Align stakeholders with unified messaging."
      },
      {
        title: "Sales Cycle Acceleration",
        description: "Streamline the path from interest to close."
      },
      {
        title: "Performance Tracking",
        description: "Monitor engagement and progress per account."
      }
    ];

    // Benefits
    const benefits = [
      {
        title: "Higher Win Rates",
        description: "Close more deals with key accounts."
      },
      {
        title: "Faster Sales Cycles",
        description: "Reduce time-to-close with focused strategies."
      },
      {
        title: "Stronger Relationships",
        description: "Build trust with decision-makers."
      },
      {
        title: "Increased Revenue",
        description: "Maximize value from high-potential accounts."
      },
      {
        title: "Efficient Resource Use",
        description: "Focus efforts on accounts that matter most."
      },
      {
        title: "Measurable Impact",
        description: "See clear results from targeted engagement."
      }
    ];

    // Methodology
    const methodology = [
      {
        title: "Account Selection",
        description: "Identify high-value accounts based on your goals."
      },
      {
        title: "Buying Group Mapping",
        description: "Profile decision-makers and influencers within each account."
      },
      {
        title: "Strategy Development",
        description: "Design personalized outreach and content plans."
      },
      {
        title: "Engagement Execution",
        description: "Deploy tailored campaigns to connect with stakeholders."
      },
      {
        title: "Lead Delivery",
        description: "Provide sales-ready accounts with engaged buying groups."
      }
    ];

    // Use Cases
    const useCases = [
      {
        title: "Enterprise Software",
        description: "Closing enterprise IT deals through targeted stakeholder engagement",
        challenge: "Closing deals with enterprise IT departments.",
        solution: "Targeted ABM campaign engaging CIOs and IT managers with custom demos.",
        outcome: "3 major accounts closed, with 40% faster sales cycles in 90 days."
      },
      {
        title: "Telecommunications",
        description: "Selling B2B solutions to telecom giants with personalized outreach",
        challenge: "Selling a B2B solution to telecom giants.",
        solution: "Personalized outreach to procurement and tech leads, fostering consensus.",
        outcome: "2 high-value contracts signed in 60 days."
      },
      {
        title: "Financial Services",
        description: "Penetrating large financial firms with targeted advisory services",
        challenge: "Penetrating large financial firms for advisory services.",
        solution: "ABM strategy with tailored emails and calls to CFOs and compliance officers.",
        outcome: "4 accounts moved to contract stage in 8 weeks."
      },
      {
        title: "IT Services and Consulting",
        description: "Winning enterprise contracts for managed IT services",
        challenge: "Winning contracts for managed IT services.",
        solution: "Engaged IT directors and CEOs with account-specific content and follow-ups.",
        outcome: "3 enterprise clients onboarded in 3 months."
      },
      {
        title: "Professional Services",
        description: "Securing consulting deals with mid-sized firms through aligned messaging",
        challenge: "Securing consulting deals with mid-sized firms.",
        solution: "Personalized ABM outreach to execs and HR, aligning their needs.",
        outcome: "5 accounts converted, with 30% shorter sales cycles."
      },
      {
        title: "B2B Vendors",
        description: "Expanding vendor agreements with key suppliers through targeted campaigns",
        challenge: "Expanding vendor agreements with key suppliers.",
        solution: "Targeted campaigns to purchasing and ops teams at priority accounts.",
        outcome: "4 new vendor contracts secured in 10 weeks."
      },
      {
        title: "B2B Marketing Agencies",
        description: "Supporting agencies with ABM for their key client accounts",
        challenge: "Supporting an agency's client with ABM for their key accounts.",
        solution: "Partnered as an ABM vendor, engaging buying groups for the agency's client.",
        outcome: "Delivered 6 sales-ready accounts to the agency's client in 90 days."
      }
    ];

    // FAQ Questions
    const faqQuestions = [
      {
        question: "What makes ABM different from traditional marketing?",
        answer: "ABM focuses on specific high-value accounts with personalized strategies, rather than broad outreach."
      },
      {
        question: "How do you identify the right accounts?",
        answer: "We work with you to select accounts based on revenue potential, fit, and strategic goals."
      },
      {
        question: "How long does it take to see results?",
        answer: "Initial engagement can start within 4-6 weeks, with deal momentum building over 2-3 months."
      },
      {
        question: "Can you engage multiple stakeholders at once?",
        answer: "Yes, we map and target all key decision-makers in the buying group."
      },
      {
        question: "What if an account doesn't respond?",
        answer: "We adjust strategies and messaging to re-engage or pivot to other priority accounts."
      },
      {
        question: "Do you integrate with our sales tools?",
        answer: "Yes, we align with CRMs like Salesforce to deliver actionable account data."
      }
    ];

    // Success Metrics
    const successMetrics = [
      "Number of high-value accounts engaged",
      "Buying group stakeholders reached per account",
      "Response rates from targeted contacts",
      "Account-to-opportunity conversion rate",
      "Deal velocity compared to baseline",
      "Win rate improvement for targeted accounts"
    ];

    // Update the service data
    await db.update(services)
      .set({
        features: JSON.stringify(features),
        benefits: JSON.stringify(benefits),
        methodology: JSON.stringify(methodology),
        useCases: JSON.stringify(useCases),
        faqQuestions: JSON.stringify(faqQuestions),
        successMetrics: JSON.stringify(successMetrics)
      })
      .where(eq(services.id, serviceId));

    console.log("Account-Based Marketing service updated successfully");
  } catch (error) {
    console.error("Error updating Account-Based Marketing service:", error);
  } finally {
    process.exit(0);
  }
}

updateAccountBasedMarketingService();