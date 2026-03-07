---
"@dvashim/typescript-config": patch
---

Improve CI/CD workflows and fix internal tooling

- **CI:** Add explicit permissions to check and release workflows
- **CI:** Prevent release workflow from re-triggering on bot commits
- **CI:** Run checks before publishing in release workflow
- **Fix:** Improve `check:ts` script to properly exit on TypeScript errors
- **Config:** Change changeset access level from restricted to public
- **Deps:** Update devDependencies (biome, changesets, biome-config, validate-package-exports)
