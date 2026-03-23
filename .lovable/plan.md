

## Plan: Single Legal Page with Privacy Policy & Terms of Service

### What we'll build
A new `/legal` page containing both the Privacy Policy and Terms of Service, organized with tabs so visitors can switch between them. Footer links will be updated to point to this page with hash anchors (`/legal#privacy` and `/legal#terms`) so each link opens the correct tab.

### Steps

1. **Create `src/pages/Legal.tsx`**
   - Two-tab layout using the existing shadcn Tabs component
   - Tab 1: Privacy Policy (placeholder content tailored to Indiana Tube Corporation)
   - Tab 2: Terms of Service (placeholder content)
   - Read the URL hash on mount to auto-select the correct tab
   - Wrapped in SectionReveal for consistency with other pages

2. **Update `src/components/Footer.tsx`**
   - Change "Privacy Policy" link from `/contact` to `/legal#privacy`
   - Change "Terms of Service" link from `/contact` to `/legal#terms`

3. **Update `src/App.tsx`**
   - Add `/legal` route to the public routes block

### Technical notes
- The placeholder policy text will include standard sections (data collection, cookies, liability, etc.) clearly marked as drafts for legal review.
- Hash-based tab selection will use `useLocation().hash` from react-router-dom.

