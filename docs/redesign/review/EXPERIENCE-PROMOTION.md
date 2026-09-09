# Experience Canonical / Draft / Promotion

2026-09-08. Canonical owner: `src/home/experience/canonical.json`; schema/registry in the same directory.
The user selected Hanji + Compact Profile and 03/06 Scene Magnet. `HomeExperience` mounts formal HOME owners;
`DevelopmentTools` is UI-only. Existing Outro/Hover/Scene Index are mandatory features, not invented selectable flags.

| Visit | Values |
|---|---|
| Ordinary URL or `?dev=0` | repo Canonical only |
| `?dev=1` (legacy compare/all supported) | valid explicit URL > saved Draft > Canonical |

`cyk:v2:experience-draft:v1` stores only the versioned complete options envelope. No scroll/audio/DOM state,
paths, private data or panel state. Invalid/mismatched/blocked storage falls back safely; normal visits ignore it.
The panel shows deployed and selected values with differences. A choice auto-saves. Load restores storage;
reset writes Canonical to Draft; exit disables overrides without deleting the draft or disabling Canonical.
Comparison URL contains all actual options. Promotion copy contains only the three promotable choices.

Registry: `portrait` = off/straight/hanji, `magnet` = boolean, and `worksLayout` = current/atmospheric-depth/image-rotations/webgl-editorial are promotable. Existing points/janggu/type/color
comparisons remain non-promotable. debug/study/diagnostics/panel state are not promotion keys. Compact Profile is
part of portrait mode; no misleading independent control.

Copy **배포 후보 설정 복사** and save that exact payload as `preset.json`, then:

```sh
npm run experience:promote -- preset.json --check
npm run experience:promote -- preset.json
```

An inline JSON argument is also accepted. Envelope:

```json
{"schemaVersion":1,"kind":"experience-promotion","options":{"portrait":"hanji","magnet":true,"worksLayout":"current"}}
```

The deterministic CLI rejects unknown/missing keys, version/kind/value errors and non-promotable keys. It prints
old→new differences and changes only Canonical config. `--check` never writes. Commit/CI/PR/deployment are separate
explicit operations; no frontend token or direct GitHub write. To deliver a browser selection, provide the copied
payload or comparison URL (browser-local storage is not synchronized across devices). No need to re-explain options.


## WORKS extension — 2026-09-09

Ordinary `/works/` and `?dev=0` retain `worksLayout: current`. The three Three.js prototypes are opt-in via
`/works/?dev=1&worksExperience=atmospheric-depth|image-rotations|webgl-editorial` (choose one literal value). Their shared page uses the same registry, Draft, URL precedence and promotion CLI.
The Korean comparison panel shows only WORKS choices on this route. Changing/resetting/exiting a WORKS comparison
preserves the archive's `type=albums|performances` filter. That filter is distinct from HOME's legacy `type=a|b`.

The additive v1 Draft migration accepts the exact previous six HOME keys and supplies `worksLayout: current`;
it neither discards saved HOME choices nor mutates the incoming payload. Unknown/missing other keys still fail.
New promotion payloads include all three promotable keys. Candidate selection/storage/copy does not edit canonical.json.
No automatic promotion: visual approval and explicit CLI application/delivery remain separate user decisions.

Page-scoped candidate copy includes all required keys, but sets the other page's values to Canonical: copying
WORKS cannot accidentally promote hidden HOME drafts, and copying HOME cannot promote a hidden WORKS candidate.
Page-scoped reset preserves the other page's saved choices.

The visually rejected `spatial-helix`, `z-depth`, `wave-path`, and `stack-flow` Draft values migrate to `current`,
preserving every HOME choice. They are no longer valid URL/promotion values. Internal registry key remains
`worksLayout`; public query key remains `worksExperience`. Valid candidates are the three new independent
engines, with Korean labels A · 공간 깊이 / B · 이미지 회전 / C · WebGL 에디토리얼.
The legacy `works` query alias accepts valid current values only. Serialization uses the preferred key; exit
removes both. Candidate switching unmounts the previous engine before mounting the selected module, retaining
native scroll position where the new content geometry allows. Each engine owns its renderer/RAF/listener cleanup.
Ordinary visits still ignore saved Draft and candidate queries. No candidate is automatically promoted.
