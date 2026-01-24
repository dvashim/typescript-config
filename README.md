# Typescript Configurations

[![npm version](https://img.shields.io/npm/v/@dvashim/typescript-config.svg?logo=npm&style=flat-square&color2=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![npm downloads](https://img.shields.io/npm/dm/@dvashim/typescript-config?logo=npm&style=flat-square&color=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat-square&logo=biome&color=07c&logoColor=fff)](https://biomejs.dev)

## Installation

npm:

```bash
npm install -D @dvashim/typescript-config
```

or pnpm:

```bash
pnpm add -D @dvashim/typescript-config
```

## Configurations

| Name | Path |
|------|------|
| Base | `@dvashim/typescript-config` or `@dvashim/typescript-config/base` |
| Library development | `@dvashim/typescript-config/lib` or `@dvashim/typescript-config/lib/dev` |
| Library production | `@dvashim/typescript-config/lib/prod` |
| React JSX application | `@dvashim/typescript-config/app/react` |
| Vite + React JSX application | `@dvashim/typescript-config/app/react/vite` |
| Node | `@dvashim/typescript-config/node` |

## Use

Base configuration:

```jsonc
// tsconfig.json (base)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.base.tsbuildinfo",
  },
  "include": ["src"]
}
```

Library development configuration:

```jsonc
// tsconfig.json (library development)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib/dev",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.dev.tsbuildinfo",
  },
  "include": ["src"]
}
```

Library production configuration:

```jsonc
// tsconfig.json (library production)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib/prod",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.prod.tsbuildinfo",
  },
  "include": ["src"]
}
```

React JSX application configuration:

```jsonc
// tsconfig.json (react jsx application)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app/react",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
  },
  "include": ["src"]
}
```

Vite + React JSX application configuration:

```jsonc
// tsconfig.json (vite + react jsx application)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app/react/vite",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
  },
  "include": ["src"]
}
```

Node configuration:

```jsonc
// tsconfig.json (node)
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```

## Rules

### Base configuration

#### Module

* **[module](https://www.typescriptlang.org/tsconfig#module)**: `es2022` — Specifies the module code generation format.
* **[moduleDetection](https://www.typescriptlang.org/tsconfig#moduleDetection)**: `force` — Forces all files to be treated as ES modules.
* **[moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution)**: `bundler` — Module resolution strategy optimized for modern bundlers.
* **[verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)**: `true` — Preserves import and export syntax exactly as written.
* **[resolveJsonModule](https://www.typescriptlang.org/tsconfig#resolveJsonModule)**: `true` — Allows importing `.json` files as typed modules.

#### Strictness

* **[strict](https://www.typescriptlang.org/tsconfig#strict)**: `true` — Enables all strict type-checking options.
* **[exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)**: `true` — Treats optional properties as strictly `T | undefined`.
* **[noImplicitOverride](https://www.typescriptlang.org/tsconfig#noImplicitOverride)**: `true` — Requires the `override` keyword when overriding class members.
* **[noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature)**: `true` — Disallows property access via dot notation when defined only by an index signature.
* **[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)**: `true` — Adds `undefined` to types accessed via index signatures.

#### Safety

* **[noUncheckedSideEffectImports](https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports)**: `true` — Reports errors for side-effect imports that are not explicitly used.
* **[allowUnreachableCode](https://www.typescriptlang.org/tsconfig#allowUnreachableCode)**: `true` — Allows unreachable code without compiler errors.
* **[allowUnusedLabels](https://www.typescriptlang.org/tsconfig#allowUnusedLabels)**: `false` — Disallows unused labels in the code.
* **[forceConsistentCasingInFileNames](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)**: `true` — Ensures consistent casing in file name imports across the project.
* **[noFallthroughCasesInSwitch](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch)**: `true` — Reports errors for fallthrough cases in `switch` statements.
* **[noImplicitReturns](https://www.typescriptlang.org/tsconfig#noImplicitReturns)**: `true` — Reports errors when not all code paths in a function return a value.
* **[noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)**: `true` — Reports errors for unused local variables.
* **[noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)**: `true` — Reports errors for unused function parameters.
* **[allowJs](https://www.typescriptlang.org/tsconfig#allowJs)**: `false` — Disallows JavaScript files from being included in the compilation.

#### Emit

* **[target](https://www.typescriptlang.org/tsconfig#target)**: `es2022` — Sets the JavaScript language version for emitted output.
* **[importsNotUsedAsValues](https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues)**: `remove` — Removes imports used only for types from emitted JavaScript.
* **[noEmitOnError](https://www.typescriptlang.org/tsconfig#noEmitOnError)**: `true` — Prevents emitting output files when type errors are present.
* **[lib](https://www.typescriptlang.org/tsconfig#lib)**: `["ES2022"]` — Specifies built-in library declaration files included in compilation.
* **[erasableSyntaxOnly](https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly)**: `true` — Restricts usage to syntax that can be fully erased during compilation.
* **[skipLibCheck](https://www.typescriptlang.org/tsconfig#skipLibCheck)**: `true` — Skips type checking of declaration files for faster builds.
* **[useDefineForClassFields](https://www.typescriptlang.org/tsconfig#useDefineForClassFields)**: `true` — Emits class fields using ECMAScript-standard `define` semantics.

### Node configuration

> This configuration extends the base configuration

#### Module

* **[module](https://www.typescriptlang.org/tsconfig#module)**: `esnext` — Specifies the module code generation format.

#### Emit

* **[noEmit](https://www.typescriptlang.org/tsconfig#noEmit)**: `true` — Disables emitting compiled JavaScript files.

#### Target / Language

* **[target](https://www.typescriptlang.org/tsconfig#target)**: `es2023` — Sets the JavaScript language version for emitted output.
* **[lib](https://www.typescriptlang.org/tsconfig#lib)**: `["ES2023"]` — Specifies built-in library declaration files included in compilation.

#### Types

* **[types](https://www.typescriptlang.org/tsconfig#types)**: `["node"]` — Includes type declarations for Node.js.

#### Module Features

* **[allowImportingTsExtensions](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions)**: `true` — Allows importing TypeScript files with explicit `.ts` extensions.
