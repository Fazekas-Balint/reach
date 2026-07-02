import { RevenueChart } from '@/components/overview/RevenueChart';
import { PipelineByStage } from '@/components/overview/PipelineByStage';
import { KpiCards } from '@/components/overview/KpiCards';
import { RecentActivity } from '@/components/overview/RecentActivity';

export default function OverviewPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Good afternoon.</h2>
          <p className="mt-1 text-sm text-muted">Here's the week so far.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button className="r-btn r-btn--ghost">Export</button>
          <button className="r-btn r-btn--brand">
            + New deal
          </button>
        </div>
      </header>

      <KpiCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 r-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">Revenue vs pipeline</h3>
              <p className="text-xs text-muted mt-0.5">Trailing 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-muted"><span className="h-2.5 w-2.5 rounded-sm bg-brand" /> Revenue</span>
              <span className="flex items-center gap-1.5 text-muted"><span className="h-2.5 w-2.5 rounded-sm border border-dashed border-muted" /> Pipeline</span>
            </div>
          </div>
          <div className="mt-4 h-[280px]">
            <RevenueChart />
          </div>
        </div>

        <div className="r-card p-5">
          <h3 className="text-sm font-semibold text-ink">Pipeline by stage</h3>
          <p className="text-xs text-muted mt-0.5">Open deals only</p>
          <div className="mt-4">
            <PipelineByStage />
          </div>
        </div>
      </div>

      <div className="r-card">
        <div className="p-5 border-b border-border-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Recent activity</h3>
          <a href="/activity" className="text-xs text-brand hover:underline">View all →</a>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
