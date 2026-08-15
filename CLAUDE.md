# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@dvashim/typescript-config` — a published npm package providing shared TypeScript configurations (`tsconfig.json` presets). It contains no TypeScript source to build — the published output is a set of JSON config files in `dist/`; the only `.ts` sources are test fixtures under `tests/`. Requires **TypeScript >= 7** (declared as `peerDependencies`) — configs rely on TS 7 defaults (`strict`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields` all defaulting to `true`, and `types` defaulting to `[]`).

## Commands

- `pnpm run check` — runs every `check:*` script via pnpm's regex script matching (`pnpm run "/^check:.*/"`); they run **concurrently** with prefixed output, so read all three sections rather than stopping at the first
- `pnpm run check:format` — checks formatting via Biome (extends `@dvashim/biome-config`); covers `dist/` JSON files too
- `pnpm biome format --write .` — auto-fix formatting
- `pnpm run check:publint` — validates package exports with `publint --strict` (packs the package and checks every export resolves and is published; warnings are treated as errors)
- `pnpm run check:ts` — runs `tsc -p` on each `tests/*.json` config (type-check tests plus emit smoke tests; fails fast on first error)
- `pnpm exec tsc -p tests/tsconfig-test.<variant>.json` — type-check a single config variant (e.g., `pnpm exec tsc -p tests/tsconfig-test.node.json`); `tsc` is a devDependency, so it needs `pnpm exec` unless you're inside a script
- `pnpm run changeset` — create a changeset for versioning

Package manager: **pnpm** (version pinned via the `packageManager` field). Node.js 24 (per `.node-version`).

Dependency updates: pnpm's `minimumReleaseAge` (24 h default in pnpm 11) holds back newly published versions — a release from the last day may silently resolve to an older version until it ages past the gate. If the lockfile ever contains a version younger than the gate, pnpm refuses installs *and* script runs with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`; recover by fixing the specifier in `package.json`, restoring `pnpm-lock.yaml` from git, and running `pnpm install` — install-time resolution honors the gate, whereas a direct `pnpm add` may pin a too-new version.

## Architecture

### Config hierarchy (all in `dist/`)

```text
tsconfig.base.json          ← foundation: strict es2025 + ESM + bundler resolution
├── tsconfig.node.json      ← node types, noEmit
├── tsconfig.lib-dev.json   ← declaration + composite + sourceMaps + isolatedDeclarations
│   └── tsconfig.lib-prod.json  ← strips sourceMaps/comments, stripInternal
└── tsconfig.app-react.json ← DOM libs, react-jsx, noEmit
    └── tsconfig.app-react-vite.json  ← adds vite/client types
```

Ambient `@types/*` auto-discovery is blocked by TS 7's default `types: []`; leaf configs that need ambient types set their own `types` (e.g., `["node"]`, `["vite/client"]`).

### Package exports mapping

Configs are exposed via `exports` in `package.json` using dash-separated paths (e.g., `./lib-dev`, `./app-react-vite`).

### Testing

Tests live in `tests/` — one `tsconfig-test.*.json` per config variant. Each extends the corresponding `dist/` config and compiles `tests/src/test.ts` (with `tests/src/globals.d.ts` providing `console` for non-DOM configs). The `check:ts` script iterates over all test configs with `tsc -p`.

Type-check tests neutralize emit locally, not in `dist/`: `tsconfig-test.base.json` adds `noEmit: true` (base sets neither `noEmit` nor `outDir`), and the `lib-*` test configs add `composite: false` + `noEmit: true`. Keep that overriding in the test configs — don't "fix" it by changing `dist/`.

Emit smoke tests (`tsconfig-emit.lib-dev.json`, `tsconfig-emit.lib-prod.json`) compile `tests/src-emit/` with real emit into the gitignored `tests/out/`, exercising declaration emit, `isolatedDeclarations`, `composite`, `rewriteRelativeImportExtensions`, and `stripInternal`. The same `check:ts` glob picks them up.

### Releases

Uses [Changesets](https://github.com/changesets/changesets) **v3** for versioning (paired with `changesets/action` **v2** — the two are version-locked; the v2 action refuses to run against a v2 CLI and vice versa). The `.changeset/config.json` is configured with `"commit": true`, GitHub changelog, and `"format": false` (v3 replaced the removed `prettier` option with `format`; Biome doesn't format Markdown, so changelogs stay unformatted rather than pulling in a second formatter). `check.yml` runs on PRs to main **and on pushes to main** — the README's CI badge reads its `branch=main` conclusion, which the `package-readme` spec requires to reflect a workflow that actually validates main. It runs `check` plus a `peer-typescript` matrix job that runs `check:ts` against the latest TypeScript in the peer range (currently `typescript@7`; add new majors to the matrix when the range admits them). `cancel-in-progress` is disabled on main so a superseded run can't leave the badge showing "cancelled".

`release.yml` runs on push to main and follows the changesets v2-action sub-action layout: `select-mode` → either `version` (opens/updates the release PR) or `pack` → `publish`. Splitting it this way keeps `id-token: write` on the publish job only; the workflow starts from `permissions: {}` and each job grants its own. `pack` also runs `pnpm run check`, so nothing publishes without a green check. Publishing uses npm trusted publishing (OIDC) — there is no `NPM_TOKEN`; the v2 action dropped its own `.npmrc` handling, so the OIDC exchange is done by pnpm itself (requires `pnpm/action-setup` >= 6.0.6).

Both workflows resolve Node from `.node-version`; neither carries an exact pin. `release.yml` deliberately omits `cache: 'pnpm'` — a job holding `contents: write`/`id-token: write` should not restore a cache a lower-privileged workflow could have written.

Changes to `dist/` (the published artifact) require a changeset; dev-dependency, test, CI, and doc changes do not.

## Editing configs

The JSON files in `dist/` are the source of truth — they are committed directly (not generated). When modifying a config, also update or add the corresponding test in `tests/`.

Adding or renaming a preset touches five places in the same change:

1. `dist/tsconfig.<name>.json`
2. `exports` in `package.json` (dash-separated subpath, e.g. `./app-react-vite`)
3. `tests/tsconfig-test.<name>.json` (plus `tests/tsconfig-emit.<name>.json` if the preset emits)
4. `README.md` — Presets table, a Usage subsection, and an Options table mirroring the JSON
5. A changeset

## Specs (OpenSpec)

`openspec/specs/` holds two governing specs; changes are proposed under `openspec/changes/` and moved to `openspec/changes/archive/<date>-<name>/` when done (the `/opsx:propose`, `/opsx:apply`, `/opsx:archive` skills drive this via the `openspec` CLI).

- `package-readme` — the README is spec-governed: factual claims must match the repo (option tables mirror `dist/*.json` exactly, the specifier table matches `package.json` `exports`, quoted error messages are ones `tsc` actually emits, and the list of relied-upon TS 7 defaults appears exactly once, in Options → Base). Update the README alongside config changes.
- `preset-validation` — what the test suite must guarantee: every preset variant has a type-check test, emitting presets have emit smoke tests writing only into gitignored `tests/out/`, and CI covers each TypeScript major admitted by `peerDependencies`.
