# Contributing to Power Chords

Power Chords is an original, platform-neutral product Workroom. Contributions should deepen one coherent application instead of adding disconnected tool links.

**Good contributions:** Tested native operators, integrated end-to-end workflows, safe runtime adapters, telemetry improvements, UX polish, evidence-grounding, and reproducible fixtures.

Before submitting a PR: explain the customer outcome, list the capability IDs supported, include a minimum working integration test, identify required permissions, explain failure and rollback behavior, and disclose upstream code/assets/licenses when present. Do not copy another project's code without meeting its license conditions or imply its authorship belongs to Power Chords.

Run `npm test` and `npm run validate:catalog` before opening a PR. No customer secrets, credentials or private data in fixtures.

## Improving a capability

Every functional capability has a dedicated `capabilities/<slug>/README.md`, `SKILL.md`, `capability.json`, and example. Edit `data/capability-guides.json`, run `npm run capabilities:docs`, then run `npm run validate:capabilities && npm test`. Include positive/negative test cases before claiming runtime support.

A capability may be documented before its runtime is implemented. Do not mark `adapter_required` as executable until an actual approved adapter and tests exist.
