

## Plan: Replace Stats Bar with StoryBrand Impact Statements

### What's Changing
Remove the 4-column vanity metrics bar ("45+ Years", ".156-1.75"", "5 Industries", "5 Continents") and replace it with 3 customer-focused impact statements using Donald Miller's StoryBrand framework.

### StoryBrand Thinking
In StoryBrand, the customer is the hero, not the company. The stats bar currently talks about ITC (how old they are, their size range, how many industries they serve). Nobody visiting this site cares about that -- they care about what ITC does **for them**. The replacement statements should address:

1. **The problem the customer faces** (unreliable tubing, missed deadlines, quality failures)
2. **How ITC guides them to success** (engineering partnership, not just selling tube)
3. **The outcome they experience** (confidence, reduced risk, simplified supply chain)

### Proposed 3 Impact Statements

| Headline | Supporting Line |
|----------|----------------|
| **Your Specs. Delivered Exactly.** | Tolerances twice as tight as industry standard -- so your production line never stops. |
| **One Call. Complete Tubing Solutions.** | From raw coil to finished assembly, we handle it all so you don't manage multiple vendors. |
| **Proven Reliable. Every Shipment.** | 45+ years of on-time, in-spec delivery to the world's most demanding industries. |

These flip the perspective: the customer's production line doesn't stop, the customer doesn't juggle vendors, the customer gets reliability they can count on.

### Technical Changes

**File: `src/pages/Index.tsx`**
- Replace the `stats` array (4 items with `value`/`label`) with a new `impactStatements` array (3 items with `headline`/`supporting`)
- Change the grid from `grid-cols-2 lg:grid-cols-4` to `grid-cols-1 md:grid-cols-3`
- Render each statement as a headline (bold, primary color) with a supporting line below (muted text)
- Keep the same section wrapper, `SectionReveal` animations, and staggered delays

