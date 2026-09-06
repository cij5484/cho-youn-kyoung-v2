# HOME Hero — canonical Bold Cropped refinement

2026-09-06 · P2C **B — Bold Cropped APPROVED AS CANONICAL VISUAL DIRECTION**.
P2D is user approved. Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**. The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate.
Owners: [HOME V2.1](../04-HOME.md), [P2A foundation](DESIGN-SYSTEM-FOUNDATION.md),
[frozen Bold navigation](EDITORIAL-NAVIGATION-PROTOTYPE.md), [Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md).
[Asset audit](HOME-HERO-ASSET-READINESS.md) owns source readiness; [P2D result](../../../P2D-RESULT.md) owns validation.

## Approved selection and boundary

The user approved P2C and selected B. A/C remain immutable [P2C evidence](../../../P2C-RESULT.md), not runtime
variants. `BoldHero` has no composition prop, query reader or mode selector. Former `?study=a/c` links render B.
`/` and `/en/` share B; destination routes remain neutral locale/navigation fixtures. No translation is authored.
The standalone Lab remains localhost-only, noindex/nofollow, without canonical/OG/hreflang publication tags.
It rejects its own build; both real production static hosts exclude the Hero and its photos. No public HOME is wired.

```sh
npm run dev:hero
# http://127.0.0.1:4177/
# http://127.0.0.1:4177/en/
npm run test:hero
```

Stop any manual server on 4177 before tests. The suite owns its own server and refuses stale-server reuse.
Full runs the same 22 Hero cases in Chromium and WebKit; CI installs both. WebKit is supplementary engine QA,
not a substitute for actual Safari or a physical iPhone. No npm dependency or lockfile change.

## Module and composition

`src/hero/BoldHero.tsx` owns the reusable selected Hero, with a required `continuationId` scroll-link target.
Its controller, motion math, CSS and four optimized photos live beside it. It imports no Lab code. `labs/hero`
owns only the review boundary, locale fixtures and test entry. P2B source and P2A tokens/fonts remain unchanged.

The three-line Cormorant Garamond name defines the poster grid. Ink back and Ivory front lettering share exact
positions and a photographic clipping boundary. One semantic h1 identifies the artist; decorative copies are
hidden from assistive technology. This is a photographic aperture, not a claimed silhouette mask.

- Desktop: photograph begins at 26.5% and fills the right edge. CHO begins just outside the left edge; YOUN
  starts at 28.5%; KYOUNG returns to the left edge. Type size is constrained by width and stable viewport height;
  separate tracking/row offsets protect glyph separation. The crown crop and large shoulder retain B's presence.
- Two accent hairlines span from 10% to 94%, at approximately −10°, crossing the shoulder/type field. Their
  small spacing tightens as the aperture closes. They remain structural lines, without audio/wave behavior.
- Mobile below 640px: photo field 14%–100% wide, 15%–88% high; CHO/YOUN/KYOUNG use 31/30/24vw with their own
  positions. Hairlines cross lower at approximately −14°. The face, shoulder and first-scroll instrument remain
  visible at 390/320px; no fine-pointer motion. Insets leave navigation and footer labels their own space.
- A tall wrapped header at enlarged text switches the poster to readable document order. It does not hide
  identity, navigation or photograph to preserve a fixed screenshot.

The first frame remains immediately visible, preserving the reviewed poster and avoiding a load-dependent
entrance. The broader HOME short masked entrance remains a separate unresolved final integration detail;
P2D does not claim that every HOME motion contract is finished.

## Scroll continuity and resilience

Native scroll owns a short sticky interval: desktop clamp(320px, 48svh, 600px), mobile clamp(280px, 44svh, 400px).
Both scene and stage measurements use stable viewport geometry; dynamic browser-toolbar height is not used as
an inconsistent progress denominator. Type, portrait and hairlines have separate modest depth responses.

A 90ms exponential settling response follows scroll input. A jump crossing the midpoint lands on one completely
closed aperture frame before reopening the other portrait; reverse exchange may change source on that closed
frame. Tests inspect both directions, including a near-full-interval jump, and require a genuinely closed frame.
There is no wheel interception, scroll snap, forced dwell or navigation replacement. Reversing input immediately
changes the target. The same photo/type aperture opens around its 55/45 axis without a split face or crossfade.

Only active settling requests RAF. It stops at rest and offscreen, cancels while the document is hidden, and
cleans listeners/observers on unmount. Fine-pointer layers settle separately; opening the native menu resets
pointer offsets. No motion library, render loop, canvas renderer, 3D or permanent will-change is added.

A missing secondary photo keeps photo 3 and an open aperture. A late download during deep scroll waits until
returning to the initial portion before enabling exchange, so it cannot suddenly replace a stationary portrait.
Primary-photo failure leaves a readable Ink name and functional menu. Font failure retains readable identity.
Reduced motion is a complete static photo-3 poster, with no sticky extension, source exchange or pointer depth;
preference changes apply live. The future instrument scene is not implemented by this two-photo exchange.

## Navigation and accessibility

P2B retains X+3px / Y±7px Letter Slip, 300ms / 20ms stagger, 500ms diagonal Ivory opening / 400ms reverse close,
MENU/CLOSE mask, index emphasis, no selected underline, no hover-open. Hero-local CSS supplies a transparent
header and Ink trigger; P2B has no new mode or morph. The name and MENU remain fixed, with no invented vertical links.

Keyboard skip, focus visibility, dialog trap, Esc/restore, touch targets, scroll unlock and semantic counterpart
are covered by the integration suite. The EN root check caught and fixed a Lab `normalizePath('/en/')` mismatch;
production locale helpers and routes were unchanged. On macOS WebKit, keyboard tests use Option+Tab to traverse
links with the default platform preference, per [Apple's WebKit preference contract](https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks).
The same focus assertions remain; no website keyboard hack or system setting change was introduced.

## Evidence, QA and STOP

[P2D evidence](../../../evidence/p2d/README.md) separates Chromium/WebKit automation, actual Mac Safari observations,
and unperformed physical-mobile QA. P2C comparison files are preserved byte-for-byte.
[Folder inventory](../../../evidence/p2d/folder-inventory.json) records the 42 further supplied PNGs. They are all
about 1.57MP and provide no higher-resolution replacement. Keep the confirmed 3→7 pair; do not upscale or mirror
an alternate to manufacture resolution or continuity. Larger originals remain necessary before final Retina sign-off.

The historical P2D report ended at review/STOP. The user subsequently approved its result and authorized
logical commit / main push / Fast CI, followed only by P2E Hero→Haegeum prototype. No deployment, SOUND,
other HOME scene, content migration, 3D or automatic following task. Source and physical-device QA remain open.
