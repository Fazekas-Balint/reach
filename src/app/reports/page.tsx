import { RevenueChart } from '@/components/overview/RevenueChart';
import { PipelineByStage } from '@/components/overview/PipelineByStage';

export default function ReportsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Reports</h2>
          <p className="mt-1 text-sm text-muted">Trailing revenue, win-rate, and per-rep breakdowns.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="r-input" defaultValue="6m">
            <option value="1m">Last month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button className="r-btn r-btn--ghost">Export PDF</button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 r-card p-5">
          <h3 className="text-sm font-semibold text-ink">Revenue vs pipeline</h3>
          <p className="text-xs text-muted mt-0.5">Weighted by probability</p>
          <div className="mt-4 h-[320px]">
            <RevenueChart />
          </div>
        </div>
        <div className="r-card p-5">
          <h3 className="text-sm font-semibold text-ink">Pipeline by stage</h3>
          <p className="text-xs text-muted mt-0.5">Open deals only</p>
          <div className="mt-4"><PipelineByStage /></div>
        </div>
      </div>

      <div className="r-card p-5">
        <h3 className="text-sm font-semibold text-ink">Rep performance</h3>
        <p className="text-xs text-muted mt-0.5">Closed won amount, trailing quarter</p>
        <div className="mt-6 space-y-4">
          {[
            { name: 'Alex M.',    won: 72000, deals: 1, close: '58%' },
            { name: 'Priya S.',    won: 32000, deals: 1, close: '42%' },
            { name: 'Diego A.',    won: 36000, deals: 1, close: '61%' },
            { name: 'Rachel W.',   won: 0,     deals: 0, close: '—'   }
          ].map((r) => (
            <div key={r.name} className="grid grid-cols-4 items-center gap-4 pb-3 border-b border-border-2 last:border-b-0 last:pb-0 text-sm">
              <div className="font-medium text-ink">{r.name}</div>
              <div className="tabular-nums">€{r.won.toLocaleString('en-GB')}</div>
              <div className="text-muted tabular-nums">{r.deals} deals</div>
              <div className="text-muted tabular-nums text-right">{r.close}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
