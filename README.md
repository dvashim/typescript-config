# TypeScript Configurations

[![npm version](https://img.shields.io/npm/v/@dvashim/typescript-config.svg?label=@dvashim/typescript-config&logo=npm&style=flat-square&color2=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![npm downloads](https://img.shields.io/npm/dm/@dvashim/typescript-config?logo=npm&style=flat-square&color=07c)](https://www.npmjs.com/package/@dvashim/typescript-config) [![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat-square&logo=biome&color=07c&logoColor=fff)](https://biomejs.dev)

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
|------|------|
| Base | `@dvashim/typescript-config` or `@dvashim/typescript-config/base` |
| Library development | `@dvashim/typescript-config/lib/dev` or `@dvashim/typescript-config/lib-dev` |
| Library production | `@dvashim/typescript-config/lib/prod` or `@dvashim/typescript-config/lib-prod` |
| React JSX application | `@dvashim/typescript-config/app/react` or `@dvashim/typescript-config/app-react` |
| Vite + React JSX application | `@dvashim/typescript-config/app/react/vite` or `@dvashim/typescript-config/app-react-vite` |
| Node | `@dvashim/typescript-config/node` |

## Use

Base configuration:

```jsonc
// tsconfig.json (base)

// Strict ES2024 + ESM foundation with bundler resolution.
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

## Rules

### Base configuration

Options listed below are set explicitly. Additional options (`strict`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields`, `esModuleInterop`) rely on TypeScript 6 defaults.

* Type Checking

  * **[exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)**: `true` — Treats optional properties as strictly `T | undefined`.
  * **[noFallthroughCasesInSwitch](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch)**: `true` — Reports errors for fallthrough cases in `switch` statements.
  * **[noImplicitOverride](https://www.typescriptlang.org/tsconfig#noImplicitOverride)**: `true` — Requires the `override` keyword when overriding class members.
  * **[noImplicitReturns](https://www.typescriptlang.org/tsconfig#noImplicitReturns)**: `true` — Reports errors when not all code paths in a function return a value.
  * **[noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature)**: `true` — Disallows property access via dot notation when defined only by an index signature.
  * **[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)**: `true` — Adds `undefined` to types accessed via index signatures.
  * **[noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)**: `true` — Reports errors for unused local variables.
  * **[noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)**: `true` — Reports errors for unused function parameters.
  * **[allowUnreachableCode](https://www.typescriptlang.org/tsconfig#allowUnreachableCode)**: `false` — Reports errors for unreachable code after `return`, `throw`, `break`, or `continue`.
  * **[allowUnusedLabels](https://www.typescriptlang.org/tsconfig#allowUnusedLabels)**: `false` — Reports errors for unused labels in the code.

* Modules

  * **[module](https://www.typescriptlang.org/tsconfig#module)**: `es2022` — Specifies the module code generation format.
  * **[moduleDetection](https://www.typescriptlang.org/tsconfig#moduleDetection)**: `force` — Forces all files to be treated as ES modules.
  * **[resolveJsonModule](https://www.typescriptlang.org/tsconfig#resolveJsonModule)**: `true` — Allows importing `.json` files as typed modules.
  * **[types](https://www.typescriptlang.org/tsconfig#types)**: `[]` — Disables auto-inclusion of `@types/*` packages; extending configs provide their own.

* Emit

  * **[noEmitOnError](https://www.typescriptlang.org/tsconfig#noEmitOnError)**: `true` — Prevents emitting output files when type errors are present.

* Interop Constraints

  * **[verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)**: `true` — Preserves import and export syntax exactly as written.
  * **[isolatedModules](https://www.typescriptlang.org/tsconfig#isolatedModules)**: `true` — Ensures each file can be safely transpiled in isolation.
  * **[erasableSyntaxOnly](https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly)**: `true` — Restricts usage to syntax that can be fully erased during compilation (no enums, namespaces, or parameter properties).

* Language and Environment

  * **[target](https://www.typescriptlang.org/tsconfig#target)**: `es2024` — Sets the JavaScript language version for emitted output.
  * **[lib](https://www.typescriptlang.org/tsconfig#lib)**: `["ES2024"]` — Specifies built-in library declaration files included in compilation.

* Completeness

  * **[skipLibCheck](https://www.typescriptlang.org/tsconfig#skipLibCheck)**: `true` — Skips type checking of declaration files for faster builds.

---

### Library development configuration

Extends the base configuration with emit settings for `.d.ts` generation and incremental builds.

* Emit

  * **[declaration](https://www.typescriptlang.org/tsconfig#declaration)**: `true` — Emits `.d.ts` type declaration files alongside JavaScript output.
  * **[declarationMap](https://www.typescriptlang.org/tsconfig#declarationMap)**: `true` — Generates source maps for `.d.ts` files, enabling "Go to Definition" to navigate to the original source.
  * **[sourceMap](https://www.typescriptlang.org/tsconfig#sourceMap)**: `true` — Generates `.js.map` source map files for debugging.

* Modules

  * **[types](https://www.typescriptlang.org/tsconfig#types)**: `[]` — Explicitly blocks ambient `@types/*` auto-discovery.

* Interop Constraints

  * **[isolatedDeclarations](https://www.typescriptlang.org/tsconfig#isolatedDeclarations)**: `true` — Requires explicit type annotations on exports so declaration files can be generated by tools other than `tsc`.

* Projects

  * **[composite](https://www.typescriptlang.org/tsconfig#composite)**: `true` — Enables project references and incremental compilation.

---

### Library production configuration

Extends the library development configuration and strips debug artifacts for smaller, cleaner output.

* Emit

  * **[sourceMap](https://www.typescriptlang.org/tsconfig#sourceMap)**: `false` — Disables `.js.map` source map generation.
  * **[declarationMap](https://www.typescriptlang.org/tsconfig#declarationMap)**: `false` — Disables `.d.ts.map` source map generation.
  * **[removeComments](https://www.typescriptlang.org/tsconfig#removeComments)**: `true` — Strips comments from emitted JavaScript.
  * **[stripInternal](https://www.typescriptlang.org/tsconfig#stripInternal)**: `true` — Removes declarations marked with `@internal` JSDoc tags from `.d.ts` output.

---

### React JSX application configuration

Extends the base configuration for React applications with DOM types and no-emit mode.

* Modules

  * **[module](https://www.typescriptlang.org/tsconfig#module)**: `esnext` — Uses the latest module features for bundler consumption.
  * **[allowImportingTsExtensions](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions)**: `true` — Allows importing TypeScript files with explicit `.ts`/`.tsx` extensions.
  * **[types](https://www.typescriptlang.org/tsconfig#types)**: `[]` — Explicitly blocks ambient `@types/*` auto-discovery.

* Emit

  * **[noEmit](https://www.typescriptlang.org/tsconfig#noEmit)**: `true` — Disables emitting compiled JavaScript files (bundler handles output).

* Language and Environment

  * **[jsx](https://www.typescriptlang.org/tsconfig#jsx)**: `react-jsx` — Uses the automatic React JSX runtime (`react/jsx-runtime`), no manual `import React` needed.
  * **[lib](https://www.typescriptlang.org/tsconfig#lib)**: `["ES2024", "DOM", "DOM.Iterable", "DOM.AsyncIterable"]` — Includes ES2024 APIs, DOM APIs, iterable DOM collections, and async iterable DOM APIs (e.g., `ReadableStream` async iteration).

---

### Vite + React JSX application configuration

Extends the React JSX application configuration with Vite-specific type declarations.

* Modules

  * **[types](https://www.typescriptlang.org/tsconfig#types)**: `["vite/client"]` — Includes Vite client types (`import.meta.env`, `import.meta.hot`, asset imports). Restricts auto-included global types to only `vite/client`.

---

### Node configuration

Extends the base configuration for Node.js tooling files (Vite configs, build scripts, etc.) processed by bundlers.

* Modules

  * **[module](https://www.typescriptlang.org/tsconfig#module)**: `esnext` — Uses the latest module features for bundler consumption.
  * **[allowImportingTsExtensions](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions)**: `true` — Allows importing TypeScript files with explicit `.ts` extensions.
  * **[types](https://www.typescriptlang.org/tsconfig#types)**: `["node"]` — Includes type declarations for Node.js globals and built-in modules.

* Emit

  * **[noEmit](https://www.typescriptlang.org/tsconfig#noEmit)**: `true` — Disables emitting compiled JavaScript files (bundler handles output).
