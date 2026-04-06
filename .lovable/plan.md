

## Plan: Add Certification Badges to Footer

**What**: Copy three badge images from the BTC.COM project and display them in a row in the footer, between the main content grid and the bottom bar.

### Steps

1. **Copy images** from BTC.COM project into `public/images/`:
   - `badge-1.png` (UL Registered Firm)
   - `badge-2.png` (Made in USA)
   - `badge-3-gold-award.png` (Gold Award)

2. **Update `src/components/Footer.tsx`**:
   - Add a certification badges row between the main grid (line 125) and the bottom bar (line 128)
   - Display the three badges horizontally centered with appropriate spacing
   - Use a subtle top border or padding to visually separate from the content above
   - Badges will be responsive — slightly smaller on mobile

### Technical Details

**File: `src/components/Footer.tsx`**
- Insert a new `div` after the closing `</div>` of the main container (line 125) and before the bottom bar
- Three `<img>` tags referencing `/images/badge-1.png`, `/images/badge-2.png`, `/images/badge-3-gold-award.png`
- Flex row, centered, with `gap-8` spacing and `h-16 md:h-20` sizing
- Light separator styling to keep it visually clean

