
## Resume Upload for General Interest

When no job listings are available, the Careers page will show a simple form allowing visitors to submit their resume and indicate what roles they're interested in. Admins will be able to view these submissions (with resume download links) in the existing Applications section of the admin dashboard.

### What You'll See

**On the /careers page (when no jobs are posted):**
- The "No Open Positions" message will remain, followed by a compact form below it
- The form collects: First Name, Last Name, Email, Phone, Roles/Areas of Interest (text area), and a Resume file upload (PDF, DOC, DOCX)
- A "Submit" button sends the data and shows a success confirmation

**In the Admin Dashboard (Applications tab):**
- General interest submissions will appear alongside regular job applications
- They'll be tagged as "General Interest" instead of a specific position
- A "Download Resume" link will appear in the expanded details when a resume file is attached

### Technical Details

**1. New storage bucket** -- `resumes`
- A private bucket for uploaded resume files
- RLS policy: anyone can upload (INSERT), only authenticated admins can read (SELECT)

**2. Database change** -- Add `resume_url` column to `job_applications`
- A nullable text column to store the storage path/URL of the uploaded resume
- No other table changes needed; general interest submissions use the existing `job_applications` table with `position_applied` set to "General Interest" and `job_listing_id` left null

**3. Update `src/pages/Careers.tsx`**
- In the "no jobs" empty state, add a resume submission form beneath the existing message
- Form fields: first name, last name, email, phone, roles of interest (textarea), resume file input
- On submit: upload the resume file to the `resumes` bucket, then insert a row into `job_applications` with the resume URL and "General Interest" as the position

**4. Update `src/pages/admin/ApplicationsViewer.tsx`**
- Add `resume_url` to the `JobApplication` interface
- In the expanded application detail view, show a "Download Resume" button/link when `resume_url` is present
- The button will generate a signed URL from the storage bucket for secure download
