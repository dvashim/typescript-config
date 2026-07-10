# Proposal: require-typescript-7

## Why

TypeScript 7 — the first native-compiler major — is released, and every preset has been verified fully compatible (identical type-check results, byte-identical emit versus 6.0.3). Adopting TS 7 as the minimum lets the presets shed options that are now upstream defaults and keeps the "lean on defaults" philosophy honest, shipped as the v5.0.0 major.

## What Changes

- **BREAKING**: `peerDependencies.typescript` narrows from `>=6.0.0` to `>=7.0.0`. Consumers on TypeScript 6 stay on the 4.x line.
- `tsconfig.base.json` drops `types: []` — it is the TypeScript 7 default, so ambient `@types/*` auto-discovery stays blocked with no behavior change (empirically verified).
- `tsconfig.base.json` drops `isolatedModules` — implied by `verbatimModuleSyntax` since TypeScript 5.0 (non-breaking cleanup, separate patch changeset).
- New emit smoke tests for `lib-dev` and `lib-prod` close a coverage gap: `check:ts` previously forced `noEmit`, so declaration emit, `isolatedDeclarations`, `composite`, `rewriteRelativeImportExtensions`, and `stripInternal` were never exercised.
- CI gains a `peer-typescript` matrix job running `check:ts` against the latest TypeScript in the peer range, so the open-ended range stays verified as new releases ship.
- Docs updated across README (badge, requirements, compatibility table, defaults list, `TS5011` guidance for `outDir` without `rootDir`), CLAUDE.md, and the `package-readme` spec wording.
- Routine dev-dependency updates ride along on the branch (typescript 7.0.2, biome 2.5.3, @types/node 26.1.1, vite 8.1.4, pnpm 11.11.0).

## Capabilities

### New Capabilities

- `preset-validation`: what the repository's checks must guarantee — a type-check test config per published preset variant, real-emit smoke tests for the emitting presets, and CI verification of the declared TypeScript peer range.

### Modified Capabilities

- `package-readme`: the factual-accuracy requirement's canonical defaults list changes from "TypeScript 6 defaults" to "TypeScript 7 defaults" (still required to appear exactly once, in Options → Base).

## Impact

- **Published artifact**: `dist/tsconfig.base.json` (two options removed), `package.json` (peer range) — requires a major changeset; next release is v5.0.0.
- **Tests**: new `tests/src-emit/` fixtures and `tests/tsconfig-emit.{lib-dev,lib-prod}.json`, picked up by the existing `check:ts` glob; `tests/out/` gitignored.
- **CI**: `.github/workflows/check.yml` gains the `peer-typescript` matrix job.
- **Docs**: `README.md`, `CLAUDE.md`, `openspec/specs/package-readme/spec.md`.
- **Consumers**: TypeScript 6 projects must not upgrade past 4.x; TypeScript 7 consumers see no behavioral change from the option removals.
