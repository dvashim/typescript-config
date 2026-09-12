---
"@dvashim/typescript-config": patch
---

Update development dependencies and move to pnpm 12

- **Deps:** Bump `@biomejs/biome` to ^2.5.13, `@changesets/changelog-github` to ^1.0.1, `@changesets/cli` to ^3.0.2, `@dvashim/biome-config` to ^1.17.0, `@types/node` to ^26.5.1, and `vite` to ^8.3.0
- **Tooling:** Bump pnpm to 12.4.1 (the lockfile is now two YAML documents) and remove the stale `pnpm-workspace.yaml` — its `allowBuilds` entry targeted esbuild, which is no longer in the dependency graph
- **Tests:** Make the type-check fixture self-contained — the old `globals.d.ts` redeclared `console` on top of the DOM and Node types, an error that only `skipLibCheck` was hiding
