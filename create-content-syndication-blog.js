import fetch from 'node-fetch';

async function createBlogPost() {
  try {
    const currentDate = new Date().toISOString();
    
    // Create blog post content with proper HTML formatting
    const blogContent = `
<h4><strong>Introduction</strong></h4>
<p>In B2B marketing, getting your brand in front of the right buyers can feel like finding a needle in a haystack. You've got great content—whitepapers, blogs, videos—but if it's stuck on your website, it's not working hard enough. Enter content syndication, a game-changer that puts your message where your audience already hangs out. According to SiriusDecisions, 67% of the buyer's journey happens digitally—often on third-party platforms. So, how do you tap into that?</p>

<p>In this post, we'll explore how content syndication supercharges your brand reach, break down the types of content that shine in this strategy, and reveal how Pivotal B2B uses curated channels to connect you with buyers—right where they are. Let's get started.</p>

<h4><strong>How Content Syndication Boosts Brand Reach</strong></h4>
<p>Content syndication is like a megaphone for your marketing. It takes your existing assets and distributes them across trusted, high-traffic platforms—think industry blogs, partner sites, or email newsletters. Here's why it's a must-have:</p>

<h5><strong>Wider Audience Exposure</strong></h5>
<p>Your website alone can't compete with the reach of established networks. Syndication places your content on platforms your buyers already trust, exposing your brand to thousands—or millions—more eyes. A NetLine study found syndicated content generates 45% more leads than on-site content alone.</p>

<h5><strong>Builds Trust and Authority</strong></h5>
<p>When your content appears alongside reputable sources, it borrows their credibility. Buyers see your brand as a thought leader, not just another vendor. For example, a whitepaper on a tech site can position you as an expert faster than a solo blog post.</p>

<h5><strong>Targets the Right Buyers</strong></h5>
<p>Syndication isn't random—it's strategic. By choosing channels aligned with your audience (e.g., IT pros on tech forums), you reach decision-makers actively seeking solutions. This precision beats blasting ads into the void.</p>

<h5><strong>Cost-Effective Scale</strong></h5>
<p>Creating content is pricey, but syndication maximizes its mileage. One asset can live on multiple platforms, driving engagement without breaking the bank. It's ROI gold—more bang for your content buck.</p>

<h4><strong>Examples of Effective Content Types for Syndication</strong></h4>
<p>Not all content is created equal for syndication. Here's what works best—and why:</p>

<h5><strong>Whitepapers</strong></h5>
<p>Why: In-depth, data-rich, and gated, they attract serious buyers. A whitepaper on "Cloud Security Trends" syndicated to IT sites can spark 200+ downloads, like it did for a Pivotal B2B client.</p>
<p>Tip: Keep titles specific (e.g., "2025 SaaS Growth Strategies").</p>

<h5><strong>Blog Posts</strong></h5>
<p>Why: Bite-sized and shareable, blogs build awareness fast. A post like "5 Lead Gen Mistakes to Avoid" on a marketing hub can drive traffic back to your site.</p>

<h5><strong>Infographics</strong></h5>
<p>Why: Visuals grab attention—fast. An infographic on "ABM Success Stats" syndicated to LinkedIn or partner sites can rack up shares and clicks.</p>

<h5><strong>Case Studies</strong></h5>
<p>Why: Proof sells. A story of "How We Boosted Telecom Leads by 300+" on an industry newsletter builds trust and inspires action.</p>
<p>Tip: Highlight results upfront (e.g., "40% ROI in 60 days").</p>

<h4><strong>Pivotal B2B's Curated Channel Strategy: Reaching Buyers with Precision</strong></h4>
<p>At Pivotal B2B, we don't just toss your content into the wild—we place it where it'll thrive. Our Content Syndication service is built on a curated channel strategy that delivers:</p>

<h5><strong>Audience-First Selection</strong></h5>
<p>We match your content to platforms your buyers frequent. For a financial services client, we targeted CFO-focused newsletters and forums, driving 40% more brand searches in a month.</p>

<h5><strong>Tailored Distribution</strong></h5>
<p>Your content gets optimized for each channel—think reformatted blogs for mobile readers or teaser videos for email digests. A vendor client's demo video hit 150+ engagements this way.</p>

<h5><strong>Engagement Tracking</strong></h5>
<p>We monitor how buyers interact—views, downloads, clicks—so you know what's working. For an IT services firm, this revealed infographics outperformed blogs, doubling down on visuals.</p>

<h5><strong>Amplified Results</strong></h5>
<p>Our approach isn't set-it-and-forget-it. We refine based on data, ensuring your brand stays top-of-mind. A software client saw a 50% traffic spike after we syndicated their whitepaper across tech blogs.</p>

<h5><strong>Real-World Wins</strong></h5>
<p>The proof? A telecom client's case study reached 300+ prospects via partner sites, sparking 30 follow-ups. A B2B agency partner delivered 400+ engagements for their client in 90 days. Syndication works—and we make it work for you.</p>

<h4><strong>Take Your Content Further</strong></h4>
<p>Ready to stop waiting for buyers to find you? Content syndication flips the script, putting your brand where it belongs—in front of the right people, at the right time. At Pivotal B2B, we've mastered the art of reaching buyers where they are.</p>

<p>Want to see how it fits your strategy? Learn more about our Content Syndication service and start amplifying your reach today.</p>

<div class="mt-8">
  <a href="/services/content-syndication" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
    Learn More About Our Syndication Service
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
        title: "The Power of Content Syndication: Reaching Buyers Where They Are",
        slug: "the-power-of-content-syndication-reaching-buyers-where-they-are",
        content: blogContent,
        metaDescription: "Discover how B2B content syndication expands your brand reach and connects you with buyers through strategic content distribution on targeted industry channels.",
        tags: ["content syndication", "B2B content marketing", "content distribution", "lead generation"],
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
    .filter(word => word.length > 3 && !['this', 'that', 'your', 'with', 'which', 'what', 'from', 'have', 'they', 'them'].includes(word));
  
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

// Simplified internal linking function
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
    
    // Add service keywords with specific focus on content syndication
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
      
      // Special case for content syndication
      if (service.title.toLowerCase().includes('content syndication') || 
          (service.description && service.description.toLowerCase().includes('content syndication'))) {
        keywordTargets.push({
          keyword: 'content syndication',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
      }
      
      // Common service keywords to check
      const serviceTerms = [
        'account-based marketing', 'abm', 'lead generation', 'intent data',
        'content marketing', 'content syndication', 'waterfall campaign',
        'audience reach', 'b2b marketing'
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