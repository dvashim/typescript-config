---
"@dvashim/typescript-config": major
---

Align module settings with TypeScript 6 defaults, and enable `.ts` import rewriting in `lib-dev`.

- `tsconfig.base.json`: remove explicit `module: "es2022"`. TypeScript 6 now applies `module: "esnext"` by default, so library emit shifts from ES2022 to ESNext module syntax.
- `tsconfig.node.json` and `tsconfig.app-react.json`: drop now-redundant `module: "esnext"` overrides (inherited from the TS 6 default).
- `tsconfig.lib-dev.json`: add `allowImportingTsExtensions: true` and `rewriteRelativeImportExtensions: true` so library sources can use `.ts`/`.tsx` import specifiers that are rewritten to `.js`/`.jsx` on emit (TypeScript 5.7+).
