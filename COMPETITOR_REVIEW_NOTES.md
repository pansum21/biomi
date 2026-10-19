# BioMi competitor review scan — 19 Oct 2026

This is a product-planning scan of publicly visible reviews and review-platform summaries, not a statistically representative customer survey. Review volumes differ sharply, reviews can be self-selected, and some platforms aggregate features from a parent product. We only treat a repeated theme as a hypothesis to test, not as a fact about every customer.

## The ten competitors and review signals

| Competitor | Public review signal observed | What users value / friction that surfaced | Confidence |
|---|---|---|---|
| Linktree | G2 review page (96 reviews); Trustpilot page | Quick setup, simple editing, reliable link hub; reviewers call out generic/limited free-page styling, advanced analytics behind upgrade, and value as needs grow. | Medium–high |
| Beacons | Trustpilot showed 42 reviews, 2.0/5 during this scan | Users like its creator toolkit/value; complaints visible on the page include slow or absent support, plan/feature clarity, downgrade and domain transfer friction. | Medium; small sample and Trustpilot warns reviews may not represent users |
| Lnk.Bio | Trustpilot showed 69 reviews (84% five-star in the page snapshot); G2 review page | Easy to learn, breadth of useful buttons, affordable/free essentials; one visible report describes an automated account block after sharing a YouTube URL, suggesting appeals need a clear path. | Medium |
| Campsite.bio | Trustpilot and Reviews.io pages | Users praise design freedom, feeds/embeds, scheduling, analytics, email capture and sales tools. One older Trustpilot post describes a long wait for account-access support, so recovery/support needs should be treated as a watch item. | Medium; much of the positive evidence is from 2022 |
| Taplink | Product Hunt showed 316 reviews; Capterra/G2 pages also surfaced | Reviewers praise design control, fast setup, forms, videos, payments and messaging. A few caveats mention limited free/advanced analytics; some Capterra feedback asks for a blog feature. | Medium; Product Hunt sentiment is summarized by its own page and criticism is sparse |
| Milkshake | Apple App Store showed 4.9/5 from 15K ratings | Mobile ease, visual customization and multiple pages stand out. A user asks for desktop editing; another asks for extra business/nonprofit and payment features. | High for iOS sentiment, limited to Apple reviewers |
| Later Link in Bio | G2 Later Social reviews and Later help-center guidance | Users value its visual/social workflow and analytics; one review summary specifically asks for analytics down to each individual button. | Medium; broader Later Social reviews are not all about Link in Bio |
| Hopp by Wix | G2 says review volume is too low for buying insight; Trustpilot/Product Hunt pages | Easy, attractive setup is praised; evidence is sparse, so avoid drawing strong “users want X” conclusions from its ratings. | Low |
| Bio Sites by Squarespace | No robust product-specific review sample surfaced; parent Squarespace reviews are not a clean proxy | Its free, quick link page is a useful feature benchmark. Do not treat Squarespace’s general site-builder complaints as Bio Sites complaints. | Low |
| Stan Store | Trustpilot showed about 2,197 reviews and 4.7/5 | Strong creator commerce and a low-friction route from link to products/calls/memberships; isolated public complaints mention unclear total fees or support/payment resolution. | Medium; Trustpilot mix is broad and not link-page-specific |

## Product gaps that show up repeatedly

1. **More distinct page identity:** free color, font, photo and button options so pages do not look like the same template.
2. **Useful per-link reporting:** page views, each link’s clicks, click-through rate and time window; tell creators what is performing without forcing a large marketing suite.
3. **Clear value and control:** transparent feature/plan labels, backup/export, and an understandable way to change plans, move a domain or appeal an automated block.
4. **Works from phone and desktop:** mobile-first public pages plus a comfortable editor with a live preview.
5. **Blocks beyond a plain list:** sections, media embeds, forms, appointments and optional product links for users who need them.
6. **Fast, trustworthy public pages:** safe external links, responsive layout, accessible controls, and clear privacy for unpublished drafts.

These are direction signals from the review pages sampled, not a claim that all ten have the same defects.

## BioMi changes in this iteration

- Added an optional HTTPS profile photo URL; public pages fall back to initials when no image is set or the image fails.
- Added JSON backup export/import. Import keeps the existing username and publish state; the creator must explicitly save afterwards.
- Added six reusable color presets, eight gradient presets, live angle control, light/dark mode, solid/glass/outline button styles, three corner radii, and preview; public profile rendering uses saved style and radius.
- Published the dashboard and public profile pages through GitHub Pages; fixed a disabled signed-out auth form and removed stale theme-mode references that could stop dashboard initialization.
- Tightened Firestore schema validation for the new public avatar URL.
- Removed a decorative non-functional reorder control from each link row.

## BioMi self-rating today

**5/10 for launch readiness.** The deployed editor and public profile cover the basic job and have expanded theme controls, reorderable links, drafts and username URLs. Photo URLs and backup/restore improve profile ownership. Firebase, Email/Password auth, and GitHub Pages hosting are configured. The score stays mid-range because authenticated end-to-end flows have not been verified, the latest Firestore rules still need publishing before theme style/radius can save, Google sign-in awaits a chosen public support email, and there is no analytics, custom domain, content blocks/forms/store. This score rates the current repository build against the competitor baseline; it is not a rating of the idea.

## Best next priorities

| Priority | Work | Reason / dependency |
|---|---|---|
| 1 | Publish the updated Firestore rules and verify account creation, save, publish, public view, and unpublish end to end | Ensures new theme fields work under the production schema and tests the critical flow before adding features. |
| 2 | Link sections and social platform buttons | Improves scanning and gives creators a better multi-link page without pretending to be a full store. |
| 3 | More theme choices: typography and accessible contrast checks | Presets, gradients, button style, and corners are now in the editor; type choices and contrast validation remain. |
| 4 | Custom domain and predictable profile URLs | Portability and brand control; requires DNS verification and domain infrastructure. |
| 5 | Embed/form/product blocks | Add selectively after link editor and analytics are stable; payment handling adds operational and compliance work. |

## Sources checked

- Linktree G2 reviews: https://www.g2.com/products/linktree/reviews
- Linktree Trustpilot: https://www.trustpilot.com/review/linktr.ee
- Beacons Trustpilot: https://www.trustpilot.com/review/beacons.ai
- Lnk.Bio Trustpilot: https://www.trustpilot.com/review/lnk.bio
- Lnk.Bio G2: https://www.g2.com/products/lnk-bio/reviews
- Campsite Trustpilot: https://www.trustpilot.com/review/campsite.bio
- Campsite Reviews.io: https://www.reviews.io/company-reviews/store/campsite.bio
- Taplink Capterra: https://www.capterra.com/p/235736/Taplink/reviews/
- Taplink Product Hunt: https://www.producthunt.com/products/taplink/reviews
- Milkshake Apple App Store reviews: https://apps.apple.com/us/app/milkshake-website-builder/id1452719910?platform=iphone&see-all=reviews
- Later Social G2: https://www.g2.com/products/later-social/reviews
- Hopp by Wix G2: https://www.g2.com/products/hopp-by-wix/reviews
- Hopp by Wix Product Hunt: https://www.producthunt.com/products/hopp-by-wix/reviews
- Bio Sites product overview: https://linkinbiotools.org/tools/bio-sites
- Stan Store Trustpilot: https://www.trustpilot.com/review/stan.store

