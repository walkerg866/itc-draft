
DROP POLICY "Authenticated users can read notification preferences" ON public.notification_preferences;

CREATE POLICY "Users can read own notification preferences" ON public.notification_preferences
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'super_admin'::app_role));
