

## Move Quote Form to Dedicated `/quote` Page

### What changes

**1. New page: `src/pages/Quote.tsx`**
- Thin hero banner at the top: dark steel-gradient background, `py-12 lg:py-16`, with heading "Request a Quote" and short subhead.
- Below the hero: full-width form section (`container` + `max-w-6xl`) reorganized in **landscape mode** — fields laid out in a 3-column grid on desktop:
  - Row 1: First Name | Last Name | Company
  - Row 2: Email | Phone | Industry
  - Row 3: Diameter(s) | Annual Volume | (empty)
  - Row 4: How Can We Help? (full width, textarea)
  - Submit button (full width or right-aligned)
- Reuses the same Supabase `quote_requests` insert logic currently in `Contact.tsx`.
- Same success state ("Thank You!" panel) after submit.
- No other content on the page.

**2. Routing: `src/App.tsx`**
- Add `import Quote from "./pages/Quote"`
- Add `<Route path="/quote" element={<Quote />} />` inside the public routes block.

**3. Update `src/pages/Contact.tsx`**
- Remove the entire right-hand "Contact Form" column (lines ~187–362) and the existing small map embed (lines ~171–183) under the contact info.
- Change the layout grid from `lg:grid-cols-2` to keep two columns: **left = "Get In Touch" info block** (address/phone/email/hours), **right = portrait Google Map**.
- Map embed on the right: portrait orientation using `aspect-[3/4]` (or `h-[600px]`) inside a rounded, bordered container, full height of the column, same Google Maps `q=Indiana+Tube+Corporation...` source.

**4. Repoint "Request a Quote" links to `/quote`**
Update these existing links from `/contact` → `/quote` (only the ones that are explicitly "Request a Quote" CTAs, not the generic "Contact" nav links):
- `src/components/Header.tsx` line 93 (header CTA button) and line 198 (mobile CTA button)
- `src/pages/Industries.tsx` line 129 ("Request a Quote" link inside industry cards)
- `src/pages/Downloads.tsx` line 16 (`requestUrl` for declaration documentation request)
- `src/pages/Products.tsx` line 185 ("Request a Quote" link inside product cards)
- `src/pages/Index.tsx` line 180 (homepage CTA — change to `/quote` since it's the primary quote CTA)

Leave as `/contact` (these are general contact links, not quote CTAs):
- `src/components/Footer.tsx` line 32 (Footer "Contact" nav link)
- `src/components/Header.tsx` line 20 (Header "Contact" nav item)
- `src/pages/About.tsx` line 292 (general "Contact us" link)
- `src/pages/Industries.tsx` line 147 ("Contact Us" CTA at bottom)
- `src/pages/admin/HeroSlidesManager.tsx` line 189 (just a placeholder string)

### Visual layout (Contact page after change)

```text
┌─────────────────────────────────────────────────────┐
│  Hero: "Let's Talk Tubing"                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Get In Touch          │   ┌───────────────┐        │
│   📍 Address           │   │               │        │
│   📞 Phone             │   │   Google Map  │        │
│   ✉️  Email            │   │   (portrait,  │        │
│   🕒 Hours             │   │    3:4 ratio) │        │
│                        │   │               │        │
│                        │   └───────────────┘        │
└─────────────────────────────────────────────────────┘
```

### Visual layout (new `/quote` page)

```text
┌─────────────────────────────────────────────────────┐
│  Hero (thin): "Request a Quote"                     │
├─────────────────────────────────────────────────────┤
│   [First]      [Last]       [Company]               │
│   [Email]      [Phone]      [Industry ▾]            │
│   [Diameters]  [Volume]                             │
│   [How can we help? — full-width textarea]          │
│                            [ Submit Inquiry ]       │
└─────────────────────────────────────────────────────┘
```

