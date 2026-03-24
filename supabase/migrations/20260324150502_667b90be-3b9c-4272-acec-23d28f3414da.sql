
-- Drop the overly permissive public SELECT policy
DROP POLICY "Anyone can read active alerts" ON public.weather_alerts;

-- Create a restricted public SELECT policy that only exposes active alerts
CREATE POLICY "Public can read active alerts only"
ON public.weather_alerts
FOR SELECT
TO public
USING (is_active = true);

-- Admins can still read all alerts (active and inactive)
CREATE POLICY "Admins can read all alerts"
ON public.weather_alerts
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));
