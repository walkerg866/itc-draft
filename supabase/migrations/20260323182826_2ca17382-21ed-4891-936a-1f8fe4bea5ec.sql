
-- ============================================================
-- Tighten RLS policies on all admin-controlled tables
-- Replace permissive USING(true) / WITH CHECK(true) with admin role checks
-- ============================================================

-- Helper expression: has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin')

-- ===================== job_applications =====================
DROP POLICY IF EXISTS "Admins can read all applications" ON public.job_applications;
CREATE POLICY "Admins can read all applications" ON public.job_applications
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can update applications" ON public.job_applications;
CREATE POLICY "Admins can update applications" ON public.job_applications
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== downloads =====================
DROP POLICY IF EXISTS "Authenticated users can insert downloads" ON public.downloads;
CREATE POLICY "Admins can insert downloads" ON public.downloads
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can update downloads" ON public.downloads;
CREATE POLICY "Admins can update downloads" ON public.downloads
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete downloads" ON public.downloads;
CREATE POLICY "Admins can delete downloads" ON public.downloads
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== hero_slides =====================
DROP POLICY IF EXISTS "Authenticated users can insert hero slides" ON public.hero_slides;
CREATE POLICY "Admins can insert hero slides" ON public.hero_slides
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can update hero slides" ON public.hero_slides;
CREATE POLICY "Admins can update hero slides" ON public.hero_slides
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete hero slides" ON public.hero_slides;
CREATE POLICY "Admins can delete hero slides" ON public.hero_slides
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== site_images =====================
DROP POLICY IF EXISTS "Authenticated users can insert site images" ON public.site_images;
CREATE POLICY "Admins can insert site images" ON public.site_images
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can update site images" ON public.site_images;
CREATE POLICY "Admins can update site images" ON public.site_images
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete site images" ON public.site_images;
CREATE POLICY "Admins can delete site images" ON public.site_images
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== site_videos =====================
DROP POLICY IF EXISTS "Authenticated users can insert site videos" ON public.site_videos;
CREATE POLICY "Admins can insert site videos" ON public.site_videos
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can update site videos" ON public.site_videos;
CREATE POLICY "Admins can update site videos" ON public.site_videos
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete site videos" ON public.site_videos;
CREATE POLICY "Admins can delete site videos" ON public.site_videos
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== image_repository =====================
DROP POLICY IF EXISTS "Authenticated users can insert images" ON public.image_repository;
CREATE POLICY "Admins can insert images" ON public.image_repository
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can update images" ON public.image_repository;
CREATE POLICY "Admins can update images" ON public.image_repository
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete images" ON public.image_repository;
CREATE POLICY "Admins can delete images" ON public.image_repository
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== job_listings =====================
DROP POLICY IF EXISTS "Authenticated users can update job listings" ON public.job_listings;
CREATE POLICY "Admins can update job listings" ON public.job_listings
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete job listings" ON public.job_listings;
CREATE POLICY "Admins can delete job listings" ON public.job_listings
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can create job listings" ON public.job_listings;
CREATE POLICY "Admins can create job listings" ON public.job_listings
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== weather_alerts =====================
DROP POLICY IF EXISTS "Authenticated users can update alerts" ON public.weather_alerts;
CREATE POLICY "Admins can update alerts" ON public.weather_alerts
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can delete alerts" ON public.weather_alerts;
CREATE POLICY "Admins can delete alerts" ON public.weather_alerts
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can create alerts" ON public.weather_alerts;
CREATE POLICY "Admins can create alerts" ON public.weather_alerts
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- ===================== user_roles (SELECT) =====================
DROP POLICY IF EXISTS "Authenticated users can read roles" ON public.user_roles;
CREATE POLICY "Users can read own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'super_admin'));
