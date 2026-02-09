
-- Create site-images storage bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

-- Public read access for site-images bucket
CREATE POLICY "Anyone can view site images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- Authenticated users can upload site images
CREATE POLICY "Authenticated users can upload site images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-images');

-- Authenticated users can update site images
CREATE POLICY "Authenticated users can update site images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-images');

-- Authenticated users can delete site images
CREATE POLICY "Authenticated users can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-images');

-- Create site_images table
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  file_path TEXT,
  url TEXT,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read site images"
ON public.site_images FOR SELECT
USING (true);

-- Authenticated write
CREATE POLICY "Authenticated users can insert site images"
ON public.site_images FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update site images"
ON public.site_images FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete site images"
ON public.site_images FOR DELETE
TO authenticated
USING (true);

-- Auto-update timestamp trigger
CREATE TRIGGER update_site_images_updated_at
BEFORE UPDATE ON public.site_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
