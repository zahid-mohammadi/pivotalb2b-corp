import { sql, SQL, and, or, eq, ne, gt, gte, lt, lte, like, notLike, isNull, isNotNull, inArray } from "drizzle-orm";
import { db } from "../db";
import { contacts, accounts, pipelineDeals, campaignSends } from "@shared/schema";

export interface FilterCondition {
  field: string;
  operator: string;
  value: any;
  caseSensitive?: boolean;
}

export interface FilterGroup {
  logic: "AND" | "OR";
  conditions?: FilterCondition[];
  groups?: FilterGroup[];
}

export interface FilterDefinition {
  logic: "AND" | "OR";
  conditions: FilterCondition[];
  groups?: FilterGroup[];
}

// Operator mapping
const OPERATORS = {
  // Text operators
  equals: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? eq(field, value) : sql`LOWER(${field}) = LOWER(${value})`,
  not_equals: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? ne(field, value) : sql`LOWER(${field}) != LOWER(${value})`,
  contains: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? like(field, `%${value}%`) : sql`LOWER(${field}) LIKE LOWER(${'%' + value + '%'})`,
  not_contains: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? notLike(field, `%${value}%`) : sql`LOWER(${field}) NOT LIKE LOWER(${'%' + value + '%'})`,
  starts_with: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? like(field, `${value}%`) : sql`LOWER(${field}) LIKE LOWER(${value + '%'})`,
  ends_with: (field: any, value: string, caseSensitive = false) =>
    caseSensitive ? like(field, `%${value}`) : sql`LOWER(${field}) LIKE LOWER(${'%' + value})`,
  is_blank: (field: any) => or(isNull(field), eq(field, '')),
  is_not_blank: (field: any) => and(isNotNull(field), ne(field, '')),

  // Numeric operators
  greater_than: (field: any, value: number) => gt(field, value),
  greater_or_equal: (field: any, value: number) => gte(field, value),
  less_than: (field: any, value: number) => lt(field, value),
  less_or_equal: (field: any, value: number) => lte(field, value),
  between: (field: any, value: [number, number]) => and(gte(field, value[0]), lte(field, value[1])),

  // Boolean operators
  is_true: (field: any) => eq(field, true),
  is_false: (field: any) => eq(field, false),

  // Date operators
  before: (field: any, value: string) => lt(field, new Date(value)),
  after: (field: any, value: string) => gt(field, new Date(value)),
  date_between: (field: any, value: [string, string]) =>
    and(gte(field, new Date(value[0])), lte(field, new Date(value[1]))),
  last_x_days: (field: any, value: number) => {
    const date = new Date();
    date.setDate(date.getDate() - value);
    return gte(field, date);
  },
  last_x_weeks: (field: any, value: number) => {
    const date = new Date();
    date.setDate(date.getDate() - value * 7);
    return gte(field, date);
  },
  last_x_months: (field: any, value: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - value);
    return gte(field, date);
  },

  // Array operators
  in: (field: any, value: any[]) => inArray(field, value),
  not_in: (field: any, value: any[]) => sql`${field} NOT IN ${value}`,
};

// Field mapping by entity
const FIELD_MAPS: Record<string, Record<string, any>> = {
  contacts: {
    firstName: contacts.firstName,
    lastName: contacts.lastName,
    email: contacts.email,
    phone: contacts.phone,
    jobTitle: contacts.jobTitle,
    department: contacts.department,
    jobLevel: contacts.jobLevel,
    accountId: contacts.accountId,
    leadSource: contacts.leadSource,
    engagementScore: contacts.engagementScore,
    lastEngagementAt: contacts.lastEngagementAt,
    assignedTo: contacts.assignedTo,
    status: contacts.status,
    tags: contacts.tags,
    createdAt: contacts.createdAt,
    updatedAt: contacts.updatedAt,
  },
  accounts: {
    companyName: accounts.companyName,
    domain: accounts.domain,
    industry: accounts.industry,
    companySize: accounts.companySize,
    location: accounts.location,
    country: accounts.country,
    revenueBand: accounts.revenueBand,
    naicsCode: accounts.naicsCode,
    engagementScore: accounts.engagementScore,
    accountTier: accounts.accountTier,
    assignedTo: accounts.assignedTo,
    tags: accounts.tags,
    createdAt: accounts.createdAt,
    updatedAt: accounts.updatedAt,
  },
  deals: {
    fullName: pipelineDeals.fullName,
    email: pipelineDeals.email,
    company: pipelineDeals.company,
    phone: pipelineDeals.phone,
    jobTitle: pipelineDeals.jobTitle,
    contactId: pipelineDeals.contactId,
    accountId: pipelineDeals.accountId,
    stageId: pipelineDeals.stageId,
    dealValue: pipelineDeals.dealValue,
    probability: pipelineDeals.probability,
    source: pipelineDeals.source,
    assignedTo: pipelineDeals.assignedTo,
    engagementScore: pipelineDeals.engagementScore,
    lastEngagementAt: pipelineDeals.lastEngagementAt,
    createdAt: pipelineDeals.createdAt,
    updatedAt: pipelineDeals.updatedAt,
    closedAt: pipelineDeals.closedAt,
  },
  campaign_sends: {
    campaignId: campaignSends.campaignId,
    dealId: campaignSends.dealId,
    variantType: campaignSends.variantType,
    sentAt: campaignSends.sentAt,
    openedAt: campaignSends.openedAt,
    clickedAt: campaignSends.clickedAt,
    bouncedAt: campaignSends.bouncedAt,
    unsubscribedAt: campaignSends.unsubscribedAt,
  },
};

function buildCondition(condition: FilterCondition, entity: string): SQL | undefined {
  const fieldMap = FIELD_MAPS[entity];
  if (!fieldMap || !fieldMap[condition.field]) {
    console.warn(`Unknown field: ${condition.field} for entity: ${entity}`);
    return undefined;
  }

  const field = fieldMap[condition.field];
  const operator = OPERATORS[condition.operator as keyof typeof OPERATORS];

  if (!operator) {
    console.warn(`Unknown operator: ${condition.operator}`);
    return undefined;
  }

  try {
    return operator(field, condition.value, condition.caseSensitive);
  } catch (error) {
    console.error(`Error building condition:`, error);
    return undefined;
  }
}

function buildGroup(group: FilterGroup, entity: string): SQL | undefined {
  const clauses: SQL[] = [];

  // Process direct conditions
  if (group.conditions) {
    for (const condition of group.conditions) {
      const clause = buildCondition(condition, entity);
      if (clause) clauses.push(clause);
    }
  }

  // Process nested groups
  if (group.groups) {
    for (const nestedGroup of group.groups) {
      const clause = buildGroup(nestedGroup, entity);
      if (clause) clauses.push(clause);
    }
  }

  if (clauses.length === 0) return undefined;
  if (clauses.length === 1) return clauses[0];

  return group.logic === "AND" ? and(...clauses) : or(...clauses);
}

export function buildWhereClause(definition: FilterDefinition, entity: string): SQL | undefined {
  const clauses: SQL[] = [];

  // Process root conditions
  if (definition.conditions) {
    for (const condition of definition.conditions) {
      const clause = buildCondition(condition, entity);
      if (clause) clauses.push(clause);
    }
  }

  // Process root groups
  if (definition.groups) {
    for (const group of definition.groups) {
      const clause = buildGroup(group, entity);
      if (clause) clauses.push(clause);
    }
  }

  if (clauses.length === 0) return undefined;
  if (clauses.length === 1) return clauses[0];

  return definition.logic === "AND" ? and(...clauses) : or(...clauses);
}

export async function executeFilter(
  entity: string,
  definition: FilterDefinition,
  limit = 1000,
  offset = 0
): Promise<any[]> {
  const whereClause = buildWhereClause(definition, entity);

  let query;
  switch (entity) {
    case "contacts":
      query = db.select().from(contacts);
      if (whereClause) query = query.where(whereClause);
      break;
    case "accounts":
      query = db.select().from(accounts);
      if (whereClause) query = query.where(whereClause);
      break;
    case "deals":
      query = db.select().from(pipelineDeals);
      if (whereClause) query = query.where(whereClause);
      break;
    case "campaign_sends":
      query = db.select().from(campaignSends);
      if (whereClause) query = query.where(whereClause);
      break;
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }

  return query.limit(limit).offset(offset);
}

export async function getFilterCount(entity: string, definition: FilterDefinition): Promise<number> {
  const whereClause = buildWhereClause(definition, entity);

  let query;
  switch (entity) {
    case "contacts":
      query = db.select({ count: sql<number>`count(*)` }).from(contacts);
      if (whereClause) query = query.where(whereClause);
      break;
    case "accounts":
      query = db.select({ count: sql<number>`count(*)` }).from(accounts);
      if (whereClause) query = query.where(whereClause);
      break;
    case "deals":
      query = db.select({ count: sql<number>`count(*)` }).from(pipelineDeals);
      if (whereClause) query = query.where(whereClause);
      break;
    case "campaign_sends":
      query = db.select({ count: sql<number>`count(*)` }).from(campaignSends);
      if (whereClause) query = query.where(whereClause);
      break;
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }

  const result = await query;
  return result[0]?.count || 0;
}
