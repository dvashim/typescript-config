---
"@dvashim/typescript-config": major
---

Remove duplicate and alias package exports, rewrite README

- **Breaking:** Remove folder-style (`./lib/dev`, `./app/react/vite`) and short alias (`./base`, `./lib`, `./app`) exports — use dash-separated paths (`./lib-dev`, `./app-react-vite`) instead
- **Docs:** Add package description, convert option lists to tables, add Socket.dev badge
- **Build:** Bump `@dvashim/biome-config` and `@types/node`, simplify `biome.json`
