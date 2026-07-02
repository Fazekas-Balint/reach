'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { teamMembers } from '@/lib/seed';
import { relTime } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Contact } from '@/lib/types';

const statusClasses: Record<Contact['status'], string> = {
  lead:     'bg-brand-soft text-brand',
  active:   'bg-emerald-soft text-emerald',
  customer: 'bg-ink text-white',
  churned:  'bg-rose-soft text-rose'
};

type SortKey = 'fullName' | 'company' | 'lastTouchAt';

export function ContactsTable() {
  const { contacts } = useStore();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | Contact['status']>('all');
  const [sortKey, setSortKey] = useState<SortKey>('lastTouchAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    let r = contacts;
    if (status !== 'all') r = r.filter((c) => c.status === status);
    if (q) {
      const needle = q.toLowerCase();
      r = r.filter((c) =>
        c.fullName.toLowerCase().includes(needle) ||
        c.email.toLowerCase().includes(needle) ||
        c.company.toLowerCase().includes(needle)
      );
    }
    return [...r].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = av > bv ? 1 : av < bv ? -1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [contacts, q, status, sortKey, sortDir]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const sortIcon = (k: SortKey) => {
    if (sortKey !== k) return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 3 18 9" /><polyline points="6 15 12 21 18 15" /></svg>;
    return sortDir === 'asc'
      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 15 12 9 18 15" /></svg>
      : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>;
  };

  const cycleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(k); setSortDir('asc'); }
  };

  return (
    <div className="r-card overflow-hidden">
      <div className="p-4 border-b border-border-2 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, or company…"
          className="r-input max-w-xs"
        />
        <div className="inline-flex items-center rounded-md border border-border p-0.5 bg-surface">
          {(['all', 'lead', 'active', 'customer', 'churned'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors',
                status === s ? 'bg-canvas-2 text-ink' : 'text-muted hover:text-ink'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="ml-auto text-xs text-muted">
          {rows.length} of {contacts.length} contacts
          {selected.size > 0 && (
            <span className="ml-3 inline-flex items-center gap-2 pl-3 border-l border-border">
              <span className="text-brand font-medium">{selected.size} selected</span>
              <button className="text-ink-2 hover:text-ink underline">Assign</button>
              <button className="text-ink-2 hover:text-ink underline">Tag</button>
              <button className="text-rose hover:underline">Archive</button>
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted uppercase tracking-wider">
              <th className="w-10 p-3 pl-4">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  onChange={(e) => setSelected(e.target.checked ? new Set(rows.map((r) => r.id)) : new Set())}
                  className="h-3.5 w-3.5 rounded border-border"
                />
              </th>
              <th className="p-3">
                <button onClick={() => cycleSort('fullName')} className="inline-flex items-center gap-1 hover:text-ink">Name {sortIcon('fullName')}</button>
              </th>
              <th className="p-3">
                <button onClick={() => cycleSort('company')} className="inline-flex items-center gap-1 hover:text-ink">Company {sortIcon('company')}</button>
              </th>
              <th className="p-3">Status</th>
              <th className="p-3">Owner</th>
              <th className="p-3">
                <button onClick={() => cycleSort('lastTouchAt')} className="inline-flex items-center gap-1 hover:text-ink">Last touch {sortIcon('lastTouchAt')}</button>
              </th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const owner = teamMembers.find((u) => u.id === c.ownerId);
              const isSelected = selected.has(c.id);
              return (
                <tr key={c.id} className={cn('border-t border-border-2 hover:bg-canvas-2/60 transition-colors', isSelected && 'bg-brand-soft/60')}>
                  <td className="p-3 pl-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(c.id)}
                      className="h-3.5 w-3.5 rounded border-border"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas-2 text-[11px] font-semibold text-ink">
                        {c.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <div className="font-medium text-ink">{c.fullName}</div>
                        <div className="text-xs text-muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-ink-2">{c.company}</div>
                    <div className="text-xs text-muted">{c.role} · {c.city}</div>
                  </td>
                  <td className="p-3">
                    <span className={cn('r-badge', statusClasses[c.status])}>{c.status}</span>
                  </td>
                  <td className="p-3">
                    {owner && (
                      <div className="flex items-center gap-2">
                        <img src={owner.avatarUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
                        <span className="text-ink-2">{owner.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-muted tabular-nums text-xs">{relTime(c.lastTouchAt)}</td>
                  <td className="p-3 text-muted-2 hover:text-ink">
                    <button aria-label="Open" className="p-1 rounded hover:bg-canvas-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="p-12 text-center text-sm text-muted">
            No contacts match those filters.
          </div>
        )}
      </div>
    </div>
  );
}
