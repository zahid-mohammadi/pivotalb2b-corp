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
export function addInternalLinks(content: string, posts: BlogPost[]): string {
  let processedContent = content;
  
  // Create a map of keywords to blog posts for efficient lookup
  const keywordPostMap = new Map<string, BlogPost>();
  
  posts.forEach(post => {
    const keywords = [...(post.tags || []), ...(post.autoTags || [])];
    keywords.forEach(keyword => {
      keywordPostMap.set(keyword.toLowerCase(), post);
    });
  });
  
  // Regular expression to find potential keywords in content (outside of HTML tags)
  const contentTextRegex = />([^<]+)</g;
  const matches = Array.from(content.matchAll(contentTextRegex));
  
  // Track already linked words to avoid duplicate links
  const linkedWords = new Set<string>();
  
  // Process matches in reverse order to avoid messing up positions when adding links
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const text = match[1];
    const startPos = match.index! + 1; // +1 to skip the '>'
    
    // Look for matches with keywords
    keywordPostMap.forEach((post, keyword) => {
      // Skip if this is the current post to avoid self-linking
      if (content.includes(`/blog/${post.slug}`)) return;
      
      // Find the keyword in the text, case insensitive
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'i');
      const keywordMatch = text.match(keywordRegex);
      
      if (keywordMatch && !linkedWords.has(keyword.toLowerCase())) {
        const keywordPos = text.indexOf(keywordMatch[0]);
        if (keywordPos >= 0) {
          const absolutePos = startPos + keywordPos;
          const matchedWord = keywordMatch[0];
          
          // Replace the keyword with a link
          const before = processedContent.substring(0, absolutePos);
          const after = processedContent.substring(absolutePos + matchedWord.length);
          
          processedContent = `${before}<a href="/blog/${post.slug}" class="text-primary hover:underline">${matchedWord}</a>${after}`;
          
          // Mark this keyword as linked to avoid duplicate links
          linkedWords.add(keyword.toLowerCase());
          
          // Limit to 5 internal links per post
          if (linkedWords.size >= 5) return;
        }
      }
    });
  }
  
  return processedContent;
}

/**
 * Complete SEO optimization for a blog post
 */
export async function optimizeBlogPost(post: BlogPost, allPosts: BlogPost[]): Promise<BlogPost> {
  // Step 1: Auto-generate SEO metadata
  const seoUpdatedPost = await autoGenerateSEO(post);
  
  // Step 2: Add internal links
  const withInternalLinks = {
    ...seoUpdatedPost,
    content: addInternalLinks(seoUpdatedPost.content, allPosts.filter(p => p.id !== post.id))
  };
  
  // Step 3: Save the updated post with internal links
  try {
    const response = await apiRequest(
      'PATCH',
      `/api/blog-posts/${post.id}`,
      { content: withInternalLinks.content }
    );
    
    if (!response.ok) {
      throw new Error('Failed to update post with internal links');
    }
    
    const finalPost = await response.json();
    return finalPost as BlogPost;
  } catch (error) {
    console.error('Failed to update post with internal links:', error);
    return withInternalLinks;
  }
}