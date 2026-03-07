---
"@dvashim/typescript-config": patch
---

Audit and improve TypeScript configs, tests, CI, and documentation

- **Configs:** Fix `allowUnreachableCode` polarity to `false`, remove deprecated `importsNotUsedAsValues`, add JSONC category comments to all dist configs
- **Tests:** Remove `lib` overrides from test configs so they validate actual config values, add `globals.d.ts` for non-DOM configs
- **CI:** Use `.node-version` file instead of inline `lts/*` in workflows
- **Docs:** Expand README Rules section to cover all 6 configs, improve Use section descriptions, update Configurations table with both nested and flat export paths
- **Tooling:** Update `.gitignore` to ignore all `.tsbuildinfo` files, add `@types/node` and `vite` devDependencies
