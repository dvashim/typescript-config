# Tasks: require-typescript-7

## 1. Peer range and base config

- [x] 1.1 Bump `peerDependencies.typescript` to `>=7.0.0` in `package.json`
- [x] 1.2 Remove `types: []` from `dist/tsconfig.base.json`; verify ambient `@types/*` discovery stays blocked under TS 7 (probe with `@types/node` adjacent: bare config and edited base resolve no ambient types; a `types: ["node"]` control does)
- [x] 1.3 Remove `isolatedModules` from `dist/tsconfig.base.json`; verify the isolated-modules constraint still fires via `verbatimModuleSyntax` (TS1205 on a type re-export without `export type`)

## 2. Emit smoke tests

- [x] 2.1 Add `tests/src-emit/` fixture: relative `.ts`-extension import, type-only import, `@internal` export, explicitly annotated exports
- [x] 2.2 Add `tests/tsconfig-emit.lib-dev.json` and `tests/tsconfig-emit.lib-prod.json` with `rootDir`, `outDir`, and `tsBuildInfoFile` under `tests/out/`, picked up by the existing `check:ts` glob
- [x] 2.3 Add `tests/out` to `.gitignore`
- [x] 2.4 Verify emit output once: import specifiers rewritten to `.js`, `@internal` export absent from the prod `.d.ts`, maps emitted per preset

## 3. CI

- [x] 3.1 Add the `peer-typescript` matrix job to `.github/workflows/check.yml`: install the latest `typescript` of each major in the peer range (currently `['7']`) and run `check:ts`

## 4. Dev dependencies

- [x] 4.1 Bump the `typescript` devDependency to `^7.0.2` and update the lockfile

## 5. Documentation

- [x] 5.1 README: TS badge `>=7`, Requirements and Installation `>=7.0.0`, compatibility table gains `>=5.0.0 (current) → >=7.0.0` with `2.x`–`4.x → >=6.0.0` as history, defaults sentence says TypeScript 7 and includes `types: []`, `types` row removed from the base options table, base-preset note and Troubleshooting cover `TS5011` (`outDir` without explicit `rootDir`), Contributing mentions emit smoke tests and scopes changesets to `dist/` changes
- [x] 5.2 CLAUDE.md: TypeScript 7 requirement and defaults (including `types`), hierarchy annotations, testing section covers emit smoke tests, releases section describes the `peer-typescript` matrix
- [x] 5.3 `openspec/specs/package-readme/spec.md`: defaults-list wording updated to TypeScript 7 (matches this change's delta spec)

## 6. Changesets and verification

- [x] 6.1 Add a `major` changeset: require TypeScript >= 7, `types: []` removal explained, TS 6 users directed to 4.x
- [x] 6.2 Add a `patch` changeset: redundant `isolatedModules` removal
- [x] 6.3 `pnpm run check` passes end to end (format, exports, all `tsc -p` runs including emit tests)
- [x] 6.4 `pnpm changeset status` reports a pending major bump (next release v5.0.0)
