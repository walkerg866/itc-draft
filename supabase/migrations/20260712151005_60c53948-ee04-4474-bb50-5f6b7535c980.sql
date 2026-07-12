
-- Remove broad SELECT policies that allow listing all files in public buckets.
-- Public URLs still work via CDN without RLS.
DROP POLICY IF EXISTS "Anyone can read download files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view site images" ON storage.objects;

-- Tighten INSERT policies to admins only (also addresses tampering findings)
DROP POLICY IF EXISTS "Authenticated users can upload download files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload site images" ON storage.objects;

CREATE POLICY "Admins can upload download files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'downloads'
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
);

CREATE POLICY "Admins can upload site images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'site-images'
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
);
