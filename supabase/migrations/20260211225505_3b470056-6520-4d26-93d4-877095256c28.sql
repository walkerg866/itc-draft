
-- Image Repository table
CREATE TABLE public.image_repository (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.image_repository ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view images" ON public.image_repository FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert images" ON public.image_repository FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update images" ON public.image_repository FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete images" ON public.image_repository FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_image_repository_updated_at
  BEFORE UPDATE ON public.image_repository
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Hero Slides table
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  headline TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hero slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert hero slides" ON public.hero_slides FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update hero slides" ON public.hero_slides FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete hero slides" ON public.hero_slides FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_hero_slides_updated_at
  BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed 5 default hero slides
INSERT INTO public.hero_slides (sort_order, image_url, headline, subtitle, cta_text, cta_link) VALUES
  (1, '', 'Precision Steel Tubing. Engineered to Perform.', 'Indiana Tube Corporation is your complete source for high-quality, induction-welded, low carbon steel tubing.', 'Request a Quote', '/contact'),
  (2, '', 'Trusted Across Five Major Industries', 'From automotive to energy, our tubing solutions deliver consistent quality and performance.', 'Explore Industries', '/industries'),
  (3, '', '45+ Years of Manufacturing Excellence', 'Decades of experience producing tubing from .156" to 1.75" diameter in standard and metric sizes.', 'View Products', '/products'),
  (4, '', 'Global Reach. Local Service.', 'Serving customers worldwide with responsive support and reliable delivery.', 'About Us', '/about'),
  (5, '', 'Your Partner in Precision Tubing', 'Custom solutions tailored to your exact specifications and performance requirements.', 'Contact Us', '/contact');
