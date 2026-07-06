# Cleanup & Deploy-Readiness Plan

Grouped by phase so we can ship incrementally and stop between phases if needed. Each phase is independently mergeable.

## Phase 1 — Critical correctness fixes

**1.1 Fix N+1 in `manage-admin-users` GET**
`supabase/functions/manage-admin-users/index.ts` currently loops `getUserById` once per admin. Replace with a single `auth.admin.listUsers({ perPage: 200 })`, index the results by `id`, and join in-memory. Removes N HTTP hops from every Users page load.

**1.2 Add error handling / loading recovery**
Wrap `AdminHome.loadStats`, `ApplicationsViewer.fetchApplications`, `QuoteRequestsViewer.fetch` in `try / catch / finally` so `loading` always clears and an inline error state renders on failure.

**1.3 Guard `NotificationSettings` admin lookup**
Only call `manage-admin-users` when `isSuperAdmin` is true; show a friendly "only super admins can view recipients" state otherwise. Prevents silent 403s.

**1.4 Decide the fate of `image_repository`**
Table has a manager UI but no reader. Two options — I'll ask before Phase 1 ships:
- Wire it into a public consumer (e.g. reusable `<RepositoryImage id="…" />`), or
- Drop the table + manager if it was replaced by `site_images`.

## Phase 2 — Auth / edge-function hygiene

**2.1 Flip `verify_jwt` to `true`** for `manage-admin-users` and `send-test-notification` in `supabase/config.toml`. Leave `send-notification` at `false` — it's the DB-trigger webhook and authenticates via `x-webhook-secret`.

**2.2 Extract a shared `callAdminEdge()` helper**
`AdminHome`, `UserManagement`, and `NotificationSettings` all hand-roll the same `fetch(functions/v1/manage-admin-users, { headers: { Authorization, apikey } })` block. Move to `src/lib/adminApi.ts`.

**2.3 Remove dead variable `callerHasAnyRole`** in the edge function.

**2.4 `notification-pdfs` bucket retention**
Add a scheduled cleanup (delete objects older than 90 days) via a small edge function + `pg_cron`, or stop writing the archival copy entirely. I'll ask which before implementing.

## Phase 3 — Type safety

**3.1 Regenerate Supabase types** so `site_videos` and `quote_requests` are typed. Eliminates 14 of the 18 `as any` casts.

**3.2 Fix the remaining casts**
- Add `is_active: boolean` to `DownloadItem` in `useDownloads.ts`.
- Type `HeroSlidesManager.setField` with `keyof HeroSlide`.
- Define `EmploymentHistoryEntry` and `ApplicantReference` shapes in `ApplicationsViewer.tsx`.

## Phase 4 — Dead code & bundle slim-down

**4.1 Remove unused shadcn UI components** (only if grep confirms zero callers):
`aspect-ratio, avatar, breadcrumb, carousel, chart, context-menu, drawer, hover-card, input-otp, menubar, navigation-menu, resizable, slider, toggle, toggle-group, command, calendar` plus the duplicate `src/components/ui/use-toast.ts`.

**4.2 Remove unused project components** (after final grep):
`NavLink.tsx`, `IndustryCard.tsx`, `SectionReveal.tsx`, `ValuePropsSection.tsx`, `DownloadListCard.tsx`.

**4.3 Uninstall now-unused npm packages:**
`recharts, vaul, input-otp, react-resizable-panels, embla-carousel-react, next-themes, cmdk, react-day-picker` (+ `date-fns` if no direct usage remains). Est. ~650 KB off the bundle.

## Phase 5 — UX gaps

**5.1 Server-side pagination** in `ApplicationsViewer` and `QuoteRequestsViewer` (`.range(offset, offset+49)` + "Load more").

**5.2 Empty states** for `ApplicationsViewer`, `QuoteRequestsViewer`, `UserManagement`.

**5.3 Orphan-file cleanup** in `GeneralInterestForm`: if the DB insert fails after upload, delete the uploaded resume from storage.

**5.4 Email validation** on `GeneralInterestForm` (switch input to `type="email"` + regex).

## Phase 6 — Config, SEO, deploy

**6.1 Create `.env.example`** with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Remove unused `VITE_SUPABASE_PROJECT_ID` from `.env`.

**6.2 Centralize company constants** in `src/config/company.ts` (phone, sales email, HQ address, ADP careers URL). Point `Header`, `Footer`, `Contact` at it.

**6.3 Fix `PUBLIC_SITE_URL` fallback** in `send-notification` — remove the hardcoded `https://indianatube.com` fallback so misconfiguration fails loudly instead of leaking prod links into preview/staging emails.

**6.4 OG/Twitter image tags** — add `og:image`, `og:url`, `twitter:image` to `index.html` using a stable public asset URL.

**6.5 Add `public/sitemap.xml`** covering the 8 public routes.

**6.6 Lazy-load** dynamic images in `HeroSlider` (except the first slide) and `About.tsx` bio images.

## Phase 7 — Minor / cosmetic

- Verify `Legal.tsx` has `id="privacy"` and `id="terms"` anchors matching the footer hash links.
- Remove the `path: "/careers"` field from the `Header.tsx` navLinks entry (it's external-only) or add a `/careers` route that redirects to the ADP URL.

---

## Technical details for reviewers

- **N+1 fix**: `auth.admin.listUsers` returns `{ users: User[] }` — index by `id`, then map `roles → { id, email, role, created_at }`.
- **verify_jwt**: In-code `authHeader` checks stay in place as a second layer; gateway JWT validation is additive, not a replacement.
- **Types regen**: run `supabase gen types typescript --local > src/integrations/supabase/types.ts` (or the Cloud equivalent) — this file is auto-generated, not hand-edited.
- **Pagination**: use `count: "exact"` alongside `.range()` to render "showing 1–50 of N".
- **Dead-code removal order**: uninstall packages **after** deleting the UI components that import them, so the build stays green between commits.

## What I'm NOT touching

- Active security findings `resumes_auth_overpermissive` and `SUPA_public_bucket_allows_listing` (owned by the security queue).
- Database migrations that would change `job_applications` column nullability — those are risky and need a separate data-audit conversation.
- Visual redesigns — this plan is purely cleanup, no UX changes beyond loading/empty/error states.

## Open questions before I start Phase 1

1. **`image_repository`** — is it in active use somewhere I missed, or safe to drop the table + manager?
2. **`notification-pdfs` archival** — keep with 90-day retention, or stop writing entirely?
