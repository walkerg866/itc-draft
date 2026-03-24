

## Plan: Add Cookie Consent from AltLine Project

Copy over the cookie consent banner and preferences dialog from the [AltLine Main site](/projects/4469fc67-929c-458a-b2bd-1afb70e49521) project, with minor adaptations for this project's branding.

### Steps

1. **Create `src/hooks/useCookieConsent.ts`**
   - Copy the hook as-is, changing the localStorage key from `alt-line-cookie-consent` to `itc-cookie-consent`

2. **Create `src/components/CookieConsent.tsx`**
   - Copy the component, adapting two things:
     - Change the `variant="brand"` button props to `variant="default"` (this project doesn't have a `brand` variant)
     - Update the privacy policy link from `/privacy-policy` to `/legal#privacy`

3. **Update `src/App.tsx`**
   - Add `<CookieConsent />` inside the `BrowserRouter`, after the `Routes` block so it renders on all pages

4. **Update `src/components/Footer.tsx`**
   - Add a "Cookie Settings" link using the exported `CookieSettingsButton` component alongside the existing Privacy Policy and Terms links

### Technical notes
- The hook stores consent state in localStorage with a versioned schema
- The banner auto-hides once consent is given; `CookieSettingsButton` revokes consent to re-show it
- No database changes needed — this is entirely client-side

