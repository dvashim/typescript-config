# @dvashim/typescript-config

## 1.1.12

### Patch Changes

- [#31](https://github.com/dvashim/typescript-config/pull/31) [`e641ab6`](https://github.com/dvashim/typescript-config/commit/e641ab61098624460b6403472bb77f15e2c31b8f) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Reorganize all config files and README by official TSConfig reference categories

  - **Base config:** Reorganize options by official categories (Type Checking, Modules, Emit, JavaScript Support, Interop Constraints, Language and Environment, Completeness), add `types: []` to prevent auto-inclusion of `@types/*` packages, add `isolatedModules: true` for safe isolated transpilation
  - **Extending configs:** Align category comments with official TSConfig categories (Modules, Emit, Language and Environment, Projects)
  - **README:** Update Rules section to match new category structure, document `types` and `isolatedModules` options

## 1.1.11

### Patch Changes

- [#29](https://github.com/dvashim/typescript-config/pull/29) [`aa9e48d`](https://github.com/dvashim/typescript-config/commit/aa9e48d26bddf09859b24bda5f32702692ff078a) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Audit and improve TypeScript configs, tests, CI, and documentation

  - **Configs:** Fix `allowUnreachableCode` polarity to `false`, remove deprecated `importsNotUsedAsValues`, add JSONC category comments to all dist configs
  - **Tests:** Remove `lib` overrides from test configs so they validate actual config values, add `globals.d.ts` for non-DOM configs
  - **CI:** Use `.node-version` file instead of inline `lts/*` in workflows
  - **Docs:** Expand README Rules section to cover all 6 configs, improve Use section descriptions, update Configurations table with both nested and flat export paths
  - **Tooling:** Update `.gitignore` to ignore all `.tsbuildinfo` files, add `@types/node` and `vite` devDependencies

## 1.1.10

### Patch Changes

- [#27](https://github.com/dvashim/typescript-config/pull/27) [`8f32639`](https://github.com/dvashim/typescript-config/commit/8f326398ae4c80019859d0284b5ec99d70b25755) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Improve CI/CD workflows and fix internal tooling

  - **CI:** Add explicit permissions to check and release workflows
  - **CI:** Prevent release workflow from re-triggering on bot commits
  - **CI:** Run checks before publishing in release workflow
  - **Fix:** Improve `check:ts` script to properly exit on TypeScript errors
  - **Config:** Change changeset access level from restricted to public
  - **Deps:** Update devDependencies (biome, changesets, biome-config, validate-package-exports)

## 1.1.9

### Patch Changes

- [#25](https://github.com/dvashim/typescript-config/pull/25) [`3e2aa2c`](https://github.com/dvashim/typescript-config/commit/3e2aa2c7d685f34c826a4f840f2ccdbdc31457a4) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Update dependencies to the latest

## 1.1.8

### Patch Changes

- [#23](https://github.com/dvashim/typescript-config/pull/23) [`3bac91e`](https://github.com/dvashim/typescript-config/commit/3bac91e48cf42c3887adf43a2409ea42ed8f1402) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Test configs with typescript

## 1.1.7

### Patch Changes

- [#21](https://github.com/dvashim/typescript-config/pull/21) [`178f8c2`](https://github.com/dvashim/typescript-config/commit/178f8c202dd129da51184cad29f51eed60c9b628) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Minor updates

## 1.1.6

### Patch Changes

- [#18](https://github.com/dvashim/typescript-config/pull/18) [`9ecb923`](https://github.com/dvashim/typescript-config/commit/9ecb923c22cb7b961421d72429cae31c47d2d7b5) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Readme minor fixes

## 1.1.5

### Patch Changes

- [#16](https://github.com/dvashim/typescript-config/pull/16) [`4da7a61`](https://github.com/dvashim/typescript-config/commit/4da7a610e691bc4c4b393d8d6feccb3e7401e616) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Update Biome and configs

## 1.1.4

### Patch Changes

- [#14](https://github.com/dvashim/typescript-config/pull/14) [`10e7fa3`](https://github.com/dvashim/typescript-config/commit/10e7fa37382148361fee9638eb5f81ccc84e91db) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Add descriptions to readme

## 1.1.3

### Patch Changes

- [#12](https://github.com/dvashim/typescript-config/pull/12) [`3ce0afb`](https://github.com/dvashim/typescript-config/commit/3ce0afb65a690f5272dd41c55beaeabc38a82bdf) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Fix badge label

## 1.1.2

### Patch Changes

- [#10](https://github.com/dvashim/typescript-config/pull/10) [`7ac1c3b`](https://github.com/dvashim/typescript-config/commit/7ac1c3bb4fee24569b29d207a8f9410feb5a7819) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Improve readme

## 1.1.1

### Patch Changes

- [#8](https://github.com/dvashim/typescript-config/pull/8) [`06352c0`](https://github.com/dvashim/typescript-config/commit/06352c004c1c6d92b94a5b11a0a962da3bd6bf3d) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Add README badges

## 1.1.0

### Minor Changes

- [#6](https://github.com/dvashim/typescript-config/pull/6) [`f0da2aa`](https://github.com/dvashim/typescript-config/commit/f0da2aa09ce9979b24d9ae75bf232ecc93b09996) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Update configs, add app/node for vite/react projects, improve README

## 1.0.3

### Patch Changes

- [`c53f5e7`](https://github.com/dvashim/typescript-config/commit/c53f5e72a0c76f019dbb922cdb07a53e17571cb4) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Testing release

## 1.0.2

### Patch Changes

- [#3](https://github.com/dvashim/typescript-config/pull/3) [`5821908`](https://github.com/dvashim/typescript-config/commit/58219087547249568c135cbf22fd08d4580317eb) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Update Readme (2)

## 1.0.1

### Patch Changes

- [#1](https://github.com/dvashim/typescript-config/pull/1) [`63c4c43`](https://github.com/dvashim/typescript-config/commit/63c4c4365a1cd4437fed49fb885145777fa42978) Thanks [@aleksei-reznichenko](https://github.com/aleksei-reznichenko)! - Update Readme
