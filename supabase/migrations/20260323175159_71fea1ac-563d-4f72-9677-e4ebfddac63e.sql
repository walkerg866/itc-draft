
DROP POLICY "Authenticated users can read quote requests" ON public.quote_requests;

CREATE POLICY "Admins can read quote requests" ON public.quote_requests
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));
