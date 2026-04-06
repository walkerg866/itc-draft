

## Plan: Steel Partners Link + Executive Bios Section

### What we're building

1. **Steel Partners logo hyperlink** — wrap the existing logo on the About page so it opens https://www.steelpartners.com/ in a new tab.

2. **Executive Bios section on /about** — a new section (between Values and Steel Partners sections) showing a 3×2 grid of executive bios. Each bio card has a photo, name, title, and a clickable LinkedIn link on the image. Data is fetched from a new database table. Only bios marked `is_active` are shown.

3. **New database table: `executive_bios`** with columns: `id`, `name`, `title`, `image_url`, `linkedin_url`, `is_active`, `sort_order`, `created_at`, `updated_at`. RLS: public SELECT for active bios, admin INSERT/UPDATE/DELETE.

4. **Admin panel page: Executive Bios Manager** — CRUD interface with image upload (to `site-images` bucket), name/title/LinkedIn URL fields, and on/off toggle for each bio. Added to sidebar nav and routes.

### Technical details

**Migration SQL:**
- Create `executive_bios` table with columns listed above
- RLS policies: public can SELECT where `is_active = true`, authenticated admins can do all operations (using `has_role`)

**Files to create:**
- `src/pages/admin/ExecutiveBiosManager.tsx` — admin CRUD page with toggle switches, image upload, name/title/LinkedIn fields, reorder by sort_order

**Files to modify:**
- `src/pages/About.tsx` — (a) wrap Steel Partners logo in `<a href="https://www.steelpartners.com/" target="_blank">`, (b) add new Executive Leadership section with a grid querying `executive_bios` table
- `src/pages/AdminDashboard.tsx` — add "Executive Bios" nav item
- `src/App.tsx` — add route `/admin/dashboard/executive-bios`

**About page bios section design:**
- Section header: "Executive Leadership"
- 3-column grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card: rounded image (clickable to LinkedIn if URL exists, opens new tab), name in bold below, title in muted text
- Only shows bios where `is_active = true`, ordered by `sort_order`

