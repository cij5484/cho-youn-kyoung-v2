# P2D visual and device evidence

2026-09-06. Single selected B; no new A/B/C comparison. [Result](../../P2D-RESULT.md) and
[canonical guide](../../docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md) define scope and open approval gates.

| Evidence | Actual environment/state |
|---|---|
| [Desktop initial](desktop-b.png) / [1920 wide](b-1920.png) | Chromium, 1440×1000 / 1920×1080 |
| [Wide DPR2](b-wide-dpr2.jpg) | Chromium, 1920×1080 CSS / 3840×2160 capture. Source limit is intentionally visible; not upscaled source detail. |
| [Pointer depth](b-pointer-depth.png) | Different layer responses, actual pointer input |
| [Aperture intermediate](b-aperture-intermediate.png) / [First scroll](b-first-scroll.png) | Actual running native scroll, 3→7 |
| [Normal-speed recording](b-desktop-realtime.webm) | Chromium input/depth/forward/reverse/menu; no paused timeline, artificial slowdown or stitched stills |
| [Menu over Hero](b-menu-open.png) | Frozen Bold menu open |
| [390 initial](mobile-b-390.png) / [390 first scroll](b-mobile-first-scroll.png) / [390 menu](b-mobile-menu-open.png) | Chromium touch/mobile/DPR2 emulation; CSS-scale screenshots, not a physical phone |
| [320 initial](mobile-b-320.png) / [200% text](b-320-text-200.png) | Narrow fallback and enlarged-text document order |
| [Tablet](b-768.png) / [Landscape tablet](b-1024.png) | Chromium 768×1024 / 1024×768 |
| [Reduced motion](b-reduced-motion.png) | Chromium preference emulation, complete static poster |
| [WebKit desktop](webkit-b-1440-initial.png) / [390](webkit-b-390-initial.png) / [320](webkit-b-320-initial.png) | Pinned Playwright WebKit 26.6, supplementary engine coverage |
| [WebKit intermediate](webkit-aperture-intermediate.png) / [First scroll](webkit-first-scroll.png) / [Reduced](webkit-reduced.png) | Same assertions and composition in WebKit |
| [Folder contact sheet](folder-contact-sheet.jpg) / [Inventory](folder-inventory.json) | All 42 additional PNGs: dimensions/hashes from normal Finder working copies; originals untouched |
| [Derivative provenance](portrait-provenance.json) | Same approved 3→7 pair, four unchanged WebPs moved to src/hero/assets |
| [Full gate log](full-gate.txt) / [Hero test results](hero-test-results.json) | Full local run: 38 Node + 84 route + 11 foundation + 26 navigation + 44 Hero |
| [Local performance](local-performance.json) | Unthrottled development Chromium, no video during measurement; not production CWV or physical-phone performance |
| [Native Safari observations](safari-device-qa.md) | Actual installed Mac Safari via native UI; screenshots shown in the task, separate from the WebKit files above |

Final [verification manifest](hero-refinement.json) records file hashes, preserved baseline, production exclusion,
checks and remaining QA. Final visual refinement approval and high-resolution/physical-phone sign-off remain open.
