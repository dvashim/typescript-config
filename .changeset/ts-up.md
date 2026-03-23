---
"@dvashim/typescript-config": major
---

Upgrade to TypeScript 6

- **Breaking:** Require TypeScript >= 6 (added as peerDependency); configs now rely on TS 6 defaults for `strict`, `moduleResolution`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, and `useDefineForClassFields`
- **Configs:** Bump base target/lib from es2022 to es2024
- **Configs:** Add `isolatedDeclarations` to lib-dev
- **Configs:** Add `DOM.AsyncIterable` to app-react lib
- **Configs:** Add explicit `types: []` to lib-dev and app-react
- **Configs:** Remove redundant `inlineSources` from lib-prod and `removeComments` from lib-dev
- **Configs:** Node config now inherits target/lib from base
- **Build:** Upgrade to Node 24, TypeScript 6, Vite 8, Biome 2.4.8
- **Tests:** Enrich test file to exercise strict options; clean up test configs
- **Docs:** Update CLAUDE.md and README to reflect all changes
