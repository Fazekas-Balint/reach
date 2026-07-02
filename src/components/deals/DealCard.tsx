'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Deal, User } from '@/lib/types';
import { money } from '@/lib/format';
import { format } from 'date-fns';

export function DealCard({ deal, owner }: { deal: Deal; owner: User | undefined }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group r-card p-3 cursor-grab active:cursor-grabbing hover:border-brand transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-ink leading-snug line-clamp-2">{deal.title}</h4>
        <span className="text-[10px] font-mono text-muted-2 shrink-0">/{deal.id.replace('d_', '')}</span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-semibold text-ink tabular-nums">
          {money(deal.amount, deal.currency)}
        </span>
        <span className="text-xs text-muted">{deal.probability}%</span>
      </div>

      <div className="mt-3 pt-3 border-t border-border-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted">
          {owner && (
            <>
              <img src={owner.avatarUrl} alt="" className="h-4 w-4 rounded-full object-cover" />
              <span>{owner.name.split(' ')[0]}</span>
            </>
          )}
        </div>
        <span className="text-muted tabular-nums">
          {format(new Date(deal.expectedCloseAt), 'd MMM')}
        </span>
      </div>
    </article>
  );
}
