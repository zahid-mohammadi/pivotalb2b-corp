import OpenAI from 'openai';

// Improved error handling for API key
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required for AI tagging. Please configure this in your environment settings.');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

export class AITaggingService {
  private openai: OpenAI;

  constructor() {
    try {
      this.openai = getOpenAIClient();
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      throw error;
    }
  }

  private async analyzeContent(content: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional content tagger. Analyze the given content and return relevant business and marketing related tags. Return only the tags as a comma-separated list, no other text."
          },
          {
            role: "user",
            content: `Please analyze this content and provide relevant business and marketing tags: ${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const tags = completion.choices[0]?.message?.content?.split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0) || [];

      return tags;
    } catch (error) {
      console.error('Error analyzing content for tags:', error);
      // Return empty array instead of throwing to prevent breaking the content creation flow
      return [];
    }
  }

  async generateTagsForBlogPost(title: string, content: string, metaDescription: string): Promise<string[]> {
    try {
      const combinedContent = `${title}\n\n${metaDescription}\n\n${content}`;
      return this.analyzeContent(combinedContent);
    } catch (error) {
      console.error('Error generating tags for blog post:', error);
      return [];
    }
  }

  async generateTagsForEbook(title: string, description: string, content: string): Promise<string[]> {
    try {
      const combinedContent = `${title}\n\n${description}\n\n${content}`;
      return this.analyzeContent(combinedContent);
    } catch (error) {
      console.error('Error generating tags for ebook:', error);
      return [];
    }
  }

  async generateTagsForCaseStudy(
    title: string,
    clientName: string,
    industry: string,
    challenge: string,
    solution: string,
    results: string
  ): Promise<string[]> {
    try {
      const combinedContent = `
        Title: ${title}
        Client: ${clientName}
        Industry: ${industry}
        Challenge: ${challenge}
        Solution: ${solution}
        Results: ${results}
      `;
      return this.analyzeContent(combinedContent);
    } catch (error) {
      console.error('Error generating tags for case study:', error);
      return [];
    }
  }
}

// Singleton instance with error handling
let aiTaggingServiceInstance: AITaggingService | null = null;

export function getAITaggingService(): AITaggingService {
  if (!aiTaggingServiceInstance) {
    try {
      aiTaggingServiceInstance = new AITaggingService();
    } catch (error) {
      console.error('Failed to initialize AI tagging service:', error);
      throw error;
    }
  }
  return aiTaggingServiceInstance;
}

export const aiTaggingService = getAITaggingService();