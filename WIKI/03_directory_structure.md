# 03. Directory Structure & Layouts Blueprint

This article provides a comprehensive blueprint of the personal personal platform workspace. It documents the purpose of every folder, lists the key files, and explains the layout system in thorough, file-by-file detail.

---

## 1. Directory Tree Overview

Below is the directory mapping of the Personal personal platform repository:

```
stephenajulu.com8/
├── assets/                          # Asset Pipeline
│   └── sass/                        # Stylesheets (SASS)
│       ├── imports/                 # Modular CSS partials
│       │   ├── _archive.scss
│       │   ├── _buttons.scss
│       │   ├── _card.scss
│       │   ├── _code.scss
│       │   ├── _footer.scss
│       │   ├── _header.scss
│       │   ├── _notes.scss
│       │   ├── _project.scss
│       │   ├── _reset.scss
│       │   ├── _search.scss
│       │   ├── _store.scss
│       │   ├── _variations.scss     # Light/Dark variables & themes
│       │   └── _webmentions.scss    # IndieWeb webmention styles
│       └── main.scss                # Primary SASS manifest
├── content/                         # Markdown Content Pages
│   ├── blog/                        # Long-form articles
│   ├── notes/                       # Micro-blog feed entries
│   │   └── _index.md
│   ├── portfolio/                   # Case studies / work items
│   │   ├── _index.md
│   │   └── project-1.md
│   ├── services/                    # Detailed individual service pages
│   ├── _index.md                    # Homepage configuration
│   ├── about.md                     # Profile page
│   ├── archive.md                   # Writings archive index
│   ├── contact.md                   # Contact page
│   ├── offline.md                   # PWA offline fallback page
│   ├── search.md                    # Search page
│   ├── services.md                  # Main services dashboard
│   └── store.md                     # Products store front-matter page
├── data/                            # Structured Config Parameters
│   └── config.json                  # Navigation links, colors, API keys
├── layouts/                         # HTML Layout Templates
│   ├── _default/                    # Default rendering templates
│   │   ├── baseof.html              # Shell markup (head, headers, body)
│   │   ├── list.html                # General listing templates
│   │   ├── index.json               # JSON search index output template
│   │   ├── offline.html             # Offline page shell
│   │   ├── page.html                # Standard page shell
│   │   ├── portfolio.html           # Portfolio list layout
│   │   ├── post.html                # Blog article single view
│   │   ├── project.html             # Portfolio project details
│   │   ├── search.html              # Fuzzy search page layout
│   │   └── store.html               # Store front layout (Paystack)
│   ├── notes/                       # Notes section templates
│   │   ├── list.html
│   │   └── single.html
│   ├── partials/                    # Modular page blocks
│   │   ├── header.html              # Site navigation
│   │   ├── footer.html              # Page bottom & legal details
│   │   ├── comments.html            # Disqus comment form
│   │   ├── webmention.html          # Webmentions render scripts
│   │   ├── text_section.html        # Project text block
│   │   ├── image_section.html       # Project figure layout
│   │   ├── grid_section.html        # Multi-column marketing card lists
│   │   └── cta_section.html         # Call-to-action blocks
│   └── shortcodes/                  # Custom inline markdown components
│       ├── gate.html                # Member login gate wrapper
│       └── newsletter.html          # Substack signup form
├── static/                          # Raw files served in site root
│   ├── js/                          # Browser scripts
│   │   ├── init.js                  # Theme, SW, reframe, and code copy
│   │   ├── page-load.js             # Nav / video binds on load
│   │   ├── page-unload.js           # Nav / video unbinds on unload
│   │   └── webmention.min.js        # Webmentions loader
│   ├── meta/                        # PWA favicon configurations
│   ├── pwabuilder-sw.js             # Workbox Service Worker script
│   └── images/                      # Image assets and media uploads
├── config.yaml                      # Global Hugo configuration file
├── cloudcannon.config.yaml          # CMS integration settings
└── netlify.toml                     # Netlify build and deploy configs
```

---

## 2. Directory breakdowns

### 1. `assets/`
The asset directory stores files processed by Hugo Pipes.
*   `sass/main.scss`: The main SASS entry point. It imports configuration variables (fonts, sizes, colors) and lists imports from `/imports/`.
*   `sass/imports/_variations.scss`: The central location for site branding and theme changes. It maps themes via classes `.palette-light` and `.palette-dark` and contains rules for compiling accent colors (e.g., violet, green, red, blue).
*   `sass/imports/_header.scss`: Style rules for the site navigation header, logo alignment, desktop drop-down menus, and theme toggle buttons.
*   `sass/imports/_store.scss`: Styles the store grid and product cards, including pricing badges and purchase button groups.
*   `sass/imports/_webmentions.scss`: Styles comments retrieved through IndieWeb channels.

### 2. `content/`
This folder contains the site content. Every Markdown file represents a webpage or feed item.
*   `blog/`: Contains long-form writings with rich metadata in front-matter blocks.
*   `notes/`: Micro-posts that do not have titles. They represent a stream of consciousness and quick notes.
*   `portfolio/`: Projects styled as case studies. They utilize structural sections defined in front matter.
*   `services/`: Houses subpages describing technical services.
*   `store.md`: Configures the products sold on the site.
*   `offline.md`: The page rendered when a user is offline.

### 3. `data/`
Used for structured configuration files.
*   `config.json`: The main setup file for site variables. It defines:
    *   Accent colors (`violet`, `green`, etc.).
    *   Paystack API keys.
    *   Header configuration (logo location and navigation menu items).
    *   Footer copy and links.

### 4. `layouts/`
The layout engine of the site. It contains Go HTML templates that define how pages render.

#### `layouts/_default/`
*   `baseof.html`: The HTML shell. It defines the `<head>` metadata, loads stylesheets, runs the flash-free theme script, includes the header/footer partials, and declares the `content` block.
*   `index.json`: Compiles all site posts and pages into a single minified JSON file (`/index.json`) for search indexing.
*   `store.html`: Renders the product grid from `content/store.md` and sets up the Paystack checkout modals.
*   `project.html`: Renders portfolio items by looping over their custom front-matter sections.
*   `search.html`: Structure for the search page.

#### `layouts/notes/`
*   `list.html`: Chronologically list notes.
*   `single.html`: Renders individual notes, syndication links, and loads Webmentions.

#### `layouts/partials/`
Reusable template blocks included inside layout templates:
*   `header.html`: Resolves logo SVG embedding or title rendering, maps the menu array from `data/config.json`, and defines the theme toggle button.
*   `webmention.html`: Renders Webmention comments dynamically.
*   `grid_section.html` & `cta_section.html`: Structural modules for building advanced layouts.

#### `layouts/shortcodes/`
Helper macros usable inside Markdown files:
*   `gate.html`: Gated content block wrapper that blurs content and presents a Netlify login box.

### 5. `static/`
Contains raw files served directly at the root path of the compiled site.
*   `pwabuilder-sw.js`: Workbox service worker caching document, styles, scripts, images, and fonts.
*   `js/init.js`: Core client-js file. It registers the service worker, handles copy-to-clipboard code blocks, binds the responsive iframe script, and runs the theme switcher logic.
