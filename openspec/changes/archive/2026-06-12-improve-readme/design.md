# Design: improve-readme

## Context

`README.md` (309 lines) is the package's npm landing page and primary documentation. A multi-agent audit produced 42 findings; after deduplication and verification against the repo, ~25 remain. The findings fall into accuracy fixes (objective), onboarding gaps (objective — verified hard failures), and structure/style improvements (judgment calls, resolved below). The README is hand-maintained prose; `dist/*.json` is the source of truth it must mirror.

## Goals / Non-Goals

**Goals:**

- Every claim in the README verifiable against the repo or against an actual `tsc` invocation.
- A new user reaches a passing type-check from the Quick start alone, for any preset, without hitting an undocumented companion-dependency error.
- One place per fact: no duplicated lists/descriptions that can drift.

**Non-Goals:**

- No changes to the shipped configs, `package.json`, exports, or tests.
- No changes to CI workflows (the CI badge stays on `release.yml`; see resolved open questions).
- `LICENSE` is edited once, only to correct the copyright holder (see Decision 1); no other license changes.
- No multi-page docs site, no generated docs tooling — the README stays hand-maintained.

## Decisions

1. **Resolve the README/LICENSE/package.json conflicts at their source.** Three files disagreed: `LICENSE` said `© dvashim`, while `package.json` `author` and the pre-change README said `Aleksei Reznichenko`. Resolved (open question) in favor of `Aleksei Reznichenko` — the majority source and the author's apparent intent: `LICENSE` is edited to `Copyright (c) 2026 Aleksei Reznichenko` and the README License line reads `MIT © Aleksei Reznichenko`. The CI badge points at `release.yml?branch=main` (the workflow that runs `pnpm run check` on `main`); resolved (open question) to keep it there rather than add a `push` trigger to `check.yml`. *Alternative considered:* a dedicated `push: branches: [main]` trigger on `check.yml` for a check-only badge — declined to keep this change docs-scoped (the `release.yml` badge already reflects `main`).
2. **Production config filename: `tsconfig.prod.json`.** Mirrors the `lib-prod` preset name, so the file↔preset mapping is self-evident. *Alternative:* `tsconfig.build.json` (NestJS convention) — more common in the wild but breaks the naming symmetry with `lib-dev`/`lib-prod`.
3. **Usage consolidation, not elimination.** Keep one snippet per preset (users deep-link to "their" preset), but strip the multi-line `jsonc` banner comments into one-sentence prose intros, promote the labels to `###` headings, and let the Options tables carry the details. *Alternative:* collapse to two examples (base + library) — shorter, but loses deep-linkable per-preset anchors and the per-preset companion-dependency notes need a home anyway.
4. **Companion deps live in two places by design**: a one-line note under each preset's usage heading (point of need) and one consolidated `TS2688` entry in Troubleshooting (point of failure). The Configurations table stays unchanged to avoid a third sync point.
5. **Picker becomes a prose decision list.** Each branch is one question + one inline `"extends": "…"` value linking to its usage section. Modeled on `@total-typescript/tsconfig`'s decision questions. Includes the new "Node.js service" branch: recommend extending the base plus `"types": ["node"]` and an emit strategy (or `lib-dev` when compiling with `tsc`).
6. **`Notes` splits into `Troubleshooting` + relocations.** Restart-TS-server, the corrected missing-package error, and the new `TS2688` entry go under `## Troubleshooting`; the ambient-types and `extends`-array bullets move into Usage as a "Composing configs" note.
7. **Title keeps the friendly H1, intro leads with the package name.** `# TypeScript Configurations` stays (npm/GitHub already display the package/repo name prominently); the intro sentence starts with `` `@dvashim/typescript-config` — … `` for search and identification. *Alternative:* rename H1 to the scoped package name per standard-readme — stricter compliance, uglier page.
8. **Badges: drop only the Biome badge; add no new ones.** It signals internal dev tooling with no consumer value (Art of README). CI, npm version, downloads, license, TS floor, and Socket all carry consumer-relevant signal and stay. `SECURITY.md` gets a text link (from Contributing), not a badge.
9. **Compatibility is a short subsection, not a matrix.** One sentence for the runtime floor ("Node.js ≥ 24 or any runtime with full ES2025 support") and a two-row table mapping package majors to TypeScript ranges (v4 → TS ≥ 6; v3 → TS 5.9.x per CHANGELOG). Sourced from `peerDependencies` history at implementation time.
10. **Error texts are verified empirically before being written.** The audit showed the danger of plausible-but-wrong quoted errors. Implementation includes a scratch-project step that reproduces each quoted error (`TS2688` for `node`/`vite/client`, the missing-package `extends` error) against the pinned TS version, and the README quotes what `tsc` actually printed.

## Risks / Trade-offs

- [Quoted error texts drift with TypeScript releases] → Quote the stable error code + a short paraphrase rather than full sentences where possible; codes (`TS2688`, `TS6053`) are far more stable than message wording.
- [Options tables can still drift from `dist/*.json`] → Out of scope to automate here, but the accuracy pass re-verifies every row once; a follow-up could add a docs-check script.
- [Restructuring breaks inbound deep links (`#notes`, usage anchors that never existed)] → New `###` usage headings only add anchors; the removed `#notes` anchor gets its content under `#troubleshooting` — acceptable, README anchors are not a stable API.
- [Subjective style choices (terminology, column grammar) churn the diff] → Confine the consistency pass to the rules named in the spec so review stays mechanical.
- [`release.yml` badge shows "failing" if a publish step (not checks) fails] → Acceptable: a red badge on a failed release is truthful; the alternative (PR-only `check.yml`) is misleading more often.

## Migration Plan

Single-PR docs change. Rollback = revert the commit. Include a `patch` changeset (README ships in the npm tarball).

## Resolved Questions

- **`LICENSE` copyright holder → `Aleksei Reznichenko`.** `LICENSE` is edited to match `package.json` `author` and the pre-change README; the README License line follows. (Was: README matched `LICENSE`'s `dvashim`.)
- **CI badge → stays on `release.yml`.** No `push` trigger added to `check.yml`; `release.yml` already runs the checks on `main`.