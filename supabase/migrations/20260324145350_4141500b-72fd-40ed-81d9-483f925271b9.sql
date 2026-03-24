
-- Create a SECURITY DEFINER function to read the webhook secret from vault
-- Only callable by service role (edge functions), not by regular users
CREATE OR REPLACE FUNCTION public.get_webhook_secret()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT decrypted_secret FROM vault.decrypted_secrets
  WHERE name = 'notification_webhook_secret'
  LIMIT 1
$$;

-- Revoke access from all public roles - only service_role can call this
REVOKE EXECUTE ON FUNCTION public.get_webhook_secret() FROM public;
REVOKE EXECUTE ON FUNCTION public.get_webhook_secret() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_webhook_secret() FROM authenticated;
