import { ContactsTable } from '@/components/contacts/ContactsTable';

export default function ContactsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Contacts</h2>
          <p className="mt-1 text-sm text-muted">Everyone in the pipeline. Filter, search, and open a card.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="r-btn r-btn--ghost">Import CSV</button>
          <button className="r-btn r-btn--brand">+ Add contact</button>
        </div>
      </header>

      <ContactsTable />
    </div>
  );
}
