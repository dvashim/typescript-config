# Spec Delta

## MODIFIED Requirements

### Requirement: CI verifies the declared TypeScript peer range
CI SHALL run the full `check` on pull requests to main, and SHALL additionally run `check:ts` against the latest TypeScript release of each major admitted by `peerDependencies` (the `peer-typescript` matrix job), independent of the version pinned in the lockfile. While the peer range has no upper bound, the matrix SHALL also run against the newest TypeScript release overall (`typescript@latest`), so a newly released major the range already admits is tested before the matrix lists it. A failing matrix entry SHALL fail the workflow without cancelling the other entries.

#### Scenario: Peer range is tested beyond the lockfile pin
- **WHEN** the `peer-typescript` job runs for a matrix entry
- **THEN** it installs the newest `typescript` release that entry selects (the newest of a listed major, or the newest overall for `latest`) and `check:ts` passes against it

#### Scenario: A newly admitted major joins the matrix
- **WHEN** TypeScript releases a stable major that the open-ended peer range admits
- **THEN** it joins the matrix through the `latest` entry with no edit: the first `peer-typescript` run after the release clears pnpm's release-age gate tests it

#### Scenario: A superseded major keeps coverage
- **WHEN** a newer TypeScript major takes over `latest`
- **THEN** the matrix gains an explicit entry for the major it replaced

#### Scenario: Capping the peer range retires latest
- **WHEN** a change gives the peer range an upper bound
- **THEN** the same change replaces the `latest` entry with an explicit entry for every major the range admits

#### Scenario: Matrix entries fail independently
- **WHEN** `check:ts` fails for one matrix entry
- **THEN** the other entries still run to completion, and the workflow fails
