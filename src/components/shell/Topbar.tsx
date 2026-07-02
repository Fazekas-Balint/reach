'use client';

import { usePathname } from 'next/navigation';
import { currentUser, teamMembers } from '@/lib/seed';

const titles: Record<string, string> = {
  '/':          'Overview',
  '/contacts':  'Contacts',
  '/deals':     'Deals',
  '/activity':  'Activity',
  '/reports':   'Reports',
  '/settings':  'Settings',
  '/help':      'Help'
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? 'Reach';

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface/90 backdrop-blur border-b border-border">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-[15px] font-semibold text-ink truncate">{title}</h1>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <label className="relative w-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search contacts, deals, notes…"
              className="r-input pl-9 pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="r-kbd">⌘</span>
              <span className="r-kbd">K</span>
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-canvas-2 text-muted relative"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose" />
          </button>

          <div className="flex -space-x-1.5 pl-2 pr-1 py-0.5 rounded-full hover:bg-canvas-2">
            {teamMembers.slice(0, 3).map((m) => (
              <img
                key={m.id}
                src={m.avatarUrl}
                alt={m.name}
                width="24"
                height="24"
                className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-2 pl-1">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              width="28"
              height="28"
              className="h-7 w-7 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
