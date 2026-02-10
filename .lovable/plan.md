

# Add Google Translate Language Switcher

## Overview

Add a site-wide language translation dropdown (matching the WordPress site's capability) using the free Google Translate Website Translator widget. This provides automatic full-page translation into multiple languages with zero API cost and no backend changes.

## How It Works

Google provides a free embeddable website translator that:
- Injects a language selector dropdown onto your page
- Translates all visible text client-side using Google Translate
- Remembers the user's language preference via cookie
- Supports 100+ languages (we will configure the same 6 the WordPress site uses)

## Implementation

### 1. New Component: `src/components/LanguageSwitcher.tsx`

A small React component that:
- Loads the Google Translate script (`//translate.google.com/translate_a/element.js`) via a `useEffect`
- Renders a hidden `div#google_translate_element` that Google populates with its dropdown
- Wraps it in styled container that fits the site's dark header aesthetic
- Uses CSS overrides to hide the Google branding bar and style the dropdown to match the site's design tokens (dark background, steel-muted text, orange accents)

### 2. Modified: `src/components/Header.tsx`

- Import and render `LanguageSwitcher` in the desktop nav (to the left of the "Request a Quote" button)
- Add it to the mobile nav as well (above the "Request a Quote" button)

### 3. Modified: `index.html`

- Add a small `<style>` block to hide the Google Translate top banner frame (the iframe bar that Google injects at the top of the page) and remove the `body { top: ... }` override that Google applies. This keeps the site layout clean.

## Languages

Will configure the widget to offer the same languages as the current WordPress site. Typical industrial site translations include: English, Spanish, French, German, Chinese (Simplified), and Japanese.

## Design Details

- The dropdown will be compact and styled to blend with the dark header
- On mobile, it appears as a full-width selector in the hamburger menu
- CSS overrides ensure the Google banner bar does not shift or cover the sticky header

## No Backend Changes

- No database tables, edge functions, or API keys required
- This is a purely client-side solution, identical in approach to the WordPress GTranslate plugin

