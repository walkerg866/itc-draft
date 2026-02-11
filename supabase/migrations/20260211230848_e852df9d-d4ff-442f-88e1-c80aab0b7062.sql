
-- Create site_videos table
CREATE TABLE public.site_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  file_path TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_videos ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read site videos"
  ON public.site_videos FOR SELECT
  USING (true);

-- Authenticated write
CREATE POLICY "Authenticated users can insert site videos"
  ON public.site_videos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site videos"
  ON public.site_videos FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete site videos"
  ON public.site_videos FOR DELETE
  USING (true);

-- Timestamp trigger
CREATE TRIGGER update_site_videos_updated_at
  BEFORE UPDATE ON public.site_videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
