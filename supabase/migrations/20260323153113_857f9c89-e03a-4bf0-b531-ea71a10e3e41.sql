
-- Add email column so we can store non-admin recipients
ALTER TABLE public.notification_preferences ADD COLUMN email text;

-- Remove the unique constraint on user_id since non-admin recipients share a placeholder
ALTER TABLE public.notification_preferences DROP CONSTRAINT IF EXISTS notification_preferences_user_id_key;

-- Remove the foreign key to auth.users since we now allow non-auth recipients
ALTER TABLE public.notification_preferences DROP CONSTRAINT IF EXISTS notification_preferences_user_id_fkey;
