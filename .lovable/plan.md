

# Homepage Video Section

## Overview

Replace the five industry cards section on the homepage with a single video player. You will be able to upload a video file through the admin dashboard and manage it from there. The video will display prominently on the homepage with a clean, centered layout.

---

## Video Storage

A new database table `site_videos` will store a reference to the uploaded video:

- `id` (UUID, primary key)
- `key` (text, unique) -- logical identifier, e.g. "homepage-video"
- `name` (text) -- friendly label
- `file_path` (text) -- path in the `site-images` storage bucket
- `url` (text) -- public URL
- `created_at` / `updated_at` (timestamps)

RLS: public SELECT, authenticated-only INSERT/UPDATE/DELETE.

Only one video is needed right now (keyed as `homepage-video`), but the table supports adding more in the future.

---

## Admin: Video Manager

A new admin page at `/admin/dashboard/videos` will let you:

- Upload a video file (MP4 recommended, stored in the existing `site-images` bucket)
- See the current homepage video with a preview player
- Replace or delete the video
- Simple, single-purpose interface -- no complex grid needed since there is just one video slot for now

A new sidebar link "Videos" will be added to the admin dashboard.

---

## Homepage Changes

The "Industries We Serve" section (lines 76-102 in `Index.tsx`) -- containing the heading, subheading, and five industry cards -- will be **replaced** with a video section:

- Centered container with a 16:9 aspect ratio video player
- Uses the native HTML `<video>` tag with controls (play/pause, volume, fullscreen)
- Optional section heading above the video (e.g. "See ITC in Action")
- Rounded corners and a subtle shadow to match the site's visual style
- If no video has been uploaded yet, the section is hidden entirely
- Responsive: scales cleanly on mobile

The industry card imports and data will be removed from the page since they are no longer used.

---

## Technical Details

### Database Migration
1. Create `site_videos` table with the columns listed above
2. Add RLS policies (public read, authenticated write)

### New Files
- `src/pages/admin/VideosManager.tsx` -- upload/replace the homepage video
- `src/hooks/useSiteVideos.ts` -- query hook to fetch videos by key

### Modified Files
- `src/pages/Index.tsx` -- remove industry cards section, add video section
- `src/pages/AdminDashboard.tsx` -- add "Videos" sidebar link
- `src/App.tsx` -- add `/admin/dashboard/videos` route

### Cleanup
- The `IndustryCard` component and industry-specific image imports in `Index.tsx` will be removed from the homepage (the component file itself can stay in case it is used on the Industries page)

