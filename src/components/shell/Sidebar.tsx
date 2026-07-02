'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { organization } from '@/lib/seed';

const nav = [
  { href: '/',           label: 'Overview',   icon: 'grid'   },
  { href: '/contacts',   label: 'Contacts',   icon: 'users'  },
  { href: '/deals',      label: 'Deals',      icon: 'columns'},
  { href: '/activity',   label: 'Activity',   icon: 'zap'    },
  { href: '/reports',    label: 'Reports',    icon: 'bar'    }
];

const bottom = [
  { href: '/settings',   label: 'Settings',   icon: 'cog'    },
  { href: '/help',       label: 'Help',       icon: 'help'   }
];

const icons: Record<string, ReactNode> = {
  grid: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  columns: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="6" height="16" /><rect x="10" y="4" width="4" height="10" /><rect x="15" y="4" width="6" height="16" />
    </svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  bar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  cog: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  help: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 lg:w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-md hover:bg-canvas-2 transition-colors text-left">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-white text-sm font-semibold">
            {organization.name.charAt(0)}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-ink truncate">{organization.name}</span>
            <span className="block text-xs text-muted capitalize">{organization.plan} · {organization.seats} seats</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-2">
            <polyline points="7 15 12 20 17 15" /><polyline points="7 9 12 4 17 9" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                active ? 'bg-brand-soft text-brand font-medium' : 'text-ink-2 hover:bg-canvas-2'
              )}
            >
              <span className={cn(active ? 'text-brand' : 'text-muted-2')}>{icons[n.icon]}</span>
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-0.5">
        {bottom.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-2 hover:bg-canvas-2 transition-colors"
          >
            <span className="text-muted-2">{icons[n.icon]}</span>
            {n.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
