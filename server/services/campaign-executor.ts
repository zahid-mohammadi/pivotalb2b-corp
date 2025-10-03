import { storage } from "../storage";
import { microsoftGraphService } from "./microsoft-graph";
import { addTrackingPixel, wrapLinksWithTracking } from "../utils/email-tracking";
import Brevo from "@getbrevo/brevo";
import type { PipelineDeal } from "@shared/schema";

const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || "");

interface ExecuteCampaignOptions {
  campaignId: number;
  userId: number;
  baseUrl: string;
}

export class CampaignExecutor {
  async executeCampaign(options: ExecuteCampaignOptions): Promise<void> {
    const { campaignId, userId, baseUrl } = options;

    const campaign = await storage.getEmailCampaignById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    // Get all deals matching segment filters
    const deals = await this.getTargetDeals(campaign.segmentFilters);

    if (deals.length === 0) {
      throw new Error("No recipients match the campaign criteria");
    }

    // Check for M365 connection
    const connection = await storage.getM365ConnectionByUser(userId);

    // Send to each deal
    for (const deal of deals) {
      // Create campaign send record first to get the ID for tracking
      const campaignSend = await storage.createCampaignSend({
        campaignId: campaign.id,
        dealId: deal.id,
      });

      // Determine which variant to use (for A/B testing)
      const useVariantB = campaign.contentB && Math.random() < 0.5;
      const subject = useVariantB ? campaign.subjectB || campaign.subject : campaign.subject;
      const content = useVariantB ? campaign.contentB || campaign.content : campaign.content;
      const variantType = useVariantB ? 'B' : 'A';

      // Replace variables first
      const personalizedContent = this.replaceVariables(content, deal);
      const personalizedSubject = this.replaceVariables(subject, deal);

      // Wrap all links with click tracking
      const contentWithTrackedLinks = wrapLinksWithTracking(personalizedContent, campaignSend.id, baseUrl);

      // Add tracking pixel to content
      const fullyTrackedContent = addTrackingPixel(contentWithTrackedLinks, campaignSend.id, baseUrl);

      try {
        // Send via M365 if connected, otherwise use Brevo
        if (connection) {
          await microsoftGraphService.sendEmail(userId, {
            from: connection.email,
            to: [deal.email],
            subject: personalizedSubject,
            htmlContent: fullyTrackedContent,
          });
        } else {
          // Send via Brevo SMTP
          await this.sendViaBrevo({
            to: deal.email,
            toName: deal.fullName,
            subject: personalizedSubject,
            htmlContent: fullyTrackedContent,
          });
        }

        // Update campaign send with variant
        await storage.updateCampaignSend(campaignSend.id, {
          variantType,
        });

        // Log activity
        await storage.createLeadActivity({
          dealId: deal.id,
          activityType: 'email_sent',
          subject: personalizedSubject,
          description: `Campaign "${campaign.name}" sent`,
          createdBy: userId,
        });
      } catch (error) {
        console.error(`Error sending campaign to ${deal.email}:`, error);
        // Mark as bounced
        await storage.updateCampaignSend(campaignSend.id, {
          bouncedAt: new Date().toISOString(),
        });
      }
    }

    // Update campaign status
    await storage.updateEmailCampaign(campaignId, {
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
  }

  private async getTargetDeals(segmentFilters: any): Promise<PipelineDeal[]> {
    // Get all pipeline deals
    const allDeals = await storage.getPipelineDeals();

    // If no filters, return all deals
    if (!segmentFilters || Object.keys(segmentFilters).length === 0) {
      return allDeals;
    }

    // Apply filters
    return allDeals.filter((deal: PipelineDeal) => {
      if (segmentFilters.stageIds && segmentFilters.stageIds.length > 0) {
        if (!segmentFilters.stageIds.includes(deal.stageId)) {
          return false;
        }
      }

      if (segmentFilters.minDealValue && deal.dealValue < segmentFilters.minDealValue) {
        return false;
      }

      if (segmentFilters.maxDealValue && deal.dealValue > segmentFilters.maxDealValue) {
        return false;
      }

      if (segmentFilters.sources && segmentFilters.sources.length > 0) {
        if (!segmentFilters.sources.includes(deal.source)) {
          return false;
        }
      }

      return true;
    });
  }

  private async sendViaBrevo(options: {
    to: string;
    toName: string;
    subject: string;
    htmlContent: string;
  }): Promise<void> {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.sender = {
      name: process.env.SMTP_FROM_NAME || "Pivotal B2B",
      email: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "no-reply@pivotal-b2b.com",
    };
    sendSmtpEmail.to = [{ email: options.to, name: options.toName }];
    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.htmlContent = options.htmlContent;

    await brevo.sendTransacEmail(sendSmtpEmail);
  }

  private replaceVariables(template: string, deal: any): string {
    return template
      .replace(/\{\{contact_name\}\}/g, deal.fullName || '')
      .replace(/\{\{company\}\}/g, deal.company || '')
      .replace(/\{\{deal_value\}\}/g, deal.dealValue?.toString() || '')
      .replace(/\{\{email\}\}/g, deal.email || '');
  }
}

export const campaignExecutor = new CampaignExecutor();
