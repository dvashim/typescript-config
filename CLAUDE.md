# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@dvashim/typescript-config` is a published npm package of shared TypeScript presets. There is **no build step and no TypeScript source to compile**: the published artifact is the set of hand-written JSON files in `dist/`, committed directly to git. The only `.ts` files in the repo are test fixtures under `tests/`.

TypeScript **>= 7** is a peer dependency. The presets deliberately omit options TS 7 already defaults to; the canonical list of relied-upon defaults lives in README → Options → Base, and the `package-readme` spec requires it to appear there **exactly once** — reference it, don't restate it. The most load-bearing default is `types: []`: ambient `@types/*` auto-discovery is off, which is why leaf presets declare their own `types` (`["node"]`, `["vite/client"]`).

## Commands

- `pnpm run check` — runs every `check:*` script via pnpm's regex script matching (`pnpm run "/^check:.*/"`). They run **concurrently** with prefixed output, so read all three sections instead of stopping at the first.
- `pnpm run check:format` — Biome format check (config extends `@dvashim/biome-config`); covers the JSON in `dist/` and `tests/` as well as source.
- `pnpm exec biome format --write .` — auto-fix formatting.
- `pnpm run check:publint` — `publint --strict`: packs the package and verifies every `exports` entry resolves and is actually published. Warnings are errors.
- `pnpm run check:ts` — `tsc -p` over every `tests/*.json` config (type-check tests plus emit smoke tests), failing fast on the first error.
- `pnpm exec tsc -p tests/tsconfig-test.<variant>.json` — run a single preset's test (e.g. `tests/tsconfig-test.node.json`). `tsc` is a devDependency, so it needs `pnpm exec` outside of a package script.
- `pnpm run changeset` — record a changeset for release.

Package manager is **pnpm**, pinned via `packageManager`; Node.js 24 per `.node-version`.

**Dependency-update gotcha:** pnpm 11's `minimumReleaseAge` supply-chain gate (24 h by default, not configured in-repo) holds back freshly published versions, so a same-day release may silently resolve to an older one. If the lockfile ends up containing a too-young version, pnpm refuses installs *and* script runs with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`; recover by fixing the specifier in `package.json`, restoring `pnpm-lock.yaml` from git, and running `pnpm install` — install-time resolution honors the gate, whereas a direct `pnpm add` can pin a version that is too new.

## Architecture

### Preset hierarchy (all in `dist/`)

```text
tsconfig.base.json              ← strict ES2025 + ESM + bundler resolution
├── tsconfig.node.json          ← types: ["node"], noEmit
├── tsconfig.lib-dev.json       ← declaration + declarationMap + sourceMap + composite + isolatedDeclarations
│   └── tsconfig.lib-prod.json  ← drops maps, removeComments, stripInternal
└── tsconfig.app-react.json     ← DOM libs, react-jsx, noEmit
    └── tsconfig.app-react-vite.json  ← types: ["vite/client"]
```

Presets are exposed through `exports` in `package.json` under dash-separated subpaths (`.`, `./node`, `./lib-dev`, `./lib-prod`, `./app-react`, `./app-react-vite`).

### Test harness (`tests/`)

Two families, both picked up by the same `tests/*.json` glob in `check:ts`:

- `tsconfig-test.<variant>.json` — one per preset; extends the `dist/` preset and type-checks `tests/src/test.ts`. `tests/src/globals.d.ts` supplies a minimal `console` for the presets without DOM or Node types.
- `tsconfig-emit.lib-{dev,prod}.json` — compile `tests/src-emit/` with **real emit** into the gitignored `tests/out/`, exercising declaration emit, `isolatedDeclarations`, `composite`, `rewriteRelativeImportExtensions`, and `stripInternal`. The fixture is deliberately shaped for this: a relative `.ts`-extension import, a type-only import, an `@internal` export, and explicit return-type annotations.

Emit is neutralized **in the test configs, not in `dist/`**: `tsconfig-test.base.json` adds `noEmit: true` (base sets neither `noEmit` nor `outDir`), and the `lib-*` test configs add `composite: false` + `noEmit: true`. Keep that override local to `tests/` — don't "fix" it by changing a shipped preset.

## Editing presets

`dist/*.json` is the source of truth and is edited by hand. Adding or renaming a preset touches five places in one change:

1. `dist/tsconfig.<name>.json`
2. `exports` in `package.json` (dash-separated subpath)
3. `tests/tsconfig-test.<name>.json`, plus `tests/tsconfig-emit.<name>.json` if the preset emits
4. `README.md` — the Presets table, a Usage subsection, and an Options table mirroring the JSON exactly
5. A changeset

Changes to `dist/` require a changeset; dev-dependency, test, CI, and doc changes don't.

## Releases and CI

Changesets **v3** CLI paired with `changesets/action` **v2** — the two are version-locked and refuse to run against each other's majors. `.changeset/config.json` uses `"commit": true`, the GitHub changelog, and `"format": false` (v3's replacement for the removed `prettier` option; Biome doesn't format Markdown, so changelogs stay unformatted rather than pulling in a second formatter).

`check.yml` runs on PRs to main **and on pushes to main** — the README's CI badge reads its `branch=main` conclusion, and the `package-readme` spec requires the badge to reflect a workflow that actually validates main. `cancel-in-progress` is disabled on main so a superseded run can't leave the badge reading "cancelled". Alongside `check`, a `peer-typescript` matrix job runs `check:ts` against the newest release of each TypeScript major admitted by `peerDependencies` (currently just `7`); widening the peer range means adding to that matrix in the same change.

`release.yml` follows the v2 action's sub-action layout: `select-mode` → either `version` (opens/updates the release PR) or `pack` → `publish`. It starts from `permissions: {}` and each job grants its own, which keeps `id-token: write` confined to `publish`. `pack` runs `pnpm run check`, so nothing publishes without a green check. Publishing uses npm trusted publishing (OIDC) — there is no `NPM_TOKEN`; the v2 action dropped its `.npmrc` handling, so pnpm performs the OIDC exchange itself (needs `pnpm/action-setup` >= 6.0.6). `release.yml` deliberately omits `cache: 'pnpm'`: a job holding `contents: write`/`id-token: write` shouldn't restore a cache a lower-privileged workflow could have written. Both workflows resolve Node from `.node-version` rather than pinning.

## Specs (OpenSpec)

`openspec/specs/` holds two governing specs. Changes are proposed under `openspec/changes/` and moved to `openspec/changes/archive/<date>-<name>/` when done; the `/opsx:propose`, `/opsx:apply`, `/opsx:archive` skills drive this through the globally installed `openspec` CLI.

- **`package-readme`** — the README is spec-governed. Option tables mirror `dist/*.json` exactly, the specifier table matches `package.json` `exports`, quoted errors are ones `tsc` really emits, and the TS 7 defaults list appears exactly once. Update the README alongside preset changes.
- **`preset-validation`** — what the test suite must guarantee: a type-check test per preset, emit smoke tests for the emitting presets writing only into gitignored `tests/out/`, and CI coverage for every TypeScript major in the peer range.

## Repo conventions

`.gitattributes` forces LF in the index and on checkout: `@dvashim/biome-config` pins `lineEnding: "lf"`, so a CRLF checkout would fail `check:format` on every file. It also marks `dist/*.json` and `tests/*.json` as `jsonc` for GitHub — those files use `//` comments, which a strict-JSON grammar would flag.
