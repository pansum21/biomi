# BioMi Firebase setup (MVP)

BioMi now has a dedicated Firebase project, a registered Web app, a standard Cloud Firestore database in Delhi (asia-south2), and published production-mode Firestore rules. The project is on Firebase Spark (no-cost). Email/Password sign-in is enabled, and `pansum21.github.io` is an authorized domain. Optional Gemini and Google Analytics were left off.

The dashboard uses the modular Firebase Web SDK from the official CDN. It stores public profile data only and does not use an Admin SDK secret or a custom server for this MVP.

## Firebase project

- Project ID: `biomi-9ef92`
- Web app nickname: `BioMi Web`
- Firestore: Standard edition, default database, `asia-south2` (Delhi)
- Firestore rules: published in production mode from `firestore.rules`
- Authentication: Email/Password enabled; `pansum21.github.io` authorized
- Google sign-in: not enabled. Firebase requires a public-facing project name and support email for that provider. The dashboard only shows configured sign-in methods until the owner chooses an email address to publish as the support contact.
- Analytics, scheduled database backups, Cloud Storage uploads, and paid billing: not enabled

The Firebase Web SDK config is in `firebase-config.js`. Firebase client config values are public identifiers, not Admin SDK secrets. Access control is enforced by Firestore rules.

## Deploy and use the MVP

1. Open the deployed dashboard at `https://pansum21.github.io/biomi/dashboard.html`.
2. Create an account with email/password, save a draft, then publish to get `https://pansum21.github.io/biomi/profile.html?u=<username>`.
3. Publish the latest repository `firestore.rules` in Firebase Console before saving themes with button style and corner radius. The earlier live rules only allow the original color/mode fields.

The username is claimed once and remains fixed in this MVP. Draft pages are private; published pages are readable without signing in. Owners can edit or unpublish their own profile.

## Firestore profile shape

`profiles/{username}` contains `slug`, `ownerUid`, `displayName`, optional public `avatarUrl`, `bio`, `location`, `links`, `theme`, `published`, and `updatedAt`. The theme stores colors (`a`, `b`), angle, mode, and optional button style (`solid`, `glass`, `outline`) and radius (`3px`, `9px`, `16px`). Do not add email addresses or other private fields to this public profile document. The avatar field accepts an HTTPS image URL; it does not upload a file.

## Verification checklist

- Create account and sign in; the same profile loads after a refresh.
- Two different accounts cannot claim the same username.
- An unauthenticated visitor can read a published profile and cannot read an unpublished profile.
- A signed-in owner can edit and unpublish their profile; another account cannot change it.
- Links reject non-web protocols in the editor and public page.
- Profile photos load only from HTTPS URLs and fall back to initials if the image fails.
- Export a JSON backup, import it, save it, and confirm the username and publish status are preserved.

The dashboard buttons and theme controls were checked on GitHub Pages, but the authenticated browser checks above still need to run against Firebase. The latest rules are in GitHub and must be published to Firebase Console before style/radius saves will pass. Cloud Storage avatar upload and scheduled database backups require upgrading to Blaze; BioMi remains on Spark.