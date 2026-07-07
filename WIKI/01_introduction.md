# 01. Project Introduction & Sovereign Philosophy

Welcome to the technical documentation wiki for **Stephen Ajulu's personal personal platform**. This platform represents more than just a portfolio or blog; it is designed and architected as a **Sovereign Digital Home**. This document introduces the overarching project, explains the underlying core philosophies (IndieWeb, POSSE, digital sovereignty), lists key features, and maps out the complete technical stack.

---

## 1. Digital Sovereignty & The IndieWeb Philosophy

In an era dominated by centralized, monolithic social media platforms and rent-seeking Software-as-a-Service (SaaS) providers, this project stands as a declaration of digital independence. It treats personal web space not as a rented profile, but as owned land.

### What is a Sovereign Digital Home?
A sovereign digital home is a self-hosted, independent space on the internet where you exercise absolute control over your content, your layout, your data, and your interactions. It is free from algorithmic manipulation, advertising networks, corporate tracking, and platform lock-in.

### Core Principles Adopted
This platform is built on the pillars of the **IndieWeb** movement:
1.  **Own Your Identity**: Your domain name (`stephenajulu.com`) is your primary online identifier, replacing rented handles on third-party networks.
2.  **Own Your Content**: Every blog post, note, project, and product description is stored locally in human-readable Markdown format. It can never be arbitrarily deleted or locked behind a paywall by an external entity.
3.  **POSSE (Publish on Own Site, Syndicate Elsewhere)**: The platform serves as the single source of truth. Content is published here first and then syndicated (shared) to other distribution networks (Twitter/X, LinkedIn, GitHub) with canonical links pointing back home.
4.  **Sovereign Commerce**: Financial transactions occur directly between the visitor and the creator using decentralized gateways (like Paystack inline popups), removing intermediate platform fees (e.g., Substack, Gumroad, or Patreon commissions).

---

## 2. Key Features List

The platform implements a variety of modern features optimized for performance, user experience, and digital independence:

### 1. Editorial Typography & Layout
*   **Aesthetic Balance**: A typographic scheme using *Fraunces* (a warm, organic, contemporary serif) for headers to convey voice and character, paired with *Outfit* (a clean, geometric sans-serif) for body copy to ensure maximum readability.
*   **Modular Grid Layouts**: Tailored styling structures that adapt from textual notes to image-heavy portfolio grids.

### 2. Client-Side Theme Synchronization
*   **Flicker-Free Theme Toggle**: A robust light/dark switcher. A script executed in the document head checks `localStorage` and injects theme classes *before* the body renders, preventing the jarring "white flash" on page load.
*   **Accent Color Variations**: A centralized map-based color configuration where accents (violet, green, blue, etc.) propagate across borders, gradients, and typography.

### 3. Client-Side Sovereign Search
*   **Fuzzy Matching**: Fast, serverless search powered by `Fuse.js` executing on the client.
*   **Frictionless Indexing**: Uses a custom-built Hugo JSON index generator (`index.json`) that strips HTML to expose clean text, tags, and titles directly to the search script.
*   **Dynamic Pagination**: Smooth JavaScript-driven pagination of results to manage UI density.

### 4. Gated Content & Memberships
*   **Netlify Identity Integration**: Simple client-side gating that allows exclusive content (e.g., premium downloads, courses, advanced writings) to be visible only to authenticated members.
*   **Soft Gate via Blur**: Renders the complete DOM but applies an elegant CSS blur (`filter: blur(8px)`) and pointer-block rules to non-members, inviting them to register/login via the Netlify Identity Widget modal.

### 5. Sovereign Store
*   **Direct-to-Consumer (D2C) Sales**: Integrated Paystack inline popups supporting M-Pesa, card payments, and mobile money.
*   **Secure Delivery**: Displays a secure download link upon a successful callback from Paystack.

### 6. IndieWeb Webmentions & Rich Notes
*   **Decentralized Comments**: Replaces corporate commenting systems (like Disqus or Facebook Comments) with IndieWeb Webmentions, polling dynamic responses, likes, and replies across both blog posts and micro-notes.
*   **Notes Attachments**: Micro-notes support rich native attachments (images, HTML5 video, and bookmark links) directly via markdown content or front-matter metadata parameters.

### 7. Custom Theme-Aware Shortcodes
*   **Notice Callouts**: A styled callout component (`notice`) supporting info, warning, and success color schemes.
*   **Bookmark Embeds**: Embeds clean link preview cards for bookmarking (`bookmark`).
*   **Video Embeds**: Inline responsive player for HTML5 MP4/WebM video clips (`video`).

### 8. Progressive Web App (PWA)
*   **Offline Capability**: Offline fallback page and service worker caching schemas for documents, scripts, styles, fonts, and images using Workbox.
*   **Fast Loading**: Service worker pre-caches assets to ensure instant loading for repeat visitors.

---

## 3. Tech Stack Specifications

The technology choices prioritized simplicity, longevity, build speed, and vendor independence:

```
+-------------------------------------------------------------------+
|                        Stephen Ajulu's Site                       |
+-------------------------------------------------------------------+
|   Static Site Engine: Hugo (v0.160.1-extended)                    |
|   Styling Pipeline:   Native SASS (Hugo Pipes)                    |
|   Behavioral Layer:   Vanilla ES16 JavaScript                     |
|   Data / Menus:       JSON-structured data (data/config.json)      |
|   Authentication:     Netlify Identity Widget                      |
|   Payment Gateway:    Paystack Pop Inline JS                       |
|   Search Engine:      Fuse.js client-side indexing                 |
|   Caching / Offline:  Service Worker (Workbox v5.1.2)              |
+-------------------------------------------------------------------+
```

### Static Site Generator: Hugo (Extended v0.160.1)
*   **Why Hugo?** Written in Go, Hugo compiles hundreds of pages in milliseconds. This speed ensures rapid feedback during local development and fast deployment times.
*   **Extended Version**: Essential for compiling SASS/SCSS files natively on-the-fly without relying on heavy node dependency trees (npm/webpack).

### CSS Styling: Vanilla SASS & Hugo Pipes
*   **No Node Bloat**: Styles are written in structured SASS (`/assets/sass/`) and compiled directly by Hugo's built-in asset pipeline using `toCSS` and `minify` resources functions.
*   **Responsive Architecture**: Built from the ground up using custom CSS grids, flexbox, and CSS Custom Variables for theme control. No framework frameworks (like Tailwind or Bootstrap) are used, keeping compiled CSS footprint under **30KB**.

### JavaScript: Vanilla ES16
*   No frameworks (React, Vue, Angular) are used. The platform's interactive behaviors (mobile menus, modals, clipboard copying, iframe resizing) are written in clean, vanilla ES16 JavaScript to minimize CPU cycles and execution delays.

### Configuration & Data Management
*   **Unified Site Parameters**: The site navigation, headers, footers, social profiles, and Paystack API keys are centralized in `data/config.json`.
*   **Front Matter**: Written in clean YAML front-matter blocks within each Markdown content file, allowing easy parsing by both Hugo and Git-based CMS editors (CloudCannon).

### Hosting & Deployment: Netlify
*   **Build Settings**: Leverages Netlify's build systems, running `hugo --gc --minify` on git push triggers.
*   **Authentication**: Utilizes Netlify Identity for membership management, which handles JWT tokens, logins, and registrations natively.

---

## 4. Key Metrics and Goals

*   **Lighthouse Performance Score**: Target `100/100` on desktop and mobile.
*   **Asset Footprint**: Target `< 100KB` total page size (excluding images).
*   **Longevity**: Site designed to compile and run 10 years from now without requiring npm package updates.
*   **Sovereignty**: Zero external telemetry scripts or cookies.
