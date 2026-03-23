
-- Create function to call send-notification edge function via pg_net
CREATE OR REPLACE FUNCTION public.notify_on_job_application()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _secret text;
  _supabase_url text;
BEGIN
  SELECT decrypted_secret INTO _secret FROM vault.decrypted_secrets WHERE name = 'notification_webhook_secret' LIMIT 1;
  SELECT decrypted_secret INTO _supabase_url FROM vault.decrypted_secrets WHERE name = 'supabase_url' LIMIT 1;
  
  IF _secret IS NULL OR _supabase_url IS NULL THEN
    RAISE LOG 'Missing notification_webhook_secret or supabase_url in vault';
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := _supabase_url || '/functions/v1/send-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', _secret
    ),
    body := jsonb_build_object(
      'type', 'job_application',
      'record', jsonb_build_object(
        'id', NEW.id,
        'first_name', NEW.first_name,
        'last_name', NEW.last_name,
        'middle_name', NEW.middle_name,
        'position_applied', NEW.position_applied,
        'email', NEW.email,
        'phone', NEW.phone,
        'address', NEW.address,
        'city', NEW.city,
        'state', NEW.state,
        'zip', NEW.zip,
        'desired_pay', NEW.desired_pay,
        'available_start_date', NEW.available_start_date,
        'education', NEW.education,
        'skills', NEW.skills,
        'how_heard', NEW.how_heard
      )
    )
  );

  RETURN NEW;
END;
$$;

-- Create function for quote request notifications
CREATE OR REPLACE FUNCTION public.notify_on_quote_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _secret text;
  _supabase_url text;
BEGIN
  SELECT decrypted_secret INTO _secret FROM vault.decrypted_secrets WHERE name = 'notification_webhook_secret' LIMIT 1;
  SELECT decrypted_secret INTO _supabase_url FROM vault.decrypted_secrets WHERE name = 'supabase_url' LIMIT 1;

  IF _secret IS NULL OR _supabase_url IS NULL THEN
    RAISE LOG 'Missing notification_webhook_secret or supabase_url in vault';
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := _supabase_url || '/functions/v1/send-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', _secret
    ),
    body := jsonb_build_object(
      'type', 'quote_request',
      'record', jsonb_build_object(
        'id', NEW.id,
        'first_name', NEW.first_name,
        'last_name', NEW.last_name,
        'company', NEW.company,
        'email', NEW.email,
        'phone', NEW.phone,
        'industry', NEW.industry,
        'diameters', NEW.diameters,
        'annual_volume', NEW.annual_volume,
        'message', NEW.message
      )
    )
  );

  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_job_application_insert
  AFTER INSERT ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_job_application();

CREATE TRIGGER on_quote_request_insert
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_quote_request();
