import type { User, Organization, Contact, Deal, Activity } from './types';

/**
 * Deterministic seed data.
 *
 * Would come from Drizzle in production. Kept in one file so the app has a
 * predictable "database" and the code paths that consume it (dashboard, table,
 * kanban) can be trusted at review time.
 */

export const organization: Organization = {
  id: 'org_acme',
  name: 'Acme Ventures',
  domain: 'acme.co',
  plan: 'growth',
  seats: 8
};

export const currentUser: User = {
  id: 'u_alex',
  orgId: 'org_acme',
  name: 'Alex M.',
  email: 'alex@acme.co',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80',
  role: 'owner'
};

export const teamMembers: User[] = [
  currentUser,
  {
    id: 'u_priya',
    orgId: 'org_acme',
    name: 'Priya S.',
    email: 'priya@acme.co',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces&auto=format&q=80',
    role: 'admin'
  },
  {
    id: 'u_diego',
    orgId: 'org_acme',
    name: 'Diego A.',
    email: 'diego@acme.co',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=faces&auto=format&q=80',
    role: 'member'
  },
  {
    id: 'u_rachel',
    orgId: 'org_acme',
    name: 'Rachel W.',
    email: 'rachel@acme.co',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces&auto=format&q=80',
    role: 'member'
  }
];

export const contacts: Contact[] = [
  {
    id: 'c_1', orgId: 'org_acme',
    fullName: 'Anna Kowalska', email: 'anna@northline.co', phone: '+48 22 555 0110',
    company: 'Northline Foods', role: 'Head of Operations', city: 'Warsaw',
    ownerId: 'u_alex', status: 'active',
    createdAt: '2026-01-14T09:20:00Z', lastTouchAt: '2026-06-27T14:00:00Z'
  },
  {
    id: 'c_2', orgId: 'org_acme',
    fullName: 'Tomás Silva', email: 'tomas@meridian-ind.com', phone: '+351 21 555 0231',
    company: 'Meridian Industries', role: 'VP Sustainability', city: 'Lisbon',
    ownerId: 'u_priya', status: 'active',
    createdAt: '2026-02-02T11:00:00Z', lastTouchAt: '2026-06-30T10:22:00Z'
  },
  {
    id: 'c_3', orgId: 'org_acme',
    fullName: 'Sophie Laurent', email: 'sophie@halden-reece.co.uk', phone: '+44 20 7555 0193',
    company: 'Halden & Reece', role: 'Facilities Director', city: 'London',
    ownerId: 'u_alex', status: 'customer',
    createdAt: '2025-11-08T15:12:00Z', lastTouchAt: '2026-06-15T08:00:00Z'
  },
  {
    id: 'c_4', orgId: 'org_acme',
    fullName: 'Rasmus Berg', email: 'rasmus@brookmoor.dk', phone: '+45 33 555 0110',
    company: 'Brookmoor', role: 'CTO', city: 'Copenhagen',
    ownerId: 'u_diego', status: 'lead',
    createdAt: '2026-05-01T13:14:00Z', lastTouchAt: '2026-06-22T09:00:00Z'
  },
  {
    id: 'c_5', orgId: 'org_acme',
    fullName: 'Elena Rossi', email: 'elena@atrium-labs.io', phone: '+39 02 555 0187',
    company: 'Atrium Labs', role: 'Head of Product', city: 'Milan',
    ownerId: 'u_rachel', status: 'active',
    createdAt: '2026-03-15T10:00:00Z', lastTouchAt: '2026-06-29T16:45:00Z'
  },
  {
    id: 'c_6', orgId: 'org_acme',
    fullName: 'Jonas Weber', email: 'jonas@hypergrid.de', phone: '+49 30 555 0182',
    company: 'Hypergrid', role: 'Head of Engineering', city: 'Berlin',
    ownerId: 'u_priya', status: 'active',
    createdAt: '2026-04-05T11:20:00Z', lastTouchAt: '2026-06-25T13:00:00Z'
  },
  {
    id: 'c_7', orgId: 'org_acme',
    fullName: 'Maria García', email: 'maria@kolder.es', phone: '+34 91 555 0163',
    company: 'Kolder', role: 'COO', city: 'Madrid',
    ownerId: 'u_alex', status: 'lead',
    createdAt: '2026-05-22T14:00:00Z', lastTouchAt: null
  },
  {
    id: 'c_8', orgId: 'org_acme',
    fullName: 'Luca Bianchi', email: 'luca@fieldoffice.io', phone: '+39 06 555 0128',
    company: 'Field Office', role: 'CEO', city: 'Rome',
    ownerId: 'u_diego', status: 'customer',
    createdAt: '2025-12-01T09:00:00Z', lastTouchAt: '2026-06-28T09:00:00Z'
  }
];

export const deals: Deal[] = [
  {
    id: 'd_1', orgId: 'org_acme',
    title: 'Northline · plant-04 rollout', contactId: 'c_1', ownerId: 'u_alex',
    amount: 48000, currency: 'EUR', stage: 'negotiation', probability: 75,
    expectedCloseAt: '2026-07-25', createdAt: '2026-04-12T10:00:00Z'
  },
  {
    id: 'd_2', orgId: 'org_acme',
    title: 'Meridian · CFO reporting add-on', contactId: 'c_2', ownerId: 'u_priya',
    amount: 32000, currency: 'EUR', stage: 'proposal', probability: 55,
    expectedCloseAt: '2026-08-10', createdAt: '2026-05-01T09:15:00Z'
  },
  {
    id: 'd_3', orgId: 'org_acme',
    title: 'Halden & Reece · renewal', contactId: 'c_3', ownerId: 'u_alex',
    amount: 72000, currency: 'EUR', stage: 'closed_won', probability: 100,
    expectedCloseAt: '2026-06-30', createdAt: '2026-04-01T14:00:00Z'
  },
  {
    id: 'd_4', orgId: 'org_acme',
    title: 'Brookmoor · POC', contactId: 'c_4', ownerId: 'u_diego',
    amount: 9500, currency: 'EUR', stage: 'discovery', probability: 20,
    expectedCloseAt: '2026-09-15', createdAt: '2026-06-01T11:00:00Z'
  },
  {
    id: 'd_5', orgId: 'org_acme',
    title: 'Atrium Labs · pilot expansion', contactId: 'c_5', ownerId: 'u_rachel',
    amount: 24000, currency: 'EUR', stage: 'qualified', probability: 40,
    expectedCloseAt: '2026-08-30', createdAt: '2026-05-10T13:00:00Z'
  },
  {
    id: 'd_6', orgId: 'org_acme',
    title: 'Hypergrid · multi-site', contactId: 'c_6', ownerId: 'u_priya',
    amount: 108000, currency: 'EUR', stage: 'proposal', probability: 60,
    expectedCloseAt: '2026-07-31', createdAt: '2026-04-20T10:00:00Z'
  },
  {
    id: 'd_7', orgId: 'org_acme',
    title: 'Kolder · discovery call', contactId: 'c_7', ownerId: 'u_alex',
    amount: 5000, currency: 'EUR', stage: 'discovery', probability: 15,
    expectedCloseAt: '2026-10-01', createdAt: '2026-06-05T15:00:00Z'
  },
  {
    id: 'd_8', orgId: 'org_acme',
    title: 'Field Office · renewal', contactId: 'c_8', ownerId: 'u_diego',
    amount: 36000, currency: 'EUR', stage: 'negotiation', probability: 80,
    expectedCloseAt: '2026-07-10', createdAt: '2026-05-18T09:00:00Z'
  },
  {
    id: 'd_9', orgId: 'org_acme',
    title: 'Meridian · training package', contactId: 'c_2', ownerId: 'u_priya',
    amount: 8500, currency: 'EUR', stage: 'closed_lost', probability: 0,
    expectedCloseAt: '2026-05-30', createdAt: '2026-03-20T09:00:00Z'
  }
];

export const activities: Activity[] = [
  {
    id: 'a_1', orgId: 'org_acme',
    contactId: 'c_1', dealId: 'd_1', userId: 'u_alex',
    type: 'meeting', body: 'Kick-off with Anna and her ops lead. Agreed pilot scope for plant-04.',
    createdAt: '2026-06-27T14:00:00Z'
  },
  {
    id: 'a_2', orgId: 'org_acme',
    contactId: 'c_2', dealId: 'd_2', userId: 'u_priya',
    type: 'email', body: 'Sent updated proposal with CFO reporting add-on line item.',
    createdAt: '2026-06-30T10:22:00Z'
  },
  {
    id: 'a_3', orgId: 'org_acme',
    contactId: null, dealId: 'd_3', userId: 'u_alex',
    type: 'deal_moved', body: 'Moved Halden & Reece renewal from Negotiation → Closed won.',
    createdAt: '2026-06-30T09:00:00Z'
  },
  {
    id: 'a_4', orgId: 'org_acme',
    contactId: 'c_5', dealId: null, userId: 'u_rachel',
    type: 'call', body: 'Discovery call with Elena. She wants a demo focused on multi-project reporting.',
    createdAt: '2026-06-29T16:45:00Z'
  },
  {
    id: 'a_5', orgId: 'org_acme',
    contactId: 'c_6', dealId: 'd_6', userId: 'u_priya',
    type: 'note', body: 'Hypergrid legal turnaround will be ~10 business days. Padding close date by two weeks.',
    createdAt: '2026-06-28T11:30:00Z'
  },
  {
    id: 'a_6', orgId: 'org_acme',
    contactId: 'c_8', dealId: 'd_8', userId: 'u_diego',
    type: 'meeting', body: 'Renewal review with Luca. Verbal yes at €36k. Sending paperwork.',
    createdAt: '2026-06-28T09:00:00Z'
  },
  {
    id: 'a_7', orgId: 'org_acme',
    contactId: 'c_4', dealId: 'd_4', userId: 'u_diego',
    type: 'email', body: 'Sent POC brief and pricing to Rasmus for signature this week.',
    createdAt: '2026-06-22T09:00:00Z'
  }
];

/** Historical revenue for the dashboard chart. Numbers picked to look plausible, not random. */
export const revenueHistory = [
  { month: 'Jan', revenue: 42000, pipeline: 90000 },
  { month: 'Feb', revenue: 51000, pipeline: 110000 },
  { month: 'Mar', revenue: 48000, pipeline: 128000 },
  { month: 'Apr', revenue: 67000, pipeline: 152000 },
  { month: 'May', revenue: 74000, pipeline: 168000 },
  { month: 'Jun', revenue: 88000, pipeline: 191000 }
];
