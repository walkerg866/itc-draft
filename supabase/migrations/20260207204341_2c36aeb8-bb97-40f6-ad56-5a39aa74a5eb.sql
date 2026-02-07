
-- Create storage bucket for download files
INSERT INTO storage.buckets (id, name, public)
VALUES ('downloads', 'downloads', true);

-- Allow public read access to download files
CREATE POLICY "Anyone can read download files"
ON storage.objects FOR SELECT
USING (bucket_id = 'downloads');

-- Allow authenticated users to upload download files
CREATE POLICY "Authenticated users can upload download files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'downloads');

-- Allow authenticated users to update download files
CREATE POLICY "Authenticated users can update download files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'downloads');

-- Allow authenticated users to delete download files
CREATE POLICY "Authenticated users can delete download files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'downloads');

-- Create downloads table to track metadata
CREATE TABLE public.downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  name TEXT NOT NULL,
  file_path TEXT,
  file_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Anyone can read downloads
CREATE POLICY "Anyone can read downloads"
ON public.downloads FOR SELECT
USING (true);

-- Authenticated users can manage downloads
CREATE POLICY "Authenticated users can insert downloads"
ON public.downloads FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update downloads"
ON public.downloads FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete downloads"
ON public.downloads FOR DELETE
TO authenticated
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_downloads_updated_at
BEFORE UPDATE ON public.downloads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the default download items (no files yet, admin will upload)
INSERT INTO public.downloads (section, name, sort_order) VALUES
  ('certifications', 'ISO 9001:2015 Certificate', 1),
  ('certifications', 'IATF 16949:2016 Certificate', 2),
  ('certifications', 'Conflict Minerals Declaration', 3),
  ('certifications', 'REACH Declaration', 4),
  ('certifications', 'RoHS Declaration', 5),
  ('certifications', 'California Proposition 65 Statement', 6),
  ('certifications', 'Environmental Policy Statement', 7),
  ('product-literature', 'Indiana Tube Product Catalog', 1),
  ('product-literature', 'Capabilities Brochure', 2),
  ('product-literature', 'Coated Tubing Guide', 3),
  ('product-literature', 'Fabricated Assemblies Brochure', 4),
  ('product-literature', 'Tube Stocking Program Overview', 5),
  ('technical-specs', 'Round Tubing Specifications', 1),
  ('technical-specs', 'Cut-to-Length Tube Specifications', 2),
  ('technical-specs', 'Coated Tubing Specifications', 3),
  ('technical-specs', 'Material & Grade Reference Sheet', 4),
  ('technical-specs', 'Dimensional Tolerance Guide', 5),
  ('terms', 'Terms & Conditions of Sale', 1),
  ('terms', 'Warranty Information', 2),
  ('terms', 'Shipping & Delivery Policy', 3);
