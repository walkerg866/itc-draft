
DROP POLICY "Authenticated users can insert site videos" ON public.site_videos;
DROP POLICY "Authenticated users can update site videos" ON public.site_videos;
DROP POLICY "Authenticated users can delete site videos" ON public.site_videos;

CREATE POLICY "Authenticated users can insert site videos" ON public.site_videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update site videos" ON public.site_videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete site videos" ON public.site_videos FOR DELETE TO authenticated USING (true);
