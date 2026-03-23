

## Plan: Replace ITC Placeholder Logo with Uploaded SVG

### What Changes
Replace the circular "ITC" text placeholder in both the **Header** and **Footer** with the actual Indiana Tube Corporation logo SVG.

### Steps

1. **Copy the SVG to the project**
   - Copy `user-uploads://IndianaTube_transparent.svg` to `src/assets/indiana-tube-logo.svg`

2. **Update Header (`src/components/Header.tsx`)**
   - Import the logo SVG as an image asset
   - Replace the circular div with "ITC" text and the adjacent "Indiana Tube / A Steel Partners Company" text block with a single `<img>` tag using the logo
   - Size it appropriately for the navbar (approximately h-8 on mobile, h-10 on desktop)

3. **Update Footer (`src/components/Footer.tsx`)**
   - Same approach: import the logo and replace the circular placeholder + text block with the logo image
   - Size slightly larger for the footer brand section

### Technical Notes
- The SVG already contains both the company name and "A Steel Partners Company" tagline, so the separate text elements currently in the header/footer can be removed
- The logo has a transparent background and uses the brand orange (#f14b1c) and dark gray (#4f4c4c) colors, which align with the existing design system
- Using `import logo from "@/assets/indiana-tube-logo.svg"` ensures proper Vite bundling

