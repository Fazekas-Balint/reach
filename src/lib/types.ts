/**
 * Reach — Drizzle-shaped types.
 *
 * Even though the current build stores mock data client-side, the shapes below
 * are what would come out of a Drizzle-schema definition against Postgres.
 * Every column, every foreign key, every index — deliberately named.
 */

export type OrgId     = string;
export type UserId    = string;
export type ContactId = string;
export type DealId    = string;
export type ActivityId = string;

export interface User {
  id: UserId;
  orgId: OrgId;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'owner' | 'admin' | 'member';
}

export interface Organization {
  id: OrgId;
  name: string;
  domain: string;
  plan: 'starter' | 'growth' | 'scale';
  seats: number;
}

export interface Contact {
  id: ContactId;
  orgId: OrgId;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  ownerId: UserId;
  createdAt: string;
  lastTouchAt: string | null;
  status: 'lead' | 'active' | 'customer' | 'churned';
}

export type DealStage = 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export const dealStages: { id: DealStage; label: string; colour: string }[] = [
  { id: 'discovery',     label: 'Discovery',     colour: '#94a3b8' },
  { id: 'qualified',     label: 'Qualified',     colour: '#6366f1' },
  { id: 'proposal',      label: 'Proposal',      colour: '#0ea5e9' },
  { id: 'negotiation',   label: 'Negotiation',   colour: '#f59e0b' },
  { id: 'closed_won',    label: 'Closed won',    colour: '#059669' },
  { id: 'closed_lost',   label: 'Closed lost',   colour: '#e11d48' }
];

export interface Deal {
  id: DealId;
  orgId: OrgId;
  title: string;
  contactId: ContactId;
  ownerId: UserId;
  amount: number;
  currency: 'EUR' | 'USD';
  stage: DealStage;
  probability: number;
  expectedCloseAt: string;
  createdAt: string;
}

export interface Activity {
  id: ActivityId;
  orgId: OrgId;
  contactId: ContactId | null;
  dealId: DealId | null;
  userId: UserId;
  type: 'call' | 'email' | 'meeting' | 'note' | 'deal_moved';
  body: string;
  createdAt: string;
}
