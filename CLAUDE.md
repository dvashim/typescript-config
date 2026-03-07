# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@dvashim/typescript-config` — a published npm package providing shared TypeScript configurations (`tsconfig.json` presets). It contains no TypeScript source code to compile; the output is a set of JSON config files in `dist/`.

## Commands

- `pnpm run check` — runs all checks (format + exports + TypeScript validation)
- `pnpm run check:format` — checks formatting via Biome (extends `@dvashim/biome-config`)
- `pnpm run check:exports` — validates package exports with `validate-package-exports`
- `pnpm run check:ts` — type-checks each `tests/*.json` config against `tests/src/test.ts`
- `pnpm run changeset` — create a changeset for versioning

Package manager: **pnpm** (v10.28.1, specified via `packageManager` field).

## Architecture

### Config hierarchy (all in `dist/`)

```
tsconfig.base.json          ← foundation: strict es2022 + ESM + bundler resolution
├── tsconfig.node.json      ← esnext module, es2023 target, node types, noEmit
├── tsconfig.lib-dev.json   ← declaration + composite + sourceMaps
│   └── tsconfig.lib-prod.json  ← strips sourceMaps/comments, stripInternal
└── tsconfig.app-react.json ← esnext module, DOM libs, react-jsx, noEmit
    └── tsconfig.app-react-vite.json  ← adds vite/client types
```

### Package exports mapping

Configs are exposed via `exports` in `package.json` with multiple entry points (e.g., `./base`, `./lib/dev`, `./lib/prod`, `./app/react`, `./app/react/vite`, `./node`). Legacy flat aliases (`./lib-dev`, `./lib-prod`, `./app-react`, `./app-react-vite`) are also maintained.

### Testing

Tests live in `tests/` — one `tsconfig-test.*.json` per config variant. Each extends the corresponding `dist/` config and compiles `tests/src/test.ts`. The `check:ts` script iterates over all test configs with `tsc -p`.

### Releases

Uses [Changesets](https://github.com/changesets/changesets) for versioning. The `.changeset/config.json` is configured with `"commit": true` and GitHub changelog. CI runs `check` on push/PR to main; a separate `release.yml` workflow handles publishing.

## Editing configs

The JSON files in `dist/` are the source of truth — they are committed directly (not generated). When modifying a config, also update or add the corresponding test in `tests/`.