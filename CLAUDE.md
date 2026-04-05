# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@dvashim/typescript-config` — a published npm package providing shared TypeScript configurations (`tsconfig.json` presets). It contains no TypeScript source code to compile; the output is a set of JSON config files in `dist/`. Requires **TypeScript >= 6** (declared as `peerDependencies`) — configs rely on TS 6 defaults (`strict`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields` all defaulting to `true`).

## Commands

- `pnpm run check` — runs all checks (format + exports + TypeScript validation)
- `pnpm run check:format` — checks formatting via Biome (extends `@dvashim/biome-config`); covers `dist/` JSON files too
- `pnpm biome format --write .` — auto-fix formatting
- `pnpm run check:exports` — validates package exports with `validate-package-exports`
- `pnpm run check:ts` — type-checks each `tests/*.json` config against `tests/src/test.ts` (fails fast on first error)
- `tsc -p tests/tsconfig-test.<variant>.json` — type-check a single config variant (e.g., `tsc -p tests/tsconfig-test.node.json`)
- `pnpm run changeset` — create a changeset for versioning

Package manager: **pnpm** (v10.28.1, specified via `packageManager` field). Node.js 24 (per `.node-version`).

## Architecture

### Config hierarchy (all in `dist/`)

```text
tsconfig.base.json          ← foundation: strict es2024 + ESM + bundler resolution
├── tsconfig.node.json      ← esnext module, node types, noEmit
├── tsconfig.lib-dev.json   ← declaration + composite + sourceMaps + isolatedDeclarations
│   └── tsconfig.lib-prod.json  ← strips sourceMaps/comments, stripInternal
└── tsconfig.app-react.json ← esnext module, DOM libs, react-jsx, noEmit
    └── tsconfig.app-react-vite.json  ← adds vite/client types
```

Base uses `types: []` to block ambient `@types/*` auto-discovery; leaf configs explicitly set their own `types` (e.g., `["node"]`, `["vite/client"]`, or `[]`).

### Package exports mapping

Configs are exposed via `exports` in `package.json` using dash-separated paths (e.g., `./lib-dev`, `./app-react-vite`).

### Testing

Tests live in `tests/` — one `tsconfig-test.*.json` per config variant. Each extends the corresponding `dist/` config and compiles `tests/src/test.ts` (with `tests/src/globals.d.ts` providing `console` for non-DOM configs). The `check:ts` script iterates over all test configs with `tsc -p`.

### Releases

Uses [Changesets](https://github.com/changesets/changesets) for versioning. The `.changeset/config.json` is configured with `"commit": true` and GitHub changelog. CI runs `check` on PRs to main; the `release.yml` workflow runs on push to main and handles publishing via `changesets/action`.

## Editing configs

The JSON files in `dist/` are the source of truth — they are committed directly (not generated). When modifying a config, also update or add the corresponding test in `tests/`.
