# Design: cover-new-typescript-releases

## Context

See proposal.md — Why. The state and constraints that shape the approach:

- `check.yml`'s `peer-typescript` job runs `pnpm add --save-dev typescript@<entry>` followed by `pnpm run check:ts`, with matrix `['7']` and the default `fail-fast`. The workflow triggers on pull requests to main and pushes to main; there is no schedule.
- pnpm 12.6.0 applies a 24-hour `minimumReleaseAge` gate by default (not configured in-repo). Verified in a scratch project on 2026-09-26:
  - a dist-tag whose target is too young resolves silently to the newest mature version — `typescript@next` installed the previous day's nightly, and `typescript@latest`, with the gate raised so that 7.0.2 was too young, installed 6.0.3 with exit code 0, crossing a major;
  - a range with no mature release fails — `typescript@7` under the same raised gate exited 1 ("within the minimumReleaseAge cutoff").
- The `protect main` ruleset has no required status checks, and `release.yml` gates publishing on `pnpm run check` alone. CI is advisory; its visible verdict is the README CI badge (shields.io, `check.yml?branch=main`, no `event` filter), which reflects the Check workflow's conclusion on main.
- npm dist-tags at the time of writing: `latest` is 7.0.2 and `next` points at 7.1.0 nightlies; no TypeScript 8 release exists.

## Goals / Non-Goals

**Goals:**

- A newly released TypeScript major is tested without editing the matrix, on the first CI run after it clears the release-age gate.
- Every run reports each matrix entry's result independently.
- A job's log states which TypeScript version the entry actually tested.

**Non-Goals:**

- Changing the peer range or deciding TypeScript 8 support — this change only makes CI raise that question on time.
- Making checks required for merging, or adding the matrix to the release gate.
- Early warning from TypeScript prereleases (Decision 5).
- Changing pnpm's release-age policy.

## Decisions

1. **Add `'latest'` rather than generate the matrix from the peer range.** A generated matrix — majors derived from `npm view typescript@'>=7.0.0' version` — would satisfy "each admitted major" by construction, but it sees a release before pnpm's gate does: on a new major's release day it would emit `'8'`, and `pnpm add typescript@8` fails outright until 8.0.0 is a day old, turning CI red (and the main badge, if anything lands in that window). `typescript@latest` degrades instead: under the gate it tests the previous major for up to a day, then picks the new one up. It is also one line of YAML rather than a script.
2. **Keep `'7'` explicit.** It pins the floor of the peer range; `latest` moves on as TypeScript releases.
3. **`latest` fails the workflow like any other entry.** With no required checks and no matrix in the release gate, a red PR status and a red main badge are the only enforcement there is — and they are the intended forcing function: when a new major breaks a preset, every PR and the badge stay red until the presets are fixed or the range is capped, forcing the decision the archived `require-typescript-7` design deferred ("decide whether the open range remains honest"). Alternative: `continue-on-error` for `latest` — rejected, because it would mute the one signal this change exists to create.
4. **`fail-fast: false`.** Under the default, a failing entry cancels the entries still in progress, so a `'7'` failure would hide whether `latest` fails too — the comparison a version matrix exists for.
5. **No `typescript@next` entry.** Nightlies would warn before a release, but a failing `continue-on-error` job still gets a red X and a "Some checks were not successful" banner on every pull request (GitHub community discussion #15452, unresolved), so nightly noise would look like real breakage in the PR UI. Considered and rejected during exploration.
6. **Log the resolved version after the install** (`pnpm exec tsc --version`). Tag resolution under the gate is silent, so on a release day the `latest` job's name and the version it tested differ; the log line makes that visible without failing anything.
7. **No `schedule:` trigger.** Dependabot's weekly npm and github-actions pull requests already run CI regularly, and a new TypeScript major is likely to arrive as a Dependabot pull request of its own. If a schedule is added later, scheduled runs feed the badge (the shields URL has no `event` filter), which the `package-readme` badge requirement permits.

## Risks / Trade-offs

- [`latest` duplicates `'7'` until TypeScript 8 ships] → one extra short job per run; accepted.
- [On a new major's release day, `latest` silently tests the previous major] → at most one day of lag, visible in the logged version.
- [When a later major takes over `latest`, the previous one loses coverage until its explicit entry is added] → the "A superseded major keeps coverage" scenario makes the obligation explicit; the exposure is limited to an older, no-longer-updated major and to preset changes made in that window.
- [A TypeScript-side regression unrelated to the presets turns `latest` red on every PR] → accepted as the price of an honest open range; the remedies are a TypeScript fix, a preset workaround, or capping the range (which retires `latest`).
- [CI stays advisory, so a red `latest` can still be merged through] → unchanged by this change; the main badge keeps the state visible.

## Migration Plan

1. Land the pull request: the `peer-typescript` job shows `typescript@7` and `typescript@latest`, each logging 7.0.2 today, both passing.
2. Nothing to release: `dist/` is unchanged, so there is no changeset.
3. Rollback: revert the `check.yml` edit — no state involved.
