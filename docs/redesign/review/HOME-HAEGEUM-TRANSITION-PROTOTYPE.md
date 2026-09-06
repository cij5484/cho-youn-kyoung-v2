# Hero → Haegeum — continuous transition prototype

2026-09-06 · P2E · **VISUAL DIRECTION APPROVED / CANONICAL**. One bounded prototype, not the complete HOME.
Owners: [HOME §§5–6](../04-HOME.md), [Motion](../03-MOTION-SYSTEM.md), [Responsive](../11-RESPONSIVE.md),
[Accessibility](../13-ACCESSIBILITY.md), [Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md).
[Approved Hero](HOME-HERO-VISUAL-PROTOTYPE.md) and frozen navigation are the starting point.

## Architecture and scope

`src/hero/BoldHero.tsx` exports its same `HeroPoster` DOM. The standalone approved Hero still uses the original
controller defaults and CSS. `src/haegeum/HaegeumExperience.tsx` composes that poster with incoming imagery and
four semantic perspectives. Its immutable continuation adapter supplies framing to the same native controller.
It is a module extension, not a user-selectable production mode. There is no A/B/C or Bold/Refined selector.

A single sticky stage has **155svh of native travel**, including the outgoing Hero and photo 3→7 exchange.
It does not append P2D's separate 48svh interval or create four additional pins. Normal document scrolling,
wheel/touch/keyboard interruption and reverse are retained. No wheel handler, scroll smoother, snap, forced dwell,
canvas/WebGL/audio or motion dependency. Frame requests end at rest; source exchange still crosses a closed frame.
Pointer response settles away as typography exits, leaving the instrument's alignment governed by scroll.

```sh
npm run dev:haegeum
# http://127.0.0.1:4178/ or /en/
npm run test:haegeum
```

Stop manual port 4178 before tests. The test server refuses reuse. This Lab is localhost-only, noindex/nofollow,
without publication metadata/public directory; its own build rejects. Root/project production route and payload
exclusion are tested. Public HOME is not mounted. `4177` remains the standalone approved Hero review command.

## One changing composition

The original three name rows separate at different rates while the portrait plane changes crop and leaves
negative space. Their Ink/Ivory relationship passes to one stage keyword. The same two line elements persist
through every stage, rotating/alignment-changing near the real subject. They remain almost straight; there is
no simulated playback, free oscillation or claim to measure physical vibration.

| Stage | Spatial continuity | Current imagery / status |
|---|---|---|
| HEAD / PEG · LINE | Photo 7 remains in the Hero's original plane; its side/back field narrows as type moves out. The pair aligns beside the visible strings below the pegs. | Authentic confirmed attachment 7; provisional resolution |
| STRINGS / BOW · TENSION | The photographic opening spreads horizontally along the bow guide as the portrait field leaves; the current keyword is mask revealed. | Supplied real playing photo (37); actual bow/string contact |
| RESONANCE | The **same playing image** changes focal position/scale toward the body. The two guides reorient with that detail. | Actual visible resonator material, not generated macro; visibly soft at large desktop scale |
| FULL HAEGEUM | Body field and guide hand over to a vertical reveal; the full object resolves beside large typography. | User-confirmed AI-generated beige reference; visible and semantic disclosure, **PROVISIONAL / NOT DOCUMENTARY** |

Only the current keyword is visible in normal motion. Its own mask closes/opens around boundaries. No global
scene opacity crossfade is used. Desktop photo/type boundaries share framing; final beige image uses Ink lettering
for legibility. The initial approved B frame is preserved. Full-stage AI provenance is visible, not only hidden in docs.

Mobile below 640px has separate crop boxes, focal targets, image scales, line coordinates and type positions.
Keywords occupy upper breathing room; the bow keeps its horizontal contact inside the vertical page. There is no
pointer effect or desktop foreground-lettering mask. 390px is primary, 320px is checked separately.

## Meaning, failure and accessibility

There is one semantic artist h1, an h2 for the instrument and four ordered h3/figure/alt descriptions. Decorative
motion copies are aria-hidden, without scroll-driven live announcements. English stage keywords remain the only
normal-motion scene copy; no invented historical or Korean explanatory content is authored.

Reduced motion removes the sticky extension and shows four static perspectives in reading order after the Hero.
Text enlargement uses the Hero's reflow condition; long static headings wrap without page overflow. Failed
continuation images or missing imagery encountered after entry select the static sequence. A late download does
not pop into the moving plane; the fallback remains for that mounted visit. Alt text and navigation remain available.

A scroll-linked Ivory header surface protects the artist name/MENU as photography crosses them; its initial opacity is zero. P2B source remains unchanged.

MENU retains frozen Bold motion, keyboard dialog trap, Esc/restore and scroll unlock. KO/EN use existing semantic
counterparts, no new translations. The focus-revealed skip link targets a focusable prototype boundary. Lab pathname
changes reset route focus; hash changes do not remount/reset the entire experience.

## Source audit and requests

[Provenance](../../../evidence/p2e/asset-provenance.json) records native dimensions, bytes and hashes. Original inputs
and the prior 42-file inventory stay unchanged. Only two new WebP derivatives are imported by this Lab: real
playing (37), 315,796 B; AI editorial reference, 64,914 B. Both stay at 1024×1536. No source is upscaled, retouched,
mirrored or overwritten. The multiview sheet is reference only, not runtime and not verified physical geometry.

| Requested source | Composition / capture needed | Why / gate |
|---|---|---|
| Actual full instrument, same instrument as portraits | Neutral ivory/beige or clean background; head, pegs, both strings, bridge/body/base fully uncropped; straight or slight 3/4 angle; separate bow included as an additional frame | Replace disclosed AI final reference before documentary/final asset approval |
| Head / peg macro | Same side as attachment 7, full head + both pegs; leave space around protrusions; roughly 2400px+ long edge, preferably original camera file | Protect detail at wide/DPR2 and allow a tighter structural crop |
| Strings / bow contact macro | Real playing relationship, both strings and bow hair visible around contact; horizontal room on both sides; do not stage an anatomically incorrect intersection | Replace ~1024px full-body source crop; preserve true bowed-string relation |
| Resonator macro | Front membrane/bridge contact and 3/4 lacquer/wood body, diffuse light, no hand covering the key surface | Real material quality at desktop macro scale; no fabricated surface detail |
| Hero 3 / 7 larger originals | Least cropped originals, preferably 2400–3200px+ long edge, same confirmed identity | Previously pending Hero Retina QA; **does not block other approved HOME work** |

The generated beige reference resolves the planning-image identity, not the authentic isolated-photo requirement.
User confirmed it is AI generated. Its appearance cannot validate strings, hardware, material or dimensions.
Current real photos prove the prototype's reference relationship; final photographic quality remains open.

## References researched

- [Codrops: image expansion within typography](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/): adopt the principle that imagery changes the space occupied by typography. Here three name rows yield at different rates to the peg/bow field.
- [Codrops: layered zoom on scroll](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/): study coordinated masking, depth and a shared progress signal. Here actual instrument focal points and persistent paired guides own the geometry.

Articles and demo descriptions were researched. No claim of exhaustive reference-site/device review. No exact
layout, composition, timing, branding, assets or source code was copied. Their GSAP/smoother stack was not adopted;
P2E uses native scroll and the existing RAF controller. No new AI image was generated in this task.

## Review boundary

[Result](../../../P2E-RESULT.md) and [evidence](../../../evidence/p2e/README.md) own final test/environment findings.
The user approved P2E visual direction after its recorded report/STOP. P2E delivery is authorized; P2F refinement/quality/device QA is the only next bundle after successful delivery. Physical mobile, complete Safari device walkthrough,
real macro/isolated-photo replacement and final motion polish remain distinct. No SOUND, WORKS, Album 3D,
Performance/About, Blender/Haegeum model, content migration, production domain, deployment or next phase.
