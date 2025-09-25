import { db } from '../db';
import { services } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const refinedServiceData = [
  {
    slug: "b2b-lead-generation-qualification",
    title: "B2B Lead Generation & Qualification",
    description: "We identify and engage decision-makers from companies that fit your Ideal Customer Profile and are actively exploring solutions like yours. Every lead we deliver has verified interest, budget alignment, and decision-making authority.",
    features: [
      "Targeted outreach to ICP-defined accounts and decision-makers",
      "Buying-intent detection to focus only on in-market companies",
      "Multi-channel engagement (email, phone, LinkedIn)",
      "Qualification checks for budget, authority, and timelines",
      "CRM-ready enrichment with verified contact details and insights"
    ],
    benefits: [
      "Consistently fill your pipeline with new, real opportunities",
      "Avoid wasting resources on low-intent contacts",
      "Build predictable growth with leads already exploring options"
    ],
    successMetrics: [
      "2–2.5× increase in lead quality compared to generic databases",
      "30–45% lower cost per qualified opportunity",
      "25–40% higher conversion to pipeline opportunities"
    ],
    methodology: `
      <div class="space-y-8">
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">1</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">ICP & Persona Alignment</h3>
            <p class="text-gray-600">Define your exact target accounts and decision-makers.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">2</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Intent Monitoring</h3>
            <p class="text-gray-600">Track signals from companies researching or budgeting for solutions.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">3</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Outreach & Engagement</h3>
            <p class="text-gray-600">Connect with decision-makers via email, calls, and LinkedIn.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">4</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Qualification</h3>
            <p class="text-gray-600">Confirm active evaluation, budget alignment, and authority.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">5</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Handoff</h3>
            <p class="text-gray-600">Deliver enriched leads directly to your CRM or sales process.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold text-xl">6</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Feedback Loop</h3>
            <p class="text-gray-600">Optimize targeting based on your team's results and feedback.</p>
          </div>
        </div>
      </div>
    `,
    faqQuestions: [
      {
        question: "What makes your leads different?",
        answer: "Every lead is from a company actively evaluating solutions, not just a random contact list."
      },
      {
        question: "Do you work with our ICP?",
        answer: "Yes—programs are fully customized to your target criteria."
      },
      {
        question: "How do you confirm intent?",
        answer: "By combining behavioral intent signals with direct engagement and qualification."
      },
      {
        question: "Do you replace unqualified leads?",
        answer: "Yes, per our agreed quality criteria."
      },
      {
        question: "How quickly can you deliver leads?",
        answer: "Campaigns typically launch within 72 hours."
      }
    ]
  },
  {
    slug: "lead-validation-sales-development-support",
    title: "Lead Validation & Sales Development Support",
    description: "We help you make the most of the leads you already capture—whether from inbound campaigns, events, or third-party providers—by validating decision-makers, confirming active interest, and filtering out low-intent or irrelevant contacts.",
    features: [
      "Live phone and email validation of every lead",
      "Verification of role, authority, and relevance",
      "Confirmation of active interest in evaluating solutions",
      "CRM deduplication and data enrichment",
      "Nurturing of semi-qualified leads until they're ready for follow-up"
    ],
    benefits: [
      "Protect your team's time by filtering out dead or irrelevant leads",
      "Improve pipeline accuracy with validated, in-market opportunities",
      "Increase ROI on your inbound, events, and marketing campaigns"
    ],
    successMetrics: [
      "60–90% fewer 'ghost' leads entering CRM",
      "25–45% higher productivity for business development teams",
      "30–50% stronger conversion from marketing leads to opportunities"
    ],
    methodology: `
      <div class="space-y-8">
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">1</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Lead Intake</h3>
            <p class="text-gray-600">Gather leads from your campaigns, partners, or inbound programs.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">2</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Verification Pass</h3>
            <p class="text-gray-600">Confirm identity, role, and relevance via live outreach.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">3</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Interest Validation</h3>
            <p class="text-gray-600">Ensure the lead is actively exploring or open to solutions.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">4</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Data Enrichment</h3>
            <p class="text-gray-600">Add missing firmographic and technographic data.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">5</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">CRM Sync</h3>
            <p class="text-gray-600">Deliver only qualified, validated leads into your system.</p>
          </div>
        </div>
        
        <div class="relative">
          <div class="absolute left-0 top-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold text-xl">6</span>
          </div>
          <div class="pl-16">
            <h3 class="text-lg font-semibold mb-2">Continuous Nurture</h3>
            <p class="text-gray-600">For not-yet-ready leads, keep them warm until timing improves.</p>
          </div>
        </div>
      </div>
    `,
    faqQuestions: [
      {
        question: "Do you validate inbound leads only?",
        answer: "No, we validate any leads—whether inbound, event-based, or purchased."
      },
      {
        question: "How do you define a 'validated' lead?",
        answer: "A real decision-maker who confirms relevance and is open to discussing solutions."
      },
      {
        question: "Do you guarantee accuracy?",
        answer: "Yes—through multi-step verification and evidence-based qualification."
      },
      {
        question: "What happens with low-intent leads?",
        answer: "We remove them or nurture them until they show buying signals."
      },
      {
        question: "Can you integrate with our CRM?",
        answer: "Yes—validated leads are synced directly into your system."
      }
    ]
  }
];

export async function populateRefinedServices() {
  console.log('Starting to populate refined services...');
  
  try {
    for (const serviceData of refinedServiceData) {
      console.log(`Processing service: ${serviceData.title}`);
      
      // Check if service exists
      const [existingService] = await db
        .select({ id: services.id })
        .from(services)
        .where(eq(services.slug, serviceData.slug));
      
      if (existingService) {
        // Update existing service
        console.log(`Updating existing service: ${serviceData.title}`);
        await db
          .update(services)
          .set({
            title: serviceData.title,
            description: serviceData.description,
            features: serviceData.features,
            benefits: serviceData.benefits,
            successMetrics: serviceData.successMetrics,
            methodology: serviceData.methodology,
            faqQuestions: serviceData.faqQuestions
          })
          .where(eq(services.id, existingService.id));
        
        console.log(`✓ Updated service: ${serviceData.title}`);
      } else {
        // Create new service
        console.log(`Creating new service: ${serviceData.title}`);
        await db.insert(services).values({
          slug: serviceData.slug,
          title: serviceData.title,
          description: serviceData.description,
          features: serviceData.features,
          benefits: serviceData.benefits,
          successMetrics: serviceData.successMetrics,
          methodology: serviceData.methodology,
          faqQuestions: serviceData.faqQuestions,
          toolsAndTechnologies: [],
          useCases: [],
          bannerImage: null
        });
        
        console.log(`✓ Created service: ${serviceData.title}`);
      }
    }
    
    console.log('✓ All refined services have been populated successfully!');
  } catch (error) {
    console.error('Error populating refined services:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateRefinedServices()
    .then(() => {
      console.log('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}