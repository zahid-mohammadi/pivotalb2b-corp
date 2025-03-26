import fetch from 'node-fetch';

async function createBlogPost() {
  try {
    const currentDate = new Date().toISOString();
    
    // Create blog post content with proper HTML formatting
    const blogContent = `
<h4><strong>Introduction</strong></h4>
<p>Chasing cold accounts in B2B can feel like shouting into the void—lots of effort, little payoff. Traditional marketing casts a wide net, hoping something sticks, but high-value accounts often slip through. What if you could flip that script and turn those icy prospects into sizzling deals? That's where Account-Based Marketing (ABM) comes in. Gartner predicts that by 2026, 70% of B2B marketers will use ABM to target key accounts—so why wait?</p>

<p>In this post, we'll compare ABM to traditional marketing, explain how engaging buying groups unlocks success, and showcase how Pivotal B2B delivers ABM results that turn cold leads into hot wins. Ready to heat up your pipeline? Let's dive in.</p>

<h4><strong>ABM vs. Traditional Marketing: The Big Difference</strong></h4>
<p>Traditional marketing and ABM are like fishing with a net versus a spear. Here's how they stack up:</p>

<h5><strong>Scope</strong></h5>
<p>Traditional: Broad, volume-focused. Think mass emails or trade show booths grabbing anyone who walks by. It's a numbers game—lots of leads, low conversion.</p>
<p>ABM: Narrow, precision-driven. You target specific accounts—like that $1M software deal—and tailor everything to them.</p>

<h5><strong>Personalization</strong></h5>
<p>Traditional: One-size-fits-all messaging. A generic "Buy Now" email hits inboxes, but 80% of buyers ignore it, per Gartner.</p>
<p>ABM: Hyper-personalized. You craft offers for a CIO's pain points—e.g., "Cut Downtime by 20%"—and they listen.</p>

<h5><strong>ROI</strong></h5>
<p>Traditional: Scattered returns. Demand Metric says only 25% of broad campaigns yield positive ROI.</p>
<p>ABM: High-impact wins. ITSMA reports ABM delivers 208% more revenue than traditional methods for key accounts.</p>

<h5><strong>Focus</strong></h5>
<p>Traditional: Lead quantity. You're judged on form fills, not closes.</p>
<p>ABM: Account quality. It's about landing the big fish—think enterprise contracts, not small fry.</p>

<h4><strong>Buying Group Engagement: The ABM Secret Sauce</strong></h4>
<p>ABM isn't just about targeting accounts—it's about winning over the people inside them. B2B deals often hinge on multiple decision-makers, or the "buying group." Here's why engaging them is key:</p>

<h5><strong>Multiple Stakeholders Matter</strong></h5>
<p>A Capterra study found B2B purchases involve 6-10 people on average. Miss one—like the CFO who controls budget—and your deal stalls. ABM maps the group—CIO, VP, Procurement—and hits them all.</p>

<h5><strong>Tailored Messaging Wins Trust</strong></h5>
<p>Each role gets a custom pitch. The IT Director hears about tech benefits; the CEO gets ROI stats. This alignment builds consensus fast—our clients see sales cycles drop by 40%.</p>

<h5><strong>Personal Outreach Closes Gaps</strong></h5>
<p>ABM uses emails and calls to connect directly. A generic blast won't sway a VP, but a "Hey [Name], Solve X" email followed by a call does. It's human, not spam.</p>

<h4><strong>Pivotal B2B's ABM Results: Cold to Hot in Action</strong></h4>
<p>At Pivotal B2B, our Account-Based Marketing service turns cold accounts into hot deals with a proven playbook:</p>

<h5><strong>Account Selection</strong></h5>
<p>We pick high-value targets—say, 10 enterprise software firms—based on revenue potential and fit. No guesswork, just strategy.</p>

<h5><strong>Buying Group Mapping</strong></h5>
<p>We identify every player—e.g., CIOs and Directors for an IT services client—and tailor outreach. For a telecom giant, this engaged 5 key stakeholders per account.</p>

<h5><strong>Personalized Campaigns</strong></h5>
<p>Emails, calls, and content hit each role's pain points. A financial services firm got "Compliance Made Easy" for execs and "Cost Savings" for CFOs—4 accounts moved to contracts in 8 weeks.</p>

<h5><strong>Fast-Track Results</strong></h5>
<p>Our ABM shortens cycles and lifts wins. A software client closed 3 major deals in 90 days; a vendor secured 4 contracts in 10 weeks—all from cold starts.</p>

<h5><strong>Proof in the Numbers</strong></h5>
<p>Our clients see it work. A consulting firm cut sales time by 30% and onboarded 5 mid-sized accounts. A B2B agency partner delivered 6 closed accounts for their client in 4 months. ABM isn't hype—it's heat.</p>

<h4><strong>Turn Your Cold Accounts Hot</strong></h4>
<p>Why chase leads when you can win accounts? ABM flips cold prospects into hot deals by focusing on who matters and how to reach them. At Pivotal B2B, we've got the tools to make it happen.</p>

<p>Ready to target your key accounts? Start your ABM campaign with us today and watch those deals ignite.</p>

<div class="mt-8">
  <a href="/services/account-based-marketing" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
    Start Your ABM Campaign With Us
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
        title: "How ABM Turns Cold Accounts into Hot Deals",
        slug: "how-abm-turns-cold-accounts-into-hot-deals",
        content: blogContent,
        metaDescription: "Learn how Account-Based Marketing (ABM) outperforms traditional marketing by targeting specific accounts and engaging key buying group stakeholders to increase conversion rates.",
        tags: ["account-based marketing", "ABM", "B2B marketing", "buying group", "targeted marketing"],
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

// ABM-specific internal linking function
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
    
    // Add service keywords with specific focus on ABM and account-based marketing
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
      
      // Special case for ABM-related terms
      if (service.title.toLowerCase().includes('account') || 
          (service.description && service.description.toLowerCase().includes('abm'))) {
        keywordTargets.push({
          keyword: 'account-based marketing',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
        
        keywordTargets.push({
          keyword: 'abm',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
      }
      
      // Common ABM-related keywords to check
      const abmTerms = [
        'account targeting', 'target accounts', 'buying group', 'personalized outreach',
        'account strategy', 'b2b marketing', 'personalization', 'sales cycles',
        'roi', 'key accounts'
      ];
      
      abmTerms.forEach(term => {
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