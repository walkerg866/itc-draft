

## Plan: Add Published Articles Section to Home Page

**What**: Add a new "Published Articles" section to the home page featuring two external article links from The Fabricator.

**Where**: Between the "About ITC" section and the CTA section (after line 111, before line 113).

**Design**: A light background section with a heading like "Industry Insights" or "Published Articles", containing two article cards side-by-side. Each card will show the article title, a brief label (e.g., "The Fabricator — Tube & Pipe Journal"), and an external link icon. Cards will open in a new tab.

### Changes

**File: `src/pages/Index.tsx`**
- Import `ExternalLink` from lucide-react
- Add a new section between the About preview and CTA with:
  - Section label: "Industry Insights"
  - Heading: "Featured in The Fabricator"
  - Two cards in a responsive grid (1 col mobile, 2 col desktop)
  - Each card links externally (`target="_blank"`) with:
    - Part 1: "Trends in Hydraulic Tube Production, Part 1"
    - Part 2: "Trends in Hydraulic Tube Production, Part 2"
  - Styled consistently with the site's existing card/section patterns (border, rounded, hover state)

