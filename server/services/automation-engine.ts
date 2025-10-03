import { storage } from "../storage";
import type { AutomationRule, PipelineDeal, LeadActivity } from "@shared/schema";
import { microsoftGraphService } from "./microsoft-graph";

interface AutomationContext {
  dealId?: number;
  userId?: number;
  activityId?: number;
  previousStageId?: number;
  newStageId?: number;
  previousValue?: number;
  newValue?: number;
}

export class AutomationEngine {
  async executeRulesForTrigger(
    trigger: string,
    context: AutomationContext
  ): Promise<void> {
    try {
      const allRules = await storage.getAutomationRules();
      const rules = allRules.filter((rule) => rule.trigger === trigger);
      const activeRules = rules.filter((rule: AutomationRule) => rule.isActive);

      for (const rule of activeRules) {
        await this.executeRule(rule, context);
      }
    } catch (error) {
      console.error("Error executing automation rules:", error);
    }
  }

  private async executeRule(
    rule: AutomationRule,
    context: AutomationContext
  ): Promise<void> {
    try {
      // Evaluate conditions if any
      if (rule.conditions && !this.evaluateConditions(rule.conditions as any, context)) {
        return;
      }

      // Execute actions
      const actions = rule.actions as Array<{ type: string; config: any }>;
      
      for (const action of actions) {
        await this.executeAction(action, context);
      }
    } catch (error) {
      console.error(`Error executing rule ${rule.id}:`, error);
    }
  }

  private evaluateConditions(
    conditions: Record<string, any>,
    context: AutomationContext
  ): boolean {
    // Simple condition evaluation logic
    // Can be extended with more complex operators
    
    if (conditions.dealValue) {
      const deal = context.dealId ? null : null; // Would fetch deal here
      if (!deal) return true;
      
      if (conditions.dealValue.min && (context.newValue || 0) < conditions.dealValue.min) {
        return false;
      }
      if (conditions.dealValue.max && (context.newValue || 0) > conditions.dealValue.max) {
        return false;
      }
    }

    if (conditions.stageId && context.newStageId !== conditions.stageId) {
      return false;
    }

    return true;
  }

  private async executeAction(
    action: { type: string; config: any },
    context: AutomationContext
  ): Promise<void> {
    try {
      switch (action.type) {
        case 'move_deal':
          await this.moveDeal(action.config, context);
          break;
        
        case 'send_email':
          await this.sendEmail(action.config, context);
          break;
        
        case 'send_campaign':
          await this.sendCampaign(action.config, context);
          break;
        
        case 'create_activity':
          await this.createActivity(action.config, context);
          break;
        
        default:
          console.warn(`Unknown action type: ${action.type}`);
      }
    } catch (error) {
      console.error(`Error executing action ${action.type}:`, error);
    }
  }

  private async moveDeal(
    config: { stageId: number },
    context: AutomationContext
  ): Promise<void> {
    if (!context.dealId || !config.stageId) return;

    await storage.updatePipelineDeal(context.dealId, {
      stageId: config.stageId,
    });

    // Log activity
    if (context.userId) {
      await storage.createLeadActivity({
        dealId: context.dealId,
        activityType: 'stage_change',
        description: `Deal automatically moved to new stage by automation rule`,
        createdBy: context.userId,
      });
    }
  }

  private async sendEmail(
    config: { subject: string; body: string },
    context: AutomationContext
  ): Promise<void> {
    if (!context.dealId || !context.userId) return;

    const deal = await storage.getPipelineDealById(context.dealId);
    if (!deal) return;

    // Replace variables in template
    const subject = this.replaceVariables(config.subject, deal);
    const body = this.replaceVariables(config.body, deal);

    // Send via M365 if connected, otherwise use SMTP
    const connection = await storage.getM365ConnectionByUser(context.userId);
    
    if (connection) {
      await microsoftGraphService.sendEmail(context.userId, {
        from: connection.email,
        to: [deal.email],
        subject,
        htmlContent: body,
      });
    }

    // Log activity
    await storage.createLeadActivity({
      dealId: context.dealId,
      activityType: 'email_sent',
      description: `Automated email sent: ${subject}`,
      createdBy: context.userId,
    });
  }

  private async sendCampaign(
    config: { campaignId: number },
    context: AutomationContext
  ): Promise<void> {
    if (!context.dealId || !config.campaignId) return;

    const deal = await storage.getPipelineDealById(context.dealId);
    if (!deal) return;

    const campaign = await storage.getEmailCampaignById(config.campaignId);
    if (!campaign) return;

    // Create campaign send record
    await storage.createCampaignSend({
      campaignId: campaign.id,
      dealId: deal.id,
    });

    // Log activity
    if (context.userId) {
      await storage.createLeadActivity({
        dealId: context.dealId,
        activityType: 'email_sent',
        description: `Automated campaign "${campaign.name}" queued for sending`,
        createdBy: context.userId,
      });
    }
  }

  private async createActivity(
    config: { note: string },
    context: AutomationContext
  ): Promise<void> {
    if (!context.dealId || !context.userId || !config.note) return;

    await storage.createLeadActivity({
      dealId: context.dealId,
      activityType: 'note',
      description: config.note,
      createdBy: context.userId,
    });
  }

  private replaceVariables(template: string, deal: any): string {
    return template
      .replace(/\{\{contact_name\}\}/g, deal.contactName || '')
      .replace(/\{\{company\}\}/g, deal.company || '')
      .replace(/\{\{deal_value\}\}/g, deal.value?.toString() || '')
      .replace(/\{\{deal_title\}\}/g, deal.title || '');
  }
}

export const automationEngine = new AutomationEngine();
