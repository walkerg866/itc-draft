

# Hero Subtitle Fix + Video Section Restyle

## Changes

### 1. Hero Slider Subtitle Color (white instead of grey)

In `src/components/HeroSlider.tsx`, the subtitle text uses `text-steel-muted` (a grey tone) which is unreadable against dark backgrounds. This will be changed to `text-white` (with slight transparency for softness, e.g. `text-white/90`) in both the dynamic slider subtitle (line 116) and the static fallback subtitle (line 63).

### 2. Remove "ITC in Action" Label Above Video

In `src/pages/Index.tsx`, the `<div className="text-center mb-10">` block (lines 50-52) containing "See ITC in Action" will be removed entirely.

### 3. Reduce Video Section Padding

The video section currently has `py-20 lg:py-28` (lines 47). This will be reduced to `py-6` so the video sits much closer to the stats bar above it.

### 4. Add Complementary Background to Video Section

The video section will get a steel gradient background (`bg-steel-gradient`) to match the site's industrial aesthetic. The video container will also get a subtle border treatment to frame it nicely against the dark background.

---

## Technical Details

### Files Modified

- **`src/components/HeroSlider.tsx`** -- Change `text-steel-muted` to `text-white/90` on lines 63 and 116
- **`src/pages/Index.tsx`** -- Remove the "See ITC in Action" heading, reduce section padding from `py-20 lg:py-28` to `py-6`, and add `bg-steel-gradient` background to the video section

