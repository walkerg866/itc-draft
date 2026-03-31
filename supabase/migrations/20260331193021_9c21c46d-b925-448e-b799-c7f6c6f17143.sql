-- Fix user_roles SELECT policy: replace has_role() call with direct subquery
-- since EXECUTE on has_role was revoked from authenticated users
DROP POLICY "Users can read own role" ON public.user_roles;

CREATE POLICY "Users can read own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'::app_role
  )
);