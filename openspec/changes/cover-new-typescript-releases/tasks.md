# Tasks: cover-new-typescript-releases

## 1. Peer-typescript matrix

- [x] 1.1 In `.github/workflows/check.yml`, change the `peer-typescript` matrix to `typescript: ['7', 'latest']` and add `fail-fast: false` under `strategy`, leaving the job without `continue-on-error`; verify by reading the job that both entries run the same install and `check:ts` steps
- [x] 1.2 Add a `pnpm exec tsc --version` step between `pnpm add --save-dev typescript@${{ matrix.typescript }}` and `pnpm run check:ts`; verify the command locally — `pnpm exec tsc --version` prints `Version 7.0.2` with the current lockfile
- [x] 1.3 Rewrite the matrix sentence in CLAUDE.md's "Releases and CI" section: `'7'` pins the floor of the peer range, `latest` covers a newly released major while the range is open-ended, a major gets an explicit entry once a newer one takes over `latest`, and capping the range replaces `latest` with explicit entries; verify `grep -n -E "currently just|same change" CLAUDE.md` returns nothing

## 2. Integration

- [x] 2.1 Verify `openspec validate cover-new-typescript-releases --strict` passes
- [x] 2.2 Verify `git diff --stat main...HEAD` touches only `.github/workflows/check.yml`, `CLAUDE.md`, and `openspec/changes/cover-new-typescript-releases/` — nothing under `dist/`, so no changeset is needed
- [x] 2.3 On the pull request, verify the `peer-typescript` job shows `typescript@7` and `typescript@latest` both passing, each log shows the installed TypeScript version (7.0.2 at the time of writing), and the `check` job passes
