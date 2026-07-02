'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { useStore } from '@/lib/store';
import { dealStages, type DealStage, type Deal } from '@/lib/types';
import { teamMembers } from '@/lib/seed';
import { shortMoney } from '@/lib/format';
import { DealCard } from './DealCard';
import { KanbanColumn } from './KanbanColumn';

export function DealsKanban() {
  const { deals, moveDeal } = useStore();
  const [dragging, setDragging] = useState<Deal | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onStart = (e: DragStartEvent) => {
    const deal = deals.find((d) => d.id === e.active.id);
    if (deal) setDragging(deal);
  };
  const onEnd = (e: DragEndEvent) => {
    setDragging(null);
    if (!e.over) return;
    const overStage = String(e.over.id) as DealStage;
    if (dealStages.some((s) => s.id === overStage)) {
      moveDeal(String(e.active.id), overStage);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 text-xs text-muted">
        <span>Total open: <span className="text-ink font-medium tabular-nums">{shortMoney(deals.filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost').reduce((s, d) => s + d.amount, 0))}</span></span>
        <span>·</span>
        <span>Closed won this quarter: <span className="text-emerald font-medium tabular-nums">{shortMoney(deals.filter((d) => d.stage === 'closed_won').reduce((s, d) => s + d.amount, 0))}</span></span>
      </div>

      <DndContext sensors={sensors} onDragStart={onStart} onDragEnd={onEnd}>
        <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-6">
          {dealStages.map((s) => {
            const items = deals.filter((d) => d.stage === s.id);
            return (
              <KanbanColumn key={s.id} stage={s} items={items} teamMembers={teamMembers} />
            );
          })}
        </div>

        <DragOverlay dropAnimation={null}>
          {dragging && (
            <div className="rotate-2 opacity-90">
              <DealCard deal={dragging} owner={teamMembers.find((u) => u.id === dragging.ownerId)} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
