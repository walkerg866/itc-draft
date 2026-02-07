
-- ============================================
-- 1. Weather Alerts table
-- ============================================
CREATE TABLE public.weather_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  duration_hours INTEGER,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.weather_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active alerts"
  ON public.weather_alerts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create alerts"
  ON public.weather_alerts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update alerts"
  ON public.weather_alerts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete alerts"
  ON public.weather_alerts FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 2. Job Listings table
-- ============================================
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT NOT NULL DEFAULT 'Evansville, IN',
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  shift TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active job listings"
  ON public.job_listings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can read all job listings"
  ON public.job_listings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create job listings"
  ON public.job_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update job listings"
  ON public.job_listings FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete job listings"
  ON public.job_listings FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 3. Job Applications table
-- ============================================
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_listing_id UUID REFERENCES public.job_listings(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  position_applied TEXT NOT NULL,
  available_start_date DATE,
  desired_pay TEXT,
  employment_history JSONB DEFAULT '[]'::jsonb,
  education TEXT,
  skills TEXT,
  applicant_references JSONB DEFAULT '[]'::jsonb,
  how_heard TEXT,
  legally_authorized BOOLEAN,
  felony_history BOOLEAN DEFAULT false,
  felony_explanation TEXT,
  applicant_signature TEXT,
  signature_date DATE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit job applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read all applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================
-- 4. Updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_job_listings_updated_at
  BEFORE UPDATE ON public.job_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for weather alerts so banner updates live
ALTER PUBLICATION supabase_realtime ADD TABLE public.weather_alerts;
