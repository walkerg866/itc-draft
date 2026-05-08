# Plan: Bring back the General Interest button

## Status of existing code
Good news — the form component is still in the codebase: `src/components/GeneralInterestForm.tsx`. It's fully functional (writes to `job_applications` with `position_applied = "General Interest"`, supports optional resume upload to the `resumes` bucket, validates inputs). It's just not wired into any page anymore. We can reuse it as-is.

## Changes

### 1. `src/components/Header.tsx`
- Remove the **Contact** entry from the `navLinks` array (it stays in the footer).
- Add a new **"Submit Interest"** button placed immediately to the left of the existing **"Request a Quote"** button in the desktop nav, and likewise in the mobile menu.
- Style it as a secondary/outline button so "Request a Quote" remains the primary visual CTA.
- Clicking the button opens a shadcn `Dialog` containing `<GeneralInterestForm />`.
- Button + dialog logic added to both desktop and mobile nav blocks. On mobile, opening the dialog also closes the mobile menu.

### 2. No changes needed to
- `GeneralInterestForm.tsx` (already exists and works)
- The ADP Careers link (untouched, still opens `https://myjobs.adp.com/indianatubecareers` in a new tab)
- Footer (Contact link already lives there)
- Database / RLS (already supports public inserts into `job_applications`)
- Admin viewer (`ApplicationsViewer` already lists submissions, including general interest ones)

## UX notes
- Desktop nav order after change: `Home · Industries · Products · Downloads · About ▾ · Careers` then on the right: `Language · [Submit Interest] · [Request a Quote]`.
- Removing Contact frees the horizontal space needed for the second CTA at the `lg` breakpoint.
- Dialog uses `max-w-lg`, scrollable on small screens, with the form's existing success state shown in place after submit.
