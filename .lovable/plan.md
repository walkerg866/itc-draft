

# Image Repository and Hero Slider

## Overview

Two features: (1) an image repository system so you can upload and store any number of images from the admin dashboard for future use anywhere on the site, and (2) a five-panel auto-rotating hero slider on the homepage where each slide has a background image and editable overlay copy (headline + subtitle + CTA).

---

## Part 1: Image Repository

### Current Limitation
The existing `site_images` table only holds images with predefined keys (like `hero-steel-tubes`, `facility-aerial`). You cannot freely upload new images -- only replace existing ones.

### Solution: New `image_repository` Table
A new database table to store an unlimited number of uploaded images with metadata:

- `id` (UUID, primary key)
- `name` (text) -- a friendly label you give each image
- `file_path` (text) -- path in the `site-images` storage bucket
- `url` (text) -- public URL
- `alt_text` (text, nullable)
- `created_at` / `updated_at` (timestamps)

RLS policies: public SELECT (so the frontend can display them), authenticated-only INSERT/UPDATE/DELETE (admin only).

### New Admin Page: Image Repository Manager (`src/pages/admin/ImageRepositoryManager.tsx`)
- "Upload Image" button opens a dialog to pick a file and give it a name
- Grid view of all uploaded images with thumbnails
- Edit name/alt text inline
- Delete images (removes from storage bucket and database)
- Separate from the existing "Site Images" manager which stays for the predefined image slots

### Navigation Update
- Add "Image Repository" as a new item in the admin sidebar (`src/pages/AdminDashboard.tsx`)
- New route `/admin/dashboard/image-repository` in `src/App.tsx`

---

## Part 2: Five-Panel Hero Slider

### New `hero_slides` Table
Stores the five hero slides with admin-editable content:

- `id` (UUID, primary key)
- `sort_order` (integer) -- 1 through 5
- `image_url` (text) -- URL of the background image (can be picked from the image repository or uploaded directly)
- `headline` (text) -- main heading displayed over the image
- `subtitle` (text, nullable) -- secondary text below the headline
- `cta_text` (text, nullable) -- button label (e.g., "Request a Quote")
- `cta_link` (text, nullable) -- button destination (e.g., "/contact")
- `is_active` (boolean, default true)
- `created_at` / `updated_at` (timestamps)

RLS: public SELECT, authenticated INSERT/UPDATE/DELETE.

Pre-seed with 5 default slides so the hero works immediately.

### Homepage Hero Rewrite (`src/pages/Index.tsx`)
- Replace the single static hero image with a five-panel slider using Embla Carousel (already installed)
- Each slide is full-bleed with the background image, a dark gradient overlay, and the headline/subtitle/CTA text positioned on top
- Auto-advances every 6 seconds with a pause on hover
- Navigation dots at the bottom to indicate which slide is active and allow manual selection
- Smooth crossfade or slide transition using Framer Motion (already installed)
- Falls back to the current static hero if no slides are returned from the database

### Hero Slides Admin Manager (`src/pages/admin/HeroSlidesManager.tsx`)
- List all 5 slides in order with image preview and copy fields
- Upload/replace background image for each slide (uploads to `site-images` bucket)
- Edit headline, subtitle, CTA text, and CTA link inline
- Toggle slides active/inactive
- Drag or arrow buttons to reorder slides

### Admin Navigation
- Add "Hero Slides" to the admin sidebar
- New route `/admin/dashboard/hero-slides` in `src/App.tsx`

---

## Technical Details

### Database Migration (single migration)
1. Create `image_repository` table with columns described above
2. Create `hero_slides` table with columns described above
3. Add RLS policies for both tables (public read, authenticated write)
4. Seed `hero_slides` with 5 default rows using the existing hero image and placeholder copy

### New Files
- `src/pages/admin/ImageRepositoryManager.tsx` -- upload/manage image library
- `src/pages/admin/HeroSlidesManager.tsx` -- manage the 5 hero slides
- `src/components/HeroSlider.tsx` -- the carousel component used on the homepage

### Modified Files
- `src/pages/Index.tsx` -- replace static hero with `<HeroSlider />`
- `src/pages/AdminDashboard.tsx` -- add two new sidebar items (Image Repository, Hero Slides)
- `src/App.tsx` -- add two new admin routes

### Design Approach
- Hero slider maintains the current dark overlay + left-aligned copy layout
- Each slide can have unique headline text, subtitle, and optional CTA button
- Dot indicators styled with the site's orange primary color for the active dot
- Transitions are smooth with a slight zoom effect on the background image for visual interest
- Fully responsive: text scales down on mobile, dots remain accessible

