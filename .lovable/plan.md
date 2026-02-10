

# Employee News Page with Announcements, Timeline, and Did-You-Know

## Overview

Create a new public "Employee News" page that repurposes the existing weather alert announcement system. The page will display active announcements at the top, a company history timeline in the middle, and a "Did You Know?" achievements section at the bottom. Navigation will be updated with a dropdown under "About" in the header and a new link in the footer.

---

## Page Structure

The new page at `/employee-news` will have three sections:

1. **Announcements Block** (top) -- Reads from the existing `weather_alerts` table, showing active/non-expired alerts in a styled banner block (not the site-wide dismissible bar). All current admin capabilities (post, set duration, deactivate) remain unchanged.

2. **Company History Timeline** -- A vertical timeline with hardcoded milestones (founding, expansions, certifications, etc.). Uses the site's existing bento/industrial design language with large decorative year numbers.

3. **Did You Know? Section** -- A grid of company achievement cards. Initially hardcoded; can be made database-driven later.

---

## Navigation Changes

### Header -- About Dropdown
- Convert the "About" link into a dropdown menu with two items:
  - "About Us" linking to `/about`
  - "Employee News" linking to `/employee-news`
- Use Radix `DropdownMenu` (already installed) with a solid background and high z-index
- Desktop: hover/click dropdown; Mobile: both items listed inline in the mobile menu

### Footer -- Quick Links
- Add "Employee News" to the Quick Links list in the footer

---

## Technical Details

### New Files
- `src/pages/EmployeeNews.tsx` -- The full page component with three sections

### Modified Files
- `src/components/Header.tsx` -- Replace the static "About" nav link with a dropdown containing "About Us" and "Employee News"
- `src/components/Footer.tsx` -- Add "Employee News" link to the Quick Links array
- `src/App.tsx` -- Add route for `/employee-news` under the public routes

### Announcement Section Implementation
- Reuses the same Supabase query pattern from `WeatherAlert.tsx`: fetch active alerts from `weather_alerts` table, filter by `is_active` and expiration
- Displayed as styled card blocks (not the thin site-wide banner), using the site's orange/steel design tokens
- Includes realtime subscription so new admin posts appear instantly
- If no active announcements, shows a friendly "No announcements at this time" message

### No Database Changes Required
- The `weather_alerts` table and admin manager already handle everything needed
- The site-wide `WeatherAlert` banner component remains completely untouched and continues to function independently

### Timeline Data (Hardcoded)
Example milestones to include:
- 1978: Indiana Tube Corporation founded in Evansville, IN
- 1985: Expanded manufacturing capacity
- 1995: ISO certification achieved
- 2005: Entered Oil and Gas market
- 2015: Joined Steel Partners family
- 2020: Facility modernization completed

### Did You Know Data (Hardcoded)
Example achievements:
- "ITC tubing is used in vehicles driven by millions of people every day"
- "Our facility spans over 200,000 square feet"
- "We serve customers across 5 major industries worldwide"

### Design Approach
- Hero section with the facility aerial image (via `useSiteImages`) matching the About page style
- Timeline uses alternating left/right layout on desktop, single column on mobile, with large decorative year numbers per the project's style preference
- Did You Know cards use the 2x2 bento grid pattern with large decorative numbering, consistent with the About page values grid
- All sections wrapped in `SectionReveal` for scroll animations

