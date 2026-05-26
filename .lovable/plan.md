## Plan: Enable Resend email delivery for notifications

**From address:** `notification@indianatube.com` (must be verified in Resend under `indianatube.com`)

### Steps

1. **Add `RESEND_API_KEY` secret** — secure entry box will appear after plan approval.
2. **Update `send-notification` edge function** to actually send emails via Resend:
   - Replace the current `console.log("Would send...")` stub with a `fetch` POST to `https://api.resend.com/emails`
   - Send one email per recipient (so addresses aren't exposed to each other)
   - From: `Indiana Tube Notifications <notification@indianatube.com>`
   - Reply-To: applicant/requester email (so admins can reply directly to the source)
   - Subject lines:
     - Job apps: `New Job Application: {First} {Last} — {Position}`
     - Quotes: `New Quote Request: {First} {Last}{ (Company)}`
   - Body: existing HTML template with PDF + CSV download buttons
   - Log per-recipient success/failure; return `{ notified, failed }` counts
3. **Remove the "Email Delivery Setup" instructional block** in `NotificationSettings.tsx` (no longer relevant — Resend is the provider).
4. **Test** by submitting a quote request through the live form and checking edge function logs + inbox.

### Out of scope
- No DNS changes (you handled domain verification in Resend).
- No template overhaul — current HTML email body stays.
- No queue/retry layer (Resend's own retries are sufficient for this volume).
