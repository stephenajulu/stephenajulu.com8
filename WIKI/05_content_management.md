# 05. Content Management Guide

This guide is designed for content creators, writers, and site administrators. It provides step-by-step instructions on how to create, edit, delete, and manage different types of content, including blog posts, micro-notes, portfolio projects, store products, services, and navigation menus.

---

## 1. Creating and Managing Blog Posts

Blog posts are long-form articles that reside inside the `/content/blog/` directory.

### Step 1: Create the Markdown File
Create a new file named using the format `yyyy-mm-dd-your-slug.md` (e.g., `2026-07-07-digital-sovereignty-checklist.md`).

### Step 2: Configure Front Matter
Every blog post requires a YAML front-matter block at the top of the file:
```yaml
---
title: "The Ultimate Digital Sovereignty Checklist"
subtitle: "Practical steps to reclaim your personal data and infrastructure in 2026"
excerpt: "A comprehensive guide to auditing your digital dependencies, hosting your own mail, and securing files."
date: 2026-07-07 18:00:00+03:00
image: images/blog/sovereignty-guide.jpg
image_alt: "Digital sovereignty visual representation"
tags:
  - sovereignty
  - self-hosting
  - privacy
categories:
  - Technology
layout: post
draft: false
---
```

### Explaining the Parameters:
*   `title`: The main heading displayed on the post page and search results.
*   `subtitle`: A secondary heading providing context.
*   `excerpt`: A short summary shown in feed cards.
*   `date`: The publication timestamp. Use timezone offsets (e.g., `+03:00`) to ensure consistent ordering.
*   `image`: The preview image path. Store blog-specific images inside `/static/images/`.
*   `tags`: Taxonomy terms used to group similar posts.
*   `categories`: High-level groups used for organization.
*   `layout`: Must be set to `post`.

### Step 3: Write Content
Below the front matter, write your post using standard Markdown. You can include code blocks, images, quotes, and links:
```markdown
Digital sovereignty isn't an all-or-nothing proposition. It is a spectrum.

## Core steps to sovereignty:

1.  **Domain Ownership**: Secure your own domain.
2.  **Mail Hosting**: Migrate from Gmail to a sovereign provider.
```

---

## 2. Managing Notes (Micro-posts)

Notes are short updates or links without titles, similar to status updates. They reside in the `/content/notes/` directory.

### Step 1: Create the File
Create a file named with its publication timestamp (e.g., `2026-07-07-18-15-00.md`).

### Step 2: Configure Front Matter
Notes do not have titles or excerpts. The front matter contains only the date and optional syndication links:
```yaml
---
date: 2026-07-07 18:15:00+03:00
syndication:
  - name: "Twitter"
    url: "https://twitter.com/stephenajulu/status/123456789"
  - name: "Mastodon"
    url: "https://mastodon.social/@stephenajulu/123456789"
layout: note
---
```

### Step 3: Write Content
Write your short update below the front matter. You can include links or HTML:
```markdown
Setting up a new local server using a custom hypervisor today. 
The performance is fantastic. Read my latest [Sovereign Guide](/blog/sovereignty-guide/) for the config.
```

---

## 3. Creating Portfolio Projects

Portfolio projects showcase work using a modular layout. They reside in `/content/portfolio/`.

### Step 1: Create the Project File
Create a file like `project-7.md` under `/content/portfolio/`.

### Step 2: Define Project Front Matter & Content Sections
Instead of a single text block, projects are built using structured sections in their front matter:
```yaml
---
title: "Solarpunk Branding Identity"
subtitle: "Visual Identity"
date: "2026-07-07"
thumb_image: images/work-poster-solarpunk-thumb.jpg
thumb_image_alt: "Solarpunk logo preview"
layout: project
sections:
  - type: image_section
    image: images/work-poster-solarpunk.jpg
    image_alt: "Solarpunk brand guidelines poster"
    caption: "The brand guidelines poster showing logo lockups."
    width: wide
  - type: text_section
    content: >-
      We created a clean brand identity combining green and gold tones. 
      The goal was to evoke organic, sustainable growth and modern engineering.
  - type: image_section
    image: images/work-mockup-solarpunk.jpg
    image_alt: "Mobile app mockup"
    width: regular
---
```

### Structural Sections Explained:
*   `image_section`: Renders an image.
    *   `image`: Path to the image asset.
    *   `image_alt`: Accessibility text for screen readers.
    *   `caption`: Optional caption text displayed beneath the image.
    *   `width`: Set to `regular` (centered container) or `wide` (larger layout).
*   `text_section`: Renders block text.
    *   `content`: The text content, written in Markdown format.

---

## 4. Configuring Store Products

Products are managed by editing the list in `content/store.md`.

### Step 1: Open `content/store.md`
Open the file to locate the `products` list in the front matter:
```yaml
products:
  - id: "sovereign-cloud-blueprint"
    title: "Sovereign Cloud Blueprint"
    price: "$29 / KES 3,700"
    amount_cents: 2900
    currency: "USD"
    image: "images/about.jpg"
    description: "An end-to-end guide with Docker Compose configurations and bash scripts to self-host your own mail server."
    download_url: "https://stephenajulu.com/downloads/sovereign-cloud-blueprint.zip"
```

### Step 2: Add a New Product
Append a new product to the list using the same structure:
```yaml
  - id: "custom-css-theme-pack"
    title: "Minimal SASS UI Theme Pack"
    price: "$10 / KES 1,300"
    amount_cents: 1000
    currency: "USD"
    image: "images/services/web.jpg"
    description: "A package containing custom SCSS components, typography setups, and layouts for minimalist websites."
    download_url: "https://stephenajulu.com/downloads/theme-pack.zip"
```
*   **Warning**: Ensure `amount_cents` is an integer (price in cents) and `currency` is correct for Paystack checkout.

---

## 5. Editing Service Subpages

Services are defined as individual pages under `/content/services/` (e.g., `cloud-engineering.md`).

### Writing Guidelines
Service pages describe your technical offerings. They should be written clearly and use headings to structure information:
1.  **Problem Statement**: Describe the challenges the client faces.
2.  **Proposed Solution**: Outline how your service addresses the problem.
3.  **Deliverables**: List the specific outcomes the client will receive.
4.  **Action Plan**: Explain the next steps.

---

## 6. Updating Menus and Global Config (`data/config.json`)

To change navigation links, accent colors, or footer text, you edit `/data/config.json`.

### Customizing Design Settings
Change theme colors by editing these properties:
*   `color_scheme`: `"light"` or `"dark"` (determines the default theme).
*   `accent_color`: `"violet"`, `"green"`, `"blue"`, `"red"`, or `"yellow"`.
*   `base_font`: `"fraunces"` or `"outfit"`.
*   `paystack_public_key`: Set your public key for Paystack.

### Editing Header Navigation Links
Update the `nav_links` array:
```json
"nav_links": [
    {
        "label": "Home",
        "url": "/",
        "style": "link"
    },
    {
        "label": "More",
        "style": "dropdown",
        "children": [
            {
                "label": "Services",
                "url": "/services/"
            },
            {
                "label": "Portfolio",
                "url": "/portfolio/"
            }
        ]
    }
]
```
*   **Dropdown links**: Set `"style": "dropdown"` and define sub-links inside the `"children"` array.
*   **Standard links**: Set `"style": "link"` and specify the URL path.
