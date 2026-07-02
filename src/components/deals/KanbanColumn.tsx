'use client';

import { useDroppable } from '@dnd-kit/core';
import type { Deal, User } from '@/lib/types';
import { shortMoney } from '@/lib/format';
import { DealCard } from './DealCard';
import { cn } from '@/lib/cn';

type StageMeta = { id: Deal['stage']; label: string; colour: string };

export function KanbanColumn({
  stage,
  items,
  teamMembers
}: {
  stage: StageMeta;
  items: Deal[];
  teamMembers: User[];
}) {
  const { isOver, setNodeRef } = useDroppable({ id: stage.id });
  const total = items.reduce((s, d) => s + d.amount, 0);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-xl border transition-colors',
        isOver ? 'border-brand bg-brand-soft/30' : 'border-border bg-canvas'
      )}
    >
      <header className="p-3 border-b border-border-2 flex items-center justify-between sticky top-0 bg-inherit rounded-t-xl">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: stage.colour }} />
          <span className="text-sm font-semibold text-ink truncate">{stage.label}</span>
          <span className="text-xs text-muted-2 tabular-nums">{items.length}</span>
        </div>
        <span className="text-xs text-muted tabular-nums">{shortMoney(total)}</span>
      </header>

      <div className="p-3 space-y-2.5 min-h-[240px]">
        {items.map((d) => (
          <DealCard key={d.id} deal={d} owner={teamMembers.find((u) => u.id === d.ownerId)} />
        ))}
        {items.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border py-8 text-center text-xs text-muted-2">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}
