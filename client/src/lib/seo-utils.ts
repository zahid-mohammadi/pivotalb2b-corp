import { BlogPost } from "@shared/schema";
import { apiRequest } from "./queryClient";

/**
 * Extract keywords from content based on frequency and relevance
 */
export function extractKeywords(content: string): string[] {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Split into words and filter out common words and short words
  const commonWords = new Set([
    'the', 'and', 'to', 'of', 'a', 'in', 'that', 'is', 'for', 'it', 'as', 'with', 'be', 'this',
    'by', 'are', 'or', 'an', 'on', 'but', 'which', 'from', 'we', 'you', 'they', 'our', 'their',
    'at', 'not', 'has', 'have', 'had', 'can', 'will', 'would', 'should', 'could', 'may', 'been',
    'was', 'were', 'what', 'when', 'why', 'how', 'who', 'where', 'all', 'any', 'if', 'its', 'his',
    'her', 'he', 'she', 'them', 'your', 'my', 'into', 'out', 'up', 'down', 'about'
  ]);
  
  // Word frequency map
  const wordFrequency: Record<string, number> = {};
  
  plainText.split(/\s+/)
    .map(word => word.toLowerCase().replace(/[^\w]/g, ''))
    .filter(word => word.length > 3 && !commonWords.has(word))
    .forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  
  // Convert to array, sort by frequency, and take top 15
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(entry => entry[0]);
}

/**
 * Generate a description from content by extracting first few sentences
 */
export function generateDescription(content: string): string {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Extract first few sentences (up to 160 characters)
  let description = plainText.substring(0, 200);
  
  // Try to end at a sentence if possible
  const lastPeriod = description.lastIndexOf('.');
  if (lastPeriod > 100) {
    description = description.substring(0, lastPeriod + 1);
  }
  
  return description.trim();
}

/**
 * Find related blog posts based on keyword similarity
 */
export async function findRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[]): Promise<BlogPost[]> {
  // Extract current post keywords (from tags or auto-extract)
  const currentKeywords = currentPost.tags || 
                          (currentPost.autoTags || []) || 
                          extractKeywords(currentPost.content);
  
  // Calculate similarity scores for each post
  const scoredPosts = allPosts
    .filter(post => post.id !== currentPost.id) // Exclude current post
    .map(post => {
      const postKeywords = post.tags || (post.autoTags || []) || extractKeywords(post.content || '');
      
      // Calculate similarity score (number of matching keywords)
      const matchingKeywords = postKeywords.filter(keyword => 
        currentKeywords.some(currentKeyword => 
          currentKeyword.toLowerCase() === keyword.toLowerCase()
        )
      );
      
      return {
        post,
        score: matchingKeywords.length
      };
    });
  
  // Sort by score (highest first) and return top 3
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(scoredPost => scoredPost.post);
}

/**
 * Update a blog post with automatically generated SEO metadata
 */
export async function autoGenerateSEO(post: BlogPost): Promise<BlogPost> {
  // Generate or update metadata if it doesn't exist
  const updates: Partial<BlogPost> = {};
  
  // Generate meta description
  if (!post.metaDescription) {
    updates.metaDescription = generateDescription(post.content);
  }
  
  // Generate tags if not provided
  if (!post.tags || post.tags.length === 0) {
    updates.autoTags = extractKeywords(post.content);
  }
  
  // If nothing to update, return original post
  if (Object.keys(updates).length === 0) {
    return post;
  }
  
  try {
    // Send updates to the API
    const response = await apiRequest(
      'PATCH',
      `/api/blog-posts/${post.id}`,
      updates
    );
    
    if (!response.ok) {
      throw new Error('Failed to update post with SEO data');
    }
    
    const updatedPost = await response.json();
    return updatedPost as BlogPost;
  } catch (error) {
    console.error('Failed to update post with SEO data:', error);
    return post;
  }
}

/**
 * Add internal links to content based on keyword matching
 */
export async function addInternalLinks(content: string, posts: BlogPost[]): Promise<string> {
  let processedContent = content;
  
  // If there's no content, return the original content
  if (!content) {
    console.log("No content provided for internal linking");
    return content;
  }
  
  // Get service pages to include in internal linking
  let services: any[] = [];
  try {
    const response = await fetch('/api/services');
    if (response.ok) {
      services = await response.json();
      console.log(`Found ${services.length} service pages for internal linking`);
    }
  } catch (error) {
    console.error("Error fetching service pages:", error);
  }
  
  // If there are no other posts or services, return the original content
  if ((!posts || posts.length === 0) && (!services || services.length === 0)) {
    console.log("No posts or services available for internal linking");
    return content;
  }
  
  console.log(`Found ${posts.length} posts and ${services.length} services for internal linking`);
  
  // Create a map of keywords to content items (blog posts and services) for efficient lookup
  const keywordMap = new Map<string, { type: 'blog' | 'service', item: any }>();
  
  // Add blog post keywords
  posts.forEach(post => {
    // Add the post title as a potential keyword for linking
    keywordMap.set(post.title.toLowerCase(), { type: 'blog', item: post });
    
    // Add all tags and autotags as keywords
    const keywords = [...(post.tags || []), ...(post.autoTags || [])];
    keywords.forEach(keyword => {
      if (keyword && keyword.length > 3) { // Only use keywords that are longer than 3 chars
        keywordMap.set(keyword.toLowerCase(), { type: 'blog', item: post });
      }
    });
  });
  
  // Add service page keywords
  services.forEach(service => {
    // Add the service title as a potential keyword for linking
    if (service.title && service.title.length > 3) {
      keywordMap.set(service.title.toLowerCase(), { type: 'service', item: service });
    }
    
    // Add service keywords from tags if they exist
    if (service.tags && Array.isArray(service.tags)) {
      service.tags.forEach((tag: string) => {
        if (tag && tag.length > 3) {
          keywordMap.set(tag.toLowerCase(), { type: 'service', item: service });
        }
      });
    }
    
    // Add some common service-related terms
    const serviceTerms = [
      'account-based marketing', 'abm', 'lead generation', 'intent data',
      'content marketing', 'content syndication', 'waterfall campaign'
    ];
    
    serviceTerms.forEach(term => {
      // Only add the term if it's related to this service (appears in title or description)
      if (service.title.toLowerCase().includes(term) || 
         (service.description && service.description.toLowerCase().includes(term))) {
        keywordMap.set(term, { type: 'service', item: service });
      }
    });
  });
  
  console.log(`Extracted ${keywordMap.size} keywords for matching`);
  
  // Make sure we don't match text inside existing links or HTML tags
  // This regex finds text between HTML tags but not inside attributes
  const contentTextRegex = />([^<]+)</g;
  const matches = Array.from(processedContent.matchAll(contentTextRegex));
  
  console.log(`Found ${matches.length} text segments to analyze`);
  
  // Track already linked words to avoid duplicate links
  const linkedWords = new Set<string>();
  const linkedItems = new Set<string>(); // Using string IDs like "blog-123" or "service-abc"
  
  // Process matches in reverse order to avoid messing up positions when adding links
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    if (!match || !match[1]) continue;
    
    const text = match[1];
    const startPos = match.index! + 1; // +1 to skip the '>'
    
    // Skip if this segment already contains an existing link
    if (text.includes('<a') || text.includes('</a>')) continue;
    
    // Look for matches with keywords
    for (const [keyword, mappedItem] of keywordMap.entries()) {
      const { type, item } = mappedItem;
      
      // Generate a unique ID for this content item
      const itemId = `${type}-${item.id || item.slug}`;
      
      // Skip if we already linked to this item
      if (linkedItems.has(itemId)) continue;
      
      // Find the keyword in the text, case insensitive
      try {
        // Escape special regex characters in the keyword
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const keywordRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
        const keywordMatch = text.match(keywordRegex);
        
        if (keywordMatch && !linkedWords.has(keyword.toLowerCase())) {
          const keywordPos = text.indexOf(keywordMatch[0]);
          if (keywordPos >= 0) {
            const absolutePos = startPos + keywordPos;
            const matchedWord = keywordMatch[0];
            
            // Determine the link URL based on content type
            let linkUrl = '';
            if (type === 'blog') {
              linkUrl = `/blog/${item.slug}`;
            } else if (type === 'service') {
              linkUrl = `/services/${item.slug}`;
            }
            
            // Replace the keyword with a link
            const before = processedContent.substring(0, absolutePos);
            const after = processedContent.substring(absolutePos + matchedWord.length);
            
            processedContent = `${before}<a href="${linkUrl}" class="text-primary hover:underline">${matchedWord}</a>${after}`;
            
            // Mark this keyword and item as linked to avoid duplicate links
            linkedWords.add(keyword.toLowerCase());
            linkedItems.add(itemId);
            
            console.log(`Added internal link to ${type} '${item.title || item.slug}' using keyword '${keyword}'`);
            
            // Limit to 8 internal links per post (to include both blogs and services)
            if (linkedItems.size >= 8) break;
          }
        }
      } catch (e) {
        console.error(`Error processing keyword '${keyword}':`, e);
      }
    }
    
    // Stop processing if we've reached our link limit
    if (linkedItems.size >= 8) break;
  }
  
  console.log(`Added ${linkedItems.size} internal links to content`);
  
  return processedContent;
}

/**
 * Complete SEO optimization for a blog post
 */
export async function optimizeBlogPost(post: BlogPost, allPosts: BlogPost[]): Promise<BlogPost> {
  console.log(`Starting optimization for post ID ${post.id}: ${post.title}`);
  
  // Step 1: Auto-generate SEO metadata
  const seoUpdatedPost = await autoGenerateSEO(post);
  console.log(`Generated SEO metadata for post: ${seoUpdatedPost.title}`);
  
  // Filter posts to exclude the current one and make sure we have valid posts
  const otherPosts = allPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.title && p.content && p.slug); // Make sure posts have required fields
  
  console.log(`Found ${otherPosts.length} other posts to use for internal linking`);
  otherPosts.forEach(p => console.log(`- Post for linking: ${p.id}: ${p.title}`));
  
  // Step 2: Add internal links to both blog posts and service pages
  console.log(`Adding internal links to post: ${post.title}`);
  const contentWithLinks = await addInternalLinks(seoUpdatedPost.content, otherPosts);
  console.log(`Content after internal linking has ${contentWithLinks.length} characters`);
  
  const withInternalLinks = {
    ...seoUpdatedPost,
    content: contentWithLinks
  };
  
  // Step 3: Save the updated post with internal links
  try {
    console.log(`Saving post ${post.id} with updated content`);
    
    const response = await apiRequest(
      'PATCH',
      `/api/blog-posts/${post.id}`,
      { 
        content: withInternalLinks.content,
        metaDescription: withInternalLinks.metaDescription,
        autoTags: withInternalLinks.autoTags
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to update post with internal links');
    }
    
    const finalPost = await response.json();
    console.log(`Successfully saved optimized post ${post.id}`);
    return finalPost as BlogPost;
  } catch (error) {
    console.error('Failed to update post with internal links:', error);
    return withInternalLinks;
  }
}