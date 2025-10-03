import { db } from "../db";
import { pipelineDeals, leadActivities, emailActivities } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

// Engagement Scoring Rules
export const SCORING_RULES = {
  EMAIL_OPENED: 10,
  EMAIL_CLICKED: 20,
  ASSET_DOWNLOADED: 40,
  EMAIL_REPLIED: 70,
  FORM_SUBMITTED: 50,
  EMAIL_BOUNCED: -10,
  EMAIL_UNSUBSCRIBED: -50,
  MEETING_SCHEDULED: 100,
  PROPOSAL_VIEWED: 60,
  CALL_COMPLETED: 80,
  DEMO_REQUESTED: 90,
};

// Engagement Score Levels
export type EngagementLevel = 'cold' | 'warm' | 'hot' | 'very-hot';

export interface EngagementScoreInfo {
  score: number;
  level: EngagementLevel;
  color: string;
  label: string;
}

export function getEngagementLevel(score: number): EngagementScoreInfo {
  if (score >= 150) {
    return {
      score,
      level: 'very-hot',
      color: '#dc2626', // red-600
      label: 'Very Hot'
    };
  } else if (score >= 80) {
    return {
      score,
      level: 'hot',
      color: '#f59e0b', // amber-500
      label: 'Hot'
    };
  } else if (score >= 30) {
    return {
      score,
      level: 'warm',
      color: '#3b82f6', // blue-500
      label: 'Warm'
    };
  } else {
    return {
      score,
      level: 'cold',
      color: '#6b7280', // gray-500
      label: 'Cold'
    };
  }
}

export async function calculateEngagementScore(dealId: number): Promise<number> {
  try {
    let totalScore = 0;

    // Get all activities for this deal
    const activities = await db
      .select()
      .from(leadActivities)
      .where(eq(leadActivities.dealId, dealId))
      .orderBy(desc(leadActivities.createdAt));

    // Calculate score based on activities
    for (const activity of activities) {
      const activityType = activity.activityType.toUpperCase();
      
      // Map activity types to scoring rules
      if (activityType.includes('OPENED') || activityType === 'EMAIL_OPEN') {
        totalScore += SCORING_RULES.EMAIL_OPENED;
      } else if (activityType.includes('CLICKED') || activityType === 'EMAIL_CLICK') {
        totalScore += SCORING_RULES.EMAIL_CLICKED;
      } else if (activityType.includes('DOWNLOAD')) {
        totalScore += SCORING_RULES.ASSET_DOWNLOADED;
      } else if (activityType.includes('REPLY') || activityType.includes('REPLIED')) {
        totalScore += SCORING_RULES.EMAIL_REPLIED;
      } else if (activityType.includes('FORM') || activityType.includes('SUBMIT')) {
        totalScore += SCORING_RULES.FORM_SUBMITTED;
      } else if (activityType.includes('BOUNCE')) {
        totalScore += SCORING_RULES.EMAIL_BOUNCED;
      } else if (activityType.includes('UNSUBSCRIBE')) {
        totalScore += SCORING_RULES.EMAIL_UNSUBSCRIBED;
      } else if (activityType.includes('MEETING')) {
        totalScore += SCORING_RULES.MEETING_SCHEDULED;
      } else if (activityType.includes('PROPOSAL')) {
        totalScore += SCORING_RULES.PROPOSAL_VIEWED;
      } else if (activityType.includes('CALL')) {
        totalScore += SCORING_RULES.CALL_COMPLETED;
      } else if (activityType.includes('DEMO')) {
        totalScore += SCORING_RULES.DEMO_REQUESTED;
      }
    }

    // Also check email activities
    const emailActs = await db
      .select()
      .from(emailActivities)
      .where(eq(emailActivities.dealId, dealId));

    for (const emailAct of emailActs) {
      if (emailAct.openedAt) totalScore += SCORING_RULES.EMAIL_OPENED;
      if (emailAct.clickedAt) totalScore += SCORING_RULES.EMAIL_CLICKED;
      if (emailAct.bouncedAt) totalScore += SCORING_RULES.EMAIL_BOUNCED;
      if (emailAct.unsubscribedAt) totalScore += SCORING_RULES.EMAIL_UNSUBSCRIBED;
    }

    return Math.max(0, totalScore); // Never go below 0
  } catch (error) {
    console.error('Error calculating engagement score:', error);
    return 0;
  }
}

export async function updateEngagementScore(dealId: number): Promise<number> {
  try {
    const score = await calculateEngagementScore(dealId);
    
    await db
      .update(pipelineDeals)
      .set({
        engagementScore: score,
        lastEngagementAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(pipelineDeals.id, dealId));

    return score;
  } catch (error) {
    console.error('Error updating engagement score:', error);
    throw error;
  }
}

export async function addEngagementActivity(
  dealId: number,
  activityType: string,
  metadata?: any
): Promise<void> {
  try {
    // Create the activity
    await db.insert(leadActivities).values({
      dealId,
      activityType,
      description: `${activityType} activity`,
      metadata,
      createdAt: new Date(),
    });

    // Update the engagement score
    await updateEngagementScore(dealId);
  } catch (error) {
    console.error('Error adding engagement activity:', error);
    throw error;
  }
}

// Batch update scores for all deals
export async function updateAllEngagementScores(): Promise<void> {
  try {
    const allDeals = await db.select({ id: pipelineDeals.id }).from(pipelineDeals);
    
    for (const deal of allDeals) {
      await updateEngagementScore(deal.id);
    }
    
    console.log(`Updated engagement scores for ${allDeals.length} deals`);
  } catch (error) {
    console.error('Error updating all engagement scores:', error);
    throw error;
  }
}

// Get score history for a deal (for graphing)
export async function getScoreHistory(dealId: number, days: number = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activities = await db
      .select()
      .from(leadActivities)
      .where(
        and(
          eq(leadActivities.dealId, dealId),
        )
      )
      .orderBy(leadActivities.createdAt);

    // Calculate cumulative score over time
    const scoreHistory: Array<{ date: string; score: number }> = [];
    let cumulativeScore = 0;

    for (const activity of activities) {
      const activityType = activity.activityType.toUpperCase();
      
      // Map to score change
      let scoreChange = 0;
      if (activityType.includes('OPENED')) scoreChange = SCORING_RULES.EMAIL_OPENED;
      else if (activityType.includes('CLICKED')) scoreChange = SCORING_RULES.EMAIL_CLICKED;
      else if (activityType.includes('DOWNLOAD')) scoreChange = SCORING_RULES.ASSET_DOWNLOADED;
      else if (activityType.includes('REPLY')) scoreChange = SCORING_RULES.EMAIL_REPLIED;
      else if (activityType.includes('FORM')) scoreChange = SCORING_RULES.FORM_SUBMITTED;
      else if (activityType.includes('BOUNCE')) scoreChange = SCORING_RULES.EMAIL_BOUNCED;
      else if (activityType.includes('UNSUBSCRIBE')) scoreChange = SCORING_RULES.EMAIL_UNSUBSCRIBED;

      cumulativeScore += scoreChange;

      scoreHistory.push({
        date: activity.createdAt.toISOString(),
        score: Math.max(0, cumulativeScore)
      });
    }

    return scoreHistory;
  } catch (error) {
    console.error('Error getting score history:', error);
    return [];
  }
}
