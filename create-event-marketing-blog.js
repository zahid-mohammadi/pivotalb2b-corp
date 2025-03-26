import fetch from 'node-fetch';

async function createBlogPost() {
  try {
    const currentDate = new Date().toISOString();
    
    // Create blog post content with proper HTML formatting
    const blogContent = `
<h4><strong>Introduction</strong></h4>
<p>Hosting a B2B event—whether it's a webinar, trade show, or workshop—is a big investment. But nothing stings more than seeing empty seats or a quiet Zoom room after all that effort. Low turnout isn't just a letdown; it's a missed opportunity to connect with buyers and drive revenue. Eventbrite reports that 70% of organizers struggle with attendance—yet the right strategy can flip that script.</p>

<p>So, what's holding your events back? In this post, we'll uncover the mistakes that kill turnout, share email and phone promotion tactics that actually work, and highlight success metrics to track. At Pivotal B2B, we've mastered event marketing—and we're spilling our best hacks to help you pack your next event. Let's dive in.</p>

<h4><strong>Mistakes That Kill Event Turnout</strong></h4>
<p>Before you can boost attendance, you need to dodge these common pitfalls:</p>

<h5><strong>Vague Messaging</strong></h5>
<p>"Join our webinar" doesn't cut it. If prospects don't know what's in it for them, they won't show up. A lack of clear value—like "Learn X to Solve Y"—means your invite gets trashed.</p>

<h5><strong>Poor Timing</strong></h5>
<p>Scheduling clashes kill turnout. A Tuesday 9 AM webinar might work for North America but flop for Asia-Pacific. Or worse, you're competing with industry giants. Timing missteps can slash attendance by 50%, per Zoom data.</p>

<h5><strong>No Follow-Up</strong></h5>
<p>One email isn't enough. Without reminders or personal nudges, registrants forget or flake. Studies show 30-50% of no-shows are due to lack of follow-up engagement.</p>

<h5><strong>Overlooking Promotion Channels</strong></h5>
<p>Relying on social media alone? You're missing half your audience. Decision-makers aren't scrolling LinkedIn all day—they're in inboxes or on calls. Ignoring email and phone cuts your reach.</p>

<h4><strong>Email and Phone Promotion Tactics That Work</strong></h4>
<p>At Pivotal B2B, our Event Marketing Solutions turn sparse crowds into packed houses. Here's how we use email and phone outreach to maximize attendance:</p>

<h5><strong>Targeted Email Invites</strong></h5>
<p>Segment your list by job role, industry, or pain point. Craft subject lines like "Hey [Name], Boost ROI at Our Summit" to grab attention—personalized emails lift open rates by 29%, per Campaign Monitor. Send a series: invite, reminder, last-chance alert.</p>
<p>Example: For a software client, we targeted IT managers with "Solve SaaS Challenges This Thursday," netting 200+ registrants.</p>

<h5><strong>Phone Outreach Precision</strong></h5>
<p>Calls seal the deal. After an email RSVP, a quick "Are you set for Tuesday?" confirms intent and builds rapport. It's personal—92% of B2B interactions involve a call, says InsideSales. For a telecom trade show, our calls boosted booth RSVPs by 150.</p>

<h5><strong>Value-First Messaging</strong></h5>
<p>Highlight takeaways: "Cut sales cycles by 30%" or "Meet 50+ vendors." A financial services seminar we promoted hit 300 registrants by promising "Regulatory Secrets Unveiled." Sell the benefit, not the event.</p>

<h5><strong>Multi-Touch Cadence</strong></h5>
<p>Combine email and phone for a one-two punch. Email tees up interest; phone locks in commitment. A professional services workshop reached 90% capacity with this combo—email invites plus follow-up calls.</p>

<h4><strong>Success Metrics to Track</strong></h4>
<p>How do you know your event marketing's winning? Focus on these:</p>

<h5><strong>Registration Rate</strong></h5>
<p>Goal: 50-70% of your invite list. If 1,000 invites yield 500 sign-ups, you're on track. Pivotal B2B clients average 60% with our tactics.</p>

<h5><strong>Attendance Rate</strong></h5>
<p>Aim for 70-80% of registrants showing up. Our multi-touch approach lifts this—e.g., 180 attendees from 225 registrants for an IT summit.</p>

<h5><strong>Engagement Post-Event</strong></h5>
<p>Measure follow-ups: demos booked, inquiries made. A vendor networking event we ran sparked 10 contracts from 120 attendees.</p>

<h5><strong>ROI</strong></h5>
<p>Tie attendance to revenue. If a webinar costs $5,000 but drives $50,000 in pipeline, that's a 10x return. We track this for every client.</p>

<h5><strong>Real Results Speak Louder</strong></h5>
<p>Our hacks deliver. A software webinar hit 200+ attendees with email/phone precision. A telecom booth saw 150 visits after targeted promotion. Events aren't guesswork—they're science, and we've got the formula.</p>

<h4><strong>Pack Your Next Event</strong></h4>
<p>Stop settling for half-empty events. With the right messaging, timing, and promotion, you can turn "maybe" into "yes" and fill every seat. At Pivotal B2B, we make it happen—virtual or in-person.</p>

<p>Want a custom plan to maximize your next event? Get a free event promotion plan from us today—let's make it a sellout.</p>

<div class="mt-8">
  <a href="/services/waterfall-campaign-suite" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
    Get Your Free Event Promotion Plan
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
        title: "Event Marketing Hacks to Maximize Attendance",
        slug: "event-marketing-hacks-to-maximize-attendance",
        content: blogContent,
        metaDescription: "Discover proven event marketing hacks to maximize attendance at your B2B events. Learn email and phone promotion tactics that drive registrations and attendance.",
        tags: ["event marketing", "B2B events", "email marketing", "phone outreach", "attendance maximization"],
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

// Event-specific internal linking function
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
    
    // Add service keywords with specific focus on event-related services
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
      
      // Special case for event-related terms
      if (service.title.toLowerCase().includes('email') || 
          service.title.toLowerCase().includes('call') ||
          service.title.toLowerCase().includes('phone') ||
          service.title.toLowerCase().includes('outreach') ||
          (service.description && (
            service.description.toLowerCase().includes('event') ||
            service.description.toLowerCase().includes('webinar') ||
            service.description.toLowerCase().includes('conference')
          ))) {
        keywordTargets.push({
          keyword: 'email marketing',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
        
        keywordTargets.push({
          keyword: 'phone outreach',
          type: 'service',
          slug: service.slug,
          title: service.title
        });
      }
      
      // Common service keywords to check
      const serviceTerms = [
        'account-based marketing', 'abm', 'lead generation', 'intent data',
        'email campaigns', 'phone outreach', 'event marketing', 'webinars',
        'audience reach', 'b2b marketing', 'waterfall campaign'
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