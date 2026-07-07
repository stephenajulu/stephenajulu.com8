---
title: Colophon
subtitle: "The architecture, tools, and design specifications powering this website."
layout: page
seo:
  title: Colophon | Stephen Ajulu — Multidisciplinary Tech Consultant
  description: Technical specifications of how stephenajulu.com was built and is deployed.
---

## 🛠️ Software & Framework
*   **Static Site Generator**: Built on **Hugo (v0.160.1-extended)**.
*   **Theme Styling**: Customized SASS compiled natively on-the-fly via Hugo Pipes (no Node/npm).
*   **Search**: Client-side fuzzy matching powered by **Fuse.js**.

## 🎨 Typography & Colors
*   **Heading Font**: *Fraunces* (a beautiful, highly readable, contemporary serif font).
*   **Body Font**: *Outfit* (a modern geometric sans-serif).
*   **Accent Color**: Violet (`#6320d6`).
*   **Dark Background**: `#020616`.
*   **Light Background**: `#ffffff`.

## 📡 Hosting & Infrastructure
*   **Server Host**: Deployed on **Netlify** Edge Network directly from a Git repository.
*   **Sovereign Payments**: Handled client-side via **Paystack** checkout, supporting Mpesa and Credit Cards without heavy dependencies.
*   **Newsletter Subscriptions**: Powered by **Netlify Forms**, storing submissions in a secure, self-hosted Jamstack environment.
*   **Feedback & Comments**: Syndicated via IndieWeb **Webmentions**.
