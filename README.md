# Stephen Ajulu's Sovereign Digital Home
> Design, Tech and Engineering in the Pursuit of Impact and Excellence.

Welcome to the source repository of my personal platform—a living archive, portfolio, store, blog, and notes hub. This project is built as a sovereign, self-hosted, offline-capable Jamstack application using Hugo, custom SASS, and vanilla ES16 JavaScript. It represents complete digital independence, free from heavy framework bloat or vendor lock-in.

---

## 🚀 Key Features

*   **Editorial Minimalism**: Beautiful typographic layout featuring *Fraunces* (contemporary serif) for headings and *Outfit* (geometric sans-serif) for body text.
*   **Theme Toggle**: Fully synchronized light/dark theme switcher using `localStorage` to preserve preferences without light-mode flashes.
*   **Fuzzy Client-Side Search**: Dynamic, fast search engine built with **Fuse.js** featuring client-side pagination.
*   **Sovereign Store**: Paid products checkout using **Paystack**, supporting M-Pesa and credit cards.
*   **Gated Memberships**: Client-side content gating using **Netlify Identity** for secure member-only content blocks.
*   **IndieWeb Ready**: Incorporates Microformats2 (`h-card`), Webmentions comments parsing, and syndication layouts.
*   **PWA Compliant**: Fully offline-capable using custom Workbox Service Worker caching schemas and a dedicated offline page.
*   **Feeds & Archives**: Standard RSS and JSON feeds generated for all sections (writings, notes, projects, tags) and a detailed archive page.
*   **CMS Integrated**: Ready for Git-based editing with **CloudCannon CMS**.

---

## 🛠️ Tech Stack

*   **SSG Engine**: Hugo (v0.160.1-extended)
*   **Styling**: Vanilla SASS compiled natively on-the-fly via Hugo Pipes (no Node/npm build step required).
*   **JavaScript**: Plain ES16 Vanilla JS.
*   **Authentication**: Netlify Identity Widget.
*   **Payments**: Paystack Pop Inline.
*   **Search**: Fuse.js client-side engine.
*   **Feeds**: XML RSS 2.0 & JSON Feed Format.

---

## 📂 Quick File Structure Guide

*   `/assets/sass/` — Custom styling (theme systems, pages, layout blocks).
*   `/content/` — Markdown pages, blogs, notes, and store items.
*   `/layouts/` — HTML templates defining layouts, shortcodes, and partials.
*   `/static/` — Static assets (logo, service worker, manifest, generated images).
*   `config.yaml` — Root Hugo configuration (menus, taxonomies, outputs).
*   `cloudcannon.config.yaml` — CloudCannon CMS configuration.

---

## 📖 Getting Started

### Prerequisites
Install Hugo Extended (v0.160.0 or later):
```powershell
# Windows (using winget)
winget install Hugo.Hugo.Extended
```

### Dev Mode (Local server)
Run the local Hugo development server:
```bash
hugo server -D
```
The site will be available at `http://localhost:1313/`.

### Production Build
Generate the optimized static build:
```bash
hugo
```
The compiled assets will be outputted to the `/public/` directory, ready to be hosted on Netlify or any static provider.

---

## 📚 Project Documentation Wiki
For absolute beginners, technical partners, or contributors, please refer to the detailed guides inside the **`/WIKI/`** directory:

1. [WIKI/01_introduction.md](file:///WIKI/01_introduction.md) — Project vision, philosophy, and tech stack details.
2. [WIKI/02_getting_started.md](file:///WIKI/02_getting_started.md) — How to install, run locally, configure, and compile.
3. [WIKI/03_directory_structure.md](file:///WIKI/03_directory_structure.md) — File-by-file blueprint of every directory, template, SASS style, and asset.
4. [WIKI/04_components_and_features.md](file:///WIKI/04_components_and_features.md) — Breakdown of search, store payments, gating, theme toggle, and PWA logic.
5. [WIKI/05_content_management.md](file:///WIKI/05_content_management.md) — How to add, edit, delete, or gate posts, notes, projects, and services.
