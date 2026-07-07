# 02. Getting Started & Operations Manual

This guide outlines the complete operational process for setting up, developing, building, and deploying the PERSONAL personal platform. It is designed to take a complete beginner from a fresh machine setup to a fully functioning production site deployed on Netlify, with Progressive Web App (PWA) caching validation.

---

## 1. Prerequisites & Toolchain Setup

To run, compile, and build this website, you need the **Extended** version of **Hugo**. The standard version of Hugo does not include the SASS/SCSS compiler, which this project relies on to build CSS assets natively.

### Installing Hugo Extended

#### On Windows (Recommended)
You can install Hugo Extended using the Windows Package Manager (`winget`) via PowerShell:
```powershell
# Install Hugo Extended
winget install Hugo.Hugo.Extended

# Verify installation and ensure "extended" is in the version string
hugo version
```
*Note: Make sure to restart your terminal after installation so that the system path updates.*

#### On macOS
Using Homebrew:
```bash
# Install Hugo
brew install hugo

# Verify version
hugo version
```

#### On Linux (Ubuntu/Debian)
Using snap or downloading the `.deb` release directly from GitHub:
```bash
# Using snap package manager
snap install hugo --channel=extended

# Verify version
hugo version
```

---

## 2. Local Development Server

Once Hugo Extended is installed, you can launch the local development server to preview changes in real time.

### Launch Command
Open your terminal in the root directory of the project (`C:\Users\ajulu\Desktop\PROJECTS\Dev PROJECTS\stephenajulu.com8`) and run:
```powershell
hugo server -D
```

### Explaining Command Flags:
*   `server`: Tells Hugo to spin up a local high-performance web server.
*   `-D` (or `--buildDrafts`): Instructs Hugo to build and display pages marked as `draft: true` in their front matter. This is extremely useful during content creation.
*   **Live Reload**: Hugo automatically watches the directory for any file edits. If you modify SASS files, templates, or markdown pages, Hugo will re-compile them in milliseconds and instruct the browser to refresh immediately.

### Accessing the Local Site
Once the server starts, open your browser and navigate to:
```
http://localhost:1313/
```
The output terminal will display lines like this:
```
                   | EN  
-------------------+-----+
  Pages            |  89  
  Active Web Server| YES  
  Running at       | http://localhost:1313/
```

---

## 3. Building Production Assets

When you are ready to prepare the website for deployment, you must build the static files.

### Compilation Command
From the root folder, run:
```bash
hugo --gc --minify
```

### Explaining the Compilation Steps:
1.  **Static Files Generation**: Hugo reads the content and layouts directories, compiles SASS assets, generates JSON search indexes, and writes final static files.
2.  **Output Directory**: The compiled website is generated inside the `/public/` folder in the project root.
3.  `--gc` (Garbage Collection): Tells Hugo to run garbage collection on unused cached assets to ensure the output directory remains clean.
4.  `--minify`: Minifies all HTML, CSS, JavaScript, XML, and JSON assets. This reduces file sizes by removing whitespace and comments, optimizing load times for end users.

---

## 4. Deploying to Netlify

The site is configured for zero-configuration deployments to **Netlify** using a continuous integration workflow connected to a Git repository (GitHub/GitLab).

### Netlify Configuration File (`netlify.toml`)
The repository contains a `netlify.toml` file at the root, which defines the exact build instruction:
```toml
[build]
publish = "public"
command = "hugo --gc --minify"

  [build.environment]
  HUGO_VERSION = "0.160.1"
```

### Deploying Step-by-Step:
1.  **Push Code to GitHub**: Commit your changes and push them to your repository:
    ```bash
    git add .
    git commit -m "feat: update portfolio and documentation"
    git push origin main
    ```
2.  **Connect to Netlify**:
    *   Sign in to your [Netlify account](https://app.netlify.com/).
    *   Click **Add new site** > **Import an existing project**.
    *   Connect your Git provider and select the repository.
3.  **Automatic Build Detection**: Netlify automatically parses `netlify.toml`, sets the build command to `hugo --gc --minify`, sets the publish directory to `public`, and sets the environment variable `HUGO_VERSION` to `0.160.1` to match the exact version of Hugo used during development.
4.  **Instant Deploy**: Every time you push to the `main` branch, Netlify will rebuild and publish the changes.

---

## 5. PWA Configuration

A Progressive Web App allows visitors to "install" the website onto their phone or desktop and read cached posts offline.

### PWA Structure
*   **Web App Manifest**: Located in `/static/meta/` (containing icon configurations for Chrome, Firefox, iOS, and Windows).
*   **Service Worker**: Located at `/static/pwabuilder-sw.js`. This is a background script that controls request caching.
*   **Registration**: Registered in `/static/js/init.js` with:
    ```javascript
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/pwabuilder-sw.js');
      });
    }
    ```

### Customizing App Metadata
To change the app name, short name, start URL, or theme colors, you modify the PWA configuration files or manifest directly inside `/static/`. Ensure your icons are updated in `/static/meta/` if you change logos.

---

## 6. Caching & Offline Validation

Testing that the service worker is successfully caching content and works offline requires using your browser's developer tools.

### Caching Validation Protocol
1.  Open your website in Google Chrome (either `http://localhost:1313/` or your production domain).
2.  Open Chrome Developer Tools by pressing `F12` (or `Cmd + Option + I` on macOS).
3.  Navigate to the **Application** tab.

```
+-----------------------------------------------------------+
| Chrome DevTools -> Application Tab                        |
+-----------------------------------------------------------+
| [Application]                                             |
|   ├── Manifest                                            |
|   ├── Service Workers <--- Check "Activated and running"  |
|   └── Cache                                               |
|         ├── Cache Storage                                 |
|         │     ├── html <--- Cached HTML files             |
|         │     ├── javascript <--- Cached scripts          |
|         │     └── stylesheets <--- Compiled main.css      |
+-----------------------------------------------------------+
```

4.  **Verify Service Worker Registration**:
    *   Click on **Service Workers** under the "Application" section in the left sidebar.
    *   Ensure `/pwabuilder-sw.js` is listed, marked as **Activated and running**, and has a green status indicator.
5.  **Inspect Cached Assets**:
    *   Expand the **Cache Storage** accordion in the left sidebar.
    *   You will see cache groups: `html`, `javascript`, `stylesheets`, `images`, and `fonts`.
    *   Click on `html` or `stylesheets`. You should see cached assets, including `/offline/` and `css/main.css`.
6.  **Test Offline Execution**:
    *   Go to the **Network** tab in Developer Tools.
    *   Look for the **Throttling** dropdown menu (marked "No throttling" by default).
    *   Change this selection to **Offline**.
    *   Refresh the page.
    *   The browser should successfully render the page you are currently viewing by retrieving it from the local cache.
7.  **Verify Offline Fallback**:
    *   While still in **Offline** mode, navigate to a page that you have **not** visited during this session (meaning it is not cached).
    *   The service worker will fail to fetch the page from the network, fail to find it in the cache, and will render the dedicated `/offline/` page containing a message indicating the reader is currently disconnected.
