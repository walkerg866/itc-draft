
CREATE TABLE public.executive_bios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  linkedin_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.executive_bios ENABLE ROW LEVEL SECURITY;

-- Public can view active bios
CREATE POLICY "Anyone can view active bios"
ON public.executive_bios FOR SELECT TO public
USING (is_active = true);

-- Admins can view all bios
CREATE POLICY "Admins can view all bios"
ON public.executive_bios FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Admins can insert bios
CREATE POLICY "Admins can insert bios"
ON public.executive_bios FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Admins can update bios
CREATE POLICY "Admins can update bios"
ON public.executive_bios FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Admins can delete bios
CREATE POLICY "Admins can delete bios"
ON public.executive_bios FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Auto-update updated_at
CREATE TRIGGER update_executive_bios_updated_at
  BEFORE UPDATE ON public.executive_bios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
