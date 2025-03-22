import fetch from 'node-fetch';

async function createContent() {
  const API_URL = 'http://0.0.0.0:5000/api';

  // Create Content Syndication Service
  await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Content Syndication",
      slug: "content-syndication",
      description: "Create and distribute compelling B2B content that resonates with your target audience.",
      features: [
        "Automated content distribution",
        "Performance tracking and analytics",
        "Integration with various content platforms"
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