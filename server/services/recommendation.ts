import { BlogPost, CaseStudy, Ebook, Lead } from "@shared/schema";
import { storage } from "../storage";

interface ContentItem {
  id: number;
  title: string;
  type: 'blog-post' | 'case-study' | 'ebook';
  slug: string;
}

export class RecommendationService {
  private async getAllContent(): Promise<ContentItem[]> {
    const [blogPosts, caseStudies, ebooks] = await Promise.all([
      storage.getBlogPosts(),
      storage.getCaseStudies(),
      storage.getEbooks(),
    ]);

    return [
      ...blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        type: 'blog-post' as const,
        slug: post.slug,
      })),
      ...caseStudies.map(study => ({
        id: study.id,
        title: study.title,
        type: 'case-study' as const,
        slug: study.slug,
      })),
      ...ebooks.map(ebook => ({
        id: ebook.id,
        title: ebook.title,
        type: 'ebook' as const,
        slug: ebook.slug,
      })),
    ];
  }

  private calculateSimilarity(title1: string, title2: string): number {
    const words1 = new Set(title1.toLowerCase().split(/\s+/));
    const words2 = new Set(title2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  async getRecommendations(
    contentType: string,
    contentId: number,
    limit: number = 3
  ): Promise<ContentItem[]> {
    const allContent = await this.getAllContent();
    const currentContent = allContent.find(
      item => item.type === contentType && item.id === contentId
    );

    if (!currentContent) {
      return [];
    }

    // Calculate similarity scores for all other content
    const recommendations = allContent
      .filter(item => item.id !== contentId)
      .map(item => ({
        ...item,
        similarity: this.calculateSimilarity(currentContent.title, item.title),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(({ similarity, ...item }) => item);

    return recommendations;
  }

  async getPersonalizedRecommendations(
    userEmail: string,
    limit: number = 3
  ): Promise<ContentItem[]> {
    // Get user's download history
    const leads = await storage.getLeads();
    const userLeads = leads.filter(lead => lead.email === userEmail);
    
    if (userLeads.length === 0) {
      // If no history, return most recent content
      const allContent = await this.getAllContent();
      return allContent.slice(0, limit);
    }

    // Get all content that the user hasn't downloaded yet
    const allContent = await this.getAllContent();
    const downloadedIds = new Set(userLeads.map(lead => lead.contentId));
    
    return allContent
      .filter(item => !downloadedIds.has(item.id))
      .slice(0, limit);
  }
}

export const recommendationService = new RecommendationService();
