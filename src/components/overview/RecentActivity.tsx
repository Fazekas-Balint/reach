'use client';

import type { ReactNode } from 'react';
import { activities, teamMembers } from '@/lib/seed';
import { relTime } from '@/lib/format';
import type { Activity } from '@/lib/types';

const iconFor: Record<Activity['type'], ReactNode> = {
  meeting: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  email:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  call:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  note:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  deal_moved: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
};

const typeColour: Record<Activity['type'], string> = {
  meeting: 'bg-brand-soft text-brand',
  email:   'bg-emerald-soft text-emerald',
  call:    'bg-amber-soft text-amber',
  note:    'bg-canvas-2 text-muted',
  deal_moved: 'bg-brand-soft text-brand'
};

export function RecentActivity() {
  return (
    <ul className="divide-y divide-border-2">
      {activities.slice(0, 6).map((a) => {
        const user = teamMembers.find((u) => u.id === a.userId);
        return (
          <li key={a.id} className="p-5 flex items-start gap-4 hover:bg-canvas-2/50 transition-colors">
            <span className={`grid h-8 w-8 place-items-center rounded-full shrink-0 ${typeColour[a.type]}`}>
              {iconFor[a.type]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink-2 leading-relaxed">
                <span className="font-semibold text-ink">{user?.name}</span>{' '}
                {a.body}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                <span className="capitalize">{a.type.replace('_', ' ')}</span>
                <span>·</span>
                <span>{relTime(a.createdAt)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
