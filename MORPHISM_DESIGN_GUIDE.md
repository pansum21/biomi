# BioMi morphism design guide

Updated: 2026-10-20

## Decision and evidence

BioMi exposes seven optional profile surfaces: Glassmorphism, Watermorphism, Neumorphism, Claymorphism, Aurora-morphism, Holomorphism, and Skeuomorphism. These names describe visual treatments, not a ranking backed by comparable ratings.

No comparable Google Review scores were found for these design styles or the three inspiration tools. Reddit discussions provide qualitative, non-representative feedback: users describe neumorphism as attractive but sometimes impractical for usability, and warn that glass effects can create accessibility and performance costs. Treat these comments as design cautions, not as votes or market-wide preference data.

- Reddit, “Did anyone actually build real websites with neumorphism when it was popular?” https://www.reddit.com/r/webflow/comments/1rmq36d/did_anyone_actually_build_real_websites_with/
- Reddit, “What do you think about glass UI/effect?” https://www.reddit.com/r/UXDesign/comments/1rstw9q/what_do_you_think_about_glass_uieffect/
- Reddit, “Glassmorphic in practice” https://www.reddit.com/r/FigmaDesign/comments/1qqhyen/glassmorphic_in_practice/
- Neumorphism generator: https://neumorphism.io/
- Hype4 glassmorphism generator: https://hype4.academy/tools/glassmorphism-generator
- Uiverse component library: https://uiverse.io/

## BioMi product choice

Offer all seven looks as theme choices. The visual starting point uses restrained Glassmorphism with solid, high-contrast link surfaces. Aurora and Clay are strong expressive alternatives because they add color and depth while leaving link labels on calm surfaces. This is a design recommendation from the available qualitative feedback, not a verified popularity ranking. Keep Neumorphism as an opt-in because soft shadows alone can make controls hard to identify.

## Rules for future updates

1. Keep labels readable on every profile background. WCAG 2.2 AA calls for at least 4.5:1 contrast for normal text and 3:1 for large text.
2. Keep a visible keyboard focus indicator; visual effects and shadows do not replace it.
3. Do not communicate button/link state through shadow or color alone; use labels, outlines, and clear pressed/hover states.
4. Use blur sparingly and preserve a mostly opaque surface behind text.
5. Keep effects lightweight, responsive, and static when reduced motion is requested.
6. Apply the selected profile morphism consistently to link buttons, icons, avatar framing, and page backdrop. Preserve the user's chosen palette, gradient, mode, and corner radius when possible.
7. Offer Square, Sharp, Rounded, and Capsule for link cards; Circle applies to the compact link icon so labels remain visible. Provide Auto, White, Charcoal, Accent, and Gradient button colors; derive Accent and Gradient from the selected theme palette and adjust foregrounds for contrast.\n8. User-facing choices stay optional; do not automatically impose the effect on a profile that already has saved theme settings.

Accessibility references:
- WCAG 2.2 Understanding Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 Understanding Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

## Future feedback loop

When real BioMi usage data becomes available, compare style selection and link engagement by style with privacy-conscious aggregate analytics. Use actual user feedback and performance data to revise the recommendation; do not infer popularity from visual preference alone.
