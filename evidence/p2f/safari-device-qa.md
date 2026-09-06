# Actual Safari / device coverage

2026-09-06 · macOS 26.6.2 (25G83), installed Safari 26.6.2 (21624.5.1.11.3).
Versions were read from installed plists. Native CUA targeted Safari, not Playwright's WebKit executable.
URL: `http://127.0.0.1:4178/`, title **Hero → Haegeum — P2F refinement**.

## Observed, and limits

- A fresh native Safari tab and then a separate QA window loaded the actual P2F page. The approved initial
  poster rendered, and the accessibility tree exposed the artist h1, instrument h2, ordered four h3/figure
  descriptions, skip link, MENU and explicit AI provenance.
- Keyboard page/arrow commands changed the native scrollbar. MENU/Esc commands changed native dialog state;
  a full menu surface was captured, but reliable animation settlement and focus restoration were **not verified**.
- CUA pointer/scroll actions repeatedly returned `Computer Use server error -10005: noWindowsAvailable`,
  including after Raise/Bring All to Front and moving the test tab into its own Safari window. The sampled
  visual/AX states did not establish a completed scroll choreography or menu close. This is **not a Safari pass**.
- Tool-controlled window visibility/throttling may be involved; the cause was not established. Do not label it
  a confirmed product bug or dismiss it as an environmental bug. A foreground manual Safari walkthrough is required.
- Native screenshots were emitted inline in the task. `webkit-*.png` in this folder are separate automated
  engine captures; they must never be relabelled as actual Safari/device screenshots.

No browser/OS preferences or security settings were changed. Existing unrelated tabs were preserved. A separate
P2F QA window was opened through Safari's own “Move Tab to New Window” command. Safari reduced-motion preference
behavior was not verified in the native application; Chromium/WebKit live media-preference tests cover the static
ARTIST → HAEGEUM order, 200% text, keyboard/skip and navigation contracts separately.

No physical iPhone/iPad/Android, VoiceOver output, browser-chrome touch gestures or sustained thermal test was
performed. Mobile evidence is viewport/touch-capability emulation, with native document scroll driven by wheel
or browser test input; it is not a physical-phone recording.

## Closeout checklist, before unqualified motion freeze

In a visible foreground Safari window: slow wheel/trackpad through all stages; reverse at head/bow/body/full entry;
rapid forward/back and pause; MENU during the full pullback; keyboard Option+Tab → MENU → Return → Escape with
visible restored focus; reduce-motion preference with ordered static figures. Record browser/window dimensions,
input method and evidence. Keep provisional-photo/physical-phone non-blocking items distinct from this incomplete
native Safari gate and from the user's final P2F visual approval.
