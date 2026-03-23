
-- Update the vault secret with a known value so it matches the edge function secret
DELETE FROM vault.secrets WHERE name = 'notification_webhook_secret';
SELECT vault.create_secret('6410794bb4d6d81275ebe4b377e6f5b67787a9d35730f0a2a9552b6dc29c8ef6', 'notification_webhook_secret');
