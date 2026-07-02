import { DealsKanban } from '@/components/deals/DealsKanban';

export default function DealsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Deals</h2>
          <p className="mt-1 text-sm text-muted">Drag a card across stages. The forecast updates on drop.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="r-btn r-btn--ghost">Board</button>
          <button className="r-btn r-btn--ghost">List</button>
          <button className="r-btn r-btn--brand">+ New deal</button>
        </div>
      </header>

      <DealsKanban />
    </div>
  );
}
