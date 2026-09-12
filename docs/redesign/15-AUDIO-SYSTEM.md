# 15. AUDIO SYSTEM — Canonical workflow

**Owner revision:** 2026-09-11 / user-authorized full-catalog analysis and runtime integration.
**Scope:** public recording registration, reproducible offline analysis and use by the shared
Haegeum/Janggu signature. This document owns this workflow; page specifications link here.
**Current status:** IMPLEMENTED / LOCALLY VERIFIED (lean integration checks). This pass is LOCAL ONLY:
no PR, push, merge or deployment. The previously published development preview remains a separate revision.

## 1. Registration → analysis → signature data

1. Upload the approved public recording to R2. Retain its verified original byte size and SHA-256.
2. Register it in `src/audio/recordings.json`: `source` (public HTTPS R2 URL), `path`
   (`album-key/track-key.mp3`), `sha256`, `bytes`. This file is the source of truth for the full
   public recording catalog. Do not introduce a second manually maintained batch manifest or
   request the user to supply the same URLs/MP3s again.
3. Run the batch below. Reuse/download audio under ignored `.cache/album-audio/<path>` and
   verify both byte size and SHA-256 against the registered values **before decoding**.
   A mismatch is a failed track, never an instruction to silently replace the registered hash.
4. Decode, extract both feature datasets, validate JSON and inspect `batch-summary.json`.
   Every registered track must have a valid matched pair before declaring catalog analysis complete.
5. Resolve the exact album slug / track index / source relationship through the pure
   `src/audio/analysis-catalog.ts` mapping. Resolve the registry identity, hash and duration, then let
   `analysis-loader.ts` lazily load the selected track's matched pair. Sample at native media
   `currentTime`; use the channels according to §4. Runtime ownership and validation status are in §5.

Run from the repository root with Node 24 and installed lockfile dependencies:

```sh
node scripts/analyze-album-audio.mjs
```

Optional arguments preserve the same recordings schema (including URL inputs):

```sh
node scripts/analyze-album-audio.mjs src/audio/recordings.json src/audio/analysis
```

The script uses the already-installed Playwright Chromium as an offline audio decoder, not a
browser UI test or upload. If its binary is absent, use the existing project's Chromium setup
(`npx playwright install chromium`). No new decoder/library is required.

## 2. Stable identity and files

`path` is an immutable catalog key, not a translated display title or array index. Use a unique
album key and track key; retain them when renaming display titles or reordering tracks. Example:

- Registry path: `jiyounghee/06_short-sanjo.mp3`
- `trackId`: `album:jiyounghee:06_short-sanjo`
- `src/audio/analysis/jiyounghee/06_short-sanjo.features.json`
- `src/audio/analysis/jiyounghee/06_short-sanjo.percussion.json`

Album folders prevent names such as `02_jungmori` from colliding. Replacing recording bytes requires
an intentional registry hash update and regeneration of both files. Never pair stale analysis with
new audio. The batch rejects duplicate paths and unsafe output path components.

`src/audio/analysis/batch-summary.json` records source URLs, verified hashes, durations, frame/onset/
candidate counts, output paths and failures. Rerunning regenerates the registered catalog, reusing
verified cached MP3s. Review failures in the report: a failed run may leave an older pair on disk;
an existing filename alone does not prove success. An empty candidate list is valid but flagged for
review. Removed catalog files are not automatically deleted; consumers must follow the registry.

MP3s stay in ignored cache/build storage, never in Git. JSON results and the batch script remain
local changes until a separately authorized delivery. Existing static-preview audio publication
uses the same registry and does not automatically activate analysis JSONs.

## 3. Reused analysis and validation

- `scripts/audio/extract-features.mjs`: unchanged Hann-window STFT / energy / positive tonal-band
  flux / onset / phrase extraction; `bow-features/1`, 25 frames per second, quantized 0–1000.
- `scripts/audio/percussion-features.mjs`: unchanged bass/body attack plus high-band flux/flatness
  candidate detector; `p2k-percussion-candidates/2`, sparse time/score/flatness hits.
- Decoder: Chromium `OfflineAudioContext`, 22050 Hz, mono channel average, as in the supplied
  batch script and existing repository extraction script. Binary PCM transfer only reduces
  serialization overhead; it does not alter the extractor formulas.
- `validAudioFeatures` validates features. The batch also validates finite, ordered, in-duration
  percussion hits and minimum separation, then parses both written JSON files back.
- Source verification and per-track JSON checks are mandatory. No whole-site build/browser suite
  is required for this offline batch task. Failures are reported per track with a nonzero exit code.

The supplied pilots identify **영산회상 중령산** and **지영희류 짧은산조**. Their source hashes
match the registry. Pilot JSONs were generated at 44100 Hz whereas the supplied script specifies
22050 Hz: identical candidate counts are not a reproducibility requirement across these rates.
Compare activity, gaps and count trends without claiming verified instrument separation.
Only general detector thresholds may change with evidence; never insert per-song timestamps,
exceptions or identity-specific thresholds. Saturated scores are neither calibrated confidence
probabilities nor measured strike loudness. No threshold change is justified from counts alone.

## 4. Canonical signature response

Use `HOME_SIGNATURE` choreography (`src/sound/tuning-presets.ts`) and the existing shared motion
owners. The two points represent distinct responses while retaining continuous position, velocity,
direction and depth across scene/player handoff.

- **Haegeum:** do not map pitch height directly onto Y coordinates. `pitchInfluence` remains zero;
  batch `pitchContour` is null. Energy and phrase shape movement speed/range; onset and spectral
  flux affect articulation, reversal and fine texture. Keep the free spatial path, sustained motion
  and smooth recovery. An onset is a musical-change cue, not automatically a drum strike.
- **Janggu:** keep a smooth baseline orbit. Only an accepted percussion candidate introduces a
  short vertical impulse with a smooth return. Do not drive repeated vertical kicks from overall
  volume or high-frequency bow noise alone. These are mixed-source candidates, not isolated stems
  or verified Janggu labels. Percussion impulses come only from the accepted precomputed candidates;
  live response may supplement bow texture but must not create another percussion trigger.
- Read features at absolute media time with identity/hash/duration checks. Seek/replay must reset
  event history and must not accumulate missed hits. Invalid/unavailable data uses the existing
  restrained live-bow/idle fallback; no valid percussion data means no percussion impulses. A fallback
  must not impersonate verified precomputed detection.
- Keep the playback progress fill distinct from point choreography. Pause retains quiet idle motion;
  closing/ending returns the points to the current page. Preserve reduced motion and player bounds.

## 5. Runtime ownership and implementation status

The batch owns reproducible generation; it does not own playback or per-frame motion. Runtime flow:

1. `analysis-catalog.ts` resolves the exact selected album slug, track index and source URL to its
   registered analysis identity. Display titles or a coincidental filename are not identity matches.
   New albums also register their slug→folder association here; registry order inside that folder
   must match `album-data.ts` track order. Run the 29-track mapping test (expanded for added tracks)
   to reject a stale index/source pairing rather than silently loading the wrong track.
2. `analysis-loader.ts` lazily imports the selected track's feature/percussion pair. It does not
   eagerly import all 58 analysis JSONs into the player entry.
3. `instrument-response.ts` owns `setTrack`, matched-pair validation and media-time sampling.
   A newer selection or disposal invalidates older asynchronous load results. Seek/replay resets
   transient state; the candidate lookup uses binary search at absolute `media.currentTime`, including
   the current impulse age after a seek. Paused playback cannot accumulate missed candidate hits.
   Pair/source identity must match and decoded/native duration must differ by at most 0.25 seconds;
   mismatches produce no percussion impulse. DOM `data-analysis-state` / `data-analysis-track` expose
   loading/ready/error/mismatch status without per-frame React state updates.
4. `global-playback.ts` retains the single media element across routes and supplies the current
   track selection. `AudioSignature.tsx` consumes the response while preserving HOME_SIGNATURE's
   spatial path, smooth handoff/return, reduced motion and the mini-player boundary. Pitch-to-Y is removed.

2026-09-12 mobile performance pass (local only): live pitch estimation is opt-in through
`createInstrumentResponse`'s `diagnosticPitch` argument. Normal playback retains live spectra and exact
precomputed events without the unused waveform/YIN calculation. Detector algorithms and generated JSONs are unchanged.

**IMPLEMENTED / LOCALLY VERIFIED / LOCAL ONLY.** The earlier excerpt-only binding and direct
pitch-height mapping are superseded. This integration does not alter the detector formulas, thresholds,
or the 58 generated track JSONs. Successful offline generation is not runtime validation; passing
technical checks is not visual quality approval. Delivery of this revision requires separate authorization.


Lean integration validation: typecheck; changed-scope lint; 7 targeted lookup/mismatch, media-time,
selection/next/previous/seek/pause/load-race/cleanup and no-pitch-position tests; actual
`build:development-preview`; local browser playback→WORKS continuation→next-track analysis ready
with no fatal runtime errors. All 58 track JSONs and both offline extractor/detector sources retain
their prior hashes. No Full Gate, analysis regeneration or delivery was performed.
