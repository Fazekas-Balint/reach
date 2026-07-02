# Reach — Mini-CRM SaaS (full-stack)

**Industry:** B2B SaaS — a contact and deal-pipeline tool for small sales teams.

A production-shaped mini-CRM: sidebar shell, dashboard, contacts table, deals kanban with drag-and-drop, activity feed, reports, and settings. Runs entirely offline from a deterministic seed — no DB, no auth, no API keys. The types and code paths are the same shape you'd hand to Drizzle + Postgres + Clerk on the next commit.

## Quick start

```bash
npm install
npm run dev   # http://localhost:3010
```

## Stack

- **Next.js 15** App Router + React 19 + TypeScript (strict)
- **Tailwind CSS v4** with `@theme` tokens (single indigo accent on neutral ink scale)
- **@dnd-kit/core** for the deals kanban (DragOverlay pattern with rotate + opacity while dragging)
- **Recharts** for the dashboard area chart
- **Framer Motion** available on the client for interactions
- **date-fns** for close-date formatting
- **clsx** for the `cn(...)` classname helper

## What is (and isn't) real

The types in [`src/lib/types.ts`](./src/lib/types.ts) are shaped exactly like Drizzle table rows would be — `orgId`, `ownerId`, foreign-key `contactId`/`dealId`, ISO string timestamps. The [`seed.ts`](./src/lib/seed.ts) file is a deterministic fixture that would come from `drizzle-kit seed` in production. The [`store.tsx`](./src/lib/store.tsx) context is a stand-in for a real fetch + server-action mutation cycle.

Wiring in a live database is a two-file change:

1. Add Drizzle schema mirroring `types.ts`
2. Replace `useStore` calls with `useSuspenseQuery` + server actions

Everything above that line — the dnd-kit kanban, the sortable table, the KPI computation, the pipeline breakdown, the activity feed — is production code.

## Design system

- **Surface** — pure white on `#f8f9fb` app canvas — the same neutral hierarchy Linear and Notion use
- **Ink** — near-black `#0d1220` for headings, four tiered greys for hierarchy
- **Brand** — indigo `#4f46e5` — used on the active nav pill, the primary CTA, the chart line, and hover borders. Nowhere else.
- **Status** — emerald / amber / rose with matching soft-tinted backgrounds for badges

Tokens live in [`src/app/globals.css`](./src/app/globals.css) as `@theme` variables — `--color-brand`, `--color-ink`, `--color-canvas`, etc.

## Page structure

Multi-page app under the App Router:

- `/` — Overview dashboard (KPI cards, revenue chart, pipeline breakdown, recent activity)
- `/contacts` — Sortable, searchable, multi-select contacts table with status filter pills
- `/deals` — Kanban board across 6 stages with drag-and-drop; totals update reactively on drop
- `/activity` — Filterable activity feed (calls / emails / meetings / notes / stage-moves)
- `/reports` — Trailing revenue chart + per-rep performance table
- `/settings` — Workspace, team seats, and integrations grid
- `/help` — FAQ + support CTAs

Shell (sidebar + topbar) sits in [`app/layout.tsx`](./src/app/layout.tsx) — every page keeps it.

## Signature UX

- **Kanban dnd-kit**: `DragOverlay` with a `rotate-2` + `opacity-90` clone follows the pointer; drop zones (`useDroppable`) light up with the brand color; the source card shows `opacity: 0.4` while dragging. Totals at the top of each column recompute reactively.
- **Contacts table**: three-way sort (name / company / last touch) with column-header cycles asc → desc, multi-select checkbox with a bulk-action bar that appears in the toolbar, status filter as a segmented control that also filters the row count.
- **Command bar spot** in the topbar: search input with a `⌘K` kbd chip — reserved for the next iteration.
- **Empty states**: every list has one — the drop zone in an empty kanban column, the "no contacts match those filters" panel.

## Deploy

```bash
npm run build
npm run start
```

Zero infrastructure required for the portfolio version. To promote to prod:

1. `neondb://…` in `.env` → point Drizzle at it
2. `CLERK_SECRET_KEY` → wrap the layout with `<ClerkProvider>` and swap `currentUser` for `auth().userId`
3. Convert `useStore` mutations to server actions and cache-invalidate

## What this project demonstrates

- **Multi-page App Router discipline** — real route structure, shared layout, static generation where possible (every page in this build is `○` static)
- **Data-modelling instincts** — the type file reads like an ERD; foreign keys named consistently, statuses as string unions not booleans, currency and probability first-class
- **dnd-kit at production quality** — DragOverlay pattern, droppable containers with visual affordance, drop-only-on-column-not-on-card semantics
- **shadcn-in-spirit** — no shadcn dep; `r-card`, `r-btn`, `r-badge`, `r-input`, `r-kbd` are the whole component layer, defined once in globals.css and used everywhere
- **Data-tool taste** — the design register is Linear / Height / Attio, not Bootstrap admin template. Every colour choice is intentional.

## Inspiration

- [linear.app](https://linear.app) — sidebar / topbar proportions, ink scale
- [attio.com](https://attio.com) — contact table density, filter chip pattern
- [pipedrive.com](https://pipedrive.com) — kanban stage colour semantics
- [notion.so](https://notion.so) — subtle card shadow, hover-open detail pattern
