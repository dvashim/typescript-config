---
"@dvashim/typescript-config": patch
---

Upgrade release tooling to Changesets v3 and harden the CI workflows

- **Tooling:** Move to Changesets v3 (`@changesets/cli` ^3.0.0, `@changesets/changelog-github` ^1.0.0). Replace the removed `prettier` config option with `format: false` — Biome does not format Markdown, so changelogs stay unformatted rather than pulling in a second formatter — and drop config keys that only restated defaults
- **CI:** Rebuild the release workflow on the `changesets/action` v2 sub-actions (`select-mode` → `version`, or `pack` → `publish`), which the v3 CLI requires. Splitting the jobs scopes `id-token: write` to the publish step alone
- **CI:** Start the release workflow from `permissions: {}` and grant each job only what it needs, set `persist-credentials: false` on every checkout, and skip the dependency cache in the release workflow so a privileged job cannot restore a cache written by a lower-privileged one
- **CI:** Run the check workflow on pushes to `main` as well as pull requests, so the CI badge reflects a workflow that actually validates the default branch
- **CI:** Correct a stale `actions/setup-node` version comment (the pinned SHA is v7.0.0, not v6) and group Dependabot's GitHub Actions updates into a single weekly pull request
- **Docs:** Point the CI badge at `check.yml` instead of the release workflow
- **Deps:** Bump dev dependencies (biome, changesets, biome-config, `@types/node`) and pnpm to 11.21.0
