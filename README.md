# Using Typescript Configs

[![npm version](https://img.shields.io/npm/v/@dvashim/typescript-config.svg?logo=npm&style=flat-square&color2=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![npm downloads](https://img.shields.io/npm/dm/@dvashim/typescript-config?logo=npm&style=flat-square&color=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat-square&logo=biome&color=07c&logoColor=fff)](https://biomejs.dev)

## Installation

To install this package, you can use npm:

```bash
npm install -D @dvashim/typescript-config
```

or pnpm:

```bash
pnpm add -D @dvashim/typescript-config
```

## Resources

| Name | Path |
|------|------|
| Base configuration | `@dvashim/typescript-config` or `@dvashim/typescript-config/base` |
| Library production configuration | `@dvashim/typescript-config/lib` or `@dvashim/typescript-config/lib/dev` |
| Library development configuration | `@dvashim/typescript-config/lib/prod` |
| React JSX application configuration | `@dvashim/typescript-config/app/react` |
| Vite + React JSX application configuration | `@dvashim/typescript-config/app/react/vite` |
| Node configuration | `@dvashim/typescript-config/node` |

## Description

### Base configuration

Path: `@dvashim/typescript-config` or `@dvashim/typescript-config/base`

| Field name | Value | Description | Category |
|------------|-------|-------------|----------|
| [module](https://www.typescriptlang.org/tsconfig#module) | `es2022` | Specifies the module code generation format. | Module |
| [moduleDetection](https://www.typescriptlang.org/tsconfig#moduleDetection) | `force` | Forces all files to be treated as ES modules. | Module |
| [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution) | `bundler` | Module resolution strategy optimized for modern bundlers. | Module |
| [verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) | `true` | Preserves import and export syntax exactly as written. | Module |
| [resolveJsonModule](https://www.typescriptlang.org/tsconfig#resolveJsonModule) | `true` | Allows importing `.json` files as typed modules. | Module |
| [strict](https://www.typescriptlang.org/tsconfig#strict) | `true` | Enables all strict type-checking options. | Strictness |
| [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes) | `true` | Treats optional properties as strictly `T \| undefined`. | Strictness |
| [noImplicitOverride](https://www.typescriptlang.org/tsconfig#noImplicitOverride) | `true` | Requires the `override` keyword when overriding class members. | Strictness |
| [noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) | `true` | Disallows property access via dot notation when defined only by an index signature. | Strictness |
| [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) | `true` | Adds `undefined` to types accessed via index signatures. | Strictness |
| [noUncheckedSideEffectImports](https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports) | `true` | Reports errors for side-effect imports that are not explicitly used. | Safety |
| [allowUnreachableCode](https://www.typescriptlang.org/tsconfig#allowUnreachableCode) | `true` | Allows unreachable code without compiler errors. | Safety |
| [allowUnusedLabels](https://www.typescriptlang.org/tsconfig#allowUnusedLabels) | `false` | Disallows unused labels in the code. | Safety |
| [forceConsistentCasingInFileNames](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames) | `true` | Ensures consistent casing in file name imports across the project. | Safety |
| [noFallthroughCasesInSwitch](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch) | `true` | Reports errors for fallthrough cases in `switch` statements. | Safety |
| [noImplicitReturns](https://www.typescriptlang.org/tsconfig#noImplicitReturns) | `true` | Reports errors when not all code paths in a function return a value. | Safety |
| [noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals) | `true` | Reports errors for unused local variables. | Safety |
| [noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters) | `true` | Reports errors for unused function parameters. | Safety |
| [allowJs](https://www.typescriptlang.org/tsconfig#allowJs) | `false` | Disallows JavaScript files from being included in the compilation. | Safety |
| [target](https://www.typescriptlang.org/tsconfig#target) | `es2022` | Sets the JavaScript language version for emitted output. | Emit |
| [importsNotUsedAsValues](https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues) | `remove` | Removes imports used only for types from emitted JavaScript. | Emit |
| [noEmitOnError](https://www.typescriptlang.org/tsconfig#noEmitOnError) | `true` | Prevents emitting output files when type errors are present. | Emit |
| [lib](https://www.typescriptlang.org/tsconfig#lib) | `["ES2022"]` | Specifies built-in library declaration files included in compilation. | Emit |
| [erasableSyntaxOnly](https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly) | `true` | Restricts usage to syntax that can be fully erased during compilation. | Emit |
| [skipLibCheck](https://www.typescriptlang.org/tsconfig#skipLibCheck) | `true` | Skips type checking of declaration files for faster builds. | Emit |
| [useDefineForClassFields](https://www.typescriptlang.org/tsconfig#useDefineForClassFields) | `true` | Emits class fields using ECMAScript-standard `define` semantics. | Emit |

## Using

Base config:

```jsonc
// tsconfig.json (base config)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.base.tsbuildinfo",
  },
  "include": ["src"]
}
```

Library development config:

```jsonc
// tsconfig.json (lib development)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib/dev",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.dev.tsbuildinfo",
  },
  "include": ["src"]
}
```

Library production config:

```jsonc
// tsconfig.json (lib production)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib/prod",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.prod.tsbuildinfo",
  },
  "include": ["src"]
}
```

React JSX application config:

```jsonc
// tsconfig.json (react application)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app/react",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
  },
  "include": ["src"]
}
```

Vite + React JSX application config:

```jsonc
// tsconfig.json (vite/react application)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app/react/vite",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
  },
  "include": ["src"]
}
```

### Node config

- This configuration extends the base configuration
- This configuration is type-check–only (noEmit: true), typical for:
  - Vite / ESBuild / SWC pipelines
  - Monorepos with shared base configs
- module: esnext + allowImportingTsExtensions strongly indicates modern ESM-first tooling
- extends suggests this file is an environment-specific overlay, not a full config

| Field name | Value | Description | Category |
|------------|-------|-------------|----------|
| [module](https://www.typescriptlang.org/tsconfig#module) | `esnext` | Emits native ECMAScript modules without downleveling, leaving module handling to the runtime or bundler. | Module |
| [allowImportingTsExtensions](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows imports to include explicit `.ts` and `.tsx` file extensions. | Module |
| [types](https://www.typescriptlang.org/tsconfig#types) | `["node"]` | Includes Node.js global type definitions without importing them explicitly. | Safety |
| [target](https://www.typescriptlang.org/tsconfig#target) | `es2023` | Sets the JavaScript language version expected to run in the target environment. | Emit |
| [lib](https://www.typescriptlang.org/tsconfig#lib) | `["ES2023"]` | Specifies built-in library declaration files available during type checking. | Emit |
| [noEmit](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Disables JavaScript output; TypeScript is used for type-checking only. | Emit |


```jsonc
// tsconfig.json (node)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```
