import fetch from 'node-fetch';

async function createBlogPost() {
  try {
    const currentDate = new Date().toISOString();
    
    // Create blog post content with proper HTML formatting
    const blogContent = `
<h4><strong>Introduction</strong></h4>
<p>Ever feel like your sales team is spinning its wheels on leads that never close? You're not imagining it—studies show up to 70% of B2B leads are unqualified, clogging pipelines and burning time. The fix? Smart lead qualification. Enter BANT, a tried-and-true framework that separates the wheat from the chaff. But what is it, and why does it work so well?</p>

<p>In this post, we'll break down BANT (Budget, Authority, Need, Timeline), explain how it saves you time and boosts conversions, and show how Pivotal B2B takes it to the next level with our Lead Qualification Services. Ready to turn your leads into deals? Let's get into it.</p>

<h4><strong>What Is BANT? A Quick Breakdown</strong></h4>
<p>BANT is a four-step checklist to qualify leads. Developed by IBM decades ago, it's still gold for B2B because it focuses on what matters. Here's the rundown:</p>

<h5><strong>Budget</strong></h5>
<p>Can they afford your solution? If a lead lacks funds—or won't disclose them—they're not serious yet.</p>
<p>Example: A $50K software deal won't fly with a $5K budget.</p>

<h5><strong>Authority</strong></h5>
<p>Do they have decision-making power? Talking to a gatekeeper instead of a VP wastes cycles.</p>
<p>Example: A manager might love your pitch, but only the CIO can sign off.</p>

<h5><strong>Need</strong></h5>
<p>Do they have a problem you can solve? No pain, no sale—simple as that.</p>
<p>Example: A telecom firm needing faster connectivity is a fit; one happy with their setup isn't.</p>

<h5><strong>Timeline</strong></h5>
<p>When are they ready to buy? "Someday" leads stall your pipeline—focus on "now" or "soon."</p>
<p>Example: A Q3 rollout beats a vague "next year."</p>

<h4><strong>Why BANT Saves Time (And Sanity)</strong></h4>
<p>Lead qualification isn't just about finding winners—it's about cutting losers fast. Here's why BANT is a time-saver:</p>

<h5><strong>Filters Out Noise</strong></h5>
<p>Unqualified leads eat hours. BANT spots them early—e.g., no budget? Done. No authority? Next. A Marketo study found sales reps spend 20% of their time on dead-end leads. BANT slashes that.</p>

<h5><strong>Speeds Up Sales Cycles</strong></h5>
<p>Qualified leads move faster. If they've got budget, authority, need, and a timeline, you're not waiting months to close. Our clients see cycles shrink by 30% with BANT.</p>

<h5><strong>Boosts Conversion Rates</strong></h5>
<p>Focus on high-intent leads means higher wins. Research from Sales Insights Lab shows qualified leads convert 3x more than unqualified ones. Less chasing, more closing.</p>

<h5><strong>Aligns Sales and Marketing</strong></h5>
<p>BANT gives both teams a clear target. Marketing hands off leads that fit; sales works them efficiently. No more finger-pointing—just results.</p>

<h4><strong>Pivotal B2B's Qualification Edge: BANT Done Right</strong></h4>
<p>At Pivotal B2B, we don't just use BANT—we perfect it. Our Lead Qualification Services take your raw leads and turn them into gold. Here's how:</p>

<h5><strong>Lead Sourcing + BANT</strong></h5>
<p>We generate leads with email and phone outreach, then apply BANT to filter them. For a software client, we sourced 50 leads and qualified 20 as sales-ready in eight weeks—all with budget and authority confirmed.</p>

<h5><strong>Precision Evaluation</strong></h5>
<p>Our team digs deep. Budget? We ask numbers. Authority? We find the decision-maker. Need? We match it to your solution. Timeline? We pin it down. A telecom client got 25 qualified leads in 60 days—30% faster sales cycles followed.</p>

<h5><strong>Custom Scoring</strong></h5>
<p>We rank leads by fit and readiness, so your sales team knows who to call first. A financial services firm saw a 35% consultation boost by prioritizing BANT-qualified leads.</p>

<h5><strong>Seamless Delivery</strong></h5>
<p>Qualified leads land in your CRM—Salesforce, HubSpot, you name it—ready to close. An IT consulting client closed 10 deals from 20 BANT leads in two months.</p>

<h5><strong>Results That Prove It</strong></h5>
<p>Our edge pays off. A SaaS provider cut pursuit time by 50% with BANT-qualified leads. A B2B vendor signed 30% more contracts in 60 days. BANT isn't just theory—it's your pipeline's secret weapon.</p>

<h4><strong>Start Qualifying Smarter</strong></h4>
<p>Stop drowning in a sea of "maybe" leads. BANT qualification cuts the fat, saves time, and drives conversions—and Pivotal B2B makes it effortless. Want to see it in action? Request a free lead qualification demo today—we'll show you how to turn your leads into revenue.</p>

<div class="mt-8">
  <a href="/services/intent-based-lead-generation" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
    Request a Lead Qualification Demo
  </a>
</div>
    `;
    
    // Create the blog post
    const response = await fetch("http://localhost:3000/api/blog-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "BANT 101: Qualifying Leads That Actually Convert",
        slug: "bant-101-qualifying-leads-that-actually-convert",
        content: blogContent,
        metaDescription: "Learn how to use the BANT framework (Budget, Authority, Need, Timeline) to qualify B2B leads that actually convert and stop wasting time on unqualified prospects.",
        tags: ["BANT", "lead qualification", "B2B leads", "conversion rates", "sales pipeline"],
        coverImage: "/logo.png",
        publishedAt: currentDate,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const newBlog = await response.json();
    console.log("✅ Blog post created successfully!");
    console.log("Title:", newBlog.title);
    console.log("ID:", newBlog.id);
    console.log("Slug:", newBlog.slug);
    
    // Now run SEO optimization to add internal links
    console.log("\nRunning SEO optimization to add internal links...");
    await optimizeBlogPost(newBlog.slug);
    
    console.log("\n✅ All done! New blog post is ready to view.");
    console.log(`View at: http://localhost:3000/blog/${newBlog.slug}`);
    
  } catch (error) {
    console.error("Error creating blog post:", error);
  }
}

async function optimizeBlogPost(postSlug) {
  try {
    // First, get the post details
    const response = await fetch(`http://localhost:3000/api/blog-posts/${postSlug}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const post = await response.json();
    console.log(`Processing optimization for post: "${post.title}" (ID: ${post.id})`);
    
    // Get all posts to use for internal linking
    const allPostsResponse = await fetch('http://localhost:3000/api/blog-posts');
    const allPosts = await allPostsResponse.json();
    console.log(`Found ${allPosts.length} total posts`);
    
    // Extract keywords from content
    const keywords = extractKeywords(post.content);
    console.log(`Extracted keywords: ${keywords.join(', ')}`);
    
    // Generate meta description if it doesn't exist
    if (!post.metaDescription) {
      post.metaDescription = generateDescription(post.content);
      console.log(`Generated meta description: ${post.metaDescription}`);
    }
    
    // Add internal links - this will make requests to get service information
    console.log(`Analyzing content for internal linking opportunities...`);
    
    // Find keywords that match service names or other posts
    const contentWithLinks = await addInternalLinks(post.content, allPosts.filter(p => p.id !== post.id));
    
    // Update the post with optimized content and metadata
    const updateResponse = await fetch(`http://localhost:3000/api/blog-posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: contentWithLinks,
        metaDescription: post.metaDescription,
        autoTags: keywords
      }),
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Failed to update post: ${updateResponse.status}`);
    }
    
    const updatedPost = await updateResponse.json();
    console.log(`✅ Successfully optimized post!`);
    console.log(`- Added internal links`);
    console.log(`- Updated meta description`);
    console.log(`- Added ${keywords.length} auto-tags`);
    
    return updatedPost;
  } catch (error) {
    console.error('Error optimizing post:', error);
  }
}

// Simple keyword extraction function
function extractKeywords(content) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ');
  
  // Split into words and clean up
  const words = text.toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/[^\w]/g, ''))
    .filter(word => word.length > 3 && !['this', 'that', 'your', 'with', 'which', 'what', 'from', 'have', 'they', 'them', 'they'].includes(word));
  
  // Count word frequency
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Sort by frequency and take top 10
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
}

// Simple description generator
function generateDescription(content) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Take first 160 characters or so
  return text.length > 160 ? `${text.substring(0, 157)}...` : text;
}

// BANT-specific internal linking function
async function addInternalLinks(content, otherPosts) {
  try {
    // Get services for potential linking
    const servicesResponse = await fetch('http://localhost:3000/api/services');
    const services = servicesResponse.ok ? await servicesResponse.json() : [];
    
    console.log(`Found ${otherPosts.length} other posts and ${services.length} services for internal linking`);
    
    // Create an array of potential keywords to match
    const keywordTargets = [];
    
    // Add blog post keywords
    otherPosts.forEach(post => {
      // Add post title as keyword
      keywordTargets.push({
        keyword: post.title.toLowerCase(),
        type: 'blog',
        slug: post.slug,
        title: post.title
      });
      
      // Add tags as keywords
      const tags = [...(post.tags || []), ...(post.autoTags || [])];
      tags.forEach(tag => {
        if (tag && tag.length > 3) {
          keywordTargets.push({
            keyword: tag.toLowerCase(),
            type: 'blog',
            slug: post.slug,
            title: post.title
          });
        }
      });
    });
    
    // Add service keywords with specific focus on lead generation and qualification
    services.forEach(service => {
      // Add service title as keyword
      if (service.title && service.title.length > 3) {
        keywordTargets.push({
          keyword: service.title.toLowerCase(),
          type: 'service',
          slug: service.slug,
          title: service.title
        });
      }
      
      // Special case for lead-related terms
      if (service.title.toLowerCase().includes('lead') || 
          (service.description && service.description.toLowerCase().includes('qualification'))) {
        keywordTargets.push({
          keyword: 'lead qualification',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
        
        keywordTargets.push({
          keyword: 'leads',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
      }
      
      // Common service keywords to check
      const serviceTerms = [
        'lead generation', 'intent data', 'bant', 'qualify', 'qualification',
        'sales pipeline', 'conversion rate', 'b2b leads', 'conversion optimization',
        'crm', 'sales cycle'
      ];
      
      serviceTerms.forEach(term => {
        if (service.title.toLowerCase().includes(term) || 
            (service.description && service.description.toLowerCase().includes(term))) {
          keywordTargets.push({
            keyword: term,
            type: 'service',
            slug: service.slug,
            title: service.title
          });
        }
      });
    });
    
    console.log(`Created ${keywordTargets.length} keyword targets for internal linking`);
    
    // Extract text segments for analysis
    const contentTextRegex = />([^<]+)</g;
    const matches = Array.from(content.matchAll(contentTextRegex));
    
    console.log(`Found ${matches.length} text segments to analyze`);
    
    // Track added links
    const linkedKeywords = new Set();
    const linkedItems = new Set();
    let processedContent = content;
    
    // Process segments in reverse to avoid messing up positions
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      if (!match || !match[1]) continue;
      
      const text = match[1];
      const startPos = match.index + 1; // +1 to skip the '>'
      
      // Skip if already contains links
      if (text.includes('<a') || text.includes('</a>')) continue;
      
      // Check text for matching keywords
      for (const target of keywordTargets) {
        // Skip if we've already linked this item
        const itemId = `${target.type}-${target.slug}`;
        if (linkedItems.has(itemId)) continue;
        
        // Skip if we've already linked this keyword
        if (linkedKeywords.has(target.keyword)) continue;
        
        // Look for keyword in text
        try {
          const escapedKeyword = target.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const keywordRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
          const keywordMatch = text.match(keywordRegex);
          
          if (keywordMatch) {
            const keywordPos = text.indexOf(keywordMatch[0]);
            if (keywordPos >= 0) {
              const absolutePos = startPos + keywordPos;
              const matchedWord = keywordMatch[0];
              
              // Create the link URL
              const linkUrl = target.type === 'blog' 
                ? `/blog/${target.slug}` 
                : `/services/${target.slug}`;
              
              // Insert the link
              const before = processedContent.substring(0, absolutePos);
              const after = processedContent.substring(absolutePos + matchedWord.length);
              
              processedContent = `${before}<a href="${linkUrl}" class="text-primary hover:underline">${matchedWord}</a>${after}`;
              
              // Track linked items
              linkedKeywords.add(target.keyword);
              linkedItems.add(itemId);
              
              console.log(`Added internal link to ${target.type} '${target.title}' using keyword '${target.keyword}'`);
              
              // Limit to 8 links per post
              if (linkedItems.size >= 8) break;
            }
          }
        } catch (err) {
          console.error(`Error processing keyword '${target.keyword}':`, err);
        }
      }
      
      // Stop if we've reached our link limit
      if (linkedItems.size >= 8) break;
    }
    
    console.log(`Added ${linkedItems.size} internal links to content`);
    return processedContent;
  } catch (error) {
    console.error('Error adding internal links:', error);
    return content;
  }
}

// Execute the script
createBlogPost()
  .then(() => console.log('Blog creation complete!'))
  .catch(err => console.error('Error:', err));