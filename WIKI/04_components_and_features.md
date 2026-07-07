# 04. Core Technical Components & Implementation

This article provides deep-dive explanations and exact code configurations for the core technical features of the Personal personal platform. It details how the client-side theme toggle, Fuse.js fuzzy search, Netlify Identity gated content, Paystack Store integration, Progressive Web App (PWA) caching, and Webmentions are engineered and implemented.

---

## 1. Client-Side Theme Switcher (Flicker-Free)

Many static websites experience a temporary flash of light mode on page load when a user has selected dark mode. This site prevents that by executing a blocking script in the document `<head>` *before* the browser begins painting the page body.

### A. The Head Initialization Script (`layouts/_default/baseof.html`)
This inline script is placed at the top of the HTML `<head>` tag:
```javascript
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.className = 'theme-' + savedTheme;
  document.write('<style>body{opacity:0;transition:opacity 0.2s;}</style>');
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('palette-light', 'palette-dark');
    document.body.classList.add('palette-' + savedTheme);
    document.body.style.opacity = '1';
  });
})();
```
*   **Why this works**: By adding the `theme-` class directly to the `<html>` element immediately, CSS variables or rules targeting that theme are loaded before body rendering begins. The document writing of `body{opacity:0}` keeps the layout hidden until `DOMContentLoaded` fires, at which point the final body classes are updated and the body fades in smoothly.

### B. Toggle Event Listener (`static/js/init.js`)
When a user clicks the theme toggle button, the application updates the local storage key and swaps body classes:
```javascript
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function(e) {
      e.preventDefault();
      let currentTheme = localStorage.getItem("theme") || "dark";
      let newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.body.classList.remove("palette-light", "palette-dark");
      document.body.classList.add("palette-" + newTheme);
    });
  }
}
```

### C. Icon Control SASS Rules (`assets/sass/imports/_header.scss`)
The toggle button displays a moon icon in light mode and a sun icon in dark mode:
```scss
.theme-icon-sun {
  display: none !important;
}
.theme-icon-moon {
  display: inline-block !important;
  color: $color-gray-600;
}

.palette-dark {
  .theme-icon-sun {
    display: inline-block !important;
    color: #fff;
  }
  .theme-icon-moon {
    display: none !important;
  }
}
```

---

## 2. Serverless Client-Side Search with Fuse.js

The search functionality is built entirely client-side without relying on external databases. It downloads a dynamically generated JSON file containing all page contents and performs local fuzzy matching using **Fuse.js**.

### A. The Search Index Compiler (`layouts/_default/index.json`)
Hugo compiles the search index dynamically during builds:
```go
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
    {{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "categories" .Params.categories "contents" .Plain "permalink" .Permalink) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```
*   `.Plain` strips all HTML tags, leaving clean text, which reduces the search file size.

### B. JavaScript Implementation & Pagination (`layouts/_default/search.html`)
The search script downloads the index file, configures search weights, performs matching, and renders results with dynamic pagination:
```javascript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'contents', weight: 0.3 },
    { name: 'tags', weight: 0.1 },
    { name: 'categories', weight: 0.1 }
  ],
  threshold: 0.3,
  includeMatches: true
};

// Fetch index
fetch("/index.json")
  .then(response => response.json())
  .then(data => {
    searchIndex = data;
    fuse = new Fuse(data, fuseOptions);
  });

// Perform Search on input change
searchInput.addEventListener("input", function() {
  const query = searchInput.value.trim();
  if (query.length < 2) {
    searchResults.innerHTML = "";
    searchPagination.innerHTML = "";
    return;
  }
  const fuseResults = fuse.search(query);
  allResults = fuseResults.map(r => r.item);
  currentPage = 1;
  displayResultsPage();
});
```

*   **Snippet Extraction**: To show a snippet of matching text, the script locates the query within the body copy, extracts 60 characters before and 100 characters after it, and escapes any HTML characters.
*   **Pagination**: Displays 10 results per page and includes navigation links (← / →). When a pagination link is clicked, the script scrolls the page back to the top of the search card smoothly: `searchResults.scrollIntoView({ behavior: "smooth", block: "start" })`.

---

## 3. Gated Content Shortcode (`[gate]`)

This feature enables gating specific sections of content, such as premium tips, source files, or early access articles, behind a member register/login gate.

### Implementation code (`layouts/shortcodes/gate.html`)
```html
<div class="gated-wrapper" style="position: relative;">
  <div class="gated-content" style="filter: blur(8px); pointer-events: none; user-select: none; transition: filter 0.3s ease;">
    {{ .Inner }}
  </div>
  <div class="gate-cta" style="margin: 2rem 0; padding: 2rem; border: 1.5px dashed #6320d6; border-radius: 12px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.02);">
    <span>🔒</span>
    <h4>Sovereign Member Content</h4>
    <p>This content is gated. Please sign in with your Netlify Identity or subscribe to support my work.</p>
    <div class="button-group">
      <button class="button button--primary netlify-login-trigger">Log In / Register</button>
      <a href="/support" class="button">Become a Member</a>
    </div>
  </div>
</div>
```

### Script Execution and State Integration
The gate loads the **Netlify Identity Widget** script and listens for authentication state changes:
```javascript
function initGate() {
  netlifyIdentity.init();
  
  const checkUser = () => {
    const user = netlifyIdentity.currentUser();
    const wrappers = document.querySelectorAll(".gated-wrapper");
    wrappers.forEach(wrap => {
      const content = wrap.querySelector(".gated-content");
      const cta = wrap.querySelector(".gate-cta");
      if (user) {
        content.style.filter = "none";
        content.style.pointerEvents = "auto";
        content.style.userSelect = "auto";
        cta.style.display = "none";
      } else {
        content.style.filter = "blur(8px)";
        content.style.pointerEvents = "none";
        content.style.userSelect = "none";
        cta.style.display = "flex";
      }
    });
  };

  netlifyIdentity.on("init", checkUser);
  netlifyIdentity.on("login", checkUser);
  netlifyIdentity.on("logout", checkUser);
}
```
*   **Why this approach?** Gating content client-side using CSS filters keeps the page fast and responsive. It provides a simple way to protect content without needing complex, heavy back-end servers.

---

## 4. Paystack Sovereign Store checkout

The sovereign store allows visitors to purchase digital goods directly, processing payments via credit cards or M-Pesa.

### HTML Layout & trigger attributes (`layouts/_default/store.html`)
The page renders products as cards containing data attributes:
```html
<button class="button button--primary paystack-trigger" 
        data-id="{{ .id }}" 
        data-title="{{ .title }}" 
        data-cents="{{ .amount_cents }}" 
        data-currency="{{ .currency }}" 
        data-download="{{ .download_url }}">
  Buy Product
</button>
```

### Popup Form Submission & Success Verification
The site pulls the public key from `data/config.json` and loads the inline Paystack popup modal. Upon successful checkout, it reveals a download modal containing the product link:
```javascript
paymentForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const emailVal = buyerEmail.value.trim();
  if (!emailVal) return;

  paymentModal.style.display = "none";

  let handler = PaystackPop.setup({
    key: paystackKey, // Read from config.json
    email: emailVal,
    amount: activeProduct.cents, // Price in cents
    currency: activeProduct.currency, // e.g. USD
    callback: function(response) {
      // Transaction successful callback
      downloadLink.href = activeProduct.download;
      successModal.style.display = "flex";
    },
    onClose: function() {
      alert("Transaction was cancelled.");
    }
  });
  handler.openIframe();
});
```

---

## 5. PWA Caching & Workbox Service Worker

To support offline viewing, the Progressive Web App uses Google Workbox to cache files locally in the browser.

### Caching strategies (`static/pwabuilder-sw.js`)
*   **Precaching**: The service worker caches the offline fallback page during the installation phase:
    ```javascript
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(HTML_CACHE).then((cache) => cache.add("/offline/"))
      );
    });
    ```
*   **HTML Strategy**: Uses a **Network-First** strategy. If the user is online, the app fetches the latest content from the network and saves it to the cache. If offline, the app serves the cached version. If the page is not in the cache, it falls back to the `/offline/` page.
*   **Assets (CSS / JS)**: Uses a **Cache-First** strategy. The app serves assets from the cache to keep load times fast.
*   **Images**: Uses a **Stale-While-Revalidate** strategy with a limit of 100 images and a 30-day expiration window.

---

## 6. Webmentions Comments System

Webmentions provide a decentralized, open way to collect comments and reactions across the web.

### Comments Container (`layouts/partials/webmention.html`)
The template loads the Webmention rendering helper script and targets the page permalink:
```html
<script src="{{ "js/webmention.min.js" | relURL }}"></script>
<div id="webmentions">Loading responses...</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  if (window.Webmention) {
    Webmention.renderWebmentions("{{ .Permalink }}", {
      target: "#webmentions",
      template: function(props) {
        const authorPhoto = props.author && props.author.photo ? props.author.photo : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
        const authorName = props.author && props.author.name ? props.author.name : 'Anonymous';
        const content = props.content ? props.content : 'Liked or reposted this.';
        return `
          <div class="webmention">
            <div class="author">
              <img src="${authorPhoto}" alt="${authorName}">
              <span>${authorName}</span>
            </div>
            <div class="content">${content}</div>
            <a href="${props.url}" target="_blank">View Source Response</a>
          </div>
        `;
      }
    });
  }
});
</script>
```
*   **Syndicated Comments**: If a visitor mentions the post's URL in a tweet or on their own blog, Webmention parses it, extracts the author's avatar, name, and comment content, and displays it at the bottom of the article.
*   **Writings Injection**: The Webmention container is also loaded in [post.html](file:///layouts/_default/post.html) inside `<footer class="post__meta">` to support responses directly below article bodies.

---

## 7. Notes Attachments & Bookmarks Engine

To support IndieWeb micro-blogging, notes can carry optional attachments (images, native HTML5 videos, and bookmark links) directly via front matter metadata:

```yaml
# Example content/notes/some-note.md
---
date: 2026-07-07T18:32:00Z
link: "https://example.com"
link_title: "IndieWeb bookmark links"
link_description: "Learn how to build link previews natively."
image: "/images/notes/attachment.jpg"
video: "/videos/notes/clip.mp4"
---
```

### A. Template Implementation (`layouts/notes/list.html` & `single.html`)
The layouts evaluate metadata and conditionally render components:
```html
{{ if .Params.link }}
<div class="note-card__bookmark">
  <a href="{{ .Params.link }}" target="_blank" rel="noopener noreferrer">
    🔗 {{ .Params.link_title | default .Params.link }}
  </a>
  {{ if .Params.link_description }}
  <p>{{ .Params.link_description }}</p>
  {{ end }}
</div>
{{ end }}

{{ if .Params.image }}
<div class="note-card__media">
  <img src="{{ .Params.image | relURL }}" alt="{{ .Params.image_alt | default "Note image" }}" />
</div>
{{ end }}

{{ if .Params.video }}
<div class="note-card__media">
  <video src="{{ .Params.video | relURL }}" controls></video>
</div>
{{ end }}
```

### B. Styling integration (`assets/sass/imports/_notes.scss`)
*   `.note-card__bookmark` — Styled with custom background cards (`rgba(0,0,0,0.01)` in light mode, `rgba(255,255,255,0.01)` in dark mode) and subtle borders.
*   `.note-card__media` — Limits media wrappers to `100%` width with clean, pre-rounded corners.

---

## 8. Theme-Aware Shortcodes

The project provides three custom Hugo shortcodes to enrich content while maintaining light/dark theme alignment.

### A. Notice/Callout Shortcode (`layouts/shortcodes/notice.html`)
*   **Usage**: `{{% notice warning %}}This is a warning notice{{% /notice %}}` (supports `info`, `warning`, `success`).
*   **Implementation**:
    ```html
    {{ $type := .Get 0 | default "info" }}
    <div class="notice notice--{{ $type }}">
      {{ .Inner | markdownify }}
    </div>
    ```
*   **Styling**: Border colors dynamically adapt ($color-accent for info, #f59e0b for warning, #10b981 for success) with a semi-transparent theme background.

### B. Bookmark Shortcode (`layouts/shortcodes/bookmark.html`)
*   **Usage**: `{{< bookmark url="https://example.com" title="Example Website" description="Example desc" >}}`
*   **Implementation**: Creates a bookmark card embedded inside any markdown page, matching the Notes bookmarks aesthetic.

### C. Responsive Video Shortcode (`layouts/shortcodes/video.html`)
*   **Usage**: `{{< video src="/videos/demo.mp4" autoplay=true >}}`
*   **Implementation**: Employs native browser HTML5 elements inside the responsive `.note-card__media` class framework.

### D. X/Twitter Embeds Shortcode (`layouts/shortcodes/tweet.html`)
*   **Usage**: `{{< tweet id="12345" user="stephenajulu" text="This is a tweet text" date="July 7, 2026" >}}` (sovereign static card) or `{{< tweet 12345 >}}` (loads standard widgets.js with progressive loading).
*   **Implementation**: Conditionally swaps to static CSS blockquotes if content parameters are provided to ensure zero tracking and instant rendering, falling back to standard Twitter script widgets.

### E. MermaidJS Diagrams Shortcode (`layouts/shortcodes/mermaid.html`)
*   **Usage**:
    ```text
    {{< mermaid >}}
    graph TD
      A[Start] --> B[Process]
    {{< /mermaid >}}
    ```
*   **Implementation**: Evaluates the body class `.palette-dark` and dynamically chooses the `dark` or `default` theme inside `mermaid.initialize()`. Includes safety guards to prevent multiple JS imports on a single page.

### F. Timeline Milestones (`layouts/shortcodes/timeline.html` & `milestone.html`)
*   **Usage**:
    ```text
    {{< timeline >}}
      {{< milestone date="2026" title="Launch" >}}Overhauled digital home{{< /milestone >}}
    {{< /timeline >}}
    ```
*   **Implementation**: SASS-driven list layout that creates custom left borders, circular milestone nodes, and dates.

### G. GitHub Gist embeds (`layouts/shortcodes/gist_embed.html`)
*   **Usage**: `{{< gist_embed user="stephenajulu" id="12345" >}}`
*   **Implementation**: Dynamically fetches and inserts external scripts into layouts container blocks.

### H. Crypto Wallet Cards (`layouts/shortcodes/crypto_card.html`)
*   **Usage**: `{{< crypto_card coin="BTC" address="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" >}}`
*   **Implementation**: Generates a card highlighting the wallet address alongside a responsive, plain JS clipboard "Click to Copy" button wrapper.

### I. Audio Track Players (`layouts/shortcodes/audio.html`)
*   **Usage**: `{{< audio src="/audio/voice-note.mp3" title="Sovereign Podcast" >}}`
*   **Implementation**: Generates a native theme-aligned player with voice metadata listings.

### J. Goal Progress Metric Cards (`layouts/shortcodes/metric.html`)
*   **Usage**: `{{< metric label="Type 1 Civilization" value="73%" percent="73" >}}`
*   **Implementation**: Generates a grid metric block displaying value outputs and a CSS-animated visual status bar.

