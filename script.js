/**
 * Custom Link Tree - Client-Side Deep Linking & Interactivity
 * Optimized for GitHub Pages & Mobile Web
 */

// ============================================================================
// 1. CONFIGURATION (Customize your handles and links here)
// ============================================================================
const CONFIG = {
  profile: {
    name: "Sumit Kumar Pandey",
    bio: "Digital Marketer • Content Creator • Video Producer",
    location: "Dehradun, India"
  },
  youtube: {
    handle: "@suprimesumit",
    channelId: "UC_suprimesumit", // Optional: your canonical channel ID if known
    featuredVideoId: "dQw4w9WgXcQ", // Replace with your YouTube Video ID
    fallbackChannelUrl: "https://www.youtube.com/@suprimesumit"
  },
  instagram: {
    username: "thehimalayanproperties",
    fallbackUrl: "https://instagram.com/thehimalayanproperties"
  },
  spotify: {
    podcastName: "pawancast",
    fallbackUrl: "https://open.spotify.com"
  }
};

// ============================================================================
// 2. DEEP LINKING ENGINE (Cross-Platform Mobile App Opener)
// ============================================================================
const DeepLinker = {
  /**
   * Device and platform detection
   */
  isAndroid() {
    return /Android/i.test(navigator.userAgent);
  },

  isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },

  isMobile() {
    return this.isAndroid() || this.isIOS();
  },

  /**
   * Detects if running inside in-app webviews (Instagram, Facebook, TikTok, Twitter/X)
   */
  isInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    return /Instagram|FBAN|FBAV|Twitter|musical_ly|ByteLocale|Snapchat|Line/i.test(ua);
  },

  /**
   * Executes deep launch with Android Intent, iOS custom scheme, and web fallback
   * @param {Object} options
   * @param {string} options.androidIntent - Android Intent URI with fallback param
   * @param {string} options.iosScheme - iOS custom URL scheme
   * @param {string} options.webFallback - Standard HTTPS URL fallback
   */
  open({ androidIntent, iosScheme, webFallback }) {
    // If user is on desktop, open standard web link in a new tab
    if (!this.isMobile()) {
      window.open(webFallback, '_blank', 'noopener,noreferrer');
      return;
    }

    // Android: Use native Intent URI (Chrome/Android handles package routing & fallback automatically)
    if (this.isAndroid() && androidIntent) {
      window.location.href = androidIntent;
      return;
    }

    // iOS: Use custom URL scheme with visibility-detection fallback
    if (this.isIOS() && iosScheme) {
      const startTime = Date.now();
      let hasLeftBrowser = false;

      const onVisibilityChange = () => {
        if (document.hidden) {
          hasLeftBrowser = true;
          cleanup();
        }
      };

      const cleanup = () => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('pagehide', cleanup);
        clearTimeout(fallbackTimer);
      };

      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('pagehide', cleanup);

      // Attempt to open native iOS app via custom URL scheme
      window.location.href = iosScheme;

      // Fallback timer: if the app didn't take over within 1800ms, redirect to web fallback
      const fallbackTimer = setTimeout(() => {
        cleanup();
        const elapsed = Date.now() - startTime;
        // Check if page stayed active and visible
        if (!hasLeftBrowser && !document.hidden && elapsed < 3500) {
          window.location.href = webFallback;
        }
      }, 1800);

      return;
    }

    // Default fallback
    window.location.href = webFallback;
  },

  /**
   * Generates target payloads based on link type
   */
  resolveTarget(dataset, fallbackHref) {
    const type = dataset.type;
    const fallbackUrl = dataset.fallbackUrl || fallbackHref || 'https://youtube.com';
    const encodedFallback = encodeURIComponent(fallbackUrl);

    switch (type) {
      case 'youtube-video': {
        const videoId = dataset.videoId || CONFIG.youtube.featuredVideoId;
        const targetWebUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const encTarget = encodeURIComponent(targetWebUrl);
        return {
          androidIntent: `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${encTarget};end`,
          iosScheme: `vnd.youtube://watch?v=${videoId}`,
          webFallback: targetWebUrl
        };
      }

      case 'youtube-channel': {
        const handle = dataset.handle || CONFIG.youtube.handle;
        const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
        const targetWebUrl = `https://www.youtube.com/${cleanHandle}`;
        const encTarget = encodeURIComponent(targetWebUrl);
        return {
          androidIntent: `intent://www.youtube.com/${cleanHandle}#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${encTarget};end`,
          iosScheme: `vnd.youtube://www.youtube.com/${cleanHandle}`,
          webFallback: targetWebUrl
        };
      }

      case 'instagram': {
        const username = dataset.username || CONFIG.instagram.username;
        const targetWebUrl = `https://instagram.com/${username}`;
        const encTarget = encodeURIComponent(targetWebUrl);
        return {
          androidIntent: `intent://instagram.com/_u/${username}#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${encTarget};end`,
          iosScheme: `instagram://user?username=${username}`,
          webFallback: targetWebUrl
        };
      }

      case 'spotify': {
        const targetWebUrl = dataset.fallbackUrl || CONFIG.spotify.fallbackUrl;
        const encTarget = encodeURIComponent(targetWebUrl);
        return {
          androidIntent: `intent://open.spotify.com#Intent;package=com.spotify.music;scheme=https;S.browser_fallback_url=${encTarget};end`,
          iosScheme: `spotify://`,
          webFallback: targetWebUrl
        };
      }

      default:
        return {
          androidIntent: null,
          iosScheme: null,
          webFallback: fallbackUrl
        };
    }
  }
};

// ============================================================================
// 3. UI HELPERS & NOTIFICATIONS
// ============================================================================
function showToast(message, duration = 2800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ============================================================================
// 4. INITIALIZATION & EVENT LISTENERS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // In-App Browser detection & banner prompt
  const iabBanner = document.getElementById('iab-banner');
  const iabDismiss = document.getElementById('iab-dismiss');

  if (DeepLinker.isInAppBrowser() && iabBanner) {
    iabBanner.style.display = 'block';
  }

  if (iabDismiss && iabBanner) {
    iabDismiss.addEventListener('click', () => {
      iabBanner.style.display = 'none';
    });
  }

  // Bind Deep Links
  const deepLinkElements = document.querySelectorAll('.app-deep-link');
  deepLinkElements.forEach((element) => {
    element.addEventListener('click', (event) => {
      // Allow default behavior if user held modifier key (Ctrl/Cmd click for new tab)
      if (event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      event.preventDefault();
      const href = element.getAttribute('href');
      const target = DeepLinker.resolveTarget(element.dataset, href);
      
      DeepLinker.open(target);
    });
  });

  // Share Button Handler
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: 'Connect with Sumit Kumar Pandey - Links, YouTube & Projects',
        url: window.location.href
      };

      if (navigator.share && DeepLinker.isMobile()) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // User canceled or share failed; fallback gracefully
          if (err.name !== 'AbortError') {
            copyToClipboard(window.location.href);
          }
        }
      } else {
        copyToClipboard(window.location.href);
      }
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard! 📋');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Link copied to clipboard! 📋');
    } catch (err) {
      showToast('Press Ctrl+C to copy URL');
    }
    document.body.removeChild(textArea);
  }
});
