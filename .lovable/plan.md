

# Add Diameter(s) and Annual Purchase Volume Fields to Request a Quote Form

## Overview

Add two new input fields to the contact form on the `/contact` page: "Diameter(s)" and "Annual Purchase Volume". These are informational fields to help the sales team better understand customer needs.

## Changes

### Modified File: `src/pages/Contact.tsx`

Add two new fields between the "Industry" dropdown and the "How Can We Help?" textarea:

1. **Diameter(s)** -- A text input field where customers can specify one or more tube diameters they need (e.g., "1/2 inch, 3/4 inch"). Optional field with a helpful placeholder.

2. **Annual Purchase Volume** -- A text input field for customers to indicate their expected yearly quantity (e.g., "50,000 feet" or "10,000 units"). Optional field with a descriptive placeholder.

Both fields will be placed in a side-by-side grid (matching the existing First/Last Name and Email/Phone layout) to keep the form compact.

### Technical Details

- Uses the same inline styling pattern as the existing form fields (no refactor to shadcn components)
- Both fields are optional (no `required` attribute)
- Placement: new row inserted after the Industry select and before the "How Can We Help?" textarea

