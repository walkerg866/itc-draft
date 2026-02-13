
-- 1. Create private resumes bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- 2. Anyone can upload resumes
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- 3. Authenticated users can read resumes
CREATE POLICY "Authenticated users can read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- 4. Add resume_url column to job_applications
ALTER TABLE public.job_applications ADD COLUMN resume_url text;
