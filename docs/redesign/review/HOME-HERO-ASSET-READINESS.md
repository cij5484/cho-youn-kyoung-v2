# HOME Hero asset readiness — P2C / P2D

2026-09-06 · **SOURCE IDENTITY RESOLVED / PROVISIONAL PROTOTYPE USE**.
The user supplied seven authentic purple-hanbok photographs and explicitly confirmed **attachment 3 → 7**.
P2B remains **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**. The user selected B — Bold Cropped as canonical; P2D composition is approved, motion locally verified, portraits provisional and final Retina quality PENDING HIGH-RES SOURCE. The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate.

## Source history and preservation

AGENTS, HANDOFF, MASTER, HOME V2.1, Design/foundation, Motion/navigation, Responsive, Performance,
Accessibility, implementation plan and Task Protocol were read for this bounded task. The initial clean baseline
is `d81bdbe0e18310abdd6c89f90682afde9716217d`; `.checkpoints/p2c-before-d81bdbe/` preserves its 211 files.
The first audit found 35 authentic legacy photos, but no identified matching purple side/back set. The
[historical checkpoint](../../../P2C-ASSET-READINESS-RESULT.md), [35-file inventory](../../../evidence/p2c/portrait-inventory.json)
and [contact sheet](../../../evidence/p2c/portrait-contact-sheet.png) remain unchanged. Legacy was read-only.

The subsequent user message resolved the source gate. The literal original-path placeholder in that message
was not a real camera-master location. The seven supplied clipboard PNGs are the verified working sources;
we do not claim they are camera originals. Bit-identical copies are retained in the ignored
`.checkpoints/p2c-assets-received/originals/`; supplied files were never overwritten.
[Provided-source provenance](../../../evidence/p2c/provided-portraits.json) records all dimensions, bytes and hashes,
the explicit user-confirmed pair, and separately encoded runtime derivatives.

## Native source audit

| Attachment | Native pixels / bytes | Fit and role |
|---|---|---|
| 1 | 1023×1537 / 1,708,854 | Complete rear full-body; generous gray surround, hem and floor present. Good other-scene/transition reference. Not used in the initial Hero or this runtime. |
| 2 | 1023×1537 / 1,909,587 | Closer rear view with instrument; alternate only. |
| **3** | **1023×1537 / 2,285,118** | **Initial:** side/back, partial profile facing left, upper-back purple texture. Little spare space above hair; right/bottom garment reaches the frame. A/C can retain more torso; B deliberately crops to shoulder/back and the crown meets the upper edge. Mobile needs its own crop, not a landscape extraction. |
| 4 | 1023×1537 / 2,190,335 | More revealing three-quarter face; alternate only, does not replace the chosen initial mystery. |
| 5 | 1024×1536 / 2,278,324 | Rear/instrument alternate; not selected for the continuity pair. |
| 6 | 1023×1537 / 2,372,760 | Tight face/shoulder profile; little crop room. Alternate only. |
| **7** | **1024×1536 / 2,288,564** | **First scroll:** three-quarter back, instrument and partial face. More upper room than 3; the left instrument axis must survive the crop. Hand/hem are outside this composition. Same outfit/session gives useful continuity, but head angle, shoulder and camera framing differ. |

All are opaque photographs on a shaded gray studio background, with fine hair and garment edges. None has
an approved transparent mask. A hard automatic silhouette or broad feather would damage those edges.
This prototype therefore uses a precise **photographic aperture**, with matching front/back type clipping;
it does not claim a foreground silhouette cutout. Authentic gray, purple texture and skin tones stay intact.

## Crop and continuity decision

A positions the photographic edge at 59% of the desktop frame, with two type crossings. B enlarges the photo
into a central/right field and crops the top intentionally. C uses a narrower left aperture with descending
name sizes. At 390/320px each has separate positions, type sizes and image framing. Photo 7 retains the
instrument in the tested first-scroll endpoints. P2C recorded these candidate crops; the user subsequently selected B. Final refinement/source quality approval remains separate.

A direct side-to-side replacement exposed a split face/body during the intermediate state. The final prototype
closes the image width around a common axis, changes the source at the closed aperture, then opens photo 7.
The type boundary follows that aperture and the two lines persist. Reverse scroll restores photo 3. This is
an editorial handover between authentic photographs, not a synthetic turning-person morph.

## Derivatives and remaining request

- Initial: 1023×1537 WebP, **303,928 B**; instrument: 1024×1536, **273,188 B**.
- Mobile alternatives: 640×962, **128,348 B**, and 640×960, **112,516 B**.
- Full pair: **577,116 B**, about **87.4% smaller** than the provided pair. Small pair: 240,864 B.
- Chromium canvas WebP quality .94, proportional resize only for the small variants. No master crop, retouch,
  recoloring, generated person, enlargement or source overwrite. CSS owns the reversible display crop.
- P2D moves these same bytes to `src/hero/assets/`, imported only by the development Hero Lab; they remain outside public assets/content registration. Source PNGs are not bundled.

The present inputs support valid A/B/C browser comparison. **Larger uncropped originals of 3 and 7 are requested
before final large/high-DPR image sign-off**, especially B at 1440/1920px and DPR2. Roughly 2400–3200px or more
on the long edge is useful, subject to actual crop quality; do not upscale these PNGs to pretend that detail exists.
An accurate layered mask is optional only if the selected next task needs silhouette intersections.
This follow-up source request does not block the current P2C comparison or reopen the resolved identity question.

Current implementation and refinement boundary: [Hero prototype guide](HOME-HERO-VISUAL-PROTOTYPE.md) and
[P2C result](../../../P2C-RESULT.md). **P2D result approved; high-resolution QA remains open and does not block authorized HOME work.**

## P2D additional folder audit — 42 files

The user supplied `/Users/joon/Downloads/gpt 보정` as a possible larger-source location. Finder showed 42 PNGs.
Direct file reads stalled; a normal Finder copy put audit-only working copies in ignored
`.checkpoints/p2d-before/source-audit/`. Originals were neither moved nor edited. No permission/system setting
was changed. [Inventory](../../../evidence/p2d/folder-inventory.json) records copied bytes, native dimensions and
SHA256; [contact sheet](../../../evidence/p2d/folder-contact-sheet.jpg) shows all 42. These are named second-pass
retouched PNGs, not verified camera masters. No new portrait is adopted or published.

Every file is **1023×1537 or 1024×1536**, approximately 1.57MP. No larger version of the selected pair was found.
No file hash matches either confirmed attachment. Closest useful visual candidates:

| Filename number | Inspection / crop room | Decision for selected B |
|---|---|---|
| (23), (24) | Left-facing 3/4 back with Haegeum; more top/left room and lower torso. Different instrument/head placement from attachment 7. | Useful alternative-source references, but no resolution gain; retain 7. |
| (47) | Strong shoulder close-up, sharp fabric/hair within its native 1024×1536. Face looks right, tight top/right room. | Opposite orientation from attachment 3; not a drop-in replacement. Do not mirror to force continuity. |
| (18), (20) | Full rear / rear with instrument, more background and full-length crop. | Other-scene references only; no implementation or migration. |

All retain gray studio backgrounds and fine hair/garment edges. None supplies an approved transparent mask.
They can support mobile/editorial exploration at suitable display sizes, but cannot settle B's 1920px/DPR2 detail.
The current 3→7 pair and its four WebPs remain unchanged. Request the **larger, least-cropped originals of the
previously attached 3 and 7**, preferably 2400–3200px or more on the long edge, for final scale inspection.
Current code/QA can proceed; high-resolution image sign-off remains open.
