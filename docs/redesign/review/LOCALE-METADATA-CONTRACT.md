# P0D — KO / EN Routing + Metadata Contract

2026-09-05 · IMPLEMENTED / locally verified · React Router + Static Prerender remains APPROVE.
Scope: neutral fixtures and reusable contracts only. P0F status annotation: this contract remains unchanged; P0E CI/live integration passed and was approved. Current evidence is in [P0E result](../../../P0E-RESULT.md), task status in [HANDOFF](../../../CODEX-HANDOFF.md).

## URL and semantic identity

Korean is the unprefixed default. English uses `/en`. There is no `/ko` alias, language cookie,
browser-language redirect, or state-only language switch. Both languages have separate static documents.

| Semantic page | KO logical URL | EN logical URL |
|---|---|---|
| HOME | / | /en |
| WORKS | /works | /en/works |
| ALBUMS | /albums | /en/albums |
| PERFORMANCES | /performances | /en/performances |
| Album detail | /album/:id | /en/album/:id |
| Performance detail | /performance/:id | /en/performance/:id |
| MEDIA | /media | /en/media |
| ABOUT | /about | /en/about |
| CONTACT | /contact | /en/contact |

The fixtures use only `test-album` and `test-performance`. `key` identifies a semantic record;
`koPath` carries its stable content ID. A counterpart preserves that identity and ID. The current
catalog has one neutral record per route pattern; this is not a production content registry.

`src/routing/locale-contract.ts` owns language detection, logical path generation, publication checks,
pairing, switch results, canonical URLs and metadata shape. Components do not construct `/en` or
canonical/hreflang independently. `src/spike/fixtures.ts` supplies the nine neutral semantic records
and derives the 18 published fixtures used by routing, prerender, navigation and tests.

Logical helper inputs exclude deployment basename. The router owns basename in links, and the
existing `logicalPath()` adapter accepts framework locations. Directory-style public URLs end in `/`,
matching the P0C host redirects. Query and fragment never enter canonical or hreflang.

## Language switch API and unavailable policy

```ts
resolveLanguageSwitch('/album/test-album', 'en', spikeCatalog)
// { status: 'available', to: '/en/album/test-album', lang: 'en' }
```

The helper is pure and does not navigate. A future control uses the returned router-logical `to`.
It uses the requested language on the same semantic record; a same-language request is an idempotent
available result. No visual control was added in P0D.

If English is missing or a draft, the result is `unavailable`, `lang: 'ko'`, the same content's Korean
`to`, and `reason: 'translation-unavailable'`. Keep that Korean page and expose an accessible unavailable
state when the UI is implemented. Never send the visitor to HOME or label Korean body copy as English.
Do not publish the missing EN document or advertise its hreflang. Unknown/unpublished source paths
return `unknown-route` with `to: null`; they retain the existing 404 behavior.

The switch helper deliberately returns a clean pathname. It drops query/fragment because future
filters, reader state and anchors may not have an equivalent meaning in the other language. A later
owner task can explicitly map supported state. This does not change P0C ordinary query/fragment
navigation. Locale pathname changes still end the future route-local audio session per MASTER §44.

## Canonical, hreflang and document language

`config/build.ts` remains the single origin/base setting. The pure `SiteLocation { origin, base }`
contract receives those values through the Vite adapter. Each public page has its own absolute
canonical; English does not canonicalize to Korean.

- Preview: `https://cij5484.github.io` + `/cho-youn-kyoung-v2/`.
- Isolated root fixture: `https://site.example.invalid` + `/` (intentionally not a production origin).
- Future production: change the central origin/base at the separately approved domain gate. No domain was connected.

Both members of a bilingual pair emit the identical, reciprocal three-link set:
`ko` → Korean URL, `en` → English URL, `x-default` → Korean URL. Each set includes the page itself.
Only published variants are advertised. A KO-only record has `ko` and `x-default`, with no fabricated EN.
All tags are in the document head. This follows Google's requirements for absolute, self-inclusive,
reciprocal alternates; choosing Korean as x-default is this project's approved policy.
[Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions)

`languageOfPath()` supplies `html lang` in the shared document layout on the server and client.
Known-route metadata exposes the same `ko` or `en`. Client 404 paths under `/en` use English document
language, but an actual missing static request still receives the host 404 document.

## Metadata and authored-content contract

`RouteMetadata` contains `title`, `description`, `lang`, `canonical`, `hreflang`, and `openGraph`.
The basic OG shape supports type/title/description/url and an optional image. Fixtures emit website,
title, description and URL only; no stock OG image, region targeting or real SEO copy is invented.
The thin `spikeMetadata()` adapter maps this to official React Router Meta descriptors.
[React Router Meta](https://reactrouter.com/api/components/Meta)

The old neutral `P0B` title suffix and diagnostic copy remain fixture labels, not completed SEO content.
`noindex, nofollow` is retained for all fixture routes; this is not an indexing or search-ranking test.

`LocalizedContent<T>` models explicit `ko` and optional `en` values. Human-authored content can be
draft or reviewed; machine-assisted material can only be a draft. Only authored + reviewed is
publishable. Imported machine output is never the production source of truth. Human ownership,
fact-checking and review are required before creating an authored/reviewed English edition.
These fields model data readiness; they do not constitute user approval to deploy or launch.

Future content integration must require a reviewed Korean edition, unique stable record IDs/paths,
and real authored body content with provenance/reviewer records. It must separate route patterns from
multiple content slugs and enumerate every publishable localized slug for prerender. That production
schema/CMS/migration is outside P0D. The generic content type is a minimum boundary, not a review system.
The KO-only fallback does not waive the planned full bilingual launch-content review.

## Historical P0D verification and boundaries

- 18 documents per base, 36 total: independent HTML, lang/title/description/self-canonical/reciprocal hreflang/OG.
- 80 local Edge tests: both strict static bases, JS disabled and hydrated, direct URL, cache-disabled reload,
  counterpart navigation, history, links/assets, 404 and query behavior. Zero failures or retries.
- Eight pure locale tests: all nine pairs, two origins/bases, missing/authored-draft/machine-draft,
  unknown URLs and future root configuration. Three original placement tests passed unchanged.
- Type-check, lint, root build and project-base build all passed; no dependency additions.
- Raw prerender HTML and packaged HTML are byte-identical. No file-placement, framework or workflow changes.

See [P0D result](../../../P0D-RESULT.md) and [saved evidence](../../../evidence/p0d/README.md).
P0D was locally verified as uncommitted work on baseline `2be1162`. The user subsequently authorized
PR publication and merge without additional validation. P0C remains the last directly verified deployment in this report. Live tests are extended for the new contract but must be run only
after an explicitly approved deployment of these 18 fixtures, with its actual deployment SHA.

Historical P0D STOP was followed by separately approved P0E CI/delivery. P0F only clarifies document ownership/status; no locale semantics changed. Follow [Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md) and HANDOFF for the current approval boundary, not this historical sequence.
