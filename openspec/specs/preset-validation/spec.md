# preset-validation Specification

## Purpose

Defines what the repository's validation suite must guarantee about the shipped presets: every preset variant type-checks against a real fixture, the emitting presets exercise their emit paths with real output, and CI continuously verifies the declared TypeScript peer range beyond the lockfile pin. Each scenario is a checkable assertion about the checks.

## Requirements

### Requirement: Every preset variant has a type-check test
Each preset published from `dist/` SHALL have a test config `tests/tsconfig-test.<variant>.json` that extends it and compiles `tests/src/test.ts`. The `check:ts` script SHALL run `tsc -p` on every `tests/*.json` config and fail on the first error.

#### Scenario: check:ts covers all variants
- **WHEN** `pnpm run check:ts` runs
- **THEN** every preset variant's test config compiles with the installed TypeScript, and any single config failure fails the whole check

#### Scenario: A new preset ships with a test
- **WHEN** a new preset config is added to `dist/`
- **THEN** a matching `tests/tsconfig-test.<variant>.json` is added in the same change

### Requirement: Emitting presets have emit smoke tests
The emitting presets (`lib-dev`, `lib-prod`) SHALL each have an emit test config (`tests/tsconfig-emit.<variant>.json`) that compiles `tests/src-emit/` with real emit into the gitignored `tests/out/`, exercising declaration emit, `isolatedDeclarations`, `composite`, `rewriteRelativeImportExtensions`, and `stripInternal`. The fixture SHALL contain a relative `.ts`-extension import, a type-only import, an `@internal` export, and explicitly annotated exports.

#### Scenario: Emit paths run in the standard check
- **WHEN** `pnpm run check:ts` runs
- **THEN** both emit configs are picked up by the same `tests/*.json` glob and complete real emit with exit code 0

#### Scenario: Emit output stays out of version control
- **WHEN** emit tests run locally
- **THEN** all output (JS, declarations, maps, buildinfo) lands under `tests/out/`, which is gitignored

### Requirement: CI verifies the declared TypeScript peer range
CI SHALL run the full `check` on pull requests to main, and SHALL additionally run `check:ts` against the latest TypeScript release of each major admitted by `peerDependencies` (the `peer-typescript` matrix job), independent of the version pinned in the lockfile. While the peer range has no upper bound, the matrix SHALL also run against the newest TypeScript release overall (`typescript@latest`), so a newly released major the range already admits is tested before the matrix lists it. A failing matrix entry SHALL fail the workflow without cancelling the other entries.

#### Scenario: Peer range is tested beyond the lockfile pin
- **WHEN** the `peer-typescript` job runs for a matrix entry
- **THEN** it installs the newest `typescript` release that entry selects (the newest of a listed major, or the newest overall for `latest`) and `check:ts` passes against it

#### Scenario: A newly admitted major joins the matrix
- **WHEN** TypeScript releases a stable major that the open-ended peer range admits
- **THEN** it joins the matrix through the `latest` entry with no edit: the first `peer-typescript` run after the release clears pnpm's release-age gate tests it

#### Scenario: A superseded major keeps coverage
- **WHEN** a newer TypeScript major takes over `latest`
- **THEN** the matrix gains an explicit entry for the major it replaced

#### Scenario: Capping the peer range retires latest
- **WHEN** a change gives the peer range an upper bound
- **THEN** the same change replaces the `latest` entry with an explicit entry for every major the range admits

#### Scenario: Matrix entries fail independently
- **WHEN** `check:ts` fails for one matrix entry
- **THEN** the other entries still run to completion, and the workflow fails
