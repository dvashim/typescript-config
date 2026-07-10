# package-readme Delta

## MODIFIED Requirements

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
