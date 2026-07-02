'use client';

import { useStore } from '@/lib/store';
import { dealStages } from '@/lib/types';
import { shortMoney } from '@/lib/format';

export function PipelineByStage() {
  const { deals } = useStore();

  const perStage = dealStages
    .filter((s) => s.id !== 'closed_won' && s.id !== 'closed_lost')
    .map((s) => {
      const inStage = deals.filter((d) => d.stage === s.id);
      const total = inStage.reduce((sum, d) => sum + d.amount, 0);
      return { ...s, total, count: inStage.length };
    });

  const max = Math.max(1, ...perStage.map((s) => s.total));

  return (
    <ul className="space-y-4">
      {perStage.map((s) => (
        <li key={s.id}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-ink font-medium">{s.label}</span>
            <span className="text-muted tabular-nums">
              {s.count} · {shortMoney(s.total)}
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-canvas-2 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{ width: `${(s.total / max) * 100}%`, background: s.colour }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
