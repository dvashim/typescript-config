# Proposal: improve-readme

## Why

A five-lens audit (accuracy, structure, writing, onboarding, comparison with `@tsconfig/bases`, `@sindresorhus/tsconfig`, `@total-typescript/tsconfig`, `@vercel/style-guide`) found that the README contains verified factual errors (license attribution contradicts `LICENSE`, the CI badge tracks a workflow that never runs on `main`, a troubleshooting bullet quotes an error TypeScript does not emit) and onboarding gaps that cause hard failures for new users — most notably, presets that require companion packages (`@types/node`, `vite`, React types) without the README ever saying so. Fixing these makes the package adoptable without trial-and-error.

## What Changes

- **Fix factual errors**: align license attribution with `LICENSE` (`© dvashim`); point the CI badge at a workflow that actually validates `main`; replace the "Cannot find / read tsconfig.base.json" troubleshooting bullet with the error `tsc` actually emits and its real cause; drop the stale `--experimental-strip-types` flag reference (type stripping is on by default since Node 23.6); keep a single canonical list of relied-upon TypeScript 6 defaults (today lines 35 and 215 disagree).
- **Document companion dependencies per preset**: `node` → `@types/node`; `app-react`/`app-react-vite` → `react` + `@types/react`; `app-react-vite` → `vite` (ships `vite/client` types). Add a troubleshooting entry for the resulting `TS2688: Cannot find type definition file` error.
- **Add a Quick start** near the top: install → minimal `tsconfig.json` → verify with `npx tsc`.
- **Fix the preset picker**: replace the "Not sure which one?" block (a single JSON object with five duplicate `extends` keys — invalid if copied) with a decision list; add an answer for the uncovered "Node.js application/service" case.
- **Explain the lib-dev/lib-prod pairing**: show the two-file layout (`tsconfig.json` + `tsconfig.prod.json`), how to invoke each (`tsc -b` / `tsc -b tsconfig.prod.json`), and the shared-`outDir`/stale-artifact caveat.
- **Streamline Usage**: move the long `jsonc` banner comments into prose, make snippets minimal and copy-pasteable, give usage variants linkable headings, note that the base preset emits next to sources unless `noEmit`/`outDir` is set, and add a "combining presets in one project" example (Vite app + `node` preset via project references).
- **Improve structure**: move the ToC directly after the intro; split troubleshooting items out of "Notes" into a `## Troubleshooting` section; add a Compatibility note (concrete runtime floor, package-major ↔ TypeScript-version mapping); link `SECURITY.md`; add dev-workflow commands to Contributing; lead the intro with the package name.
- **Consistency pass**: standardize on "preset" terminology, unify the Options "Effect" column phrasing, unify the runner lists (`Vite`, `tsx`, `esbuild`, `swc`), reconcile the apparent contradiction about Node native type stripping (erasable syntax vs. bundler resolution), fix the comma splice in the lib blockquote, and normalize bullet punctuation and "Use when" column grammar.

No breaking changes — documentation only.

## Capabilities

### New Capabilities

- `package-readme`: Requirements for the package's README — factual accuracy against the shipped configs and repo metadata, complete onboarding (quick start, companion dependencies, verification), preset selection guidance, library dev/prod workflow documentation, troubleshooting, and consistent structure/terminology.

### Modified Capabilities

None — `openspec/specs/` is empty; this is the first spec.

## Impact

- `README.md` — the primary file edited.
- `LICENSE` — copyright holder corrected to `Aleksei Reznichenko` to match `package.json` `author` and the pre-change README (resolved open question; see design). The README License line follows it.
- CI badge stays on `release.yml` (resolved open question); no workflow file changes.
- No code, exports, or published config files change; a `patch` changeset is included since README and LICENSE both ship in the npm tarball.