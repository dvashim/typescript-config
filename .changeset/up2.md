---
"@dvashim/typescript-config": patch
---

Overhaul README for accuracy and onboarding

- Document required companion packages per preset (`@types/node` for `node`, `vite` for `app-react-vite`, React types for `app-react*`) and add a Troubleshooting section with verified error messages
- Add a Quick start, a prose preset picker (replacing the invalid duplicate-`extends` block), a Compatibility table, and a "Combining presets in one project" example
- Show the `lib-dev`/`lib-prod` dev–prod pairing as a two-file workflow with `tsc -b` invocations
- Correct the copyright holder to Aleksei Reznichenko in `LICENSE` and the README, point the CI badge at `release.yml` (runs on `main`), and remove the stale `--experimental-strip-types` reference
