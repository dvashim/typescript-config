---
"@dvashim/typescript-config": patch
---

Update development dependencies and pin the release CI to a known-good Node version

- **Deps:** Bump `@biomejs/biome` to ^2.5.1, `@types/node` to ^26.0.1, `validate-package-exports` to ^1.1.0, and `vite` to ^8.1.0
- **CI:** Pin the Release job to Node 24.16.0 to avoid the Node 24.17.0 undici regression that breaks `changeset version`
