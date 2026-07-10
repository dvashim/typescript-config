---
"@dvashim/typescript-config": patch
---

Remove redundant `isolatedModules` from `tsconfig.base.json` — it is implied by `verbatimModuleSyntax`, which the base config enables, so behavior is unchanged. Only configs that override `verbatimModuleSyntax: false` are affected: they no longer inherit `isolatedModules` and should set it themselves if still wanted.
