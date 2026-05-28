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

## Why

These presets encode an opinionated, modern-TypeScript baseline so you don't have to re-derive it per project:

- **Maximum type safety** — full `strict` plus `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals`/`noUnusedParameters`, and more.
- **ESM-only, bundler-first** — ES2025 module output with `moduleResolution: "bundler"`; no downleveling or polyfilling is performed.
- **Erasable-only syntax** — no enums, namespaces, or parameter properties, so files transpile in isolation and stay portable across `tsc`, esbuild, swc, and Node's native type stripping.

They lean on TypeScript 6 defaults (`strict`, `module: "esnext"`, `moduleResolution: "bundler"`, …) rather than restating them, so the configs stay small and track upstream. Intended for greenfield ES2025 projects that ship or consume ESM on a recent toolchain — not for CommonJS, legacy targets, or projects that need enums/namespaces.

## Contents

- [Why](#why)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configurations](#configurations)
- [Usage](#usage)
- [Options](#options)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [TypeScript](https://www.typescriptlang.org/) `>=6.0.0` (declared as a peer dependency)
- A runtime/toolchain that supports **ES2025** — these presets do not downlevel or polyfill
- A bundler or a modern Node.js ESM loader — configs use `moduleResolution: "bundler"`

## Installation

`typescript` is a **peer dependency** (`>=6.0.0`); it is not bundled and won't always be installed automatically (e.g. pnpm without `auto-install-peers`), so install it alongside this package.

npm:

```bash
npm install -D @dvashim/typescript-config typescript
```

or pnpm:

```bash
pnpm add -D @dvashim/typescript-config typescript
```

## Configurations

| Name | Import specifier | Use when |
| ---- | ---------------- | -------- |
| Base | `@dvashim/typescript-config` | Foundation; extend directly when composing your own preset |
| Library development | `@dvashim/typescript-config/lib-dev` | Developing a publishable library (emits `.d.ts` + `.js`, composite, source maps) |
| Library production | `@dvashim/typescript-config/lib-prod` | Release builds (extends `lib-dev`; strips maps, comments, `@internal`) |
| React JSX application | `@dvashim/typescript-config/app-react` | React app bundled by a non-Vite tool (no emit) |
| Vite + React JSX application | `@dvashim/typescript-config/app-react-vite` | React app bundled by Vite (extends `app-react`; adds `vite/client` types) |
| Node | `@dvashim/typescript-config/node` | Node.js tooling/config files, type-checked only |

Not sure which one? Pick the matching `extends`:

```jsonc
{
  // Publishing a library? Use lib-dev while developing, lib-prod for release builds:
  "extends": "@dvashim/typescript-config/lib-dev",
  // Building a React app bundled by Vite:
  "extends": "@dvashim/typescript-config/app-react-vite",
  // Building a React app with another bundler:
  "extends": "@dvashim/typescript-config/app-react",
  // Type-checking Node tooling (build scripts, config files):
  "extends": "@dvashim/typescript-config/node",
  // Just need the strict ES2025 + ESM base for something else:
  "extends": "@dvashim/typescript-config"
}
```

## Usage

Base configuration:

```jsonc
// tsconfig.json (Base)
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
// tsconfig.json (Library development)
// ---
// Extends base for library development.
// Enables .d.ts declarations, composite builds,
// source maps, declaration maps, isolated declarations,
// and .ts/.tsx → .js/.jsx import rewriting on emit.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib-dev",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

Library production configuration:

```jsonc
// tsconfig.json (Library production)
// ---
// Extends lib-dev for production builds.
// Strips source maps, declaration maps, comments,
// and @internal declarations for minimal output.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/lib-prod",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

> The `lib-dev` and `lib-prod` presets **emit** declarations and JavaScript and enable `composite: true`. Set `outDir` (and usually `rootDir`) yourself, otherwise output lands next to your sources. Because `composite` is on, build in build mode with `tsc -b` for incremental and project-reference (monorepo) builds and a `.tsbuildinfo` cache.

React JSX application configuration:

```jsonc
// tsconfig.json (React JSX application)
// ---
// Extends base for React applications.
// Adds DOM + DOM.Iterable + DOM.AsyncIterable libs,
// automatic JSX runtime, and .ts/.tsx extension imports.
// No emit — bundler handles output.

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react",
  "include": ["src"]
}
```

Vite + React JSX application configuration:

```jsonc
// tsconfig.json (Vite + React JSX application)
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
// tsconfig.json (Node)
// ---
// Extends base for Node.js tooling files
// (build configs, scripts). Adds @types/node
// and allows .ts extension imports. Type-checked
// only (no emit) — run via a bundler or a TS-aware
// runner (Vite, tsx, esbuild).

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```

## Options

### Base

Options listed below are set explicitly. Additional options (`strict`, `module: "esnext"`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields`, `esModuleInterop`) rely on TypeScript 6 defaults.

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
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts`/`.tsx` extension imports in source |
| [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig#rewriteRelativeImportExtensions) | `true` | Rewrites `.ts`/`.tsx` import extensions to `.js`/`.jsx` on emit |
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

Extends base for Node.js tooling files (build configs, scripts), **type-checked only** (`noEmit`). Because it keeps the inherited `moduleResolution: "bundler"` and allows `.ts` extension imports, execution is expected via a bundler or a TypeScript-aware runner (Vite, `tsx`, esbuild, swc). It is **not** tuned for Node's native type stripping (`node --experimental-strip-types`), which requires `nodenext`-style resolution and explicit file extensions — use a runner like `tsx`, or compile first, when running these files.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts` extension imports |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `["node"]` | Node.js global and built-in module types |
| [`noEmit`](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Type-checking only; runner/bundler handles execution |

## Notes

- **Ambient types are off by default.** The base sets `types: []` to block `@types/*` auto-discovery. If you rely on global types (e.g. `node`, `vite/client`, `vitest/globals`), add them to `types` in your own config — the `node` and Vite presets already do this for their cases.
- **Restart the TS server after first install** or after changing `extends`. VS Code and `tsc` resolve the `extends` package specifier from `node_modules`; in VS Code run "TypeScript: Restart TS Server" from the Command Palette.
- **"Cannot find / read tsconfig.base.json"** usually means the `typescript` peer dependency is not installed. See [Installation](#installation).
- **Layering configs.** `extends` accepts an array, so you can compose these presets with project-specific overrides, e.g. `"extends": ["@dvashim/typescript-config/node", "./tsconfig.paths.json"]`.

## Contributing

Issues and pull requests are welcome at [dvashim/typescript-config](https://github.com/dvashim/typescript-config).

This project uses [Changesets](https://github.com/changesets/changesets) for versioning — run `pnpm run changeset` alongside your change to describe it. See the [CHANGELOG](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © Aleksei Reznichenko
