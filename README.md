# Custom Link Tree with Mobile App Deep Linking (GitHub Pages)

A modern, mobile-first, Linktree-style personal website designed to be hosted for free on **GitHub Pages**, featuring client-side **deep linking** for native mobile apps like **YouTube**, **Instagram**, and **Spotify**.

---

## 🌟 Key Features

1. **Native YouTube Deep Linking**:
   - **Android**: Uses Chrome Android Intent URIs (`intent://...#Intent;package=com.google.android.youtube;...`) with embedded fallback URLs (`S.browser_fallback_url`). Opens directly in the YouTube app without intermediate prompts.
   - **iOS**: Uses Apple custom schemes (`vnd.youtube://`) paired with a `visibilitychange` & timer fallback to ensure users without the app are seamlessly directed to the web version.
   - **Desktop**: Automatically opens the standard web link in a fresh tab.
2. **In-App Browser (IAB) Detection**:
   - Detects when visitors view the page through Instagram, TikTok, or Facebook in-app webviews, showing a helpful tip on opening the link in Safari or Chrome for optimal 1-tap app launching.
3. **Glassmorphic Aesthetic**:
   - Dark mode with ambient glows, responsive layout, micro-interactions, active-press feedback, and clean typography.
4. **Native Share & Clipboard Fallback**:
   - Supports the Web Share API (`navigator.share`) on mobile devices, with instant clipboard copy and toast notifications on desktop.
5. **Zero External Dependencies**:
   - Built entirely in vanilla HTML5, CSS3, and modern JavaScript. No bundlers or build steps required.

---

## 📁 Project Structure

```text
├── index.html     # Semantic markup, profile header, link cards & meta tags
├── style.css      # Mobile-first glassmorphism, glowing accents & animations
├── script.js     # DeepLinker engine, IAB detection, and share handler
├── .nojekyll      # Bypasses Jekyll processing on GitHub Pages
└── README.md      # Deployment and customization documentation
```

---

## 🚀 How to Deploy on GitHub Pages

You can deploy this site in under 3 minutes using either the GitHub web interface or the command line.

### Option 1: Quick Web Upload (No Git CLI Needed)

1. Go to [GitHub](https://github.com) and click **New Repository**.
2. Name your repository (e.g., `links` or `<your-username>.github.io`).
3. Set visibility to **Public** and click **Create repository**.
4. In the empty repository view, click **"uploading an existing file"**.
5. Drag and drop `index.html`, `style.css`, `script.js`, and `.nojekyll` into the upload box.
6. Click **Commit changes**.
7. Navigate to **Settings** > **Pages** (in the left sidebar).
8. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
9. Wait 30–60 seconds. Your site will be live at:
   - `https://<your-username>.github.io/<repo-name>/` (or `https://<your-username>.github.io` if named after your username).

### Option 2: Using the Git CLI

```bash
# Initialize and commit
git init
git add .
git commit -m "Initial commit: Custom link tree with deep linking"

# Add your GitHub remote and push
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then enable GitHub Pages under **Settings** > **Pages**.

---

## ⚙️ Customization Guide

### 1. Update Profile & Social Handles (`script.js`)
Edit the `CONFIG` object at the top of `script.js`:

```javascript
const CONFIG = {
  profile: {
    name: "Your Name",
    bio: "Digital Marketer • Creator",
    location: "Your City, Country"
  },
  youtube: {
    handle: "@YourHandle",
    featuredVideoId: "YOUR_YOUTUBE_VIDEO_ID", // e.g. 'dQw4w9WgXcQ'
    fallbackChannelUrl: "https://www.youtube.com/@YourHandle"
  },
  instagram: {
    username: "your_instagram_handle",
    fallbackUrl: "https://instagram.com/your_instagram_handle"
  }
};
```

### 2. Update Video & Links (`index.html`)
- To change the featured video, update the `data-video-id` attribute on the featured button:
  ```html
  <button class="primary-app-btn app-deep-link" 
          data-type="youtube-video" 
          data-video-id="YOUR_VIDEO_ID"
          data-fallback-url="https://www.youtube.com/watch?v=YOUR_VIDEO_ID">
  ```
- To customize the avatar picture, replace the `src` attribute of the `<img>` tag with your own hosted image URL or a local image file placed in the repository (e.g. `avatar.jpg`).

---

## 📱 How Deep Linking Works

- **Android Intent Scheme**:
  ```text
  intent://www.youtube.com/watch?v=VIDEO_ID#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DVIDEO_ID;end
  ```
  This tells Android to route directly to package `com.google.android.youtube`. If the app is not installed, Chrome falls back to the URL specified in `S.browser_fallback_url`.

- **iOS Custom Scheme**:
  ```text
  vnd.youtube://watch?v=VIDEO_ID
  ```
  When tapped on iOS, Safari checks for the registered handler for `vnd.youtube`. If the YouTube app is installed, it opens. If not, the JavaScript timer detects that the page remains visible (`document.hidden === false`) and triggers navigation to the regular HTTPS URL.


## BioMi Creator MVP (feature branch)

The current `main` page is a static personal link page. The feature branch also contains an early creator dashboard and Firebase-backed MVP source:

- `dashboard.html` — sign in, edit a profile, add/reorder links, choose colors, and publish.
- `profile.html?u=<username>` — public profile for a published username.
- `firebase-config.js` — paste in the Firebase Web app config.
- `firestore.rules` — owner-only edits and read access for published pages.
- `FIREBASE_SETUP.md` — setup and verification steps.

These files require Firebase Authentication and Firestore to be configured. They are on `feature/theme-customizer-preview` and are not on `main` or deployed yet. The first version does not include analytics or avatar uploads.
