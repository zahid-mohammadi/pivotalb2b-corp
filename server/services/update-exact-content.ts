import { sql } from 'drizzle-orm';
import { db } from '../db';

async function updateExactServiceContent() {
  try {
    console.log('Starting exact service content update...');
    
    // Clear existing services first
    await db.execute(sql`DELETE FROM services`);
    
    // 1. Account-Based Marketing (ABM) Programs
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'account-based-marketing-abm-programs',
        'Account-Based Marketing (ABM) Programs',
        'Our ABM programs engage entire buying groups inside your named target accounts, building relationships and influencing decisions before competitors are even considered.',
        ARRAY[
          'Early Influence – Shape how buying committees in target accounts view their options.',
          'Stronger Market Positioning – Position your solution as the trusted choice across key decision-makers.',
          'Bigger Wins – Secure larger enterprise deals with multi-threaded account engagement.'
        ],
        ARRAY[
          'Engagement strategies built around high-value target accounts.',
          'Mapping and engaging full buying committees.',
          'Multi-touch campaigns that build trust and consensus.'
        ],
        'Select & Prioritize – Identify and tier target accounts. Map the Buying Committee – Uncover key decision-makers and influencers. Engage Multi-Channel – Deliver personalized campaigns across roles. Track & Optimize – Measure account-level engagement and pipeline impact.',
        ARRAY['{
          "question": "How is ABM different from lead generation?",
          "answer": "ABM builds relationships across the decision-making group in specific accounts, not just individual leads."
        }'::jsonb],
        ARRAY['Account intelligence platforms', 'Marketing automation', 'Multi-channel engagement tools'],
        ARRAY['Enterprise', 'Technology', 'Financial Services']
      )
    `);
    
    // 2. B2B Lead Generation & Qualification
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'b2b-lead-generation-qualification',
        'B2B Lead Generation & Qualification',
        'We combine precise lead generation with rigorous qualification, delivering a steady flow of new opportunities while ensuring every lead is relevant, accurate, and aligned with your target accounts.',
        ARRAY[
          'Consistent Pipeline Growth – Reliable delivery of new leads from accounts that match your ICP.',
          'Qualified Opportunities – Every lead is validated for budget, authority, need, and timing.',
          'Less Wasted Effort – Your sales team focuses only on prospects worth pursuing.'
        ],
        ARRAY[
          'Lead generation campaigns designed to identify and engage new prospects.',
          'Qualification framework to ensure every lead is sales-ready.',
          'A balance of volume and quality to grow pipeline and revenue.'
        ],
        'Define ICP – Establish your Ideal Customer Profile and target accounts. Generate Net-New Leads – Execute campaigns to capture new prospects. Qualify Leads – Validate against budget, authority, need, and timing. Deliver Opportunities – Send both new leads and validated opportunities into your CRM.',
        ARRAY['{
          "question": "Do you focus more on volume or quality?",
          "answer": "Both. We fill your pipeline with new leads while ensuring each one is rigorously qualified."
        }'::jsonb],
        ARRAY['Lead generation platforms', 'Qualification frameworks', 'CRM integration'],
        ARRAY['B2B Technology', 'SaaS', 'Professional Services']
      )
    `);
    
    // 3. Precision Demand Generation
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'precision-demand-generation',
        'Precision Demand Generation',
        'Our Precision Demand Generation programs identify in-market accounts, connect with the right decision-makers, and educate buyers with insights that solve their challenges—so when they''re ready to buy, your solution is already top of mind.',
        ARRAY[
          'Pinpoint Accuracy – Focus only on accounts that fit your ICP and show real intent.',
          'Educated Buyers – Provide insights and content that solve buyer challenges.',
          'Faster Decisions – Shorten the sales cycle by informing and guiding early.',
          'No Wasted Spend – Eliminate investment in unqualified or low-intent audiences.'
        ],
        ARRAY[
          'Detecting accounts actively researching your category.',
          'Prioritizing buyers and influencers showing genuine intent.',
          'Delivering educational touchpoints that build trust.',
          'Converting informed buyers into qualified opportunities.'
        ],
        'Identify Intent Signals – Find accounts researching relevant topics. Target Key Buyers – Pinpoint decision-makers and influencers. Educate & Engage – Deliver content that answers questions and positions your solution. Convert Opportunities – Transition engaged, informed buyers to sales.',
        ARRAY['{
          "question": "How is this different from traditional demand gen?",
          "answer": "Traditional demand gen casts a wide net. Precision Demand Generation eliminates waste by focusing only on in-market accounts and educating them to accelerate decisions."
        }'::jsonb],
        ARRAY['Intent data platforms', 'Content delivery systems', 'Buyer engagement tools'],
        ARRAY['Enterprise Software', 'Technology', 'B2B Services']
      )
    `);
    
    // 4. Event Marketing & Audience Acquisition
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'event-marketing-audience-acquisition',
        'Event Marketing & Audience Acquisition',
        'We ensure your events attract decision-makers with genuine intent, so every conversation moves pipeline forward and every event delivers measurable ROI.',
        ARRAY[
          'Stronger Event ROI – Events generate pipeline, not just attendance.',
          'Better Conversations – Engage buyers with authority and purchasing power.',
          'Post-Event Momentum – Sales teams follow up with qualified prospects.'
        ],
        ARRAY[
          'Campaigns to attract qualified attendees from target accounts.',
          'Qualification to confirm budget, authority, and intent.',
          'Global audience acquisition for in-person, hybrid, or digital events.'
        ],
        'Define Audience – Establish target accounts and roles. Identify Buyers – Find decision-makers with purchasing power. Drive Registrations – Execute campaigns to fill events. Enable Sales – Deliver attendee insights to your sales team.',
        ARRAY['{
          "question": "Do you support both physical and virtual events?",
          "answer": "Yes, we run global campaigns for in-person, hybrid, and virtual events."
        }'::jsonb],
        ARRAY['Event platforms', 'Registration systems', 'Audience targeting tools'],
        ARRAY['Technology', 'Enterprise', 'Global Markets']
      )
    `);
    
    // 5. Lead Validation & Enrichment
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'lead-validation-enrichment',
        'Lead Validation & Enrichment',
        'We validate, clean, and enrich every lead so your sales team engages only with accurate, compliant, and relevant opportunities.',
        ARRAY[
          'Confidence in Data – Every lead is accurate, compliant, and usable.',
          'Productive Sales Teams – No wasted time on invalid or duplicate records.',
          'Higher ROI – Campaigns perform better with validated, enriched data.'
        ],
        ARRAY[
          'Verification of inbound, third-party, or partner-provided leads.',
          'Enrichment with missing decision-maker or company data.',
          'CRM cleansing to restore accuracy and usability.'
        ],
        'Validate – Check all records for accuracy and compliance. Enrich – Add missing job, company, or firmographic details. Cleanse – Remove duplicates and outdated information. Deliver – Provide a refreshed, sales-ready database.',
        ARRAY['{
          "question": "What if my CRM is already outdated?",
          "answer": "We refresh, validate, and enrich your database to restore accuracy and effectiveness."
        }'::jsonb],
        ARRAY['Data validation tools', 'Enrichment platforms', 'CRM integration'],
        ARRAY['B2B Technology', 'Enterprise', 'Data-driven Companies']
      )
    `);
    
    // 6. Lead Nurturing & Buyer Engagement
    await db.execute(sql`
      INSERT INTO services (slug, title, description, benefits, features, methodology, faq_questions, tools_and_technologies, industries)
      VALUES (
        'lead-nurturing-buyer-engagement',
        'Lead Nurturing & Buyer Engagement',
        'We keep future buyers engaged with educational content and personalized touchpoints until they''re ready to talk with sales—ensuring no opportunity is lost.',
        ARRAY[
          'No Missed Opportunities – Every lead continues to receive value.',
          'Brand Trust Over Time – Stay top-of-mind until readiness peaks.',
          'Continuous Pipeline Growth – Build tomorrow''s revenue from today''s leads.'
        ],
        ARRAY[
          'Nurturing programs that educate buyers until they''re ready.',
          'Personalized journeys matched to each stage.',
          'Engagement strategies that build long-term trust.'
        ],
        'Segment Leads – Identify early-stage or non-sales-ready leads. Create Nurture Tracks – Deliver educational, stage-appropriate content. Engage by Behavior – Trigger touchpoints based on buyer activity. Re-Qualify – Pass nurtured leads to sales once intent is clear.',
        ARRAY['{
          "question": "Why not let sales manage nurturing?",
          "answer": "Sales should focus on closing deals—we ensure future buyers stay engaged until they''re ready."
        }'::jsonb],
        ARRAY['Marketing automation', 'Content management', 'Behavioral tracking'],
        ARRAY['B2B Technology', 'SaaS', 'Long Sales Cycle Industries']
      )
    `);
    
    console.log('✅ All services updated with exact user-specified content');
  } catch (error) {
    console.error('❌ Error updating service content:', error);
    throw error;
  }
}

// Run if called directly
updateExactServiceContent();

export default updateExactServiceContent;