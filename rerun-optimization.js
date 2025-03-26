import fetch from 'node-fetch';

async function getBlogPosts() {
  try {
    const response = await fetch('http://localhost:3000/api/blog-posts');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function runOptimization(postSlug) {
  try {
    // First, get the post details
    const response = await fetch(`http://localhost:3000/api/blog-posts/${postSlug}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const post = await response.json();
    console.log(`Processing optimization for post: "${post.title}" (ID: ${post.id})`);
    
    // Get all posts to use for internal linking
    const allPosts = await getBlogPosts();
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

// Simple keyword extraction function (simplified version of what's in seo-utils.ts)
function extractKeywords(content) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ');
  
  // Split into words and clean up
  const words = text.toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/[^\w]/g, ''))
    .filter(word => word.length > 3);
  
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

// Simple description generator (simplified version of what's in seo-utils.ts)
function generateDescription(content) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Take first 160 characters or so
  return text.length > 160 ? `${text.substring(0, 157)}...` : text;
}

// Simplified internal linking function that calls the API endpoint
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
    
    // Add service keywords
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
      
      // Common service keywords to check
      const serviceTerms = [
        'account-based marketing', 'abm', 'lead generation', 'intent data',
        'content marketing', 'content syndication', 'waterfall campaign'
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

// Execute the script for the "Why Your Lead Gen Strategy Isn't Working" post by slug
runOptimization('why-your-lead-gen-strategy-isnt-working-and-how-to-fix-it-m8qcedc3')
  .then(() => console.log('Optimization complete!'))
  .catch(err => console.error('Error:', err));