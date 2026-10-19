# Power Chords — GitHub Project Charter

**Owner:** Saurabh Misal (`@saurabhmisal`)  
**Project:** `power-chords`  
**Product:** Power Chords  
**Scope:** First-party Power Chords Workroom + 52-capability integration roadmap  
**Status:** Local v0.2 Workroom implemented and tested; public GitHub repository exists but write access must be verified before publication.

## Milestones

1. **P0 — Source inventory**: immutable list of 52 verified forks, each with Power Chords capability classification.
2. **P0 — Automated monitoring**: hourly default-branch and latest-release checking of fork and upstream, change detection, tracked SHAs, failure-safe refresh.
3. **P0 — Publication**: public repository under `@saurabhmisal`, GitHub release per changed source state, searchable GitHub Pages directory, tracked update feed.
4. **P0 — User control**: local registry, installation state, per-user skill and power enable/disable and grant revocation.
5. **P1 — Integration adapters**: separately maintained manifests and reviewed executors for apps and service-oriented repos; upgrade gates and tests.
6. **P1 — Host integrations**: provide reviewed adapters for desktop, browser, agent, and enterprise hosts without coupling to a single product.
7. **P2 — Event-driven sources**: optional GitHub App/webhook fan-out; maintain scheduled polling as fallback.

## Non-negotiable invariants

- No unreviewed upstream code executes during catalog synchronization.
- Updates never silently change user-granted permissions or re-enable a disabled skill.
- Every installed package has an immutable source SHA, verified provenance, license status, and an audit trail.
- Fork commits and upstream commits are distinguished; upstream changes never automatically rewrite a personal fork.
- Source failures prevent publication of incomplete catalog snapshots.
- GitHub user ownership is clearly represented, while bot-generated commits are transparently attributed to the bot.
- Changes to public catalog must be deterministic and validated against the 52 allowed sources.

## Operational notes

- GitHub scheduled workflows are not instantaneous and can be delayed.
- Ensure repository Actions settings allow the `contents:write` permission required for commits and releases.
- Ensure GitHub Pages uses workflow-based deployment and the `github-pages` environment allows automatic deployment.
- The publication script attempts to create a GitHub Projects V2 board under @saurabhmisal and seed roadmap issues. This step requires the GitHub CLI `project` scope; if denied, publication still succeeds without the board.
