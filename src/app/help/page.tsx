export default function HelpPage() {
  const faqs = [
    { q: 'How do I import contacts from HubSpot?',      a: 'Settings → Integrations → HubSpot import. Reach will match on email address and skip duplicates.' },
    { q: 'Can I customise the pipeline stages?',        a: 'Yes. Settings → Pipeline. You can add, rename, and reorder — every existing deal keeps its history through the change.' },
    { q: 'Where is the mobile app?',                     a: 'iOS and Android in TestFlight and internal beta. Public release is scheduled for Q4 2026.' },
    { q: 'What is the difference between Growth and Scale?', a: 'Scale adds SSO/SAML, SCIM provisioning, custom retention, and a dedicated CSM. Everything else is the same product.' }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
      <header>
        <h2 className="text-2xl font-semibold text-ink">Help</h2>
        <p className="mt-1 text-sm text-muted">Common questions, plus how to reach a human quickly.</p>
      </header>

      <section className="r-card divide-y divide-border-2">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex items-center justify-between cursor-pointer">
              <span className="font-medium text-ink">{f.q}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-2 group-open:rotate-45 transition-transform">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">{f.a}</p>
          </details>
        ))}
      </section>

      <section className="r-card p-6">
        <h3 className="text-sm font-semibold text-ink">Talk to us</h3>
        <p className="text-xs text-muted mt-0.5">Median first response under 30 minutes on business hours.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="r-btn r-btn--brand">Start a chat</button>
          <a href="mailto:support@reach.example" className="r-btn r-btn--ghost">Email support</a>
        </div>
      </section>
    </div>
  );
}
