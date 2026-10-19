# BioMi Firebase setup (MVP)

BioMi has a dedicated Firebase project, a registered Web app, a standard Cloud Firestore database in Delhi (asia-south2), and production-mode Firestore rules. The owner reports publishing the latest rules on 20 Oct 2026; this browser could not independently verify Firebase Console. The project is on Firebase Spark (no-cost). Email/Password sign-in is enabled, and `pansum21.github.io` is an authorized domain. Optional Gemini and Google Analytics were left off.

The dashboard uses the modular Firebase Web SDK from the official CDN. It stores public profile data only and does not use an Admin SDK secret or a custom server for this MVP.

## Firebase project

- Project ID: `biomi-9ef92`
- Web app nickname: `BioMi Web`
- Firestore: Standard edition, default database, `asia-south2` (Delhi)
- Firestore rules: published in production mode from `firestore.rules`
- Authentication: Email/Password enabled; `pansum21.github.io` authorized
- Google sign-in: the dashboard now has a `Continue with Google` account-picker button using Firebase `signInWithPopup` and `prompt: select_account`. The provider itself is still not enabled in Firebase; Firebase requires a support email that appears on Google's OAuth sign-in/consent screen. Enable the Google provider and choose the public support contact in Firebase Authentication after the owner confirms which email to show.
- Analytics, scheduled database backups, Cloud Storage uploads, and paid billing: not enabled

The Firebase Web SDK config is in `firebase-config.js`. Firebase client config values are public identifiers, not Admin SDK secrets. Access control is enforced by Firestore rules.

## Deploy and use the MVP

1. Open the deployed dashboard at `https://pansum21.github.io/biomi/dashboard.html`.
2. In Firebase Authentication, enable Google sign-in and select the public support email after the owner confirms it. `pansum21.github.io` is already authorized. Until then, email/password is the available sign-in path.
3. Create an account, save a draft, then publish to get `https://pansum21.github.io/biomi/profile.html?u=<username>`.

The username is claimed once and remains fixed in this MVP. Draft pages are private; published pages are readable without signing in. Owners can edit or unpublish their own profile.

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