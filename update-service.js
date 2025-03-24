const features = [
  "Lead Generation: Source new prospects tailored to your target market",
  "BANT-Based Evaluation: Qualify leads using Budget, Authority, Need, and Timeline criteria",
  "Lead Prioritization: Rank prospects by conversion potential",
  "Fit Assessment: Ensure leads align with your ideal customer profile",
  "Intent Analysis: Identify prospects with active interest in your offerings",
  "Pipeline Refinement: Deliver a streamlined list of high-value, qualified leads"
];

const benefits = [
  "Improved Sales Efficiency: Focus your team on leads most likely to close",
  "Higher Conversion Rates: Target prospects with proven potential",
  "Fresh Lead Flow: Access newly generated, qualified leads",
  "Stronger ROI: Maximize results with a refined pipeline",
  "Time Savings: Skip the guesswork with pre-qualified prospects",
  "Scalable Process: Grow your pipeline with consistent lead generation and qualification"
];

const methodology = `
<div class="space-y-8">
    <div>
        <h3 class="text-2xl font-semibold mb-6">Lead Qualification Methodology</h3>
        <p class="text-muted-foreground mb-8">
            Our comprehensive approach to lead qualification ensures that your sales team only 
            receives high-potential prospects who meet your specific criteria for conversion success.
        </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
        <div class="bg-card rounded-lg p-6 border">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-semibold">1</span>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Lead Generation</h4>
                    <p class="text-muted-foreground">
                        Source prospects through targeted outreach aligned with your goals.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-card rounded-lg p-6 border">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-semibold">2</span>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Criteria Definition</h4>
                    <p class="text-muted-foreground">
                        Align BANT parameters with your sales objectives.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-card rounded-lg p-6 border">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-semibold">3</span>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Evaluation Process</h4>
                    <p class="text-muted-foreground">
                        Assess each generated lead for budget, authority, need, and timeline.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-card rounded-lg p-6 border">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-semibold">4</span>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Scoring & Ranking</h4>
                    <p class="text-muted-foreground">
                        Assign priority based on fit, intent, and readiness.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-card rounded-lg p-6 border">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-semibold">5</span>
                </div>
                <div>
                    <h4 class="font-semibold text-lg mb-2">Lead Delivery</h4>
                    <p class="text-muted-foreground">
                        Provide a refined list of qualified leads to your sales team.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const useCases = [
  {
    title: "Enterprise Software",
    description: "Sales team needs high-potential leads for a SaaS product",
    challenge: "Sales team needs high-potential leads for a SaaS product",
    solution: "Generated and qualified leads using BANT, targeting IT decision-makers",
    outcome: "Delivered 40 sales-ready leads, with 40% demo-to-sale conversions in 6 weeks"
  },
  {
    title: "Telecommunications",
    description: "Sourcing buyers for a new enterprise plan",
    challenge: "Sourcing buyers for a new enterprise plan",
    solution: "Generated leads and evaluated them for authority and timeline readiness",
    outcome: "Provided 25 qualified leads, leading to 30% faster sales cycles in 2 months"
  },
  {
    title: "Financial Services",
    description: "Finding serious inquiries for advisory services",
    challenge: "Finding serious inquiries for advisory services",
    solution: "Sourced and qualified leads with budget and need via BANT criteria",
    outcome: "Delivered 30 high-potential leads, boosting consultations by 35% in 30 days"
  },
  {
    title: "IT Services and Consulting",
    description: "Building a pipeline for cloud migration services",
    challenge: "Building a pipeline for cloud migration services",
    solution: "Generated and ranked leads by intent and readiness using BANT",
    outcome: "Supplied 20 sales-ready leads, resulting in 10 closures in 8 weeks"
  },
  {
    title: "Professional Services",
    description: "Needing high-fit leads for a consulting firm",
    challenge: "Needing high-fit leads for a consulting firm",
    solution: "Generated and prioritized leads with authority and immediate needs",
    outcome: "Delivered 15 qualified leads, cutting sales pursuit time by 50%"
  },
  {
    title: "B2B Vendors",
    description: "Qualifying leads for a supplier expansion campaign",
    challenge: "Qualifying leads for a supplier expansion campaign",
    solution: "Sourced and assessed leads for budget and timeline readiness",
    outcome: "Provided 25 qualified leads, increasing contract sign-ups by 30% in 60 days"
  },
  {
    title: "B2B Marketing Agencies",
    description: "Enhancing an agency's client campaign with qualified leads",
    challenge: "Enhancing an agency's client campaign with qualified leads",
    solution: "Partnered as a qualification vendor, generating and refining leads with BANT for their client",
    outcome: "Delivered 200+ sales-ready leads to the agency's client in 90 days"
  }
];

const faqQuestions = [
  {
    question: "What is BANT criteria?",
    answer: "BANT stands for Budget, Authority, Need, and Timeline—key factors to assess lead potential."
  },
  {
    question: "How do you generate leads?",
    answer: "We source prospects through targeted outreach tailored to your industry and goals."
  },
  {
    question: "How long does it take to get qualified leads?",
    answer: "Lead generation and qualification can deliver initial results within 2-4 weeks."
  },
  {
    question: "Can you qualify leads in real-time?",
    answer: "We typically process leads in batches, but can adjust for faster delivery if needed."
  },
  {
    question: "What happens to unqualified leads?",
    answer: "We filter them out, ensuring you only receive high-potential prospects."
  },
  {
    question: "Do you integrate with our CRM?",
    answer: "Yes, we can deliver qualified leads directly into systems like Salesforce or HubSpot."
  }
];

// Create a combined update data object
const updateData = {
  features,
  benefits,
  methodology,
  useCases,
  faqQuestions
};

// Make the API request to update the service
async function updateService() {
  const serviceId = 8; // Lead Qualification Services
  try {
    const response = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    const result = await response.json();
    console.log('Service updated successfully:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error updating service:', error);
  }
}

updateService();