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
Comparison URL contains all actual options. Promotion copy contains only the two promotable choices.

Registry: `portrait` = off/straight/hanji and `magnet` = boolean are promotable. Existing points/janggu/type/color
comparisons remain non-promotable. debug/study/diagnostics/panel state are not promotion keys. Compact Profile is
part of portrait mode; no misleading independent control.

Copy **배포 후보 설정 복사** and save that exact payload as `preset.json`, then:

```sh
npm run experience:promote -- preset.json --check
npm run experience:promote -- preset.json
```

An inline JSON argument is also accepted. Envelope:

```json
{"schemaVersion":1,"kind":"experience-promotion","options":{"portrait":"hanji","magnet":true}}
```

The deterministic CLI rejects unknown/missing keys, version/kind/value errors and non-promotable keys. It prints
old→new differences and changes only Canonical config. `--check` never writes. Commit/CI/PR/deployment are separate
explicit operations; no frontend token or direct GitHub write. To deliver a browser selection, provide the copied
payload or comparison URL (browser-local storage is not synchronized across devices). No need to re-explain options.
