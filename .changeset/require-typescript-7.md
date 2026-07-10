---
"@dvashim/typescript-config": major
---

Require TypeScript >= 7 (`peerDependencies` is now `>=7.0.0`). Consumers who need to stay on TypeScript 6 should remain on the 4.x line.

Preset behavior is unchanged on TypeScript 7: type-check results and emitted output were verified identical between TypeScript 6.0.3 and 7.0.2. CI now also tests the latest TypeScript release in the peer range and runs real-emit smoke tests for `lib-dev`/`lib-prod`.

- `tsconfig.base.json` no longer sets `types: []` — it is the TypeScript 7 default, so ambient `@types/*` auto-discovery stays blocked with no behavior change.
- Upgrade note: TypeScript 7 rejects an `outDir` whose `rootDir` is left implicit when sources sit in a subdirectory (`error TS5011`). This can surface when emitting with the base preset; the library presets are unaffected (`composite` supplies a `rootDir`). See the README's Troubleshooting section.
