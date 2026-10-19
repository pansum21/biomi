# BioMi Firebase setup (MVP)

This branch adds email/password and Google sign-in, Firestore-backed profile drafts, username-based public profile URLs, and owner/public read rules. It uses the modular Firebase Web SDK from the official CDN. It does not use a custom server or store payment/private contact data.

## Configure the Firebase project

1. Create a separate Firebase project for BioMi so it stays isolated from other apps.
2. Add a Web app in Project settings. Copy its config into `firebase-config.js`; this file contains public client identifiers, not an Admin SDK secret.
3. In Authentication, enable Email/Password and Google providers. Add the GitHub Pages domain `pansum21.github.io` under authorized domains.
4. Create a Cloud Firestore database.
5. Deploy `firestore.rules` from this repository using the Firebase CLI or paste the rules into the Firestore Rules tab and publish them.
6. Publish the GitHub branch or deploy the same files to the chosen web host. Open `dashboard.html`, create an account, save a draft, then publish it.

The public URL format is `https://<host>/profile.html?u=<username>`. The username is claimed once and remains fixed in this MVP. Draft pages are private; published pages are readable without signing in. Owners can edit or unpublish their own profile.

## Firestore profile shape

`profiles/{username}` contains `slug`, `ownerUid`, `displayName`, optional public `avatarUrl`, `bio`, `location`, `links`, `theme`, `published`, and `updatedAt`. Do not add email addresses or other private fields to this public profile document. The avatar field accepts an HTTPS image URL; it does not upload a file.

## Verification checklist

- Create account and sign in; the same profile loads after a refresh.
- Two different accounts cannot claim the same username.
- An unauthenticated visitor can read a published profile and cannot read an unpublished profile.
- A signed-in owner can edit and unpublish their profile; another account cannot change it.
- Links reject non-web protocols in the editor and public page.
- Profile photos load only from HTTPS URLs and fall back to initials if the image fails.
- Export a JSON backup, import it, save it, and confirm the username and publish status are preserved.

The dashboard and public page show setup guidance until real Firebase web app config and Firestore rules are installed. Cloud Storage avatar upload is deferred: current Firebase docs require the Blaze plan for Cloud Storage on new projects.

