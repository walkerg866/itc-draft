
# Restructure /products Page to Match /industries Format

## Overview
Replace the current bento grid + specs table layout on the Products page with the same alternating image-and-text section layout used on the Industries page. The product sections will mirror the content from indianatube.com/products/.

## Content Sections (from indianatube.com)
The page will have these sections, each displayed as an alternating image+text block (like Industries):

1. **Steel Types & Capabilities** -- "Indiana Tube uses the highest-quality low-carbon steel that meets our proprietary specification. Our steel tubing products are manufactured to tolerances which are more than twice as tight as the industry standards, making us the ideal choice for customers with the most exacting requirements for the most demanding applications."
   - Key features: Low Carbon Grades (CS, DS, DDS, EDDS, HSLA, XF, DP), HSLA Grades (50, 60, 70 & 80), A606 Type 4 Grade 70/80, Coatings (Copper, Nickel, Aluminized)

2. **CT Spooled Tube** -- Coiled tubing up to 1.75" diameter with premium A606 carbon steel to provide extended fatigue life for well applications.
   - Key features: Premium A606 steel, Extended fatigue life, Up to 1.75" diameter

3. **Precision & Random Cut Length Tubing** -- "Indiana Tube provides solutions for mill direct cut length, random cut lengths, and precision cut lengths."
   - Key features: Mill direct cut length, Random cut lengths, Precision cut lengths, Square cut & brush deburr, Gauge pin testing

4. **Coiled Tubing** -- "Indiana Tube manufactures the longest small diameter coiled tube in the industry utilizing our custom level wound coiling process. Our product quality, weld seam control, and on time delivery is unmatched in our industry."
   - Key features: Level wound coiling, Eddy current testing, Burst pressure testing, Copper flash & nickel coatings, Annealed & un-annealed

5. **Galfan & Other Enhancement Coatings** -- "Indiana Tube offers a variety of corrosion resistant and performance enhanced tube coatings. Our premier Galfan coated tubing is a proven cost-effective long-term corrosion resistance solution as compared to high-cost tubing manufactured with copper, stainless steel, or aluminum. Our Galfan coating is continuously tested beyond 4,000 hours."
   - Key features: Galfan coating, 4,000+ hours corrosion testing, Cost-effective alternative, Performance enhanced coatings

6. **Welded Stainless Steel Tubing** -- "Indiana Tube offers a wide range of small diameter Welded and Sync Drawn Stainless Steel tubing in Titanium, and Nickel Alloy Pressure Tubing for Oil & Gas, Automotive, Power Gen, Pharmaceutical, Medical, Food & Beverage, Commercial Refrigeration, and Chemical Processing."
   - Key features: Welded & drawn, Titanium & Nickel alloy, X-ray testing, Custom packaging, Cost-effective alternative to seamless

7. **Stocking Program** -- "We understand the urgent nature of JIT business change. Indiana Tube offers stocking programs specifically designed to help high volume customers respond quickly to day-to-day OEM demand change."
   - Key features: JIT inventory, High volume programs, Quick response to demand changes

## Layout Structure
- **Hero**: Keep the current hero with the product-image from the repository (unchanged)
- **Product sections**: Adopt the same alternating left/right image+text layout from Industries, with each product having an image placeholder, title, description paragraph, "Key Features" bullet list, and a "Request a Quote" link
- **CTA**: Keep the existing bottom CTA section (unchanged)
- **Remove**: The 2x2 bento grid and the specs table sections

## Technical Details

### File Changes
**`src/pages/Products.tsx`** -- Full rewrite of the data and layout sections:
- Replace `productCategories` and `specs` arrays with a `productData` array containing all 7 products, each with `title`, `imageKey`, `description`, and `features` fields
- Replace the bento grid and specs table sections with a single section using `.map()` over the product data, using the same alternating grid pattern as Industries
- Each product section: 2-column grid with image on one side, text on the other, alternating per row
- Images will use `useSiteImages` with `getImageUrl` and fallback to a generic steel tubing placeholder image
- Keep the hero and bottom CTA sections as-is
- Remove the `Check` icon import (no longer needed)
- The image keys will be: `product-steel-types`, `product-ct-spooled`, `product-cut-length`, `product-coiled`, `product-galfan`, `product-stainless`, `product-stocking` -- these can be managed through the admin image repository later
