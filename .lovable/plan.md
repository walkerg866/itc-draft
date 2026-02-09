

# Image Storage via Lovable Cloud

## Why This Is the Right Approach

You're correct that cloud storage is better than base64 for images. Here's why:

- **Base64 problems**: Inflates file size by ~33%, gets embedded in JavaScript bundles (slowing initial page load), and can't be cached by the browser independently.
- **Cloud storage benefits**: Images are served via CDN with proper caching, loaded on-demand, and easily swapped out without code changes.

## Current State

The site has 7 images stored as static files in `src/assets/`:

| File | Used On |
|------|---------|
| `hero-steel-tubes.jpg` | Home, Products, Downloads |
| `facility-aerial.jpg` | Home, About |
| `industry-automotive.jpg` | Home, Industries |
| `industry-oil-gas.jpg` | Home, Industries |
| `industry-hvac.jpg` | Home, Industries |
| `industry-heavy-equip.jpg` | Home, Industries |
| `industry-structural.jpg` | Home, Industries |

These are currently bundled into the app via Vite's static import system — not base64, but still baked into the build. Moving them to cloud storage will decouple them from deployments and make them manageable by the admin.

## Implementation Plan

### Step 1: Create Storage Bucket

Create a public `site-images` storage bucket with policies for public read access and authenticated admin uploads.

### Step 2: Create Database Table

Create a `site_images` table to map logical image keys to storage URLs:

```text
site_images
-----------
id          (uuid, primary key)
key         (text, unique)  -- e.g. "hero-steel-tubes", "industry-automotive"
file_path   (text)          -- path in the storage bucket
url         (text)          -- public URL for the image
alt_text    (text)          -- accessibility description
created_at  (timestamptz)
updated_at  (timestamptz)
```

RLS: Public read, authenticated write/update/delete.

### Step 3: Seed With Current Images

Upload the 7 existing images to the `site-images` bucket and insert rows into the `site_images` table so the site works immediately after the migration.

### Step 4: Create a Hook

Build a `useSiteImages` hook that fetches all image records at app startup and provides them by key. This replaces static imports with a single lightweight lookup.

### Step 5: Update Pages

Refactor these 5 files to use the hook instead of static imports:
- `src/pages/Index.tsx`
- `src/pages/Industries.tsx`
- `src/pages/About.tsx`
- `src/pages/Products.tsx`
- `src/pages/Downloads.tsx`

Each page will call `useSiteImages()` and reference images by key (e.g. `images["hero-steel-tubes"]`), with the current static imports kept as fallbacks during loading.

### Step 6: Admin Image Manager

Add an **Images** tab to the admin dashboard (`/admin/dashboard/images`) where the admin can:
- View all site images with previews
- Upload replacements (e.g. swap out the hero photo)
- Update alt text
- Add new images for future use

### What Won't Change

- The static files in `src/assets/` will remain as fallbacks during loading states
- No visible change to end users — same images, same layout, just served more efficiently

## Technical Details

- Storage bucket: `site-images` (public)
- Database table: `site_images` with unique `key` column
- New files: `src/hooks/useSiteImages.ts`, `src/pages/admin/ImagesManager.tsx`
- Modified files: `Index.tsx`, `Industries.tsx`, `About.tsx`, `Products.tsx`, `Downloads.tsx`, `AdminDashboard.tsx`, `App.tsx`

