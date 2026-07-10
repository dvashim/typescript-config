# package-readme Specification

## Purpose

Defines what the package's `README.md` must contain and guarantee: factual accuracy against the shipped presets and repo metadata, complete onboarding (quick start, per-preset companion dependencies, a verification step), valid and complete preset-selection guidance, the library dev/prod workflow, troubleshooting, conventional document structure, and consistent terminology and style. Each scenario is a checkable assertion about the README.

## Requirements

### Requirement: Factual claims match the repository
Every factual claim in the README SHALL match the repository's source of truth: option tables match `dist/*.json` exactly, the import-specifier table matches `package.json` `exports`, license attribution matches `LICENSE`, badges point at workflows that validate the branch they imply, and quoted error messages are errors TypeScript actually emits. The list of TypeScript 7 defaults the presets rely on SHALL appear exactly once (in Options → Base), with other mentions referencing it.

#### Scenario: License attribution agrees with LICENSE
- **WHEN** a reader compares the README License section with the `LICENSE` file
- **THEN** both name the same copyright holder

#### Scenario: CI badge reflects main
- **WHEN** a reader clicks the CI badge
- **THEN** it shows the status of a workflow that runs against `main` (not only `pull_request` runs)

#### Scenario: Troubleshooting quotes real errors
- **WHEN** a troubleshooting entry quotes an error message
- **THEN** the quoted text is reproducible with the documented cause (verified empirically against the supported TypeScript version)

#### Scenario: No stale flag references
- **WHEN** the README mentions Node's native type stripping
- **THEN** it does not present `--experimental-strip-types` as required (type stripping is default-on since Node 23.6)

### Requirement: Companion dependencies are documented per preset
The README SHALL state, for each preset, every package the consumer must install beyond `@dvashim/typescript-config` and `typescript`: `@types/node` for `node`; `react` and `@types/react` (plus `@types/react-dom` for DOM rendering) for `app-react` and `app-react-vite`; `vite` for `app-react-vite`.

#### Scenario: Node preset user learns about @types/node before first failure
- **WHEN** a reader follows the `node` preset documentation
- **THEN** they are told to install `@types/node` before they would hit `TS2688: Cannot find type definition file for 'node'`

#### Scenario: TS2688 is explained in troubleshooting
- **WHEN** a user hits `TS2688: Cannot find type definition file for '<x>'`
- **THEN** the Troubleshooting section maps it to the missing companion package

### Requirement: Quick start enables first success without reading the full document
The README SHALL contain a copy-pasteable Quick start near the top covering install, a minimal `tsconfig.json` extending a preset, and a verification command (`npx tsc`).

#### Scenario: New user reaches a passing type-check
- **WHEN** a developer lands on the README from npm and follows only the Quick start
- **THEN** they have installed the package, extended a preset, and verified the setup with a single `tsc` invocation

### Requirement: Preset selection guidance is valid and complete
The preset picker SHALL be syntactically valid when copied (no JSON object with duplicate `extends` keys) and SHALL cover the "Node.js application/service" case, either with a recommended composition or an explicit out-of-scope statement.

#### Scenario: Picker content is copy-safe
- **WHEN** a reader copies any snippet from the selection guidance
- **THEN** the copied content is valid JSON/JSONC

#### Scenario: Node service builder gets an answer
- **WHEN** a reader building a Node.js service consults the selection guidance
- **THEN** they find an explicit recommendation or an explicit out-of-scope statement

### Requirement: Library dev/prod pairing is documented as a workflow
The README SHALL show that `lib-dev` and `lib-prod` are used together in one project: the two-file layout (`tsconfig.json` extending `lib-dev`, `tsconfig.prod.json` extending `lib-prod`), the invocation for each (`tsc -b`, `tsc -b tsconfig.prod.json`), and the caveat about stale dev artifacts when both share an `outDir`.

#### Scenario: Library author wires both presets without guessing
- **WHEN** a library author follows the library usage documentation
- **THEN** they know which file extends which preset, how to run dev and release builds, and how to avoid publishing stale `.map` files

### Requirement: Usage examples are minimal and self-consistent
Usage snippets SHALL be copy-pasteable with explanations in prose rather than multi-line `jsonc` banner comments, SHALL have linkable headings, SHALL note that the base preset emits next to sources unless `noEmit` or `outDir` is set, and SHALL include one example of combining presets in a single project (e.g. Vite app + `node` preset for `vite.config.ts` via project references).

#### Scenario: Copied snippet contains no documentation prose
- **WHEN** a reader copies a usage snippet into their project
- **THEN** the snippet carries at most a filename comment, with all explanation living outside the code fence

#### Scenario: Base user is warned about emit
- **WHEN** a reader uses the base preset documentation
- **THEN** they are told `tsc` will emit next to sources unless they add `noEmit` or `outDir`

### Requirement: Document structure follows README conventions
The README SHALL lead with the package name in the intro, place the table of contents directly after the intro and keep it complete, host troubleshooting items under a `## Troubleshooting` heading (not "Notes"), state a concrete compatibility floor (TypeScript and runtime, with a package-major ↔ TypeScript mapping), link `SECURITY.md`, and include contributor setup/validation commands (`pnpm install`, `pnpm run check`, edit `dist/` directly, update matching `tests/` config).

#### Scenario: ToC precedes all sections it links
- **WHEN** a reader uses the table of contents
- **THEN** every linked section appears after the ToC and every section appears in it

#### Scenario: Error-hunting reader finds Troubleshooting
- **WHEN** a user scans headings for help with an error
- **THEN** a `Troubleshooting` heading exists and contains the known failure modes

### Requirement: Terminology and style are consistent
The README SHALL use "preset" for the package's shipped configs and "config"/"tsconfig.json" for the consumer's own file, use a uniform grammatical form in the Options "Effect" and Configurations "Use when" columns, use identical tool/runner lists wherever repeated, and resolve the apparent contradiction between "portable across … Node's native type stripping" and "not tuned for Node's native type stripping" by distinguishing syntax erasability from module resolution.

#### Scenario: Repeated lists agree
- **WHEN** the same enumeration (e.g. TS-aware runners) appears in multiple places
- **THEN** the entries and formatting are identical in each occurrence

#### Scenario: Type-stripping claims are reconciled
- **WHEN** a reader compares the Why section's portability claim with the Node preset's caveat
- **THEN** the text explains that syntax is erasable everywhere while direct `node` execution needs different module resolution
