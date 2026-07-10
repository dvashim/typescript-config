# Design: require-typescript-7

## Context

The package ships six JSON tsconfig presets whose stated philosophy is "lean on upstream defaults rather than restating them." TypeScript 7 (the native-compiler major) changed the default landscape: `types: []` and `module: "esnext"` are now defaults, several legacy options are removed, and `alwaysStrict`/`esModuleInterop` are locked on. The branch already carries a verified implementation: all presets type-check identically under 6.0.3 and 7.0.2, emit output is byte-identical, and the TS 7 defaults the presets rely on were confirmed by targeted probes (ambient-types discovery, `module` kind via `import =` rejection, bundler resolution via extension-less imports). Versioning is changesets-driven; the current release line is 4.x with peer `>=6.0.0`.

## Goals / Non-Goals

**Goals:**

- Make TypeScript 7 the only supported major (peer `>=7.0.0`), released as v5.0.0.
- Keep resolved compiler behavior identical for TS 7 consumers while shrinking the base config.
- Close the emit-path test gap: the emitting presets' distinctive options must be exercised by CI.
- Keep the open-ended peer range continuously verified as new TypeScript versions release.
- Keep README/CLAUDE.md/spec factually exact per the `package-readme` spec.

**Non-Goals:**

- TypeScript 8 readiness decisions (the CI matrix has a one-line slot when it ships).
- Adopting `es2026` target/lib (does not exist in TS 7.0).
- Restructuring presets (e.g., a `nodenext`-based Node preset) or adding new ones.
- pnpm supply-chain policy changes (the repo keeps the default `minimumReleaseAge`).

## Decisions

1. **Open peer range `>=7.0.0`, not `>=7 <8`.** Matches historical practice (the `>=6.0.0` range admitted TS 7, which proved fully compatible). A cap would force a major release merely to admit TS 8. Risk of an untested future major is mitigated by the CI matrix decision below.
2. **Remove `types: []` from base rather than keep it for explicitness.** The repo's documented philosophy is to rely on defaults; keeping a now-default option contradicts it. Safety was established empirically: with `@types/node` adjacent, TS 7 resolves no ambient types under both a bare config and the edited base, while a `types: ["node"]` control resolves them — so removal is behavior-neutral. Leaf configs that need ambient types still set their own `types`.
3. **Remove `isolatedModules` as a separate patch changeset.** It is implied by `verbatimModuleSyntax` (verified: TS1205 still enforced under both majors after removal). Splitting it from the major keeps the changelog honest about what is breaking versus cleanup.
4. **Emit smoke tests reuse the `check:ts` glob instead of a new script.** `tests/tsconfig-emit.*.json` are picked up by the existing `for f in ./tests/*.json` loop — zero harness changes. Trade-off: CI asserts exit-0 emit, not emitted content; extension rewriting and `stripInternal` output were verified manually at introduction.
5. **CI matrix installs `typescript@<major>` (latest in range) rather than testing only the lockfile pin.** The peer claim is about a range; the lockfile tests one point in it. The matrix (currently `['7']`) catches a breaking 7.x minor before dependabot moves the lockfile, and gains `'8'` when the range should admit it.
6. **Keep `target`/`lib` pinned at `es2025`.** TS 7 defaults target to "current stable ECMAScript," which moves across releases; pinning keeps preset behavior deterministic regardless of the installed 7.x.

## Risks / Trade-offs

- [A TS 7.x minor changes a relied-on default] → the `peer-typescript` matrix job fails on the next PR, surfacing the drift before consumers report it.
- [Consumers who override `verbatimModuleSyntax: false` previously still inherited `isolatedModules: true`; after removal they get neither] → accepted as patch-level: overriding a preset's core interop option is outside supported use, and the option set is documented.
- [README compatibility table lists `>=5.0.0` as current before v5.0.0 exists on npm] → intentional; the README ships in the same release train as the major, so it is accurate at publish time.
- [Emit tests assert compilation success, not output content] → accepted for now; content checks (rewritten specifiers, stripped `@internal`) were verified once manually and can be hardened later if regressions appear.

## Migration Plan

1. Land the branch PR (CI: `check` + `peer-typescript` matrix must pass).
2. `changesets/action` opens the release PR aggregating the major + patch changesets into v5.0.0.
3. Merge to publish. Consumers on TypeScript 6 stay on `@dvashim/typescript-config@4.x` (documented in README compatibility table and the major changeset).
4. Rollback: revert the peer range and restore the two removed base options — no consumer data or state involved.

## Open Questions

- None blocking. When TypeScript 8 ships: extend the CI matrix to `['7', '8']`, verify, and decide whether the open range remains honest.
