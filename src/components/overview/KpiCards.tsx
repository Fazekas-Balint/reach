'use client';

import { useStore } from '@/lib/store';
import { shortMoney } from '@/lib/format';

export function KpiCards() {
  const { deals, contacts } = useStore();

  const pipeline = deals
    .filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
    .reduce((s, d) => s + d.amount * (d.probability / 100), 0);

  const won = deals.filter((d) => d.stage === 'closed_won').reduce((s, d) => s + d.amount, 0);

  const activeLeads = contacts.filter((c) => c.status === 'lead' || c.status === 'active').length;

  const winRate = (() => {
    const closed = deals.filter((d) => d.stage === 'closed_won' || d.stage === 'closed_lost');
    if (!closed.length) return 0;
    const won = closed.filter((d) => d.stage === 'closed_won').length;
    return Math.round((won / closed.length) * 100);
  })();

  const kpis = [
    { label: 'Weighted pipeline', value: shortMoney(pipeline), delta: '+12.4%', positive: true },
    { label: 'Closed won (Q)',    value: shortMoney(won),      delta: '+3 deals', positive: true },
    { label: 'Active leads',      value: String(activeLeads),  delta: '+2 this week', positive: true },
    { label: 'Win rate',          value: `${winRate}%`,        delta: '−4pt vs Q1', positive: false }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="r-card p-4">
          <div className="text-xs font-medium text-muted uppercase tracking-wider">
            {k.label}
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl font-semibold text-ink tabular-nums">{k.value}</div>
            <span className={`text-xs font-medium tabular-nums ${k.positive ? 'text-emerald' : 'text-rose'}`}>
              {k.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
