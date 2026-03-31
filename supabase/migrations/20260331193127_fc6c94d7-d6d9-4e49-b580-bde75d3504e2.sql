-- Re-grant EXECUTE on has_role to authenticated - needed for RLS policies
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Revert user_roles SELECT policy to use has_role (which bypasses RLS via SECURITY DEFINER)
DROP POLICY "Users can read own role" ON public.user_roles;

CREATE POLICY "Users can read own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR has_role(auth.uid(), 'super_admin'::app_role)
);