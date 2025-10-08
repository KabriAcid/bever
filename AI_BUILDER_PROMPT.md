Admin Dashboard Builder Prompt

Goal

- Build an Admin Dashboard that controls the Bever frontend (users, products, orders, settings).
- It must reuse the project's existing Tailwind + component classes (no new boilerplates or stylesheets).
- Admin UI should live under `src/admin` and include a reusable `ui/` directory for small building blocks.

Design philosophy

- Keep visual parity with main app: use existing utility classes (`btn-primary`, `card`, `text-responsive`, `icon-responsive`, etc).
- Mobile-first, accessible, minimal stateful logic in UI (fetch from API or use local context mocks during development).
- Reusable, composable UI primitives stored in `src/admin/ui` (StatCard, Table, Modal, FormField, etc.).

Required screens / features

1. Dashboard: Key metrics, quick actions.
2. Users: List, search, view, deactivate/reactivate, export.
3. Products: CRUD, bulk upload, price adjustments, inventory.
4. Orders: Filter by status, view details, change status.
5. Settings: Toggle app-level flags (maintenance mode, delivery fees, etc.).
6. Auth: Admin-only access (can use a simple local mock during initial build).

Developer notes

- Prefer using existing components and utility classes. Do not add global CSS files.
- Create small, tested components in `src/admin/ui` and export them for reuse.
- Keep API calls abstracted behind a `services/` layer; for now mock responses with setTimeouts.

Deliverables (first iteration)

- `src/admin/AdminLayout.tsx` (sidebar + outlet)
- `src/admin/pages/{Dashboard,Users,Products,Orders,Settings}.tsx`
- `src/admin/ui/{StatCard,Table,Modal,FormField}.tsx` (minimal versions)
- Basic routing integration in `App.tsx` (e.g. route `/admin/*` to admin layout)
- `README.md` with developer instructions to run admin locally

Testing and verification

- Ensure `npm run build` succeeds
- Spot-check Dashboard and Users pages render without errors

Optional next steps

- Role-based access control
- Real API integration and GraphQL support
- Admin analytics pages with charts (reuse micro-components)

Usage for an AI builder

- Use this prompt to generate code changes step-by-step.
- When generating components, prefer small, focused files and follow existing type definitions.
- Add comments where decisions are ambiguous.
