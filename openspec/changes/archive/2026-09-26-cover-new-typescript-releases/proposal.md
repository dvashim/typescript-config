# Proposal: cover-new-typescript-releases

## Why

The peer range `>=7.0.0` is open-ended by design, so it already admits TypeScript 8 and every later major — yet nothing in CI reacts when one ships: the `peer-typescript` matrix is pinned to `['7']`, and the `preset-validation` scenario meant to grow it ("the peer range starts admitting a new TypeScript major … in the same change") can never fire, because an open range admits a new major through that major's release, not through a commit here. The archived `require-typescript-7` design left the TypeScript 8 follow-up to memory; this change lets CI cover a new major without anyone having to remember.

## What Changes

- The `peer-typescript` matrix gains a `latest` entry (`['7', 'latest']`), so every run also checks the newest published TypeScript — including a new major that the open peer range already admits.
- The matrix sets `fail-fast: false`, so one failing entry no longer cancels the others and every run reports each entry's result.
- Each matrix job logs the TypeScript version it actually installed: pnpm's 24-hour `minimumReleaseAge` gate silently resolves a too-young tag to an older release.
- The `preset-validation` CI requirement gains the `latest` rule: the "newly admitted major joins the matrix" scenario, unreachable under an open range, is rewritten so a newly released major joins through `latest`, and new scenarios cover a superseded major, a capped range, and independently failing entries.
- CLAUDE.md's description of the matrix is updated to match.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `preset-validation`: the "CI verifies the declared TypeScript peer range" requirement adds a `latest` entry that covers new majors while the range is open-ended, requires matrix entries to fail independently, and rewrites the unreachable "newly admitted major joins the matrix" scenario.

## Impact

- **CI**: `.github/workflows/check.yml` — one more `peer-typescript` job per run, a duplicate of `'7'` until TypeScript 8 ships.
- **Docs**: `CLAUDE.md` (Releases and CI).
- **Published artifact**: none — `dist/`, `package.json`, and `README.md` are unchanged, so no changeset.
- **Consumers**: no direct change; a TypeScript major that breaks a preset now turns CI (and the main CI badge) red on the first run after its release clears pnpm's release-age gate, instead of going unnoticed until someone extends the matrix.
