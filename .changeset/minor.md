---
"@dvashim/typescript-config": patch
---

Reorganize all config files and README by official TSConfig reference categories

- **Base config:** Reorganize options by official categories (Type Checking, Modules, Emit, JavaScript Support, Interop Constraints, Language and Environment, Completeness), add `types: []` to prevent auto-inclusion of `@types/*` packages, add `isolatedModules: true` for safe isolated transpilation
- **Extending configs:** Align category comments with official TSConfig categories (Modules, Emit, Language and Environment, Projects)
- **README:** Update Rules section to match new category structure, document `types` and `isolatedModules` options
