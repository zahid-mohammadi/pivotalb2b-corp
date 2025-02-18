import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required for AI tagging');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AITaggingService {
  private async analyzeContent(content: string): Promise<string[]> {
    try {
      const completion = await openai.chat.completions.create({
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
      return [];
    }
  }

  async generateTagsForBlogPost(title: string, content: string, metaDescription: string): Promise<string[]> {
    const combinedContent = `${title}\n\n${metaDescription}\n\n${content}`;
    return this.analyzeContent(combinedContent);
  }

  async generateTagsForEbook(title: string, description: string, content: string): Promise<string[]> {
    const combinedContent = `${title}\n\n${description}\n\n${content}`;
    return this.analyzeContent(combinedContent);
  }

  async generateTagsForCaseStudy(
    title: string,
    clientName: string,
    industry: string,
    challenge: string,
    solution: string,
    results: string
  ): Promise<string[]> {
    const combinedContent = `
      Title: ${title}
      Client: ${clientName}
      Industry: ${industry}
      Challenge: ${challenge}
      Solution: ${solution}
      Results: ${results}
    `;
    return this.analyzeContent(combinedContent);
  }
}

export const aiTaggingService = new AITaggingService();
