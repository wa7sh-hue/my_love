# For You, Always

A responsive, gothic love-letter website with a black rose emblem, black rose photography, warm ivory serif typography, dusty-rose accents, arched borders, and subtle entrance animations. Built with static HTML, CSS, and vanilla JavaScript; no build step or backend required.

## Pages and flow
- `index.html`: “Do you love me?” Yes opens the writing page. Every click on No moves that button to a different visible viewport position, avoiding the Yes button.
- `why.html`: “Why do you love me? Give me details.” Required, whitespace-validated text area; Next opens the official question.
- `official.html`: “Do you want to make this official?” Both answers stay still and are freely available.
- `promises.html`: “Some info on me before you do this.” Six numbered, affectionate promises, including respect for personal space and receiving shared pain with care.
- `poem.html`: Large sad emoji and the user's original nine-line poem, preserved verbatim.
- Every subsequent page offers a back link. The logo returns home.

## Implementation
- `css/style.css`: responsive design, desktop side-by-side and mobile stacked layouts, reduced-motion support.
- `js/main.js`: shared page rendering, page titles, moving button, textarea validation, and draft persistence.
- `assets/rose-mark.svg`: custom vector black rose logo/favicon.
- `assets/black-rose.jpg`: locally downloaded black rose photograph. Source: Public Domain Pictures, https://www.publicdomainpictures.net/en/view-image.php?image=25695&picture=black-rose (found through CC/public-domain-filtered image search).
- Fonts: Cormorant Garamond and Manrope from Google Fonts, with system fallbacks.

## Storage and privacy
Only the writing-page draft is stored, in `sessionStorage` under `blackRose.loveAnswer`. It remains in that browser tab's session for back navigation and refreshes. No form answers are transmitted, emailed, or available to the site creator. No database, analytics, authentication, or file upload features. If browser storage is unavailable the flow still works, without draft persistence. Text is assigned through the textarea value property, never interpolated into HTML.

## Verification
`tests.html` / `js/tests.js` run an iframe integration test against the actual pages. The test verifies twelve consecutive No-button movements and viewport bounds, Yes navigation, empty and whitespace-only validation, Next navigation, both official choices, six ordered promises, sad emoji, and all nine poem lines. All tests passed in the preview browser. Tests do not write synthetic answers into session storage.

Desktop and mobile screenshots were inspected for landing/form/promises/poem layout, text readability, rose imagery, overflow, and raw-code leaks. The preview platform may log iframe sandbox warnings during test runs; there were no application test failures on the final run.

## Publishing and remaining work
Entry path: `index.html`. No production deployment has been requested or performed; no public production URL is available. Ready for an explicitly authorized deployment. Answer delivery to the owner would be a separate feature requiring consent and appropriate storage/access design; it is not implemented or implied by this version.
