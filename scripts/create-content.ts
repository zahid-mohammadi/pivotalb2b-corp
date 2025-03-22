import fetch from 'node-fetch';

async function createContent() {
  const API_URL = 'http://0.0.0.0:3000/api';

  // Create Content Syndication Service
  await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Content Syndication",
      slug: "content-syndication",
      description: "Amplify your content's reach and engage decision-makers through strategic B2B content syndication.",
      features: [],
      benefits: [
        "Increased brand visibility and awareness",
        "Higher quality leads and better conversion rates",
        "Broader reach across targeted industries",
        "Enhanced content ROI",
        "Improved market positioning"
      ],
      methodology: "<h3>Our Content Syndication Process</h3><p>We follow a systematic approach to ensure your content reaches the right audience:</p><ol><li>Content Analysis & Strategy Development</li><li>Target Audience Identification</li><li>Distribution Channel Selection</li><li>Content Optimization & Formatting</li><li>Performance Tracking & Optimization</li></ol>",
      toolsAndTechnologies: [
        "Advanced Content Distribution Platforms",
        "Analytics and Tracking Tools",
        "Marketing Automation Systems",
        "Lead Scoring Technology"
      ],
      useCases: [
        {
          title: "Enterprise Technology Company",
          description: "Global tech firm seeking to expand market reach",
          challenge: "Limited content visibility in target markets",
          solution: "Implemented strategic content syndication across key channels",
          outcome: "200% increase in qualified leads"
        }
      ],
      faqQuestions: [
        {
          question: "How does content syndication work?",
          answer: "Content syndication strategically distributes your content across relevant platforms and networks to reach your target audience effectively."
        },
        {
          question: "What types of content can be syndicated?",
          answer: "We can syndicate various content types including whitepapers, case studies, blog posts, and industry reports."
        }
      ]
    })
  });

  // Create Content Syndication Service
  await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Content Syndication",
      slug: "content-syndication",
      description: "Amplify your content's reach and engage decision-makers through strategic B2B content syndication.",
      features: [],
      benefits: [
        "Increased brand visibility and awareness",
        "Higher quality leads and better conversion rates",
        "Broader reach across targeted industries",
        "Enhanced content ROI",
        "Improved market positioning"
      ],
      methodology: `
        <h3>Our Content Syndication Process</h3>
        <p>We follow a systematic approach to ensure your content reaches the right audience:</p>
        <ol>
          <li>Content Analysis & Strategy Development</li>
          <li>Target Audience Identification</li>
          <li>Distribution Channel Selection</li>
          <li>Content Optimization & Formatting</li>
          <li>Performance Tracking & Optimization</li>
        </ol>
      `,
      successMetrics: [
        "Increased content engagement",
        "Higher lead quality",
        "Improved conversion rates",
        "Enhanced brand visibility"
      ],
      toolsAndTechnologies: [
        "Advanced Content Distribution Platforms",
        "Analytics and Tracking Tools",
        "Marketing Automation Systems",
        "Lead Scoring Technology"
      ],
      useCases: [
        {
          title: "Enterprise Technology Company",
          description: "Global tech firm seeking to expand market reach",
          challenge: "Limited content visibility in target markets",
          solution: "Implemented strategic content syndication across key channels",
          outcome: "200% increase in qualified leads"
        }
      ],
      faqQuestions: [
        {
          question: "How does content syndication work?",
          answer: "Content syndication strategically distributes your content across relevant platforms and networks to reach your target audience effectively."
        },
        {
          question: "What types of content can be syndicated?",
          answer: "We can syndicate various content types including whitepapers, case studies, blog posts, and industry reports."
        }
      ]
    })
  });


  // Create Blog Post
  await fetch(`${API_URL}/blog-posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Maximizing ROI with Intent-Based B2B Lead Generation',
      slug: 'maximizing-roi-intent-based-marketing',
      content: '# Maximizing ROI with Intent-Based B2B Lead Generation\n\nIn today\'s competitive B2B landscape...',
      metaDescription: 'Learn how intent data is revolutionizing B2B lead generation',
      tags: ['lead generation', 'intent data', 'B2B marketing'],
      publishedAt: new Date().toISOString()
    })
  });

  // Create Ebook
  await fetch(`${API_URL}/ebooks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'The Ultimate B2B Marketing Guide 2024',
      slug: 'b2b-marketing-guide-2024',
      description: 'A comprehensive guide to modern B2B marketing strategies',
      pdfUrl: '/uploads/b2b-marketing-guide.pdf',
      tags: ['marketing', 'guide', 'B2B'],
      publishedAt: new Date().toISOString()
    })
  });

  // Create Case Study
  await fetch(`${API_URL}/case-studies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'How a Tech Company Increased Qualified Leads by 300%',
      slug: 'tech-company-success',
      clientName: 'Enterprise Software Solutions Inc.',
      industry: 'Technology',
      challenge: 'Low quality leads and long sales cycles',
      solution: 'Intent-based lead targeting and ABM strategy',
      results: '300% increase in qualified leads, 40% shorter sales cycle',
      publishedAt: new Date().toISOString()
    })
  });
}

createContent().catch(console.error);