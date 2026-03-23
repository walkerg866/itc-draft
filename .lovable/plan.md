

## Plan: Increase Nav Font Size + Unify Homepage Color Flow

### Problem
1. Header/footer nav text needs one more size bump
2. The video section's dark `bg-steel-gradient` background creates an ugly dark band between two light sections, making the page feel choppy and amateur
3. The homepage has too many abrupt light-to-dark-to-light transitions: Hero (dark) -> Stats (white) -> Video (dark) -> Value Props (light gray) -> About (white) -> CTA (dark) -> Footer (light)

### Design Approach
Adopt a predominantly light, clean page flow with dark reserved only for the hero and the final CTA. This creates a professional rhythm: one dark hero at top, clean light content in the middle, one dark CTA at the bottom.

```text
Current flow:               Proposed flow:
┌─────────────────┐         ┌─────────────────┐
│  HERO (dark)    │         │  HERO (dark)    │
├─────────────────┤         ├─────────────────┤
│  Stats (white)  │         │  Stats (white)  │
├─────────────────┤         │                 │
│  Video (DARK)   │ ← ugly  │  Video (white)  │ ← seamless
├─────────────────┤         │                 │
│  Value Props    │         ├─────────────────┤
│  (light gray)   │         │  Value Props    │
├─────────────────┤         │  (light gray)   │
│  About (white)  │         ├─────────────────┤
├─────────────────┤         │  About (white)  │
│  CTA (DARK)     │         ├─────────────────┤
├─────────────────┤         │  CTA (dark)     │
│  Footer (light) │         ├─────────────────┤
└─────────────────┘         │  Footer (light) │
                            └─────────────────┘
```

### Changes

**1. Header (`Header.tsx`)**
- Increase nav link font from `text-base` to `text-lg`
- Increase "Request a Quote" button text to `text-lg`

**2. Footer (`Footer.tsx`)**
- Increase footer link and body text from `text-base` to `text-lg`
- Increase section headers from `text-base` to `text-lg`
- Increase bottom bar text from `text-sm` to `text-base`

**3. Video Section (`Index.tsx`)**
- Remove `bg-steel-gradient` dark background
- Use `bg-background` (the default light page background) instead
- Remove `border-white/10` on the video container (no longer needed on light bg)
- Replace with a subtle `shadow-industrial` and standard `border-border` for a clean, embedded look
- Increase vertical padding slightly (`py-12`) so the video breathes without needing a color-block to define the section

**4. Hero bottom gradient (`HeroSlider.tsx`)**
- Change the bottom gradient from `from-secondary` (dark slate that bleeds into stats) to `from-background` so it fades cleanly into the white stats bar below

**5. CTA Section (`Index.tsx`)**
- Keep dark `bg-steel-gradient` -- this is the one intentional dark block before the footer and works as a strong call-to-action anchor
- Remove `shadow-orange-glow` from the video section (reserve orange glow for CTA only, making it more impactful)

