
-- Remove old webhook secret from vault and create a new one with DB-generated randomness
-- The secret value is generated at runtime by the database, NOT hardcoded in this file
DO $$
DECLARE
  _new_secret text;
BEGIN
  -- Generate a random secret
  _new_secret := encode(gen_random_bytes(32), 'hex');
  
  -- Remove any existing entries
  DELETE FROM vault.decrypted_secrets WHERE name = 'notification_webhook_secret';
  
  -- Create new secret in vault
  PERFORM vault.create_secret(_new_secret, 'notification_webhook_secret', 'Webhook secret for send-notification edge function');
END $$;
