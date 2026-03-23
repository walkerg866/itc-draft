

## Plan: Admin Dashboard Home, Quote Requests Viewer, and Email Setup Button

Three distinct additions to the admin panel:

### 1. Admin Dashboard Home Page

Create a new `AdminHome.tsx` page that becomes the default landing page at `/admin/dashboard`. It shows three summary stat cards:
- **Total Admin Users** — count from the `manage-admin-users` edge function
- **Job Applications (last 30 days)** — count from `job_applications` where `submitted_at >= 30 days ago`
- **Quote Requests (last 30 days)** — count from `quote_requests` where `submitted_at >= 30 days ago`

Each card uses the existing Card component with an icon, count, and label. The current Weather Alerts page moves to its own nav item (it already has one), and the `/admin/dashboard` route renders AdminHome instead of WeatherAlertManager.

**Sidebar update**: Add a "Dashboard" nav item at the top pointing to `/admin/dashboard`. Move Weather Alerts to `/admin/dashboard/weather`.

### 2. Quote Requests Viewer

Create `src/pages/admin/QuoteRequestsViewer.tsx` modeled after `ApplicationsViewer.tsx` with:
- List of all quote requests from `quote_requests` table, ordered by `submitted_at` desc
- Expandable rows showing full details (name, company, email, phone, industry, diameters, annual volume, message)
- CSV export button
- PDF download per request (using jsPDF, same pattern as applications)
- Add "Quote Requests" nav item and route in `App.tsx`

### 3. Email Setup Button on Notification Settings

Add a section below the notification preferences table in `NotificationSettings.tsx` with:
- A card/section titled "Email Sending Setup"
- Brief description explaining this configures the email domain for sending notification emails
- A "Set Up Email Domain" button that opens the email domain setup dialog via `<lov-open-email-setup>`

Since this is an admin UI button (not a chat action), the implementation will instead link to or display instructions directing the super admin to configure the email domain through Cloud settings. The button can trigger a toast or info dialog explaining how to set up email sending.

**Wait** — I need to check the email domain status first to determine what to show.

Actually, since this is a plan, I'll structure it so: on the Notification Settings page, below the recipients table, add a "Email Delivery" info card. It will note that email notifications require an email domain to be configured, and provide guidance. During implementation I'll check domain status and adapt.

### Technical Summary

| Change | Details |
|--------|---------|
| New file | `src/pages/admin/AdminHome.tsx` — dashboard with stat cards |
| New file | `src/pages/admin/QuoteRequestsViewer.tsx` — quote request viewer with expand/CSV/PDF |
| Modified | `src/pages/AdminDashboard.tsx` — add Dashboard + Quote Requests nav items, move Weather Alerts path |
| Modified | `src/App.tsx` — add routes for AdminHome, QuoteRequestsViewer, move WeatherAlertManager to `/admin/dashboard/weather` |
| Modified | `src/pages/admin/NotificationSettings.tsx` — add email setup info section below recipients table |

### Sidebar Navigation (new order)

```text
Dashboard          /admin/dashboard
Weather Alerts     /admin/dashboard/weather
Job Listings       /admin/dashboard/jobs
Applications       /admin/dashboard/applications
Quote Requests     /admin/dashboard/quotes
Downloads          /admin/dashboard/downloads
Images             /admin/dashboard/images
Image Repository   /admin/dashboard/image-repository
Hero Slides        /admin/dashboard/hero-slides
Videos             /admin/dashboard/videos
Users              /admin/dashboard/users
Notifications      /admin/dashboard/notifications
```

