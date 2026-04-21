

## Migrate Careers to ADP

Redirect all Careers navigation to the external ADP careers portal: `https://myjobs.adp.com/indianatubecareers`. The link will open in a new tab.

### Changes

**Header (`src/components/Header.tsx`)**
- Replace the internal `<Link to="/careers">` with an external `<a href="https://myjobs.adp.com/indianatubecareers" target="_blank" rel="noopener noreferrer">` for both desktop and mobile nav.

**Footer (`src/components/Footer.tsx`)**
- Replace the Careers entry's `Link` with an external anchor opening in a new tab.

**Routing (`src/App.tsx`)**
- Remove `/careers` and `/careers/apply/:id` routes plus the `Careers` and `ApplyJob` imports, since the in-app pages are no longer reachable.

**Cleanup**
- Delete `src/pages/Careers.tsx` and `src/pages/ApplyJob.tsx` (no longer referenced).
- Leave the `job_listings`, `job_applications` tables and the admin Job Listings / Applications Viewer screens intact for historical data and in case the admin wants to reference past records. (Let me know if you'd rather hide those admin pages too.)

### Notes / open question
- The ADP portal handles the listings and the application flow, so the existing in-app job listings, application form, resume upload, and General Interest dialog will no longer be used on the public site.
- Confirm you want the link to **open in a new tab** (recommended for external sites). If you'd prefer same-tab navigation, I'll drop `target="_blank"`.

