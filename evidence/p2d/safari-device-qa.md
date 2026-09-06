# Actual Safari and device QA scope

2026-09-06, physical local Mac, macOS 26.6.2 (25G83), Safari 26.6.2 (21624.5.1.11.3),
`http://127.0.0.1:4177/?study=b` (query ignored; sole selected B). Native CUA controlled the actual Safari app.
Version values were read from installed application/system plists. No Safari/OS preference was changed.

Observed in Safari's existing desktop window:

- Initial Bold Cropped poster rendered with the portrait, Ivory/Ink clipped lettering, two lines, artist name and MENU.
- MENU opened to the native dialog; close button received focus. All five navigation links and KO/EN counterparts appeared.
- Native scroll over the content area brought in photo 7 with the Haegeum; reverse returned photo 3 without page overflow.
- Keyboard Option+Tab reached skip, artist link and MENU; MENU displayed its focus outline, Return opened the menu,
  Option+Tab moved to HOME and Esc ran the closing transition. After it completed, the native accessibility tree identified MENU as focused and the screenshot showed its visible focus outline.

Native screenshot evidence was emitted inline in the task for initial, opened menu, first scroll, reverse and
keyboard MENU focus. The `webkit-*.png` files are separate Playwright engine captures, not relabeled Safari screenshots.
Safari's default mouse click does not necessarily focus a button, so a mouse-opened dialog may restore the document.
Keyboard restoration is checked separately; do not infer it from the click-open sequence.

Automated Chromium/WebKit both check focus trap/keyboard restore, all six widths, 200% text, locale destinations,
reduced-motion live changes, late/failed image and font fallback, stable viewport geometry, large-jump/reverse
closed-frame continuity and idle RAF. macOS WebKit uses Option+Tab link traversal per
[Apple's preference documentation](https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks).
This preserves real keyboard assertions without changing system settings or adding a website key handler.

Not verified: a physical iPhone/iPad or Android device, mobile Safari address-bar gestures, touch hardware,
VoiceOver/screen-reader walkthrough, prolonged thermal/GPU behavior, older Safari versions or production CWV.
The installed developer toolchain is Command Line Tools; no iOS simulator/device session was used.
Desktop Safari smoke and WebKit automation do not close those gates or confer final Quality Approved status.
