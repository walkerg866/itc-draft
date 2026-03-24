-- Rotate the notification_webhook_secret to invalidate the leaked value
DELETE FROM vault.secrets WHERE name = 'notification_webhook_secret';
SELECT vault.create_secret('7396c78a36421aa93e32a703c5316fec61ce981110e508a4abb2d913951f3b69', 'notification_webhook_secret');