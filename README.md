# TypeScript Configurations

[![CI][ci-badge]][ci-link]
[![npm version][npm-badge]][npm-link]
[![npm downloads][downloads-badge]][npm-link]
[![License: MIT][license-badge]][license-link]
[![TypeScript][ts-badge]][ts-link]
[![Socket][socket-badge]][socket-link]

`@dvashim/typescript-config` provides shareable `tsconfig.json` presets for libraries, React applications, and Node.js tooling — strict ES2025 + ESM defaults with bundler module resolution.

## Contents

- [Quick start](#quick-start)
- [Why](#why)
- [Requirements](#requirements)
  - [Compatibility](#compatibility)
- [Installation](#installation)
- [Presets](#presets)
  - [Choosing a preset](#choosing-a-preset)
- [Usage](#usage)
  - [Base preset](#base-preset)
  - [Library presets: lib-dev and lib-prod](#library-presets-lib-dev-and-lib-prod)
  - [React preset: app-react](#react-preset-app-react)
  - [Vite React preset: app-react-vite](#vite-react-preset-app-react-vite)
  - [Node preset](#node-preset)
  - [Combining presets in one project](#combining-presets-in-one-project)
  - [Composing presets](#composing-presets)
- [Options](#options)
  - [Base](#base)
  - [Library development](#library-development)
  - [Library production](#library-production)
  - [React JSX application](#react-jsx-application)
  - [Vite + React JSX application](#vite--react-jsx-application)
  - [Node](#node)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Quick start

Install the package together with TypeScript:

```bash
npm install -D @dvashim/typescript-config typescript
```

Create a `tsconfig.json` that extends a preset:

```jsonc
// tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config",
  "compilerOptions": { "noEmit": true },
  "include": ["src"]
}
```

Verify the setup:

```bash
npx tsc
```

A clean exit means the preset resolved and your sources type-check. Pick the right preset for your project type in [Choosing a preset](#choosing-a-preset) — some presets need a companion package, listed per preset under [Usage](#usage).

## Why

These presets encode an opinionated, modern-TypeScript baseline so you don't have to re-derive it per project:

- **Maximum type safety** — full `strict` plus `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals`/`noUnusedParameters`, and more.
- **ESM-only, bundler-first** — ES2025 module output with `moduleResolution: "bundler"`; no downleveling or polyfilling is performed.
- **Erasable-only syntax** — no enums, namespaces, or parameter properties, so files transpile in isolation and stay portable across `tsc`, esbuild, swc, and Node's native type stripping.

The presets lean on TypeScript 7 defaults rather than restating them — see [Options](#options) for the exact list — so they stay small and track upstream. They are intended for greenfield ES2025 projects that ship or consume ESM on a recent toolchain, not for CommonJS, legacy targets, or projects that need enums or namespaces.

## Requirements

- [TypeScript](https://www.typescriptlang.org/) `>=7.0.0`, declared as a peer dependency.
- A runtime that supports **ES2025** — Node.js >= 24 or a current evergreen browser; these presets do not downlevel or polyfill.
- A bundler or a TypeScript-aware runner — the presets use `moduleResolution: "bundler"`.

Some presets also require a companion package (`@types/node`, `vite`, React's types); each preset's [Usage](#usage) section lists its own.

### Compatibility

| `@dvashim/typescript-config` | TypeScript |
| ---------------------------- | ---------- |
| `>=5.0.0` (current)          | `>=7.0.0`  |
| `2.x`–`4.x`                  | `>=6.0.0`  |
| `1.x`                        | `5.x`      |

Changes that can surface new type errors in consuming projects ship as major versions.

## Installation

`typescript` is a **peer dependency** (`>=7.0.0`); it is not bundled and won't always be installed automatically (e.g. pnpm without `auto-install-peers`), so install it alongside this package.

npm:

```bash
npm install -D @dvashim/typescript-config typescript
```

or pnpm:

```bash
pnpm add -D @dvashim/typescript-config typescript
```

## Presets

| Preset | Import specifier | Use when |
| ------ | ---------------- | -------- |
| Base | `@dvashim/typescript-config` | Composing your own preset on the strict ES2025 + ESM foundation |
| Library development | `@dvashim/typescript-config/lib-dev` | Developing a publishable library (declarations, composite, source maps) |
| Library production | `@dvashim/typescript-config/lib-prod` | Cutting release builds of a library (strips maps, comments, `@internal`) |
| React JSX application | `@dvashim/typescript-config/app-react` | Building a React app with a non-Vite bundler |
| Vite + React JSX application | `@dvashim/typescript-config/app-react-vite` | Building a React app with Vite |
| Node | `@dvashim/typescript-config/node` | Type-checking Node.js tooling and config files |

### Choosing a preset

- **Publishing a library?** Use `"extends": "@dvashim/typescript-config/lib-dev"` while developing and `lib-prod` for release builds — see [Library presets](#library-presets-lib-dev-and-lib-prod).
- **Building a React app with Vite?** Use `"extends": "@dvashim/typescript-config/app-react-vite"` — see [Vite React preset](#vite-react-preset-app-react-vite).
- **Building a React app with another bundler?** Use `"extends": "@dvashim/typescript-config/app-react"` — see [React preset](#react-preset-app-react).
- **Type-checking Node.js tooling (build scripts, config files)?** Use `"extends": "@dvashim/typescript-config/node"` — see [Node preset](#node-preset).
- **Building a Node.js application or service?** There is no dedicated preset: extend the base, add `"types": ["node"]` (with `@types/node` installed), and pick an emit strategy — an `outDir` if `tsc` builds it, or `noEmit` plus a bundler or runner. If `tsc` compiles your service, the [library presets](#library-presets-lib-dev-and-lib-prod) also work.
- **Anything else?** Use `"extends": "@dvashim/typescript-config"` (the [base preset](#base-preset)) and add what you need.

## Usage

Every preset is consumed the same way: a `tsconfig.json` that `extends` the import specifier, plus your `include` paths. The snippets below are complete files.

### Base preset

The strict ES2025 + ESM foundation with bundler resolution — maximum type safety, verbatim module syntax, and erasable-only syntax. All other presets extend it.

```jsonc
// tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config",
  "include": ["src"]
}
```

> The base preset sets neither `noEmit` nor `outDir`, so a plain `tsc` run emits `.js` files next to your sources. Add `"noEmit": true` for check-only setups, or an `outDir` with an explicit `rootDir` if you want `tsc` output — TypeScript 7 rejects an `outDir` whose `rootDir` is left implicit when sources sit in a subdirectory (`TS5011`).

### Library presets: lib-dev and lib-prod

A library uses the two presets together. `tsconfig.json` extends `lib-dev` and drives the editor and development builds — declarations with declaration maps, source maps, `.ts` → `.js` import rewriting, and explicit type annotations on exports (`isolatedDeclarations`). `tsconfig.prod.json` extends `lib-prod` for release builds — it strips source maps, declaration maps, comments, and `@internal` declarations.

```jsonc
// tsconfig.json — development and editor
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

```jsonc
// tsconfig.prod.json — release builds
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

> Both presets **emit**, so set `outDir` (and usually `rootDir`) yourself; otherwise output lands next to your sources. Because `composite` is on, compile in build mode: `tsc -b` (or `tsc -b -w`) during development and `tsc -b tsconfig.prod.json` for releases — this gives you incremental builds, project references (monorepos), and a `.tsbuildinfo` cache. The two configs share an `outDir` but keep separate `.tsbuildinfo` caches, so clean the output directory (or pass `--force`) before a release build to keep stale development artifacts (`.js.map`, `.d.ts.map`) out of the published package. Both presets inherit the ES2025-only `lib`, so library sources that read `import.meta.url` need `"types": ["node"]` in your own config — see [Troubleshooting](#troubleshooting).

### React preset: app-react

For React applications bundled by a non-Vite tool. Adds the DOM libs (`DOM`, `DOM.Iterable`, `DOM.AsyncIterable`), the automatic JSX runtime, and `.ts`/`.tsx` extension imports; `noEmit` is on because the bundler produces output.

Requires React's types for the automatic JSX runtime — `npm install react` and `npm install -D @types/react` (add `@types/react-dom` when rendering to the DOM). Without them, every `.tsx` file fails with `TS2875` ("This JSX tag requires the module path 'react/jsx-runtime' to exist").

```jsonc
// tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react",
  "include": ["src"]
}
```

### Vite React preset: app-react-vite

Extends the React preset with Vite client types (`import.meta.env`, `import.meta.hot`, asset imports).

Requires `vite` in the same package, in addition to the React type packages above — the `vite/client` types ship inside the `vite` package itself (there is no `@types/vite`). In a pnpm workspace, `vite` must be a dependency of the package that extends this preset, not only of the workspace root. Without it, `tsc` fails with `TS2688: Cannot find type definition file for 'vite/client'`.

```jsonc
// tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react-vite",
  "include": ["src"]
}
```

### Node preset

For Node.js tooling and config files (build scripts, `vite.config.ts`) — type-checking only, `noEmit` is on.

Requires `@types/node`: `npm install -D @types/node`. Without it, `tsc` fails with `TS2688: Cannot find type definition file for 'node'`.

```jsonc
// tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```

> The preset keeps the inherited `moduleResolution: "bundler"` and allows `.ts` extension imports, so execute these files with a bundler or a TypeScript-aware runner (Vite, `tsx`, esbuild, swc). The erasable-only syntax means the files _transpile_ anywhere, but Node's native type stripping (enabled by default since Node 23.6) expects `nodenext`-style resolution and explicit file extensions — for direct execution, use a runner like `tsx` or compile first.

### Combining presets in one project

A single project often needs two presets — for example, a Vite app whose `src` is checked by `app-react-vite` while `vite.config.ts` is checked by `node`. Use a solution-style root config with project references, and run `tsc -b` to check both:

```jsonc
// tsconfig.json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
```

```jsonc
// tsconfig.app.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/app-react-vite",
  "include": ["src"]
}
```

```jsonc
// tsconfig.node.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@dvashim/typescript-config/node",
  "include": ["vite.config.ts"]
}
```

### Composing presets

- **Ambient types are off by default.** TypeScript 7 defaults to `types: []`, so `@types/*` packages are not auto-discovered. If you rely on global types (e.g. `node`, `vite/client`, `vitest/globals`), add them to `types` in your own config — the Node and Vite presets already do this for their cases. The same applies to `import.meta`: its members are contributed by ambient types rather than by the ES2025 lib, so `import.meta.url` needs `"types": ["node"]` (or a DOM lib) to type-check.
- **Layering presets.** `extends` accepts an array, so you can compose a preset with project-specific overrides, e.g. `"extends": ["@dvashim/typescript-config/node", "./tsconfig.paths.json"]`.

## Options

### Base

Options listed below are set explicitly. Additional options rely on TypeScript 7 defaults rather than being restated: `strict`, `module: "esnext"`, `moduleResolution: "bundler"`, `noUncheckedSideEffectImports`, `forceConsistentCasingInFileNames`, `useDefineForClassFields`, `esModuleInterop`, and `types: []` (blocks ambient `@types/*` auto-discovery).

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes) | `true` | Types optional properties strictly as `T \| undefined` |
| [`noFallthroughCasesInSwitch`](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch) | `true` | Errors on fallthrough `switch` cases |
| [`noImplicitOverride`](https://www.typescriptlang.org/tsconfig#noImplicitOverride) | `true` | Requires the `override` keyword on class member overrides |
| [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig#noImplicitReturns) | `true` | Errors when not all code paths return a value |
| [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) | `true` | Disallows dot access for index-signature-only properties |
| [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) | `true` | Adds `undefined` to index-signature access types |
| [`noUnusedLocals`](https://www.typescriptlang.org/tsconfig#noUnusedLocals) | `true` | Errors on unused local variables |
| [`noUnusedParameters`](https://www.typescriptlang.org/tsconfig#noUnusedParameters) | `true` | Errors on unused function parameters |
| [`allowUnreachableCode`](https://www.typescriptlang.org/tsconfig#allowUnreachableCode) | `false` | Errors on unreachable code |
| [`allowUnusedLabels`](https://www.typescriptlang.org/tsconfig#allowUnusedLabels) | `false` | Errors on unused labels |
| [`moduleDetection`](https://www.typescriptlang.org/tsconfig#moduleDetection) | `"force"` | Treats all files as ES modules |
| [`resolveJsonModule`](https://www.typescriptlang.org/tsconfig#resolveJsonModule) | `true` | Allows importing `.json` files as typed modules |
| [`noEmitOnError`](https://www.typescriptlang.org/tsconfig#noEmitOnError) | `true` | Prevents emit when type errors are present |
| [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) | `true` | Preserves import/export syntax as written; implies [`isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) |
| [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly) | `true` | Forbids enums, namespaces, and parameter properties |
| [`target`](https://www.typescriptlang.org/tsconfig#target) | `"es2025"` | Emits ES2025 JavaScript |
| [`lib`](https://www.typescriptlang.org/tsconfig#lib) | `["ES2025"]` | Loads ES2025 built-in type declarations |
| [`skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck) | `true` | Skips type checking of `.d.ts` files |

### Library development

Extends base with emit settings for `.d.ts` generation and incremental builds.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts`/`.tsx` extension imports in source |
| [`rewriteRelativeImportExtensions`](https://www.typescriptlang.org/tsconfig#rewriteRelativeImportExtensions) | `true` | Rewrites `.ts`/`.tsx` import extensions to `.js`/`.jsx` on emit |
| [`declaration`](https://www.typescriptlang.org/tsconfig#declaration) | `true` | Emits `.d.ts` type declaration files |
| [`declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap) | `true` | Emits source maps for `.d.ts` ("Go to Definition" navigates to source) |
| [`sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap) | `true` | Emits `.js.map` source maps |
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
| [`noEmit`](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Disables emit; the bundler produces output |
| [`jsx`](https://www.typescriptlang.org/tsconfig#jsx) | `"react-jsx"` | Uses the automatic JSX runtime (no `import React` needed) |
| [`lib`](https://www.typescriptlang.org/tsconfig#lib) | `["ES2025", "DOM", "DOM.Iterable", "DOM.AsyncIterable"]` | Loads ES2025 plus DOM and iterable/async-iterable DOM declarations |

### Vite + React JSX application

Extends the React JSX application preset with Vite-specific type declarations.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `["vite/client"]` | Loads Vite client types (`import.meta.env`, `import.meta.hot`, asset imports) |

### Node

Extends base for Node.js tooling files, type-checked only — see [Node preset](#node-preset) for companion packages and execution guidance.

| Option | Value | Effect |
| ------ | ----- | ------ |
| [`allowImportingTsExtensions`](https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions) | `true` | Allows `.ts` extension imports |
| [`types`](https://www.typescriptlang.org/tsconfig#types) | `["node"]` | Loads Node.js global and built-in module types (requires `@types/node`) |
| [`noEmit`](https://www.typescriptlang.org/tsconfig#noEmit) | `true` | Disables emit; a runner or bundler executes the files |

## Troubleshooting

- **`error TS6053: File '@dvashim/typescript-config' not found`** — the package is not installed (or not resolvable from this project); run the install command from [Installation](#installation).
- **`error TS2688: Cannot find type definition file for 'node'`** — the Node preset loads Node.js types; install `@types/node`.
- **`error TS2688: Cannot find type definition file for 'vite/client'`** — the Vite preset loads Vite's client types; install `vite` in the same package.
- **`TS2875`/`TS7026` on JSX tags** — the automatic JSX runtime can't find React's types; install `react` and `@types/react`.
- **`error TS2339: Property 'url' does not exist on type 'ImportMeta'`** — `import.meta` members are contributed by ambient types, not by the ES2025 lib, so the base and library presets leave them untyped. Add `"types": ["node"]` (with `@types/node` installed) to type `url`, `dirname`, and `filename`. The Node preset already does this; the React presets get `url` from the DOM lib but still need `@types/node` for `dirname`/`filename`.
- **`error TS5011: … The 'rootDir' setting must be explicitly set`** — you added an `outDir` to the base preset without a `rootDir`; set `"rootDir": "./src"` (or your source root) alongside it. The library presets are unaffected (`composite` supplies a `rootDir`).
- **`tsc` is not found, or the editor falls back to its bundled TypeScript** — the `typescript` peer dependency is not installed; see [Installation](#installation).
- **Stale errors or missing IntelliSense after install** — restart the TS server after the first install or after changing `extends`: in VS Code, run "TypeScript: Restart TS Server" from the Command Palette.

To see what a preset actually contributes, run `npx tsc --showConfig`: it prints your config with `extends` resolved, listing the options the presets set explicitly (TypeScript's own defaults are not shown).

## Contributing

Issues and pull requests are welcome at [dvashim/typescript-config](https://github.com/dvashim/typescript-config). Security reports go through the [security policy](https://github.com/dvashim/typescript-config/blob/main/SECURITY.md).

Development uses [pnpm](https://pnpm.io) (version pinned via the `packageManager` field) on Node.js 24:

```bash
pnpm install
pnpm run check # format, package exports, and type-check every preset (plus emit smoke tests)
```

`check` fans out to three scripts that run concurrently; each also runs on its own:

- `pnpm run check:format` — formatting, via [Biome](https://biomejs.dev) (`pnpm exec biome format --write .` applies the fixes).
- `pnpm run check:publint` — packs the package and verifies every `exports` entry resolves, with warnings treated as errors.
- `pnpm run check:ts` — runs `tsc -p` over every config in `tests/`, stopping at the first failure.

To check one preset in isolation, run `pnpm exec tsc -p tests/tsconfig-test.<variant>.json`.

The JSON presets in `dist/` are the committed source of truth — edit them directly and update the matching test config in `tests/`. This project uses [Changesets](https://github.com/changesets/changesets) for versioning; run `pnpm run changeset` alongside changes to the presets in `dist/` to describe them (dev-dependency, test, and doc changes don't need one). See the [CHANGELOG](https://github.com/dvashim/typescript-config/blob/main/CHANGELOG.md) for release history.

## License

[MIT](./LICENSE) © Aleksei Reznichenko

[ci-badge]: https://img.shields.io/github/actions/workflow/status/dvashim/typescript-config/check.yml?branch=main&logo=github&label=CI
[ci-link]: https://github.com/dvashim/typescript-config/actions/workflows/check.yml
[npm-badge]: https://img.shields.io/npm/v/@dvashim/typescript-config?label=@dvashim/typescript-config&logo=npm&color=07c
[downloads-badge]: https://img.shields.io/npm/dm/@dvashim/typescript-config?logo=npm&color=07c
[npm-link]: https://www.npmjs.com/package/@dvashim/typescript-config
[license-badge]: https://img.shields.io/npm/l/@dvashim/typescript-config?color=07c
[license-link]: https://github.com/dvashim/typescript-config/blob/main/LICENSE
[ts-badge]: https://img.shields.io/badge/TypeScript-%3E%3D_7-07c?logo=typescript&logoColor=fff
[ts-link]: https://www.typescriptlang.org/
[socket-badge]: https://socket.dev/api/badge/npm/package/@dvashim/typescript-config
[socket-link]: https://socket.dev/npm/package/@dvashim/typescript-config
