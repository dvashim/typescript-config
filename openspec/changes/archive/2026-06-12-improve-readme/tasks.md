# Tasks: improve-readme

## 1. Empirical verification (before writing any quoted error)

- [x] 1.1 In a scratch project (outside the repo) with the pinned TS version, reproduce and record the exact errors for: missing `@dvashim/typescript-config` when `extends` references it; missing `@types/node` with the `node` preset; missing `vite` with the `app-react-vite` preset; missing `react`/`@types/react` with `app-react` on a `.tsx` file
- [x] 1.2 Confirm the base preset emits `.js` next to sources on a clean compile (no `noEmit`/`outDir`)
- [x] 1.3 Record the package-major ↔ TypeScript-range mapping from CHANGELOG/git history for the Compatibility table

## 2. Accuracy fixes

- [x] 2.1 Set the README License line to `[MIT](./LICENSE) © Aleksei Reznichenko` and edit `LICENSE` to `Copyright (c) 2026 Aleksei Reznichenko` (resolved: match `package.json` `author`, not the old `dvashim`)
- [x] 2.2 Point the CI badge at `release.yml?branch=main` and verify it renders (resolved: keep on `release.yml`, no `push` trigger added to `check.yml`)
- [x] 2.3 Replace the "Cannot find / read tsconfig.base.json" troubleshooting bullet with the verified missing-package error and correct cause (moves to Troubleshooting in task 5.1)
- [x] 2.4 Remove `--experimental-strip-types`; describe type stripping as default-on since Node 23.6
- [x] 2.5 Keep the canonical TS 6 defaults list only in Options → Base; make the Why section reference it without enumerating
- [x] 2.6 Re-verify every Options table row and the import-specifier table against `dist/*.json` and `package.json` `exports`

## 3. Top matter and selection guidance

- [x] 3.1 Lead the intro sentence with `@dvashim/typescript-config`; drop the Biome badge
- [x] 3.2 Add a Quick start section as the first section after the ToC: install command, minimal `tsconfig.json`, `npx tsc` verification
- [x] 3.3 Move the Contents section directly after the intro (per spec: every section listed and after the ToC); update entries for all new/renamed sections
- [x] 3.4 Add the concrete runtime floor to Requirements and a Compatibility subsection with the package↔TS mapping from 1.3
- [x] 3.5 Replace the duplicate-`extends` picker block with a prose decision list linking to each usage section, including the Node-service branch (base + `"types": ["node"]` + emit strategy, or `lib-dev` with `tsc`)

## 4. Usage restructure

- [x] 4.1 Promote each usage variant to a `###` heading; move `jsonc` banner comments into one-sentence prose intros, leaving at most a filename comment in each snippet
- [x] 4.2 Add the emit warning to the base preset usage (emits next to sources unless `noEmit`/`outDir`)
- [x] 4.3 Rewrite the library section as a dev/prod pair: `tsconfig.json` (lib-dev) + `tsconfig.prod.json` (lib-prod), `tsc -b` vs `tsc -b tsconfig.prod.json`, shared-`outDir` stale-artifact caveat; fix the comma splice while rewriting the blockquote
- [x] 4.4 Add companion-dependency notes under each affected preset heading: `@types/node` (node), `react` + `@types/react` (+ `@types/react-dom`) (app-react*), `vite` (app-react-vite)
- [x] 4.5 Add a "Combining presets in one project" example: root `tsconfig.json` with `references` to `tsconfig.app.json` (app-react-vite) and `tsconfig.node.json` (node, includes `vite.config.ts`)
- [x] 4.6 Move the ambient-types and `extends`-array bullets from Notes into Usage as a "Composing presets" note

## 5. Troubleshooting and contributing

- [x] 5.1 Create `## Troubleshooting` with: restart-TS-server note, verified missing-package error (from 2.3), and a `TS2688: Cannot find type definition file` entry mapping each type name to its companion package
- [x] 5.2 Remove the now-empty Notes section
- [x] 5.3 Add contributor workflow to Contributing: pnpm + Node 24, `pnpm install`, `pnpm run check`, edit `dist/*.json` directly, update the matching `tests/tsconfig-test.*.json`; link `SECURITY.md`

## 6. Consistency pass

- [x] 6.1 Standardize terminology: "preset" for shipped configs, "config"/`tsconfig.json` for the consumer's file (including section headings and ToC anchors)
- [x] 6.2 Unify Options "Effect" cells to verb-led fragments and Configurations "Use when" cells to one grammatical form
- [x] 6.3 Use the identical runner list (`Vite`, `tsx`, `esbuild`, `swc`) everywhere; code-format `tsx` consistently
- [x] 6.4 Reconcile the type-stripping claims: Why keeps the portability claim, Node preset section explains erasable syntax vs. bundler-style resolution
- [x] 6.5 Normalize bullet terminal punctuation across Why/Requirements/Troubleshooting lists

## 7. Validation

- [x] 7.1 Verify every ToC entry has a matching heading and every `##` section is listed; check all intra-doc anchors and relative links (`./LICENSE`, `./CHANGELOG.md`, `SECURITY.md`) resolve
- [x] 7.2 Copy-paste each snippet into a scratch file and confirm it parses as valid JSON/JSONC
- [x] 7.3 Run `pnpm run check`; fix any formatting fallout
- [x] 7.4 Add a `patch` changeset describing the README overhaul