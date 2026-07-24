---
"@dvashim/typescript-config": patch
---

Improve README navigation and links, and update dev dependencies

- **Docs:** Expand the table of contents to list every subsection under Requirements, Presets, Usage, and Options
- **Docs:** Link `SECURITY.md` and `CHANGELOG.md` by absolute URL so they resolve outside GitHub — neither file ships in the published package
- **Docs:** Add a `tsc --showConfig` tip for inspecting the resolved config, move the badge link definitions to the bottom of the file, and describe `pnpm run check` in terms of the renamed `check:publint` script
- **Deps:** Bump `@biomejs/biome` to ^2.5.5, `@dvashim/biome-config` to ^1.10.3, and `publint` to ^0.3.22
