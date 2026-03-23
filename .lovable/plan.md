

## Plan: Quote Request Storage + Admin Notification Preferences + Email Alerts

This is a multi-part feature with four main pieces:

### 1. Save Quote Requests to Database

Create a new `quote_requests` table to store form submissions from the Contact page. Wire the existing form to insert data instead of showing an `alert()`.

**Table: `quote_requests`**
- id, first_name, last_name, company, email, phone, industry, diameters, annual_volume, message, submitted_at
- RLS: public INSERT, authenticated SELECT

### 2. Notification Preferences Table + Admin UI

Create a `notification_preferences` table that maps admin users to notification types they want to receive.

**Table: `notification_preferences`**
- id, user_id (references auth.users), notify_job_applications (boolean, default false), notify_quote_requests (boolean, default false), created_at
- RLS: authenticated SELECT, super_admin INSERT/UPDATE/DELETE

**Admin UI**: New "Notifications" page in admin sidebar (super_admin only). Shows a table of all admin users with toggle switches for "Job Applications" and "Quote Requests". Super admin can toggle any user on/off.

### 3. Edge Function: Generate & Store PDF, Send Notification Email

Create a `send-notification` edge function that:
- Accepts a payload with type (`job_application` or `quote_request`) and the record data
- Generates a PDF of the submission using a simple text-based layout
- Uploads the PDF to a new `notification-pdfs` storage bucket (private, with signed URL access)
- Looks up `notification_preferences` to find which users should be notified
- Sends an email to each opted-in user with a brief summary and a signed download URL for the PDF (valid for 7 days)

The download link lets recipients get the PDF directly without logging into the admin panel.

### 4. Wire Up Triggers

- **Contact page**: After inserting into `quote_requests`, invoke the `send-notification` edge function with type `quote_request`
- **Apply Job page / General Interest form**: After inserting into `job_applications`, invoke `send-notification` with type `job_application`

### Email Domain Requirement

This project does not have an email domain configured yet. Before emails can actually send, you'll need to set up a sender domain through Cloud settings. I'll build all the infrastructure so it's ready to go, and we'll set up the email domain as part of the process.

### Technical Summary

| Change | Details |
|--------|---------|
| New DB table | `quote_requests` |
| New DB table | `notification_preferences` |
| New storage bucket | `notification-pdfs` (private) |
| New edge function | `send-notification` |
| New admin page | Notification Settings (super_admin only) |
| Modified files | `Contact.tsx` (wire form), `ApplyJob.tsx` / `GeneralInterestForm.tsx` (trigger notification), `AdminDashboard.tsx` (add nav item), `App.tsx` (add route) |

### Admin Sidebar Addition

A new "Notifications" nav item will appear in the admin sidebar, visible to all but only editable by super admins.

