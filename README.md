# TypeScript Configurations

[![CI][ci-badge]][ci-link]
[![npm version][npm-badge]][npm-link]
[![npm downloads][downloads-badge]][npm-link]
[![License: MIT][license-badge]][license-link]
[![TypeScript][ts-badge]][ts-link]
[![Checked with Biome][biome-badge]][biome-link]
[![Socket][socket-badge]][socket-link]

[ci-badge]: https://img.shields.io/github/actions/workflow/status/dvashim/typescript-config/check.yml?logo=github&label=CI
[ci-link]: https://github.com/dvashim/typescript-config/actions/workflows/check.yml
[npm-badge]: https://img.shields.io/npm/v/@dvashim/typescript-config?label=@dvashim/typescript-config&logo=npm&color=07c
[downloads-badge]: https://img.shields.io/npm/dm/@dvashim/typescript-config?logo=npm&color=07c
[npm-link]: https://www.npmjs.com/package/@dvashim/typescript-config
[license-badge]: https://img.shields.io/npm/l/@dvashim/typescript-config?color=07c
[license-link]: https://github.com/dvashim/typescript-config/blob/main/LICENSE
[ts-badge]: https://img.shields.io/badge/TypeScript-%3E%3D_6-07c?logo=typescript&logoColor=fff
[ts-link]: https://www.typescriptlang.org/
[biome-badge]: https://img.shields.io/badge/Checked_with-Biome-07c?logo=biome&logoColor=fff
[biome-link]: https://biomejs.dev
[socket-badge]: https://socket.dev/api/badge/npm/package/@dvashim/typescript-config
[socket-link]: https://socket.dev/npm/package/@dvashim/typescript-config

Shareable `tsconfig.json` presets for libraries, React applications, and Node.js tooling — strict ES2025 + ESM defaults with bundler module resolution.

Requires **TypeScript >= 6**.

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
| ---- | ---- |
| Base | `@dvashim/typescript-config` |
| Library development | `@dvashim/typescript-config/lib-dev` |
| Library production | `@dvashim/typescript-config/lib-prod` |
| React JSX application | `@dvashim/typescript-config/app-react` |
| Vite + React JSX application | `@dvashim/typescript-config/app-react-vite` |
| Node | `@dvashim/typescript-config/node` |

## Use

Base configuration:

```jsonc
// tsconfig.json (base)
// ---
// Strict ES2025 + ESM foundation with bundler resolution.
// Enforces verbatim module syntax, erasable-only syntax,
// and maximum type safety (strict, exactOptionalPropertyTypes,
// noUncheckedIndexedAccess, noUnusedLocals, etc.).

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config",
  "include": ["src"]
}
```

Library development configuration:

```jsonc
// tsconfig.json (library development)
// ---
// Extends base for library development.
// Enables .d.ts declarations, composite builds,
// source maps, declaration maps, and isolated declarations.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib-dev",
  "include": ["src"]
}
```

Library production configuration:

```jsonc
// tsconfig.json (library production)
// ---
// Extends lib-dev for production builds.
// Strips source maps, declaration maps, comments,
// and @internal declarations for minimal output.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib-prod",
  "include": ["src"]
}
```

React JSX application configuration:

```jsonc
// tsconfig.json (react jsx application)
// ---
// Extends base for React applications.
// Adds DOM + DOM.Iterable + DOM.AsyncIterable libs,
// automatic JSX runtime, esnext modules, and
// .ts/.tsx extension imports.
// No emit — bundler handles output.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react",
  "include": ["src"]
}
```

Vite + React JSX application configuration:

```jsonc
// tsconfig.json (vite + react jsx application)
// ---
// Extends React config with Vite client types
// (import.meta.env, import.meta.hot, asset imports).

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react-vite",
  "include": ["src"]
}
```

Node configuration:

```jsonc
// tsconfig.json (node)
// ---
// Extends base for Node.js tooling files
// (build configs, scripts). @types/node,
// esnext modules, and .ts extension imports.
// No emit — bundler handles output.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```

## Options

### Base

Options listed below are set explicitly. Additional options (`strict`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields`, `esModuleInterop`) rely on TypeScript 6 defaults.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes) | `true` | Optional properties are strictly `T \| undefined` |
| [`noFallthroughCasesInSwitch`](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch) | `true` | Errors on fallthrough `switch` cases |
| [`noImplicitOverride`](https://www.typescriptlang.org/tsconfig#noImplicitOverride) | `true` | Requires `override` keyword on class member overrides |
| [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig#noImplicitReturns) | `true` | Errors when not all code paths return a value |
| [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) | `true` | Disallows dot access for index-signature-only properties |
| [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) | `true` | Adds `undefined` to index-signature access types |
| [`noUnusedLocals`](https://www.typescriptlang.org/tsconfig#noUnusedLocals) | `true` | Errors on unused local variables |
| [`noUnusedParameters`](https://www.typescriptlang.org/tsconfig#noUnusedParameters) | `true` | Errors on unused function parameters |
| [`allowUnreachableCode`](https://www.typescriptlang.org/tsconfig#allowUnreachableCode) | `false` | Errors on unreachable code |
| [`allowUnusedLabels`](https://www.typescriptlang.org/tsconfig#allowUnusedLabels) | `false` | Errors on unused labels |
| [`module`](https://www.typescriptlang.org/tsconfig#module) | `"es2022"` | ES2022 module code generation |
| [`moduleDetection`](https://www.typescriptlang.org/tsconfig#moduleDetection) | `"force"` | All files treated as ES modules |
| [`resolveJsonModule`](https://www.typescriptlang.org/tsconfig#resolveJsonModule) | `true` | Allows importing `.json` files as typed modules |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `[]` | Blocks ambient `@types/*` auto-discovery |
| [`noEmitOnError`](https://www.typescriptlang.org/tsconfig#noEmitOnError) | `true` | Prevents emit when type errors are present |
| [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) | `true` | Preserves import/export syntax as written |
| [`isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) | `true` | Each file can be safely transpiled in isolation |
| [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly) | `true` | No enums, namespaces, or parameter properties |
| [`target`](https://www.typescriptlang.org/tsconfig#target) | `"es2025"` | ES2025 JavaScript output |
| [`lib`](https://www.typescriptlang.org/tsconfig#lib) | `["ES2025"]` | ES2025 built-in type declarations |
| [`skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck) | `true` | Skips type checking of `.d.ts` files |

### Library development

Extends base with emit settings for `.d.ts` generation and incremental builds.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`declaration`](https://www.typescriptlang.org/tsconfig#declaration) | `true` | Emits `.d.ts` type declaration files |
| [`declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap) | `true` | Source maps for `.d.ts` ("Go to Definition" navigates to source) |
| [`sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap) | `true` | Generates `.js.map` source maps |
| [`isolatedDeclarations`](https://www.typescriptlang.org/tsconfig#isolatedDeclarations) | `true` | Requires explicit type annotations on exports |
| [`composite`](https://www.typescriptlang.org/tsconfig#composite) | `true` | Enables project references and incremental compilation |

### Library production

Extends library development; strips debug artifacts for smaller, cleaner output.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap) | `false` | Disables `.js.map` source maps |
| [`declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap) | `false` | Disables `.d.ts.map` source maps |
| [`removeComments`](https://www.typescriptlang.org/tsconfig#removeComments) | `true` | Strips comments from emitted JavaScript |
| [`stripInternal`](https://www.typescriptlang.org/tsconfig#stripInternal) | `true` | Removes `@internal` declarations from `.d.ts` output |

### React JSX application

Extends base for React applications with DOM types and no-emit mode.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`module`](https://www.typescriptlang.org/tsconfig#module) | `"esnext"` | Latest module features for bundler consumption |
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts`/`.tsx` extension imports |
| [`noEmit`](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Bundler handles output |
| [`jsx`](https://www.typescriptlang.org/tsconfig#jsx) | `"react-jsx"` | Automatic JSX runtime (no `import React` needed) |
| [`lib`](https://www.typescriptlang.org/tsconfig#lib) | `["ES2025", "DOM", "DOM.Iterable", "DOM.AsyncIterable"]` | ES2025 + DOM + iterable/async iterable DOM APIs |

### Vite + React JSX application

Extends React JSX application with Vite-specific type declarations.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `["vite/client"]` | Vite client types (`import.meta.env`, `import.meta.hot`, asset imports) |

### Node

Extends base for Node.js tooling files (build configs, scripts) processed by bundlers.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`module`](https://www.typescriptlang.org/tsconfig#module) | `"esnext"` | Latest module features for bundler consumption |
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts` extension imports |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `["node"]` | Node.js global and built-in module types |
| [`noEmit`](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Bundler handles output |
