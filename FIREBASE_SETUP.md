# BioMi Firebase setup (MVP)

BioMi has a dedicated Firebase project, a registered Web app, a standard Cloud Firestore database in Delhi (asia-south2), and production-mode Firestore rules. The owner reports publishing the latest rules on 20 Oct 2026; this browser could not independently verify Firebase Console. The project is on Firebase Spark (no-cost). Email/Password sign-in is enabled, and `pansum21.github.io` is an authorized domain. Optional Gemini and Google Analytics were left off.

The dashboard uses the modular Firebase Web SDK from the official CDN. It stores public profile data only and does not use an Admin SDK secret or a custom server for this MVP.

## Firebase project

- Project ID: `biomi-9ef92`
- Web app nickname: `BioMi Web`
- Firestore: Standard edition, default database, `asia-south2` (Delhi)
- Firestore rules: published in production mode from `firestore.rules`
- Authentication: Email/Password enabled; `pansum21.github.io` authorized
- Google sign-in: the owner confirms the provider is enabled and the existing Firebase-owner Google email is selected as the public support contact. The dashboard requests an account picker and falls back to a full-page redirect if the browser blocks its popup. `pansum21.github.io` is already authorized.
- Analytics, scheduled database backups, Cloud Storage uploads, and paid billing: not enabled. Background upload controls are prepared in the dashboard, but file uploads require enabling Firebase Storage and deploying `storage.rules`; this project remains on Spark until the owner explicitly upgrades billing.

The Firebase Web SDK config is in `firebase-config.js`. Firebase client config values are public identifiers, not Admin SDK secrets. Access control is enforced by Firestore rules.

## Deploy and use the MVP

1. Open the deployed dashboard at `https://pansum21.github.io/biomi/dashboard.html`.
2. On the dashboard, choose **Continue with Google**, then pick a saved Google account or choose **Use another account** to enter a different Gmail address. If the popup is blocked, BioMi switches to a full-page Google sign-in.
3. Create an account, save a draft, then publish. The short username route is `https://pansum21.github.io/biomi/<username>`; the older `profile.html?u=<username>` link continues to work.

The username is claimed once and remains fixed in this MVP. Draft pages are private; published pages are readable without signing in. Owners can edit or unpublish their own profile. `404.html` resolves the short username route on GitHub Pages; existing `profile.html?u=` links continue to work.

## Firestore profile shape

`profiles/{username}` contains `slug`, `ownerUid`, `displayName`, optional public `avatarUrl`, `bio`, `location`, `links`, `theme`, `published`, and `updatedAt`. The theme stores colors (`a`, `b`), angle, mode, and optional button style (`solid`, `glass`, `outline`) and radius (`3px`, `9px`, `16px`). Do not add email addresses or other private fields to this public profile document. The avatar field accepts an HTTPS image URL; it does not upload a file.

## Verification checklist

- Create an account with Google, confirm the account picker appears, and check that the profile loads after a refresh.
- Keep email/password as a working fallback.
- Two different accounts cannot claim the same username.
- An unauthenticated visitor can read a published profile and cannot read an unpublished profile.
- A signed-in owner can edit and unpublish their profile; another account cannot change it.
- Links reject non-web protocols in the editor and public page.
- Profile photos load only from HTTPS URLs and fall back to initials if the image fails.
- Export a JSON backup, import it, save it, and confirm the username and publish status are preserved.

The dashboard and public profile JavaScript syntax and theme controls were checked on GitHub Pages. Authenticated Google sign-in, saving, and publishing still need end-to-end verification. The owner reports that the latest rules are published, but I could not independently inspect Firebase Console in this browser session. Cloud Storage avatar upload and scheduled database backups require upgrading to Blaze; BioMi remains on Spark.
## New profile appearance options

The dashboard can save avatar shape (circle, square, soft square), decorative blue or gradient photo rings, and solid or gradient page backgrounds. These settings are included in the updated `firestore.rules`; publish that file in Firebase Console before users save these new options.

Image, GIF, and short silent video backgrounds use Firebase Cloud Storage. The `storage.rules` file limits uploads to 3 MB (GIFs are limited to 1.5 MB in the dashboard), makes assets publicly readable for published profiles, and permits an owner to manage only their own profile-background folder. To enable uploads, activate Cloud Storage for this Firebase project, publish `storage.rules`, and confirm any billing-plan change in Firebase Console. No billing plan was changed as part of this code update.


The profile dashboard also offers **Scroll list** or **Swipe pages (5 links per page)**. In Swipe mode, only the links area moves; the avatar, name, and bio stay in place. The page counter and arrows move between groups of up to five links, and touch users can swipe. Both options have short animated samples. Older profiles default to Scroll.
