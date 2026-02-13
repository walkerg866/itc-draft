
-- Role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin');

-- Roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: any authenticated user can read roles
CREATE POLICY "Authenticated users can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated USING (true);

-- RLS: only super_admins can insert roles
CREATE POLICY "Super admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- RLS: only super_admins can update roles
CREATE POLICY "Super admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS: super_admins can delete any role; admins can only delete their own
CREATE POLICY "Role deletion policy"
  ON public.user_roles FOR DELETE
  TO authenticated USING (
    public.has_role(auth.uid(), 'super_admin')
    OR user_id = auth.uid()
  );
