
-- Drop permissive storage policies
DROP POLICY IF EXISTS "Authenticated users can delete download files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update download files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update site images" ON storage.objects;

-- Recreate with admin role checks
CREATE POLICY "Admins can delete download files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'downloads' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'super_admin'::public.app_role)
  )
);

CREATE POLICY "Admins can update download files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'downloads' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'super_admin'::public.app_role)
  )
);

CREATE POLICY "Admins can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'site-images' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'super_admin'::public.app_role)
  )
);

CREATE POLICY "Admins can update site images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'site-images' AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'super_admin'::public.app_role)
  )
);
