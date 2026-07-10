# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@dvashim/typescript-config` — a published npm package providing shared TypeScript configurations (`tsconfig.json` presets). It contains no TypeScript source to build — the published output is a set of JSON config files in `dist/`; the only `.ts` sources are test fixtures under `tests/`. Requires **TypeScript >= 7** (declared as `peerDependencies`) — configs rely on TS 7 defaults (`strict`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields` all defaulting to `true`, and `types` defaulting to `[]`).

## Commands

- `pnpm run check` — runs all checks (format + exports + TypeScript validation)
- `pnpm run check:format` — checks formatting via Biome (extends `@dvashim/biome-config`); covers `dist/` JSON files too
- `pnpm biome format --write .` — auto-fix formatting
- `pnpm run check:exports` — validates package exports with `validate-package-exports`
- `pnpm run check:ts` — runs `tsc -p` on each `tests/*.json` config (type-check tests plus emit smoke tests; fails fast on first error)
- `tsc -p tests/tsconfig-test.<variant>.json` — type-check a single config variant (e.g., `tsc -p tests/tsconfig-test.node.json`)
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

Emit smoke tests (`tsconfig-emit.lib-dev.json`, `tsconfig-emit.lib-prod.json`) compile `tests/src-emit/` with real emit into the gitignored `tests/out/`, exercising declaration emit, `isolatedDeclarations`, `composite`, `rewriteRelativeImportExtensions`, and `stripInternal`. The same `check:ts` glob picks them up.

### Releases

Uses [Changesets](https://github.com/changesets/changesets) for versioning. The `.changeset/config.json` is configured with `"commit": true` and GitHub changelog. CI runs `check` on PRs to main, plus a `peer-typescript` matrix job that runs `check:ts` against the latest TypeScript in the peer range (currently `typescript@7`; add new majors to the matrix when the range admits them); the `release.yml` workflow runs on push to main and handles publishing via `changesets/action`.

Changes to `dist/` (the published artifact) require a changeset; dev-dependency, test, CI, and doc changes do not.

## Editing configs

The JSON files in `dist/` are the source of truth — they are committed directly (not generated). When modifying a config, also update or add the corresponding test in `tests/`.

The README is spec-governed: `openspec/specs/package-readme/spec.md` requires its factual claims to match the repo — option tables mirror `dist/*.json` exactly, and quoted error messages are ones `tsc` actually emits — so update the README alongside config changes.
