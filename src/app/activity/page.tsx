import { RecentActivity } from '@/components/overview/RecentActivity';

export default function ActivityPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      <header>
        <h2 className="text-2xl font-semibold text-ink">Activity</h2>
        <p className="mt-1 text-sm text-muted">Everything the team has done, in chronological order.</p>
      </header>

      <div className="r-card">
        <div className="p-4 border-b border-border-2 flex items-center gap-3">
          <input placeholder="Filter by note, name, or deal…" className="r-input max-w-sm" />
          <div className="inline-flex items-center rounded-md border border-border p-0.5 bg-surface text-xs">
            {['All', 'Calls', 'Emails', 'Meetings', 'Notes'].map((f) => (
              <button key={f} className={`px-2.5 py-1 rounded ${f === 'All' ? 'bg-canvas-2 text-ink font-medium' : 'text-muted hover:text-ink'}`}>{f}</button>
            ))}
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
