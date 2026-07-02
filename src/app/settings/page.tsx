import { organization, teamMembers } from '@/lib/seed';

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
      <header>
        <h2 className="text-2xl font-semibold text-ink">Settings</h2>
        <p className="mt-1 text-sm text-muted">Workspace, seats, and integrations.</p>
      </header>

      <section className="r-card p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold text-ink">Workspace</h3>
            <p className="text-xs text-muted mt-0.5">The organisation everyone in your account belongs to.</p>
          </div>
          <span className="r-badge bg-brand-soft text-brand capitalize">{organization.plan}</span>
        </div>
        <dl className="mt-6 divide-y divide-border-2">
          <div className="grid grid-cols-3 py-3 text-sm">
            <dt className="text-muted">Name</dt>
            <dd className="col-span-2 text-ink">{organization.name}</dd>
          </div>
          <div className="grid grid-cols-3 py-3 text-sm">
            <dt className="text-muted">Domain</dt>
            <dd className="col-span-2 text-ink font-mono">{organization.domain}</dd>
          </div>
          <div className="grid grid-cols-3 py-3 text-sm">
            <dt className="text-muted">Seats</dt>
            <dd className="col-span-2 text-ink">{teamMembers.length} / {organization.seats}</dd>
          </div>
        </dl>
      </section>

      <section className="r-card p-6">
        <h3 className="text-sm font-semibold text-ink">Team</h3>
        <p className="text-xs text-muted mt-0.5">Everyone currently on Reach.</p>
        <ul className="mt-5 divide-y divide-border-2">
          {teamMembers.map((m) => (
            <li key={m.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={m.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium text-ink">{m.name}</div>
                  <div className="text-xs text-muted">{m.email}</div>
                </div>
              </div>
              <span className="r-badge bg-canvas-2 text-muted capitalize">{m.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="r-card p-6">
        <h3 className="text-sm font-semibold text-ink">Integrations</h3>
        <p className="text-xs text-muted mt-0.5">Connect Reach to the rest of your stack.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {['Gmail', 'Google Calendar', 'Slack', 'HubSpot import', 'Stripe', 'Zapier'].map((i) => (
            <li key={i} className="flex items-center justify-between rounded-lg border border-border-2 p-3">
              <span className="text-sm font-medium text-ink">{i}</span>
              <button className="r-btn r-btn--ghost">Connect</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
