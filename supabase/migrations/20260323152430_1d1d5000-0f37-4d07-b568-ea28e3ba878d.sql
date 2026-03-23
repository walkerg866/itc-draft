
-- Quote requests table
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  industry text,
  diameters text,
  annual_volume text,
  message text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests"
  ON public.quote_requests FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read quote requests"
  ON public.quote_requests FOR SELECT TO authenticated
  USING (true);

-- Notification preferences table
CREATE TABLE public.notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notify_job_applications boolean NOT NULL DEFAULT false,
  notify_quote_requests boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read notification preferences"
  ON public.notification_preferences FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Super admins can insert notification preferences"
  ON public.notification_preferences FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update notification preferences"
  ON public.notification_preferences FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete notification preferences"
  ON public.notification_preferences FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));
